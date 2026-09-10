// Minimalist Contact Form Handler (Formspree AJAX)
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      if (!emailInput || !messageInput) return;

      // Basic client-side check
      if (!emailInput.value.trim() || !messageInput.value.trim()) {
        setStatus('Please fill in both your email and message.', 'error');
        return;
      }

      // Set loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
      setStatus('', '');

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          setStatus('✓ Thank you! Your message has been sent successfully.', 'success');
        } else {
          const responseData = await response.json().catch(() => ({}));
          const errorMsg = responseData.errors
            ? responseData.errors.map(err => err.message).join(', ')
            : 'Oops! There was a problem sending your message.';
          setStatus(`⚠️ ${errorMsg}`, 'error');
        }
      } catch (err) {
        setStatus('⚠️ Network error. Please check your connection and try again.', 'error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
      }
    });

    function setStatus(message, type) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = 'form-status';
      if (type) {
        statusEl.classList.add(type);
      }
    }
  });
})();
