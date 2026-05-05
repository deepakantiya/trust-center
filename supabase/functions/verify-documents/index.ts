import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, rgb, StandardFonts, degrees } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SIGNED_URL_TTL = 60 * 60; // 1-hour signed URLs (short-lived; token is the durable gate)

// SHA-256 the incoming raw token to look up the stored hash.
async function hashToken(raw: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Apply company watermark to every page of a PDF.
async function watermarkPdf(pdfBytes: Uint8Array, company: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const date = new Date().toISOString().split("T")[0];

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();

    page.drawText(`Confidential – Exclusively for ${company}`, {
      x: width / 6, y: height / 2,
      size: 28, font,
      color: rgb(0.85, 0.85, 0.85), opacity: 0.35,
      rotate: degrees(-45),
    });
    page.drawText(`Prepared exclusively for: ${company} | ${date}`, {
      x: 40, y: 25, size: 8, font, color: rgb(0.5, 0.5, 0.5),
    });
    page.drawText("CONFIDENTIAL", {
      x: width - 120, y: height - 30, size: 10, font: bold,
      color: rgb(0.7, 0.3, 0.3), opacity: 0.6,
    });
  }

  return await pdfDoc.save();
}

const DOC_PATHS: Record<string, { name: string; path: string; icon: string }> = {
  soc2:          { name: "SOC 2 Type II Report",                        path: "soc2.pdf",          icon: "🔒" },
  iso27001:      { name: "ISO 27001 Statement of Applicability",        path: "iso27001.pdf",      icon: "📋" },
  cmmc:          { name: "CMMC Assessment Summary (L1 / L2)",           path: "cmmc.pdf",          icon: "🛡️" },
  pentest:       { name: "Penetration Test Executive Summary",          path: "pentest.pdf",       icon: "🔍" },
  dpa:           { name: "Data Processing Agreement",                   path: "dpa.pdf",           icon: "📜" },
  questionnaire: { name: "Security Questionnaire (CAIQ / SIG / VSAQ)", path: "questionnaire.pdf", icon: "📝" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const { token } = body as { token: string };

  if (!token || typeof token !== "string" || token.length !== 64) {
    return json({ error: "Invalid or missing token" }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const tokenHash = await hashToken(token);

  // 1. Look up the token
  const { data: tokenRow, error: tokenErr } = await supabase
    .from("access_tokens")
    .select("id, request_id, email, expires_at, used_at, use_count, max_uses, revoked")
    .eq("token_hash", tokenHash)
    .single();

  if (tokenErr || !tokenRow) {
    return json({ error: "Invalid link. Please request new documents." }, 404);
  }

  // 2. Validate the token state
  if (tokenRow.revoked) {
    return json({ error: "This link has been revoked. Please contact support." }, 410);
  }
  if (new Date(tokenRow.expires_at) < new Date()) {
    return json({ error: "This link has expired. Please submit a new request." }, 410);
  }
  if (tokenRow.use_count >= tokenRow.max_uses) {
    return json({ error: "This link has reached its maximum number of uses." }, 410);
  }

  // 3. Fetch the linked document request
  const { data: docRequest, error: reqErr } = await supabase
    .from("document_requests")
    .select("id, name, company, docs")
    .eq("id", tokenRow.request_id)
    .single();

  if (reqErr || !docRequest) {
    console.error("Request lookup error:", reqErr);
    return json({ error: "Document request not found." }, 404);
  }

  // 4. Record token usage (increment use_count, set used_at on first use)
  await supabase
    .from("access_tokens")
    .update({
      use_count: tokenRow.use_count + 1,
      used_at: tokenRow.used_at ?? new Date().toISOString(),
    })
    .eq("id", tokenRow.id);

  // 5. Generate fresh watermarked PDFs and short-lived signed URLs
  const documents: { key: string; name: string; icon: string; url: string }[] = [];
  const safeCompany = docRequest.company.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
  const timestamp = Date.now();

  const results = await Promise.allSettled(
    (docRequest.docs as string[])
      .filter((d) => d in DOC_PATHS)
      .map(async (key) => {
        const doc = DOC_PATHS[key];

        // Download original
        const { data: original, error: dlErr } = await supabase.storage
          .from("audit-docs")
          .download(doc.path);
        if (dlErr || !original) throw new Error(`Download failed: ${doc.path}`);

        // Watermark
        const pdfBytes = new Uint8Array(await original.arrayBuffer());
        const watermarked = await watermarkPdf(pdfBytes, docRequest.company);

        // Upload watermarked copy
        const uploadPath = `watermarked/${safeCompany}/${timestamp}_${doc.path}`;
        const { error: upErr } = await supabase.storage
          .from("audit-docs")
          .upload(uploadPath, watermarked, { contentType: "application/pdf", upsert: true });
        if (upErr) throw new Error(`Upload failed: ${uploadPath}`);

        // Create signed URL (1-hour; token gate provides the durable expiry)
        const { data: signed, error: signErr } = await supabase.storage
          .from("audit-docs")
          .createSignedUrl(uploadPath, SIGNED_URL_TTL);
        if (signErr || !signed?.signedUrl) throw new Error(`Signed URL failed: ${uploadPath}`);

        return { key, name: doc.name, icon: doc.icon, url: signed.signedUrl };
      }),
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      documents.push(result.value);
    } else {
      console.error("Document generation error:", result.reason);
    }
  }

  if (documents.length === 0) {
    return json({ error: "Failed to generate documents. Please try again later." }, 500);
  }

  return json({
    success: true,
    name: docRequest.name,
    company: docRequest.company,
    documents,
    usesRemaining: tokenRow.max_uses - (tokenRow.use_count + 1),
  });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
