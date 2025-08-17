#!/usr/bin/env python3
"""
Production Seongsu Coffee Agent
Full-featured version with all collectors and monitoring
"""

import os
import time
import signal
import logging
from datetime import datetime
from threading import Thread
from flask import Flask, jsonify
from dotenv import load_dotenv

# Import the full agent
from agent import ForecastAgent
from analysis.pattern_analysis import SeongsuAnalyzer
from alerts.surge_alerts import SurgeAlertSystem

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s'
)
logger = logging.getLogger(__name__)

class ProductionAgent:
    """Production-ready agent with health checks and monitoring"""
    
    def __init__(self):
        self.agent = ForecastAgent('config.yaml')
        self.analyzer = SeongsuAnalyzer()
        self.alert_system = SurgeAlertSystem()
        self.running = False
        self.last_run = None
        self.total_runs = 0
        self.errors = 0
        
        # Flask app for health checks
        self.app = Flask(__name__)
        self.setup_routes()
        
    def setup_routes(self):
        """Setup health check endpoints"""
        
        @self.app.route('/health')
        def health():
            return jsonify({
                'status': 'healthy',
                'last_run': self.last_run.isoformat() if self.last_run else None,
                'total_runs': self.total_runs,
                'errors': self.errors,
                'uptime': time.time() - start_time if 'start_time' in globals() else 0
            })
            
        @self.app.route('/status')
        def status():
            return jsonify({
                'service': 'Seongsu Coffee Intelligence Agent',
                'version': '1.0.0',
                'environment': os.getenv('RAILWAY_ENVIRONMENT', 'development'),
                'running': self.running,
                'last_run': self.last_run.isoformat() if self.last_run else None,
                'total_runs': self.total_runs,
                'error_rate': self.errors / max(self.total_runs, 1)
            })
            
        @self.app.route('/force-run')
        def force_run():
            """Manually trigger a collection run"""
            try:
                result = self.run_collection_cycle()
                return jsonify({'status': 'success', 'message': 'Collection triggered', 'result': str(result)})
            except Exception as e:
                return jsonify({'status': 'error', 'error': str(e)}), 500
                
        @self.app.route('/test-db')
        def test_db():
            """Test database connection and data"""
            try:
                from sqlalchemy import create_engine, text
                import os
                
                dsn = os.getenv('DATABASE_URL') or os.getenv('POSTGRES_DSN')
                if not dsn:
                    return jsonify({'status': 'error', 'error': 'No database URL found'}), 500
                    
                engine = create_engine(dsn)
                
                with engine.connect() as conn:
                    # Test connection
                    conn.execute(text('SELECT 1'))
                    
                    # Check if table exists
                    table_check = conn.execute(text("""
                        SELECT EXISTS (
                            SELECT FROM information_schema.tables 
                            WHERE table_name = 'signals_raw'
                        )
                    """))
                    table_exists = table_check.scalar()
                    
                    if not table_exists:
                        return jsonify({
                            'status': 'connected',
                            'message': 'Database connected but signals_raw table does not exist',
                            'total_signals': 0,
                            'recent_signals': []
                        })
                    
                    # Count signals
                    result = conn.execute(text('SELECT COUNT(*) FROM signals_raw'))
                    count = result.scalar() or 0
                    
                    # Get recent signals with specific columns
                    result = conn.execute(text("""
                        SELECT entity_id, value, source, timestamp 
                        FROM signals_raw 
                        ORDER BY timestamp DESC 
                        LIMIT 5
                    """))
                    
                    recent = []
                    for row in result:
                        recent.append({
                            'entity_id': str(row.entity_id),
                            'value': float(row.value) if row.value else 0,
                            'source': str(row.source),
                            'timestamp': str(row.timestamp)
                        })
                    
                    return jsonify({
                        'status': 'connected',
                        'total_signals': count,
                        'recent_signals': recent,
                        'database_info': f"Railway PostgreSQL ({dsn.split('//')[-1].split('@')[1].split('/')[0] if '@' in dsn else 'connected'})"
                    })
            except Exception as e:
                return jsonify({'status': 'error', 'error': str(e), 'type': type(e).__name__}), 500
                
    def run_collection_cycle(self):
        """Run one complete collection cycle"""
        try:
            logger.info("🚀 Starting collection cycle")
            
            # 1. Collect data
            result = self.agent.run()
            
            # 2. Run analysis
            analysis = self.analyzer.create_summary_report()
            
            # 3. Check alerts
            alerts = self.alert_system.run_alert_check()
            
            self.last_run = datetime.now()
            self.total_runs += 1
            
            logger.info(f"✅ Collection cycle completed")
            return {'status': 'success', 'analysis': analysis, 'alerts': alerts}
            
        except Exception as e:
            self.errors += 1
            logger.error(f"❌ Collection cycle failed: {e}")
            raise
            
    def run_forever(self):
        """Main loop - run every hour"""
        self.running = True
        logger.info("🔥 FULL THROTTLE MODE: Starting production agent")
        
        while self.running:
            try:
                self.run_collection_cycle()
                
                # Sleep for 1 hour (3600 seconds)
                logger.info("😴 Sleeping for 1 hour...")
                time.sleep(3600)
                
            except KeyboardInterrupt:
                logger.info("👋 Graceful shutdown requested")
                break
            except Exception as e:
                logger.error(f"❌ Unexpected error: {e}")
                time.sleep(300)  # Wait 5 minutes on error
                
        self.running = False
        logger.info("🛑 Agent stopped")
        
    def start(self):
        """Start the agent with health check server"""
        global start_time
        start_time = time.time()
        
        # Start Flask health check server in background
        health_thread = Thread(target=lambda: self.app.run(
            host='0.0.0.0', 
            port=int(os.getenv('PORT', 8080)),
            debug=False
        ))
        health_thread.daemon = True
        health_thread.start()
        
        logger.info(f"🩺 Health check server started on port {os.getenv('PORT', 8080)}")
        
        # Handle graceful shutdown
        signal.signal(signal.SIGTERM, lambda s, f: self.stop())
        signal.signal(signal.SIGINT, lambda s, f: self.stop())
        
        # Run initial collection immediately
        try:
            self.run_collection_cycle()
        except Exception as e:
            logger.error(f"Initial run failed: {e}")
            
        # Start main loop
        self.run_forever()
        
    def stop(self):
        """Stop the agent gracefully"""
        logger.info("🛑 Stopping agent...")
        self.running = False

def main():
    """Main entry point"""
    agent = ProductionAgent()
    agent.start()

if __name__ == "__main__":
    main()