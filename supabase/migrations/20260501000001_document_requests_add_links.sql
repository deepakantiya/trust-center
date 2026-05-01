-- Add a jsonb column to store the generated signed download links.
-- Each element: { "key": "soc2", "label": "SOC 2 Type II Report", "url": "https://...", "expires_at": "2026-..." }
alter table public.document_requests
  add column if not exists links jsonb not null default '[]'::jsonb;

-- Update status check constraint to replace 'sent' with 'completed'.
alter table public.document_requests
  drop constraint if exists document_requests_status_check;

alter table public.document_requests
  add constraint document_requests_status_check
  check (status in ('pending', 'completed', 'failed'));
