#!/usr/bin/env python3
"""
Setup script for Seongsu Coffee Forecast Agent
Initializes database, tests connections, and runs first data collection
"""

import os
import sys
import time
import subprocess
from datetime import datetime
from dotenv import load_dotenv

def check_dependencies():
    """Check if required tools are installed"""
    print("📋 Checking dependencies...")
    
    required = ['psql', 'python3', 'pip']
    missing = []
    
    for tool in required:
        try:
            subprocess.run([tool, '--version'], capture_output=True, check=True)
            print(f"  ✅ {tool} found")
        except (subprocess.CalledProcessError, FileNotFoundError):
            missing.append(tool)
            print(f"  ❌ {tool} missing")
    
    if missing:
        print(f"\n⚠️ Missing dependencies: {', '.join(missing)}")
        print("Install with:")
        if 'psql' in missing:
            print("  brew install postgresql")
        if 'python3' in missing:
            print("  brew install python3")
        return False
    
    return True

def setup_database():
    """Set up PostgreSQL database"""
    print("\n🗄️ Setting up database...")
    
    # Start PostgreSQL if needed
    try:
        subprocess.run(['brew', 'services', 'start', 'postgresql'], 
                      capture_output=True, check=True)
        print("  ✅ PostgreSQL service started")
    except subprocess.CalledProcessError:
        print("  ⚠️ Could not start PostgreSQL service")
    
    # Create database
    try:
        subprocess.run(['createdb', 'seongsu_forecast'], 
                      capture_output=True, check=True)
        print("  ✅ Database 'seongsu_forecast' created")
    except subprocess.CalledProcessError:
        print("  ℹ️ Database might already exist")
    
    # Create user
    try:
        subprocess.run(['psql', '-d', 'seongsu_forecast', '-c', 
                       "CREATE USER forecast_user WITH PASSWORD 'changeme';"],
                      capture_output=True, check=True)
        print("  ✅ User 'forecast_user' created")
    except subprocess.CalledProcessError:
        print("  ℹ️ User might already exist")
    
    # Grant permissions
    try:
        subprocess.run(['psql', '-d', 'seongsu_forecast', '-c', 
                       "GRANT ALL PRIVILEGES ON DATABASE seongsu_forecast TO forecast_user;"],
                      capture_output=True, check=True)
        print("  ✅ Permissions granted")
    except subprocess.CalledProcessError:
        print("  ⚠️ Could not grant permissions")

def install_python_deps():
    """Install Python dependencies"""
    print("\n🐍 Installing Python dependencies...")
    
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'],
                      check=True)
        print("  ✅ Python dependencies installed")
    except subprocess.CalledProcessError:
        print("  ❌ Failed to install Python dependencies")
        return False
    
    # Install Playwright browsers
    try:
        subprocess.run([sys.executable, '-m', 'playwright', 'install', 'chromium'],
                      check=True)
        print("  ✅ Playwright browsers installed")
    except subprocess.CalledProcessError:
        print("  ⚠️ Could not install Playwright browsers")
    
    return True

def test_database_connection():
    """Test database connection"""
    print("\n🔌 Testing database connection...")
    
    try:
        from sqlalchemy import create_engine, text
        load_dotenv()
        
        dsn = os.getenv("POSTGRES_DSN")
        if not dsn:
            print("  ❌ POSTGRES_DSN not found in .env")
            return False
        
        engine = create_engine(dsn)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("  ✅ Database connection successful")
            return True
            
    except Exception as e:
        print(f"  ❌ Database connection failed: {e}")
        return False

def test_google_trends():
    """Test Google Trends API"""
    print("\n📈 Testing Google Trends...")
    
    try:
        from pytrends.request import TrendReq
        pytrends = TrendReq(hl='ko-KR', tz=540)
        
        # Test with a simple query
        pytrends.build_payload(['성수 카페'], cat=0, timeframe='now 7-d', geo='KR-11')
        data = pytrends.interest_over_time()
        
        if not data.empty:
            print(f"  ✅ Google Trends working - got {len(data)} data points")
            return True
        else:
            print("  ⚠️ Google Trends returned no data")
            return False
            
    except Exception as e:
        print(f"  ❌ Google Trends failed: {e}")
        return False

def test_youtube_api():
    """Test YouTube API"""
    print("\n📹 Testing YouTube API...")
    
    load_dotenv()
    api_key = os.getenv("YOUTUBE_API_KEY")
    
    if not api_key or api_key == "your_youtube_api_key_here":
        print("  ⚠️ YouTube API key not configured")
        print("     Get one at: https://console.cloud.google.com")
        return False
    
    try:
        from googleapiclient.discovery import build
        youtube = build('youtube', 'v3', developerKey=api_key)
        
        # Test search
        search = youtube.search().list(
            q='성수 카페',
            part='id,snippet',
            type='video',
            location='37.544,127.055',
            locationRadius='3km',
            maxResults=5
        ).execute()
        
        count = len(search.get('items', []))
        print(f"  ✅ YouTube API working - found {count} videos")
        return True
        
    except Exception as e:
        print(f"  ❌ YouTube API failed: {e}")
        return False

def run_test_collection():
    """Run a test data collection"""
    print("\n🚀 Running test data collection...")
    
    try:
        result = subprocess.run([sys.executable, 'agent.py', '--dry-run'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("  ✅ Test collection successful")
            print("     Output:", result.stdout[-200:] if result.stdout else "No output")
            return True
        else:
            print("  ❌ Test collection failed")
            print("     Error:", result.stderr[-200:] if result.stderr else "No error")
            return False
            
    except Exception as e:
        print(f"  ❌ Test collection error: {e}")
        return False

def main():
    """Main setup process"""
    print("🚀 Seongsu Coffee Forecast Agent Setup")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        print("\n❌ Setup failed - missing dependencies")
        return False
    
    # Set up database
    setup_database()
    
    # Install Python deps
    if not install_python_deps():
        print("\n❌ Setup failed - Python dependencies")
        return False
    
    # Test connections
    db_ok = test_database_connection()
    trends_ok = test_google_trends()
    youtube_ok = test_youtube_api()
    
    # Run test collection
    if db_ok and trends_ok:
        test_ok = run_test_collection()
    else:
        test_ok = False
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 Setup Summary:")
    print(f"  Database: {'✅' if db_ok else '❌'}")
    print(f"  Google Trends: {'✅' if trends_ok else '❌'}")
    print(f"  YouTube API: {'✅' if youtube_ok else '⚠️'}")
    print(f"  Test Collection: {'✅' if test_ok else '❌'}")
    
    if db_ok and trends_ok:
        print("\n🎉 Ready to collect data!")
        print("\nNext steps:")
        print("  1. Add YouTube API key to .env")
        print("  2. Run: python agent.py")
        print("  3. Check dashboard for data")
        return True
    else:
        print("\n⚠️ Setup incomplete - fix issues above")
        return False

if __name__ == "__main__":
    main()