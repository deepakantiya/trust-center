// Vercel serverless function — resolves a short code to a Supabase signed URL
// and issues a temporary redirect. The real URL never appears in the browser.
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const code = req.query.code;

  if (!code || !/^[a-z0-9]{8}$/.test(code)) {
    return res.status(400).send("Invalid link.");
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  );

  const { data, error } = await supabase
    .from("short_urls")
    .select("full_url, expires_at")
    .eq("code", code)
    .single();

  if (error || !data) {
    return res.status(404).send("Link not found.");
  }

  if (new Date(data.expires_at) < new Date()) {
    return res.status(410).send("This link has expired.");
  }

  // 302 so browsers don't cache the redirect (the underlying signed URL rotates).
  res.setHeader("Cache-Control", "no-store");
  res.redirect(302, data.full_url);
}
