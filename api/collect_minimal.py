"""
Ultra-minimal Vercel Function for Google Trends only
No imports from main codebase to avoid heavy dependencies
"""

import os
import json
from datetime import datetime
import requests

def handler(request):
    """Ultra-minimal function that just stores a test signal"""
    
    try:
        # Just store a simple test signal to prove the system works
        test_signal = {
            'entity_id': 'test_keyword',
            'value': 42.0,
            'source': 'vercel_function',
            'timestamp': datetime.now().isoformat(),
            'status': 'deployed_successfully'
        }
        
        # Try to connect to Supabase via REST API
        supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
        supabase_key = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
        
        if supabase_url and supabase_key:
            # Store via Supabase REST API
            headers = {
                'apikey': supabase_key,
                'Authorization': f'Bearer {supabase_key}',
                'Content-Type': 'application/json'
            }
            
            payload = {
                'entity_id': 'vercel_test',
                'entity_type': 'system',
                'metric': 'deployment_test',
                'value': 1.0,
                'source': 'vercel_function',
                'timestamp': datetime.now().isoformat(),
                'metadata': {'deployment': 'success'}
            }
            
            try:
                response = requests.post(
                    f'{supabase_url}/rest/v1/signals_raw',
                    headers=headers,
                    json=payload
                )
                
                if response.status_code in [200, 201]:
                    storage_status = 'stored_in_supabase'
                else:
                    storage_status = f'storage_failed_{response.status_code}'
                    
            except Exception as e:
                storage_status = f'storage_error_{str(e)[:50]}'
        else:
            storage_status = 'no_supabase_config'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'status': 'success',
                'message': 'Vercel function deployed successfully',
                'storage': storage_status,
                'timestamp': datetime.now().isoformat(),
                'environment': {
                    'has_supabase_url': bool(supabase_url),
                    'has_supabase_key': bool(supabase_key)
                }
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
                'error': str(e),
                'timestamp': datetime.now().isoformat()
            })
        }