ALTER TABLE certificates 
ADD COLUMN IF NOT EXISTS cert1_name TEXT DEFAULT 'Сертификат Сколково',
ADD COLUMN IF NOT EXISTS cert1_url TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS cert2_name TEXT DEFAULT 'Сертификат Комплаенс',
ADD COLUMN IF NOT EXISTS cert2_url TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS cert3_name TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS cert3_url TEXT DEFAULT '';

UPDATE certificates SET 
  cert1_url = skolkovo_url,
  cert2_url = compliance_url
WHERE id = 1;