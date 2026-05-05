export default function handler(req, res) {
  // Enable CORS for frontend access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Return Supabase configuration from environment variables
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    edgeFunctionUrl: process.env.SUPABASE_URL 
      ? `${process.env.SUPABASE_URL}/functions/v1/request-documents`
      : ''
  });
}
