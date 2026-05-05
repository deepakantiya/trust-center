// supabase/functions/request-documents/index.ts
// Consolidated Edge Function with Magic Link authentication + PDF Watermarking

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { PDFDocument, rgb, StandardFonts, degrees } from "https://esm.sh/pdf-lib@1.17.1"

// ============================================================================
// CONFIGURATION
// ============================================================================

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SECRET_KEY = 
  Deno.env.get("SUPABASE_SECRET_KEY") ?? 
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Public base URL of the Vercel frontend
const RAW_SITE_URL = Deno.env.get("SITE_BASE_URL") ?? "";
// Normalize: strip protocol and trailing slashes for clean URL construction
const SITE_BASE_URL = RAW_SITE_URL
  .replace(/^https?:\/\//i, "")
  .replace(/\/+$/, "");

const STORAGE_BUCKET = "audit-docs";
const LINK_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

// ============================================================================
// DOCUMENT CONFIGURATION
// ============================================================================

interface DocConfig {
  label: string;
  fileName: string;
}

const DOC_CONFIG: Record<string, DocConfig> = {
  soc2: { label: "SOC 2 Type II Report", fileName: "soc2.pdf" },
  iso27001: { label: "ISO 27001 Statement of Applicability", fileName: "iso27001.pdf" },
  cmmc: { label: "CMMC Assessment Summary (L1 / L2)", fileName: "cmmc.pdf" },
  pentest: { label: "Penetration Test Executive Summary", fileName: "pentest.pdf" },
  dpa: { label: "Data Processing Agreement", fileName: "dpa.pdf" },
  questionnaire: { label: "Security Questionnaire", fileName: "questionnaire.pdf" },
};

// ============================================================================
// CORS HEADERS
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// Sanitize company name for use in file paths
function sanitizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 50);
}

// Apply watermark to PDF
async function watermarkPdf(pdfBytes: Uint8Array, companyName: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  
  const watermarkText = `Confidential - Exclusively for ${companyName}`;
  const now = new Date().toISOString().split('T')[0];
  
  for (const page of pages) {
    const { width, height } = page.getSize();
    
    // Diagonal watermark across each page (semi-transparent)
    page.drawText(watermarkText, {
      x: width / 6,
      y: height / 2,
      size: 28,
      font: font,
      color: rgb(0.85, 0.85, 0.85),
      opacity: 0.35,
      rotate: degrees(-45),
    });
    
    // Footer watermark with company name and date
    const footerText = `Prepared exclusively for: ${companyName} | Generated: ${now}`;
    page.drawText(footerText, {
      x: 40,
      y: 25,
      size: 8,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    // Top right corner badge
    page.drawText('CONFIDENTIAL', {
      x: width - 120,
      y: height - 30,
      size: 10,
      font: boldFont,
      color: rgb(0.7, 0.3, 0.3),
      opacity: 0.6,
    });
  }
  
  return await pdfDoc.save();
}

// ============================================================================
// REQUEST VALIDATION
// ============================================================================

interface DocumentRequest {
  fullName?: string;
  full_name?: string;
  email?: string;
  company?: string;
  documents?: string[];
  ndaAgreed?: boolean;
  nda_agreed?: boolean;
}

function validateRequest(body: DocumentRequest): { valid: true; data: { fullName: string; email: string; company: string; documents: string[]; ndaAgreed: boolean } } | { valid: false; error: string } {
  // Accept both camelCase and snake_case
  const fullName = body.fullName ?? body.full_name;
  const ndaAgreed = body.ndaAgreed ?? body.nda_agreed;
  const { email, company, documents } = body;

  if (!fullName || typeof fullName !== "string") {
    return { valid: false, error: "Full name is required" };
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { valid: false, error: "Valid email is required" };
  }
  if (!company || typeof company !== "string") {
    return { valid: false, error: "Company name is required" };
  }
  if (!Array.isArray(documents) || documents.length === 0) {
    return { valid: false, error: "At least one document must be selected" };
  }
  if (ndaAgreed !== true) {
    return { valid: false, error: "NDA must be agreed to" };
  }

  // Filter to valid document keys
  const validDocs = documents.filter((d) => typeof d === "string" && DOC_CONFIG[d]);
  if (validDocs.length === 0) {
    return { valid: false, error: "No valid documents selected" };
  }

  return { valid: true, data: { fullName, email, company, documents: validDocs, ndaAgreed } };
}

// ============================================================================
// MAIN HANDLER
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
  let body: DocumentRequest;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // Validate request
  const validation = validateRequest(body);
  if (!validation.valid) {
    return json({ error: validation.error }, 400);
  }

  const { fullName, email, company, documents, ndaAgreed } = validation.data;

  // Initialize Supabase client with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });

  try {
    // Create document request record (pending verification)
    const { data: requestRow, error: insertError } = await supabase
      .from("document_requests")
      .insert({
        full_name: fullName,
        email,
        company,
        documents,
        nda_agreed: ndaAgreed,
        status: "pending_verification",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return json({ error: "Failed to create document request" }, 500);
    }

    const requestId = requestRow.id;

    // Send magic link email using Supabase Auth
    const redirectUrl = SITE_BASE_URL 
      ? `https://${SITE_BASE_URL}/verify.html?request_id=${requestId}`
      : `${SUPABASE_URL}/verify.html?request_id=${requestId}`;

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          request_id: requestId,
          company_name: company,
          documents: documents,
        },
      },
    });

    if (otpError) {
      console.error("OTP error:", otpError);
      // Still return success - request was created, just email failed
      // User can be notified to check spam or contact support
      return json({
        success: true,
        message: "Request created. Please check your email (including spam folder) for the verification link.",
        request_id: requestId,
      });
    }

    return json({
      success: true,
      message: "Please check your email to verify and access your documents.",
      request_id: requestId,
      documents_requested: documents.map(d => DOC_CONFIG[d]?.label || d),
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});