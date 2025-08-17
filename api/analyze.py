"""
Vercel Function for running analysis
"""

import os
import sys
import json
from datetime import datetime

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from analysis.pattern_analysis import SeongsuAnalyzer

def handler(request):
    """Vercel function handler for analysis"""
    
    if request.method != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Run analysis
        analyzer = SeongsuAnalyzer()
        report = analyzer.create_summary_report()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'status': 'success',
                'timestamp': datetime.now().isoformat(),
                'report': report
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