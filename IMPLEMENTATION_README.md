# Short URL Implementation for Trust Center

This implementation adds clean, short download URLs to replace long Supabase signed URLs.

## Before
```
https://jdagfmqrlxhiolldecxq.supabase.co/storage/v1/object/sign/audit-docs/soc2.pdf?token=eyJhbGci...&t=2026-05-08T...
```

## After
```
https://your-trust-center.vercel.app/api/d/abc123-uuid/soc2
```

---

## Files to Add/Update

### 1. NEW: `api/d/[requestId]/[docKey].js`

**Purpose:** Vercel serverless function that handles short URL redirects.

**How it works:**
- Receives request like `/api/d/{requestId}/{docKey}`
- Looks up the actual signed URL from the `document_requests` table
- Redirects (302) to the real Supabase signed URL
- Validates request ID format and document key
- Checks for link expiration

**Location:** Create the file at `api/d/[requestId]/[docKey].js`

### 2. UPDATED: `supabase/functions/Deno-Edge-Function/index.ts`

**Changes:**
- Added `TRUST_CENTER_DOMAIN` environment variable
- Returns short URLs (`/api/d/{requestId}/{docKey}`) to the browser
- Still stores the actual signed URLs in the database for redirect lookup

### 3. Environment Variables (Vercel Dashboard)

Add these to your Vercel project settings:

```
SUPABASE_URL=https://jdagfmqrlxhiolldecxq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### 4. Environment Variables (Supabase Edge Functions)

Add this to your Supabase Edge Function secrets:

```
TRUST_CENTER_DOMAIN=your-trust-center.vercel.app
```

---

## Deployment Steps

1. **Add the Vercel API route:**
   ```bash
   mkdir -p api/d/\[requestId\]
   cp api_download_handler.js api/d/\[requestId\]/\[docKey\].js
   ```

2. **Update the Edge Function:**
   - Replace `supabase/functions/Deno-Edge-Function/index.ts` with the updated version
   - Set the `TRUST_CENTER_DOMAIN` secret in Supabase

3. **Add environment variables to Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

4. **Deploy:**
   ```bash
   git add .
   git commit -m "feat: Add short URL redirects for document downloads"
   git push
   ```

5. **Redeploy Supabase Edge Function:**
   ```bash
   supabase functions deploy Deno-Edge-Function
   ```

---

## How It Works (Diagram)

```
┌─────────────┐    POST /functions/v1/Deno-Edge-Function
│   Browser   │ ──────────────────────────────────────────►
│  (User)     │
│             │    { success: true, links: [
│             │ ◄──  { url: "/api/d/abc123/soc2", ... }
│             │    ]}
│             │
│             │    GET /api/d/abc123/soc2
│             │ ──────────────────────────────────────────►
│             │
│             │    302 Redirect to actual Supabase signed URL
│             │ ◄──────────────────────────────────────────
│             │
│             │    GET https://...supabase.co/.../soc2.pdf?token=...
│             │ ──────────────────────────────────────────►
│             │
│             │    PDF File Downloaded
└─────────────┘ ◄──────────────────────────────────────────
```

---

## Security Considerations

✅ **Request ID validation** - Only valid UUIDs are accepted
✅ **Document key validation** - Only known document types are allowed  
✅ **Expiration checking** - Expired links return 410 Gone
✅ **No URL exposure** - The actual signed URL is never visible in the browser
✅ **Service role key** - Only server-side code can access the redirect endpoint's DB lookup

---

## Optional Enhancements

1. **Add download analytics:**
   ```javascript
   // In the redirect handler, before redirecting:
   await supabase.from('download_logs').insert({
     request_id: requestId,
     doc_key: docKey,
     downloaded_at: new Date().toISOString(),
     user_agent: req.headers['user-agent']
   });
   ```

2. **Rate limiting:**
   - Add rate limiting to prevent abuse
   - Consider using Vercel's Edge Config or a Redis-based limiter

3. **Shorter URLs with tokens:**
   - Instead of exposing the UUID, generate a short random token
   - Store mapping: `short_token -> { request_id, doc_key }`
   - URLs become: `/api/d/Xk9mP2` (even shorter!)
