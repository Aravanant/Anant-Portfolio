-- =========================================================================
-- Anant Singh Portfolio - Supabase Database Setup & Schema
-- Run this script in the Supabase SQL Editor (SQL Editor -> New query -> Run)
-- =========================================================================

-- 1. Create Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT DEFAULT 'Internship',
  duration TEXT,
  location TEXT,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  skills_used JSONB DEFAULT '[]'::jsonb,
  document TEXT DEFAULT '',
  reference_id TEXT DEFAULT '',
  verification_url TEXT DEFAULT '',
  status TEXT DEFAULT 'Verified',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Python & SQL',
  domain TEXT DEFAULT 'Data Analytics & Business Intelligence',
  summary TEXT DEFAULT '',
  stack JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  thumbnail TEXT DEFAULT '',
  github_link TEXT DEFAULT '',
  demo_link TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT DEFAULT 'Verified Issuer',
  credential_id TEXT DEFAULT '',
  issue_date TEXT DEFAULT '',
  verification_url TEXT DEFAULT '',
  skills_covered JSONB DEFAULT '[]'::jsonb,
  image TEXT DEFAULT '',
  status TEXT DEFAULT 'Verified',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies allowing Public Select and Anon Insert/Update/Delete
-- Experiences Policies
DROP POLICY IF EXISTS "Public Read Experiences" ON experiences;
CREATE POLICY "Public Read Experiences" ON experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Experiences" ON experiences;
CREATE POLICY "Public Insert Experiences" ON experiences FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Experiences" ON experiences;
CREATE POLICY "Public Update Experiences" ON experiences FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Experiences" ON experiences;
CREATE POLICY "Public Delete Experiences" ON experiences FOR DELETE USING (true);

-- Projects Policies
DROP POLICY IF EXISTS "Public Read Projects" ON projects;
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Projects" ON projects;
CREATE POLICY "Public Insert Projects" ON projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Projects" ON projects;
CREATE POLICY "Public Update Projects" ON projects FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Projects" ON projects;
CREATE POLICY "Public Delete Projects" ON projects FOR DELETE USING (true);

-- Certificates Policies
DROP POLICY IF EXISTS "Public Read Certificates" ON certificates;
CREATE POLICY "Public Read Certificates" ON certificates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Certificates" ON certificates;
CREATE POLICY "Public Insert Certificates" ON certificates FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Update Certificates" ON certificates;
CREATE POLICY "Public Update Certificates" ON certificates FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public Delete Certificates" ON certificates;
CREATE POLICY "Public Delete Certificates" ON certificates FOR DELETE USING (true);
