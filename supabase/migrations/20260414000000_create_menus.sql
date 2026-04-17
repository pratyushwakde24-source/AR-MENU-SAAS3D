-- Create menus table
CREATE TABLE IF NOT EXISTS menus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url TEXT,
  model_url TEXT,
  status TEXT DEFAULT 'Published',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public menus are viewable by everyone." 
ON menus FOR SELECT 
USING (true);
