/* =========================================================
   OncoMedic — Landing JS
   - Loader, dark mode, navbar, mobile menu
   - Counters, doctors data, testimonials carousel
   - Booking form → WhatsApp integration
   ========================================================= */

// ---- Config ----
const WHATSAPP_NUMBER = '50377556733'; // ← cambia por el número real (formato internacional sin +)

// ---- Data ----
const doctors = [
  {
    id: 'dr-alvarez',
    name: 'Dr. Daniel Marroquín',
    specialty: 'Oncología médica',
    experience: '15 años de experiencia',
    bio: 'Especialista en tumores sólidos y terapias dirigidas. Formación en MD Anderson Cancer Center.',
    schedule: 'Lun – Vie · 8:00 – 16:00',
    photo: 'assets/images/doctors/dr-alvarez.svg',
  },
  {
    id: 'dr-mendoza',
    name: 'Dr. Carlos Mendoza',
    specialty: 'Oncología quirúrgica',
    experience: '20 años de experiencia',
    bio: 'Cirujano oncólogo certificado, experto en cirugía mínimamente invasiva y robótica.',
    schedule: 'Lun · Mié · Vie · 9:00 – 17:00',
    photo: 'assets/images/doctors/dr-mendoza.svg',
  }
  // ,
  // {
  //   id: 'dr-rivas',
  //   name: 'Dra. Lucía Rivas',
  //   specialty: 'Hemato-oncología',
  //   experience: '12 años de experiencia',
  //   bio: 'Diagnóstico y tratamiento de leucemias, linfomas y trastornos hematológicos complejos.',
  //   schedule: 'Mar · Jue · 8:00 – 14:00',
  //   photo: 'assets/images/doctors/dr-rivas.svg',
  // },
  // {
  //   id: 'dr-garcia',
  //   name: 'Dr. Andrés García',
  //   specialty: 'Radio-oncología',
  //   experience: '18 años de experiencia',
  //   bio: 'Tratamientos de radioterapia de precisión: IMRT, SBRT y radiocirugía estereotáctica.',
  //   schedule: 'Lun – Vie · 10:00 – 18:00',
  //   photo: 'assets/images/doctors/dr-garcia.svg',
  // },
  // {
  //   id: 'dr-perez',
  //   name: 'Dra. Sofía Pérez',
  //   specialty: 'Oncología pediátrica',
  //   experience: '10 años de experiencia',
  //   bio: 'Acompañamiento integral al paciente pediátrico y su familia con un enfoque humano.',
  //   schedule: 'Lun · Mié · 8:00 – 13:00',
  //   photo: 'assets/images/doctors/dr-perez.svg',
  // },
  // {
  //   id: 'dr-lopez',
  //   name: 'Dr. Roberto López',
  //   specialty: 'Cuidados paliativos',
  //   experience: '14 años de experiencia',
  //   bio: 'Control del dolor y calidad de vida durante todas las etapas del tratamiento.',
  //   schedule: 'Mar · Jue · Vie · 9:00 – 15:00',
  //   photo: 'assets/images/doctors/dr-lopez.svg',
  // },
];

const testimonials = [
  {
    name: 'Ana Gutiérrez',
    role: 'Paciente',
    text: 'El equipo de OncoMedic me devolvió la esperanza. Su profesionalismo y calidez humana hacen toda la diferencia.',
    stars: 5,
    photo: 'assets/images/testimonials/ana-gutierrez.svg',
  },
  {
    name: 'Jorge Henríquez',
    role: 'Familiar',
    text: 'Atendieron a mi madre con un cariño y compromiso únicos. Tecnología de primera y un trato impecable.',
    stars: 5,
    photo: 'assets/images/testimonials/jorge-henriquez.svg',
  },
  {
    name: 'Marta Linares',
    role: 'Paciente',
    text: 'Desde el primer momento sentí confianza. La Dra. Álvarez explicó todo con paciencia y claridad.',
    stars: 5,
    photo: 'assets/images/testimonials/marta-linares.svg',
  },
  {
    name: 'Luis Hernández',
    role: 'Paciente',
    text: 'Las instalaciones son modernas, limpias y todo el personal te hace sentir como en casa.',
    stars: 4,
    photo: 'assets/images/testimonials/luis-hernandez.svg',
  },
];

// ---- DOM ready ----
// Wait for HTML partials (sections/*.html) to be injected before initializing.
const bootstrap = () => {
  initLoader();
  initTheme();
  renderLogos();
  initNavbar();
  initMobileMenu();
  initCounters();
  initAOS();
  renderDoctors();
  populateDoctorSelect();
  renderTestimonials();
  renderInsurersMarquee();
  initBookingForm();
  initFloatingWhatsApp();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Min date = today
  const dateInput = document.getElementById('f_date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
};

if (window.includesReady) {
  window.includesReady.then(bootstrap);
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

// ---- Loader ----
function initLoader() {
  const hide = () => setTimeout(() => document.getElementById('loader')?.classList.add('hidden'), 200);
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
}

// ---- Theme ----
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('oncomedic-theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('oncomedic-theme', root.classList.contains('dark') ? 'dark' : 'light');
  });
}

