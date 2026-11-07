create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, phone text, country text, language text default 'English',
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "own profile read" on public.profiles for select using ((select auth.uid()) = id);
create policy "own profile update" on public.profiles for update using ((select auth.uid()) = id);

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, phone, country, language)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'country', coalesce(new.raw_user_meta_data->>'language','English'));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_at timestamptz not null default now(),
  status text not null default 'pending'
);
alter table public.deletion_requests enable row level security;
create policy "insert own request" on public.deletion_requests for insert with check ((select auth.uid()) = user_id);
create policy "read own request" on public.deletion_requests for select using ((select auth.uid()) = user_id);
