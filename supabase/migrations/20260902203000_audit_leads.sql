-- Durable storage for listing-audit leads.
--
-- Audit reports live in Redis under a 90-day TTL (src/lib/audit/report-store.ts),
-- which is right for serving /audit/result/[id] quickly and wrong for keeping the
-- lead. An owner hands over their email and their listing, we compute their
-- revenue gap, and three months later the record is gone. This table is the
-- durable half: Redis stays the cache, Postgres becomes the record.
--
-- The flattened columns are the ones worth querying and sorting on. The whole
-- report is kept in `report` as well, so a column we did not think to flatten is
-- never actually lost.

create table if not exists public.audit_leads (
  -- Same id as the Redis report and the /audit/result/:id URL.
  id                            text primary key,

  -- When the audit ran, converted from AuditReport.createdAt (epoch ms).
  created_at                    timestamptz not null,
  -- When this row landed, which can differ if we ever backfill.
  inserted_at                   timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),

  -- Who, and what they asked us to look at.
  email                         text not null,
  listing_id                    text not null,
  listing_url                   text not null,

  -- Listing facts, from AuditReport.listing.
  listing_title                 text,
  listing_city                  text,
  listing_region                text,
  bedrooms                      integer,
  bathrooms                     numeric(4, 1),
  property_type                 text,

  -- The finding, from AuditReport.leaks. revenue_leak is the headline number.
  revenue_leak                  numeric(12, 2),
  target_annual_revenue         numeric(12, 2),
  market_median_annual_revenue  numeric(12, 2),
  top_quartile_annual_revenue   numeric(12, 2),
  price_gap                     numeric(10, 2),
  occupancy_gap                 numeric(5, 4),
  photo_gap                     integer,
  rating_gap                    numeric(3, 2),
  summary                       text,

  -- Everything, including recommendations and amenity gaps.
  report                        jsonb not null,

  -- Follow-up, so this doubles as the owner pipeline.
  status                        text not null default 'new',
  contacted_at                  timestamptz,
  notes                         text,

  constraint audit_leads_status_check check (
    status in ('new', 'contacted', 'qualified', 'won', 'lost', 'ignored')
  )
);

comment on table public.audit_leads is
  'Listing-audit submissions. Written server-side by /api/audit; Redis holds the same report under a 90-day TTL for fast reads.';
comment on column public.audit_leads.revenue_leak is
  'Estimated annual revenue left on the table. The number the follow-up conversation opens with.';
comment on column public.audit_leads.report is
  'The complete AuditReport, so nothing is lost to the flattened columns above.';

-- The three ways this table actually gets read: newest first, biggest gap
-- first, and "has this owner been contacted yet".
create index if not exists audit_leads_created_at_idx
  on public.audit_leads (created_at desc);
create index if not exists audit_leads_revenue_leak_idx
  on public.audit_leads (revenue_leak desc nulls last);
create index if not exists audit_leads_status_idx
  on public.audit_leads (status, created_at desc);
create index if not exists audit_leads_email_idx
  on public.audit_leads (lower(email));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists audit_leads_set_updated_at on public.audit_leads;
create trigger audit_leads_set_updated_at
  before update on public.audit_leads
  for each row execute function public.set_updated_at();

-- Row level security on, and deliberately no policies.
--
-- These rows are other people's email addresses and other people's revenue
-- numbers. Nothing reached through the publishable key may read, write, or
-- count them. Writes come from the route handler using the service role key,
-- which bypasses RLS. If a policy is ever added here it should be for an
-- authenticated admin role, never for `anon`.
alter table public.audit_leads enable row level security;

revoke all on public.audit_leads from anon, authenticated;

-- service_role is the one role that touches this table, and it needs the grant
-- spelled out: bypassing row level security does not bypass table privileges,
-- so a service-role client without this still gets "permission denied".
grant select, insert, update, delete on public.audit_leads to service_role;
