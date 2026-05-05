-- access_tokens: maps a one-time secure token to a document request.
-- token_hash is SHA-256 of the raw token sent to the user — raw token is never stored.
-- The Edge Function hashes the incoming token and looks up the hash.

create table if not exists public.access_tokens (
  id          uuid        primary key default gen_random_uuid(),
  token_hash  text        not null unique,          -- SHA-256(raw_token), hex-encoded
  request_id  uuid        not null references public.document_requests(id) on delete cascade,
  email       text        not null,
  expires_at  timestamptz not null default (now() + interval '7 days'),
  used_at     timestamptz,                           -- null = unused
  use_count   int         not null default 0,
  max_uses    int         not null default 3,         -- allow up to 3 downloads
  revoked     boolean     not null default false,
  created_at  timestamptz not null default now()
);

alter table public.access_tokens enable row level security;

-- No public policies — only the service-role key (Edge Function) can access.

-- Index for fast token lookup
create index if not exists access_tokens_hash_idx on public.access_tokens (token_hash);
-- Index for expiry cleanup
create index if not exists access_tokens_expires_idx on public.access_tokens (expires_at);
