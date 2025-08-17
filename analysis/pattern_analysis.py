#!/usr/bin/env python3
"""
Seongsu Coffee Pattern Analysis
Finds trends, correlations, and predictive patterns in collected data
"""

import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

load_dotenv()

class SeongsuAnalyzer:
    """Main analyzer for Seongsu coffee data"""
    
    def __init__(self, db_path=None):
        dsn = db_path or os.getenv('POSTGRES_DSN')
        self.engine = create_engine(dsn)
        self.signals_df = None
        self.features_df = None
        
    def load_data(self):
        """Load all data from database"""
        print("📊 Loading data from database...")
        
        # Load raw signals
        with self.engine.connect() as conn:
            self.signals_df = pd.read_sql(text("""
                SELECT * FROM signals_raw 
                ORDER BY timestamp DESC
            """), conn)
            
            # Try to load features if they exist
            try:
                self.features_df = pd.read_sql(text("""
                    SELECT * FROM features_daily 
                    ORDER BY date DESC
                """), conn)
                print(f"   Features: {len(self.features_df)} daily records")
            except:
                print("   No daily features found (will compute from raw signals)")
                self.features_df = pd.DataFrame()
        
        if not self.signals_df.empty:
            self.signals_df['timestamp'] = pd.to_datetime(self.signals_df['timestamp'])
            print(f"   Signals: {len(self.signals_df)} records")
            print(f"   Date range: {self.signals_df['timestamp'].min()} to {self.signals_df['timestamp'].max()}")
        
        return self
    
    def analyze_trending_keywords(self):
        """Find trending keywords and patterns"""
        print("\n🔥 Analyzing Trending Keywords...")
        
        trends_data = self.signals_df[
            (self.signals_df['metric'] == 'search_index') & 
            (self.signals_df['value'] > 0)
        ].copy()
        
        if trends_data.empty:
            print("   No trending data found")
            return {}
        
        # Calculate velocity (rate of change)
        trends_data = trends_data.sort_values(['entity_id', 'timestamp'])
        trends_data['velocity'] = trends_data.groupby('entity_id')['value'].pct_change()
        trends_data['velocity_7d'] = trends_data.groupby('entity_id')['value'].rolling(168).mean().reset_index(0, drop=True)  # 7 days
        
        # Top trending by average
        top_trending = trends_data.groupby('entity_id').agg({
            'value': ['mean', 'max', 'std'],
            'velocity': 'mean',
            'timestamp': 'count'
        }).round(2)
        
        top_trending.columns = ['avg_value', 'max_value', 'volatility', 'avg_velocity', 'data_points']
        top_trending = top_trending.sort_values('avg_value', ascending=False)
        
        print("   Top 5 Trending Keywords:")
        for keyword, row in top_trending.head().iterrows():
            print(f"   📈 {keyword}: avg={row['avg_value']:.1f}, max={row['max_value']:.0f}, volatility={row['volatility']:.1f}")
        
        # Recent spike detection
        recent_spikes = trends_data[
            trends_data['timestamp'] > datetime.now() - timedelta(days=2)
        ].groupby('entity_id')['value'].max().sort_values(ascending=False)
        
        print(f"\n   Recent Spikes (last 48h):")
        for keyword, value in recent_spikes.head().items():
            if value > 10:  # Only significant spikes
                print(f"   🚀 {keyword}: {value:.0f}")
        
        return {
            'trending': top_trending,
            'recent_spikes': recent_spikes
        }
    
    def analyze_temporal_patterns(self):
        """Find time-based patterns"""
        print("\n⏰ Analyzing Temporal Patterns...")
        
        trends_data = self.signals_df[
            self.signals_df['metric'] == 'search_index'
        ].copy()
        
        if trends_data.empty:
            return {}
        
        trends_data['hour'] = trends_data['timestamp'].dt.hour
        trends_data['weekday'] = trends_data['timestamp'].dt.dayofweek
        trends_data['date'] = trends_data['timestamp'].dt.date
        
        # Hourly patterns
        hourly_avg = trends_data.groupby('hour')['value'].mean()
        peak_hours = hourly_avg.nlargest(3)
        
        print("   Peak Search Hours:")
        for hour, value in peak_hours.items():
            time_str = f"{hour:02d}:00"
            print(f"   🕐 {time_str}: {value:.1f} avg searches")
        
        # Weekly patterns  
        weekday_avg = trends_data.groupby('weekday')['value'].mean()
        weekday_names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        
        print(f"\n   Weekly Pattern:")
        for day_idx, value in weekday_avg.items():
            day_name = weekday_names[day_idx]
            print(f"   📅 {day_name}: {value:.1f} avg searches")
        
        return {
            'hourly': hourly_avg,
            'weekly': weekday_avg,
            'peak_hours': peak_hours
        }
    
    def analyze_content_correlations(self):
        """Find correlations between different content types"""
        print("\n🔗 Analyzing Content Correlations...")
        
        # Create pivot table for correlation analysis
        correlation_data = self.signals_df.pivot_table(
            index='timestamp',
            columns=['source', 'entity_id'],
            values='value',
            fill_value=0
        )
        
        if correlation_data.empty:
            print("   Insufficient data for correlation analysis")
            return {}
        
        # Find correlations between search trends and video content
        correlations = correlation_data.corr()
        
        # Focus on cross-platform correlations
        google_trends = [col for col in correlations.columns if 'google_trends' in str(col)]
        youtube_signals = [col for col in correlations.columns if 'youtube' in str(col)]
        
        if google_trends and youtube_signals:
            cross_correlations = correlations.loc[google_trends, youtube_signals]
            
            print("   Top Cross-Platform Correlations:")
            # Flatten and sort correlations
            corr_pairs = []
            for gt_col in google_trends:
                for yt_col in youtube_signals:
                    corr_val = cross_correlations.loc[gt_col, yt_col]
                    if not pd.isna(corr_val) and abs(corr_val) > 0.3:
                        corr_pairs.append((gt_col, yt_col, corr_val))
            
            corr_pairs.sort(key=lambda x: abs(x[2]), reverse=True)
            
            for gt, yt, corr in corr_pairs[:5]:
                print(f"   🔗 {corr:.2f}: {gt[1]} ↔ YouTube content")
        
        return {
            'correlation_matrix': correlations,
            'cross_platform': cross_correlations if google_trends and youtube_signals else None
        }
    
    def detect_surge_patterns(self):
        """Detect patterns that predict surge events"""
        print("\n📈 Detecting Surge Patterns...")
        
        # Define surge as top 20% of search activity
        trends_data = self.signals_df[
            self.signals_df['metric'] == 'search_index'
        ].copy()
        
        if trends_data.empty:
            return {}
        
        # Calculate surge threshold
        surge_threshold = trends_data['value'].quantile(0.8)
        
        # Mark surge events
        trends_data['is_surge'] = trends_data['value'] > surge_threshold
        
        # Look for leading indicators
        trends_data = trends_data.sort_values(['entity_id', 'timestamp'])
        trends_data['surge_in_6h'] = trends_data.groupby('entity_id')['is_surge'].shift(-6)  # 6 hours ahead
        trends_data['surge_in_12h'] = trends_data.groupby('entity_id')['is_surge'].shift(-12)  # 12 hours ahead
        
        # Features that predict surges
        trends_data['velocity'] = trends_data.groupby('entity_id')['value'].pct_change()
        trends_data['hour'] = trends_data['timestamp'].dt.hour
        trends_data['weekday'] = trends_data['timestamp'].dt.dayofweek
        
        # Simple surge prediction features
        surge_data = trends_data.dropna()
        
        if len(surge_data) > 50:  # Need enough data
            # Features that correlate with future surges
            feature_cols = ['value', 'velocity', 'hour', 'weekday']
            correlations_6h = surge_data[feature_cols + ['surge_in_6h']].corr()['surge_in_6h'].abs().sort_values(ascending=False)
            correlations_12h = surge_data[feature_cols + ['surge_in_12h']].corr()['surge_in_12h'].abs().sort_values(ascending=False)
            
            print(f"   Surge threshold: {surge_threshold:.1f}")
            print(f"   Surge events detected: {trends_data['is_surge'].sum()}")
            
            print(f"\n   Best 6-hour surge predictors:")
            for feature, corr in correlations_6h.head(3).items():
                if feature != 'surge_in_6h':
                    print(f"   🔮 {feature}: {corr:.3f} correlation")
            
            return {
                'surge_threshold': surge_threshold,
                'surge_events': trends_data['is_surge'].sum(),
                'predictors_6h': correlations_6h,
                'predictors_12h': correlations_12h,
                'surge_data': surge_data
            }
        
        return {'insufficient_data': True}
    
    def generate_insights(self):
        """Generate actionable insights"""
        print("\n💡 Generating Insights...")
        
        insights = []
        
        # Recent data summary
        recent_data = self.signals_df[
            self.signals_df['timestamp'] > datetime.now() - timedelta(days=1)
        ]
        
        if not recent_data.empty:
            recent_keywords = recent_data[
                recent_data['metric'] == 'search_index'
            ].groupby('entity_id')['value'].max().sort_values(ascending=False)
            
            if len(recent_keywords) > 0:
                top_keyword = recent_keywords.index[0]
                top_value = recent_keywords.iloc[0]
                insights.append(f"🔥 '{top_keyword}' is currently trending highest ({top_value:.0f})")
        
        # YouTube content insights
        youtube_data = self.signals_df[self.signals_df['source'] == 'youtube_geo']
        if not youtube_data.empty:
            total_views = youtube_data['value'].sum()
            video_count = len(youtube_data)
            avg_views = total_views / video_count if video_count > 0 else 0
            insights.append(f"📹 {video_count} videos tracked with {total_views:.0f} total views (avg: {avg_views:.0f})")
        
        # Data quality insights
        total_signals = len(self.signals_df)
        unique_sources = self.signals_df['source'].nunique()
        date_span = (self.signals_df['timestamp'].max() - self.signals_df['timestamp'].min()).days
        insights.append(f"📊 {total_signals} signals from {unique_sources} sources over {date_span} days")
        
        for insight in insights:
            print(f"   {insight}")
        
        return insights
    
    def create_summary_report(self):
        """Create a comprehensive analysis report"""
        print("=" * 60)
        print("📋 SEONGSU COFFEE INTELLIGENCE REPORT")
        print("=" * 60)
        
        self.load_data()
        
        if self.signals_df.empty:
            print("❌ No data available for analysis")
            return
        
        # Run all analyses
        trending_analysis = self.analyze_trending_keywords()
        temporal_analysis = self.analyze_temporal_patterns()
        correlation_analysis = self.analyze_content_correlations()
        surge_analysis = self.detect_surge_patterns()
        insights = self.generate_insights()
        
        print("\n" + "=" * 60)
        print("✅ Analysis Complete!")
        print(f"📅 Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 60)
        
        return {
            'trending': trending_analysis,
            'temporal': temporal_analysis,
            'correlations': correlation_analysis,
            'surge_patterns': surge_analysis,
            'insights': insights
        }

def main():
    """Run complete analysis"""
    analyzer = SeongsuAnalyzer()
    report = analyzer.create_summary_report()
    return report

if __name__ == "__main__":
    main()