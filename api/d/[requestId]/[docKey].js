// api/d/[requestId]/[docKey].js
// Vercel serverless function - Short URL redirect handler for Trust Center document downloads
// 
// Short URL format: /api/d/{requestId}/{docKey}
// Example: /api/d/abc123-uuid/soc2 → redirects to the actual Supabase signed URL
//
// This keeps browser URLs clean while the actual signed URL stays hidden.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { requestId, docKey } = req.query;

  // Validate parameters
  if (!requestId || !docKey) {
    return res.status(400).json({ error: 'Missing requestId or docKey' });
  }

  // Validate UUID format for requestId (basic check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(requestId)) {
    return res.status(400).json({ error: 'Invalid request ID format' });
  }

  // Validate docKey against known document types
  const validDocKeys = ['soc2', 'iso27001', 'cmmc', 'pentest', 'dpa', 'questionnaire'];
  if (!validDocKeys.includes(docKey)) {
    return res.status(400).json({ error: 'Invalid document key' });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch the document request and its links
    const { data: request, error: dbError } = await supabase
      .from('document_requests')
      .select('links, status')
      .eq('id', requestId)
      .single();

    if (dbError || !request) {
      console.error('DB lookup error:', dbError);
      return res.status(404).json({ error: 'Document request not found' });
    }

    if (request.status !== 'completed') {
      return res.status(400).json({ error: 'Document request not ready' });
    }

    // Find the specific document link
    const links = request.links || [];
    const docLink = links.find(l => l.key === docKey);

    if (!docLink || !docLink.url) {
      return res.status(404).json({ error: 'Document link not found' });
    }

    // Check if link has expired
    if (docLink.expires_at) {
      const expiresAt = new Date(docLink.expires_at);
      if (expiresAt < new Date()) {
        return res.status(410).json({ error: 'Download link has expired' });
      }
    }

    // Redirect to the actual signed URL
    // Using 302 (temporary redirect) so the browser doesn't cache the redirect
    res.redirect(302, docLink.url);

  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
