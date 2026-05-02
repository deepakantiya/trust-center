-- Short URL lookup table. Each row maps a random 8-char code to one signed
-- download link so the browser shows /r/<code> instead of the raw Supabase URL.
create table if not exists public.short_urls (
  code        text        primary key,
  request_id  uuid        not null references public.document_requests(id) on delete cascade,
  doc_key     text        not null,
  full_url    text        not null,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

alter table public.short_urls enable row level security;

-- Auto-delete expired rows to keep the table tidy.
create index if not exists short_urls_expires_at_idx on public.short_urls (expires_at);
