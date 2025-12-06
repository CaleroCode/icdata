const API_BASE = "https://icdata-api.onrender.com";

// idioma actual
let currentLang = "es";

// Variables del tema personalizado
let themeSettings = {
  hue: 160,          // 160 = verde/esmeralda por defecto
  saturation: 100,   // 100% = saturación completa
  brightness: 100    // 100% = brillo normal
};

// Cargar tema guardado desde localStorage
function loadThemeSettings() {
  const saved = localStorage.getItem("themeSettings");
  if (saved) {
    try {
      themeSettings = JSON.parse(saved);
    } catch (e) {
      console.error("Error cargando tema guardado", e);
    }
  }
  applyTheme();
}

// Guardar tema en localStorage
function saveThemeSettings() {
  localStorage.setItem("themeSettings", JSON.stringify(themeSettings));
}

// Aplicar el tema al documento
function applyTheme() {
  const hue = themeSettings.hue;
  const sat = themeSettings.saturation;
  const bright = themeSettings.brightness;
  
  // Crear variables CSS dinámicas basadas en HSL
  // El color principal será con saturación y brillo personalizados
  const root = document.documentElement;
  
  // Colores derivados del HSL del usuario
  const primary = `hsl(${hue}, ${sat}%, ${50 * (bright / 100)}%)`; // color base
  const primaryLight = `hsl(${hue}, ${sat}%, ${65 * (bright / 100)}%)`; // versión clara
  const primaryDark = `hsl(${hue}, ${sat}%, ${35 * (bright / 100)}%)`; // versión oscura
  
  // Aplicar variables CSS
  root.style.setProperty("--color-primary", primary);
  root.style.setProperty("--color-primary-light", primaryLight);
  root.style.setProperty("--color-primary-dark", primaryDark);
  
  // Actualizar todas las clases que usan emerald-400 dinámicamente
  // Usaremos un CSS personalizado que se actualice
  updateThemeStyles(hue, sat, bright);
}

// Actualizar estilos CSS dinámicos
function updateThemeStyles(hue, sat, bright) {
  let styleEl = document.getElementById("dynamic-theme-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "dynamic-theme-styles";
    document.head.appendChild(styleEl);
  }
  
  const baseHSL = (lightness) => `hsl(${hue}, ${sat}%, ${lightness * (bright / 100)}%)`;
  const css = `
    :root {
      --hue: ${hue};
      --sat: ${sat}%;
      --bright: ${bright}%;
    }
    
    .text-emerald-400,
    .border-emerald-400,
    .hover\\:text-emerald-400:hover,
    .hover\\:border-emerald-400:hover {
      --tw-text-opacity: 1;
      color: ${baseHSL(60)} !important;
      border-color: ${baseHSL(60)} !important;
    }
    
    .decoration-emerald-400\\/60 {
      text-decoration-color: ${baseHSL(60)} !important;
    }
    
    .bg-emerald-400 {
      background-color: ${baseHSL(60)} !important;
    }
    
    /* Scrollbar también toma el color del tema */
    html::-webkit-scrollbar-thumb {
      background: ${baseHSL(50)} !important;
    }
    
    html::-webkit-scrollbar-thumb:hover {
      background: ${baseHSL(65)} !important;
    }
    
    /* Variables para cualquier componente que use emerald */
    .emerald-300 {
      color: ${baseHSL(70)} !important;
    }
    
    .emerald-400 {
      color: ${baseHSL(60)} !important;
    }
    
    .text-emerald-300 {
      color: ${baseHSL(70)} !important;
    }
    
    .text-emerald-300\/50 {
      color: ${baseHSL(70)}80 !important;
    }
  `;
  
  styleEl.textContent = css;
}

