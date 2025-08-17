#!/usr/bin/env python3
"""
Queue Lexicon Scraper for Naver Place and Google Maps Reviews
Counts wait/queue mentions in recent reviews
"""

import re
import time
import math
import datetime as dt
from typing import Optional, Dict, Any, List, Tuple
from playwright.sync_api import sync_playwright
import regex as rx
import structlog

log = structlog.get_logger()

# --- Korean queue lexicons (extend freely)
QUEUE_TERMS = [
    "웨이팅", "웨이팅줄", "대기", "대기줄", "줄서", "줄 섰", "줄이", "기다리", "기다림",
    "한시간 기다", "1시간 기다", "2시간 기다", "오픈런", "오픈 런"
]
QUEUE_RE = rx.compile("|".join([rx.escape(t) for t in QUEUE_TERMS]), flags=rx.IGNORECASE)

# --- Relative time parsing for KR review timestamps
REL_RE = rx.compile(r"(?:(\d+)\s*분 전)|(?:(\d+)\s*시간 전)|(?:(\d+)\s*일 전)|(?:(\d+)\s*주 전)|(?:(\d+)\s*개월 전)|(?:(\d+)\s*년 전)")

def parse_kr_relative(ts_text: str, now: Optional[dt.datetime] = None) -> Optional[dt.datetime]:
    """Parse Korean relative time strings"""
    now = now or dt.datetime.utcnow()
    ts_text = ts_text.strip()
    
    if any(x in ts_text for x in ("방금", "오늘")):
        return now
    if "어제" in ts_text:
        return now - dt.timedelta(days=1)
        
    m = REL_RE.search(ts_text)
    if not m:
        # Sometimes exact dates: '2025.08.12.' or '2024년 6월'
        m2 = re.search(r"(\d{4})[.\s년-](\d{1,2})[.\s월-](\d{1,2})", ts_text)
        if m2:
            y, M, d = map(int, m2.groups())
            try:
                return dt.datetime(y, M, d)
            except:
                return None
        return None
        
    minutes, hours, days, weeks, months, years = [m.group(i) for i in range(1, 7)]
    delta = dt.timedelta()
    if minutes: delta += dt.timedelta(minutes=int(minutes))
    if hours:   delta += dt.timedelta(hours=int(hours))
    if days:    delta += dt.timedelta(days=int(days))
    if weeks:   delta += dt.timedelta(weeks=int(weeks))
    if months:  delta += dt.timedelta(days=int(months) * 30)
    if years:   delta += dt.timedelta(days=int(years) * 365)
    return now - delta

def _count_queue_mentions(texts: List[str]) -> int:
    """Count queue term occurrences in text list"""
    c = 0
    for t in texts:
        if QUEUE_RE.search(t or ""):
            c += 1
    return c

def _normalize_result(window_hours: int, total_reviews: int, hits: int) -> Dict[str, Any]:
    """Normalize results into standard format"""
    rate = hits / total_reviews if total_reviews else 0.0
    return {
        "metric": f"queue_mentions_{window_hours}h",
        "value": float(hits),
        "meta": {
            "window_hours": window_hours,
            "total_reviews_scanned": total_reviews,
            "rate": round(rate, 4)
        }
    }

# ------------------ Google Maps ------------------

