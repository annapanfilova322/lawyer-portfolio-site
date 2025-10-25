CREATE TABLE IF NOT EXISTS t_p75610138_lawyer_portfolio_sit.admin_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO t_p75610138_lawyer_portfolio_sit.admin_settings (setting_key, setting_value)
VALUES ('password_hash', '$2b$12$LvVPh0zK3qGxqJ8JYKmZZeF6QXHZBHtC7xO0XQkKZqJ0JYKmZZeF6')
ON CONFLICT (setting_key) DO NOTHING;