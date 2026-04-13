-- Lithuanian Club Database Schema
-- Run this in the Supabase SQL editor

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('appetizers','soups','mains','sides','desserts','drinks')),
  is_available BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  location TEXT DEFAULT 'Lithuanian Club',
  price DECIMAL(10,2),
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Booking Submissions
CREATE TABLE IF NOT EXISTS booking_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  space TEXT NOT NULL CHECK (space IN ('great_hall','oak_room','bar_lounge','full_venue')),
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread','read','replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Members
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  membership_type TEXT NOT NULL CHECK (membership_type IN ('individual','family','senior','student')),
  joined_date DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('events','dining','spaces','archive','general')),
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Archive Items
CREATE TABLE IF NOT EXISTS archive_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  year INTEGER,
  decade TEXT,
  image_url TEXT,
  document_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('history','documents','photos','artifacts')),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (public read on appropriate tables, restricted writes)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE archive_items ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read available menu items" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Public can read published events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published gallery" ON gallery_images FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published archive" ON archive_items FOR SELECT USING (is_published = true);

-- Public insert (forms)
CREATE POLICY "Public can submit bookings" ON booking_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contacts" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit membership" ON members FOR INSERT WITH CHECK (true);

-- Service role has full access (admin uses service role key)
CREATE POLICY "Service role full access menu" ON menu_items FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access events" ON events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access bookings" ON booking_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access contacts" ON contact_messages FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access members" ON members FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access gallery" ON gallery_images FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access archive" ON archive_items FOR ALL USING (auth.role() = 'service_role');

-- Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('club-images', 'club-images', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public read club images" ON storage.objects FOR SELECT USING (bucket_id = 'club-images');
CREATE POLICY "Service role upload club images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'club-images');
CREATE POLICY "Service role delete club images" ON storage.objects FOR DELETE USING (bucket_id = 'club-images');

-- Seed some initial menu data
INSERT INTO menu_items (name, description, price, category) VALUES
  ('Cepelinai', 'Potato dumplings stuffed with seasoned pork, served with sour cream and bacon bits', 14.00, 'mains'),
  ('Šaltibarščiai', 'Chilled beet soup with cucumber, egg, and dill — a Lithuanian summer classic', 8.00, 'soups'),
  ('Kibinai', 'Traditional Karaite hand pies filled with lamb and onion', 10.00, 'appetizers'),
  ('Kugelis', 'Potato pudding baked with bacon, served warm with sour cream', 12.00, 'mains'),
  ('Šakotis', 'Spit cake, Lithuania''s crown jewel — layered and golden', 7.00, 'desserts'),
  ('Alus Daryklos', 'House-brewed Lithuanian amber ale', 7.00, 'drinks'),
  ('Midus', 'Traditional Lithuanian mead — honey wine served warm', 9.00, 'drinks'),
  ('Balandėliai', 'Stuffed cabbage rolls with rice and ground beef in tomato sauce', 13.00, 'mains'),
  ('Juodas Duonos Sriuba', 'Dark bread soup with dried fruits and cream', 7.00, 'soups'),
  ('Bulviniai Blynai', 'Potato pancakes with sour cream and smoked salmon', 11.00, 'appetizers');