def scrape_google_maps_reviews(maps_url: str, window_hours: int = 72, max_scrolls: int = 10) -> Optional[Dict[str, Any]]:
    """
    Opens a Google Maps place page, navigates to the Reviews tab,
    loads reviews by scrolling, filters to last `window_hours`,
    counts queue-lexicon hits.
    """
    now = dt.datetime.utcnow()
    end_utc = now
    start_utc = now - dt.timedelta(hours=window_hours)
    total, hits = 0, 0

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
            ]
        )
        try:
            ctx = browser.new_context(
                locale="ko-KR", 
                viewport={"width": 1366, "height": 900},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            )
            page = ctx.new_page()
            page.goto(maps_url, wait_until="domcontentloaded")
            page.wait_for_timeout(2000)

            # Open the Reviews panel (button often labeled "리뷰" or has aria-label)
            # Try a few selectors for robustness
            selectors = [
                "button[aria-label*='리뷰']",
                "button[jsaction][data-tab-index]",     # generic tab; fallback
                "div[role='tab']:has-text('리뷰')",
                "button:has-text('리뷰')"
            ]
            for sel in selectors:
                try:
                    if page.locator(sel).first.is_visible():
                        page.locator(sel).first.click()
                        page.wait_for_timeout(1500)
                        break
                except:
                    pass

            # The reviews container is scrollable; find a generic scroll region
            scroll_root = page.locator("div[aria-label*='리뷰']").first
            if not scroll_root or scroll_root.count() == 0:
                # fallback: main panel
                scroll_root = page.locator("div[role='region']").first

            # Load a few batches
            last_height = 0
            for _ in range(max_scrolls):
                try:
                    scroll_root.evaluate("(el) => el.scrollBy(0, el.scrollHeight)")
                except:
                    page.mouse.wheel(0, 2000)
                page.wait_for_timeout(1000)

            # Extract review items: try multiple selectors
            review_items = page.locator("div[data-review-id], div[data-review-id] div, div[aria-label^='리뷰']")
            count = min(review_items.count(), 400)
            texts, times = [], []
            
            for i in range(count):
                try:
                    node = review_items.nth(i)
                    full = node.inner_text(timeout=500)
                    # timestamp often near the author; try to grab any time-like string
                    ts_candidates = node.locator("span").all_inner_texts() if node else []
                    # heuristically pick a time-like token
                    ts_text = None
                    for t in ts_candidates:
                        if any(k in t for k in ["전", "어제", "오늘", "년", "월", "일"]):
                            ts_text = t
                            break
                    # Filter by time window
                    ts_parsed = parse_kr_relative(ts_text or "") if ts_text else None
                    if ts_parsed is None or not (start_utc <= ts_parsed <= end_utc):
                        continue
                    total += 1
                    texts.append(full)
                except:
                    continue

            hits = _count_queue_mentions(texts)
            
            log.info("gmaps_reviews_scraped", 
                url=maps_url[:50], 
                total=total, 
                hits=hits,
                window_hours=window_hours
            )

            return {
                "ts": now,
                **_normalize_result(window_hours, total, hits)
            }
        except Exception as e:
            log.error("gmaps_review_scrape_failed", error=str(e))
            return None
        finally:
            try: 
                browser.close()
            except: 
                pass

# ------------------ Naver Place ------------------

