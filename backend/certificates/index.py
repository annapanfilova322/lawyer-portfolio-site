import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления сертификатами (получение и обновление ссылок)
    Args: event - dict с httpMethod, body
          context - object с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute('SELECT cert1_name, cert1_url, cert2_name, cert2_url, cert3_name, cert3_url FROM certificates WHERE id = 1')
            row = cur.fetchone()
            
            if row:
                certificates = [
                    {'name': row[0] or '', 'url': row[1] or ''},
                    {'name': row[2] or '', 'url': row[3] or ''},
                    {'name': row[4] or '', 'url': row[5] or ''}
                ]
            else:
                cur.execute("INSERT INTO certificates (id) VALUES (1)")
                conn.commit()
                certificates = [
                    {'name': 'Сертификат Сколково', 'url': ''},
                    {'name': 'Сертификат Комплаенс', 'url': ''},
                    {'name': '', 'url': ''}
                ]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'certificates': certificates}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_str = event.get('body', '[]')
            body_data = json.loads(body_str) if body_str else []
            
            if not isinstance(body_data, list) or len(body_data) != 3:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Expected array of 3 certificates'}),
                    'isBase64Encoded': False
                }
            
            cert1 = body_data[0]
            cert2 = body_data[1]
            cert3 = body_data[2]
            
            cur.execute(
                """INSERT INTO certificates (id, cert1_name, cert1_url, cert2_name, cert2_url, cert3_name, cert3_url) 
                   VALUES (1, %s, %s, %s, %s, %s, %s) 
                   ON CONFLICT (id) DO UPDATE SET 
                   cert1_name = %s, cert1_url = %s, 
                   cert2_name = %s, cert2_url = %s, 
                   cert3_name = %s, cert3_url = %s""",
                (cert1.get('name', ''), cert1.get('url', ''),
                 cert2.get('name', ''), cert2.get('url', ''),
                 cert3.get('name', ''), cert3.get('url', ''),
                 cert1.get('name', ''), cert1.get('url', ''),
                 cert2.get('name', ''), cert2.get('url', ''),
                 cert3.get('name', ''), cert3.get('url', ''))
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Certificates updated'}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
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
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()