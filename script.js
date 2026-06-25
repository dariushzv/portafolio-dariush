/* ═══════════════════════════════════════
   MATRIX RAIN (rojo)
═══════════════════════════════════════ */
const canvas = document.getElementById('matrixCanvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アイウエオカキクケコ01001101DARIUSHLOTFI<>{}[]0110';
const fontSize = 13;
let drops = [];

function initDrops() {
  const cols = Math.floor(canvas.width / fontSize);
  drops = Array(cols).fill(1);
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + 'px Share Tech Mono';
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x    = i * fontSize;
    ctx.globalAlpha = Math.random() * 0.5 + 0.1;
    ctx.fillStyle   = y * fontSize < 80 ? '#ff6644' : '#ff2200';
    ctx.fillText(char, x, y * fontSize);
    ctx.globalAlpha = 1;
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 55);

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
  const roleEl  = document.getElementById('hero-role');
  setTimeout(() => {
    typeSimple(eyebrow, '// Junior Web Developer — Barcelona, España', 40, () => {
      setTimeout(() => {
        typeSimple(roleEl, 'Frontend  ·  Backend  ·  WordPress  ·  IA', 45);
      }, 400);
    });
  }, 300);
});

/* ═══════════════════════════════════════
   NAVBAR — mobile
═══════════════════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

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