def scrape_naver_place_reviews(naver_place_url: str, window_hours: int = 72, max_clicks: int = 8, max_scrolls: int = 10) -> Optional[Dict[str, Any]]:
    """
    Opens a Naver Place page (PC version), navigates to 리뷰,
    loads more items (클릭 '더보기'/scroll), filters last `window_hours`,
    counts queue lexicon hits.
    """
    now = dt.datetime.utcnow()
    end_utc = now
    start_utc = now - dt.timedelta(hours=window_hours)
    total, hits = 0, 0

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
            ]
        )
        try:
            ctx = browser.new_context(
                locale="ko-KR", 
                viewport={"width": 1366, "height": 900},
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            )
            page = ctx.new_page()
            page.goto(naver_place_url, wait_until="domcontentloaded")
            page.wait_for_timeout(2500)

            # Click "리뷰" tab if present
            try:
                page.locator("a,button:has-text('리뷰')").first.click()
                page.wait_for_timeout(1200)
            except:
                pass

            # Click "최근" sort if available (to bias to newest)
            try:
                sort_btn = page.locator("button:has-text('최근')")
                if sort_btn.count() > 0:
                    sort_btn.first.click()
                    page.wait_for_timeout(800)
            except:
                pass

            # Expand more (더보기) a few times
            for _ in range(max_clicks):
                more = page.locator("a,button:has-text('더보기')")
                if more.count() == 0:
                    break
                try:
                    more.first.click()
                    page.wait_for_timeout(900)
                except:
                    break

            # Scroll reviews list
            for _ in range(max_scrolls):
                page.mouse.wheel(0, 1600)
                page.wait_for_timeout(700)

            # Collect review blocks
            review_blocks = page.locator("div:has(span):has-text('리뷰')").locator("div").all()  # broad fallback
            # Better: look for common classes, but Naver often changes them; grab general containers:
            blocks = page.locator("div,li").filter(has_text=re.compile("작성|전|어제|오늘|리뷰"))
            count = min(blocks.count(), 400)

            texts = []
            for i in range(count):
                try:
                    b = blocks.nth(i)
                    txt = b.inner_text(timeout=600)
                    # Extract a likely timestamp within block
                    spans = b.locator("span, time").all_inner_texts()
                    ts_text = None
                    for t in spans:
                        if any(k in t for k in ["전", "어제", "오늘", "년", "월", "일"]):
                            ts_text = t
                            break
                    ts_parsed = parse_kr_relative(ts_text or "") if ts_text else None
                    if ts_parsed is None or not (start_utc <= ts_parsed <= end_utc):
                        continue
                    total += 1
                    texts.append(txt)
                except:
                    continue

            hits = _count_queue_mentions(texts)
            
            log.info("naver_reviews_scraped", 
                url=naver_place_url[:50], 
                total=total, 
                hits=hits,
                window_hours=window_hours
            )

            return {
                "ts": now,
                **_normalize_result(window_hours, total, hits)
            }
        except Exception as e:
            log.error("naver_review_scrape_failed", error=str(e))
            return None
        finally:
            try: 
                browser.close()
            except: 
                pass

# ============= Wrapper for agent.py integration =============

def fetch_queue_mentions(venue: Dict[str, Any], source: str = "google", window_hours: int = 72) -> Optional[Dict[str, Any]]:
    """
    Unified wrapper for agent.py integration
    
    Args:
        venue: Dict with venue_id and maps_url or naver_url
        source: "google" or "naver"
        window_hours: Time window for review analysis
        
    Returns:
        Dict formatted for agent.py or None
    """
    venue_id = venue.get("venue_id")
    
    try:
        if source == "google" and "maps_url" in venue:
            result = scrape_google_maps_reviews(
                venue["maps_url"], 
                window_hours=window_hours,
                max_scrolls=8
            )
        elif source == "naver" and "naver_url" in venue:
            result = scrape_naver_place_reviews(
                venue["naver_url"],
                window_hours=window_hours,
                max_clicks=6,
                max_scrolls=8
            )
        else:
            log.debug("no_url_for_source", venue_id=venue_id, source=source)
            return None
            
        if result:
            return {
                "ts": result["ts"],
                "venue_id": venue_id,
                "metric": result["metric"],
                "value": result["value"],
                "meta": result["meta"],
                "source": f"reviews_{source}"
            }
            
    except Exception as e:
        log.error("queue_mentions_fetch_failed",
            venue_id=venue_id,
            source=source,
            error=str(e)
        )
        
    return None

if __name__ == "__main__":
    # Test
    test_venue = {
        "venue_id": "onion_seongsu",
        "maps_url": "https://maps.google.com/?cid=18052003704602011244"
    }
    
    print("Testing Google Maps review scraper...")
    result = fetch_queue_mentions(test_venue, source="google", window_hours=72)
    if result:
        print(f"Queue mentions: {result['value']}")
        print(f"Total reviews scanned: {result['meta']['total_reviews_scanned']}")
        print(f"Queue mention rate: {result['meta']['rate']:.2%}")
    else:
        print("No data collected")