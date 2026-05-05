-- Fix: ensure the 'company' column exists.
-- The table may have been bootstrapped with 'company_name' instead of 'company'.
ALTER TABLE public.document_requests
  ADD COLUMN IF NOT EXISTS company text;

-- Backfill from company_name if that column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name   = 'document_requests'
      AND column_name  = 'company_name'
  ) THEN
    UPDATE public.document_requests
       SET company = company_name
     WHERE company IS NULL;
  END IF;
END $$;

-- Make it NOT NULL now that it's filled
ALTER TABLE public.document_requests
  ALTER COLUMN company SET NOT NULL;
