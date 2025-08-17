#!/usr/bin/env python3
"""
Seongsu Coffee Agent - Edge Config Version
Adapted to use Vercel Edge Config instead of PostgreSQL
"""

import os
import yaml
import logging
import pandas as pd
from datetime import datetime
from dotenv import load_dotenv
from adapters.edge_config_adapter import EdgeConfigAdapter

# Import existing collectors
from agent import GoogleTrendsCollector, YouTubeGeoCollector, GoogleMapsBusynessCollector

load_dotenv()

class EdgeForecastAgent:
    """Forecast agent using Vercel Edge Config"""
    
    def __init__(self, config_path: str):
        self.config = self._load_config(config_path)
        self.storage = EdgeConfigAdapter()
        
        # Initialize collectors
        youtube_api_key = os.getenv('YOUTUBE_API_KEY')
        self.collectors = {
            'google_trends': GoogleTrendsCollector(self.config),
            'youtube_geo': YouTubeGeoCollector(youtube_api_key, self.config),
            'gmaps_busyness': GoogleMapsBusynessCollector(self.config)
        }
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def _load_config(self, config_path: str) -> dict:
        """Load configuration from YAML"""
        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    
    def _get_all_keywords(self):
        """Get all keywords from config"""
        keywords = []
        keyword_groups = self.config.get("keywords", {})
        for group_name, group_keywords in keyword_groups.items():
            keywords.extend(group_keywords)
        return keywords
    
    def _format_signals_for_edge(self, df: pd.DataFrame, source: str):
        """Format pandas DataFrame as signals for Edge Config"""
        if df.empty:
            return []
        
        signals = []
        for idx, row in df.iterrows():
            signal = {
                'entity_id': getattr(row, 'entity_id', str(idx)),
                'entity_type': getattr(row, 'entity_type', 'keyword'),
                'metric': getattr(row, 'metric', 'value'),
                'value': float(getattr(row, 'value', 0)),
                'source': source,
                'timestamp': datetime.now(),
                'metadata': getattr(row, 'metadata', {})
            }
            signals.append(signal)
        
        return signals
    
    def collect_all_signals(self):
        """Collect signals from all sources"""
        all_signals = []
        
        try:
            # 1. Google Trends
            keywords = self._get_all_keywords()
            if keywords and self.collectors.get("google_trends"):
                self.logger.info("🔄 Collecting Google Trends...")
                trends_df = self.collectors["google_trends"].fetch(keywords)
                if not trends_df.empty:
                    signals = self._format_signals_for_edge(trends_df, "google_trends")
                    all_signals.extend(signals)
                    self.logger.info(f"✅ Collected {len(signals)} Google Trends signals")
                    
            # 2. YouTube Geo
            if self.collectors.get("youtube_geo"):
                self.logger.info("🔄 Collecting YouTube...")
                queries = ["성수 카페", "성수 빵집"] + keywords[:5]
                youtube_df = self.collectors["youtube_geo"].fetch(queries)
                if not youtube_df.empty:
                    signals = self._format_signals_for_edge(youtube_df, "youtube_geo")
                    all_signals.extend(signals)
                    self.logger.info(f"✅ Collected {len(signals)} YouTube signals")
                    
            # 3. Google Maps Busyness
            venues = self.config.get("venues", [])
            if venues and self.collectors.get("gmaps_busyness"):
                self.logger.info("🔄 Collecting Google Maps busyness...")
                busyness_df = self.collectors["gmaps_busyness"].fetch(venues)
                if not busyness_df.empty:
                    signals = self._format_signals_for_edge(busyness_df, "gmaps_busyness")
                    all_signals.extend(signals)
                    self.logger.info(f"✅ Collected {len(signals)} Maps busyness signals")
                    
        except Exception as e:
            self.logger.error(f"❌ Collection error: {e}")
        
        return all_signals
    
    def run(self):
        """Main collection run"""
        self.logger.info("🚀 Starting Seongsu Coffee Agent (Edge Config)")
        
        # Collect signals
        signals = self.collect_all_signals()
        
        if signals:
            # Store in Edge Config
            success = self.storage.store_signals(signals)
            
            if success:
                self.logger.info(f"✅ Stored {len(signals)} signals in Edge Config")
                
                # Get and log stats
                stats = self.storage.get_stats()
                self.logger.info(f"📊 Total signals: {stats['total_signals']}")
                self.logger.info(f"📊 Sources: {', '.join(stats['sources'])}")
                
                return {
                    'status': 'success',
                    'signals_collected': len(signals),
                    'total_stored': stats['total_signals']
                }
            else:
                self.logger.error("❌ Failed to store signals")
                return {'status': 'storage_failed'}
        else:
            self.logger.warning("⚠️ No signals collected")
            return {'status': 'no_signals'}

def main():
    """Run the agent"""
    agent = EdgeForecastAgent('config.yaml')
    result = agent.run()
    print(f"Agent result: {result}")
    return result

if __name__ == "__main__":
    main()