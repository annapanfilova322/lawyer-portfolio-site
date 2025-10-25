import json
import os
import bcrypt
import jwt
import psycopg2
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

JWT_SECRET = os.environ.get('ADMIN_JWT_SECRET', '')
PASSWORD_HASH = os.environ.get('ADMIN_PASSWORD_HASH', '')
DATABASE_URL = os.environ.get('DATABASE_URL', '')
TOKEN_EXPIRY_HOURS = 24
MASTER_KEY = "K7#m@nPq$vR2!xL"

login_attempts: Dict[str, Dict[str, Any]] = {}
master_key_attempts: Dict[str, Dict[str, Any]] = {}
MAX_ATTEMPTS = 5
MAX_MASTER_KEY_ATTEMPTS = 3
LOCKOUT_DURATION = 900
MASTER_KEY_LOCKOUT_DURATION = 900

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

def get_password_hash() -> str:
    if not DATABASE_URL:
        return PASSWORD_HASH
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT setting_value FROM t_p75610138_lawyer_portfolio_sit.admin_settings WHERE setting_key = 'password_hash'")
        result = cur.fetchone()
        cur.close()
        conn.close()
        
        if result:
            return result[0]
        return PASSWORD_HASH
    except Exception:
        return PASSWORD_HASH

def set_password_hash(new_hash: str) -> bool:
    if not DATABASE_URL:
        return False
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO t_p75610138_lawyer_portfolio_sit.admin_settings (setting_key, setting_value, updated_at) "
            "VALUES ('password_hash', %s, CURRENT_TIMESTAMP) "
            "ON CONFLICT (setting_key) DO UPDATE SET setting_value = %s, updated_at = CURRENT_TIMESTAMP",
            (new_hash, new_hash)
        )
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception:
        return False

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Secure admin authentication with rate limiting, JWT, and password reset
    Args: event with httpMethod, body, headers
    Returns: JWT token or error with 401/429 status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        body_data = json.loads(body_str)
        password = body_data.get('password', '')
        client_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
        
        current_time = datetime.now().timestamp()
        
        if client_ip in login_attempts:
            attempt_data = login_attempts[client_ip]
            if attempt_data['count'] >= MAX_ATTEMPTS:
                time_since_lockout = current_time - attempt_data['locked_at']
                if time_since_lockout < LOCKOUT_DURATION:
                    remaining = int(LOCKOUT_DURATION - time_since_lockout)
                    return {
                        'statusCode': 429,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'error': 'Слишком много попыток входа',
                            'retry_after': remaining
                        })
                    }
                else:
                    login_attempts[client_ip] = {'count': 0, 'locked_at': 0}
        
        active_hash = get_password_hash()
        
        if not password or not active_hash or not JWT_SECRET:
            if client_ip not in login_attempts:
                login_attempts[client_ip] = {'count': 0, 'locked_at': 0}
            login_attempts[client_ip]['count'] += 1
            if login_attempts[client_ip]['count'] >= MAX_ATTEMPTS:
                login_attempts[client_ip]['locked_at'] = current_time
            
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный пароль'})
            }
        
        password_bytes = password.encode('utf-8')
        hash_bytes = active_hash.encode('utf-8')
        
        if bcrypt.checkpw(password_bytes, hash_bytes):
            login_attempts.pop(client_ip, None)
            
            token = jwt.encode(
                {
                    'role': 'admin',
                    'exp': datetime.utcnow() + timedelta(hours=TOKEN_EXPIRY_HOURS),
                    'iat': datetime.utcnow()
                },
                JWT_SECRET,
                algorithm='HS256'
            )
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'token': token,
                    'expires_in': TOKEN_EXPIRY_HOURS * 3600
                })
            }
        else:
            if client_ip not in login_attempts:
                login_attempts[client_ip] = {'count': 0, 'locked_at': 0}
            login_attempts[client_ip]['count'] += 1
            if login_attempts[client_ip]['count'] >= MAX_ATTEMPTS:
                login_attempts[client_ip]['locked_at'] = current_time
            
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный пароль'})
            }
    
    if method == 'GET':
        auth_token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token')
        
        if not auth_token or not JWT_SECRET:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Токен отсутствует'})
            }
        
        try:
            payload = jwt.decode(auth_token, JWT_SECRET, algorithms=['HS256'])
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'valid': True, 'role': payload.get('role')})
            }
        except jwt.ExpiredSignatureError:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Токен истёк'})
            }
        except jwt.InvalidTokenError:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный токен'})
            }
    
    if method == 'PUT':
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        body_data = json.loads(body_str)
        
        master_key = body_data.get('master_key', '')
        new_password = body_data.get('new_password', '')
        client_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
        current_time = datetime.now().timestamp()
        
        if client_ip in master_key_attempts:
            attempt_data = master_key_attempts[client_ip]
            if attempt_data['count'] >= MAX_MASTER_KEY_ATTEMPTS:
                time_since_lockout = current_time - attempt_data['locked_at']
                if time_since_lockout < MASTER_KEY_LOCKOUT_DURATION:
                    remaining = int(MASTER_KEY_LOCKOUT_DURATION - time_since_lockout)
                    return {
                        'statusCode': 429,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'error': 'Слишком много попыток ввода мастер-ключа',
                            'retry_after': remaining
                        })
                    }
                else:
                    master_key_attempts[client_ip] = {'count': 0, 'locked_at': 0}
        
        if master_key != MASTER_KEY:
            if client_ip not in master_key_attempts:
                master_key_attempts[client_ip] = {'count': 0, 'locked_at': 0}
            master_key_attempts[client_ip]['count'] += 1
            if master_key_attempts[client_ip]['count'] >= MAX_MASTER_KEY_ATTEMPTS:
                master_key_attempts[client_ip]['locked_at'] = current_time
            
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный мастер-ключ'})
            }
        
        if not new_password or len(new_password) < 6:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Пароль должен быть не менее 6 символов'})
            }
        
        master_key_attempts.pop(client_ip, None)
        
        new_password_bytes = new_password.encode('utf-8')
        new_hash = bcrypt.hashpw(new_password_bytes, bcrypt.gensalt())
        new_hash_str = new_hash.decode('utf-8')
        
        if not set_password_hash(new_hash_str):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Ошибка сохранения нового пароля'})
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Пароль успешно изменен'
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }