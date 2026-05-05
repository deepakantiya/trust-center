// website/js/site.js
// Trust Center frontend with Supabase Magic Link authentication

// ============================================================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================================================

const SUPABASE_URL = 'https://jdagfmqrlxhiolldecxq.supabase.co';  // e.g., https://abc123.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYWdmbXFybHhoaW9sbGRlY3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDEwOTAsImV4cCI6MjA5MzE3NzA5MH0.G58GAn9_jA0nKylGGo1NogF1Gitbtj9hta-O6Zs4OHc';
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/request-documents`;

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// FORM HANDLING
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('requestForm');
  const submitBtn = document.getElementById('submitBtn');
  const formContainer = document.getElementById('formContainer');
  const successContainer = document.getElementById('successContainer');
  const errorContainer = document.getElementById('errorContainer');
  const requestedDocsList = document.getElementById('requestedDocsList');
  const userEmailSpan = document.getElementById('userEmail');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const fullName = document.getElementById('fullName')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    const company = document.getElementById('company')?.value?.trim();
    const ndaAgreed = document.getElementById('ndaAgreed')?.checked;

    // Get selected documents
    const docCheckboxes = document.querySelectorAll('input[name="documents"]:checked');
    const documents = Array.from(docCheckboxes).map(cb => cb.value);

    // Validation
    if (!fullName || !email || !company) {
      showError('Please fill in all required fields.');
      return;
    }

    if (documents.length === 0) {
      showError('Please select at least one document.');
      return;
    }

    if (!ndaAgreed) {
      showError('Please agree to the NDA terms.');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    hideError();

    try {
      // Submit request to Edge Function
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          companyName: company,
          documents: documents,
          ndaAccepted: ndaAgreed,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit request');
      }

      // Show success state
      showSuccess(email, result.documents_requested || documents);

    } catch (err) {
      console.error('Submit error:', err);
      showError(err.message || 'An error occurred. Please try again.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request Documents';
    }
  });

  function showSuccess(email, documents) {
    // Hide form
    if (formContainer) formContainer.style.display = 'none';
    
    // Show success message
    if (successContainer) {
      successContainer.style.display = 'block';
      
      if (userEmailSpan) userEmailSpan.textContent = email;
      
      if (requestedDocsList) {
        requestedDocsList.innerHTML = documents
          .map(doc => `<li>📄 ${doc}</li>`)
          .join('');
      }
    }
  }

  function showError(message) {
    if (errorContainer) {
      errorContainer.textContent = message;
      errorContainer.style.display = 'block';
    }
  }

  function hideError() {
    if (errorContainer) {
      errorContainer.style.display = 'none';
    }
  }
});
