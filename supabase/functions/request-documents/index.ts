import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fullName, email, companyName, documents, ndaAccepted } = await req.json()

    // Validation
    if (!fullName || !email || !companyName || !documents?.length || !ndaAccepted) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Rate limiting: Check recent requests from this email (max 3 per hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('document_requests')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', oneHourAgo)

    if (count && count >= 3) {
      return new Response(JSON.stringify({ 
        error: 'Too many requests. Please try again later.' 
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
      throw insertError
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
      if (!doc) continue

      const { data, error } = await supabase
        .storage
        .from('audit-docs')
        .createSignedUrl(doc.path, expiresIn)

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

    // Send email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    let emailSent = false
    
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
            from: 'Trust Center <security@yourdomain.com>',
            to: [email],
            subject: '🔐 Your Requested Compliance Documents',
            html: emailHtml
          })
        })

        const emailResult = await emailResponse.json()
        console.log('Email response:', emailResult)
        emailSent = emailResponse.ok
      } catch (emailError) {
        console.error('Email error:', emailError)
      }
    }

    return new Response(JSON.stringify({
      success: true,
      requestId: requestRecord.id,
      documents: generatedUrls,
      expiresAt: expiresAt.toISOString(),
      emailSent
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
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

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🔐 Trust Center</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0 0;">Compliance Documentation</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #374151; margin: 0 0 16px 0;">
            Hi ${name},
          </p>
          <p style="font-size: 16px; color: #374151; margin: 0 0 24px 0;">
            Thank you for your interest in our security practices. As requested by <strong>${company}</strong>, here are your compliance documents:
          </p>
          
          <!-- Documents Table -->
          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Document</th>
                <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${docRows}
            </tbody>
          </table>
          
          <!-- Expiry Notice -->
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              ⏰ <strong>Important:</strong> These links will expire on <strong>${expiryDate}</strong>.
            </p>
          </div>
          
          <!-- NDA Reminder -->
          <p style="font-size: 14px; color: #6b7280; margin: 24px 0 0 0;">
            By downloading these documents, you acknowledge your acceptance of our Non-Disclosure Agreement. These materials are confidential and should not be shared with unauthorized parties.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            Questions? Contact us at <a href="mailto:security@yourdomain.com" style="color: #2563eb;">security@yourdomain.com</a>
          </p>
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #9ca3af;">
            © ${new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `
}
