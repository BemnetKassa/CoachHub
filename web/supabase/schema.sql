-- Create a table for public profiles (if not already existing, modifying for stripe customer id)
create table if not exists public.customers (
  id uuid references auth.users not null primary key,
  stripe_customer_id text
);

-- Create a table for products
create table if not exists public.products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);

-- Create a table for prices
create table if not exists public.prices (
  id text primary key,
  product_id text references public.products,
  active boolean,
  description text,
  unit_amount bigint,
  currency text,
  type text,
  interval text,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);

-- Create a table for subscriptions
create table if not exists public.subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status text,
  metadata jsonb,
  price_id text references public.prices,
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  trial_end timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.prices enable row level security;
alter table public.subscriptions enable row level security;

-- Policies for customers
create policy "Users can read their own customer data." on public.customers for select using (auth.uid() = id);

-- Policies for products (Active products are public)
create policy "Anyone can read active products" on public.products for select using (active = true);

-- Policies for prices (Active prices are public)
create policy "Anyone can read active prices" on public.prices for select using (active = true);

-- Policies for subscriptions
create policy "Users can read own subscription." on public.subscriptions for select using (auth.uid() = user_id);

-- Logs for debugging webhooks (optional, good for dev)
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  event text,
  payload jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
