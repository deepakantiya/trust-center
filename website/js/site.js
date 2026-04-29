// Minimal JS for the public Trust Center.
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission stub — replace with real backend / form service.
function submitRequest(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  // Multi-checkbox values
  data.docs = [...form.querySelectorAll('input[name="docs"]:checked')].map(i => i.value);

  // TODO: POST to your backend / Pipedream / Zapier / customer portal API
  console.log('Trust Center request:', data);
  alert('Thanks! Your request has been received. We will follow up by email shortly.');
  form.reset();
  return false;
}
