import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { PDFDocument, rgb, StandardFonts, degrees } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// 7-day URL validity (in seconds)
const SIGNED_URL_TTL = 7 * 24 * 60 * 60;

const DOC_PATHS: Record<string, { name: string; path: string; icon: string }> = {
  soc2:          { name: "SOC 2 Type II Report",                        path: "soc2.pdf",          icon: "🔒" },
  iso27001:      { name: "ISO 27001 Statement of Applicability",        path: "iso27001.pdf",      icon: "📋" },
  cmmc:          { name: "CMMC Assessment Summary (L1 / L2)",           path: "cmmc.pdf",          icon: "🛡️" },
  pentest:       { name: "Penetration Test Executive Summary",          path: "pentest.pdf",       icon: "🔍" },
  dpa:           { name: "Data Processing Agreement",                   path: "dpa.pdf",           icon: "📜" },
  questionnaire: { name: "Security Questionnaire (CAIQ / SIG / VSAQ)", path: "questionnaire.pdf", icon: "📝" },
};

const VALID_DOCS = new Set(Object.keys(DOC_PATHS));

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    // Accept both camelCase and snake_case for resilience
    const fullName     = (body.fullName     ?? body.full_name     ?? "") as string;
    const email        = (body.email        ?? "") as string;
    const companyName  = (body.companyName  ?? body.company       ?? body.company_name ?? "") as string;
    const documents    = (body.documents    ?? []) as string[];
    const ndaAccepted  = Boolean(body.ndaAccepted ?? body.ndaAgreed ?? body.nda_accepted ?? body.nda_agreed);

    if (!fullName?.trim() || !email?.trim() || !companyName?.trim()) {
      return json({ error: "Full name, email, and company name are required." }, 400);
    }
    if (!ndaAccepted) {
      return json({ error: "You must accept the NDA before submitting." }, 400);
    }
    if (!Array.isArray(documents) || documents.length === 0) {
      return json({ error: "Please select at least one document." }, 400);
    }

    const validDocs = documents.filter((d) => VALID_DOCS.has(d));
    if (validDocs.length === 0) {
      return json({ error: "No recognised document types selected." }, 400);
    }

    console.log("Creating Supabase client...");
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    console.log("Supabase client created successfully");

    // 1. Record the request
    console.log("Inserting request into database...");
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
    console.log("Request inserted with ID:", record.id);

  // 2. Generate watermarked PDFs and 7-day signed URLs (in parallel)
  const safeCompany = companyName.trim().replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50);
  const timestamp = Date.now();
  const expiresAt = new Date(Date.now() + SIGNED_URL_TTL * 1000).toISOString();

  console.log("Starting PDF generation for request:", record.id);
  console.log("Documents to generate:", validDocs);

  const results = await Promise.allSettled(
    validDocs.map(async (key) => {
      const doc = DOC_PATHS[key];
      console.log(`[${key}] Starting generation from: ${doc.path}`);

      const { data: original, error: dlErr } = await supabase.storage
        .from("audit-docs")
        .download(doc.path);
      if (dlErr || !original) {
        const err = `[${key}] Download failed: ${doc.path} - ${dlErr?.message || 'No data returned'}`;
        console.error(err);
        throw new Error(err);
      }
      console.log(`[${key}] Downloaded, watermarking...`);

      const pdfBytes = new Uint8Array(await original.arrayBuffer());
      const watermarked = await watermarkPdf(pdfBytes, companyName.trim());
      console.log(`[${key}] Watermarked (${watermarked.length} bytes)`);

      const uploadPath = `watermarked/${safeCompany}/${timestamp}_${doc.path}`;
      console.log(`[${key}] Uploading to: ${uploadPath}`);
      const { error: upErr } = await supabase.storage
        .from("audit-docs")
        .upload(uploadPath, watermarked, { contentType: "application/pdf", upsert: true });
      if (upErr) {
        const err = `[${key}] Upload failed: ${uploadPath} - ${upErr?.message || 'Unknown error'}`;
        console.error(err);
        throw new Error(err);
      }
      console.log(`[${key}] Uploaded successfully`);

      console.log(`[${key}] Generating 7-day signed URL...`);
      const { data: signed, error: signErr } = await supabase.storage
        .from("audit-docs")
        .createSignedUrl(uploadPath, SIGNED_URL_TTL);
      if (signErr || !signed?.signedUrl) {
        const err = `[${key}] Signed URL failed: ${uploadPath} - ${signErr?.message || 'No signed URL returned'}`;
        console.error(err);
        throw new Error(err);
      }
      console.log(`[${key}] Generated signed URL (expires in ${SIGNED_URL_TTL} seconds)`);

      return { key, name: doc.name, icon: doc.icon, url: signed.signedUrl };
    }),
  );

  const documentsOut: { key: string; name: string; icon: string; url: string }[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log(`✓ ${result.value.key} - generated successfully`);
      documentsOut.push(result.value);
    } else {
      console.error(`✗ Document generation failed:`, result.reason);
    }
  }

  console.log(`PDF generation complete: ${documentsOut.length}/${validDocs.length} documents generated`);

  if (documentsOut.length === 0) {
    console.error("No documents generated. See errors above.");
    return json({ error: "Failed to generate documents. Please try again later." }, 500);
  }

  // 3. Persist the generated links and mark request completed
  await supabase
    .from("document_requests")
    .update({
      status: "completed",
      links: documentsOut,
    })
    .eq("id", record.id);

  return json({
    success: true,
    name: fullName.trim(),
    company: companyName.trim(),
    documents: documentsOut,
    expiresAt,
  });
  } catch (err) {
    console.error("Unhandled error:", err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    return json({ error: `Internal error: ${errorMsg}` }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
