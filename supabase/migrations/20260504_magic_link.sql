-- Migration: Add document request tracking for Supabase Magic Link flow
-- Run this in Supabase SQL Editor or add as a migration file

-- 1. Update document_requests table to work with Supabase Auth
ALTER TABLE document_requests
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS auth_user_id UUID;

-- 2. Create index for looking up requests by email
CREATE INDEX IF NOT EXISTS idx_document_requests_email 
ON document_requests(email);

-- 3. Create index for looking up requests by auth user
CREATE INDEX IF NOT EXISTS idx_document_requests_auth_user 
ON document_requests(auth_user_id) 
WHERE auth_user_id IS NOT NULL;

-- 4. Enable Row Level Security
ALTER TABLE document_requests ENABLE ROW LEVEL SECURITY;

-- 5. Policy: Service role has full access
DROP POLICY IF EXISTS "Service role has full access" ON document_requests;
CREATE POLICY "Service role has full access" 
ON document_requests FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- 6. Policy: Anon can insert new requests
DROP POLICY IF EXISTS "Anon can insert requests" ON document_requests;
CREATE POLICY "Anon can insert requests" 
ON document_requests FOR INSERT 
WITH CHECK (true);

-- 7. Policy: Authenticated users can view their own requests
DROP POLICY IF EXISTS "Users can view own requests" ON document_requests;
CREATE POLICY "Users can view own requests" 
ON document_requests FOR SELECT 
USING (auth.jwt() ->> 'email' = email OR auth.uid() = auth_user_id);
