-- Supabase Database Schema for CMS
-- Run this SQL in your Supabase SQL Editor

-- Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tagline TEXT,
  title TEXT,
  subtitle TEXT,
  button_text TEXT,
  background_image TEXT,
  stats JSONB DEFAULT '{"clients": "50+", "years": "5+", "committed": "100%"}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About Content Table
CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge TEXT,
  title TEXT,
  description TEXT,
  paragraph1 TEXT,
  paragraph2 TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  stats JSONB DEFAULT '{"years": "5+", "clients": "200+", "results": "100%"}'::jsonb,
  certifications JSONB DEFAULT '{"certification": "Level 3 PT Diploma", "specialization": "Strength & Hypertrophy"}'::jsonb,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Content Table
CREATE TABLE IF NOT EXISTS services_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge TEXT,
  title TEXT,
  subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Content Table
CREATE TABLE IF NOT EXISTS testimonials_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge TEXT,
  title TEXT,
  subtitle TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  result TEXT,
  quote TEXT,
  rating INTEGER DEFAULT 5,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Theme Settings Table
CREATE TABLE IF NOT EXISTS theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT DEFAULT '#3b82f6',
  secondary_color TEXT DEFAULT '#8b5cf6',
  font_family TEXT DEFAULT 'Inter',
  heading_font TEXT DEFAULT 'Inter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  goal TEXT,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add secondary_color column if it doesn't exist (for existing databases)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'theme_settings' AND column_name = 'secondary_color'
  ) THEN
    ALTER TABLE theme_settings ADD COLUMN secondary_color TEXT DEFAULT '#8b5cf6';
  END IF;
END $$;

-- Insert default data
INSERT INTO hero_content (id, tagline, title, subtitle, button_text, background_image, stats)
VALUES (
  gen_random_uuid(),
  'Certified Personal Trainer',
  'Transform Your Body.\nElevate Your\nMind.',
  'Build strength, confidence, and discipline with personalized training designed for men who are ready to level up.',
  'Book Your Free Consultation',
  '/athletic-male-personal-trainer-working-out-in-mode.jpg',
  '{"clients": "50+", "years": "5+", "committed": "100%"}'::jsonb
)
ON CONFLICT DO NOTHING;

INSERT INTO about_content (id, badge, title, description, paragraph1, paragraph2, features, stats, certifications, image)
VALUES (
  gen_random_uuid(),
  'Your Transformation Partner',
  'Welcome to 1% Fitness',
  'Certified Personal Trainer specializing in helping men build muscle, strength, and unshakeable discipline.',
  'We''ve dedicated our mission to transforming lives through evidence-based training and personalized coaching. We don''t just help you build muscle—we help you build the mindset and habits that create lasting change.',
  'Whether you''re starting your fitness journey or pushing past a plateau, we''ll be with you every step of the way, providing the accountability, expertise, and support you need to succeed.',
  '[{"title": "Personalized Programming", "description": "Custom plans designed for your goals and lifestyle"}, {"title": "Proven Track Record", "description": "200+ successful transformations and counting"}, {"title": "Continuous Support", "description": "24/7 access and accountability when you need it most"}]'::jsonb,
  '{"years": "5+", "clients": "200+", "results": "100%"}'::jsonb,
  '{"certification": "Level 3 PT Diploma", "specialization": "Strength & Hypertrophy"}'::jsonb,
  '/professional-male-personal-trainer-portrait-athlet.jpg'
)
ON CONFLICT DO NOTHING;

INSERT INTO services_content (id, badge, title, subtitle)
VALUES (
  gen_random_uuid(),
  'Services',
  'Training Programs',
  'Choose the program that fits your lifestyle and goals'
)
ON CONFLICT DO NOTHING;

INSERT INTO services (id, title, description, icon, "order")
VALUES
  (gen_random_uuid(), '1-on-1 Coaching', 'Personalized in-person training sessions tailored to your goals, fitness level, and schedule. Get hands-on guidance and real-time feedback.', 'Dumbbell', 0),
  (gen_random_uuid(), 'Online Training', 'Custom workout programs delivered digitally with video demonstrations, progress tracking, and weekly check-ins to keep you accountable.', 'Laptop', 1),
  (gen_random_uuid(), 'Custom Meal Plans', 'Nutrition strategies designed for your lifestyle and goals. Learn how to fuel your body properly for maximum results and sustained energy.', 'UtensilsCrossed', 2)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials_content (id, badge, title, subtitle)
VALUES (
  gen_random_uuid(),
  'Testimonials',
  'Client Results',
  'Real transformations from real people'
)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (id, name, result, quote, rating, "order")
VALUES
  (gen_random_uuid(), 'Marcus R.', 'Lost 15kg in 4 months', '1% Fitness coaching completely changed my approach to fitness. The accountability and personalized programs made all the difference. I''m stronger and more confident than ever.', 5, 0),
  (gen_random_uuid(), 'David L.', 'Gained 8kg of muscle', 'I''ve tried other trainers before, but 1% Fitness''s method actually works. The combination of training and nutrition guidance helped me finally break through my plateau and build real muscle.', 5, 1),
  (gen_random_uuid(), 'Tom S.', 'Transformed in 6 months', 'Working with 1% Fitness has been life-changing. Not only did I transform my body, but I developed discipline and habits that carry over into every area of my life.', 5, 2)
ON CONFLICT DO NOTHING;

INSERT INTO theme_settings (id, primary_color, secondary_color, font_family, heading_font)
VALUES (
  gen_random_uuid(),
  '#3b82f6',
  '#8b5cf6',
  'Inter',
  'Inter'
)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON about_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON theme_settings FOR SELECT USING (true);

-- Create policies for inquiries
-- Public can insert (submit inquiries)
CREATE POLICY "Public insert access" ON inquiries FOR INSERT WITH CHECK (true);
-- Only authenticated users can read inquiries
CREATE POLICY "Authenticated read access" ON inquiries FOR SELECT USING (auth.role() = 'authenticated');
-- Only authenticated users can update inquiries (mark as read)
CREATE POLICY "Authenticated update access" ON inquiries FOR UPDATE USING (auth.role() = 'authenticated');
-- Only authenticated users can delete inquiries
CREATE POLICY "Authenticated delete access" ON inquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for authenticated write access (admin only)
CREATE POLICY "Authenticated write access" ON hero_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON services_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON testimonials_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON theme_settings FOR ALL USING (auth.role() = 'authenticated');

