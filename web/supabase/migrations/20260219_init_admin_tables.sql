-- Fix Admin Tables
-- This script safely creates the transformations and pricing_plans tables if they don't exist
-- and ensures the correct RLS policies are in place.

-- 1. Create 'transformations' table
create table if not exists public.transformations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  achievement text,
  quote text,
  program text,
  image_before_url text,
  image_after_url text,
  created_at timestamptz default now()
);

-- 2. Create 'pricing_plans' table
create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price text not null,
  period text not null,
  description text,
  features text[],
  price_id text,
  popular boolean default false,
  order_index integer default 0,
  created_at timestamptz default now()
);

-- 3. Enable RLS
alter table public.transformations enable row level security;
alter table public.pricing_plans enable row level security;

-- 4. Drop existing policies to avoid conflicts or staleness
drop policy if exists "Enable read access for all users" on public.transformations;
drop policy if exists "Enable all access for admins" on public.transformations;
drop policy if exists "Enable read access for all users" on public.pricing_plans;
drop policy if exists "Enable all access for admins" on public.pricing_plans;

-- 5. Re-create Policies

-- Transformations Policies
create policy "Enable read access for all users" on public.transformations 
  for select using (true);

create policy "Enable all access for admins" on public.transformations 
  for all using (
    exists (
      select 1 from public.users where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- Pricing Plans Policies
create policy "Enable read access for all users" on public.pricing_plans 
  for select using (true);

create policy "Enable all access for admins" on public.pricing_plans 
  for all using (
    exists (
      select 1 from public.users where users.id = auth.uid() and users.role = 'admin'
    )
  );

-- 6. Refresh Schema Cache (Force Supabase to recognize new tables)
notify pgrst, 'reload schema';
