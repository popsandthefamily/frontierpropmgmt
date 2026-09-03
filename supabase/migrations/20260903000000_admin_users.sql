-- Who is allowed into /admin.
--
-- The admin pages have been gated by ADMIN_AUTH_SECRET in the query string,
-- which has three problems: the secret ends up in browser history, referrer
-- headers and server logs; it cannot be granted or revoked per person; and if
-- it is stored write-only there is no way to read it back to use it.
--
-- This replaces it with the sign-in that already exists for owners. An admin is
-- simply an email address on this list, and access is a real session rather
-- than a string anyone who has ever seen a URL can reuse.

create table if not exists public.admin_users (
  email       text primary key,
  note        text,
  created_at  timestamptz not null default now()
);

comment on table public.admin_users is
  'Email addresses permitted into /admin. Checked against the signed-in session.';

-- Nothing reachable with the publishable key may read this list, signed in or
-- not: it is an inventory of privileged accounts. Only the service role, which
-- the server uses to answer "is this session an admin", can see it.
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select, insert, update, delete on public.admin_users to service_role;

insert into public.admin_users (email, note)
values ('popsandthefamily@gmail.com', 'Hunter Collins, owner')
on conflict (email) do nothing;
