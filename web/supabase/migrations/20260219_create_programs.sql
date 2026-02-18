-- Create programs table
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  price_monthly numeric, -- or text if you prefer string prices
  level text check (level in ('beginner', 'intermediate', 'advanced')),
  duration_weeks integer,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.programs enable row level security;

-- Policies
create policy "Enable read access for all users" on public.programs for select using (true);

create policy "Enable all access for admins" on public.programs for all using (
  exists (select 1 from public.users where users.id = auth.uid() and users.role = 'admin')
);

-- Refresh Schema
notify pgrst, 'reload schema';
