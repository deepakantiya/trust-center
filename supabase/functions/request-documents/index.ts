import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
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
    // Parse JSON body
    let body
    try {
      const text = await req.text()
      console.log('Received request body:', text.substring(0, 200))
      
      if (!text || text.trim() === '') {
        return new Response(JSON.stringify({ 
          success: false,
          error: 'Request body is empty.' 
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
        error: 'Invalid JSON in request body.' 
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

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Server configuration error.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Rate limiting: max 3 requests per hour per email
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('document_requests')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('created_at', oneHourAgo)

    if (count && count >= 3) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Too many requests. Please try again in an hour.' 
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
        error: 'Failed to save your request.' 
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
      if (!doc) continue

      const { data, error } = await supabase
        .storage
        .from('audit-docs')
        .createSignedUrl(doc.path, expiresIn)

      if (data?.signedUrl) {
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
        error: 'No documents could be generated.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Your request has been approved! Documents are ready for download.',
      requestId: requestRecord.id,
      documents: generatedUrls,
      expiresAt: expiresAt.toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ 
      success: false,
      error: 'An unexpected error occurred.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
