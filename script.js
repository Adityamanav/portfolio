// Scroll animation trigger
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
``// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    // Machine-like feedback
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 400);
  });
}

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
}

// ===== Typing Effect =====
const typingText = document.getElementById('typingText');
const phrases = [
  'CSE Diploma Student',
  'Frontend Developer',
  'Java Programmer',
  'AI Enthusiast',
  'Problem Solver'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// ===== Counter Animation (runs only once) =====
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
}

// ===== Skill Bars Animation (runs only once) =====
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach(fill => {
    const width = fill.getAttribute('data-width');
    fill.style.width = width + '%';
  });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hero-stats')) {
        animateCounters();
      }
      if (entry.target.classList.contains('skills-container')) {
        animateSkills();
      }
      entry.target.classList.add('animate-in');
      // Stop observing after animation
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .hero-stats, .skills-container').forEach(el => {
  observer.observe(el);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const height = section.offsetHeight;
    const top = section.offsetTop - 100;
    const id = section.getAttribute('id');

    if (scrollY > top && scrollY <= top + height) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== Mini Clock Update =====
function updateMiniClock() {
  const now = new Date();
  const timeEl = document.getElementById('miniClockTime');
  const dateEl = document.getElementById('miniClockDate');

  if (timeEl && dateEl) {
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${h}:${m}:${s}`;

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-IN', options);
  }
}

setInterval(updateMiniClock, 1000);
updateMiniClock();

// ===== Project Modals =====
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

const projectData = {
  currency: {
    title: 'Currency Converter',
    desc: 'Convert between major world currencies instantly.',
    html: `
      <h3 class="modal-project-title">Currency Converter</h3>
      <p class="modal-project-desc">Real-time currency conversion tool</p>
      <div class="converter-box">
        <div class="converter-row">
          <label>Amount</label>
          <div class="converter-input-group">
            <input type="number" id="currAmount" value="1" min="0" step="0.01">
            <select id="currFrom">
              <option value="USD">USD</option>
              <option value="INR" selected>INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>
        <div class="converter-swap">
          <button type="button" id="swapBtn"><i class="fas fa-exchange-alt"></i></button>
        </div>
        <div class="converter-row">
          <label>Converted Amount</label>
          <div class="converter-input-group">
            <input type="text" id="currResult" readonly value="0.012">
            <select id="currTo">
              <option value="USD" selected>USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>
      </div>
    `
  },
  music: {
    title: 'Interactive Music Player',
    desc: 'Modern music player with full controls.',
    html: `
      <h3 class="modal-project-title">Interactive Music Player</h3>
      <p class="modal-project-desc">Playlist • Progress • Volume Control</p>
      <div class="music-box">
        <div class="music-art"><i class="fas fa-music"></i></div>
        <div class="music-title">Aji Ghanta</div>
        <div class="music-artist">Hashtag Rv</div>
        <div class="music-progress">
          <div class="music-progress-bar" id="musicProgress"></div>
        </div>
        <div class="music-times">
          <span id="musicCurrent">0:42</span>
          <span id="musicDuration">3:15</span>
        </div>
        <div class="music-controls">
          <button type="button"><i class="fas fa-backward-step"></i></button>
          <button type="button" class="play-btn" id="musicPlayBtn"><i class="fas fa-play"></i></button>
          <button type="button"><i class="fas fa-forward-step"></i></button>
        </div>
      </div>
    `
  },
  clock: {
    title: 'Digital Clock',
    desc: 'Real-time digital clock with date.',
    html: `
      <h3 class="modal-project-title">Digital Clock</h3>
      <p class="modal-project-desc">Live time & date display</p>
      <div class="clock-box">
        <div class="big-clock" id="modalClockTime">00:00:00</div>
        <div class="big-date" id="modalClockDate">Loading...</div>
      </div>
    `
  }
};

// Currency rates (approximate static rates)
const rates = {
  USD: 1,
  INR: 83.12,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  AUD: 1.53
};

function convertCurrency() {
  const amountEl = document.getElementById('currAmount');
  const fromEl = document.getElementById('currFrom');
  const toEl = document.getElementById('currTo');
  const resultEl = document.getElementById('currResult');

  if (!amountEl || !fromEl || !toEl || !resultEl) return;

  const amount = parseFloat(amountEl.value) || 0;
  const from = fromEl.value;
  const to = toEl.value;

  const result = (amount / rates[from]) * rates[to];
  resultEl.value = result.toFixed(4);
}

function swapCurrencies() {
  const from = document.getElementById('currFrom');
  const to = document.getElementById('currTo');
  if (!from || !to) return;

  const temp = from.value;
  from.value = to.value;
  to.value = temp;
  convertCurrency();
}

function openProject(type) {
  const data = projectData[type];
  if (!data || !modalContent || !modalOverlay) return;

  modalContent.innerHTML = data.html;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Init project-specific logic
  if (type === 'currency') {
    setTimeout(() => {
      const amountInput = document.getElementById('currAmount');
      const fromSelect = document.getElementById('currFrom');
      const toSelect = document.getElementById('currTo');
      const swapBtn = document.getElementById('swapBtn');

      if (amountInput) amountInput.addEventListener('input', convertCurrency);
      if (fromSelect) fromSelect.addEventListener('change', convertCurrency);
      if (toSelect) toSelect.addEventListener('change', convertCurrency);
      if (swapBtn) swapBtn.addEventListener('click', swapCurrencies);

      convertCurrency();
    }, 50);
  }

  if (type === 'clock') {
    function updateModalClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const timeEl = document.getElementById('modalClockTime');
      const dateEl = document.getElementById('modalClockDate');

      if (timeEl) timeEl.textContent = `${h}:${m}:${s}`;
      if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-IN', options);
      }
    }
    updateModalClock();
    window.modalClockInterval = setInterval(updateModalClock, 1000);
  }

  if (type === 'music') {
    const playBtn = document.getElementById('musicPlayBtn');
    let playing = false;

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        playing = !playing;
        playBtn.innerHTML = playing
          ? '<i class="fas fa-pause"></i>'
          : '<i class="fas fa-play"></i>';
      });
    }
  }
}

function closeModal() {
  if (!modalOverlay) return;

  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';

  if (window.modalClockInterval) {
    clearInterval(window.modalClockInterval);
    window.modalClockInterval = null;
  }
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    if (!btn) return;

    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      e.target.reset();
    }, 2500);
  });
}

// ===== Smooth reveal on load =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 100);
});
