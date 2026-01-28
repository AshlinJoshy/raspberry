
-- HOW TO CREATE AN ADMIN USER
-- 1. Sign up a new user via the app (e.g. admin@adscreen.com)
-- 2. Go to Supabase Dashboard -> SQL Editor
-- 3. Run this query (replace with your email):

UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@adscreen.com'
);