// ---- Render logos from branding config ----
function renderLogos() {
  const containers = document.querySelectorAll('.logo-container');
  containers.forEach((container) => {
    container.innerHTML = `
      <img src="${BRANDING.logo.image}" alt="${BRANDING.logo.alt}" width="${BRANDING.logo.width}" height="${BRANDING.logo.height}" class="rounded-lg" />
      <span class="font-display font-extrabold text-lg tracking-tight">
        <span style="color: ${BRANDING.name.prefixColor};">${BRANDING.name.prefix}</span>${BRANDING.name.highlight}
      </span>
    `;
  });
}

// ---- Navbar scroll state ----
function initNavbar() {
  const nav = document.getElementById('navbar');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Mobile menu ----
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  btn?.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
}

// ---- Counters ----
function initCounters() {
  const els = document.querySelectorAll('[data-counter]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || '';
      const dur = 1600;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}

// ---- AOS ----
function initAOS() {
  if (window.AOS) AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 60 });
}

// ---- Doctors ----
function renderDoctors() {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;
  grid.innerHTML = doctors.map((d, i) => `
    <article class="doctor-card group rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden shadow-soft" data-aos="fade-up" data-aos-delay="${i * 80}">
      <div class="relative h-64 overflow-hidden">
        <img src="${d.photo}" alt="${d.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent"></div>
        <span class="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-brand-700">
          ${d.specialty}
        </span>
      </div>
      <div class="p-6">
        <h3 class="font-display text-xl font-extrabold">${d.name}</h3>
        <p class="text-sm text-slate-500 mt-1">${d.experience}</p>
        <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">${d.bio}</p>
        <div class="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4 text-brand-600"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          <span>${d.schedule}</span>
        </div>
        <button class="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition" data-book="${d.id}">
          Agendar cita
        </button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-book]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-book');
      const select = document.getElementById('f_doctor');
      if (select) select.value = id;
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---- Populate booking select ----
function populateDoctorSelect() {
  const select = document.getElementById('f_doctor');
  if (!select) return;
  doctors.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = `${d.name} — ${d.specialty}`;
    select.appendChild(opt);
  });
}

// ---- Testimonials carousel ----
function renderTestimonials() {
  const slides = document.getElementById('testimonialSlides');
  const dots = document.getElementById('testimonialDots');
  if (!slides) return;

  slides.innerHTML = testimonials.map(t => `
    <div class="testimonial-slide">
      <div class="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-soft text-center">
        <div class="flex justify-center stars text-amber-400 mb-4">
          ${Array.from({ length: 5 }, (_, i) => `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${i < t.stars ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" class="w-5 h-5">
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          `).join('')}
        </div>
        <p class="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">"${t.text}"</p>
        <div class="mt-6 flex items-center justify-center gap-3">
          <img src="${t.photo}" alt="${t.name}" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow" loading="lazy" />
          <div class="text-left">
            <p class="font-semibold">${t.name}</p>
            <p class="text-xs text-slate-500">${t.role}</p>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = testimonials.map((_, i) =>
    `<button class="w-2.5 h-2.5 rounded-full bg-slate-300 transition" data-dot="${i}" aria-label="Ir a testimonio ${i+1}"></button>`
  ).join('');

  let index = 0;
  const total = testimonials.length;
  const update = () => {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.querySelectorAll('[data-dot]').forEach((d, i) => {
      d.classList.toggle('bg-brand-600', i === index);
      d.classList.toggle('w-6', i === index);
      d.classList.toggle('bg-slate-300', i !== index);
    });
  };
  update();

  document.getElementById('prevTestimonial').addEventListener('click', () => { index = (index - 1 + total) % total; update(); });
  document.getElementById('nextTestimonial').addEventListener('click', () => { index = (index + 1) % total; update(); });
  dots.querySelectorAll('[data-dot]').forEach(d => d.addEventListener('click', () => { index = +d.dataset.dot; update(); }));

  // Auto-rotate
  setInterval(() => { index = (index + 1) % total; update(); }, 6500);
}

// ---- Booking form → WhatsApp ----
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const doctorId = document.getElementById('f_doctor').value;
    const doctor = doctors.find(d => d.id === doctorId);
    const date = document.getElementById('f_date').value;
    const time = document.getElementById('f_time').value;
    const name = document.getElementById('f_name').value.trim();
    const phone = document.getElementById('f_phone').value.trim();
    const email = document.getElementById('f_email').value.trim();
    const reason = document.getElementById('f_reason').value.trim();

    const message =
`Hola, deseo agendar una cita en OncoMedic.

Nombre: ${name}
Teléfono: ${phone}
Correo: ${email}
Doctor: ${doctor ? doctor.name + ' (' + doctor.specialty + ')' : '—'}
Fecha: ${formatDate(date)}
Hora: ${time}
Motivo de consulta: ${reason}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  });
}

function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// ---- Insurers infinite marquee ----
// Each logo is an inline SVG so it always renders (no external dependencies)
// and the grayscale → color effect works seamlessly.
const insurers = [
  {
    name: 'PALIG',
    sub: 'Pan-American Life',
    svg: `<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="#003366">
        <circle cx="28" cy="30" r="18" fill="none" stroke="#003366" stroke-width="3"/>
        <path d="M20 22 L36 30 L20 38 Z" fill="#e30613"/>
      </g>
      <text x="58" y="38" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="26" fill="#003366" letter-spacing="2">PALIG</text>
    </svg>`
  },
  {
    name: 'SISA',
    sub: 'Seguros SISA',
    svg: `<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="32" height="32" rx="6" fill="#e30613"/>
      <text x="22" y="38" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="22" fill="#fff">S</text>
      <text x="52" y="40" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="30" fill="#1a1a1a" letter-spacing="1">SISA</text>
    </svg>`
  },
  {
    name: 'MAPFRE',
    sub: 'Seguros',
    svg: `<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="18" width="24" height="24" fill="#e30613"/>
      <rect x="32" y="18" width="24" height="24" fill="#e30613"/>
      <text x="64" y="40" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="26" fill="#1a1a1a" letter-spacing="1">MAPFRE</text>
    </svg>`
  },
  {
    name: 'ASESUISA',
    sub: 'Seguros',
    svg: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="30" r="14" fill="#0a3a82"/>
      <path d="M18 30 L24 24 L30 30 L24 36 Z" fill="#fff"/>
      <text x="46" y="38" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="22" fill="#0a3a82" letter-spacing="1">ASESUISA</text>
    </svg>`
  },
  {
    name: 'BUPA',
    sub: 'Global Health',
    svg: `<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="60" height="32" rx="16" fill="#0079c1"/>
      <text x="36" y="37" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="20" fill="#fff" letter-spacing="0.5">Bupa</text>
      <text x="78" y="38" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="700" font-size="18" fill="#0079c1">Global Health</text>
    </svg>`
  },
  {
    name: 'AXA',
    sub: 'Assistance',
    svg: `<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="58" height="32" fill="#00008f"/>
      <text x="35" y="38" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="22" fill="#fff" letter-spacing="2">AXA</text>
      <rect x="68" y="14" width="32" height="32" fill="#ff1721"/>
    </svg>`
  },
  {
    name: 'ASSA',
    sub: 'Compañía de Seguros',
    svg: `<svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 44 L24 16 L38 44 Z" fill="#d4001a"/>
      <text x="48" y="40" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="900" font-size="28" fill="#1a1a1a" letter-spacing="2">ASSA</text>
    </svg>`
  },
];

