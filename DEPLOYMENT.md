# Deployment Guide

Simple, direct flow:

1. **User submits the form** with their name, email, company, and document selection.
2. **`request-documents` edge function**:
   - Records the request in `document_requests`.
   - Watermarks each requested PDF with the company name + today's date.
   - Uploads each watermarked copy to a per-request folder in storage.
   - Generates a **7-day signed URL** for each watermarked PDF.
3. **The page immediately renders the download links** — no email, no token verification.

URLs are valid for 7 days. After that, users must submit the form again.

---

## Prerequisites

- Supabase project (Storage + Edge Functions enabled)
- Vercel account for hosting the static site
- Supabase CLI: `npm install -g supabase`

---

## Step 1 — Run Database Migrations

```bash
# From the project root:
supabase db push
```

This applies (in order):
- `20260501000000_document_requests.sql`
- `20260501000001_document_requests_add_links.sql`
- `20260502000000_short_urls.sql` *(optional, only if you use short URLs)*

---

## Step 2 — Configure Edge Function Secret

The edge function needs the service-role key at runtime:

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

Verify:
```bash
supabase secrets list
```

---

## Step 3 — Deploy the Edge Function

```bash
supabase functions deploy request-documents
```

**Note:** Do NOT use `--no-verify-jwt`. The Supabase gateway validates the apikey header; removing this flag allows proper authentication.

Test it:
```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/request-documents \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "companyName": "Acme Corp",
    "documents": ["soc2", "iso27001"],
    "ndaAccepted": true
  }'
```

Expected response:
```json
{
  "success": true,
  "name": "Test User",
  "company": "Acme Corp",
  "documents": [
    { "key": "soc2",     "name": "SOC 2 Type II Report",                 "icon": "🔒", "url": "https://..." },
    { "key": "iso27001", "name": "ISO 27001 Statement of Applicability", "icon": "📋", "url": "https://..." }
  ],
  "expiresAt": "2026-05-12T..."
}
```

---

## Step 4 — Upload Documents to Supabase Storage

1. Supabase Dashboard → Storage → New bucket → name it **`audit-docs`** → set **PRIVATE**.
2. Upload PDFs at the **root** of the bucket with these exact filenames:
   - `soc2.pdf`
   - `iso27001.pdf`
   - `cmmc.pdf`
   - `pentest.pdf`
   - `dpa.pdf`
   - `questionnaire.pdf`

The function downloads these originals, watermarks them per-request, and stores the watermarked copies under `watermarked/<company>/<timestamp>_<file>.pdf`.

---

## Step 5 — Deploy the Website (Vercel)

In **Vercel → Project → Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `EDGE_FUNCTION_URL` | `https://YOUR_PROJECT_REF.supabase.co/functions/v1/request-documents` |
| `SUPABASE_PUBLISHABLE_KEY` | Your Supabase Publishable (Anon) Key |

Then deploy:
```bash
vercel deploy --prod
# or push to main and let Vercel auto-deploy
```

---

## Step 6 — End-to-End Test

1. Visit your site (e.g., `https://trust-center.vercel.app`).
2. Fill in the form, select at least one document, accept the NDA, and submit.
3. Within a few seconds, the success view should appear with download cards.
4. Click **Download** on any card → the watermarked PDF opens in a new tab.
5. Try the same URL in a private window 7 days later — you should get an "expired" error.

---

## Troubleshooting

**"Failed to save your request"**
The `document_requests` table is missing or its RLS blocks the service role. Re-run `supabase db push` and verify the table exists.

**"Failed to generate documents"**
The PDFs aren't in the `audit-docs` bucket, or the filenames don't match. Confirm the originals are at the bucket root with the exact names from Step 4.

**Download URL returns 400/403**
The URL has expired (after 7 days), or the `audit-docs` bucket is set to public (it must be private — signed URLs only work on private buckets).

**Form returns "Full name, email, and company name are required"**
The form is sending unexpected field names. The edge function accepts `fullName`/`full_name`, `companyName`/`company`, and `ndaAccepted`/`ndaAgreed`/`nda_accepted`/`nda_agreed`, so this should never fire — re-check the request body in the Network tab.

---

## Maintenance

**View recent requests:**
```sql
select name, email, company, docs, status, created_at
from public.document_requests
order by created_at desc
limit 20;
```

**Clean up old watermarked PDFs (optional):**
The watermarked copies in `audit-docs/watermarked/...` accumulate over time. You can periodically prune anything older than 7 days since their signed URLs have already expired:
```sql
-- pseudo: list and delete via the Storage API; SQL alone won't remove blobs.
```
Or use Supabase's Storage lifecycle rules (in Dashboard → Storage → Settings).
