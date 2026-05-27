/* =========================================================
   Branding Configuration
   - Centralized logo and brand configuration
   - Used by navbar and footer
   - Modify once, updates everywhere
   ========================================================= */

const BRANDING = {
  // Logo configuration
  logo: {
    image: 'assets/images/logo.svg', // ← Cambia la ruta si tu logo está en otro lugar
    alt: 'OncoMedic Logo',
    width: 36,  // ancho del logo en px
    height: 36, // alto del logo en px
  },
  
  // Brand name parts
  name: {
    prefix: 'Onco',
    prefixColor: '#00FFFF',
    highlight: 'Medic',
  },

  // Social media links
  social: {
    facebook: 'https://www.facebook.com/oncomedicelsalvador/',
    instagram: 'https://www.instagram.com/oncomedicsv',
    tiktok: 'https://www.tiktok.com/@oncomedic',
    youtube: 'https://www.youtube.com/@oncomedic',
  },

  // Contact info
  contact: {
    address: '5av Norte #1-7, Santa Tecla, La Libertad',
    phone: '+503 7755-6733',
    email: 'contacto@oncomedic.com',
  },

  // Schedule
  schedule: {
    weekday: 'Lunes – Viernes: 7:00 – 19:00',
    saturday: 'Sábado: 8:00 – 14:00',
    sunday: 'Domingo: Emergencias 24/7',
  },

  // Insurers
  insurers: ['PALIG', 'SISA', 'MAPFRE', 'ASESUISA'],
};

// Función para generar el HTML del logo
function renderLogo(isDark = false) {
  const textColor = isDark ? 'text-brand-400' : 'text-brand-600';
  return `
    <img src="${BRANDING.logo.image}" alt="${BRANDING.logo.alt}" width="${BRANDING.logo.width}" height="${BRANDING.logo.height}" class="rounded-lg" />
    <span class="font-display font-extrabold text-lg tracking-tight">
      ${BRANDING.name.prefix}<span class="${textColor}">${BRANDING.name.highlight}</span>
    </span>
  `;
}

// Función para generar los botones de redes sociales
function renderSocialLinks() {
  const icons = {
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M22 12a10 10 0 1 0-11.56 9.88v-7H8v-2.88h2.44V9.84c0-2.41 1.43-3.74 3.62-3.74 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5v1.8h2.66l-.43 2.88h-2.23v7A10 10 0 0 0 22 12Z"/></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.22.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.05.42 2.22.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.17-1.05.37-2.22.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.05-.42-2.22C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.37 2.22-.42C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04C2.67 9.84 2.66 10.18 2.66 12s0 2.16.07 3.4c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.07-1.24.07-1.59.07-3.4s0-2.16-.07-3.4c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.83-1.27a3.42 3.42 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38C15.5 4 15.16 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 3.14 3.14A3.14 3.14 0 0 0 12 8.86Zm5.14-2.07a1.16 1.16 0 1 1-1.15 1.16 1.16 1.16 0 0 1 1.15-1.16Z"/></svg>',
    tiktok: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v12.7a2.85 2.85 0 1 1-5.45-2.36c.34-.46.77-.84 1.24-1.09V9.05a6.4 6.4 0 0 0-5.16 12.36A6.37 6.37 0 0 0 9 19.54v-3.68a4.8 4.8 0 0 0 3.54 1.41V22c3.02 0 5.59-2.46 5.59-5.5 0-.64-.1-1.27-.3-1.87v-5.96z"/></svg>',
    youtube: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  };

  return Object.entries(BRANDING.social).map(([platform, url]) => `
    <a href="${url}" aria-label="${platform.charAt(0).toUpperCase() + platform.slice(1)}" target="_blank" rel="noopener" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-600 flex items-center justify-center transition">
      ${icons[platform]}
    </a>
  `).join('');
}
