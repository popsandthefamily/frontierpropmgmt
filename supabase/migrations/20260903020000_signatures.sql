-- Electronic signature of owner documents.
--
-- What makes an electronic signature hold up under the ESIGN Act and UETA is
-- not the picture of a name. It is being able to show, later and to someone
-- hostile, that this person intended to sign, agreed to transact
-- electronically, and signed exactly this document and not a different one.
--
-- So the schema records all of it: who, when, from what address and browser,
-- the consent as a separate timestamped fact, and a SHA-256 of the exact bytes
-- of both the document presented and the document produced. If the file is ever
-- altered afterwards, the hash stops matching and that is provable.

/* ---------------------------------------------------------------- */
/*  Where the fields sit on the page                                */
/* ---------------------------------------------------------------- */

-- Coordinates are fractions of the page, not pixels, so a field placed on a
-- laptop lands in the same spot on a phone, at any zoom, and converts cleanly
-- into PDF points at burn-in time regardless of the page's dimensions.
create table if not exists public.signature_fields (
  id           uuid primary key default gen_random_uuid(),
  document_id  uuid not null references public.owner_documents (id) on delete cascade,
  page_number  integer not null check (page_number >= 1),
  x_pct        numeric(6, 5) not null check (x_pct >= 0 and x_pct <= 1),
  y_pct        numeric(6, 5) not null check (y_pct >= 0 and y_pct <= 1),
  w_pct        numeric(6, 5) not null check (w_pct > 0 and w_pct <= 1),
  h_pct        numeric(6, 5) not null check (h_pct > 0 and h_pct <= 1),
  field_type   text not null,
  label        text,
  required     boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),

  constraint signature_fields_type_check check (
    field_type in ('signature', 'initials', 'date', 'text', 'name')
  )
);

create index if not exists signature_fields_document_idx
  on public.signature_fields (document_id, page_number, sort_order);

/* ---------------------------------------------------------------- */
/*  A request to sign                                               */
/* ---------------------------------------------------------------- */

create table if not exists public.signature_requests (
  id                   uuid primary key default gen_random_uuid(),
  document_id          uuid not null references public.owner_documents (id) on delete cascade,
  owner_id             uuid not null references public.owner_profiles (id) on delete cascade,

  status               text not null default 'sent',

  -- The document as presented, hashed before anyone touches it.
  source_sha256        text,

  -- Consent is its own fact with its own timestamp, because "agreed to sign
  -- electronically" and "signed" are two separate legal requirements.
  consent_at           timestamptz,
  consent_text         text,

  signed_at            timestamptz,
  signer_name          text,
  signer_email         text,
  signer_ip            text,
  signer_user_agent    text,

  -- The flattened result, and its hash.
  signed_storage_path  text,
  signed_sha256        text,

  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),

  constraint signature_requests_status_check check (
    status in ('sent', 'viewed', 'signed', 'void')
  )
);

create index if not exists signature_requests_owner_idx
  on public.signature_requests (owner_id, created_at desc);
create unique index if not exists signature_requests_open_unique
  on public.signature_requests (document_id, owner_id)
  where status <> 'void';

/* ---------------------------------------------------------------- */
/*  What the signer entered                                         */
/* ---------------------------------------------------------------- */

create table if not exists public.signature_field_values (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references public.signature_requests (id) on delete cascade,
  field_id    uuid not null references public.signature_fields (id) on delete cascade,
  -- Typed text, or a data URL for a drawn signature.
  value       text not null,
  created_at  timestamptz not null default now(),

  constraint signature_field_values_unique unique (request_id, field_id)
);

/* ---------------------------------------------------------------- */
/*  The audit trail                                                 */
/* ---------------------------------------------------------------- */

-- Append-only by intent: nothing in the application ever updates or deletes a
-- row here, and no role but the service role can write one at all.
create table if not exists public.signature_events (
  id          uuid primary key default gen_random_uuid(),
  request_id  uuid not null references public.signature_requests (id) on delete cascade,
  event_type  text not null,
  ip          text,
  user_agent  text,
  detail      jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists signature_events_request_idx
  on public.signature_events (request_id, created_at);

/* ---------------------------------------------------------------- */
/*  updated_at                                                      */
/* ---------------------------------------------------------------- */

drop trigger if exists signature_requests_set_updated_at on public.signature_requests;
create trigger signature_requests_set_updated_at
  before update on public.signature_requests
  for each row execute function public.set_updated_at();

/* ---------------------------------------------------------------- */
/*  Row level security                                              */
/* ---------------------------------------------------------------- */

alter table public.signature_fields       enable row level security;
alter table public.signature_requests     enable row level security;
alter table public.signature_field_values enable row level security;
alter table public.signature_events       enable row level security;

revoke all on public.signature_fields       from anon, authenticated;
revoke all on public.signature_requests     from anon, authenticated;
revoke all on public.signature_field_values from anon, authenticated;
revoke all on public.signature_events       from anon, authenticated;

grant select on public.signature_requests to authenticated;
grant select on public.signature_fields   to authenticated;

grant select, insert, update, delete on public.signature_fields       to service_role;
grant select, insert, update, delete on public.signature_requests     to service_role;
grant select, insert, update, delete on public.signature_field_values to service_role;
grant select, insert, update, delete on public.signature_events       to service_role;

-- An owner may see their own requests, and the field layout of a document they
-- have actually been asked to sign. They may not write anything: the signed
-- values and the audit trail are written server-side, so a signer cannot edit
-- their own evidence.
drop policy if exists signature_requests_select_own on public.signature_requests;
create policy signature_requests_select_own
  on public.signature_requests for select
  to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists signature_fields_select_addressed on public.signature_fields;
create policy signature_fields_select_addressed
  on public.signature_fields for select
  to authenticated
  using (
    exists (
      select 1 from public.signature_requests r
      where r.document_id = signature_fields.document_id
        and r.owner_id = (select auth.uid())
    )
  );
