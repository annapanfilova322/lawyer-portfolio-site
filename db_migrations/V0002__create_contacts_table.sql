CREATE TABLE IF NOT EXISTS t_p75610138_lawyer_portfolio_sit.contacts (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) NOT NULL DEFAULT '+7 (999) 123-45-67',
    email VARCHAR(100) NOT NULL DEFAULT 'lawyer@example.ru',
    address VARCHAR(200) NOT NULL DEFAULT 'г. Санкт-Петербург',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO t_p75610138_lawyer_portfolio_sit.contacts (phone, email, address)
VALUES ('+7 (999) 123-45-67', 'lawyer@example.ru', 'г. Санкт-Петербург')
ON CONFLICT DO NOTHING;
