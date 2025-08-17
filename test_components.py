#!/usr/bin/env python3
"""
Test individual components of the Seongsu Coffee Forecast Agent
"""

import os
import asyncio
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

def test_google_trends():
    """Test Google Trends collection"""
    print("🔍 Testing Google Trends...")
    
    try:
        from pytrends.request import TrendReq
        pytrends = TrendReq(hl='ko-KR', tz=540)
        
        keywords = ['성수 카페', '성수 빵집', '말차']
        pytrends.build_payload(keywords, cat=0, timeframe='now 7-d', geo='KR-11')
        
        # Web trends
        web_data = pytrends.interest_over_time()
        print(f"  Web trends: {len(web_data)} data points")
        
        # YouTube trends
        pytrends.build_payload(keywords, cat=0, timeframe='now 7-d', geo='KR-11', gprop='youtube')
        youtube_data = pytrends.interest_over_time()
        print(f"  YouTube trends: {len(youtube_data)} data points")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def test_youtube_api():
    """Test YouTube Data API"""
    print("📹 Testing YouTube API...")
    
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key or api_key == "your_youtube_api_key_here":
        print("  ⚠️ No API key configured")
        return False
    
    try:
        from googleapiclient.discovery import build
        youtube = build('youtube', 'v3', developerKey=api_key)
        
        # Search around Seongsu
        search = youtube.search().list(
            q='성수 카페',
            part='id,snippet',
            type='video',
            location='37.544,127.055',
            locationRadius='3km',
            order='date',
            maxResults=10,
            publishedAfter=(datetime.utcnow().replace(hour=0, minute=0, second=0)).isoformat() + 'Z'
        ).execute()
        
        videos = search.get('items', [])
        print(f"  Found {len(videos)} recent videos")
        
        if videos:
            # Get video stats
            video_ids = [v['id']['videoId'] for v in videos[:3]]
            stats = youtube.videos().list(
                part='statistics',
                id=','.join(video_ids)
            ).execute()
            
            for stat in stats.get('items', []):
                views = stat['statistics'].get('viewCount', 0)
                print(f"    Video {stat['id']}: {views} views")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

async def test_gmaps_scraper():
    """Test Google Maps busyness scraper"""
    print("🗺️ Testing Google Maps scraper...")
    
    try:
        from scrapers.fetch_gmaps_busyness_playwright import fetch_gmaps_busyness
        
        # Test with Onion Seongsu
        test_venue = {
            'venue_id': 'onion_seongsu',
            'name': 'Onion Seongsu',
            'maps_url': 'https://maps.google.com/?cid=18052003704602011244'
        }
        
        result = fetch_gmaps_busyness(test_venue)
        
        if result:
            print(f"  ✅ Busyness: {result['value']:.1%}")
            print(f"  Confidence: {result['meta']['confidence']}")
            return True
        else:
            print("  ⚠️ No busyness data returned")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

async def test_queue_scraper():
    """Test queue mentions scraper"""
    print("⏰ Testing queue mentions scraper...")
    
    try:
        from scrapers.fetch_queue_mentions_playwright import fetch_queue_mentions
        
        # Test with Onion Seongsu
        test_venue = {
            'venue_id': 'onion_seongsu',
            'name': 'Onion Seongsu',
            'maps_url': 'https://maps.google.com/?cid=18052003704602011244'
        }
        
        result = fetch_queue_mentions(test_venue, source='google', window_hours=72)
        
        if result:
            mentions = result['value']
            total = result['meta']['total_reviews_scanned']
            rate = result['meta']['rate']
            print(f"  ✅ Queue mentions: {mentions} out of {total} reviews ({rate:.1%})")
            return True
        else:
            print("  ⚠️ No queue data returned")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def test_database_schema():
    """Test database schema creation"""
    print("🗄️ Testing database schema...")
    
    try:
        from sqlalchemy import create_engine
        from agent import create_tables
        
        dsn = os.getenv("POSTGRES_DSN")
        if not dsn:
            print("  ❌ No POSTGRES_DSN configured")
            return False
        
        engine = create_engine(dsn)
        tables = create_tables(engine)
        
        print(f"  ✅ Created {len(tables)} tables")
        for name in tables.keys():
            print(f"    - {name}")
        
        return True
        
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

async def main():
    """Run all tests"""
    print("🧪 Seongsu Coffee Agent Component Tests")
    print("=" * 50)
    
    tests = [
        ("Google Trends", test_google_trends),
        ("YouTube API", test_youtube_api),
        ("Database Schema", test_database_schema),
        ("Maps Scraper", test_gmaps_scraper),
        ("Queue Scraper", test_queue_scraper),
    ]
    
    results = {}
    
    for name, test_func in tests:
        print(f"\n{name}:")
        try:
            if asyncio.iscoroutinefunction(test_func):
                results[name] = await test_func()
            else:
                results[name] = test_func()
        except Exception as e:
            print(f"  ❌ Test failed: {e}")
            results[name] = False
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    for name, passed in results.items():
        status = "✅" if passed else "❌"
        print(f"  {status} {name}")
    
    passed = sum(results.values())
    total = len(results)
    print(f"\nPassed: {passed}/{total}")
    
    if passed >= 3:  # At least core functionality works
        print("\n🎉 Ready to collect data!")
    else:
        print("\n⚠️ Fix failing tests before running agent")

if __name__ == "__main__":
    asyncio.run(main())