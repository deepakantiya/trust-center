import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// Supports both new JWT Signing Key (SUPABASE_SECRET_KEY) and legacy service role key.
const SUPABASE_SECRET_KEY =
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Public base URL of the Vercel frontend (e.g. https://trust-center.example.com).
// Falls back to the Supabase URL origin so local dev still works.
const SITE_BASE_URL = (Deno.env.get("SITE_BASE_URL") ?? "").replace(/\/$/, "");

const STORAGE_BUCKET = "audit-docs";
const LINK_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

const DOC_LABELS: Record<string, string> = {
  soc2: "SOC 2 Type II Report",
  iso27001: "ISO 27001 Statement of Applicability",
  cmmc: "CMMC Assessment Summary (L1 / L2)",
  pentest: "Penetration Test Executive Summary",
  dpa: "Data Processing Agreement",
  questionnaire: "Security Questionnaire (CAIQ / SIG / VSAQ)",
};

const DOC_PATHS: Record<string, string> = {
  soc2: "soc2.pdf",
  iso27001: "iso27001.pdf",
  cmmc: "cmmc.pdf",
  pentest: "pentest.pdf",
  dpa: "dpa.pdf",
  questionnaire: "questionnaire.pdf",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Generates a cryptographically random 8-character alphanumeric code.
function shortCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { name, email, company, docs, nda_accepted } = body as {
    name: string;
    email: string;
    company: string;
    docs: string[];
    nda_accepted: boolean;
  };

  if (!name?.trim() || !email?.trim() || !company?.trim()) {
    return json({ error: "name, email, and company are required" }, 400);
  }
  if (!nda_accepted) {
    return json({ error: "NDA must be accepted before submitting" }, 400);
  }
  if (!Array.isArray(docs) || docs.length === 0) {
    return json({ error: "Select at least one document" }, 400);
  }

  const validDocs = docs.filter((d) => d in DOC_LABELS);
  if (validDocs.length === 0) {
    return json({ error: "No recognised document types selected" }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY);

  // ── Insert request row ────────────────────────────────────────────────────
  const { data: row, error: dbError } = await supabase
    .from("document_requests")
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      docs: validDocs,
      nda_accepted: true,
      status: "pending",
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("DB insert error:", dbError);
    return json({ error: "Failed to record request" }, 500);
  }

  // ── Generate signed URLs and short codes ──────────────────────────────────
  const expiresAt = new Date(Date.now() + LINK_TTL_SECONDS * 1000).toISOString();
  const links: { key: string; label: string; url: string; expires_at: string }[] = [];
  const shortRows: { code: string; request_id: string; doc_key: string; full_url: string; expires_at: string }[] = [];

  for (const key of validDocs) {
    const { data: signed, error: storageErr } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(DOC_PATHS[key], LINK_TTL_SECONDS);

    if (storageErr || !signed?.signedUrl) {
      console.error(`Signed URL error for ${key}:`, storageErr);
      links.push({ key, label: DOC_LABELS[key], url: "", expires_at: expiresAt });
    } else {
      const code = shortCode();
      shortRows.push({
        code,
        request_id: row.id,
        doc_key: key,
        full_url: signed.signedUrl,
        expires_at: expiresAt,
      });
      const shortUrl = SITE_BASE_URL
        ? `${SITE_BASE_URL}/r/${code}`
        : signed.signedUrl;
      links.push({ key, label: DOC_LABELS[key], url: shortUrl, expires_at: expiresAt });
    }
  }

  // ── Persist short URL mappings ────────────────────────────────────────────
  if (shortRows.length > 0) {
    const { error: shortErr } = await supabase.from("short_urls").insert(shortRows);
    if (shortErr) {
      console.error("short_urls insert error:", shortErr);
    }
  }

  // ── Persist links and mark completed ─────────────────────────────────────
  const allGenerated = links.every((l) => l.url !== "");
  await supabase
    .from("document_requests")
    .update({ links, status: allGenerated ? "completed" : "failed" })
    .eq("id", row.id);

  if (!allGenerated) {
    console.error("One or more signed URLs could not be generated for request", row.id);
  }

  // Return the links directly to the browser — no email needed.
  return json({ success: true, links });
});

// ── helper ───────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
