#!/usr/bin/env python3
"""
Seongsu Coffee Scheduler
Coordinates data collection, analysis, and alerts
"""

import os
import sys
import time
import schedule
import logging
from datetime import datetime
from dotenv import load_dotenv

# Import our modules
from agent import ForecastAgent
from analysis.pattern_analysis import SeongsuAnalyzer
from alerts.surge_alerts import SurgeAlertSystem

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s',
    handlers=[
        logging.FileHandler('logs/scheduler.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger(__name__)

class SeongsuScheduler:
    """Main scheduler for all Seongsu operations"""
    
    def __init__(self):
        self.agent = ForecastAgent('config.yaml')
        self.analyzer = SeongsuAnalyzer()
        self.alert_system = SurgeAlertSystem()
        
    def collect_data(self):
        """Run data collection"""
        logger.info("🚀 Starting data collection cycle")
        try:
            self.agent.run()
            logger.info("✅ Data collection completed")
        except Exception as e:
            logger.error(f"❌ Data collection failed: {e}")
    
    def run_analysis(self):
        """Run pattern analysis"""
        logger.info("📊 Starting analysis cycle")
        try:
            self.analyzer.create_summary_report()
            logger.info("✅ Analysis completed")
        except Exception as e:
            logger.error(f"❌ Analysis failed: {e}")
    
    def check_alerts(self):
        """Check for alerts"""
        logger.info("🚨 Starting alert check")
        try:
            results = self.alert_system.run_alert_check()
            logger.info(f"✅ Alert check completed - {results['alerts_sent']} alerts sent")
        except Exception as e:
            logger.error(f"❌ Alert check failed: {e}")
    
    def health_check(self):
        """System health check"""
        logger.info("❤️ Running health check")
        # Add health checks here
        logger.info("✅ System healthy")

def main():
    """Main scheduler setup"""
    scheduler = SeongsuScheduler()
    
    # Schedule jobs
    logger.info("⏰ Setting up schedules...")
    
    # Data collection every hour at :15
    schedule.every().hour.at(":15").do(scheduler.collect_data)
    
    # Analysis every 4 hours
    schedule.every(4).hours.do(scheduler.run_analysis)
    
    # Alert checks every 30 minutes
    schedule.every(30).minutes.do(scheduler.check_alerts)
    
    # Health check every 6 hours
    schedule.every(6).hours.do(scheduler.health_check)
    
    logger.info("🚀 Scheduler started")
    
    # Run initial cycles
    scheduler.collect_data()
    scheduler.run_analysis()
    scheduler.check_alerts()
    
    # Main loop
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    # Create logs directory
    os.makedirs('logs', exist_ok=True)
    main()