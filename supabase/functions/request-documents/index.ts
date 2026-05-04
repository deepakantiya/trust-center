import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests FIRST before any body parsing
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    })
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Method not allowed. Use POST.' 
    }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    // Parse JSON body with error handling
    let body
    try {
      const text = await req.text()
      console.log('Received request body:', text.substring(0, 200))
      
      if (!text || text.trim() === '') {
        return new Response(JSON.stringify({ 
          success: false,
          error: 'Request body is empty. Please send a JSON payload.' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
      
      body = JSON.parse(text)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Invalid JSON in request body. Please send valid JSON.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { fullName, email, companyName, documents, ndaAccepted } = body

    // Validation
    if (!fullName || !email || !companyName || !documents?.length || !ndaAccepted) {
      const missing = []
      if (!fullName) missing.push('fullName')
      if (!email) missing.push('email')
      if (!companyName) missing.push('companyName')
      if (!documents?.length) missing.push('documents')
      if (!ndaAccepted) missing.push('ndaAccepted')
      
      return new Response(JSON.stringify({ 
        success: false,
        error: `Missing required fields: ${missing.join(', ')}` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Server configuration error. Please contact support.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Rate limiting: Check recent requests from this email (max 3 per hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('document_requests')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', oneHourAgo)

    if (count && count >= 3) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Too many requests from this email. Please try again in an hour.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

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
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Failed to save your request. Please try again.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Document mapping
    const documentPaths: Record<string, { name: string, path: string, icon: string }> = {
      soc2: { name: 'SOC 2 Type II Report', path: 'soc2.pdf', icon: '🔒' },
      iso27001: { name: 'ISO 27001 Certificate', path: 'iso27001.pdf', icon: '📋' },
      pentest: { name: 'Penetration Test Summary', path: 'pentest.pdf', icon: '🔍' },
      cmmc: { name: 'CMMC Assessment', path: 'cmmc.pdf', icon: '🛡️' },
      dpa: { name: 'Data Processing Agreement', path: 'dpa.pdf', icon: '📜' },
      questionnaire: { name: 'Security Questionnaire', path: 'questionnaire.pdf', icon: '📝' }
    }

    // Generate signed URLs (7 days expiry)
    const expiresIn = 7 * 24 * 60 * 60 // 604800 seconds
    const expiresAt = new Date(Date.now() + expiresIn * 1000)
    const generatedUrls: Array<{ key: string, name: string, icon: string, url: string }> = []

    for (const docKey of documents) {
      const doc = documentPaths[docKey]
      if (!doc) {
        console.log(`Unknown document key: ${docKey}`)
        continue
      }

      const { data, error } = await supabase
        .storage
        .from('audit-docs')
        .createSignedUrl(doc.path, expiresIn)

      if (error) {
        console.error(`Error creating signed URL for ${docKey}:`, error)
        continue
      }

      if (data?.signedUrl) {
        // Store URL in database for tracking
        await supabase.from('document_downloads').insert({
          request_id: requestRecord.id,
          document_type: docKey,
          storage_path: doc.path,
          signed_url: data.signedUrl,
          expires_at: expiresAt.toISOString()
        })

        generatedUrls.push({
          key: docKey,
          name: doc.name,
          icon: doc.icon,
          url: data.signedUrl
        })
      }
    }

    if (generatedUrls.length === 0) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'No documents could be generated. Please check if the requested documents exist.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Send email via Resend using test domain
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    let emailSent = false
    let emailError = null
    
    if (resendApiKey) {
      const emailHtml = generateEmailHtml(fullName, companyName, generatedUrls, expiresAt)
      
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Trust Center <onboarding@resend.dev>',
            to: [email],
            subject: '🔐 Your Requested Compliance Documents',
            html: emailHtml
          })
        })

        const emailResult = await emailResponse.json()
        console.log('Email response:', emailResult)
        emailSent = emailResponse.ok
        if (!emailResponse.ok) {
          emailError = emailResult.message || 'Email delivery failed'
        }
      } catch (err) {
        console.error('Email error:', err)
        emailError = 'Email service unavailable'
      }
    } else {
      console.log('RESEND_API_KEY not configured')
      emailError = 'Email service not configured'
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Your request has been approved! Documents are ready for download.',
      requestId: requestRecord.id,
      documents: generatedUrls,
      expiresAt: expiresAt.toISOString(),
      emailSent,
      emailError
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ 
      success: false,
      error: 'An unexpected error occurred. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

// Email template generator
function generateEmailHtml(
  name: string, 
  company: string, 
  documents: Array<{ name: string, icon: string, url: string }>,
  expiresAt: Date
): string {
  const docRows = documents.map(doc => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <span style="font-size: 18px;">${doc.icon}</span> ${doc.name}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        <a href="${doc.url}" style="background: #2563eb; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: 500;">
          Download PDF
        </a>
      </td>
    </tr>
  `).join('')

  const expiryDate = expiresAt.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6; padding: 40px 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">🔐 Trust Center</h1>
      <p style="color: #bfdbfe; margin: 8px 0 0 0;">Compliance Documentation</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">Hi ${name},</p>
      <p style="font-size: 16px; color: #374151; margin: 0 0 24px 0;">
        Thank you for your interest in our security practices. As requested by <strong>${company}</strong>, here are your compliance documents:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Document</th>
            <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Action</th>
          </tr>
        </thead>
        <tbody>${docRows}</tbody>
      </table>
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          ⏰ <strong>Important:</strong> These links will expire on <strong>${expiryDate}</strong>.
        </p>
      </div>
      <p style="font-size: 14px; color: #6b7280; margin: 24px 0 0 0;">
        By downloading these documents, you acknowledge your acceptance of our Non-Disclosure Agreement. These materials are confidential and should not be shared with unauthorized parties.
      </p>
    </div>
    <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 14px; color: #6b7280;">
        Questions? Contact us at <a href="mailto:security@example.com" style="color: #2563eb;">security@example.com</a>
      </p>
      <p style="margin: 12px 0 0 0; font-size: 12px; color: #9ca3af;">
        © ${new Date().getFullYear()} Trust Center. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`
}
