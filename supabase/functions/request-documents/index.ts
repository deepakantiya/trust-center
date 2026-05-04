import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { PDFDocument, rgb, StandardFonts, degrees } from "https://esm.sh/pdf-lib@1.17.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Check for empty body first
    const contentLength = req.headers.get('content-length');
    if (req.method === 'POST' && (!contentLength || contentLength === '0')) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Request body is empty. Please provide form data.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle non-POST methods
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Method not allowed. Use POST.' 
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse JSON body with error handling
    let body;
    try {
      const text = await req.text();
      console.log('Received request body:', text);
      body = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid JSON in request body. Please check your request format.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { fullName, email, companyName, documents, ndaAccepted } = body;

    // Validation
    const missingFields = [];
    if (!fullName) missingFields.push('fullName');
    if (!email) missingFields.push('email');
    if (!companyName) missingFields.push('companyName');
    if (!documents || !documents.length) missingFields.push('documents');
    if (!ndaAccepted) missingFields.push('ndaAccepted');

    if (missingFields.length > 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check for Supabase environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Server configuration error. Please contact support.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert request record
    const { data: requestRecord, error: insertError } = await supabase
      .from('document_requests')
      .insert({
        full_name: fullName,
        email: email,
        company_name: companyName,
        nda_accepted: true,
        nda_accepted_at: new Date().toISOString(),
        documents_requested: documents
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to save your request. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Document mapping
    const documentPaths: Record<string, { name: string, path: string, icon: string }> = {
      soc2: { name: 'SOC 2 Type II Report', path: 'soc2.pdf', icon: '🔒' },
      iso27001: { name: 'ISO 27001 Certificate', path: 'iso27001.pdf', icon: '📋' },
      pentest: { name: 'Penetration Test Summary', path: 'pentest.pdf', icon: '🔍' },
      cmmc: { name: 'CMMC Assessment', path: 'cmmc.pdf', icon: '🛡️' },
      dpa: { name: 'Data Processing Agreement', path: 'dpa.pdf', icon: '📜' },
      questionnaire: { name: 'Security Questionnaire', path: 'questionnaire.pdf', icon: '📝' }
    };

    // Generate signed URLs (7 days expiry)
    const expiresIn = 7 * 24 * 60 * 60; // 604800 seconds
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const generatedUrls = [];
    
    // Sanitize company name for filename
    const safeCompanyName = companyName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
    const timestamp = Date.now();

    for (const docKey of documents) {
      const doc = documentPaths[docKey];
      if (!doc) continue;

      try {
        // 1. Download the original PDF from storage
        const { data: originalPdf, error: downloadError } = await supabase
          .storage
          .from('audit-docs')
          .download(doc.path);

        if (downloadError || !originalPdf) {
          console.error(`Failed to download ${doc.path}:`, downloadError);
          continue;
        }

        // 2. Apply watermark
        const pdfBytes = new Uint8Array(await originalPdf.arrayBuffer());
        const watermarkedPdf = await watermarkPdf(pdfBytes, companyName);

        // 3. Upload watermarked PDF to temporary folder
        const watermarkedPath = `watermarked/${safeCompanyName}/${timestamp}_${doc.path}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('audit-docs')
          .upload(watermarkedPath, watermarkedPdf, {
            contentType: 'application/pdf',
            upsert: true
          });

        if (uploadError) {
          console.error(`Failed to upload watermarked ${doc.path}:`, uploadError);
          continue;
        }

        // 4. Generate signed URL for the watermarked PDF
        const { data: signedUrlData, error: signedUrlError } = await supabase
          .storage
          .from('audit-docs')
          .createSignedUrl(watermarkedPath, expiresIn);

        if (signedUrlError || !signedUrlData?.signedUrl) {
          console.error(`Failed to create signed URL for ${watermarkedPath}:`, signedUrlError);
          continue;
        }

        // 5. Store download record
        await supabase.from('document_downloads').insert({
          request_id: requestRecord.id,
          document_type: docKey,
          storage_path: watermarkedPath,
          signed_url: signedUrlData.signedUrl,
          expires_at: expiresAt.toISOString()
        });

        generatedUrls.push({
          key: docKey,
          name: doc.name,
          icon: doc.icon,
          url: signedUrlData.signedUrl
        });
        
      } catch (docError) {
        console.error(`Error processing ${docKey}:`, docError);
        continue;
      }
    }

    if (generatedUrls.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to generate document links. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Your request has been approved! Personalized documents are ready for download.',
      requestId: requestRecord.id,
      documents: generatedUrls,
      expiresAt: expiresAt.toISOString()
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})
