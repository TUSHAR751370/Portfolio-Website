const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal commit entries on scroll
const commits = document.querySelectorAll('.commit');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
commits.forEach(c => io.observe(c));

// Hero role typewriter
const roles = [
  'CS undergrad building IoT, data & AI-driven apps',
  'Aspiring Software Development Intern',
  'Aspiring Data Analyst Intern',
  'DSU · CGPA 9.71 / 10'
];
const typeTarget = document.getElementById('typeTarget');

function typewriter(el, words) {
  if (!el) return;
  if (prefersReducedMotion) {
    el.textContent = words[0];
    return;
  }
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1500);
        return;
      }
      setTimeout(tick, 38);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 20);
    }
  }
  tick();
}
typewriter(typeTarget, roles);

// Nav scrollspy
const navLinks = {};
document.querySelectorAll('.nav-links a').forEach(a => {
  navLinks[a.getAttribute('href').slice(1)] = a;
});
const spySections = Object.keys(navLinks)
  .map(id => document.getElementById(id))
  .filter(Boolean);

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Object.values(navLinks).forEach(a => a.classList.remove('active'));
      const link = navLinks[entry.target.id];
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
spySections.forEach(s => spyObserver.observe(s));

// Mouse-tracked spotlight glow on cards
document.querySelectorAll('.spotlight').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  });
});
