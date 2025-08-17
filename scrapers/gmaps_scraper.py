#!/usr/bin/env python3
"""
Google Maps Busyness Scraper using Playwright
Extracts popular times and live busyness data for venues
"""

import asyncio
import json
import re
from typing import Dict, Any, Optional, List
from datetime import datetime
import structlog

from playwright.async_api import async_playwright, Page, Browser

log = structlog.get_logger()

class GoogleMapsScraper:
    """Scrapes busyness data from Google Maps"""
    
    def __init__(self, headless: bool = True, timeout: int = 30000):
        self.headless = headless
        self.timeout = timeout
        self.browser: Optional[Browser] = None
        self.context = None
        
    async def __aenter__(self):
        await self.start()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()
        
    async def start(self):
        """Start browser instance"""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=self.headless,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ]
        )
        
        # Create context with realistic viewport and user agent
        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        )
        
    async def close(self):
        """Close browser instance"""
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if hasattr(self, 'playwright'):
            await self.playwright.stop()
            
    async def fetch_venue_busyness(self, venue: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Fetch busyness data for a single venue
        
        Args:
            venue: Dict with venue_id, name, place_id or maps_url
            
        Returns:
            Dict with busyness data or None if failed
        """
        page = await self.context.new_page()
        
        try:
            # Build URL
            if 'maps_url' in venue:
                url = venue['maps_url']
            elif 'place_id' in venue:
                url = f"https://www.google.com/maps/place/?q=place_id:{venue['place_id']}"
            else:
                # Search by name
                query = venue.get('name_en', venue.get('name', ''))
                url = f"https://www.google.com/maps/search/{query}+성수"
                
            log.info("fetching_venue", venue_id=venue.get('venue_id'), url=url)
            
            # Navigate to page
            await page.goto(url, wait_until='networkidle', timeout=self.timeout)
            await page.wait_for_timeout(2000)  # Let dynamic content load
            
            # Extract busyness data
            result = {
                'venue_id': venue.get('venue_id'),
                'timestamp': datetime.utcnow().isoformat(),
                'live_busyness': None,
                'typical_busyness': {},
                'popular_times': {},
                'wait_time': None,
                'spend_time': None
            }
            
            # Try to extract live busyness
            live_busyness = await self._extract_live_busyness(page)
            if live_busyness is not None:
                result['live_busyness'] = live_busyness
                
            # Extract popular times for each day
            popular_times = await self._extract_popular_times(page)
            if popular_times:
                result['popular_times'] = popular_times
                
            # Extract typical visit duration
            spend_time = await self._extract_spend_time(page)
            if spend_time:
                result['spend_time'] = spend_time
                
            # Extract wait time if available
            wait_time = await self._extract_wait_time(page)
            if wait_time:
                result['wait_time'] = wait_time
                
            return result
            
        except Exception as e:
            log.error("venue_scrape_failed", 
                venue_id=venue.get('venue_id'), 
                error=str(e)
            )
            return None
            
        finally:
            await page.close()
            
    async def _extract_live_busyness(self, page: Page) -> Optional[float]:
        """Extract current live busyness percentage"""
        try:
            # Multiple selectors for different layouts
            selectors = [
                'div[aria-label*="currently"]',
                'div[aria-label*="지금"]',
                'div[aria-label*="Usually"] div[aria-label*="%"]',
                'div.section-popular-times-live-value'
            ]
            
            for selector in selectors:
                elements = await page.query_selector_all(selector)
                for element in elements:
                    text = await element.inner_text()
                    # Extract percentage
                    match = re.search(r'(\d+)\s*%', text)
                    if match:
                        return int(match.group(1)) / 100.0
                        
            # Try aria-label approach
            elements = await page.query_selector_all('div[aria-label]')
            for element in elements:
                aria_label = await element.get_attribute('aria-label')
                if aria_label and ('currently' in aria_label.lower() or '지금' in aria_label):
                    match = re.search(r'(\d+)\s*%', aria_label)
                    if match:
                        return int(match.group(1)) / 100.0
                        
        except Exception as e:
            log.debug("live_busyness_extraction_failed", error=str(e))
            
        return None
        
    async def _extract_popular_times(self, page: Page) -> Dict[str, List[int]]:
        """Extract popular times for each day of week"""
        popular_times = {}
        
        try:
            # Click on popular times section if collapsed
            expand_buttons = await page.query_selector_all('button[aria-label*="Popular times"]')
            if not expand_buttons:
                expand_buttons = await page.query_selector_all('button[aria-label*="혼잡도"]')
                
            for button in expand_buttons:
                try:
                    await button.click()
                    await page.wait_for_timeout(500)
                except:
                    pass
                    
            # Extract histogram data
            days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            days_kr = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
            
            for i, (day_en, day_kr) in enumerate(zip(days, days_kr)):
                # Try to find day selector
                day_selectors = [
                    f'div[aria-label*="{day_en}"]',
                    f'div[aria-label*="{day_kr}"]',
                    f'button[aria-label*="{day_en}"]',
                    f'button[aria-label*="{day_kr}"]'
                ]
                
                for selector in day_selectors:
                    elements = await page.query_selector_all(selector)
                    if elements:
                        # Click to show that day's data
                        try:
                            await elements[0].click()
                            await page.wait_for_timeout(300)
                        except:
                            pass
                            
                        # Extract hourly data
                        hourly_data = []
                        for hour in range(24):
                            # Look for bars representing busyness
                            hour_selectors = [
                                f'div[aria-label*="{hour}:00"]',
                                f'div[aria-label*="{hour}시"]'
                            ]
                            
                            for hour_sel in hour_selectors:
                                hour_elements = await page.query_selector_all(hour_sel)
                                for elem in hour_elements:
                                    aria_label = await elem.get_attribute('aria-label')
                                    if aria_label:
                                        match = re.search(r'(\d+)\s*%', aria_label)
                                        if match:
                                            hourly_data.append(int(match.group(1)))
                                            break
                                            
                        if hourly_data:
                            popular_times[day_en.lower()] = hourly_data
                            
        except Exception as e:
            log.debug("popular_times_extraction_failed", error=str(e))
            
        return popular_times
        
    async def _extract_spend_time(self, page: Page) -> Optional[str]:
        """Extract typical time spent at venue"""
        try:
            selectors = [
                'div[aria-label*="spend"]',
                'div[aria-label*="머무는 시간"]',
                'span:has-text("People typically spend")',
                'span:has-text("일반적으로")'
            ]
            
            for selector in selectors:
                elements = await page.query_selector_all(selector)
                for element in elements:
                    text = await element.inner_text()
                    # Extract time range (e.g., "15-45 min")
                    match = re.search(r'(\d+[-–]\d+\s*(min|분|hour|시간))', text)
                    if match:
                        return match.group(1)
                        
        except Exception as e:
            log.debug("spend_time_extraction_failed", error=str(e))
            
        return None
        
    async def _extract_wait_time(self, page: Page) -> Optional[int]:
        """Extract current wait time in minutes"""
        try:
            selectors = [
                'div[aria-label*="wait"]',
                'div[aria-label*="대기"]',
                'span:has-text("Wait time")',
                'span:has-text("대기 시간")'
            ]
            
            for selector in selectors:
                elements = await page.query_selector_all(selector)
                for element in elements:
                    text = await element.inner_text()
                    # Extract minutes
                    match = re.search(r'(\d+)\s*(min|분)', text)
                    if match:
                        return int(match.group(1))
                        
        except Exception as e:
            log.debug("wait_time_extraction_failed", error=str(e))
            
        return None

async def scrape_venues(venues: List[Dict[str, Any]], 
                       headless: bool = True,
                       batch_size: int = 5) -> List[Dict[str, Any]]:
    """
    Scrape multiple venues in batches
    
    Args:
        venues: List of venue dicts
        headless: Run browser in headless mode
        batch_size: Number of concurrent pages
        
    Returns:
        List of busyness data dicts
    """
    results = []
    
    async with GoogleMapsScraper(headless=headless) as scraper:
        for i in range(0, len(venues), batch_size):
            batch = venues[i:i+batch_size]
            
            # Process batch concurrently
            tasks = [scraper.fetch_venue_busyness(venue) for venue in batch]
            batch_results = await asyncio.gather(*tasks)
            
            # Filter out None results
            valid_results = [r for r in batch_results if r is not None]
            results.extend(valid_results)
            
            log.info("batch_completed", 
                batch_num=i//batch_size + 1,
                successful=len(valid_results),
                total=len(batch)
            )
            
            # Rate limiting between batches
            if i + batch_size < len(venues):
                await asyncio.sleep(2)
                
    return results

# Standalone function for integration with agent.py
def fetch_gmaps_busyness(venue: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Synchronous wrapper for async scraper
    
    Args:
        venue: Venue dict with venue_id and name/place_id
        
    Returns:
        Dict with busyness metrics normalized 0-1
    """
    async def _fetch():
        async with GoogleMapsScraper(headless=True) as scraper:
            return await scraper.fetch_venue_busyness(venue)
            
    try:
        result = asyncio.run(_fetch())
        
        if result and result.get('live_busyness') is not None:
            # Already normalized to 0-1
            return {
                'ts': datetime.utcnow(),
                'venue_id': venue['venue_id'],
                'metric': 'live_busyness',
                'value': result['live_busyness'],
                'meta': {
                    'wait_time': result.get('wait_time'),
                    'spend_time': result.get('spend_time'),
                    'has_popular_times': bool(result.get('popular_times'))
                }
            }
            
    except Exception as e:
        log.error("gmaps_fetch_failed", venue_id=venue.get('venue_id'), error=str(e))
        
    return None

if __name__ == "__main__":
    # Test scraper
    import sys
    
    test_venues = [
        {
            'venue_id': 'onion_seongsu',
            'name': 'Onion Seongsu',
            'name_en': 'Onion Seongsu'
        },
        {
            'venue_id': 'blue_bottle_seongsu',
            'name': 'Blue Bottle Coffee Seongsu',
            'place_id': 'ChIJN1t_tDeuEmsRUsoyG83frY4'  # Example
        }
    ]
    
    async def test():
        results = await scrape_venues(test_venues, headless=False, batch_size=2)
        print(json.dumps(results, indent=2, ensure_ascii=False))
        
    asyncio.run(test())