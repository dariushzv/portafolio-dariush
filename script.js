/* ═══════════════════════════════════════
   HERO TYPEWRITER
═══════════════════════════════════════ */
function typeSimple(el, text, speed, callback) {
  let i = 0; el.textContent = '';
  const t = setInterval(() => {
    el.textContent += text[i]; i++;
    if (i >= text.length) { clearInterval(t); if (callback) callback(); }
  }, speed);
}

window.addEventListener('load', () => {
  const eyebrow = document.getElementById('hero-eyebrow');
  const title1  = document.getElementById('hero-title-1');
  const title2  = document.getElementById('hero-title-2');
  const roleEl  = document.getElementById('hero-role');
  setTimeout(() => {
    typeSimple(eyebrow, 'Junior Web Developer — Barcelona, España', 40);
    typeSimple(roleEl, 'Frontend  ·  Backend  ·  WordPress  ·  IA', 45);
    typeSimple(title1, 'DARIUSH', 75, () => {
      typeSimple(title2, 'LOTFI', 75);
    });
  }, 300);
});

/* ═══════════════════════════════════════
   HERO ACTIONS — borde dibujándose (rectángulo)
═══════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero-actions > a').forEach(a => a.classList.add('drawn'));
  }, 300);
});

/* ═══════════════════════════════════════
   FOOTER — año dinámico
═══════════════════════════════════════ */
document.getElementById('footer-year').textContent = new Date().getFullYear();

/* ═══════════════════════════════════════
   NAVBAR — mobile
═══════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelector('.nav-links');

function syncMenuHeight() {
  navbar.style.setProperty('--menu-h', navLinks.offsetHeight + 'px');
}
syncMenuHeight();
window.addEventListener('resize', syncMenuHeight);

/* libera el transform de la línea del header una vez termina su animación de entrada (1.9s + 0.3s delay) */
window.addEventListener('load', () => setTimeout(() => navbar.classList.add('line-drawn'), 2300));

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navbar.classList.toggle('menu-open', navLinks.classList.contains('open'));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navbar.classList.remove('menu-open');
}));

/* ═══════════════════════════════════════
   NAVBAR — active link on scroll
═══════════════════════════════════════ */
const navAnchors = document.querySelectorAll('.nav-links a');
const navSections = [...navAnchors].map(a => document.querySelector(a.getAttribute('href')));
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const i = navSections.indexOf(e.target);
      navAnchors.forEach(a => a.classList.remove('active'));
      if (i !== -1) navAnchors[i].classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
navSections.forEach(s => s && navObs.observe(s));

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════
   FOOTER — línea animada al llegar abajo
═══════════════════════════════════════ */
const footer = document.querySelector('footer');
const footerObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { footer.classList.add('line-drawn'); footerObs.unobserve(footer); }
  });
}, { threshold: 0.1 });
footerObs.observe(footer);

/* ═══════════════════════════════════════
   VIDEO — play on click
═══════════════════════════════════════ */
document.querySelectorAll('.proyecto-video-wrap').forEach(wrap => {
  const video = wrap.querySelector('.proyecto-video');
  const overlay = wrap.querySelector('.video-overlay');
  overlay.addEventListener('click', () => {
    if (video.paused) { video.play(); wrap.classList.add('playing'); }
    else              { video.pause(); wrap.classList.remove('playing'); }
  });
  new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) { video.pause(); wrap.classList.remove('playing'); }
  }, { threshold: 0.2 }).observe(wrap);
});
