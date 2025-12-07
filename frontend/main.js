const API_BASE = "https://icdata-api.onrender.com";

// idioma actual
let currentLang = "es";

// Variables del tema personalizado
let themeSettings = {
  hue: 210,          // Azul
  saturation: 100,   // 100% saturación
  brightness: 90     // 90% = azul oscuro pero visible (#0f172a)
};

// Cargar tema guardado desde localStorage
function loadThemeSettings() {
  const saved = localStorage.getItem("themeSettings");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Validar que los valores sean razonables, si no usar defectos
      if (parsed.brightness && parsed.brightness < 6) {
        // Si el brillo es menor a 6, resetear a defecto
        themeSettings = { hue: 210, saturation: 100, brightness: 90 };
        saveThemeSettings();
      } else {
        themeSettings = parsed;
      }
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
  
  updateThemeStyles(hue, sat, bright);
}

// Actualizar estilos CSS dinámicos - CAMBIAR SOLO EL FONDO, NO LOS ACENTOS
function updateThemeStyles(hue, sat, bright) {
  let styleEl = document.getElementById("dynamic-theme-styles");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "dynamic-theme-styles";
    document.head.appendChild(styleEl);
  }
  
  const baseHSL = (lightness) => `hsl(${hue}, ${sat}%, ${lightness * (bright / 100)}%)`;
  
  // Colores para los FONDOS derivados del slider
  const bgColor = baseHSL(5);              // Fondo principal (equivalente a slate-950)
  const bgSecondary = baseHSL(8);          // Fondo secundario (equivalente a slate-900)
  const bgTertiary = baseHSL(12);          // Fondo terciario (equivalente a slate-800)
  const borderColor = baseHSL(20);         // Bordes
  
  // EL ACENTO VERDE ESMERALDA SE MANTIENE IGUAL (#34d399 emerald-400)
  
  const css = `
    /* Tema dinámico - SOLO FONDOS */
    :root {
      --hue: ${hue};
      --sat: ${sat}%;
      --bright: ${bright}%;
    }
    
    /* Fondos: se modifican según el slider */
    body,
    .bg-slate-950 {
      background-color: ${bgColor} !important;
    }
    
    .bg-slate-900 {
      background-color: ${bgSecondary} !important;
    }
    
    .bg-slate-800 {
      background-color: ${bgTertiary} !important;
    }
    
    /* Bordes: también se modifican según el slider */
    .border-slate-800,
    .border-slate-700 {
      border-color: ${borderColor} !important;
    }
    
    /* ACENTOS: Se mantienen en verde/esmeralda ORIGINAL (#34d399) */
    /* NO modificar estos colores */
    .text-emerald-400,
    .text-emerald-300,
    .border-emerald-400,
    .hover\\:text-emerald-400:hover,
    .hover\\:border-emerald-400:hover {
      /* Mantener valor original */
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
      themeSettings = { hue: 210, saturation: 100, brightness: 90 };
      if (hueSlider) hueSlider.value = 210;
      if (saturationSlider) saturationSlider.value = 100;
      if (brightnessSlider) brightnessSlider.value = 90;
      if (hueSlideMobile) hueSlideMobile.value = 210;
      if (saturationSlideMobile) saturationSlideMobile.value = 100;
      if (brightnessSlideMobile) brightnessSlideMobile.value = 90;
      saveThemeSettings();
      applyTheme();
      updateLabels();
    });
  }

  // Resetear a valores por defecto (móvil)
  if (themeResetMobile) {
    themeResetMobile.addEventListener("click", () => {
      themeSettings = { hue: 210, saturation: 100, brightness: 90 };
      if (hueSlider) hueSlider.value = 210;
      if (saturationSlider) saturationSlider.value = 100;
      if (brightnessSlider) brightnessSlider.value = 90;
      if (hueSlideMobile) hueSlideMobile.value = 210;
      if (saturationSlideMobile) saturationSlideMobile.value = 100;
      if (brightnessSlideMobile) brightnessSlideMobile.value = 90;
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

    // Nota sobre PWA (agregada localmente)
    const pwaNoteCard = document.createElement("article");
    pwaNoteCard.className =
      "bg-gradient-to-br from-emerald-900/30 to-slate-900 border-2 border-emerald-400/50 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition";

    const pwaContent = currentLang === "en"
      ? {
          title: "Learning PWA! 🚀",
          summary: "Understanding Progressive Web Apps, Service Workers, and offline-first architecture",
          fullText: `Learning Progressive Web Apps has been an exciting journey. PWAs are web applications that work like native apps, and I've implemented a complete system for my portfolio.

