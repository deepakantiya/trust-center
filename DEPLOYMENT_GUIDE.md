# Trust Center: Complete Deployment Guide for Vercel & Supabase

This guide provides step-by-step instructions to deploy the Trust Center on Vercel (frontend) and Supabase (backend).

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Supabase Setup](#step-1-supabase-setup)
4. [Step 2: Vercel Setup](#step-2-vercel-setup)
5. [Step 3: Environment Variables](#step-3-environment-variables)
6. [Step 4: Database Schema](#step-4-database-schema)
7. [Step 5: Supabase Edge Functions](#step-5-supabase-edge-functions)
8. [Step 6: Deploy to Production](#step-6-deploy-to-production)
9. [Step 7: Verification & Testing](#step-7-verification--testing)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     TRUST CENTER APP                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  VERCEL (Frontend + API)              SUPABASE (Backend)    │
│  ───────────────────────              ──────────────────    │
│                                                               │
│  • website/              ◄──────────► • PostgreSQL DB        │
│    - index.html                       • Storage (PDFs)       │
│    - css/styles.css                   • Edge Functions       │
│    - js/site.js                       • Auth (JWT)           │
│                                                               │
│  • api/                  ◄──────────►                        │
│    - config.js (env vars)                                    │
│    - r.js (short URL redirects)                             │
│    - d/[requestId]/[docKey].js                              │
│                                                               │
│  COMPONENTS:                                                 │
│  • Runtime: Node.js 20.x              • Version: 2+          │
│  • Storage: Static HTML/CSS/JS        • Auth: Service Role   │
│  • API: 3 Serverless Functions        • Functions: Deno 1.4x │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

**Frontend (Vercel):**
- Static website: `/website/` → served as `outputDirectory`
- API functions: `/api/` → serverless functions
- Form handling: Inline JavaScript in `index.html`

**Backend (Supabase):**
- Database: `document_requests`, `short_urls` tables
- Storage: `audit-docs` bucket (PDFs)
- Edge Functions: `Deno-Edge-Function`, `request-documents`, `request-docs`

---

## ✅ Prerequisites

### Before you start, you'll need:

1. **GitHub Account** with the trust-center repository
2. **Supabase Account** (free tier available at https://supabase.com)
3. **Vercel Account** (connected to GitHub, free tier available)
4. **Local Tools**:
   ```bash
   brew install supabase/tap/supabase  # macOS
   # or
   sudo apt install supabase            # Linux
   npm install -g supabase              # Node.js
   ```
5. **Credentials**:
   - Supabase Project URL
   - Supabase API Keys (publishable + secret)
   - Vercel project linked to GitHub

---

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to https://app.supabase.com
2. Click **"New project"**
3. Fill in:
   - **Project name**: `trust-center` (or your name)
   - **Database password**: Generate a strong password (save it!)
   - **Region**: Pick closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for initialization

### 1.2 Retrieve Your Credentials

1. In Supabase Dashboard, go to **Settings → API**
2. Copy these values (save to a secure location):
   ```
   SUPABASE_URL: https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_ANON_KEY: eyJ... (publishable/anon key)
   SUPABASE_SERVICE_ROLE_KEY: eyJ... (service role key - SECRET!)
   ```

3. For JWT Signing Keys (recommended):
   - Go to **Settings → API → JWT Signing Keys**
   - Copy the **Signing Secret** (for SUPABASE_SECRET_KEY)
   - Generate a **new JWT Signing Key** if needed

### 1.3 Enable Supabase Branching (Optional but Recommended)

1. Go to **Settings → Branches**
2. Enable "Enable Branching"
3. This allows preview deployments on pull requests

---

## Step 2: Vercel Setup

### 2.1 Create a Vercel Project

1. Go to https://vercel.com
2. Click **"Add New" → "Project"**
3. Select your GitHub repository (`trust-center`)
4. Click **"Import"**
5. In **Project Settings**:
   - **Framework**: Leave as "Detected" (static)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: `website`
6. Click **"Deploy"**

### 2.2 Understand the Vercel Configuration

Your `vercel.json` defines:

```json
{
  "outputDirectory": "website",      // Serves static files from here
  "functions": {
    "api/config.js": { "runtime": "nodejs20.x" },
    "api/r.js": { "runtime": "nodejs20.x" }
  },
  "rewrites": [
    { "source": "/api/config", "destination": "/api/config.js" },
    { "source": "/r/:code", "destination": "/api/r?code=:code" }
  ]
}
```

**What this means:**
- `outputDirectory`: Serves static HTML from `/website/`
- `functions`: Tells Vercel which files are serverless functions
- `rewrites`: Maps clean URLs to functions:
  - `/api/config` → `api/config.js` (serves environment config)
  - `/r/:code` → `api/r.js?code=:code` (short URL redirects)
- `headers`: Security headers (CSP, CORS, HSTS, etc.)

### 2.3 Verify Deployment

1. After deployment completes, you should see:
   ```
   ✓ Deployment successful
   Production: https://your-project.vercel.app
   ```

2. Visit the URL to confirm the Trust Center loads

---

## Step 3: Environment Variables

### 3.1 Vercel Environment Variables

Go to **Vercel Dashboard → Project → Settings → Environment Variables**

Add these variables:

| Variable | Value | Visibility |
|---|---|---|
| `SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` | Production, Preview, Development |
| `SUPABASE_SECRET_KEY` | Your JWT Signing Secret (sb_secret_...) | Production, Preview only |
| `EDGE_FUNCTION_URL` | `https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function` | Production, Preview |
| `SUPABASE_PUBLISHABLE_KEY` | Your Publishable Key (sb_publishable_...) | Production, Preview |
| `SITE_BASE_URL` | `https://your-project.vercel.app` | Production, Preview |

**Important Notes:**
- ⚠️ **NEVER** add `SUPABASE_SERVICE_ROLE_KEY` to Vercel (it's server-side only)
- Mark sensitive variables as "Production" only if needed
- After saving, Vercel will automatically redeploy

### 3.2 Vercel Preview Environment

For preview deployments (on PRs), create a separate set:
- Same variables, but pointing to a Supabase **preview branch** (if branching enabled)
- Allows testing edge functions before production

### 3.3 Environment Variable Reference

```bash
# From Supabase Dashboard

# .env.example (safe to commit)
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

# Local development only (NEVER commit)
SUPABASE_SECRET_KEY=sb_secret_...

# Vercel Secrets (set via dashboard, NEVER commit)
SUPABASE_SECRET_KEY=sb_secret_...
EDGE_FUNCTION_URL=https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function
SITE_BASE_URL=https://your-project.vercel.app
```

---

## Step 4: Database Schema

### 4.1 Apply Migrations

The schema is defined in SQL migrations:

**Option A: Using Supabase CLI**

```bash
# Install/login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations (creates tables)
supabase db push

# Or push specific migration
supabase db push supabase/migrations/20260501000000_document_requests.sql
```

**Option B: Manual SQL in Supabase Dashboard**

1. Go to **Supabase Dashboard → SQL Editor**
2. Click **"New Query"**
3. Copy the contents of each migration file:
   - `supabase/migrations/20260501000000_document_requests.sql`
   - `supabase/migrations/20260501000001_document_requests_add_links.sql`
   - `supabase/migrations/20260502000000_short_urls.sql`
4. Paste and click **"Run"**

### 4.2 Verify Schema Creation

Run this query in SQL Editor:

```sql
-- Check document_requests table
SELECT * FROM information_schema.tables 
WHERE table_name IN ('document_requests', 'short_urls');

-- Verify columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'document_requests'
ORDER BY ordinal_position;
```

You should see:
```
✓ document_requests (id, name, email, company, docs, nda_accepted, status, links, created_at)
✓ short_urls (code, request_id, doc_key, full_url, expires_at, created_at)
```

---

## Step 5: Supabase Edge Functions

### 5.1 Deploy Edge Functions

Three edge functions power the document request flow:

| Function | Purpose | Deploy Command |
|---|---|---|
| `Deno-Edge-Function` | Main form handler, generates signed URLs | `supabase functions deploy Deno-Edge-Function --no-verify-jwt` |
| `request-documents` | Watermarked PDF generation | `supabase functions deploy request-documents --no-verify-jwt` |
| `request-docs` | Alias/fallback for request-documents | `supabase functions deploy request-docs --no-verify-jwt` |

**Deploy all functions:**

```bash
# Login if not already
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy each function
supabase functions deploy Deno-Edge-Function --no-verify-jwt
supabase functions deploy request-documents --no-verify-jwt
supabase functions deploy request-docs --no-verify-jwt

# Verify deployments
supabase functions list
```

### 5.2 Set Edge Function Secrets

Edge functions need the Supabase credentials to access your database:

```bash
# Set JWT Signing Secret
supabase secrets set SUPABASE_SECRET_KEY=sb_secret_your_actual_key

# Set site base URL for short URLs
supabase secrets set SITE_BASE_URL=https://your-project.vercel.app

# List secrets (values hidden)
supabase secrets list
```

### 5.3 Disable JWT Verification (⚠️ Important)

By default, Supabase Edge Functions require a valid JWT token. Since your form is public, disable this:

**Option A: CLI**
```bash
supabase functions deploy Deno-Edge-Function --no-verify-jwt
```

**Option B: Supabase Dashboard**
1. Go to **Edge Functions → Deno-Edge-Function → Configuration**
2. Toggle **"Enforce JWT Verification"** OFF
3. Click Save
4. Repeat for other functions

### 5.4 Test Edge Function

```bash
# Get function URL from dashboard: Edge Functions → Deno-Edge-Function
FUNCTION_URL="https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function"

# Test with curl
curl -X POST "$FUNCTION_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "docs": ["soc2"],
    "nda_accepted": true
  }'

# Should return:
# {"success": true, "links": [...], "requestId": "uuid", "expiresAt": "..."}
```

---

## Step 6: Deploy to Production

### 6.1 Complete Deployment Checklist

- [ ] **Supabase**
  - [ ] Project created and credentials saved
  - [ ] Database migrations applied (`document_requests`, `short_urls` tables exist)
  - [ ] Storage bucket created (`audit-docs`)
  - [ ] PDF files uploaded to storage bucket:
    - [ ] `soc2.pdf`
    - [ ] `iso27001.pdf`
    - [ ] `cmmc.pdf`
    - [ ] `pentest.pdf`
    - [ ] `dpa.pdf`
    - [ ] `questionnaire.pdf`
  - [ ] Edge functions deployed (all 3)
  - [ ] Edge function secrets set (`SUPABASE_SECRET_KEY`, `SITE_BASE_URL`)
  - [ ] JWT verification disabled for edge functions
  - [ ] RLS policies verified (service role can access)

- [ ] **Vercel**
  - [ ] Project created and linked to GitHub
  - [ ] Environment variables set:
    - [ ] `SUPABASE_URL`
    - [ ] `SUPABASE_SECRET_KEY`
    - [ ] `SUPABASE_PUBLISHABLE_KEY`
    - [ ] `EDGE_FUNCTION_URL`
    - [ ] `SITE_BASE_URL`
  - [ ] Deployment successful (no build errors)
  - [ ] Static files serving correctly

- [ ] **GitHub**
  - [ ] Environment variables committed to `.env.example`
  - [ ] Sensitive credentials NOT in git
  - [ ] Vercel integration enabled

### 6.2 Production Deployment Steps

**Step 1: Push to main branch**
```bash
git add .
git commit -m "chore: Configure Supabase and Vercel"
git push origin main
```

**Step 2: Vercel auto-deploys**
- Vercel watches for pushes to `main`
- Automatically rebuilds and deploys
- Check Vercel Dashboard for status

**Step 3: Verify Production**
1. Visit your Vercel domain: `https://your-project.vercel.app`
2. Scroll to "Request Audit Reports" section
3. Try the form with test data
4. Should see download links (watermarked PDFs)

### 6.3 Continuous Deployment (CI/CD)

Your repository has automated checks on every PR:

**GitHub Actions Workflows** (`.github/workflows/`)

| Workflow | Trigger | Checks | Blocks Merge? |
|---|---|---|---|
| `compliance-checks.yml` | Every PR | Markdown lint, link check, secret scan, PII guard | Yes |
| `security-scan.yaml` | Every PR | SAST, dependency check | Yes |
| `dast-scan.yaml` | Manual trigger | Dynamic security testing | No |
| `codeql.yml` | Weekly + PR | Code quality analysis | Warn |

**What happens on push:**
```
1. Push to GitHub branch
   ↓
2. Vercel Preview Deployment (if PR)
   ↓
3. GitHub Actions Compliance Checks
   - Markdown lint ✓
   - Secret scan (Gitleaks) ✓
   - PII guard ✓
   - Link checker ✓
   ↓
4. If main branch → Vercel Production Deployment
```

---

## Step 7: Verification & Testing

### 7.1 Frontend Verification

Test the static website:

```bash
# 1. Check HTML loads
curl https://your-project.vercel.app | grep -o "<title>.*</title>"
# Should show: <title>Trust Center - SOC 2, ISO 27001, CMMC</title>

# 2. Check CSS loads
curl https://your-project.vercel.app/css/styles.css | head -5
# Should show CSS content

# 3. Check JavaScript loads
curl https://your-project.vercel.app/js/site.js | head -5
# Should show JavaScript content
```

### 7.2 API Verification

Test the serverless functions:

```bash
# Test /api/config endpoint (returns environment config)
curl https://your-project.vercel.app/api/config
# Should return: window.ENV = { EDGE_FUNCTION_URL: "...", SUPABASE_PUBLISHABLE_KEY: "..." };

# Test /r/:code endpoint (short URL redirect)
curl -i https://your-project.vercel.app/r/testcode
# Should return 302 or 404 (depends on if code exists in DB)
```

### 7.3 Edge Function Verification

```bash
# Get your edge function URL from Supabase Dashboard
FUNCTION_URL="https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function"

# Test form submission
curl -X POST "$FUNCTION_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "docs": ["soc2"],
    "nda_accepted": true
  }'

# Should return success response with download links
```

### 7.4 End-to-End Test

1. **Open your Vercel URL**
2. **Scroll to "Request Audit Reports"**
3. **Fill form**:
   - Full Name: John Doe
   - Email: john@example.com
   - Company: Acme Corp
   - Documents: Check SOC 2
   - NDA: Check box
4. **Click Submit**
5. **Verify**:
   - ✅ Form disappears
   - ✅ Success message shows
   - ✅ Download links appear
   - ✅ Can click to download PDF
   - ✅ PDF has watermark with company name

### 7.5 Database Verification

Check that data was saved:

```sql
-- In Supabase SQL Editor

-- Check document requests
SELECT id, name, email, company, status, created_at 
FROM document_requests 
ORDER BY created_at DESC 
LIMIT 5;

-- Check short URLs
SELECT code, doc_key, expires_at 
FROM short_urls 
ORDER BY created_at DESC 
LIMIT 5;

-- Verify links column
SELECT id, name, links 
FROM document_requests 
WHERE links IS NOT NULL 
LIMIT 1;
```

---

## 🔧 Troubleshooting

### Issue: "An error occurred. Please try again."

**Cause**: Edge function failing (likely schema mismatch)

**Fix**:
1. Check edge function logs:
   ```bash
   supabase functions list
   # Click on function → View logs
   ```
2. Verify database columns match:
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'document_requests';
   ```
3. Expected columns: `id`, `name`, `email`, `company`, `docs`, `nda_accepted`, `status`, `links`, `created_at`

### Issue: "Cannot POST to edge function URL"

**Cause**: Function endpoint not found or JWT verification blocking

**Fix**:
```bash
# Redeploy with --no-verify-jwt
supabase functions deploy Deno-Edge-Function --no-verify-jwt

# Or disable in dashboard:
# Edge Functions → [Function] → Configuration → toggle JWT OFF
```

### Issue: "PDF files not downloading"

**Cause**: Storage bucket missing or files not uploaded

**Fix**:
1. Create `audit-docs` bucket:
   ```
   Supabase Dashboard → Storage → New bucket
   Name: audit-docs
   Access: Private
   ```

2. Upload PDFs with exact names:
   - `soc2.pdf`
   - `iso27001.pdf`
   - `cmmc.pdf`
   - `pentest.pdf`
   - `dpa.pdf`
   - `questionnaire.pdf`

### Issue: Environment variables not loading

**Cause**: Variables not set in Vercel dashboard

**Fix**:
1. Go to **Vercel Dashboard → Project → Settings → Environment Variables**
2. Add all required variables:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `EDGE_FUNCTION_URL`
   - `SITE_BASE_URL`
3. Redeploy: **Deployments → Click latest → Redeploy**

### Issue: "Links expired immediately"

**Cause**: `SITE_BASE_URL` not set in edge function secrets

**Fix**:
```bash
# Set secret in Supabase
supabase secrets set SITE_BASE_URL=https://your-project.vercel.app

# Redeploy edge function
supabase functions deploy Deno-Edge-Function --no-verify-jwt
```

### Issue: CORS errors in browser console

**Cause**: Edge function CORS headers not set

**Fix**:
Verify `vercel.json` has CORS headers:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

### Issue: "Service role key not found"

**Cause**: `SUPABASE_SECRET_KEY` not set in Vercel environment

**Fix**:
1. Get your JWT Signing Secret from Supabase:
   - **Settings → API → JWT Signing Keys → Signing Secret**
2. Add to Vercel:
   - **Settings → Environment Variables**
   - Name: `SUPABASE_SECRET_KEY`
   - Value: (your secret key)
   - Mark as: Production + Preview
3. Redeploy

---

## 📚 Additional Resources

### Supabase Documentation
- [Supabase Getting Started](https://supabase.com/docs)
- [Edge Functions](https://supabase.com/docs/guides/functions)
- [Database Guide](https://supabase.com/docs/guides/database)
- [Storage Documentation](https://supabase.com/docs/guides/storage)

### Vercel Documentation
- [Vercel Getting Started](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/functions/overview)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deployments](https://vercel.com/docs/concepts/deployments/overview)

### GitHub Integration
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 🎯 Summary

You've successfully deployed Trust Center! Here's what you have:

✅ **Production URL**: `https://your-project.vercel.app`
✅ **Database**: Supabase PostgreSQL with 2 tables
✅ **API**: 3 serverless functions + 2 Vercel functions
✅ **Storage**: Private PDF bucket with signed URLs
✅ **Security**: JWT auth, RLS policies, CSP headers
✅ **CI/CD**: Automated tests on every PR

**Next steps:**
1. Monitor edge function logs for errors
2. Track form submissions in `document_requests` table
3. Update PDFs in storage as needed
4. Configure domain with custom DNS (optional)

---

**Questions?** Check the troubleshooting section or review the specific component documentation linked above.
