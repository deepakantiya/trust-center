// website/js/site.js - Supabase Magic Link version
document.getElementById('year').textContent = new Date().getFullYear();

const SUPABASE_URL = 'https://jdagfmqrlxhiolldecxq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYWdmbXFybHhoaW9sbGRlY3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDEwOTAsImV4cCI6MjA5MzE3NzA5MH0.G58GAn9_jA0nKylGGo1NogF1Gitbtj9hta-O6Zs4OHc'; // Update this
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/Deno-Edge-Function`;

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ndaCheckbox = document.getElementById('nda-checkbox');
const submitBtn = document.getElementById('submit-btn');
const ndaBox = document.getElementById('nda-box');
const feedback = document.getElementById('form-feedback');
const requestForm = document.getElementById('request-form');
const linksPanel = document.getElementById('doc-links-panel');

const DOC_LABELS = {
  soc2: 'SOC 2 Type II Report', iso27001: 'ISO 27001 Statement', cmmc: 'CMMC Assessment',
  pentest: 'Penetration Test Report', dpa: 'Data Processing Agreement', questionnaire: 'Security Questionnaire'
};

if (ndaCheckbox && submitBtn) {
  ndaCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !ndaCheckbox.checked;
    ndaBox.classList.toggle('nda-accepted', ndaCheckbox.checked);
  });
}

async function submitRequest(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const company = form.company.value.trim();
  const docs = [...form.querySelectorAll('input[name="docs"]:checked')].map(i => i.value);

  if (!name || !email || !company) { showFeedback('error', 'Please fill in all fields.'); return false; }
  if (docs.length === 0) { showFeedback('error', 'Please select at least one document.'); return false; }
  if (!ndaCheckbox?.checked) { showFeedback('error', 'You must accept the NDA.'); return false; }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify({ name, email, company, docs, nda_accepted: true })
    });
    const payload = await res.json().catch(() => ({}));

    if (res.ok && payload.success) {
      showEmailConfirmation(name, email, docs);
    } else {
      showFeedback('error', payload.error || 'Something went wrong.');
      submitBtn.disabled = false;
    }
  } catch (err) {
    showFeedback('error', 'Network error.');
    submitBtn.disabled = false;
  } finally {
    submitBtn.textContent = 'Submit Request';
    if (ndaCheckbox && !ndaCheckbox.checked) submitBtn.disabled = true;
  }
  return false;
}

function showEmailConfirmation(name, email, docs) {
  if (!linksPanel || !requestForm) return;
  requestForm.style.display = 'none';
  linksPanel.innerHTML = `
    <div style="text-align:center;padding:40px;background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border-radius:16px;">
      <div style="font-size:64px;">📧</div>
      <h2 style="color:#0369a1;">Check Your Email!</h2>
      <p>Hi <strong>${name}</strong>, we sent a verification link to:</p>
      <p style="font-size:18px;font-weight:600;background:white;padding:12px 24px;border-radius:8px;display:inline-block;margin:16px 0;">${email}</p>
      <div style="background:white;padding:16px;border-radius:8px;text-align:left;margin:16px 0;">
        <p><strong>Requested:</strong></p>
        <ul>${docs.map(d => `<li>📄 ${DOC_LABELS[d] || d}</li>`).join('')}</ul>
      </div>
      <p style="background:#fef3c7;color:#92400e;padding:12px;border-radius:8px;">⏰ Link expires in 1 hour</p>
      <button onclick="location.reload()" style="margin-top:16px;padding:12px 24px;background:none;border:2px solid #0369a1;color:#0369a1;border-radius:8px;cursor:pointer;">Request Different Documents</button>
    </div>`;
  linksPanel.style.display = 'block';
}

function showFeedback(type, msg) {
  if (!feedback) return;
  feedback.className = `form-feedback ${type}`;
  feedback.textContent = msg;
  feedback.style.display = 'block';
}
