import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления контактными данными (получение и обновление)
    Args: event - dict с httpMethod, body
          context - object с атрибутами request_id
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
    schema = 't_p75610138_lawyer_portfolio_sit'
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute(f'SELECT phone, email, address FROM {schema}.contacts ORDER BY id DESC LIMIT 1')
            row = cur.fetchone()
            
            if row:
                contacts = {
                    'phone': row[0],
                    'email': row[1],
                    'address': row[2]
                }
            else:
                contacts = {
                    'phone': '+7 (999) 123-45-67',
                    'email': 'lawyer@example.ru',
                    'address': 'г. Санкт-Петербург'
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'contacts': contacts}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_str = event.get('body', '{}')
            if not body_str or body_str.strip() == '':
                body_str = '{}'
            body_data = json.loads(body_str)
            
            phone = body_data.get('phone', '').strip()
            email = body_data.get('email', '').strip()
            address = body_data.get('address', '').strip()
            
            if not phone or not email or not address:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'All fields are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(f'SELECT id FROM {schema}.contacts ORDER BY id DESC LIMIT 1')
            existing = cur.fetchone()
            
            if existing:
                cur.execute(
                    f"UPDATE {schema}.contacts SET phone = %s, email = %s, address = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
                    (phone, email, address, existing[0])
                )
            else:
                cur.execute(
                    f"INSERT INTO {schema}.contacts (phone, email, address) VALUES (%s, %s, %s)",
                    (phone, email, address)
                )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Contacts updated'}),
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
