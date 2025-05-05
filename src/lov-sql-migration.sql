
-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  jobs_completed INTEGER DEFAULT 0,
  orders_fulfilled INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read all records
CREATE POLICY IF NOT EXISTS "Allow users to read all records"
  ON public.users
  FOR SELECT
  USING (true);
  
-- Create policy to allow users to update only their own records
CREATE POLICY IF NOT EXISTS "Allow users to update their own records"
  ON public.users
  FOR UPDATE
  USING (auth.uid()::text = wallet);

-- Create policy to allow users to insert their own records
CREATE POLICY IF NOT EXISTS "Allow users to insert their own records"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid()::text = wallet);