What is a Progressive Web App?

A PWA combines the best features of web and native applications. It installs directly from the browser without needing an app store. The key difference is that PWAs work offline, load instantly from cache, and feel like native applications on your device.

Key Technologies Used

1. manifest.json - This file defines the app metadata. It includes the app name, description, icons, theme colors, start URL, and display mode (standalone). Browsers read this file to understand what the app is and how to present it to users.

2. Service Worker (sw.js) - This is a JavaScript worker running in the background. It intercepts network requests and caches assets. I implemented a network-first strategy: try the network first, and if it's unavailable, serve from cache. This makes the app work offline and load faster.

3. beforeinstallprompt API - This browser API handles the native installation prompt. When a user visits the site, the browser captures an install event. My code then shows a custom install button that, when clicked, triggers the native installation dialog.

4. Dynamic Theming System - The app maintains color preferences across installation. I used an HSL-based system (Hue, Saturation, Brightness) with localStorage persistence. The theme sliders work perfectly in the installed app.

What I Learned

1. Intersection Observer API - Instead of listening to scroll events constantly, Intersection Observer lets you monitor when elements enter the viewport. This is much more efficient for lazy loading.

2. Service Worker Caching Strategies - Different resources need different caching strategies. API responses should be network-first (always try fresh data). Static assets should be cache-first (load fast, update in background).

3. HSL Color Manipulation - Working with HSL colors is more flexible than hex. I can adjust hue, saturation, and brightness independently, making dynamic theming much easier.

4. localStorage Validation - Storing data in localStorage is great, but you need to validate it. If brightness gets cached at 6%, the app turns black. I added validation to reset bad states automatically.

5. iOS PWA Limitations - iOS doesn't have the same PWA support as Android. There's no install prompt. Users must manually tap "Add to Home Screen" from the share menu. This was important to understand for cross-platform support.

Browser Compatibility

Chrome and Edge have full PWA support with install prompts. Firefox supports Service Workers and installation. Safari is limited—no install prompt, but PWAs work as web apps. Android Chrome has excellent support. Testing across browsers revealed these differences were crucial.

Benefits of This Implementation

1. No App Store - Users install directly from the browser, no waiting for app store approval.

2. Smaller Size - The PWA is about 100KB. Native apps are typically 50-200MB.

3. Instant Updates - Changes deploy immediately. No app store review process.

4. Works Offline - Critical content stays cached locally. The app is usable without internet.

5. Native Feel - The installed app appears on the home screen like a native app. It has its own window and icon.

Building this PWA taught me how to bridge web and native experiences. It's a powerful approach that's becoming increasingly important in web development.`
        }
      : {
          title: "¡Aprendiendo PWA! 🚀",
          summary: "Entendiendo Progressive Web Apps, Service Workers y arquitectura offline-first",
          fullText: `Aprender sobre Progressive Web Apps ha sido un viaje muy emocionante. Las PWAs son aplicaciones web que funcionan como apps nativas, y he implementado un sistema completo para mi portafolio.

¿Qué es una Progressive Web App?

Una PWA combina las mejores características de aplicaciones web y nativas. Se instala directamente desde el navegador sin necesidad de app store. La diferencia clave es que las PWAs funcionan sin internet, cargan instantáneamente desde caché, y se sienten como aplicaciones nativas en tu dispositivo.

Tecnologías Clave Utilizadas

