-- 1. Add current_program_id to users table
alter table public.users 
add column if not exists current_program_id uuid references public.programs(id);

-- 2. Create program_workouts table (Junction table)
create table if not exists public.program_workouts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references public.programs(id) on delete cascade not null,
  workout_id uuid references public.workouts(id) on delete cascade not null,
  week_number integer not null default 1,
  day_number integer not null default 1, -- e.g. 1=Monday, 2=Tuesday... or just Day 1, Day 2
  created_at timestamptz default now(),
  unique(program_id, workout_id, week_number, day_number)
);

-- Enable RLS for program_workouts
alter table public.program_workouts enable row level security;
create policy "Public read access" on public.program_workouts for select using (true);
create policy "Admin all access" on public.program_workouts for all using (
  exists (select 1 from public.users where users.id = auth.uid() and users.role = 'admin')
);

-- 3. Create user_progress table
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  date date not null default current_date,
  weight numeric,
  body_fat_percentage numeric,
  notes text,
  photos text[], -- Array of URLs
  created_at timestamptz default now()
);

-- Enable RLS for user_progress
alter table public.user_progress enable row level security;

-- Policies for user_progress
create policy "Users can view own progress" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress" on public.user_progress
  for update using (auth.uid() = user_id);

-- 4. Create user_workout_logs (Optional, for tracking completed workouts)
create table if not exists public.user_workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  workout_id uuid references public.workouts(id) not null,
  completed_at timestamptz default now(),
  duration_seconds integer,
  notes text
);

alter table public.user_workout_logs enable row level security;
create policy "Users can view own logs" on public.user_workout_logs for select using (auth.uid() = user_id);
create policy "Users can insert own logs" on public.user_workout_logs for insert with check (auth.uid() = user_id);

