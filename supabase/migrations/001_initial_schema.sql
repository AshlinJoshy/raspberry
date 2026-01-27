-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'screen_owner', 'advertiser')),
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Screens table
CREATE TABLE screens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  screen_type TEXT NOT NULL CHECK (screen_type IN ('mall', 'gym', 'taxi', 'highway', 'other')),
  resolution_width INTEGER NOT NULL,
  resolution_height INTEGER NOT NULL,
  operating_hours_start TIME,
  operating_hours_end TIME,
  status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'inactive', 'maintenance')),
  photo_url TEXT,
  last_heartbeat TIMESTAMPTZ,
  is_online BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Creatives (ad content)
CREATE TABLE creatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('video', 'image')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER, -- For videos
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  advertiser_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  creative_id UUID NOT NULL REFERENCES creatives(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(10, 2),
  target_screen_types TEXT[], -- Array of screen types
  target_cities TEXT[], -- Array of cities
  time_preferences TEXT[] CHECK (time_preferences <@ ARRAY['morning', 'afternoon', 'evening', 'all_day']::TEXT[]),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Screen-Creative approvals (many-to-many)
CREATE TABLE screen_creative_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  screen_id UUID NOT NULL REFERENCES screens(id) ON DELETE CASCADE,
  creative_id UUID NOT NULL REFERENCES creatives(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejected_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(screen_id, creative_id)
);

-- Indexes
CREATE INDEX idx_screens_owner ON screens(owner_id);
CREATE INDEX idx_screens_location ON screens(city, country);
CREATE INDEX idx_creatives_advertiser ON creatives(advertiser_id);
CREATE INDEX idx_creatives_status ON creatives(status);
CREATE INDEX idx_campaigns_advertiser ON campaigns(advertiser_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_screen_creative_screen ON screen_creative_approvals(screen_id);
CREATE INDEX idx_screen_creative_creative ON screen_creative_approvals(creative_id);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE screen_creative_approvals ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile, update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Screens: Owners can manage their screens, advertisers can view active screens
CREATE POLICY "Screen owners manage own screens" ON screens FOR ALL USING (auth.uid() = owner_id);
CREATE POLICY "Advertisers view active screens" ON screens FOR SELECT USING (
  status = 'active' AND EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'advertiser'
  )
);

-- Creatives: Advertisers manage their own, screen owners can view for approval
CREATE POLICY "Advertisers manage own creatives" ON creatives FOR ALL USING (
  auth.uid() = advertiser_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'screen_owner')
  )
);

-- Additional policies (implied)
CREATE POLICY "Advertisers manage own campaigns" ON campaigns FOR ALL USING (auth.uid() = advertiser_id);
CREATE POLICY "Screen owners view relevant campaigns" ON campaigns FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'screen_owner'
  )
);