1. manifest.json - Este archivo define los metadatos de la app. Incluye el nombre, descripción, iconos, colores del tema, URL de inicio y modo de visualización (standalone). Los navegadores leen este archivo para entender qué es la app y cómo presentarla a los usuarios.

2. Service Worker (sw.js) - Es un JavaScript worker que corre en segundo plano. Intercepta solicitudes de red y cachea assets. Implementé una estrategia network-first: intenta la red primero, y si no está disponible, sirve desde caché. Esto hace que la app funcione offline y cargue más rápido.

3. API beforeinstallprompt - Esta API del navegador maneja el diálogo nativo de instalación. Cuando un usuario visita el sitio, el navegador captura un evento de instalación. Mi código entonces muestra un botón de instalación personalizado que, al hacer clic, activa el diálogo nativo de instalación.

4. Sistema de Temas Dinámicos - La app mantiene preferencias de color después de instalar. Usé un sistema basado en HSL (Tonalidad, Saturación, Brillo) con persistencia en localStorage. Los sliders de tema funcionan perfectamente en la app instalada.

Lo que Aprendí

1. Intersection Observer API - En lugar de escuchar constantemente eventos de scroll, Intersection Observer te permite monitorear cuándo los elementos entran al viewport. Esto es mucho más eficiente para lazy loading.

2. Estrategias de Caching en Service Worker - Diferentes recursos necesitan diferentes estrategias de caching. Las respuestas de API deben ser network-first (siempre intentar datos frescos). Los assets estáticos deben ser cache-first (cargar rápido, actualizar en segundo plano).

3. Manipulación de Colores HSL - Trabajar con colores HSL es más flexible que hex. Puedo ajustar tonalidad, saturación y brillo independientemente, haciendo que los temas dinámicos sean mucho más fáciles.

4. Validación de localStorage - Almacenar datos en localStorage es excelente, pero necesitas validar. Si el brillo se cachea al 6%, la app se vuelve negra. Añadí validación para resetear estados malos automáticamente.

5. Limitaciones de PWA en iOS - iOS no tiene el mismo soporte de PWA que Android. No hay diálogo de instalación. Los usuarios deben tocar manualmente "Agregar a Pantalla de Inicio" desde el menú compartir. Fue importante entender esto para soporte multiplataforma.

Compatibilidad con Navegadores

Chrome y Edge tienen soporte completo de PWA con diálogos de instalación. Firefox soporta Service Workers e instalación. Safari es limitado—sin diálogo de instalación, pero las PWAs funcionan como apps web. Android Chrome tiene excelente soporte. Probar en múltiples navegadores reveló que estas diferencias eran cruciales.

Beneficios de Esta Implementación

1. Sin App Store - Los usuarios instalan directamente desde el navegador, sin esperar aprobación de app store.

2. Tamaño Pequeño - La PWA es aproximadamente 100KB. Las apps nativas típicamente son 50-200MB.

3. Actualizaciones Instantáneas - Los cambios se despliegan inmediatamente. Sin proceso de revisión de app store.

4. Funciona Offline - El contenido crítico permanece cacheado localmente. La app es usable sin internet.

5. Sensación Nativa - La app instalada aparece en la pantalla de inicio como una app nativa. Tiene su propia ventana e icono.

Construir esta PWA me enseñó cómo combinar experiencias web y nativas. Es un enfoque poderoso que se vuelve cada vez más importante en el desarrollo web.`
        };

    pwaNoteCard.innerHTML = `
      <header class="mb-3">
        <h3 class="text-sm font-semibold mb-1">${pwaContent.title}</h3>
        <p class="text-xs text-slate-300">${pwaContent.summary}</p>
      </header>
      <p class="text-[0.7rem] text-emerald-300 mt-2 inline-flex items-center gap-1">
        ${
          currentLang === "en"
            ? "Read full article ↗"
            : "Leer artículo completo ↗"
        }
      </p>
    `;

    pwaNoteCard.addEventListener("click", () => {
      openNoteModal({
        title: pwaContent.title,
        content: pwaContent.fullText
      });
    });

    container.appendChild(pwaNoteCard);

    // Resto de notas del backend
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
