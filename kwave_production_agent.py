#!/usr/bin/env python3
"""
K-Wave California Intelligence - Production Agent
Korean Restaurant Surge Prediction Platform
"""

import os
import time
import signal
import logging
import json
from datetime import datetime, timedelta
from threading import Thread
from flask import Flask, jsonify
from dotenv import load_dotenv

# Import our collectors and predictor
from agent import ForecastAgent
from korean_restaurant_predictor import KoreanRestaurantPredictor, SurgePrediction
from backtest_predictor import KWaveBacktester

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s'
)
logger = logging.getLogger(__name__)

class KWaveProductionAgent:
    """Production K-Wave Korean Restaurant Intelligence Agent"""
    
    def __init__(self):
        self.agent = ForecastAgent('config_kwave_ca.yaml')
        self.predictor = KoreanRestaurantPredictor()
        self.backtester = KWaveBacktester()
        self.running = False
        self.last_run = None
        self.total_runs = 0
        self.errors = 0
        self.last_predictions = {}
        
        # Flask app for API endpoints
        self.app = Flask(__name__)
        self.setup_routes()
        
        # California Korean restaurants to monitor
        self.restaurants = [
            {
                "id": "kang_hodong_baekjeong",
                "name": "Kang Ho Dong Baekjeong",
                "location": "Los Angeles, CA",
                "type": "Korean BBQ",
                "baseline_busy": 0.7
            },
            {
                "id": "parks_bbq", 
                "name": "Park's BBQ",
                "location": "Los Angeles, CA",
                "type": "Korean BBQ",
                "baseline_busy": 0.6
            },
            {
                "id": "quarters_korean_bbq",
                "name": "Quarters Korean BBQ", 
                "location": "Los Angeles, CA",
                "type": "Korean BBQ",
                "baseline_busy": 0.5
            },
            {
                "id": "kyochon_chicken",
                "name": "Kyochon Chicken",
                "location": "Los Angeles, CA", 
                "type": "Korean Fried Chicken",
                "baseline_busy": 0.4
            }
        ]
        
    def setup_routes(self):
        """Setup K-Wave API endpoints"""
        
        @self.app.route('/health')
        def health():
            return jsonify({
                'status': 'healthy',
                'service': 'K-Wave California Intelligence',
                'last_run': self.last_run.isoformat() if self.last_run else None,
                'total_runs': self.total_runs,
                'errors': self.errors,
                'restaurants_monitored': len(self.restaurants),
                'uptime': time.time() - start_time if 'start_time' in globals() else 0
            })
            
        @self.app.route('/status')
        def status():
            return jsonify({
                'service': 'K-Wave California Intelligence',
                'version': '1.0.0',
                'description': 'Korean Restaurant Surge Prediction Platform',
                'environment': os.getenv('RAILWAY_ENVIRONMENT', 'development'),
                'running': self.running,
                'last_run': self.last_run.isoformat() if self.last_run else None,
                'total_runs': self.total_runs,
                'error_rate': self.errors / max(self.total_runs, 1),
                'restaurants': [r['name'] for r in self.restaurants],
                'coverage': 'California Korean Restaurants'
            })
            
        @self.app.route('/force-run')
        def force_run():
            """Manually trigger data collection and predictions"""
            try:
                result = self.run_collection_and_prediction_cycle()
                return jsonify({
                    'status': 'success', 
                    'message': 'K-Wave collection and prediction cycle triggered',
                    'result': result
                })
            except Exception as e:
                return jsonify({'status': 'error', 'error': str(e)}), 500
                
        @self.app.route('/predictions')
        def get_predictions():
            """Get current surge predictions for all restaurants"""
            if not self.last_predictions:
                return jsonify({
                    'status': 'no_predictions',
                    'message': 'No predictions available yet. Run data collection first.',
                    'restaurants': [r['name'] for r in self.restaurants]
                })
            
            return jsonify({
                'status': 'success',
                'timestamp': datetime.now().isoformat(),
                'predictions': self.last_predictions,
                'restaurants_covered': len(self.last_predictions)
            })
            
        @self.app.route('/predictions/<restaurant_id>')
        def get_restaurant_prediction(restaurant_id):
            """Get prediction for specific restaurant"""
            if restaurant_id not in self.last_predictions:
                return jsonify({
                    'status': 'not_found',
                    'message': f'No predictions for restaurant {restaurant_id}',
                    'available_restaurants': list(self.last_predictions.keys())
                }), 404
            
            return jsonify({
                'status': 'success',
                'restaurant_id': restaurant_id,
                'prediction': self.last_predictions[restaurant_id]
            })
            
        @self.app.route('/test-trends')
        def test_trends():
            """Test Korean culture trend collection"""
            try:
                from pytrends.request import TrendReq
                
                pytrends = TrendReq(hl="en-US", tz=480)
                
                # Test Korean keywords
                keywords = ["Korean BBQ", "Korean restaurant", "K-pop"]
                pytrends.build_payload(keywords, cat=0, timeframe="now 7-d", geo="US-CA")
                df = pytrends.interest_over_time()
                
                if not df.empty:
                    df = df.drop(columns=["isPartial"], errors="ignore")
                    trends = {}
                    for keyword in keywords:
                        if keyword in df.columns:
                            trends[keyword] = {
                                "avg_interest": float(df[keyword].mean()),
                                "max_interest": float(df[keyword].max()),
                                "current_interest": float(df[keyword].iloc[-1]) if len(df) > 0 else 0
                            }
                
                return jsonify({
                    'status': 'success',
                    'trends': trends,
                    'data_points': len(df),
                    'timeframe': 'last 7 days',
                    'location': 'California'
                })
                
            except Exception as e:
                return jsonify({
                    'status': 'error',
                    'error': str(e),
                    'message': 'Failed to collect Korean culture trends'
                }), 500
                
        @self.app.route('/backtest')
        def run_backtest():
            """Run backtesting to validate prediction accuracy"""
            try:
                results = self.backtester.run_comprehensive_backtest()
                
                # Format results for API response
                formatted_results = {}
                overall_accuracy = []
                
                for restaurant_id, result in results.items():
                    formatted_results[restaurant_id] = {
                        'restaurant_name': restaurant_id.replace('_', ' ').title(),
                        'total_predictions': result.total_predictions,
                        'accuracy_score': round(result.accuracy_score * 100, 1),  # Convert to percentage
                        'mae': round(result.mae, 3),
                        'rmse': round(result.rmse, 3),
                        'surge_detection_accuracy': round(result.surge_detection_accuracy * 100, 1),
                        'period_start': result.period_start.isoformat(),
                        'period_end': result.period_end.isoformat()
                    }
                    overall_accuracy.append(result.accuracy_score)
                
                avg_accuracy = sum(overall_accuracy) / len(overall_accuracy) if overall_accuracy else 0
                
                return jsonify({
                    'status': 'success',
                    'message': 'Backtesting completed',
                    'overall_accuracy': round(avg_accuracy * 100, 1),
                    'restaurants': formatted_results,
                    'validation_notes': {
                        'data_points': sum(r.total_predictions for r in results.values()),
                        'period_days': 7,
                        'includes_cultural_factors': True,
                        'includes_special_events': True,
                        'accuracy_threshold': 'Excellent (>80%)'
                    }
                })
                
            except Exception as e:
                return jsonify({
                    'status': 'error',
                    'error': str(e),
                    'message': 'Backtesting failed'
                }), 500
                
    def collect_korean_trends(self) -> dict:
        """Collect Korean culture trends for California"""
        try:
            from pytrends.request import TrendReq
            
            pytrends = TrendReq(hl="en-US", tz=480)
            
            # Korean culture keywords
            korean_keywords = [
                "Korean BBQ", "Korean restaurant", "Korean drama", 
                "K-pop", "Korean fried chicken"
            ]
            
            trends = {}
            
            # Collect in batches
            for i in range(0, len(korean_keywords), 3):
                batch = korean_keywords[i:i+3]
                
                try:
                    pytrends.build_payload(
                        batch, cat=0, timeframe="now 7-d", geo="US-CA"
                    )
                    df = pytrends.interest_over_time()
                    
                    if not df.empty:
                        df = df.drop(columns=["isPartial"], errors="ignore")
                        for keyword in batch:
                            if keyword in df.columns:
                                trends[keyword] = float(df[keyword].mean())
                    
                    time.sleep(2)  # Rate limiting
                    
                except Exception as e:
                    logger.warning(f"Failed to collect trends for batch {batch}: {e}")
                    
            return trends
            
        except Exception as e:
            logger.error(f"Korean trends collection failed: {e}")
            return {}
    
    def generate_restaurant_predictions(self, trend_data: dict) -> dict:
        """Generate surge predictions for all restaurants"""
        predictions = {}
        
        # Get real weather data (in production, would fetch from weather API)
        # For now, use realistic California weather patterns without mock data
        weather_data = None  # Let predictor handle defaults
        
        # Get real Korean cultural events (no mock data)
        events = []  # In production, would fetch from Korean cultural calendar APIs
        
        for restaurant in self.restaurants:
            try:
                # Generate 24-hour predictions with cultural analysis
                restaurant_predictions = self.predictor.predict_next_24_hours(
                    restaurant_id=restaurant["id"],
                    restaurant_name=restaurant["name"],
                    trend_data=trend_data,
                    weather_data=weather_data,
                    events=events,
                    historical_busy_score=restaurant["baseline_busy"]
                )
                
                # Convert predictions to JSON-serializable format
                predictions[restaurant["id"]] = {
                    "restaurant_name": restaurant["name"],
                    "location": restaurant["location"],
                    "type": restaurant["type"],
                    "predictions": []
                }
                
                for pred in restaurant_predictions:
                    predictions[restaurant["id"]]["predictions"].append({
                        "time": pred.prediction_time.isoformat(),
                        "surge_probability": pred.surge_probability,
                        "expected_wait_minutes": pred.expected_wait_minutes,
                        "confidence_level": pred.confidence_level,
                        "recommendation": pred.recommendation,
                        "peak_start": pred.peak_hour_start.isoformat() if pred.peak_hour_start else None,
                        "peak_end": pred.peak_hour_end.isoformat() if pred.peak_hour_end else None,
                        "top_factors": dict(sorted(pred.factors.items(), key=lambda x: x[1], reverse=True)[:3])
                    })
                
                logger.info(f"Generated predictions for {restaurant['name']}")
                
            except Exception as e:
                logger.error(f"Failed to generate predictions for {restaurant['name']}: {e}")
                
        return predictions
    
    def run_collection_and_prediction_cycle(self):
        """Run one complete K-Wave collection and prediction cycle"""
        try:
            logger.info("🌊 Starting K-Wave collection and prediction cycle")
            
            # 1. Collect Korean culture trends
            logger.info("📊 Collecting Korean culture trends...")
            trend_data = self.collect_korean_trends()
            
            if trend_data:
                logger.info(f"✅ Collected trends for {len(trend_data)} keywords")
                
                # Log trending insights
                top_trend = max(trend_data.items(), key=lambda x: x[1]) if trend_data else None
                if top_trend:
                    logger.info(f"🔥 Top trending: {top_trend[0]} (score: {top_trend[1]:.1f})")
            else:
                logger.warning("⚠️ No trend data collected")
                trend_data = {"Korean BBQ": 30, "Korean restaurant": 10}  # Fallback
            
            # 2. Generate restaurant predictions
            logger.info("🍖 Generating restaurant surge predictions...")
            predictions = self.generate_restaurant_predictions(trend_data)
            
            if predictions:
                self.last_predictions = predictions
                logger.info(f"✅ Generated predictions for {len(predictions)} restaurants")
                
                # Log prediction insights
                for restaurant_id, pred_data in predictions.items():
                    current_pred = pred_data["predictions"][0] if pred_data["predictions"] else None
                    if current_pred:
                        surge = current_pred["surge_probability"] * 100
                        wait = current_pred["expected_wait_minutes"]
                        logger.info(f"🏪 {pred_data['restaurant_name']}: {surge:.1f}% surge, {wait:.0f}min wait")
            
            self.last_run = datetime.now()
            self.total_runs += 1
            
            return {
                'trends_collected': len(trend_data),
                'predictions_generated': len(predictions),
                'restaurants_analyzed': len(self.restaurants),
                'top_trending_keyword': max(trend_data.items(), key=lambda x: x[1])[0] if trend_data else None
            }
            
        except Exception as e:
            self.errors += 1
            logger.error(f"❌ K-Wave cycle failed: {e}")
            raise
            
    def run_forever(self):
        """Main loop - run every 2 hours"""
        self.running = True
        logger.info("🚀 K-Wave California Intelligence - Starting production agent")
        
        while self.running:
            try:
                self.run_collection_and_prediction_cycle()
                
                # Sleep for 2 hours (Korean restaurant patterns change every few hours)
                logger.info("😴 Sleeping for 2 hours...")
                time.sleep(7200)
                
            except KeyboardInterrupt:
                logger.info("👋 Graceful shutdown requested")
                break
            except Exception as e:
                logger.error(f"❌ Unexpected error: {e}")
                time.sleep(600)  # Wait 10 minutes on error
                
        self.running = False
        logger.info("🛑 K-Wave agent stopped")
        
    def start(self):
        """Start the K-Wave agent with API server"""
        global start_time
        start_time = time.time()
        
        # Start Flask API server in background
        api_thread = Thread(target=lambda: self.app.run(
            host='0.0.0.0', 
            port=int(os.getenv('PORT', 8080)),
            debug=False
        ))
        api_thread.daemon = True
        api_thread.start()
        
        logger.info(f"🩺 K-Wave API server started on port {os.getenv('PORT', 8080)}")
        
        # Handle graceful shutdown
        signal.signal(signal.SIGTERM, lambda s, f: self.stop())
        signal.signal(signal.SIGINT, lambda s, f: self.stop())
        
        # Run initial collection immediately
        try:
            self.run_collection_and_prediction_cycle()
        except Exception as e:
            logger.error(f"Initial run failed: {e}")
            
        # Start main loop
        self.run_forever()
        
    def stop(self):
        """Stop the agent gracefully"""
        logger.info("🛑 Stopping K-Wave agent...")
        self.running = False

def main():
    """Main entry point"""
    agent = KWaveProductionAgent()
    agent.start()

if __name__ == "__main__":
    main()