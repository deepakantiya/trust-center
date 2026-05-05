import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_BASE_URL = (Deno.env.get("SITE_BASE_URL") ?? "").replace(/\/$/, "");
// Resend API key — set via: supabase secrets set RESEND_API_KEY=re_...
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
// From address — must be a verified sender in your Resend/SendGrid account
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "trust@yourdomain.com";

const DOC_LABELS: Record<string, string> = {
  soc2: "SOC 2 Type II Report",
  iso27001: "ISO 27001 Statement of Applicability",
  cmmc: "CMMC Assessment Summary (L1 / L2)",
  pentest: "Penetration Test Executive Summary",
  dpa: "Data Processing Agreement",
  questionnaire: "Security Questionnaire (CAIQ / SIG / VSAQ)",
};

const VALID_DOCS = new Set(Object.keys(DOC_LABELS));
const TOKEN_BYTES = 32;          // 256-bit token → 64-char hex
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;   // 7 days

// Generates a cryptographically random hex token.
async function generateToken(): Promise<{ raw: string; hash: string }> {
  const bytes = crypto.getRandomValues(new Uint8Array(TOKEN_BYTES));
  const raw = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  const hashBuf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hash = Array.from(new Uint8Array(hashBuf), (b) => b.toString(16).padStart(2, "0")).join("");
  return { raw, hash };
}

// Sends a retrieval email via Resend (swap for SendGrid / Postmark if preferred).
async function sendRetrievalEmail(
  to: string,
  name: string,
  company: string,
  docs: string[],
  retrieveUrl: string,
  expiresAt: string,
): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return;
  }

  const docList = docs
    .filter((d) => d in DOC_LABELS)
    .map((d) => `<li>${DOC_LABELS[d]}</li>`)
    .join("");

  const expiresDate = new Date(expiresAt).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px; color: #111827;">
  <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
    <h1 style="margin: 0; font-size: 22px; color: #1e40af;">Trust Center</h1>
    <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Security &amp; Compliance Documentation</p>
  </div>

  <p style="font-size: 16px;">Hi ${name},</p>
  <p>Thank you for requesting our compliance documentation. Your documents are ready for download.</p>

  <p style="font-weight: 600; margin-top: 24px;">Documents requested:</p>
  <ul style="color: #374151; line-height: 1.8;">${docList}</ul>

  <div style="margin: 32px 0; text-align: center;">
    <a href="${retrieveUrl}"
       style="background: #2563eb; color: #ffffff; padding: 14px 32px; border-radius: 8px;
              text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
      📥 Access My Documents
    </a>
  </div>

  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
    <p style="margin: 0; font-size: 14px; color: #92400e;">
      <strong>⏰ Link expires:</strong> ${expiresDate}<br>
      This link can be used up to 3 times. Do not share it with others.
    </p>
  </div>

  <p style="font-size: 14px; color: #6b7280;">
    By accessing these documents you confirm your acceptance of the Non-Disclosure Agreement
    you signed on behalf of <strong>${company}</strong>.
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
  <p style="font-size: 12px; color: #9ca3af; margin: 0;">
    If you did not request these documents, please ignore this email.
    Questions? Reply to this email.
  </p>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject: "Your Trust Center documents are ready",
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Email send failed (${res.status}): ${body}`);
  }
}

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
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { fullName, email, companyName, documents, ndaAccepted } = body as {
    fullName: string;
    email: string;
    companyName: string;
    documents: string[];
    ndaAccepted: boolean;
  };

  // Validate required fields
  if (!fullName?.trim() || !email?.trim() || !companyName?.trim()) {
    return json({ error: "fullName, email, and companyName are required" }, 400);
  }
  if (!ndaAccepted) {
    return json({ error: "NDA must be accepted before submitting" }, 400);
  }
  if (!Array.isArray(documents) || documents.length === 0) {
    return json({ error: "Select at least one document" }, 400);
  }

  const validDocs = documents.filter((d) => VALID_DOCS.has(d));
  if (validDocs.length === 0) {
    return json({ error: "No recognised document types selected" }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // 1. Store the document request
  const { data: record, error: insertError } = await supabase
    .from("document_requests")
    .insert({
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: companyName.trim(),
      docs: validDocs,
      nda_accepted: true,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertError || !record) {
    console.error("DB insert error:", insertError);
    return json({ error: "Failed to save your request. Please try again." }, 500);
  }

  // 2. Generate a secure token and store its hash
  const { raw: rawToken, hash: tokenHash } = await generateToken();
  const expiresAt = new Date(Date.now() + TOKEN_TTL_SECONDS * 1000).toISOString();

  const { error: tokenError } = await supabase.from("access_tokens").insert({
    token_hash: tokenHash,
    request_id: record.id,
    email: email.trim().toLowerCase(),
    expires_at: expiresAt,
    max_uses: 3,
  });

  if (tokenError) {
    console.error("Token insert error:", tokenError);
    // Still succeed — user can contact support if email doesn't arrive
  }

  // 3. Send retrieval email with the raw token embedded in the link
  const retrieveUrl = `${SITE_BASE_URL}/retrieve?token=${rawToken}`;
  try {
    await sendRetrievalEmail(
      email.trim().toLowerCase(),
      fullName.trim(),
      companyName.trim(),
      validDocs,
      retrieveUrl,
      expiresAt,
    );
  } catch (emailErr) {
    console.error("Email send error:", emailErr);
    // Non-fatal: request is saved; user can request resend later
  }

  // 4. Update status to 'completed' (request recorded, email dispatched)
  await supabase
    .from("document_requests")
    .update({ status: "completed" })
    .eq("id", record.id);

  return json({
    success: true,
    message: "Check your email for a secure link to access your documents.",
  });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
