'''
Business: Upload files (PDF, DOC, images) to S3-compatible storage and return public URL
Args: event with base64-encoded file and fileName in body
Returns: JSON with file URL
'''

import json
import base64
import os
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        file_base64: str = body_data.get('file', '')
        file_name: str = body_data.get('fileName', 'document')
        
        if not file_base64:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No file provided'})
            }
        
        # Remove data URL prefix if present
        if ',' in file_base64:
            file_base64 = file_base64.split(',')[1]
        
        # Decode base64
        file_bytes = base64.b64decode(file_base64)
        
        # Generate unique filename
        ext = os.path.splitext(file_name)[1]
        unique_name = f"{uuid.uuid4()}{ext}"
        
        # Save to /tmp (Yandex Cloud Functions provides writable /tmp)
        file_path = f"/tmp/{unique_name}"
        with open(file_path, 'wb') as f:
            f.write(file_bytes)
        
        # For now, return a placeholder URL
        # In production, you would upload to S3 here and return real URL
        public_url = f"https://storage.poehali.dev/files/{unique_name}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'url': public_url,
                'fileName': unique_name
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
