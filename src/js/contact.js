/* ==========================================
   CONTACT FORM VALIDATION & TOAST SYSTEM
   ========================================== */

export function initContact() {
  const form = document.getElementById('contact-form');

  // Form Submit Handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validateForm()) {
        const submitBtn = document.getElementById('btn-submit-form');
        const origBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesan...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          form.reset();

          showToast('Pesan Anda telah berhasil terkirim! Terima kasih, saya akan segera menghubungi Anda.', 'success');
        }, 1500);
      }
    });
  }
}

function validateForm() {
  let isValid = true;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');

  // Name check
  if (!nameInput.value.trim()) {
    setError('contact-name', true);
    isValid = false;
  } else {
    setError('contact-name', false);
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    setError('contact-email', true);
    isValid = false;
  } else {
    setError('contact-email', false);
  }

  // Message check
  if (messageInput.value.trim().length < 10) {
    setError('contact-message', true);
    isValid = false;
  } else {
    setError('contact-message', false);
  }

  return isValid;
}

function setError(inputId, hasError) {
  const inputEl = document.getElementById(inputId);
  if (!inputEl) return;
  const parent = inputEl.closest('.form-group');
  if (parent) {
    if (hasError) {
      parent.classList.add('has-error');
    } else {
      parent.classList.remove('has-error');
    }
  }
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
