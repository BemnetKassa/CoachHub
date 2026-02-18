-- Fix missing user profiles

-- 1. Ensure the 'name' column exists in the users table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='name') THEN
        ALTER TABLE public.users ADD COLUMN name text;
    END IF;
END $$;

-- 2. Create profiles for any users missing them
-- We use 'User' or the email prefix as a fallback for the name
insert into public.users (id, email, name, role)
select 
  id, 
  email, 
  coalesce(raw_user_meta_data->>'name', split_part(email, '@', 1)), 
  'student'
from auth.users
where not exists (
  select 1 from public.users where public.users.id = auth.users.id
);

-- 3. Ensure the specific user is an admin (replace email if needed)
update public.users
set role = 'admin'
where email = 'admin@coachhub.com'; -- Replace with your actual email if different

