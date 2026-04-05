/* ===== LIGHTBOX ===== */
function openLightbox(img) {
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ===== SPARKLES PARTICLES ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);

  if (typeof tsParticles === 'undefined') return;
  tsParticles.load("hero-particles", {
    fullScreen: { enable: false },
    fpsLimit: 120,
    background: { color: { value: "transparent" } },
    particles: {
      number: {
        value: 120,
        density: { enable: true, width: 800, height: 800 }
      },
      color: { value: "#60b4ff" },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.05, max: 0.7 },
        animation: { enable: true, speed: 1.2, sync: false, startValue: "random" }
      },
      size: {
        value: { min: 0.5, max: 2.5 }
      },
      move: {
        enable: true,
        speed: { min: 0.08, max: 0.5 },
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      },
      links: { enable: false }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
        resize: true
      },
      modes: {
        bubble: { distance: 160, size: 4, opacity: 1, duration: 1.2 }
      }
    },
    detectRetina: true
  });
});

/* ===== DARK TOGGLE (decorative) ===== */
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) darkToggle.addEventListener('click', () => {
  darkToggle.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
  darkToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => { darkToggle.style.transform = 'rotate(0deg)'; }, 600);
});

/* ===== LOGO TYPING ===== */
(function() {
  const el = document.getElementById('logoText');
  const part1 = 'ALEXANDER ';
  const part2 = 'PETERS';
  const full = part1 + part2;
  // total duration 3s, spread evenly across all chars
  const totalChars = full.length;
  const delay = 3000 / totalChars; // ms per char
  let i = 0;
  function tick() {
    i++;
    const t1 = full.slice(0, Math.min(i, part1.length));
    const t2 = i > part1.length ? full.slice(part1.length, i) : '';
    el.innerHTML = t1 + (t2 ? `<strong>${t2}</strong>` : '');
    if (i < totalChars) setTimeout(tick, delay);
  }
  tick();
})();

/* ===== TYPING EFFECT ===== */
const typingEl = document.getElementById('typingText');
const phrases = [
  'an Operations Specialist.',
  'a High-Performance Team Leader.',
  'a Client Relationships Expert.',
  'driven by Positivity & Action.',
  'building Sustainable Work Cultures.',
  'generating Leads via Business Networking.'
];
let phraseIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 55 : 90);
}
type();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===== HAMBURGER ===== */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ===== INTERSECTION OBSERVER ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, _, all) => {
    if (!entry.isIntersecting) return;
    // stagger siblings of same parent
    const siblings = Array.from(entry.target.parentElement.children).filter(el =>
      el.hasAttribute('data-animate') || el.classList.contains('tl-item') ||
      el.classList.contains('skill-item') || el.classList.contains('service-card') ||
      el.classList.contains('edu-card')
    );
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 100);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate], .tl-item, .skill-item, .service-card, .svc2-card, .edu-card').forEach(el => {
  observer.observe(el);
});

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));

/* ===== CONTACT FORM ===== */
const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    success.textContent = "Message sent — I'll be in touch soon.";
    form.reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    setTimeout(() => { success.textContent = ''; }, 5000);
  }, 1200);
});
