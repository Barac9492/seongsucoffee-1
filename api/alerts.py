"""
Vercel Function for checking alerts
"""

import os
import sys
import json
from datetime import datetime

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from alerts.surge_alerts import SurgeAlertSystem

def handler(request):
    """Vercel function handler for alerts"""
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Check alerts
        alert_system = SurgeAlertSystem()
        results = alert_system.run_alert_check()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'status': 'success',
                'timestamp': datetime.now().isoformat(),
                'results': results
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'status': 'error',
                'timestamp': datetime.now().isoformat(),
                'error': str(e)
            })
        }