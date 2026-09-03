-- Documents an owner can download from the portal.
--
-- The site promises "year-end tax documents" alongside the monthly statements.
-- Files live in a private Storage bucket; this table is the index and the
-- permission record.
--
-- Nothing here is a public URL. The bucket is private, and the portal hands out
-- short-lived signed links generated only after the row has been read through
-- row level security as the owner themselves. A leaked link expires; a leaked
-- public URL would not.

create table if not exists public.owner_documents (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references public.owner_profiles (id) on delete cascade,
  -- Optional: a 1099 belongs to the owner, an inspection report to a property.
  property_id   uuid references public.owner_properties (id) on delete set null,

  title         text not null,
  kind          text not null default 'other',
  -- Path inside the private bucket. Never a URL.
  storage_path  text not null unique,
  mime_type     text,
  size_bytes    bigint,
  -- What the document covers, e.g. a tax year or a month.
  period_label  text,

  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  constraint owner_documents_kind_check check (
    kind in ('statement', 'tax', 'agreement', 'inspection', 'invoice', 'other')
  )
);

create index if not exists owner_documents_owner_idx
  on public.owner_documents (owner_id, created_at desc);

comment on column public.owner_documents.storage_path is
  'Object path in the private owner-documents bucket. Access is only ever via a short-lived signed URL.';

drop trigger if exists owner_documents_set_updated_at on public.owner_documents;
create trigger owner_documents_set_updated_at
  before update on public.owner_documents
  for each row execute function public.set_updated_at();

alter table public.owner_documents enable row level security;
revoke all on public.owner_documents from anon, authenticated;
grant select on public.owner_documents to authenticated;
grant select, insert, update, delete on public.owner_documents to service_role;

-- Same shape as statements: your own, and only once published.
drop policy if exists owner_documents_select_own_published on public.owner_documents;
create policy owner_documents_select_own_published
  on public.owner_documents for select
  to authenticated
  using (owner_id = (select auth.uid()) and published_at is not null);