// Traducucciones estáticas (navbar, títulos, contacto, hero, etc.)
const TRANSLATIONS = {
  es: {
    hero_tagline: "portafolio profesional",
    hero_title:
      '¡Hola, soy <span class="text-emerald-400">Iván Calero</span>!<br />Doy forma a ideas con <span class="underline decoration-emerald-400/60">imagen y código</span>.',

    nav_about: "Sobre mí",
    nav_github: "GitHub",
    nav_projects: "Proyectos",
    nav_instagram: "Fotografía",
    nav_notes: "Notas",
    nav_contact: "Contacto",

    github_title: "Proyectos destacados de GitHub",
    github_subtitle: "Datos servidos por el backend en Python",

    projects_title: "Proyectos destacados",
    projects_subtitle: "Un poco más de contexto sobre lo que construyo",

    instagram_title: "Fotografía & visual",
    instagram_subtitle:
      "¡Puedes ver todas mis fotografías en Instagram!",

    notes_title: "Notas",
    notes_subtitle: "Pequeños resúmenes de lo que voy aprendiendo",

    contact_title: "¿Hablamos?",
    contact_text:
      "Estoy abierto a oportunidades como desarrollador full stack junior, proyectos creativos y colaboraciones donde pueda unir desarrollo web, diseño visual y fotografía.",
    contact_email_link: "Prometo leerlo con café ☕",
    contact_linkedin_link: "Ver perfil",
    contact_btn_email: "Escríbeme",
    contact_btn_linkedin: "Ver LinkedIn",
    contact_btn_cv: "Descargar CV (PDF)",
  

    footer_tagline: "Hecho con FastAPI, TailwindCSS y mucho café ☕",
  },
  en: {
    hero_tagline: "professional portfolio",
    hero_title:
      'Hi, I\'m <span class="text-emerald-400">Iván Calero</span>!<br />I shape ideas with <span class="underline decoration-emerald-400/60">image and code</span>.',

    nav_about: "About me",
    nav_github: "GitHub",
    nav_projects: "Projects",
    nav_instagram: "Photography",
    nav_notes: "Notes",
    nav_contact: "Contact",

    github_title: "Featured GitHub projects",
    github_subtitle: "Data served by the Python backend",

    projects_title: "Featured projects",
    projects_subtitle: "A bit more context about what I build",

    instagram_title: "Photography & visual",
    instagram_subtitle: "A bit of what I see when I'm not coding",

    notes_title: "Notes",
    notes_subtitle: "Short summaries of what I'm learning",

    contact_title: "Shall we talk?",
    contact_text:
      "I am open to opportunities as a junior full stack developer, creative projects and collaborations where I can combine web development, visual design and photography.",
    contact_email_link: "I promise to read it with a coffee ☕",
    contact_linkedin_link: "View profile",
    contact_btn_email: "Write to me",
    contact_btn_linkedin: "View LinkedIn",
    contact_btn_cv: "Download CV (PDF)",

    footer_tagline: "Made with FastAPI, TailwindCSS and a lot of coffee ☕",
  },
};

function applyTranslations() {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS["es"];

  const map = {
    "hero-tagline": "hero_tagline",

    "nav-about": "nav_about",
    "nav-github": "nav_github",
    "nav-projects": "nav_projects",
    "nav-instagram": "nav_instagram",
    "nav-notes": "nav_notes",
    "nav-contact": "nav_contact",

    // NAV MÓVIL
    "nav-about-mobile": "nav_about",
    "nav-github-mobile": "nav_github",
    "nav-projects-mobile": "nav_projects",
    "nav-instagram-mobile": "nav_instagram",
    "nav-notes-mobile": "nav_notes",
    "nav-contact-mobile": "nav_contact",

    "github-title": "github_title",
    "github-subtitle": "github_subtitle",

    "projects-title": "projects_title",
    "projects-subtitle": "projects_subtitle",

    "instagram-title": "instagram_title",
    "instagram-subtitle": "instagram_subtitle",

    "notes-title": "notes_title",
    "notes-subtitle": "notes_subtitle",

    "contact-title": "contact_title",
    "contact-text": "contact_text",
    "contact-email-link": "contact_email_link",
    "contact-linkedin-link": "contact_linkedin_link",
    "contact-btn-email": "contact_btn_email",
    "contact-btn-linkedin": "contact_btn_linkedin",
    "contact-btn-cv": "contact_btn_cv",

    "footer-tagline": "footer_tagline",
  };

  // Elementos que se actualizan con textContent
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && t[key]) {
      el.textContent = t[key];
    }
  });

  // El título del hero necesita innerHTML para mantener los spans y el <br />
  const heroTitleEl = document.getElementById("hero-title");
  if (heroTitleEl && t.hero_title) {
    heroTitleEl.innerHTML = t.hero_title;
  }
}

