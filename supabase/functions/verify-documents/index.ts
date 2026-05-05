// supabase/functions/verify-documents/index.ts
// Verification endpoint that generates watermarked PDFs after magic link verification

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
  let body: { request_id?: string; access_token?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { request_id, access_token } = body;

  if (!request_id) {
    return json({ error: "request_id is required" }, 400);
  }

  if (!access_token) {
    return json({ error: "access_token is required" }, 400);
  }

  // Initialize Supabase client with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false },
  });

  try {
    // Verify the access token
    const { data: userData, error: authError } = await supabase.auth.getUser(access_token);
    
    if (authError || !userData?.user) {
      return json({ error: "Invalid or expired access token" }, 401);
    }

    const userEmail = userData.user.email;

    // Fetch the document request
    const { data: requestData, error: fetchError } = await supabase
      .from("document_requests")
      .select("*")
      .eq("id", request_id)
      .single();

    if (fetchError || !requestData) {
      return json({ error: "Document request not found" }, 404);
    }

    // Verify email matches
    if (requestData.email !== userEmail) {
      return json({ error: "Email mismatch - unauthorized" }, 403);
    }

    // Check if already verified and has links
    if (requestData.status === "verified" && requestData.links) {
      return json({
        success: true,
        message: "Documents already generated",
        links: requestData.links,
      });
    }

    // Generate watermarked PDFs and signed URLs
    const company = requestData.company;
    const documents = requestData.documents || [];
    const sanitizedCompany = sanitizeCompanyName(company);
    const timestamp = Date.now();
    const links: Array<{ key: string; label: string; url: string }> = [];

    for (const docKey of documents) {
      const config = DOC_CONFIG[docKey];
      if (!config) continue;

      // Download original PDF
      const { data: fileData, error: downloadError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .download(config.fileName);

      if (downloadError || !fileData) {
        console.error(`Failed to download ${config.fileName}:`, downloadError);
        continue;
      }

      // Apply watermark
      const originalBytes = new Uint8Array(await fileData.arrayBuffer());
      const watermarkedBytes = await watermarkPdf(originalBytes, company);

      // Upload watermarked PDF
      const watermarkedPath = `watermarked/${sanitizedCompany}/${timestamp}_${config.fileName}`;
      const { error: uploadError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .upload(watermarkedPath, watermarkedBytes, {
          contentType: 'application/pdf',
          upsert: true,
        });

      if (uploadError) {
        console.error(`Failed to upload watermarked ${config.fileName}:`, uploadError);
        continue;
      }

      // Generate signed URL for watermarked PDF
      const { data: signedData, error: signError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(watermarkedPath, LINK_TTL_SECONDS);

      if (signError || !signedData?.signedUrl) {
        console.error(`Failed to create signed URL for ${config.fileName}:`, signError);
        continue;
      }

      links.push({
        key: docKey,
        label: config.label,
        url: signedData.signedUrl,
      });
    }

    if (links.length === 0) {
      return json({ error: "Failed to generate any document links" }, 500);
    }

    // Update request with links and verified status
    const { error: updateError } = await supabase
      .from("document_requests")
      .update({
        status: "verified",
        verified_at: new Date().toISOString(),
        auth_user_id: userData.user.id,
        links: links,
      })
      .eq("id", request_id);

    if (updateError) {
      console.error("Failed to update request:", updateError);
      // Still return links even if update fails
    }

    return json({
      success: true,
      message: "Documents verified and ready for download",
      company: company,
      links: links,
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Internal server error" }, 500);
  }
});