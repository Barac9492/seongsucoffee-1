#!/usr/bin/env python3
"""
Google Maps Live Busyness Extractor
Conservative Playwright-based scraper for venue busyness data
"""

import asyncio
import re
import time
import math
import datetime as dt
from typing import Optional, Dict, Any
from playwright.sync_api import sync_playwright
import structlog

log = structlog.get_logger()

BUSY_LABEL_PATTERNS = [
    # Examples seen in aria-labels or text nodes (varies by locale/UI)
    r"Live\s*(?:busyness|activity)\s*[:\-]?\s*(\d{1,3})\s*%",     # e.g., "Live busyness: 73%"
    r"현재 혼잡도\s*[:\-]?\s*(\d{1,3})\s*%",                        # KR phrasing, sometimes appears
    r"(\d{1,3})\s*%\s*(?:busy|혼잡)",                               # "73% busy"
]

def _extract_percentage(text: str) -> Optional[int]:
    """Extract percentage from text using known patterns"""
    for pat in BUSY_LABEL_PATTERNS:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            try:
                val = int(m.group(1))
                if 0 <= val <= 200:  # sometimes over 100% vs. typical
                    return min(val, 100)
            except:  # noqa
                pass
    return None

def fetch_gmaps_live_busyness(maps_url: str, timeout_sec: int = 25) -> Optional[Dict[str, Any]]:
    """
    Opens a Google Maps place page and tries to extract a 'live busyness' percentage.
    
    Returns:
      {
        "ts": utcnow,
        "metric": "live_busyness",
        "value": 0.73,                   # normalized 0..1
        "meta": {"raw_percent": 73, "confidence": "medium"}
      }
    or None if not available.
    """
    start = time.time()
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        )
        try:
            ctx = browser.new_context(
                locale="ko-KR",
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1366, "height": 900}
            )
            page = ctx.new_page()
            page.set_default_timeout(timeout_sec * 1000)

            # Load the place page
            page.goto(maps_url, wait_until="domcontentloaded")
            # Let client-side widgets render; Popular times often streams in
            page.wait_for_timeout(3000)

            # Strategy 1: Look for aria-labels with percentages
            # Many "popular times" bar charts and live indicators are images/spans with aria-labels
            candidates = page.locator("[aria-label], [aria-describedby]")
            texts = []
            try:
                count = candidates.count()
                for i in range(min(count, 400)):  # scan a reasonable number of nodes
                    txt = candidates.nth(i).get_attribute("aria-label")
                    if txt:
                        texts.append(txt)
            except Exception:
                pass

            # Strategy 2: Also scan visible text in the sidebar
            try:
                sidebar = page.locator("div[role='feed'], div[role='region'], div[aria-label]")
                for i in range(min(sidebar.count(), 50)):
                    texts.append(sidebar.nth(i).inner_text(timeout=1000))
            except Exception:
                pass

            raw_pct = None
            for t in texts:
                if not t: 
                    continue
                pct = _extract_percentage(t)
                if pct is not None:
                    raw_pct = pct
                    break

            # Strategy 3 (fallback): detect qualitative labels
            # e.g., "Busier than usual", "Not too busy", map to coarse ranges
            if raw_pct is None:
                qualitative = None
                qual_map = {
                    r"(매우\s*)?혼잡": 0.85,
                    r"보통|약간 혼잡|보통 수준": 0.55,
                    r"여유|한산|not (too )?busy|quieter? than usual": 0.25,
                    r"busier than usual|평소보다 붐빔": 0.70,
                }
                text_blob = "\n".join([t for t in texts if t])
                for pat, val in qual_map.items():
                    if re.search(pat, text_blob, re.IGNORECASE):
                        qualitative = val
                        break
                if qualitative is not None:
                    return {
                        "ts": dt.datetime.utcnow(),
                        "metric": "live_busyness",
                        "value": float(qualitative),
                        "meta": {"raw_percent": None, "confidence": "low", "qualitative": True}
                    }

            if raw_pct is not None:
                norm = max(0.0, min(1.0, raw_pct / 100.0))
                return {
                    "ts": dt.datetime.utcnow(),
                    "metric": "live_busyness",
                    "value": float(norm),
                    "meta": {"raw_percent": raw_pct, "confidence": "medium", "qualitative": False}
                }

            # If we couldn't find live % today, return None gracefully
            return None

        finally:
            try:
                browser.close()
            except:  # noqa
                pass

