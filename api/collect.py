"""
Vercel Cron Function for data collection
This runs the Seongsu Coffee agent on a schedule
"""

import os
import sys
import json
from datetime import datetime

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agent import ForecastAgent

def handler(request):
    """Vercel function handler for scheduled data collection"""
    
    # Only allow POST requests (from cron)
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Initialize and run the agent
        agent = ForecastAgent('config.yaml')
        result = agent.run()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'status': 'success',
                'timestamp': datetime.now().isoformat(),
                'result': result
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