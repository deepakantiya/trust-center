# Trust Center Deployment Checklist

Use this checklist to track your deployment progress.

---

## Phase 1: Supabase Setup (15 min)

### Create Project
- [ ] Go to https://app.supabase.com
- [ ] Click "New project"
- [ ] Enter project name: `trust-center`
- [ ] Choose region closest to users
- [ ] Save database password securely
- [ ] Wait for initialization (2-3 min)

### Get Credentials
- [ ] Go to Settings → API
- [ ] Copy `SUPABASE_URL` (https://YOUR_REF.supabase.co)
- [ ] Copy `SUPABASE_ANON_KEY` (starts with sb_anon_)
- [ ] Copy `SUPABASE_SERVICE_ROLE_KEY` (starts with eyJ...)
- [ ] Go to Settings → API → JWT Signing Keys
- [ ] Copy `SUPABASE_SECRET_KEY` (signing secret)
- [ ] Save all credentials in a secure password manager

### Create Storage Bucket
- [ ] Go to Storage → Buckets
- [ ] Click "New bucket"
- [ ] Name: `audit-docs`
- [ ] Access level: **PRIVATE**
- [ ] Click "Create bucket"

### Upload PDFs
- [ ] Upload `soc2.pdf` to `audit-docs/soc2.pdf`
- [ ] Upload `iso27001.pdf` to `audit-docs/iso27001.pdf`
- [ ] Upload `cmmc.pdf` to `audit-docs/cmmc.pdf`
- [ ] Upload `pentest.pdf` to `audit-docs/pentest.pdf`
- [ ] Upload `dpa.pdf` to `audit-docs/dpa.pdf`
- [ ] Upload `questionnaire.pdf` to `audit-docs/questionnaire.pdf`

### Create Database Tables (using SQL migrations)
```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```
- [ ] Migration `20260501000000_document_requests.sql` applied
- [ ] Migration `20260501000001_document_requests_add_links.sql` applied
- [ ] Migration `20260502000000_short_urls.sql` applied

**Verify in SQL Editor:**
```sql
SELECT * FROM document_requests LIMIT 1;
SELECT * FROM short_urls LIMIT 1;
```
- [ ] No errors, tables exist

---

## Phase 2: Supabase Edge Functions (20 min)

### Deploy Functions
```bash
supabase functions deploy Deno-Edge-Function --no-verify-jwt
supabase functions deploy request-documents --no-verify-jwt
supabase functions deploy request-docs --no-verify-jwt
```
- [ ] `Deno-Edge-Function` deployed ✓
- [ ] `request-documents` deployed ✓
- [ ] `request-docs` deployed ✓

### Set Secrets
```bash
supabase secrets set SUPABASE_SECRET_KEY=sb_secret_...
supabase secrets set SITE_BASE_URL=https://your-project.vercel.app
```
- [ ] `SUPABASE_SECRET_KEY` set
- [ ] `SITE_BASE_URL` set (update after Vercel domain ready)

### Disable JWT Verification
For each function (Deno-Edge-Function, request-documents, request-docs):
- Go to **Edge Functions → [Function] → Configuration**
- [ ] Toggle "Enforce JWT Verification" → **OFF**
- [ ] Click Save

### Test Function
```bash
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "docs": ["soc2"],
    "nda_accepted": true
  }'
```
- [ ] Returns success response with links

---

## Phase 3: Vercel Setup (15 min)

### Create Vercel Project
- [ ] Go to https://vercel.com
- [ ] Click "Add New → Project"
- [ ] Select `trust-center` repository from GitHub
- [ ] Click "Import"

### Configure Project
- [ ] Root Directory: Leave blank (auto-detect)
- [ ] Framework: Leave as "Other" / auto-detect
- [ ] Build Command: Leave empty
- [ ] Output Directory: Leave blank
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete

### Verify Initial Deployment
- [ ] Check Vercel Dashboard for success ✓
- [ ] Visit your Vercel URL (shows in dashboard)
- [ ] Website loads with "Trust Center" title
- [ ] See "Request Audit Reports" section

---

## Phase 4: Environment Variables (10 min)

### Set Vercel Environment Variables
Go to **Vercel Dashboard → Project Settings → Environment Variables**

For **Production** environment:
- [ ] `SUPABASE_URL` = `https://YOUR_PROJECT_REF.supabase.co`
- [ ] `SUPABASE_SECRET_KEY` = `sb_secret_...` (JWT Signing Secret)
- [ ] `SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_...`
- [ ] `EDGE_FUNCTION_URL` = `https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function`
- [ ] `SITE_BASE_URL` = `https://your-project.vercel.app`

For **Preview** environment (optional but recommended):
- [ ] Copy same variables from Production
- [ ] Or use Supabase preview branch if enabled

### Trigger Redeploy
- [ ] Go to **Deployments**
- [ ] Click on latest deployment
- [ ] Click "Redeploy"
- [ ] Wait for completion

---

## Phase 5: Integration Test (10 min)

### Test Static Files
```bash
curl https://your-vercel-url | grep "Trust Center"
curl https://your-vercel-url/css/styles.css | head -5
curl https://your-vercel-url/js/site.js | head -5
```
- [ ] HTML loads ✓
- [ ] CSS loads ✓
- [ ] JavaScript loads ✓

### Test API Endpoints
```bash
# Config endpoint
curl https://your-vercel-url/api/config
```
- [ ] Returns `window.ENV = { ... };` ✓

### Test Form Submission
1. [ ] Open browser and go to your Vercel URL
2. [ ] Scroll to "Request Audit Reports" section
3. [ ] Fill form:
   - [ ] Full Name: `Test User`
   - [ ] Email: `test@example.com`
   - [ ] Company: `Test Corp`
   - [ ] Select "SOC 2 Type II Report"
   - [ ] Check NDA acceptance box
4. [ ] Click "Submit Request"
5. [ ] Verify:
   - [ ] Form disappears
   - [ ] Success message shows
   - [ ] Download links appear
   - [ ] Can click to download PDF

### Test Database
In Supabase SQL Editor:
```sql
SELECT * FROM document_requests ORDER BY created_at DESC LIMIT 1;
```
- [ ] Record exists with test data ✓

---

## Phase 6: Security & Production (5 min)

### Security Checks
- [ ] `vercel.json` has CSP headers configured
- [ ] Environment variables NOT in source code (.env.example only)
- [ ] `SUPABASE_SECRET_KEY` only in Vercel/edge function secrets
- [ ] Database RLS policies in place (view in SQL Editor)
- [ ] Storage bucket is PRIVATE (not public)
- [ ] Edge functions have JWT verification disabled

### Git Configuration
- [ ] Update `.env.example` with safe values
- [ ] Never commit actual credentials
- [ ] `.gitignore` includes `.env` and `.env.local`

### Production Deploy
```bash
git add .
git commit -m "chore: Configure Supabase and Vercel"
git push origin main
```
- [ ] Changes pushed to main
- [ ] Vercel auto-redeploys
- [ ] No errors in deployment
- [ ] Form works on production URL

---

## Phase 7: Monitoring & Maintenance

### Daily Monitoring
- [ ] Check Vercel deployment status
- [ ] Monitor edge function errors (logs in Supabase)
- [ ] Check database for form submissions

### Weekly Tasks
- [ ] Review form submission counts
- [ ] Check for any error patterns
- [ ] Monitor storage usage

### Monthly Tasks
- [ ] Update PDFs if needed
- [ ] Review security logs
- [ ] Update dependencies (GitHub Dependabot)

---

## Rollback Plan

If something breaks, here's how to rollback:

### Quick Rollback (Vercel)
1. Go to **Vercel Dashboard → Deployments**
2. Find the last successful deployment
3. Click "..." → "Promote to Production"
4. Confirm

### Full Rollback (Supabase)
1. If edge function broken:
   ```bash
   supabase functions deploy Deno-Edge-Function --no-verify-jwt
   ```
2. If database corrupted:
   - Go to **Settings → Backups** in Supabase
   - Restore from last good backup
   - Re-apply any needed migrations

### Emergency Contact
- Check Vercel status page: https://status.vercel.com
- Check Supabase status page: https://status.supabase.com

---

## Contact & Support

- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **GitHub**: Open an issue in your repository
- **Local Help**: See `DEPLOYMENT_GUIDE.md` troubleshooting section

---

## Completion Checklist

- [ ] All phases completed
- [ ] Production URL working
- [ ] Form submissions recorded in database
- [ ] PDFs download successfully
- [ ] No errors in logs
- [ ] Security checks passed
- [ ] Team trained on deployment process
- [ ] Documentation updated

**Date Completed**: _______________

**Deployed By**: _______________

**Notes**: _______________________________________________

---

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **Your Vercel URL**: https://your-project.vercel.app
- **Your Edge Function**: https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function
- **GitHub Repository**: https://github.com/YOUR_ORG/trust-center
