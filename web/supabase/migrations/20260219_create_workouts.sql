-- Create workouts table
create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text,
  duration_minutes integer,
  difficulty text default 'intermediate',
  image_url text,
  category text, -- e.g. 'Strenght', 'Cardio', 'Mobility'
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.workouts enable row level security;

-- Policies
create policy "Enable read access for all users" on public.workouts for select using (true);

create policy "Enable all access for admins" on public.workouts for all using (
  exists (select 1 from public.users where users.id = auth.uid() and users.role = 'admin')
);

-- Refresh Schema
notify pgrst, 'reload schema';
