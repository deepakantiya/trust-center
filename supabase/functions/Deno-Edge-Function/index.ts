// supabase/functions/Deno-Edge-Function/index.ts
// Edge Function using Supabase's built-in Magic Link authentication

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// CONFIGURATION
// ============================================================================

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SECRET_KEY =
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Public base URL of the Vercel frontend
const RAW_SITE_URL = Deno.env.get("SITE_BASE_URL") ?? "";
const SITE_BASE_URL = RAW_SITE_URL
  .replace(/^https?:\/\//i, "")
  .replace(/\/+$/, "");

// ============================================================================
// DOCUMENT CONFIGURATION
// ============================================================================

const DOC_LABELS: Record<string, string> = {
  soc2: "SOC 2 Type II Report",
  iso27001: "ISO 27001 Statement of Applicability",
  cmmc: "CMMC Assessment Summary (L1 / L2)",
  pentest: "Penetration Test Executive Summary",
  dpa: "Data Processing Agreement",
  questionnaire: "Security Questionnaire (CAIQ / SIG / VSAQ)",
};

// ============================================================================
// CORS & HELPERS
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// ============================================================================
// MAIN REQUEST HANDLER
// ============================================================================

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Parse request body
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

  // Validation
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

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return json({ error: "Invalid email format" }, 400);
  }

  // Create Supabase client with service role for database operations
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });

  // Insert document request (pending verification)
  const { data: row, error: dbError } = await supabaseAdmin
    .from("document_requests")
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company.trim(),
      docs: validDocs,
      nda_accepted: true,
      status: "pending_verification",
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("DB insert error:", dbError);
    return json({ error: "Failed to record request" }, 500);
  }

  // Send Magic Link using Supabase Auth
  const redirectUrl = SITE_BASE_URL
    ? `https://${SITE_BASE_URL}/verify.html?request_id=${row.id}`
    : `${SUPABASE_URL}/verify?request_id=${row.id}`;

  const { error: otpError } = await supabaseAdmin.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        name: name.trim(),
        company: company.trim(),
        request_id: row.id,
        docs: validDocs,
      },
      shouldCreateUser: true,
    },
  });

  if (otpError) {
    console.error("Magic link error:", otpError);
    await supabaseAdmin
      .from("document_requests")
      .update({ status: "email_failed" })
      .eq("id", row.id);
    
    return json({ 
      error: "Failed to send verification email. Please try again.",
      details: otpError.message 
    }, 500);
  }

  return json({
    success: true,
    message: "Please check your email to verify and access your documents.",
    email: email.trim().toLowerCase(),
    request_id: row.id,
  });
});
