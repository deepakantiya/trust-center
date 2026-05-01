document.getElementById('year').textContent = new Date().getFullYear();

// ── Request-docs form ─────────────────────────────────────────────────────────
// Replace this URL with your Supabase project's Edge Function endpoint.
// Format: https://<project-ref>.supabase.co/functions/v1/request-docs
const EDGE_FUNCTION_URL = 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/Deno-Edge-Function';

// Publishable key — safe to expose in client JS (sb_publishable_...).
// Issued via JWT Signing Keys: Supabase Dashboard → Settings → API Keys.
// (Legacy anon keys still work but are deprecated.)
const SUPABASE_PUBLISHABLE_KEY = 'REDACTED_PUBLISHABLE_KEY';

const ndaCheckbox = document.getElementById('nda-checkbox');
const submitBtn   = document.getElementById('submit-btn');
const ndaBox      = document.getElementById('nda-box');
const feedback    = document.getElementById('form-feedback');

if (ndaCheckbox && submitBtn) {
  ndaCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !ndaCheckbox.checked;
    if (ndaCheckbox.checked) {
      ndaBox.classList.add('nda-accepted');
    } else {
      ndaBox.classList.remove('nda-accepted');
    }
  });
}

async function submitRequest(e) {
  e.preventDefault();
  const form = e.target;

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const company = form.company.value.trim();
  const docs    = [...form.querySelectorAll('input[name="docs"]:checked')].map(i => i.value);

  if (!name || !email || !company) {
    showFeedback('error', 'Please fill in your name, work email, and company.');
    return false;
  }
  if (docs.length === 0) {
    showFeedback('error', 'Please select at least one document.');
    return false;
  }
  if (!ndaCheckbox?.checked) {
    showFeedback('error', 'You must accept the Non-Disclosure Agreement to continue.');
    return false;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  hideFeedback();

  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_PUBLISHABLE_KEY,
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ name, email, company, docs, nda_accepted: true }),
    });

    const payload = await res.json().catch(() => ({}));

    if (res.ok && payload.success) {
      showFeedback(
        'success',
        'Request received! Check your work email — your secure download links are on their way.'
      );
      form.reset();
      ndaBox?.classList.remove('nda-accepted');
    } else {
      const msg = payload.error || 'Something went wrong. Please try again.';
      showFeedback('error', msg);
      submitBtn.disabled = false;
    }
  } catch {
    showFeedback('error', 'Network error — please check your connection and try again.');
    submitBtn.disabled = false;
  } finally {
    submitBtn.textContent = 'Submit Request';
    // Re-enable only if NDA is still checked (user may have unchecked on error)
    if (ndaCheckbox && !ndaCheckbox.checked) {
      submitBtn.disabled = true;
    }
  }

  return false;
}

function showFeedback(type, message) {
  if (!feedback) return;
  feedback.className = `form-feedback form-feedback--${type}`;
  feedback.textContent = message;
  feedback.hidden = false;
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideFeedback() {
  if (!feedback) return;
  feedback.hidden = true;
  feedback.textContent = '';
}
