-- SUPABASE SCHEMA FOR NAHUEL COACH
-- Run this in the Supabase SQL Editor

-- 1. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  image_url_2 TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  type TEXT DEFAULT 'text', -- 'text' or 'video'
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  button_text TEXT DEFAULT 'Consultar',
  button_url TEXT,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow public read, authenticated write)
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin Write Settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Admin Write Sections" ON sections FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admin Write Testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public Read Programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Admin Write Programs" ON programs FOR ALL USING (auth.role() = 'authenticated');

-- INITIAL DATA
-- Hero Settings
INSERT INTO site_settings (key, value) VALUES (
  'hero',
  '{
    "bsl": "UN PROCESO DE TRANSFORMACIÓN GUIADO",
    "bsl_detail": "ORDEN INTERNO • ESTRUCTURA • ACCIÓN SOSTENIDA",
    "title": "SABÉS QUÉ HACER…",
    "title_accent": "PERO NO LO SOSTENÉS.",
    "subtitle": "Empezás con fuerza. Pero la constancia se diluye. No es falta de motivación… es falta de estructura.",
    "primary_btn": "Agendar llamada",
    "primary_url": "#",
    "secondary_btn": "Ver cómo funciona",
    "secondary_url": "#",
    "bg_desktop": "/images/hero-training.jpg"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Links Settings
INSERT INTO site_settings (key, value) VALUES (
  'links',
  '{
    "whatsapp": "5491112345678",
    "whatsapp_message": "Hola Nahuel! Quiero empezar mi transformación...",
    "google_meet": "https://meet.google.com/abc-defg-hij",
    "instagram": "https://instagram.com/nahuelcoach",
    "contact_email": "hola@nahuelcoach.com"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- Sections
INSERT INTO sections (section_key, title, subtitle, description, sort_order) VALUES
('problema', '¿Te sentís identificado?', 'El diagnóstico', 'El verdadero problema no es fallar… es acostumbrarte a no confiar en vos.', 1),
('impacto', 'El poder no está en empezar.', 'Está en sostener.', '', 2),
('transformacion', 'Lo que vas a experimentar', 'Resultados', 'Se trata de convertirte en alguien que sostiene.', 3),
('proceso', 'Cómo funciona', 'El proceso', '', 4),
('autoridad', 'No es solo físico.', 'Es cuerpo, energía y poder personal.', 'Un sistema integral que trabaja en todas las dimensiones de tu vida para crear una transformación real y duradera.', 5),
('decision', 'Seguir igual también es una decisión.', 'Consecuencias', 'Postergar lo que querés… tiene un precio.', 6),
('cierre', '¿Estás listo para sostener', 'más allá de la motivación?', 'El momento de empezar es ahora. La diferencia está en quienes dar el paso.', 7)
ON CONFLICT (section_key) DO NOTHING;

-- Programs
INSERT INTO programs (name, description, price, features, is_featured, button_text, sort_order) VALUES
('Impacto Base', 'Plan inicial', '$100', '["Rutina personalizada", "Plan de alimentación", "1 sesión inicial"]', false, 'Consultar', 1),
('Proceso Completo', 'Transformación total', '$900', '["12 sesiones 1:1", "Seguimiento personalizado", "Entrenamiento + nutrición + mentalidad", "Soporte diario"]', true, 'Agendar llamada', 2),
('Impacto Vital', 'Avanzado', '$450', '["8 semanas de programa", "Sistema paso a paso", "Seguimiento semanal"]', false, 'Consultar', 3)
ON CONFLICT DO NOTHING;
