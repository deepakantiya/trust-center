document.getElementById('year').textContent = new Date().getFullYear();

const EDGE_FUNCTION_URL =
  window.ENV?.EDGE_FUNCTION_URL ||
  'https://jdagfmqrlxhiolldecxq.supabase.co/functions/v1/Deno-Edge-Function';

const SUPABASE_PUBLISHABLE_KEY =
  window.ENV?.SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_xtPucbBGqU9hC0aYKtGESw_9zLbY0Eq';

const ndaCheckbox = document.getElementById('nda-checkbox');
const submitBtn   = document.getElementById('submit-btn');
const ndaBox      = document.getElementById('nda-box');
const feedback    = document.getElementById('form-feedback');
const requestForm = document.getElementById('request-form');
const linksPanel  = document.getElementById('doc-links-panel');

if (ndaCheckbox && submitBtn) {
  ndaCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !ndaCheckbox.checked;
    ndaBox.classList.toggle('nda-accepted', ndaCheckbox.checked);
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
  submitBtn.textContent = 'Generating links…';
  hideFeedback();

  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ name, email, company, docs, nda_accepted: true }),
    });

    const payload = await res.json().catch(() => ({}));

    if (res.ok && payload.success && Array.isArray(payload.links)) {
      showDocLinks(name, payload.links);
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
    if (ndaCheckbox && !ndaCheckbox.checked) submitBtn.disabled = true;
  }

  return false;
}

function safeUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' ? parsed.href : '';
  } catch {
    return '';
  }
}

function showDocLinks(name, links) {
  if (!linksPanel || !requestForm) return;

  const cards = links.map(l => {
    const href = safeUrl(l.url);
    if (!href) {
      return `
        <div class="doc-link-card doc-link-unavailable">
          <div class="doc-link-info">
            <span class="doc-link-icon">📄</span>
            <div>
              <strong>${escHtml(l.label)}</strong>
              <span class="doc-link-note">Temporarily unavailable — we'll follow up by email.</span>
            </div>
          </div>
        </div>`;
    }
    return `
      <div class="doc-link-card">
        <div class="doc-link-info">
          <span class="doc-link-icon">📄</span>
          <div>
            <strong>${escHtml(l.label)}</strong>
            <span class="doc-link-note">Link expires in 7 days</span>
          </div>
        </div>
        <a class="btn btn-primary doc-link-btn" href="${href}" target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      </div>`;
  }).join('');

  linksPanel.innerHTML = `
    <div class="doc-links-header">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <div>
        <h3>Your documents are ready, ${escHtml(name)}</h3>
        <p>These are unique, secure links governed by the NDA you accepted. Do not share them.</p>
      </div>
    </div>
    <div class="doc-links-list">${cards}</div>
    <div class="doc-links-footer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Links are unique to this session and expire automatically after 7 days.
      <button class="doc-links-reset" onclick="resetForm()">Request different documents</button>
    </div>`; // nosemgrep

  requestForm.hidden = true;
  linksPanel.hidden = false;
  linksPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
  if (!linksPanel || !requestForm) return;
  linksPanel.hidden = true;
  linksPanel.innerHTML = ''; // nosemgrep
  requestForm.hidden = false;
  requestForm.reset();
  ndaBox?.classList.remove('nda-accepted');
  if (submitBtn) submitBtn.disabled = true;
}

function escHtml(str) {
  return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
