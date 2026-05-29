// Nav highlight
const navLinks = document.querySelectorAll('.nav-links a');
const current = location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(a => {
  const href = a.getAttribute('href');
  if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
});

// Hamburger
const ham = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-links');
if (ham && menu) {
  ham.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    spans.forEach(s => s.style.opacity = menu.classList.contains('open') ? '0.6' : '1');
  });
  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
  });
}

// Fade-up observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#00c851';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// Animated counters
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let count = 0;
    const inc = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + inc, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 30);
  });
}
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  const so = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); so.disconnect(); }
  }, { threshold: 0.5 });
  so.observe(statsSection);
}
