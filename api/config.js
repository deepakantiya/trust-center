// Vercel serverless function — serves runtime config as a JS file.
// The browser loads this as <script src="/api/config"></script>, which sets
// window.ENV before site.js runs. Sensitive values stay in Vercel's
// Environment Variables and never touch git.
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  // No caching — always reflect the current env vars.
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const env = {
    EDGE_FUNCTION_URL:        process.env.EDGE_FUNCTION_URL        ?? '',
    SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY ?? '',
  };

  // JSON.stringify escapes all values safely — no injection risk.
  res.send(`window.ENV = ${JSON.stringify(env)};`);
}
