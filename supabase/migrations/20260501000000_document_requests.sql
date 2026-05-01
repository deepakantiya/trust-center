-- Trust Center: audit-document request log
-- Each row = one NDA-accepted form submission from the public Trust Center.
-- The service-role key (used only server-side in the Edge Function) can read/write.
-- Anon / authenticated keys are intentionally blocked by RLS.

create table if not exists public.document_requests (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  email        text        not null,
  company      text        not null,
  docs         text[]      not null,
  nda_accepted boolean     not null default true,
  status       text        not null default 'pending'
                           check (status in ('pending', 'sent', 'failed')),
  created_at   timestamptz not null default now()
);

alter table public.document_requests enable row level security;

-- No public policies — only the service-role key (Edge Function) can access this table.
