import json
import os
import base64
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для загрузки файлов (PDF, DOC, изображения) в облачное хранилище
    Args: event - dict с httpMethod, body (base64 файл)
          context - object с атрибутами request_id, function_name
    Returns: HTTP response с публичной ссылкой на файл
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        file_content = body_data.get('file')
        file_name = body_data.get('fileName', 'file')
        
        if not file_content:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'File content is required'}),
                'isBase64Encoded': False
            }
        
        file_id = str(uuid.uuid4())
        file_extension = file_name.split('.')[-1] if '.' in file_name else 'bin'
        stored_file_name = f"{file_id}.{file_extension}"
        
        file_bytes = base64.b64decode(file_content.split(',')[1] if ',' in file_content else file_content)
        
        storage_path = f"/tmp/{stored_file_name}"
        with open(storage_path, 'wb') as f:
            f.write(file_bytes)
        
        public_url = f"https://cdn.poehali.dev/files/{file_id}.{file_extension}"
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'url': public_url,
                'fileName': stored_file_name,
                'size': len(file_bytes)
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