// ----- Modal de fotos Instagram -----
const modal = document.getElementById("photo-modal");
const modalContent = document.getElementById("modal-content");
const modalImg = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const modalClose = document.getElementById("modal-close");

/**
 * Modal de fotos:
 * - MISMA imagen
 * - Caption COMPLETO
 * - Animación de pop (usando clase CSS .photo-spin-zoom si existe)
 */
function openModal(photo, imgEl) {
  if (!modal || !modalContent || !modalImg || !modalCaption) return;

  modalImg.src = photo.image_url;
  modalImg.alt = photo.caption || "";
  modalCaption.textContent = photo.caption || "";

  modal.classList.remove("hidden");

  modalContent.classList.remove("photo-spin-zoom");
  modalContent.style.opacity = "0";
  void modalContent.offsetWidth;
  modalContent.classList.add("photo-spin-zoom");
}

function closeModal() {
  if (!modal || !modalContent) return;
  modalContent.classList.remove("photo-spin-zoom");
  modalContent.style.opacity = "0";
  modal.classList.add("hidden");
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// ----- Modal de notas / artículos -----
const noteModal = document.getElementById("note-modal");
const noteModalTitle = document.getElementById("note-modal-title");
const noteModalContent = document.getElementById("note-modal-content");
const noteModalClose = document.getElementById("note-modal-close");

function openNoteModal(note) {
  if (!noteModal || !noteModalTitle || !noteModalContent) return;

  noteModalTitle.textContent = note.title || "";

  const rawContent = note.content || "";
  const paragraphs = rawContent.split(/\n\s*\n/);

  noteModalContent.innerHTML = paragraphs
    .map((p) => `<p class="mb-3">${p.trim().replace(/\n/g, "<br/>")}</p>`)
    .join("");

  noteModal.classList.remove("hidden");
}

function closeNoteModal() {
  if (!noteModal) return;
  noteModal.classList.add("hidden");
}

if (noteModalClose) {
  noteModalClose.addEventListener("click", closeNoteModal);
}

if (noteModal) {
  noteModal.addEventListener("click", (e) => {
    if (e.target === noteModal) {
      closeNoteModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeNoteModal();
  }
});

async function fetchNoteDetail(slug) {
  try {
    const res = await fetch(`${API_BASE}/api/notes/${slug}?lang=${currentLang}`);
    if (!res.ok) throw new Error(`Nota: status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error cargando nota", err);
    return null;
  }
}

// ----- Selector de idioma (desktop + móvil) -----
function setupLangSwitch() {
  const btnEs = document.getElementById("lang-es");
  const btnEn = document.getElementById("lang-en");
  const btnEsMobile = document.getElementById("lang-es-mobile");
  const btnEnMobile = document.getElementById("lang-en-mobile");

  const esButtons = [btnEs, btnEsMobile].filter(Boolean);
  const enButtons = [btnEn, btnEnMobile].filter(Boolean);

  function applyActiveStyles() {
    esButtons.forEach((btn) => {
      btn.classList.remove("border-slate-700", "text-slate-400");
      btn.classList.add("border-emerald-400", "text-emerald-300");
    });

    enButtons.forEach((btn) => {
      btn.classList.remove("border-emerald-400", "text-emerald-300");
      btn.classList.add("border-slate-700", "text-slate-400");
    });

    if (currentLang === "en") {
      // invertimos estilos
      esButtons.forEach((btn) => {
        btn.classList.add("border-slate-700", "text-slate-400");
        btn.classList.remove("border-emerald-400", "text-emerald-300");
      });
      enButtons.forEach((btn) => {
        btn.classList.add("border-emerald-400", "text-emerald-300");
        btn.classList.remove("border-slate-700", "text-slate-400");
      });
    }
  }

  function changeLang(lang) {
    if (currentLang === lang) return;
    currentLang = lang;
    applyActiveStyles();
    applyTranslations();
    loadProfile();
    
    // Recargar secciones de lazy loading si ya fueron cargadas
    const notesSection = document.getElementById("notes");
    if (notesSection && notesSection.dataset.notesLoaded) {
      loadNotes();
    }
    
    // GitHub no necesita recarga por idioma (es independiente del idioma)
    // Instagram tampoco necesita recarga por idioma
  }

  esButtons.forEach((btn) =>
    btn.addEventListener("click", () => changeLang("es"))
  );
  enButtons.forEach((btn) =>
    btn.addEventListener("click", () => changeLang("en"))
  );

  // estado inicial
  applyActiveStyles();
}

// ----- Selector de tema personalizado -----
function setupThemeSwitch() {
  const themeToggle = document.getElementById("theme-toggle");
  const themePanel = document.getElementById("theme-panel");
  const hueSlider = document.getElementById("hue-slider");
  const saturationSlider = document.getElementById("saturation-slider");
  const brightnessSlider = document.getElementById("brightness-slider");
  const hueValue = document.getElementById("hue-value");
  const saturationValue = document.getElementById("saturation-value");
  const brightnessValue = document.getElementById("brightness-value");
  const themeReset = document.getElementById("theme-reset");

  // Controles móviles
  const hueSlideMobile = document.getElementById("theme-mobile-hue");
  const saturationSlideMobile = document.getElementById("theme-mobile-sat");
  const brightnessSlideMobile = document.getElementById("theme-mobile-bright");
  const hueValueMobile = document.getElementById("theme-mobile-hue-value");
  const saturationValueMobile = document.getElementById("theme-mobile-sat-value");
  const brightnessValueMobile = document.getElementById("theme-mobile-bright-value");
  const themeResetMobile = document.getElementById("theme-mobile-reset");

  if (!themeToggle || !themePanel) return;

  // Mostrar/ocultar panel
  themeToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    themePanel.classList.toggle("hidden");
  });

  // Cerrar panel al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#theme-toggle") && !e.target.closest("#theme-panel")) {
      themePanel.classList.add("hidden");
    }
  });

  // Actualizar tema con los sliders
  const updateFromSliders = () => {
    themeSettings.hue = parseInt(hueSlider.value);
    themeSettings.saturation = parseInt(saturationSlider.value);
    themeSettings.brightness = parseInt(brightnessSlider.value);
    
    // Sincronizar sliders móviles
    if (hueSlideMobile) hueSlideMobile.value = themeSettings.hue;
    if (saturationSlideMobile) saturationSlideMobile.value = themeSettings.saturation;
    if (brightnessSlideMobile) brightnessSlideMobile.value = themeSettings.brightness;
    
    applyTheme();
    saveThemeSettings();
    updateLabels();
  };

  const updateFromSlidersMobile = () => {
    if (!hueSlideMobile) return;
    
    themeSettings.hue = parseInt(hueSlideMobile.value);
    themeSettings.saturation = parseInt(saturationSlideMobile.value);
    themeSettings.brightness = parseInt(brightnessSlideMobile.value);
    
    // Sincronizar sliders desktop
    if (hueSlider) hueSlider.value = themeSettings.hue;
    if (saturationSlider) saturationSlider.value = themeSettings.saturation;
    if (brightnessSlider) brightnessSlider.value = themeSettings.brightness;
    
    applyTheme();
    saveThemeSettings();
    updateLabels();
  };

  const updateLabels = () => {
    const hueNames = [
      "Rojo", "Naranja", "Amarillo", "Verde claro", "Verde", 
      "Verde/Cian", "Cian", "Azul", "Morado", "Magenta", "Rojo"
    ];
    const hue = themeSettings.hue;
    const index = Math.round(hue / 36) % hueNames.length;
    
    // Actualizar desktop
    if (hueValue) hueValue.textContent = `${hue}° (${hueNames[index]})`;
    if (saturationValue) saturationValue.textContent = `${themeSettings.saturation}%`;
    if (brightnessValue) brightnessValue.textContent = `${themeSettings.brightness}%`;
    
    // Actualizar móvil
    if (hueValueMobile) hueValueMobile.textContent = `${hue}°`;
    if (saturationValueMobile) saturationValueMobile.textContent = `${themeSettings.saturation}%`;
    if (brightnessValueMobile) brightnessValueMobile.textContent = `${themeSettings.brightness}%`;
  };

  // Event listeners desktop
  if (hueSlider) hueSlider.addEventListener("input", updateFromSliders);
  if (saturationSlider) saturationSlider.addEventListener("input", updateFromSliders);
  if (brightnessSlider) brightnessSlider.addEventListener("input", updateFromSliders);

  // Event listeners móvil
  if (hueSlideMobile) hueSlideMobile.addEventListener("input", updateFromSlidersMobile);
  if (saturationSlideMobile) saturationSlideMobile.addEventListener("input", updateFromSlidersMobile);
  if (brightnessSlideMobile) brightnessSlideMobile.addEventListener("input", updateFromSlidersMobile);

  // Resetear a valores por defecto (desktop)
  if (themeReset) {
    themeReset.addEventListener("click", () => {
      themeSettings = { hue: 160, saturation: 100, brightness: 100 };
      if (hueSlider) hueSlider.value = 160;
      if (saturationSlider) saturationSlider.value = 100;
      if (brightnessSlider) brightnessSlider.value = 100;
      if (hueSlideMobile) hueSlideMobile.value = 160;
      if (saturationSlideMobile) saturationSlideMobile.value = 100;
      if (brightnessSlideMobile) brightnessSlideMobile.value = 100;
      saveThemeSettings();
      applyTheme();
      updateLabels();
    });
  }

  // Resetear a valores por defecto (móvil)
  if (themeResetMobile) {
    themeResetMobile.addEventListener("click", () => {
      themeSettings = { hue: 160, saturation: 100, brightness: 100 };
      if (hueSlider) hueSlider.value = 160;
      if (saturationSlider) saturationSlider.value = 100;
      if (brightnessSlider) brightnessSlider.value = 100;
      if (hueSlideMobile) hueSlideMobile.value = 160;
      if (saturationSlideMobile) saturationSlideMobile.value = 100;
      if (brightnessSlideMobile) brightnessSlideMobile.value = 100;
      saveThemeSettings();
      applyTheme();
      updateLabels();
    });
  }

  // Inicializar labels
  updateLabels();
}

// ----- Menú hamburguesa (móvil) -----
function setupMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("menu-icon-open");
  const iconClose = document.getElementById("menu-icon-close");

  if (!toggleBtn || !mobileMenu) return;

  function setMenuState(open) {
    if (open) {
      mobileMenu.classList.remove("hidden");
      toggleBtn.setAttribute("aria-expanded", "true");
      if (iconOpen && iconClose) {
        iconOpen.classList.add("hidden");
        iconClose.classList.remove("hidden");
      }
    } else {
      mobileMenu.classList.add("hidden");
      toggleBtn.setAttribute("aria-expanded", "false");
      if (iconOpen && iconClose) {
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
      }
    }
  }

  let isOpen = false;

  toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    setMenuState(isOpen);
  });

  // Cerrar el menú al hacer click en cualquier enlace del menú móvil
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      isOpen = false;
      setMenuState(false);
    });
  });
}

// ----- Inicio -----
// Lazy loading con Intersection Observer para GitHub, Instagram y Notas
const observerOptions = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.loaded) {
      entry.target.dataset.loaded = "true";
      
      if (entry.target.id === "github" && !entry.target.dataset.githubLoaded) {
        entry.target.dataset.githubLoaded = "true";
        loadGithubRepos();
      }
      if (entry.target.id === "instagram" && !entry.target.dataset.instagramLoaded) {
        entry.target.dataset.instagramLoaded = "true";
        loadInstagramPhotos();
      }
      if (entry.target.id === "notes" && !entry.target.dataset.notesLoaded) {
        entry.target.dataset.notesLoaded = "true";
        loadNotes();
      }
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  // Cargar tema guardado PRIMERO, antes de aplicar traducciones
  loadThemeSettings();
  
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  setupLangSwitch();
  setupMobileMenu();
  setupThemeSwitch();
  applyTranslations();
  loadProfile();

  // Observer para lazy loading de GitHub, Instagram y Notas
  const githubSection = document.getElementById("github");
  const instagramSection = document.getElementById("instagram");
  const notesSection = document.getElementById("notes");

  if (githubSection) sectionObserver.observe(githubSection);
  if (instagramSection) sectionObserver.observe(instagramSection);
  if (notesSection) sectionObserver.observe(notesSection);

  // Scroll-to-top
  const scrollBtn = document.getElementById("scroll-top");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.remove(
          "opacity-0",
          "pointer-events-none",
          "translate-y-4"
        );
        scrollBtn.classList.add(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
      } else {
        scrollBtn.classList.add(
          "opacity-0",
          "pointer-events-none",
          "translate-y-4"
        );
        scrollBtn.classList.remove(
          "opacity-100",
          "pointer-events-auto",
          "translate-y-0"
        );
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// ----- Perfil -----
async function loadProfile() {
  const bioContainer = document.getElementById("profile-bio");
  const skillsContainer = document.getElementById("skills");
  const linkGithub = document.getElementById("link-github");
  const linkInstagram = document.getElementById("link-instagram");
  const linkLinkedin = document.getElementById("link-linkedin");
  const allReposLink = document.getElementById("all-repos-link");
  const instagramMoreLink = document.getElementById("instagram-link-more");

  try {
    const res = await fetch(`${API_BASE}/api/profile?lang=${currentLang}`);
    if (!res.ok) {
      throw new Error(`Perfil: status ${res.status}`);
    }
    const data = await res.json();

    // Bio en varios párrafos
    if (bioContainer) {
      bioContainer.innerHTML = "";
      const paragraphs = data.bio.split(/\n\s*\n/);
      paragraphs.forEach((para) => {
        const p = document.createElement("p");
        p.className = "mb-3";
        p.textContent = para.trim();
        bioContainer.appendChild(p);
      });
    }

    // Links
    if (linkGithub && data.links?.github) {
      linkGithub.href = data.links.github;
    }
    if (linkInstagram && data.links?.instagram) {
      linkInstagram.href = data.links.instagram;
    }
    if (linkLinkedin && data.links?.linkedin) {
      linkLinkedin.href = data.links.linkedin;
    }

    if (allReposLink && data.links?.github) {
      allReposLink.href = `${data.links.github}?tab=repositories`;
    }

    if (instagramMoreLink && data.links?.instagram) {
      instagramMoreLink.href = data.links.instagram;
    }

    // Skills agrupadas por categorías
    if (skillsContainer && data.skills && typeof data.skills === "object") {
      skillsContainer.innerHTML = "";

      Object.entries(data.skills).forEach(([category, list]) => {
        const block = document.createElement("div");
        block.className = "mb-4";

        const title = document.createElement("p");
        title.className =
          "text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1";
        title.textContent = category;
        block.appendChild(title);

        const listWrapper = document.createElement("div");
        listWrapper.className = "flex flex-wrap gap-2";

        list.forEach((skill) => {
          const badge = document.createElement("span");
          badge.className =
            "px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200";
          badge.textContent = skill;
          listWrapper.appendChild(badge);
        });

        block.appendChild(listWrapper);
        skillsContainer.appendChild(block);
      });
    }
  } catch (err) {
    console.error("Error cargando profile", err);
    if (bioContainer) {
      bioContainer.textContent =
        "No se ha podido cargar la información del perfil.";
    }
  }
}

// ----- GitHub repos -----
async function loadGithubRepos() {
  const container = document.getElementById("github-repos");
  if (!container) return;

  container.innerHTML =
    "<p class='text-xs text-slate-400'>Cargando repos...</p>";
  try {
    const res = await fetch(`${API_BASE}/api/github-repos`);
    if (!res.ok) {
      throw new Error(`Repos: status ${res.status}`);
    }
    const repos = await res.json();

    container.innerHTML = "";
    repos.forEach((repo) => {
      const card = document.createElement("a");
      card.href = repo.url;
      card.target = "_blank";
      card.className =
        "block bg-slate-900 border border-slate-800 hover:border-emerald-400/70 rounded-2xl p-4 transition shadow-sm hover:shadow-lg";

      card.innerHTML = `
        <h3 class="font-semibold text-sm mb-1">${repo.name}</h3>
        <p class="text-xs text-slate-300 mb-3">${repo.description}</p>
        <div class="flex flex-wrap gap-1 text-[0.65rem] text-emerald-300">
          ${
            repo.topics
              ? repo.topics
                  .map(
                    (t) =>
                      `<span class="px-2 py-1 rounded-full bg-slate-950 border border-slate-700">${t}</span>`
                  )
                  .join("")
              : ""
          }
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando repos", err);
    container.innerHTML =
      "<p class='text-xs text-red-400'>No se pudieron cargar los repositorios.</p>";
  }
}

// ----- Instagram fotos -----
async function loadInstagramPhotos() {
  const container = document.getElementById("instagram-photos");
  if (!container) return;

  container.innerHTML =
    "<p class='text-xs text-slate-400'>Cargando fotos...</p>";
  try {
    const res = await fetch(`${API_BASE}/api/instagram-photos`);
    if (!res.ok) {
      throw new Error(`Fotos: status ${res.status}`);
    }
    const photos = await res.json();

    container.innerHTML = "";

    photos.forEach((photo) => {
      const card = document.createElement("div");
      card.className =
        "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm cursor-pointer";

      const hasPostUrl = photo.post_url;
      const rawCaption = (photo.caption || "").trim();

      // ---- SOLO 37 CARACTERES + [LEER MÁS] si hay más texto ----
      let preview = rawCaption;
      let hasMore = false;

      if (rawCaption.length > 37) {
        preview = rawCaption.slice(0, 37).trimEnd();
        hasMore = true;
      }

      card.innerHTML = `
        <div class="aspect-video bg-slate-800">
          <img src="${photo.image_url}"
               alt="${preview}"
               class="w-full h-full object-cover instagram-photo" />
        </div>
        <div class="p-3">
          <p class="text-xs text-slate-200 mb-2">
            ${preview}${
              hasMore
                ? ' <span class="text-emerald-300 font-semibold">[LEER MÁS]</span>'
                : ""
            }
          </p>
          ${
            hasPostUrl
              ? `<a href="${photo.post_url}" target="_blank"
                   onclick="event.stopPropagation()"
                   class="inline-flex items-center gap-1 text-[0.7rem] text-slate-400 hover:text-emerald-400 transition">
                   Ver en Instagram ↗
                 </a>`
              : ""
          }
        </div>
      `;

      const imgEl = card.querySelector("img");
      card.addEventListener("click", () => openModal(photo, imgEl));

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando fotos", err);
    container.innerHTML =
      "<p class='text-xs text-red-400'>No se pudieron cargar las fotos.</p>";
  }
}

// ----- Notas / Mini blog -----
async function loadNotes() {
  const container = document.getElementById("notes-list");
  if (!container) return;

  container.innerHTML =
    "<p class='text-xs text-slate-400'>Cargando notas...</p>";

  try {
    const res = await fetch(`${API_BASE}/api/notes?lang=${currentLang}`);
    if (!res.ok) {
      throw new Error(`Notas: status ${res.status}`);
    }
    const notes = await res.json();

    container.innerHTML = "";
    notes.forEach((note) => {
      const card = document.createElement("article");
      card.className =
        "bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-emerald-400/70 transition";

      card.innerHTML = `
        <header class="mb-3">
          <h3 class="text-sm font-semibold mb-1">${note.title}</h3>
          <p class="text-xs text-slate-300">${note.summary}</p>
        </header>
        <p class="text-[0.7rem] text-emerald-300 mt-2 inline-flex items-center gap-1">
          ${
            currentLang === "en"
              ? "Read full article ↗"
              : "Leer artículo completo ↗"
          }
        </p>
      `;

      card.addEventListener("click", async () => {
        const fullNote = await fetchNoteDetail(note.slug);
        if (fullNote && fullNote.content) {
          openNoteModal(fullNote);
        } else {
          openNoteModal({
            title: note.title,
            content:
              currentLang === "en"
                ? "The full content of this note could not be loaded right now."
                : "No se ha podido cargar el contenido completo de esta nota ahora mismo.",
          });
        }
      });

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando notas", err);
    container.innerHTML =
      "<p class='text-xs text-red-400'>No se pudieron cargar las notas.</p>";
  }
}
