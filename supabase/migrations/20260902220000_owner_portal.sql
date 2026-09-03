-- Owner portal.
--
-- The site promises owners "monthly owner statements, year-end tax documents,
-- and a real-time owner portal" in four places, and /portal has been a 404.
-- This is the data behind it.
--
-- The security model is the whole point of this file: an owner must be able to
-- see their own numbers and must never be able to see another owner's. That is
-- enforced in the database with row level security rather than in the
-- application, so a mistake in a route handler cannot leak one owner's revenue
-- to another. Every policy below is SELECT-only. Owners read; Frontier writes
-- through the service role.

/* ---------------------------------------------------------------- */
/*  Owners                                                          */
/* ---------------------------------------------------------------- */

-- One row per signed-in owner, keyed to their Supabase auth user.
create table if not exists public.owner_profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  full_name    text,
  email        text not null,
  phone        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.owner_profiles is
  'Portal accounts. One row per owner, keyed to auth.users.';

/* ---------------------------------------------------------------- */
/*  Properties                                                      */
/* ---------------------------------------------------------------- */

create table if not exists public.owner_properties (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid not null references public.owner_profiles (id) on delete cascade,
  name           text not null,
  address        text,
  city           text,
  bedrooms       integer,
  bathrooms      numeric(4, 1),
  sleeps         integer,
  -- Hospitable's property id, so live data can be joined on later without a
  -- migration when an API token exists.
  hospitable_id  text,
  onboarded_on   date,
  status         text not null default 'active',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  constraint owner_properties_status_check check (
    status in ('onboarding', 'active', 'paused', 'offboarded')
  )
);

create index if not exists owner_properties_owner_idx
  on public.owner_properties (owner_id);

/* ---------------------------------------------------------------- */
/*  Monthly statements                                              */
/* ---------------------------------------------------------------- */

-- The fee is 20% of net rental income, and net rental income is defined as what
-- remains after platform host fees and occupancy taxes. The columns follow that
-- definition exactly, in the order the arithmetic runs, so a statement can be
-- read top to bottom and checked. Cleaning and pet fees never enter the base.
create table if not exists public.owner_statements (
  id                  uuid primary key default gen_random_uuid(),
  property_id         uuid not null references public.owner_properties (id) on delete cascade,
  owner_id            uuid not null references public.owner_profiles (id) on delete cascade,

  -- The month being reported, stored as its first day.
  period_start        date not null,

  gross_revenue       numeric(12, 2) not null default 0,
  platform_fees       numeric(12, 2) not null default 0,
  occupancy_taxes     numeric(12, 2) not null default 0,
  net_rental_income   numeric(12, 2) not null default 0,
  management_fee      numeric(12, 2) not null default 0,
  pass_through_costs  numeric(12, 2) not null default 0,
  owner_payout        numeric(12, 2) not null default 0,

  nights_booked       integer,
  nights_available    integer,
  average_daily_rate  numeric(10, 2),

  notes               text,
  -- Null until Frontier publishes it. Unpublished drafts are invisible to the
  -- owner, enforced in the RLS policy rather than in a query filter.
  published_at        timestamptz,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint owner_statements_period_unique unique (property_id, period_start)
);

create index if not exists owner_statements_owner_period_idx
  on public.owner_statements (owner_id, period_start desc);

comment on column public.owner_statements.published_at is
  'Null means draft. Drafts are hidden from the owner by row level security, not by a WHERE clause.';

/* ---------------------------------------------------------------- */
/*  updated_at                                                      */
/* ---------------------------------------------------------------- */

drop trigger if exists owner_profiles_set_updated_at on public.owner_profiles;
create trigger owner_profiles_set_updated_at
  before update on public.owner_profiles
  for each row execute function public.set_updated_at();

drop trigger if exists owner_properties_set_updated_at on public.owner_properties;
create trigger owner_properties_set_updated_at
  before update on public.owner_properties
  for each row execute function public.set_updated_at();

drop trigger if exists owner_statements_set_updated_at on public.owner_statements;
create trigger owner_statements_set_updated_at
  before update on public.owner_statements
  for each row execute function public.set_updated_at();

/* ---------------------------------------------------------------- */
/*  Row level security                                              */
/* ---------------------------------------------------------------- */

alter table public.owner_profiles   enable row level security;
alter table public.owner_properties enable row level security;
alter table public.owner_statements enable row level security;

-- Anonymous visitors get nothing anywhere. Signed-in owners get SELECT on their
-- own rows only. Nobody gets INSERT, UPDATE or DELETE through the API: Frontier
-- writes statements with the service role, so an owner cannot edit their own
-- payout figures.
revoke all on public.owner_profiles   from anon, authenticated;
revoke all on public.owner_properties from anon, authenticated;
revoke all on public.owner_statements from anon, authenticated;

grant select on public.owner_profiles   to authenticated;
grant select on public.owner_properties to authenticated;
grant select on public.owner_statements to authenticated;

grant select, insert, update, delete on public.owner_profiles   to service_role;
grant select, insert, update, delete on public.owner_properties to service_role;
grant select, insert, update, delete on public.owner_statements to service_role;

drop policy if exists owner_profiles_select_own on public.owner_profiles;
create policy owner_profiles_select_own
  on public.owner_profiles for select
  to authenticated
  using (id = (select auth.uid()));

drop policy if exists owner_properties_select_own on public.owner_properties;
create policy owner_properties_select_own
  on public.owner_properties for select
  to authenticated
  using (owner_id = (select auth.uid()));

-- Two conditions, both required: it is your statement, and it has been
-- published. A draft is invisible even to the owner it belongs to.
drop policy if exists owner_statements_select_own_published on public.owner_statements;
create policy owner_statements_select_own_published
  on public.owner_statements for select
  to authenticated
  using (owner_id = (select auth.uid()) and published_at is not null);