# ============= Cache Layer =============

class BusynessCache:
    """Simple in-memory cache for busyness data"""
    
    def __init__(self, ttl_seconds: int = 7200):  # 2 hours default
        self.cache = {}
        self.ttl = ttl_seconds
        
    def get(self, venue_id: str) -> Optional[Dict[str, Any]]:
        """Get cached value if not expired"""
        if venue_id in self.cache:
            entry = self.cache[venue_id]
            age = (dt.datetime.utcnow() - entry['cached_at']).total_seconds()
            if age < self.ttl:
                log.debug("cache_hit", venue_id=venue_id, age_seconds=age)
                return entry['data']
        return None
        
    def set(self, venue_id: str, data: Dict[str, Any]):
        """Store value in cache"""
        self.cache[venue_id] = {
            'data': data,
            'cached_at': dt.datetime.utcnow()
        }

# Global cache instance
_cache = BusynessCache()

def fetch_gmaps_busyness(venue: Dict[str, Any], use_cache: bool = True) -> Optional[Dict[str, Any]]:
    """
    Wrapper for agent.py integration with caching and retry
    
    Args:
        venue: Dict with venue_id and maps_url
        use_cache: Whether to use caching (default True)
        
    Returns:
        Dict formatted for agent.py or None
    """
    venue_id = venue.get("venue_id")
    
    # Check cache first
    if use_cache:
        cached = _cache.get(venue_id)
        if cached:
            return cached
            
    # Build URL
    if 'maps_url' in venue:
        url = venue['maps_url']
    elif 'place_id' in venue:
        url = f"https://www.google.com/maps/place/?q=place_id:{venue['place_id']}"
    else:
        # Fallback to search
        name = venue.get('name_en', venue.get('name', ''))
        url = f"https://www.google.com/maps/search/{name}+성수"
        
    # Try to fetch with retry
    result = None
    for attempt in range(2):
        try:
            res = fetch_gmaps_live_busyness(url)
            if res:
                result = {
                    "ts": res["ts"],
                    "venue_id": venue_id,
                    "metric": res["metric"],
                    "value": res["value"],
                    "meta": res["meta"]
                }
                break
        except Exception as e:
            log.warning("busyness_fetch_error", 
                venue_id=venue_id, 
                attempt=attempt+1,
                error=str(e)
            )
            if attempt == 0:
                time.sleep(2)  # Brief pause before retry
                
    # Cache successful result
    if result and use_cache:
        _cache.set(venue_id, result)
        
    return result

# ============= Monitoring =============

def check_venue_availability(venues: list, alert_threshold_hours: int = 24) -> Dict[str, Any]:
    """
    Check which venues haven't returned data recently
    
    Returns dict with stats and problematic venues
    """
    stats = {
        'total': len(venues),
        'successful': 0,
        'failed': 0,
        'problematic': []
    }
    
    for venue in venues:
        result = fetch_gmaps_busyness(venue, use_cache=False)
        if result:
            stats['successful'] += 1
        else:
            stats['failed'] += 1
            stats['problematic'].append(venue.get('venue_id'))
            
        # Be polite between checks
        time.sleep(20)
        
    return stats

if __name__ == "__main__":
    # Quick test
    test_url = "https://maps.google.com/?cid=18052003704602011244"
    print("Testing Google Maps busyness extraction...")
    result = fetch_gmaps_live_busyness(test_url)
    if result:
        print(f"Success! Live busyness: {result['value']:.2%}")
        print(f"Metadata: {result['meta']}")
    else:
        print("No busyness data found (venue might be closed or data unavailable)")