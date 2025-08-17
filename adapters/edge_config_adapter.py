#!/usr/bin/env python3
"""
Vercel Edge Config Adapter
Adapts the agent to use Vercel Edge Config instead of PostgreSQL
"""

import os
import json
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

class EdgeConfigAdapter:
    """Adapter to store signals in Vercel Edge Config"""
    
    def __init__(self):
        self.edge_config_id = os.getenv('EDGE_CONFIG')
        self.edge_config_token = os.getenv('EDGE_CONFIG_TOKEN')
        
        if not self.edge_config_id or not self.edge_config_token:
            raise ValueError("EDGE_CONFIG and EDGE_CONFIG_TOKEN required")
        
        self.api_url = f"https://api.vercel.com/v1/edge-config/{self.edge_config_id}/items"
        self.read_url = f"https://edge-config.vercel.com/{self.edge_config_id}"
        self.headers = {
            'Authorization': f'Bearer {self.edge_config_token}',
            'content-type': 'application/json'
        }
    
    def store_signals(self, signals: List[Dict[str, Any]]) -> bool:
        """Store signals in Edge Config (append to existing data)"""
        try:
            # Get existing data
            existing_data = self.get_all_signals()
            
            # Add new signals with proper serialization
            for signal in signals:
                # Convert timestamp to string
                if hasattr(signal.get('timestamp'), 'isoformat'):
                    signal['timestamp'] = signal['timestamp'].isoformat()
                elif signal.get('timestamp'):
                    signal['timestamp'] = str(signal['timestamp'])
                else:
                    signal['timestamp'] = datetime.now().isoformat()
                
                # Ensure all values are JSON serializable
                signal['value'] = float(signal.get('value', 0))
                signal['entity_id'] = str(signal.get('entity_id', ''))
                signal['source'] = str(signal.get('source', ''))
                signal['metric'] = str(signal.get('metric', ''))
                
                existing_data.append(signal)
            
            # Keep only last 1000 signals (Edge Config has size limits)
            if len(existing_data) > 1000:
                existing_data = existing_data[-1000:]
            
            # Store back to Edge Config using correct API format
            payload = {
                "items": [
                    {
                        "operation": "update",
                        "key": "signals", 
                        "value": existing_data
                    },
                    {
                        "operation": "update",
                        "key": "last_updated",
                        "value": datetime.now().isoformat()
                    }
                ]
            }
            
            response = requests.patch(
                self.api_url,
                headers=self.headers,
                json=payload
            )
            
            print(f"Store response: {response.status_code}")
            if response.status_code != 200:
                print(f"Store error: {response.text}")
            
            return response.status_code == 200
            
        except Exception as e:
            print(f"Failed to store signals: {e}")
            return False
    
    def get_all_signals(self) -> List[Dict[str, Any]]:
        """Get all signals from Edge Config"""
        try:
            response = requests.get(
                f"{self.read_url}/item/signals",
                headers=self.headers
            )
            
            if response.status_code == 200:
                return response.json() or []
            else:
                return []
                
        except Exception as e:
            print(f"Failed to get signals: {e}")
            return []
    
    def get_recent_signals(self, hours: int = 24) -> List[Dict[str, Any]]:
        """Get signals from last N hours"""
        all_signals = self.get_all_signals()
        cutoff = datetime.now() - timedelta(hours=hours)
        
        recent = []
        for signal in all_signals:
            try:
                signal_time = datetime.fromisoformat(signal['timestamp'].replace('Z', '+00:00'))
                if signal_time > cutoff:
                    recent.append(signal)
            except:
                continue
        
        return recent
    
    def get_signals_df(self) -> pd.DataFrame:
        """Get signals as pandas DataFrame"""
        signals = self.get_all_signals()
        
        if not signals:
            return pd.DataFrame()
        
        df = pd.DataFrame(signals)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        return df
    
    def store_analysis_results(self, analysis: Dict[str, Any]) -> bool:
        """Store analysis results"""
        try:
            payload = {
                "items": [
                    {
                        "operation": "update",
                        "key": "latest_analysis",
                        "value": {
                            **analysis,
                            "generated_at": datetime.now().isoformat()
                        }
                    }
                ]
            }
            
            response = requests.patch(
                self.api_url,
                headers=self.headers,
                json=payload
            )
            
            return response.status_code == 200
            
        except Exception as e:
            print(f"Failed to store analysis: {e}")
            return False
    
    def get_latest_analysis(self) -> Optional[Dict[str, Any]]:
        """Get latest analysis results"""
        try:
            response = requests.get(
                f"{self.read_url}/item/latest_analysis",
                headers=self.headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return None
                
        except Exception as e:
            print(f"Failed to get analysis: {e}")
            return None
    
    def store_alerts(self, alerts: List[Dict[str, Any]]) -> bool:
        """Store alert history"""
        try:
            # Get existing alerts
            existing_alerts = self.get_alert_history()
            
            # Add new alerts
            for alert in alerts:
                alert['timestamp'] = alert.get('timestamp', datetime.now()).isoformat() if hasattr(alert.get('timestamp'), 'isoformat') else str(alert.get('timestamp', datetime.now()))
                existing_alerts.append(alert)
            
            # Keep only last 100 alerts
            if len(existing_alerts) > 100:
                existing_alerts = existing_alerts[-100:]
            
            response = requests.patch(
                f"{self.base_url}/items",
                headers=self.headers,
                json={"alert_history": existing_alerts}
            )
            
            return response.status_code == 200
            
        except Exception as e:
            print(f"Failed to store alerts: {e}")
            return False
    
    def get_alert_history(self) -> List[Dict[str, Any]]:
        """Get alert history"""
        try:
            response = requests.get(
                f"{self.base_url}/item/alert_history",
                headers=self.headers
            )
            
            if response.status_code == 200:
                return response.json() or []
            else:
                return []
                
        except Exception as e:
            print(f"Failed to get alert history: {e}")
            return []
    
    def get_stats(self) -> Dict[str, Any]:
        """Get basic statistics"""
        signals = self.get_all_signals()
        
        if not signals:
            return {
                "total_signals": 0,
                "sources": [],
                "date_range": None,
                "last_updated": None
            }
        
        df = pd.DataFrame(signals)
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        return {
            "total_signals": len(signals),
            "sources": df['source'].unique().tolist() if 'source' in df.columns else [],
            "entities": df['entity_id'].unique().tolist() if 'entity_id' in df.columns else [],
            "date_range": {
                "start": df['timestamp'].min().isoformat(),
                "end": df['timestamp'].max().isoformat()
            },
            "last_updated": df['timestamp'].max().isoformat()
        }