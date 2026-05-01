import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// New: JWT Signing Keys (SUPABASE_SECRET_KEY). Falls back to the legacy
// SUPABASE_SERVICE_ROLE_KEY if a project hasn't migrated yet.
const SUPABASE_SECRET_KEY =
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "trust@yourcompany.com";
const COMPANY_NAME = Deno.env.get("COMPANY_NAME") ?? "[Company]";
const STORAGE_BUCKET = "audit-docs";

const DOC_LABELS: Record<string, string> = {
  soc2: "SOC 2 Type II Report",
  iso27001: "ISO 27001 Statement of Applicability",
  cmmc: "CMMC Assessment Summary (L1 / L2)",
  pentest: "Penetration Test Executive Summary",
  dpa: "Data Processing Agreement",
  questionnaire: "Security Questionnaire (CAIQ / SIG / VSAQ)",
};

const DOC_PATHS: Record<string, string> = {
  soc2: "https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/sign/audit-docs/soc2.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NGJkMjEyMy02NmIwLTRkNjctOTVhZi02YmE5Zjg1Mjc4NDkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdWRpdC1kb2NzL3NvYzIucGRmIiwiaWF0IjoxNzc3NjIyMzQyLCJleHAiOjE3ODAyMTQzNDJ9.XEAHH7q8Nc5Zil1uF6Xd-DQ6s2OOLADUqEku3x-TRuk",
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

  // Persist the request
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

  // Build signed download links (7-day expiry) for each requested PDF
  const docLinks: { label: string; url: string }[] = [];
  for (const docKey of validDocs) {
    const { data: signed, error: storageErr } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(DOC_PATHS[docKey], 7 * 24 * 60 * 60);
    if (!storageErr && signed?.signedUrl) {
      docLinks.push({ label: DOC_LABELS[docKey], url: signed.signedUrl });
    } else {
      // Still list the document even if we couldn't generate a link
      docLinks.push({ label: DOC_LABELS[docKey], url: "" });
    }
  }

  const emailSent = await sendEmail(name.trim(), email.trim(), docLinks);
  const status = emailSent ? "sent" : "failed";

  await supabase
    .from("document_requests")
    .update({ status })
    .eq("id", row.id);

  if (!emailSent) {
    // Request is logged; email failed — return success to client anyway so the
    // request isn't lost. Internal ops can re-send from the DB.
    console.error("Email send failed for request", row.id);
  }

  return json({ success: true });
});

// ── helpers ──────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

async function sendEmail(
  name: string,
  to: string,
  docLinks: { label: string; url: string }[],
): Promise<boolean> {
  const linksHtml = docLinks
    .map((l) =>
      l.url
        ? `<li style="margin-bottom:8px;"><a href="${l.url}" style="color:#1e40af;font-weight:600;">${l.label}</a> <span style="color:#94a3b8;font-size:12px;">(expires in 7 days)</span></li>`
        : `<li style="margin-bottom:8px;color:#475569;">${l.label} — link will follow within 2 business days</li>`
    )
    .join("\n");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f7f9fb;margin:0;padding:32px 16px;">
  <div style="max-width:580px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
    <div style="background:#1e40af;padding:28px 32px;">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${COMPANY_NAME} · Trust Center</h1>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 16px;font-size:18px;color:#0f172a;">Your document request is confirmed</h2>
      <p style="color:#475569;margin:0 0 8px;">Hi ${name},</p>
      <p style="color:#475569;margin:0 0 20px;">
        Thank you for accepting our Non-Disclosure Agreement. Your secure download links are ready:
      </p>
      <ul style="padding-left:20px;margin:0 0 24px;color:#0f172a;line-height:1.8;">
        ${linksHtml}
      </ul>
      <div style="background:#fef9c3;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#92400e;">
          <strong>Confidentiality reminder:</strong> These documents are protected by the NDA you accepted.
          Please do not forward or share them with third parties.
        </p>
      </div>
      <p style="color:#94a3b8;font-size:12px;margin:0;">
        If you have questions, reply to this email or contact
        <a href="mailto:${FROM_EMAIL}" style="color:#1e40af;">${FROM_EMAIL}</a>.
      </p>
    </div>
    <div style="background:#f7f9fb;border-top:1px solid #e2e8f0;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject: `Your ${COMPANY_NAME} Trust Center documents`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
  }
  return res.ok;
}
