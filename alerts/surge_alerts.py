#!/usr/bin/env python3
"""
Seongsu Coffee Surge Alert System
Detects trending spikes and predicts surge events
"""

import os
import json
import smtplib
import requests
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import pandas as pd
import numpy as np

load_dotenv()

class SurgeAlertSystem:
    """Alert system for coffee trend spikes and surge predictions"""
    
    def __init__(self):
        dsn = os.getenv('POSTGRES_DSN')
        self.engine = create_engine(dsn)
        self.alert_config = self._load_alert_config()
        
    def _load_alert_config(self):
        """Load alert configuration"""
        return {
            'spike_multiplier': float(os.getenv('SPIKE_MULTIPLIER', '2.0')),
            'surge_threshold_percentile': float(os.getenv('SURGE_THRESHOLD', '80')),
            'min_data_points': int(os.getenv('MIN_DATA_POINTS', '10')),
            'lookback_hours': int(os.getenv('LOOKBACK_HOURS', '24')),
            'prediction_hours': int(os.getenv('PREDICTION_HOURS', '6')),
            
            # Alert channels
            'slack_webhook': os.getenv('SLACK_WEBHOOK_URL'),
            'email_smtp_server': os.getenv('EMAIL_SMTP_SERVER', 'smtp.gmail.com'),
            'email_smtp_port': int(os.getenv('EMAIL_SMTP_PORT', '587')),
            'email_user': os.getenv('EMAIL_USER'),
            'email_password': os.getenv('EMAIL_PASSWORD'),
            'email_recipients': os.getenv('EMAIL_RECIPIENTS', '').split(','),
            
            # Venues to monitor
            'monitored_venues': [
                'onion_seongsu', 'layered_seongsu', 'daelim_changgo',
                'fritz_seongsu', 'knotted_seongsu', 'blue_bottle_seongsu'
            ]
        }
    
    def detect_keyword_spikes(self):
        """Detect sudden spikes in keyword search trends"""
        with self.engine.connect() as conn:
            # Get recent trends data
            lookback = datetime.now() - timedelta(hours=self.alert_config['lookback_hours'])
            
            recent_data = pd.read_sql(text("""
                SELECT entity_id, timestamp, value
                FROM signals_raw
                WHERE metric = 'search_index'
                AND timestamp > :lookback
                ORDER BY entity_id, timestamp
            """), conn, params={'lookback': lookback})
        
        if recent_data.empty:
            return []
        
        spikes = []
        
        for keyword in recent_data['entity_id'].unique():
            keyword_data = recent_data[recent_data['entity_id'] == keyword].copy()
            
            if len(keyword_data) < self.alert_config['min_data_points']:
                continue
            
            # Calculate baseline (median of older data)
            baseline = keyword_data['value'].quantile(0.5)
            
            # Find recent peaks
            recent_peak = keyword_data['value'].tail(6).max()  # Last 6 hours
            current_spike_ratio = recent_peak / baseline if baseline > 0 else 0
            
            # Alert if spike exceeds threshold
            if current_spike_ratio >= self.alert_config['spike_multiplier']:
                spikes.append({
                    'keyword': keyword,
                    'spike_ratio': current_spike_ratio,
                    'baseline': baseline,
                    'peak_value': recent_peak,
                    'timestamp': keyword_data['timestamp'].max(),
                    'severity': self._classify_severity(current_spike_ratio)
                })
        
        return sorted(spikes, key=lambda x: x['spike_ratio'], reverse=True)
    
    def predict_venue_surges(self):
        """Predict surge events at specific venues"""
        predictions = []
        
        # For each monitored venue, analyze signals
        for venue_id in self.alert_config['monitored_venues']:
            prediction = self._analyze_venue_signals(venue_id)
            if prediction:
                predictions.append(prediction)
        
        return sorted(predictions, key=lambda x: x['surge_probability'], reverse=True)
    
    def _analyze_venue_signals(self, venue_id):
        """Analyze signals for a specific venue to predict surge"""
        with self.engine.connect() as conn:
            # Get recent signals that might affect this venue
            lookback = datetime.now() - timedelta(hours=self.alert_config['lookback_hours'])
            
            # Get relevant keyword trends (venue name, area, popular items)
            venue_keywords = self._get_venue_keywords(venue_id)
            
            if not venue_keywords:
                return None
            
            keyword_placeholders = ', '.join([f':keyword{i}' for i in range(len(venue_keywords))])
            keyword_params = {f'keyword{i}': kw for i, kw in enumerate(venue_keywords)}
            
            signals_data = pd.read_sql(text(f"""
                SELECT entity_id, timestamp, value, source
                FROM signals_raw
                WHERE (entity_id IN ({keyword_placeholders}) OR entity_type = 'venue')
                AND timestamp > :lookback
                ORDER BY timestamp DESC
            """), conn, params={'lookback': lookback, **keyword_params})
            
            if signals_data.empty:
                return None
            
            # Calculate surge probability based on multiple factors
            surge_score = 0
            factors = []
            
            # Factor 1: Keyword trend velocity
            for keyword in venue_keywords:
                keyword_data = signals_data[signals_data['entity_id'] == keyword]
                if not keyword_data.empty:
                    recent_trend = keyword_data['value'].tail(3).mean()
                    baseline_trend = keyword_data['value'].head(10).mean()
                    velocity = (recent_trend - baseline_trend) / baseline_trend if baseline_trend > 0 else 0
                    
                    if velocity > 0.5:  # 50% increase
                        surge_score += 0.3
                        factors.append(f"'{keyword}' trending up {velocity:.1%}")
            
            # Factor 2: YouTube content activity
            youtube_data = signals_data[signals_data['source'] == 'youtube_geo']
            if not youtube_data.empty:
                recent_videos = len(youtube_data[youtube_data['timestamp'] > datetime.now() - timedelta(hours=12)])
                if recent_videos > 2:
                    surge_score += 0.2
                    factors.append(f"{recent_videos} recent videos")
            
            # Factor 3: Time-based patterns (weekends, peak hours)
            current_hour = datetime.now().hour
            current_weekday = datetime.now().weekday()
            
            # Peak hours (typically 10-12, 14-16, 19-21 in Seoul)
            if current_hour in [10, 11, 14, 15, 16, 19, 20, 21]:
                surge_score += 0.1
                factors.append("peak hour")
            
            # Weekend effect
            if current_weekday >= 5:  # Saturday or Sunday
                surge_score += 0.15
                factors.append("weekend")
            
            # Factor 4: General area activity
            area_signals = signals_data[signals_data['entity_id'] == 'SEONGSU']
            if not area_signals.empty:
                area_activity = area_signals['value'].mean()
                if area_activity > 50:  # High area activity
                    surge_score += 0.1
                    factors.append("high area activity")
            
            surge_probability = min(surge_score, 0.95)  # Cap at 95%
            
            if surge_probability > 0.3:  # Only return if significant
                return {
                    'venue_id': venue_id,
                    'venue_name': self._get_venue_name(venue_id),
                    'surge_probability': surge_probability,
                    'prediction_confidence': 'high' if surge_probability > 0.7 else 'medium',
                    'contributing_factors': factors,
                    'timestamp': datetime.now(),
                    'prediction_window': f"{self.alert_config['prediction_hours']} hours"
                }
        
        return None
    
    def _get_venue_keywords(self, venue_id):
        """Get keywords associated with a venue"""
        keyword_map = {
            'onion_seongsu': ['어니언', '성수 카페', '성수 빵집'],
            'layered_seongsu': ['레이어드', '성수 빵집', '크로플'],
            'daelim_changgo': ['대림창고', '성수 카페'],
            'fritz_seongsu': ['프릳츠', '성수 카페'],
            'knotted_seongsu': ['나티드', '성수 빵집'],
            'blue_bottle_seongsu': ['블루보틀', '성수 카페']
        }
        return keyword_map.get(venue_id, ['성수 카페'])
    
    def _get_venue_name(self, venue_id):
        """Get human-readable venue name"""
        name_map = {
            'onion_seongsu': 'Onion Seongsu',
            'layered_seongsu': 'Layered Seongsu',
            'daelim_changgo': 'Daelim Changgo',
            'fritz_seongsu': 'Fritz Coffee',
            'knotted_seongsu': 'Knotted',
            'blue_bottle_seongsu': 'Blue Bottle Coffee'
        }
        return name_map.get(venue_id, venue_id)
    
    def _classify_severity(self, spike_ratio):
        """Classify alert severity"""
        if spike_ratio >= 5.0:
            return 'critical'
        elif spike_ratio >= 3.0:
            return 'high'
        elif spike_ratio >= 2.0:
            return 'medium'
        else:
            return 'low'
    
    def send_slack_alert(self, message, severity='medium'):
        """Send alert to Slack"""
        if not self.alert_config['slack_webhook']:
            return False
        
        colors = {
            'critical': '#ff0000',
            'high': '#ff6600', 
            'medium': '#ffcc00',
            'low': '#00cc00'
        }
        
        payload = {
            'text': '☕ Seongsu Coffee Alert',
            'attachments': [{
                'color': colors.get(severity, '#ffcc00'),
                'text': message,
                'ts': int(datetime.now().timestamp())
            }]
        }
        
        try:
            response = requests.post(self.alert_config['slack_webhook'], json=payload)
            return response.status_code == 200
        except Exception as e:
            print(f"Failed to send Slack alert: {e}")
            return False
    
    def send_email_alert(self, subject, message):
        """Send email alert"""
        if not all([self.alert_config['email_user'], 
                   self.alert_config['email_password'],
                   self.alert_config['email_recipients']]):
            return False
        
        try:
            msg = MIMEMultipart()
            msg['From'] = self.alert_config['email_user']
            msg['To'] = ', '.join(self.alert_config['email_recipients'])
            msg['Subject'] = subject
            
            msg.attach(MIMEText(message, 'plain'))
            
            server = smtplib.SMTP(self.alert_config['email_smtp_server'], 
                                self.alert_config['email_smtp_port'])
            server.starttls()
            server.login(self.alert_config['email_user'], 
                        self.alert_config['email_password'])
            
            text = msg.as_string()
            server.sendmail(self.alert_config['email_user'], 
                          self.alert_config['email_recipients'], text)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Failed to send email alert: {e}")
            return False
    
    def format_spike_alert(self, spikes):
        """Format spike detection alert"""
        if not spikes:
            return None
        
        message = "🔥 **KEYWORD SPIKE DETECTED**\n\n"
        
        for spike in spikes[:3]:  # Top 3 spikes
            severity_emoji = {
                'critical': '🚨',
                'high': '⚠️',
                'medium': '📈',
                'low': '📊'
            }
            
            emoji = severity_emoji.get(spike['severity'], '📊')
            message += f"{emoji} **{spike['keyword']}**\n"
            message += f"   Spike: {spike['spike_ratio']:.1f}x baseline\n"
            message += f"   Peak: {spike['peak_value']:.0f}\n"
            message += f"   Severity: {spike['severity']}\n\n"
        
        message += f"🕐 Detected at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        return message
    
    def format_surge_alert(self, predictions):
        """Format surge prediction alert"""
        if not predictions:
            return None
        
        message = "📍 **VENUE SURGE PREDICTION**\n\n"
        
        for pred in predictions[:3]:  # Top 3 predictions
            confidence_emoji = {
                'high': '🎯',
                'medium': '🔮',
                'low': '💭'
            }
            
            emoji = confidence_emoji.get(pred['prediction_confidence'], '💭')
            message += f"{emoji} **{pred['venue_name']}**\n"
            message += f"   Surge probability: {pred['surge_probability']:.1%}\n"
            message += f"   Confidence: {pred['prediction_confidence']}\n"
            message += f"   Window: next {pred['prediction_window']}\n"
            
            if pred['contributing_factors']:
                factors = ', '.join(pred['contributing_factors'][:3])
                message += f"   Factors: {factors}\n"
            
            message += "\n"
        
        message += f"🕐 Predicted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        return message
    
    def run_alert_check(self):
        """Run complete alert check cycle"""
        print(f"🚨 Running alert check at {datetime.now()}")
        
        alerts_sent = 0
        
        # Check for keyword spikes
        spikes = self.detect_keyword_spikes()
        if spikes:
            spike_alert = self.format_spike_alert(spikes)
            if spike_alert:
                # Determine overall severity
                max_severity = max([s['severity'] for s in spikes], 
                                 key=lambda x: ['low', 'medium', 'high', 'critical'].index(x))
                
                self.send_slack_alert(spike_alert, max_severity)
                
                if max_severity in ['high', 'critical']:
                    self.send_email_alert("🔥 Seongsu Coffee Spike Alert", spike_alert)
                
                alerts_sent += 1
                print(f"   📤 Sent spike alert (severity: {max_severity})")
        
        # Check for surge predictions
        predictions = self.predict_venue_surges()
        if predictions:
            surge_alert = self.format_surge_alert(predictions)
            if surge_alert:
                # Send surge predictions (lower priority)
                self.send_slack_alert(surge_alert, 'medium')
                alerts_sent += 1
                print(f"   📤 Sent surge prediction alert")
        
        if alerts_sent == 0:
            print("   ✅ No alerts triggered")
        
        return {
            'spikes': spikes,
            'predictions': predictions,
            'alerts_sent': alerts_sent
        }

def main():
    """Run alert system"""
    alert_system = SurgeAlertSystem()
    results = alert_system.run_alert_check()
    
    print(f"\nAlert Summary:")
    print(f"  Spikes detected: {len(results['spikes'])}")
    print(f"  Surge predictions: {len(results['predictions'])}")
    print(f"  Alerts sent: {results['alerts_sent']}")
    
    return results

if __name__ == "__main__":
    main()