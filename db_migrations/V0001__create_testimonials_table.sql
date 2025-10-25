CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  letter_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO testimonials (company, letter_url) VALUES
('ООО "Северная Корона"', ''),
('АО "Балтийские Инвестиции"', ''),
('ПАО "Невский Альянс"', ''),
('ЗАО "Петровский Капитал"', ''),
('ООО "Финансовая Группа Рубикон"', ''),
('АО "Торговый Дом Эверест"', ''),
('ООО "Стройинвест Холдинг"', ''),
('ПАО "Промышленная Корпорация"', ''),
('ООО "Юридическая Компания Правовед"', '');