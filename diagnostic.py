#!/usr/bin/env python3
"""
Quick diagnostic script to test connections
"""

import os
from dotenv import load_dotenv

load_dotenv()

def test_environment():
    """Test environment variables"""
    print("🔍 Environment Variables:")
    print(f"POSTGRES_DSN: {'✅ Set' if os.getenv('POSTGRES_DSN') else '❌ Missing'}")
    print(f"YOUTUBE_API_KEY: {'✅ Set' if os.getenv('YOUTUBE_API_KEY') else '❌ Missing'}")
    
def test_database():
    """Test database connection"""
    try:
        from sqlalchemy import create_engine, text
        dsn = os.getenv('POSTGRES_DSN')
        if not dsn:
            print("❌ No POSTGRES_DSN found")
            return False
            
        engine = create_engine(dsn)
        with engine.connect() as conn:
            result = conn.execute(text('SELECT 1'))
            print("✅ Database connection successful")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_apis():
    """Test API access"""
    try:
        from pytrends.request import TrendReq
        pytrends = TrendReq(hl="ko-KR", tz=540, timeout=(5, 10))
        print("✅ Google Trends API accessible")
        
        youtube_key = os.getenv('YOUTUBE_API_KEY')
        if youtube_key and youtube_key.startswith('AIza'):
            print("✅ YouTube API key format valid")
        else:
            print("❌ YouTube API key invalid")
            
    except Exception as e:
        print(f"❌ API test failed: {e}")

if __name__ == "__main__":
    print("🚀 FULL THROTTLE DIAGNOSTIC")
    test_environment()
    test_database()
    test_apis()
    print("🔥 Diagnostic complete!")