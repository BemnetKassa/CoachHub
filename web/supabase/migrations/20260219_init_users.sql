-- Create users table if it doesn't exist (it manages user roles)
create table if not exists public.users (
  id uuid references auth.users not null primary key,
  name text,
  email text,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.users enable row level security;

-- Policies for users table
create policy "Users can read their own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- Create a trigger to automatically create a user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, role)
  values (new.id, new.raw_user_meta_data->>'name', new.email, 'student');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
