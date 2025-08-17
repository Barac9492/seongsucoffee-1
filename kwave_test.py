#!/usr/bin/env python3
"""
K-Wave California Intelligence - Test Data Collection
"""

import os
import time
import json
from datetime import datetime
from pytrends.request import TrendReq
import pandas as pd

def test_korean_culture_trends():
    """Test collecting Korean culture trends for California"""
    
    print("🌊 K-Wave California Intelligence - Data Collection Test")
    print("=" * 60)
    
    # Initialize pytrends for US-CA
    pytrends = TrendReq(hl="en-US", tz=480)  # Pacific timezone
    
    # Korean culture keywords to test
    korean_keywords = [
        "Korean BBQ",
        "Korean restaurant", 
        "K-pop",
        "Korean drama",
        "Korean fried chicken"
    ]
    
    results = []
    
    print(f"📊 Testing {len(korean_keywords)} Korean culture keywords in California...")
    
    for i in range(0, len(korean_keywords), 3):  # Process in batches of 3
        batch = korean_keywords[i:i+3]
        print(f"\n🔍 Batch {i//3 + 1}: {batch}")
        
        try:
            # Build payload for California
            pytrends.build_payload(
                batch,
                cat=0,
                timeframe="now 7-d",
                geo="US-CA",  # California
                gprop=""
            )
            
            # Get interest over time
            df = pytrends.interest_over_time()
            
            if not df.empty:
                df = df.drop(columns=["isPartial"], errors="ignore")
                
                # Calculate average interest for each keyword
                for keyword in batch:
                    if keyword in df.columns:
                        avg_interest = df[keyword].mean()
                        max_interest = df[keyword].max()
                        
                        results.append({
                            "keyword": keyword,
                            "avg_interest": avg_interest,
                            "max_interest": max_interest,
                            "data_points": len(df),
                            "category": "korean_culture"
                        })
                        
                        print(f"  ✅ {keyword}: avg={avg_interest:.1f}, max={max_interest}")
                    else:
                        print(f"  ❌ {keyword}: No data")
            else:
                print(f"  ⚠️  No data for batch: {batch}")
                
            time.sleep(2)  # Rate limiting
            
        except Exception as e:
            print(f"  ❌ Error with batch {batch}: {e}")
            time.sleep(5)
    
    print("\n" + "=" * 60)
    print("📈 K-Wave California Trend Analysis Results:")
    print("=" * 60)
    
    if results:
        # Sort by average interest
        results.sort(key=lambda x: x["avg_interest"], reverse=True)
        
        print(f"{'Keyword':<25} {'Avg Interest':<12} {'Max Interest':<12} {'Prediction Potential'}")
        print("-" * 70)
        
        for result in results:
            keyword = result["keyword"]
            avg = result["avg_interest"]
            max_val = result["max_interest"]
            
            # Determine prediction potential
            if avg > 50:
                potential = "🔥 HIGH"
            elif avg > 20:
                potential = "⚡ MEDIUM"
            elif avg > 5:
                potential = "💡 LOW"
            else:
                potential = "❄️  MINIMAL"
                
            print(f"{keyword:<25} {avg:<12.1f} {max_val:<12.1f} {potential}")
        
        print("\n🎯 Business Opportunities:")
        high_interest = [r for r in results if r["avg_interest"] > 20]
        
        if high_interest:
            print("\n✅ High-Volume Keywords (Great for Prediction Platform):")
            for result in high_interest:
                keyword = result["keyword"]
                avg = result["avg_interest"]
                
                if "BBQ" in keyword or "restaurant" in keyword:
                    opportunity = "Restaurant surge prediction, wait time forecasting"
                elif "K-pop" in keyword:
                    opportunity = "Concert demand prediction, venue capacity planning"
                elif "Korean drama" in keyword or "drama" in keyword:
                    opportunity = "Cultural trend forecasting, merchandise demand"
                elif "chicken" in keyword:
                    opportunity = "Food trend prediction, delivery surge forecasting"
                else:
                    opportunity = "General Korean culture trend prediction"
                
                print(f"  • {keyword} (avg: {avg:.1f}) → {opportunity}")
        else:
            print("  💡 Keywords have moderate interest - good for niche prediction markets")
            
        print(f"\n🚀 Platform Recommendation:")
        if any(r["avg_interest"] > 50 for r in results):
            print("  EXCELLENT: High search volumes detected! Perfect for prediction platform.")
        elif any(r["avg_interest"] > 20 for r in results):
            print("  GOOD: Solid search volumes. Great opportunity for Korean culture predictions.")
        else:
            print("  MODERATE: Lower volumes but less competition. Niche market opportunity.")
            
    else:
        print("❌ No data collected. May need to adjust keywords or geographic targeting.")
    
    return results

def suggest_prediction_models(results):
    """Suggest prediction models based on the trend data"""
    
    print("\n" + "=" * 60)
    print("🤖 Suggested K-Wave Prediction Models:")
    print("=" * 60)
    
    high_volume = [r for r in results if r["avg_interest"] > 20]
    
    if high_volume:
        print("\n1. 🍖 Korean Restaurant Surge Predictor")
        print("   • Predict busy hours for Korean BBQ restaurants")
        print("   • Target: Restaurant owners, delivery apps")
        print("   • Data: Search trends + reviews + reservations")
        
        print("\n2. 🎵 K-Pop Event Demand Forecaster")
        print("   • Predict concert ticket demand and pricing")
        print("   • Target: Venues, promoters, ticket platforms")
        print("   • Data: Search trends + social media + streaming")
        
        print("\n3. 📺 K-Drama Impact Analyzer")
        print("   • Predict business impact when K-dramas feature Korean food/brands")
        print("   • Target: Korean businesses, marketers")
        print("   • Data: Drama mentions + search spikes + business reviews")
        
        print("\n4. 🌶️ Korean Food Trend Predictor")
        print("   • Predict next viral Korean food (like Korean corn dogs)")
        print("   • Target: Food businesses, influencers")
        print("   • Data: Search trends + social media + YouTube views")
    
    print("\n💰 Revenue Models:")
    print("   • SaaS subscriptions for Korean business owners")
    print("   • API access for delivery apps and reservation platforms")
    print("   • Consulting for Korean cultural events and marketing")
    print("   • White-label solutions for Korean business associations")

if __name__ == "__main__":
    try:
        results = test_korean_culture_trends()
        if results:
            suggest_prediction_models(results)
            
        print("\n🎉 K-Wave California Intelligence Test Complete!")
        print("Ready to build the full prediction platform! 🚀")
        
    except KeyboardInterrupt:
        print("\n👋 Test interrupted by user")
    except Exception as e:
        print(f"\n❌ Test failed: {e}")