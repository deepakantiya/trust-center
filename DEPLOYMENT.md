# Deployment Guide

This document outlines all the steps required to deploy the secure document retrieval system with token-based access control.

## System Overview

The flow works as follows:

1. **Form Submission** → User fills out form and submits request
2. **Token Generation** → Server generates secure 256-bit token, stores SHA-256 hash in database
3. **Email Delivery** → Branded email sent via Resend with retrieval link containing raw token
4. **Token Verification** → User clicks link, token is hashed and validated against database
5. **PDF Watermarking** → Fresh PDFs are watermarked with company name and date
6. **Download** → User receives 1-hour signed URLs (token provides the durable gate)

## Prerequisites

- [ ] Supabase project set up and accessible
- [ ] Vercel account for hosting the website
- [ ] Resend account (email delivery)
- [ ] Local Supabase CLI: `npm install -g supabase`

---

## Step 1: Set Up Email Provider (Resend)

### 1.1 Create Resend Account
- Go to [https://resend.com](https://resend.com)
- Sign up for a free account
- Verify your email address

### 1.2 Verify Sender Domain
- In Resend dashboard, navigate to **Domains**
- Add your domain (or use a subdomain like `trust@yourdomain.com`)
- Follow DNS verification instructions
- Wait for DNS propagation (usually 5-10 minutes)

### 1.3 Get API Key
- In Resend dashboard, go to **API Keys**
- Create a new API key (you'll get something like `re_1234567890abcdef`)
- Store this securely — you'll need it in Step 3

---

## Step 2: Run Database Migrations

This creates the `access_tokens` table needed to store secure tokens.

```bash
# From the project root:
supabase db push

# This will apply all migrations in supabase/migrations/ in order:
# - 20260501000000_document_requests.sql
# - 20260501000001_document_requests_add_links.sql
# - 20260502000000_short_urls.sql
# - 20260506000000_access_tokens.sql
```

**Verify migration succeeded:**
```bash
supabase db pull  # Should show access_tokens table in schema
```

---

## Step 3: Configure Edge Function Secrets

The Edge Functions need access to environment variables at runtime.

```bash
# Set the Supabase Service Role Key (only use in Edge Functions, not client-side)
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Set the site's base URL (used to build email links)
# Example: https://trust-center.vercel.app
supabase secrets set SITE_BASE_URL=https://your-deployed-site.vercel.app

# Set the Resend API key
supabase secrets set RESEND_API_KEY=re_<your-key>

# Set the email sender address (must be verified in Resend)
supabase secrets set EMAIL_FROM=trust@yourdomain.com
```

**Verify secrets are set:**
```bash
supabase secrets list
```

---

## Step 4: Deploy Edge Functions

Deploy both edge functions to Supabase:

```bash
# Deploy request-documents (handles form submission)
supabase functions deploy request-documents --no-verify-jwt

# Deploy verify-documents (validates token, returns PDFs)
supabase functions deploy verify-documents --no-verify-jwt
```

**Verify deployment:**
```bash
supabase functions list
# You should see both request-documents and verify-documents with green checkmarks
```

**Test the functions:**
```bash
# Test request-documents
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/request-documents \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "companyName": "Acme Corp",
    "documents": ["soc2", "iso27001"],
    "ndaAccepted": true
  }'

# You should see a response with "success": true
```

---

## Step 5: Upload Documents to Supabase Storage

The system expects PDF files at specific paths in a private bucket.

### 5.1 Create Storage Bucket
- Go to Supabase Dashboard → Storage
- Create a new bucket called **`audit-docs`**
- Set it to **PRIVATE** (not public)

### 5.2 Upload PDFs

Upload the following PDFs to the root of the `audit-docs` bucket:
- `soc2.pdf` — SOC 2 Type II Report
- `iso27001.pdf` — ISO 27001 Statement of Applicability
- `cmmc.pdf` — CMMC Assessment Summary
- `pentest.pdf` — Penetration Test Executive Summary
- `dpa.pdf` — Data Processing Agreement
- `questionnaire.pdf` — Security Questionnaire

**To upload via CLI:**
```bash
# Assuming PDFs are in ./docs/ directory
supabase storage upload audit-docs soc2.pdf ./docs/soc2.pdf
supabase storage upload audit-docs iso27001.pdf ./docs/iso27001.pdf
# ... and so on for each file
```

---

## Step 6: Deploy Website to Vercel

### 6.1 Set Environment Variables in Vercel

Go to **Vercel Dashboard → [Your Project] → Settings → Environment Variables**

Add these variables:

| Variable | Value |
|---|---|
| `EDGE_FUNCTION_URL` | `https://YOUR_PROJECT_REF.supabase.co/functions/v1/request-documents` |
| `VERIFY_FUNCTION_URL` | `https://YOUR_PROJECT_REF.supabase.co/functions/v1/verify-documents` |
| `SUPABASE_PUBLISHABLE_KEY` | Your Supabase Publishable (Anon) Key |
| `SITE_BASE_URL` | Your Vercel deployment URL (e.g., `https://trust-center.vercel.app`) |

### 6.2 Update SUPABASE_SERVICE_ROLE_KEY in Edge Functions

If you haven't already, update the `SUPABASE_SERVICE_ROLE_KEY` secret:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your-key>
```

### 6.3 Deploy

```bash
# If using Vercel CLI:
vercel deploy

# Or push to GitHub and let Vercel auto-deploy
git push origin main
```

---

## Step 7: End-to-End Testing

### 7.1 Test Form Submission
1. Visit your deployed site (e.g., https://trust-center.vercel.app)
2. Fill in the form with test data:
   - Full Name: Test User
   - Email: your-email@example.com
   - Company: Test Company
   - Select at least one document
   - Check "I agree to the NDA"
3. Click "Request Documents"
4. **Expected:** Success message appears ("Check your email...")

### 7.2 Check Email Receipt
1. Check your inbox for an email from `trust@yourdomain.com` (or whatever you set)
2. **Expected:** Email contains:
   - Subject: "Your Trust Center documents are ready"
   - Branded header with Trust Center logo
   - List of requested documents
   - Blue "Access My Documents" button
   - Expiry warning (7-day link)
   - NDA acknowledgment

### 7.3 Test Document Retrieval
1. Click the "Access My Documents" link in the email
2. **Expected:** Page shows "Verifying your link..." briefly, then displays:
   - Confirmation: "Your documents are ready"
   - Document cards with download buttons
   - "X accesses remaining" badge (e.g., "3 accesses remaining")
   - NDA reminder in yellow box
3. Click a download button
4. **Expected:** PDF downloads with company watermark and date

### 7.4 Test Token Limits
1. Click the same email link 3 times (max allowed)
2. **Expected:** On the 4th click, get error: "This link has reached its maximum number of uses."

### 7.5 Test Expiry
1. Wait 7 days, then try to use the same link
2. **Expected:** Error: "This link has expired. Please submit a new request."

---

## Troubleshooting

### "Email send failed" in logs
- **Cause:** `RESEND_API_KEY` not set or invalid
- **Fix:** Verify the key is set correctly and hasn't expired
  ```bash
  supabase secrets list | grep RESEND
  ```

### "Document request not found" error
- **Cause:** Migration 20260506000000_access_tokens.sql wasn't applied
- **Fix:** Run `supabase db push` again

### "Invalid token" on retrieval page
- **Cause:** Token was tampered with or doesn't exist
- **Fix:** User should request documents again

### PDFs not watermarked
- **Cause:** pdf-lib dependency missing in verify-documents function
- **Fix:** Function imports from ESM (https://esm.sh/pdf-lib@1.17.1), should work automatically

### Form submission fails with "required fields"
- **Cause:** Field names don't match (e.g., `full_name` vs `fullName`)
- **Fix:** Ensure site.js sends camelCase: `fullName`, `companyName`, `ndaAccepted`

### Email link doesn't work
- **Cause:** `SITE_BASE_URL` not set or incorrect in Edge Function secrets
- **Fix:** Verify it matches your Vercel deployment URL
  ```bash
  supabase secrets set SITE_BASE_URL=https://your-vercel-url.vercel.app
  ```

---

## Monitoring & Maintenance

### Monitor Token Usage
Check token usage and expiry in Supabase:
```sql
-- View all active tokens
select id, email, expires_at, use_count, max_uses, revoked 
from public.access_tokens 
where expires_at > now() and not revoked
order by created_at desc;

-- Revoke a specific token (if user complains about sharing)
update public.access_tokens 
set revoked = true 
where token_hash = '<token_hash>';

-- Clean up expired tokens (run periodically)
delete from public.access_tokens 
where expires_at < now() - interval '1 day';
```

### Monitor Document Requests
```sql
-- View recent requests
select name, email, company, docs, status, created_at 
from public.document_requests 
order by created_at desc 
limit 10;

-- Count requests by company
select company, count(*) as request_count 
from public.document_requests 
group by company 
order by request_count desc;
```

---

## Security Notes

✅ **What's Secure:**
- Raw tokens never stored in database (only SHA-256 hash)
- Tokens generated via `crypto.getRandomValues()` (cryptographically secure)
- 7-day expiry prevents indefinite access
- Max 3 uses per token limits reuse
- PDFs watermarked with recipient company name and date
- Email delivery via Resend (trusted provider)
- Edge functions use service-role key (never exposed to client)
- Storage is private (signed URLs provide temporary access)

⚠️ **Important Reminders:**
- Never commit `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or other secrets to git
- Use Supabase secrets for Edge Function environment variables
- Use Vercel environment variables for website (Node.js serverless functions)
- Regularly audit token usage for suspicious patterns
- Consider implementing rate limiting on form submission

---

## Next Steps

1. [ ] Set up Resend account and verify domain
2. [ ] Run `supabase db push` to create `access_tokens` table
3. [ ] Set Edge Function secrets
4. [ ] Deploy both edge functions
5. [ ] Upload PDF documents to Supabase Storage
6. [ ] Deploy website to Vercel with environment variables
7. [ ] Perform end-to-end testing
8. [ ] Monitor logs for errors
9. [ ] Communicate new flow to users
