-- Fields belong to a party, and agreements get countersigned.
--
-- Every field was implicitly the owner's, which is wrong for a management
-- agreement: it has an Owner block and a Manager block. Worse, a manager field
-- placed by mistake would sit in the owner's required list and block them from
-- finishing at all.
--
-- So a field now names its party, and the request tracks two signatures. The
-- owner signs first, Frontier countersigns, and only then is the agreement
-- executed. Each party's evidence is recorded separately, because they signed
-- at different times, from different places, and both facts matter.

alter table public.signature_fields
  add column if not exists signer_role text not null default 'owner';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'signature_fields_role_check'
  ) then
    alter table public.signature_fields
      add constraint signature_fields_role_check
      check (signer_role in ('owner', 'manager'));
  end if;
end $$;

alter table public.signature_requests
  add column if not exists manager_signed_at     timestamptz,
  add column if not exists manager_name          text,
  add column if not exists manager_email         text,
  add column if not exists manager_ip            text,
  add column if not exists manager_user_agent    text;

-- 'signed' now means the owner has signed and it is waiting on Frontier.
-- 'executed' means both parties are done and the final PDF exists.
alter table public.signature_requests
  drop constraint if exists signature_requests_status_check;
alter table public.signature_requests
  add constraint signature_requests_status_check
  check (status in ('sent', 'viewed', 'signed', 'executed', 'void'));

-- Field values are per party too, so a countersignature cannot overwrite the
-- owner's captured input.
alter table public.signature_field_values
  add column if not exists signer_role text not null default 'owner';
