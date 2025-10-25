import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления отзывами (получение, добавление, удаление, обновление)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
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
            cur.execute('SELECT id, company, letter_url, created_at FROM testimonials ORDER BY sort_order ASC, created_at DESC')
            rows = cur.fetchall()
            testimonials = [
                {
                    'id': row[0],
                    'company': row[1],
                    'letterUrl': row[2] or '',
                    'createdAt': row[3].isoformat() if row[3] else None
                }
                for row in rows
            ]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'testimonials': testimonials}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            company = body_data.get('company', '').strip()
            letter_url = body_data.get('letterUrl', '')
            
            if not company:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Company name is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("SELECT COALESCE(MAX(sort_order), -1) + 1 FROM testimonials")
            next_order = cur.fetchone()[0]
            
            cur.execute(
                "INSERT INTO testimonials (company, letter_url, sort_order) VALUES (%s, %s, %s) RETURNING id",
                (company, letter_url, next_order)
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'message': 'Testimonial created'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            testimonial_id = body_data.get('id')
            company = body_data.get('company', '').strip()
            letter_url = body_data.get('letterUrl', '')
            
            if not testimonial_id or not company:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID and company name are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "UPDATE testimonials SET company = %s, letter_url = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
                (company, letter_url, testimonial_id)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Testimonial updated'}),
                'isBase64Encoded': False
            }
        
        elif method == 'PATCH':
            body_data = json.loads(event.get('body', '{}'))
            
            if not isinstance(body_data, list):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Array of testimonials required'}),
                    'isBase64Encoded': False
                }
            
            for idx, testimonial in enumerate(body_data):
                if 'id' in testimonial:
                    cur.execute(
                        "UPDATE testimonials SET sort_order = %s WHERE id = %s",
                        (idx, testimonial['id'])
                    )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Order updated'}),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {}) or {}
            testimonial_id = params.get('id')
            
            if not testimonial_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("DELETE FROM testimonials WHERE id = %s", (testimonial_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Testimonial deleted'}),
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