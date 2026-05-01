/* ================================================================
   ILHAM KHELIFI — PORTFOLIO JAVASCRIPT
   Contact form uses EmailJS — messages go directly to Gmail
================================================================ */

// ── EmailJS Keys ──────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_ho3hqim";
const EMAILJS_TEMPLATE_ID = "template_9n5gdn8";
const EMAILJS_PUBLIC_KEY  = "jPu4nJ_eiIWbInxWH";


// ================================================================
// 1. MOBILE NAV
// ================================================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


// ================================================================
// 2. SCROLL TO TOP
// ================================================================
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ================================================================
// 3. CONTACT FORM — EmailJS (sends directly to your Gmail)
// ================================================================
document.getElementById('sendBtn').addEventListener('click', sendMessage);

async function sendMessage() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();
  const btn     = document.getElementById('sendBtn');

  // Validation
  if (!name || !email || !message) {
    showError('Please fill in your name, email, and message.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';

  try {
    // Send email via EmailJS
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name:  name,
        from_email: email,
        subject:    subject || 'Portfolio Contact',
        message:    message,
      },
      EMAILJS_PUBLIC_KEY
    );

    // Show success screen
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';

  } catch (error) {
    // Reset button and show error
    btn.disabled = false;
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
    showError('Something went wrong. Please email me directly at ilham1khelifi@gmail.com');
    console.error('EmailJS error:', error);
  }
}

function showError(msg) {
  const existing = document.getElementById('formError');
  if (existing) existing.remove();

  const err = document.createElement('p');
  err.id = 'formError';
  err.textContent = msg;
  err.style.cssText = 'color:#f87171;font-size:0.85rem;margin-top:0.8rem;text-align:center;';
  document.getElementById('sendBtn').after(err);
  setTimeout(() => err.remove(), 4000);
}


// ================================================================
// 4. SCROLL ANIMATIONS
// ================================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.project-card, .timeline-item, .skill-group, .cert-item, .contact-link-item'
).forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
  observer.observe(el);
});