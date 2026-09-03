-- Multiple signers per document, reachable by emailed link.
--
-- A document had exactly two parties: the portal owner and Frontier. That
-- breaks the first time a cabin is owned by a couple, an LLC with two members,
-- or a co-investor, which is the normal case here.
--
-- Signers are now first-class rows, fields belong to a signer rather than to a
-- role, and anyone who is not Frontier can sign from an emailed link without an
-- account. A spouse signing one document once should not have to create a
-- login.
--
-- The link is the only credential those signers have, so it is treated like one:
-- a 256-bit random token that is never stored, only its SHA-256 hash, with an
-- expiry, and refused once that signer has signed.

create table if not exists public.signature_signers (
  id                uuid primary key default gen_random_uuid(),
  document_id       uuid not null references public.owner_documents (id) on delete cascade,
  request_id        uuid references public.signature_requests (id) on delete cascade,

  name              text not null,
  email             text,
  -- Shown on the document and in the certificate, e.g. "Owner", "Co-owner".
  role_label        text not null default 'Owner',
  -- 'external' signs from an emailed link; 'manager' is Frontier, signing from
  -- the admin side; 'owner' is external but also has a portal account, so the
  -- portal can hand them straight into signing.
  kind              text not null default 'external',
  sort_order        integer not null default 0,

  -- Only the hash is kept. A stolen database gives no working links.
  token_hash        text,
  token_expires_at  timestamptz,

  signed_at         timestamptz,
  typed_name        text,
  signer_ip         text,
  signer_user_agent text,
  consent_at        timestamptz,
  consent_text      text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint signature_signers_kind_check check (kind in ('external', 'owner', 'manager'))
);

create index if not exists signature_signers_document_idx
  on public.signature_signers (document_id, sort_order);
create index if not exists signature_signers_request_idx
  on public.signature_signers (request_id);
-- The lookup path when a link is opened.
create unique index if not exists signature_signers_token_idx
  on public.signature_signers (token_hash)
  where token_hash is not null;

drop trigger if exists signature_signers_set_updated_at on public.signature_signers;
create trigger signature_signers_set_updated_at
  before update on public.signature_signers
  for each row execute function public.set_updated_at();

-- Fields belong to a signer. signer_role stays for the rows placed before this
-- change so nothing is orphaned, but signer_id is what the app reads.
alter table public.signature_fields
  add column if not exists signer_id uuid references public.signature_signers (id) on delete cascade;

create index if not exists signature_fields_signer_idx
  on public.signature_fields (signer_id);

alter table public.signature_field_values
  add column if not exists signer_id uuid references public.signature_signers (id) on delete cascade;

-- The envelope no longer belongs to one person, so it tracks progress instead.
alter table public.signature_requests
  add column if not exists signers_total     integer,
  add column if not exists signers_completed integer not null default 0;

-- Nothing reachable with the publishable key may read this table: it holds
-- signing credentials, even hashed, plus other people's email addresses. Every
-- read happens server-side with the service role after a token or a session has
-- been checked.
alter table public.signature_signers enable row level security;
revoke all on public.signature_signers from anon, authenticated;
grant select, insert, update, delete on public.signature_signers to service_role;
