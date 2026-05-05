-- Create audit-docs storage bucket with RLS policies
-- This bucket stores both original PDFs and watermarked copies
-- Only the service-role key (Edge Function) can access

-- Create the private audit-docs bucket
insert into storage.buckets (id, name, public)
values ('audit-docs', 'audit-docs', false)
on conflict (id) do nothing;

-- RLS Policy 1: Service role can download (select) any file
create policy "Service role can read audit docs"
  on storage.objects for select
  using (
    bucket_id = 'audit-docs' AND
    auth.role() = 'service_role'
  );

-- RLS Policy 2: Service role can upload (insert) watermarked files
create policy "Service role can upload watermarked docs"
  on storage.objects for insert
  with check (
    bucket_id = 'audit-docs' AND
    auth.role() = 'service_role' AND
    (storage.foldername(name))[1] = 'watermarked'
  );

-- RLS Policy 3: Service role can update (for upsert) watermarked files
create policy "Service role can update watermarked docs"
  on storage.objects for update
  using (
    bucket_id = 'audit-docs' AND
    auth.role() = 'service_role' AND
    (storage.foldername(name))[1] = 'watermarked'
  )
  with check (
    bucket_id = 'audit-docs' AND
    auth.role() = 'service_role' AND
    (storage.foldername(name))[1] = 'watermarked'
  );

-- RLS Policy 4: Service role can delete (cleanup) old watermarked files (optional)
create policy "Service role can delete old watermarked docs"
  on storage.objects for delete
  using (
    bucket_id = 'audit-docs' AND
    auth.role() = 'service_role' AND
    (storage.foldername(name))[1] = 'watermarked'
  );
