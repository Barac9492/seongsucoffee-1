"""
Lightweight Vercel Function for Google Trends collection only
"""

import os
import json
from datetime import datetime, timedelta
import requests
from pytrends.request import TrendReq
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

def collect_google_trends():
    """Collect only Google Trends data"""
    try:
        # Keywords
        keywords = [
            "성수 카페", "성수 빵집", "성수동 맛집", "성수 브런치",
            "말차", "크로플", "라떼", "아메리카노", "디저트",
            "성수역", "뚝섬역"
        ]
        
        # Initialize Google Trends
        pytrends = TrendReq(hl="ko-KR", tz=540, timeout=(10, 30))
        
        signals = []
        
        # Process keywords in batches of 5
        for i in range(0, len(keywords), 5):
            batch = keywords[i:i+5]
            
            try:
                pytrends.build_payload(batch, timeframe='now 7-d', geo='KR')
                trends_df = pytrends.interest_over_time()
                
                if not trends_df.empty:
                    trends_df = trends_df.drop('isPartial', axis=1, errors='ignore')
                    
                    for keyword in batch:
                        if keyword in trends_df.columns:
                            for timestamp, value in trends_df[keyword].items():
                                if value > 0:
                                    signals.append({
                                        'entity_id': keyword,
                                        'entity_type': 'keyword',
                                        'metric': 'search_index',
                                        'value': float(value),
                                        'source': 'google_trends',
                                        'timestamp': timestamp,
                                        'metadata': {'batch': i//5 + 1}
                                    })
                                    
            except Exception as e:
                print(f"Error processing batch {batch}: {e}")
                continue
        
        return signals
        
    except Exception as e:
        print(f"Google Trends collection failed: {e}")
        return []

def store_signals(signals):
    """Store signals in Supabase"""
    if not signals:
        return False
        
    try:
        dsn = os.getenv('POSTGRES_DSN')
        engine = create_engine(dsn)
        
        # Create table if not exists
        with engine.connect() as conn:
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS signals_raw (
                    id SERIAL PRIMARY KEY,
                    entity_id TEXT NOT NULL,
                    entity_type TEXT NOT NULL,
                    metric TEXT NOT NULL,
                    value FLOAT NOT NULL,
                    source TEXT NOT NULL,
                    timestamp TIMESTAMP NOT NULL,
                    metadata JSONB,
                    created_at TIMESTAMP DEFAULT NOW()
                )
            """))
            conn.commit()
            
            # Insert signals
            for signal in signals:
                conn.execute(text("""
                    INSERT INTO signals_raw 
                    (entity_id, entity_type, metric, value, source, timestamp, metadata)
                    VALUES (:entity_id, :entity_type, :metric, :value, :source, :timestamp, :metadata)
                """), {
                    'entity_id': signal['entity_id'],
                    'entity_type': signal['entity_type'],
                    'metric': signal['metric'],
                    'value': signal['value'],
                    'source': signal['source'],
                    'timestamp': signal['timestamp'],
                    'metadata': json.dumps(signal.get('metadata', {}))
                })
            conn.commit()
            
        return True
        
    except Exception as e:
        print(f"Storage failed: {e}")
        return False

def handler(request):
    """Vercel function handler"""
    
    try:
        print("🚀 Starting lightweight data collection...")
        
        # Collect Google Trends
        signals = collect_google_trends()
        print(f"📊 Collected {len(signals)} signals")
        
        # Store in database
        if signals:
            success = store_signals(signals)
            if success:
                print("✅ Stored successfully")
                return {
                    'statusCode': 200,
                    'body': json.dumps({
                        'status': 'success',
                        'signals_collected': len(signals),
                        'timestamp': datetime.now().isoformat()
                    })
                }
            else:
                print("❌ Storage failed")
                return {
                    'statusCode': 500,
                    'body': json.dumps({
                        'status': 'storage_error',
                        'signals_collected': len(signals),
                        'timestamp': datetime.now().isoformat()
                    })
                }
        else:
            print("⚠️ No signals collected")
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'status': 'no_data',
                    'signals_collected': 0,
                    'timestamp': datetime.now().isoformat()
                })
            }
        
    except Exception as e:
        print(f"❌ Function failed: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'status': 'error',
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            })
        }