function renderInsurersMarquee() {
  const track = document.getElementById('insurersTrack');
  if (!track) return;

  // Duplicate the list so the loop is seamless when translateX reaches -50%
  const html = insurers.map(buildInsurerItem).join('');
  track.innerHTML = html + html;

  // Adjust duration based on number of items so speed feels constant
  const speedPxPerSec = 60;
  const totalWidth = track.scrollWidth / 2; // single set
  const duration = Math.max(20, Math.round(totalWidth / speedPxPerSec));
  track.style.setProperty('--marquee-duration', duration + 's');

  // Center detection
  const marquee = document.getElementById('insurersMarquee');
  let rafId;
  const tick = () => {
    const rect = marquee.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    let closest = null;
    let closestDist = Infinity;
    const items = track.children;
    for (let i = 0; i < items.length; i++) {
      const r = items[i].getBoundingClientRect();
      // Skip items not currently visible inside the marquee
      if (r.right < rect.left || r.left > rect.right) continue;
      const itemCenter = r.left + r.width / 2;
      const dist = Math.abs(itemCenter - centerX);
      if (dist < closestDist) { closestDist = dist; closest = items[i]; }
    }
    for (let i = 0; i < items.length; i++) {
      items[i].classList.toggle('is-center', items[i] === closest);
    }
    rafId = requestAnimationFrame(tick);
  };

  // Pause loop when not visible (saves CPU)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!rafId) rafId = requestAnimationFrame(tick);
      } else if (rafId) {
        cancelAnimationFrame(rafId); rafId = null;
      }
    });
  }, { threshold: 0 });
  io.observe(marquee);
}

function buildInsurerItem(ins) {
  return `
    <div class="marquee-item" role="img" aria-label="${ins.name}">
      <div class="logo-svg">${ins.svg}</div>
      <span class="logo-sub">${ins.sub}</span>
    </div>`;
}

// ---- Floating WhatsApp ----
function initFloatingWhatsApp() {
  const link = document.getElementById('floatingWa');
  if (!link) return;
  const msg = 'Hola, me gustaría más información sobre OncoMedic.';
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
