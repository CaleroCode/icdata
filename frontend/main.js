const API_BASE = "https://icdata-api.onrender.com";

// idioma actual - cargar del localStorage o usar español por defecto
let currentLang = localStorage.getItem("language") || "es";

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
  updateSliderGradients();
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

    github_title: "Otros proyectos en mi GitHub",
    github_subtitle: "Datos servidos por el backend en Python",

    projects_title: "Proyectos destacados",
    projects_subtitle: "Un poco más de contexto sobre lo que construyo",

    featured_em_pulse_title: "¿Qué es EM-PULSE?",
    featured_em_pulse_desc: "EM-PULSE es una plataforma web integral creada con el propósito de sensibilizar y educar sobre la esclerosis múltiple, una enfermedad que afecta a millones de personas alrededor del mundo.",
    featured_em_pulse_objective_title: "Mi objetivo",
    featured_em_pulse_objective_desc: "Ayudar a familiares, amigos y el entorno cercano de las personas diagnosticadas con EM a entender mejor los síntomas, los desafíos diarios y las realidades de vivir con esta condición. La empatía y la comprensión son clave para una mejor calidad de vida.",
    featured_em_pulse_learned_title: "Lo que aprendí",
    featured_em_pulse_conclusion: "Este proyecto fue fundamental en mi formación como desarrollador full stack, demostrando que la tecnología puede ser una herramienta poderosa para el bien social.",
    featured_em_pulse_presentation: "La presentación del proyecto se realizará en Enero 2026",

    instagram_title: "Fotografía & visual",
    instagram_subtitle:
      "¡Puedes ver todas mis fotografías en Instagram!",
    instagram_view_post: "Ver en Instagram ↗",

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
    
    // Captions de fotos de Instagram
    photo_1_caption: "De mis fotos favoritas. Me llevó muchos meses conseguir el encuadre y la luz perfectos para capturar este mágico momento ¡La paciencia y la perseverancia siempre dan sus frutos! Gracias a la distancia del 600mm f4 de Canon, pude poner el hide a varios metros y mantener una distancia de seguridad suficiente.",
    photo_2_caption: "Un hermoso ejemplar, con la cornamenta en plena fase de crecimiento. Los ciervos son animales impresionantes, y fotografiarlos en su hábitat natural es una experiencia única que siempre me llena de emoción. El lugar, en uno de mis rincones favoritos del Parque Natural de Redes (Principado de Asturias), ayuda a que el encuadre sea genial.",
    photo_11_caption: "Fotografía realizada gracias a un hide casero en el medio del río, poniendo carnaza (eliminada mediante las herramientas de Adobe Photoshop) y esperando pacientemente a que se decidiera a ponerse en una posición fotogénica. El agua en primer plano, el valle detrás de él y la gran montaña en el fondo ayudan a crear una fotografía que, personalmente, forma parte de mis Top10 mejores fotografías.",
    photo_3_caption: "Lugar emblemático del Principado de Asturias, lugar católico de visita obligada. Se trata de la Cueva Santa, situada cerca de la Basílica de Santa María la Real de Covadonga. Fotografía con un gran angular, jugando con la velocidad de obturación para conseguir ese tan precioso efecto seda en la cascada.",
    photo_4_caption: "Enero de 2021, en plena tormenta Filomena. Esta preciosa cierva y un servidor, bajo la enorme ventisca, compartimos un momento bellísimo cuando me miró fíjamente y tuve la oportunidad para capturar esta imagen. La nieve cayendo, el viento y el frío no fueron impedimento para que esta fotografía formara parte de mis favoritas.",
    photo_5_caption: "Trabajo realizado gracias a un maestro de la cetrería. La luz y la composición están estudiadas, con un par de flashes en un estudio fotografíco. Se consiguió crear una luz suave y envolvente, que resalta los detalles del ave y crea un ambiente dramático.",
    photo_6_caption: "Un gamo, en la Sierra del Sueve (Principado de Asturias). Fotografía realizada a ras de suelo, con un tumbing hide, con un 300mm de tamron. La luz suave del amanecer, el entorno natural y la posición del animal hacen que esta fotografía sea de las que más he vendido.",
    photo_7_caption: "Un precioso zorro rojo (Vulpes vulpes), fotografiado en plena naturaleza, en el Parque Natural de Somiedo (Principado de Asturias). La bonita nevada hace de la escena un entorno mágico, y el zorro, con su pelaje espeso y su mirada curiosa, añade un toque de vida y dinamismo a la imagen.",
    photo_8_caption: "¿Qué es más hermoso que disfrutar de la compañía de una madre protectora con sus cachorros? Una de las zonas oseras más importantes del Principado de Asturias, ofrece escenas tan magníficas e impactantes como ésta.",
    photo_9_caption: "El Rey. Sin duda mi favorita (hablando de fotografías de osos). La fuerza, la majestuosidad y la presencia de este ejemplar adulto de oso pardo (Ursus arctos) son impresionantes. La luz suave del amanecer resalta los detalles de su pelaje y crea un ambiente mágico alrededor de este magnífico animal.",
    photo_10_caption: "Uno de mis animales favoritos. Con esa majestuosidad, ese porte, esa cornamenta imponente... El ciervo es sin duda uno de los animales más bellos y emblemáticos de la fauna europea. Fotografía realizada en el Parque Natural de Redes (Principado de Asturias), en plena época de berrea.",
    
    // PWA ICDATA
    pwa_description: "Descarga mi portafolio como una aplicación nativa en tu smartphone. Tendrás acceso a todo mi contenido en cualquier momento, incluso sin conexión a internet.",
    pwa_info_title: "¿Qué es una PWA?",
    pwa_info_desc: "Una Progressive Web App (PWA) es una aplicación web que funciona como una app nativa. Se instala directamente desde tu navegador sin necesidad de acceder a la App Store.",
    pwa_info_item_1: "✅ Se instala en segundos desde tu navegador",
    pwa_info_item_2: "✅ Funciona sin conexión a internet",
    pwa_info_item_3: "✅ Ocupa muy poco espacio en tu dispositivo",
    pwa_info_item_4: "✅ Acceso rápido como una app nativa",
    pwa_disclaimer: "Funciona sin conexión • Acceso rápido • Compatible iOS, Android y navegadores",
    
    // Biografía (rol + presentación personal)
    profile_role: "Desarrollador full stack en progreso · Diseñador visual & fotógrafo de fauna",
    profile_bio: "Soy un profesional creativo con amplia experiencia en el uso de la suite Adobe, especializado en Photoshop, After Effects, Premiere y Lightroom, herramientas con las que he desarrollado proyectos de diseño visual y edición. Mi trayectoria como fotógrafo de fauna salvaje me ha permitido perfeccionar mi mirada artística, la atención al detalle y la capacidad para contar historias a través de imágenes.\n\nCuento también con experiencia en funciones administrativas, lo que me ha dotado de habilidades organizativas, gestión de proyectos y trabajo en equipo. Durante los períodos en los que no ejercí funciones creativas, trabajé en el sector metal, experiencia que me permitió adquirir competencias para soportar la presión, manejar el estrés y gestionar el trabajo de forma eficiente.\n\nActualmente, estoy ampliando mis horizontes profesionales y tecnológicos al cursar un bootcamp para convertirme en desarrollador full stack, un camino que me permite unir mi perfil creativo con el mundo del desarrollo web y la programación. Mi objetivo es integrar mi experiencia visual con las soluciones digitales, creando proyectos que combinen diseño, funcionalidad y tecnología.",
    
    // Notas
    note_aprendizajes_em_pulse_title: "Lo que aprendí haciendo EM-PULSE",
    note_aprendizajes_em_pulse_content: "EM-PULSE nació como un proyecto técnico y terminó siendo también un proyecto humano.\n\n1. Empatía antes que código\nTrabajar con un tema como la esclerosis múltiple me obligó a pensar en cómo se siente la persona que usa la app y qué entiende de verdad.\n\n2. Accesibilidad básica\nIncluso en un proyecto pequeño empecé a cuidar contraste, tamaños de fuente y jerarquía visual.\n\n3. Lenguaje claro\nTuve que aprender a explicar conceptos médicos y técnicos de forma sencilla, sin perder rigor pero evitando abrumar.\n\n4. Menos pantallas, más intención\nDescubrí que muchas pantallas se podían simplificar si me preguntaba constantemente: \"¿Qué necesita realmente ver esta persona ahora mismo?\".\n\n5. Microcopys con cariño\nLos pequeños textos de feedback (\"guardado\", \"error\", \"vuelve cuando puedas\") también pueden acompañar emocionalmente al usuario.\n\n6. Diseño pensando en la fatiga\nLa esclerosis múltiple implica cansancio: tuve que tenerlo en cuenta al elegir tamaños, espaciados y evitar saturar de información.\n\n7. Backend con propósito\nFastAPI no era solo un stack de moda: necesitaba diseñar endpoints que respondieran a necesidades concretas del proyecto y no al revés.\n\n8. Datos como responsabilidad\nCualquier información relacionada con salud, aunque sea indirecta, hay que tratarla con más respeto y cuidado que un CRUD cualquiera.\n\n9. Documentar para el futuro yo\nDejar notas, diagramas y explicaciones me ahorró tiempo cuando retomé el proyecto semanas después.\n\n10. Mezclar tecnología y humanidad\nEl aprendizaje más grande fue entender que una buena app sobre salud no es solo código limpio, sino también sensibilidad y respeto hacia quienes la usan.",
    
    note_cosas_fastapi_title: "10 cosas que me hubiera gustado saber antes de usar FastAPI",
    note_cosas_fastapi_content: "FastAPI me ha gustado mucho, pero hay varias cosas que habría agradecido saber antes.\n\n1. Empezar simple\nNo hace falta montar una arquitectura enorme para aprender. Un par de endpoints bien pensados enseñan muchísimo.\n\n2. Pydantic ayuda de verdad\nDefinir modelos desde el principio evita muchos errores de tipos y validaciones.\n\n3. CORS desde el inicio\nSi vas a tener un frontend aparte, conviene configurar CORS pronto para no volverse loco con los bloqueos del navegador.\n\n4. Separar esquemas de modelos\nNo es lo mismo el modelo de la base de datos que el esquema que expones en la API. Separarlos hace el código más claro.\n\n5. Manejar errores de forma explícita\nLevantar HTTPException con mensajes claros evita bugs silenciosos y mejora el feedback al frontend.\n\n6. Versionar la API\nAunque el proyecto sea pequeño, empezar usando rutas tipo /api/v1/... ayuda a no sufrir cuando quieras cambiar cosas.\n\n7. Dependencias reutilizables\nLas dependencias de FastAPI (como obtener el usuario actual o la sesión de DB) son oro si las piensas bien desde el principio.\n\n8. Settings centralizados\nTener la configuración (URLs, claves, DEBUG, etc.) en un solo sitio evita perseguir constantes sueltas por todo el proyecto.\n\n9. Auto docs no significa auto diseño\nLa documentación automática de Swagger es genial, pero sigue siendo tu responsabilidad diseñar una API entendible.\n\n10. Pensar en el despliegue desde el día 1\nSaber cómo vas a ejecutar FastAPI en producción (uvicorn, gunicorn, Docker, etc.) te evita rehacer parte del proyecto al final.",
    
    note_pygame_y_estados_title: "Qué me enseñó un juego en Pygame sobre los estados",
    note_pygame_y_estados_content: "Nutty Lucky empezó como un experimento con Pygame y acabó enseñándome bastante sobre estructura de código.\n\n1. El bucle de juego\nSeparar entrada, actualización y dibujado hace que el juego sea mucho más fácil de mantener.\n\n2. Estados de juego\nTener estados como MENU, RUNNING o GAME_OVER evita tener un montón de condicionales repartidos por todo el código.\n\n3. Entidades pequeñas y claras\nCrear clases para jugador, enemigos, plataformas, etc. ayuda a no meter toda la lógica en un solo archivo gigante.\n\n4. Colisiones con cabeza\nLas colisiones son más fáciles de manejar cuando separas la detección de la reacción (qué pasa cuando chocan).\n\n5. Velocidades y física sencillas\nNo hace falta una simulación realista: con unas pocas reglas bien pensadas, el juego ya \"se siente\" bien.\n\n6. Recursos organizados\nTener carpetas claras para sprites, sonidos y mapas ahorra tiempo y hace que el proyecto se vea más profesional.\n\n7. Depurar con HUD sencillo\nMostrar puntuación, vidas o FPS en pantalla me ayudó muchísimo a entender qué estaba pasando en tiempo real.\n\n8. Pausas y reintentos\nImplementar pausa y reinicio del nivel me obligó a estructurar mejor cómo se inicializaba y reseteaba el estado del juego.\n\n9. Ajustar la dificultad\nTocar pequeñas cosas como la velocidad de los enemigos o la frecuencia de aparición de obstáculos cambia totalmente la sensación del juego.\n\n10. Terminar algo jugable\nMás allá de la perfección técnica, el mayor aprendizaje fue llevar una idea desde \"prototipo raro\" hasta algo que alguien puede jugar y disfrutar.",
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

    github_title: "Other projects on my GitHub",
    github_subtitle: "Data served by the Python backend",

    projects_title: "Featured projects",
    projects_subtitle: "A bit more context about what I build",

    featured_em_pulse_title: "What is EM-PULSE?",
    featured_em_pulse_desc: "EM-PULSE is a comprehensive web platform created to raise awareness and educate about multiple sclerosis, a disease that affects millions of people around the world.",
    featured_em_pulse_objective_title: "My goal",
    featured_em_pulse_objective_desc: "To help family, friends and the close environment of people diagnosed with MS better understand the symptoms, daily challenges and realities of living with this condition. Empathy and understanding are key to a better quality of life.",
    featured_em_pulse_learned_title: "What I learned",
    featured_em_pulse_conclusion: "This project was fundamental in my training as a full stack developer, demonstrating that technology can be a powerful tool for social good.",
    featured_em_pulse_presentation: "The project will be presented in January 2026",

    instagram_title: "Photography & visual",
    instagram_subtitle: "A bit of what I see when I'm not coding",
    instagram_view_post: "View on Instagram ↗",

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
    
    // Photo captions
    photo_1_caption: "One of my favorite photos. It took me many months to achieve the perfect framing and lighting to capture this magical moment. Patience and perseverance always pay off! Thanks to the range of my Canon 600mm f4, I was able to place the hide several meters away and maintain a safe distance.",
    photo_2_caption: "A beautiful specimen with antlers in full growth phase. Deer are impressive animals, and photographing them in their natural habitat is a unique experience that always fills me with emotion. The location, in one of my favorite corners of the Redes Natural Park (Asturias), helps create an excellent composition.",
    photo_11_caption: "Photo taken from a homemade hide in the middle of the river, using bait (removed with Adobe Photoshop tools) and patiently waiting for the right moment. The water in the foreground, the valley behind and the large mountain in the background help create a photograph that is personally part of my Top 10 best photos.",
    photo_3_caption: "An emblematic location in Asturias and a must-visit Catholic site. This is the Holy Cave, located near the Basilica of Santa María la Real de Covadonga. Shot with a wide-angle lens, playing with shutter speed to achieve that precious silk effect on the waterfall.",
    photo_4_caption: "January 2021, in the midst of Storm Filomena. This beautiful doe and I shared a beautiful moment in the enormous blizzard when she looked directly at me and I had the chance to capture this image. Falling snow, wind and cold did not prevent this photo from becoming one of my favorites.",
    photo_5_caption: "Work done thanks to a master of falconry. The light and composition are carefully studied, with a pair of flashes in a photo studio. A soft, enveloping light was achieved, highlighting the details of the bird and creating a dramatic atmosphere.",
    photo_6_caption: "A fallow deer in the Sierra del Sueve (Asturias). Photo taken at ground level with a tumbing hide and a 300mm Tamron lens. The soft light of dawn, the natural environment and the animal's position make this one of my best-selling photographs.",
    photo_7_caption: "A beautiful red fox (Vulpes vulpes), photographed in the wild at the Somiedo Natural Park (Asturias). The lovely snowfall makes the scene a magical setting, and the fox, with its thick fur and curious gaze, adds a touch of life and dynamism to the image.",
    photo_8_caption: "What is more beautiful than enjoying the company of a protective mother with her cubs? One of the most important bear zones in Asturias offers scenes as magnificent and striking as this one.",
    photo_9_caption: "The King. Undoubtedly my favorite (speaking of bear photographs). The strength, majesty and presence of this adult brown bear specimen (Ursus arctos) are impressive. The soft light of dawn highlights the details of its fur and creates a magical atmosphere around this magnificent animal.",
    photo_10_caption: "One of my favorite animals. With that majesty, that bearing, that imposing antlers... The deer is undoubtedly one of the most beautiful and emblematic animals of European fauna. Photo taken at the Redes Natural Park (Asturias), during the rutting season.",
    
    // PWA ICDATA
    pwa_description: "Download my portfolio as a native application on your smartphone. You'll have access to all my content at any time, even without internet connection.",
    pwa_info_title: "What is a PWA?",
    pwa_info_desc: "A Progressive Web App (PWA) is a web application that works like a native app. It installs directly from your browser without needing to access the App Store.",
    pwa_info_item_1: "✅ Installs in seconds from your browser",
    pwa_info_item_2: "✅ Works without internet connection",
    pwa_info_item_3: "✅ Takes up very little space on your device",
    pwa_info_item_4: "✅ Quick access like a native app",
    pwa_disclaimer: "Works offline • Fast access • Compatible iOS, Android and browsers",
    
    // Biography (role + personal presentation)
    profile_role: "Full stack developer in progress · Visual designer & wildlife photographer",
    profile_bio: "I am a creative professional with extensive experience using the Adobe suite, specialising in Photoshop, After Effects, Premiere and Lightroom. With these tools I have developed visual design and editing projects. My background as a wildlife photographer has helped me refine my artistic eye, attention to detail and the ability to tell stories through images.\n\nI also have experience in administrative roles, which has given me strong organisational skills, project management abilities and teamwork. During the periods when I was not working in creative positions, I worked in the metal industry, an experience that taught me to handle pressure, manage stress and work efficiently.\n\nCurrently I am expanding my professional and technical horizons by studying a full stack development bootcamp, a path that allows me to connect my creative profile with web development and programming. My goal is to integrate my visual experience with digital solutions, creating projects that combine design, functionality and technology.",
    
    // Notes
    note_em_pulse_lessons_title: "What I learned building EM-PULSE",
    note_em_pulse_lessons_content: "EM-PULSE started as a technical project and ended up being a human one too.\n\n1. Empathy before code\nWorking with multiple sclerosis forced me to think about how the person using the app feels and what they really understand.\n\n2. Basic accessibility\nEven in a small project I had to care about contrast, font sizes and visual hierarchy.\n\n3. Clear language\nI had to explain medical and technical ideas in a simple way, without losing accuracy but avoiding overwhelming people.\n\n4. Fewer screens, more intention\nMany screens could be simplified just by asking: \"What does this person really need to see right now?\".\n\n5. Caring microcopy\nSmall pieces of text (\"saved\", \"error\", \"come back later\") can also support the user emotionally.\n\n6. Design aware of fatigue\nMultiple sclerosis often means tiredness: that influenced how much text, how many actions and how much visual noise I allowed.\n\n7. Backend with a reason\nFastAPI was not just a trendy framework: I needed endpoints that answered specific problems, not the other way around.\n\n8. Data as a responsibility\nAny information related to health, even indirectly, must be handled with more care than a typical CRUD.\n\n9. Documenting for future me\nLeaving notes, diagrams and short explanations saved me time when I came back to the project weeks later.\n\n10. Mixing technology and humanity\nThe biggest lesson: a good health-related app is not only clean code, it is also sensitivity and respect for the people using it.",
    
    note_fastapi_things_i_wish_i_knew_title: "10 things I wish I had known before using FastAPI",
    note_fastapi_things_i_wish_i_knew_content: "FastAPI is great, but there are a few things I wish I had known from the start.\n\n1. Start small\nYou don't need a huge architecture to learn. A couple of well-designed endpoints teach a lot.\n\n2. Pydantic really helps\nDefining models from the beginning avoids many bugs related to types and validation.\n\n3. Configure CORS early\nIf you have a separate frontend, set CORS as soon as possible so the browser does not block your requests.\n\n4. Separate schemas from models\nThe database model is not the same as the API schema. Separating them makes the code clearer.\n\n5. Handle errors explicitly\nRaising HTTPException with clear messages improves debugging and the frontend experience.\n\n6. Think about versioning\nUsing paths like /api/v1/... from day one makes later changes and new versions less painful.\n\n7. Reusable dependencies\nFastAPI dependencies (like getting the current user or DB session) are powerful if you design them carefully.\n\n8. Centralised settings\nStoring config (URLs, keys, DEBUG, etc.) in one place avoids chasing constants in multiple files.\n\n9. Auto docs ≠ auto design\nSwagger docs are nice, but you are still responsible for designing an API that is easy to understand.\n\n10. Think deployment from day 1\nKnowing how you'll run FastAPI in production (uvicorn, gunicorn, Docker, etc.) saves refactors at the end of the project.",
    
    note_pygame_game_states_title: "What building a Pygame game taught me about state management",
    note_pygame_game_states_content: "Nutty Lucky started as a small Pygame experiment and ended up teaching me a lot about structure.\n\n1. The game loop\nSplitting input, update and draw phases makes the game easier to reason about.\n\n2. Game states\nHaving states like MENU, RUNNING or GAME_OVER keeps the code from turning into a giant if/else jungle.\n\n3. Small, focused entities\nCreating classes for player, enemies and platforms keeps logic from living in one huge file.\n\n4. Collisions with intent\nIt is easier to manage collisions when you separate \"detecting\" from \"reacting\".\n\n5. Simple physics\nYou don't need realistic physics. A few consistent rules can make the game feel good enough.\n\n6. Organised assets\nA clear folder structure for sprites, sounds and maps saves time and looks more professional.\n\n7. Debug HUD\nShowing score, lives or FPS on screen really helps to see what is happening during gameplay.\n\n8. Pause and restart\nImplementing pause and restart forced me to design how to initialise and reset game state properly.\n\n9. Tuning difficulty\nTiny tweaks to speed, spawn rate or hit boxes change the entire feel of the game.\n\n10. Finishing something playable\nBeyond technical details, the biggest win was taking an idea from \"weird prototype\" to something someone can actually play and enjoy.",
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

    "featured-em-pulse-title": "featured_em_pulse_title",
    "featured-em-pulse-desc": "featured_em_pulse_desc",
    "featured-em-pulse-objective-title": "featured_em_pulse_objective_title",
    "featured-em-pulse-objective-desc": "featured_em_pulse_objective_desc",
    "featured-em-pulse-learned-title": "featured_em_pulse_learned_title",
    "featured-em-pulse-conclusion": "featured_em_pulse_conclusion",
    "featured-em-pulse-presentation": "featured_em_pulse_presentation",

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
    
    "pwa-description": "pwa_description",
    "pwa-info-title": "pwa_info_title",
    "pwa-info-desc": "pwa_info_desc",
    "pwa-info-item-1": "pwa_info_item_1",
    "pwa-info-item-2": "pwa_info_item_2",
    "pwa-info-item-3": "pwa_info_item_3",
    "pwa-info-item-4": "pwa_info_item_4",
    "pwa-disclaimer": "pwa_disclaimer",
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

// Cargar detalle de nota desde traducciones locales (sin hacer fetch al backend)
function fetchNoteDetail(slug) {
  const translations = TRANSLATIONS[currentLang];
  const noteKeyMap = {
    "aprendizajes-em-pulse": { title: "note_aprendizajes_em_pulse_title", content: "note_aprendizajes_em_pulse_content", id: 1 },
    "em-pulse-lessons": { title: "note_em_pulse_lessons_title", content: "note_em_pulse_lessons_content", id: 1 },
    "cosas-fastapi": { title: "note_cosas_fastapi_title", content: "note_cosas_fastapi_content", id: 2 },
    "fastapi-things-i-wish-i-knew": { title: "note_fastapi_things_i_wish_i_knew_title", content: "note_fastapi_things_i_wish_i_knew_content", id: 2 },
    "pygame-y-estados": { title: "note_pygame_y_estados_title", content: "note_pygame_y_estados_content", id: 3 },
    "pygame-game-states": { title: "note_pygame_game_states_title", content: "note_pygame_game_states_content", id: 3 }
  };
  const keys = noteKeyMap[slug];
  if (!keys || !translations) return null;
  return { id: keys.id, slug, title: translations[keys.title] || "", content: translations[keys.content] || "" };
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
    localStorage.setItem("language", lang);
    applyActiveStyles();
    applyTranslations();
    
    // Recargar perfil (presentación/bio) que está visible desde el inicio
    loadProfile();
    
    // Cerrar modales abiertos antes de recargar contenido
    closeModal();
    closeNoteModal();
    
    // Recargar fotos de Instagram si ya fueron cargadas (tienen captions multiidioma)
    const instagramSection = document.getElementById("instagram");
    if (instagramSection && instagramSection.dataset.instagramLoaded) {
      loadInstagramPhotos();
    }
    
    // Recargar notas si fueron cargadas
    const notesSection = document.getElementById("notes");
    if (notesSection && notesSection.dataset.notesLoaded) {
      loadNotes();
    }
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

// ----- Actualizar gradientes de los sliders -----
function updateSliderGradients() {
  const hueSlider = document.getElementById("hue-slider");
  const saturationSlider = document.getElementById("saturation-slider");
  const brightnessSlider = document.getElementById("brightness-slider");
  const hueSlideMobile = document.getElementById("theme-mobile-hue");
  const saturationSlideMobile = document.getElementById("theme-mobile-sat");
  const brightnessSlideMobile = document.getElementById("theme-mobile-bright");

  // Crear gradiente de tono (0-360)
  const hueGradient = `linear-gradient(to right, 
    hsl(0, 100%, 50%), 
    hsl(60, 100%, 50%), 
    hsl(120, 100%, 50%), 
    hsl(180, 100%, 50%), 
    hsl(240, 100%, 50%), 
    hsl(300, 100%, 50%), 
    hsl(360, 100%, 50%))`;

  // Crear gradiente de saturación (0-100%)
  const satGradient = `linear-gradient(to right, 
    hsl(${themeSettings.hue}, 0%, 50%), 
    hsl(${themeSettings.hue}, 100%, 50%))`;

  // Crear gradiente de brillo (6-150%)
  const brightGradient = `linear-gradient(to right, 
    hsl(${themeSettings.hue}, 100%, 3%), 
    hsl(${themeSettings.hue}, 100%, 75%))`;

  // Aplicar a sliders desktop
  if (hueSlider) hueSlider.style.background = hueGradient;
  if (saturationSlider) saturationSlider.style.background = satGradient;
  if (brightnessSlider) brightnessSlider.style.background = brightGradient;

  // Aplicar a sliders móvil
  if (hueSlideMobile) hueSlideMobile.style.background = hueGradient;
  if (saturationSlideMobile) saturationSlideMobile.style.background = satGradient;
  if (brightnessSlideMobile) brightnessSlideMobile.style.background = brightGradient;
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
    updateSliderGradients();
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
    updateSliderGradients();
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
// Cargar perfil desde traducciones locales (sin hacer fetch al backend)
function loadProfile() {
  const bioContainer = document.getElementById("profile-bio");
  const translations = TRANSLATIONS[currentLang];
  
  // Bio en varios párrafos
  if (bioContainer && translations) {
    bioContainer.innerHTML = "";
    const paragraphs = translations.profile_bio.split(/\n\s*\n/);
    paragraphs.forEach((para) => {
      const p = document.createElement("p");
      p.className = "mb-3";
      p.textContent = para.trim();
      bioContainer.appendChild(p);
    });
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
    const res = await fetch(`${API_BASE}/api/instagram-photos?lang=${currentLang}`);
    if (!res.ok) {
      throw new Error(`Fotos: status ${res.status}`);
    }
    const photos = await res.json();

    container.innerHTML = "";
    
    // Mapeo de photo.id a clave de traducción
    const captionKeyMap = {
      1: "photo_1_caption",
      2: "photo_2_caption",
      11: "photo_11_caption",
      3: "photo_3_caption",
      4: "photo_4_caption",
      5: "photo_5_caption",
      6: "photo_6_caption",
      7: "photo_7_caption",
      8: "photo_8_caption",
      9: "photo_9_caption",
      10: "photo_10_caption",
    };
    
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS["es"];

    photos.forEach((photo) => {
      const card = document.createElement("div");
      card.className =
        "bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm cursor-pointer";

      const hasPostUrl = photo.post_url;
      // Obtener caption desde traducciones en lugar del backend
      const captionKey = captionKeyMap[photo.id];
      const rawCaption = (captionKey && t[captionKey]) ? t[captionKey] : (photo.caption || "").trim();

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
                   ${t.instagram_view_post}
                 </a>`
              : ""
          }
        </div>
      `;

      const imgEl = card.querySelector("img");
      // Pasar el caption traducido al modal
      const photoWithCaption = { ...photo, caption: rawCaption };
      card.addEventListener("click", () => openModal(photoWithCaption, imgEl));

      container.appendChild(card);
    });

    // Marcar que las fotos de Instagram han sido cargadas
    container.dataset.instagramLoaded = "true";
  } catch (err) {
    console.error("Error cargando fotos", err);
    container.innerHTML =
      "<p class='text-xs text-red-400'>No se pudieron cargar las fotos.</p>";
  }
}

// ----- Notas / Mini blog -----
function loadNotes() {
  const container = document.getElementById("notes-list");
  if (!container) return;
  container.innerHTML = "";
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS["es"];
  
  // Notas desde traducciones locales
  const notesList = currentLang === "en" ? [
    { id: 1, slug: "em-pulse-lessons", title: t.note_em_pulse_lessons_title },
    { id: 2, slug: "fastapi-things-i-wish-i-knew", title: t.note_fastapi_things_i_wish_i_knew_title },
    { id: 3, slug: "pygame-game-states", title: t.note_pygame_game_states_title }
  ] : [
    { id: 1, slug: "aprendizajes-em-pulse", title: t.note_aprendizajes_em_pulse_title },
    { id: 2, slug: "cosas-fastapi", title: t.note_cosas_fastapi_title },
    { id: 3, slug: "pygame-y-estados", title: t.note_pygame_y_estados_title }
  ];

  // Nota sobre PWA
  const pwaNoteCard = document.createElement("article");
  pwaNoteCard.className = "bg-gradient-to-br from-emerald-900/30 to-slate-900 border-2 border-emerald-400/50 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition";
  const pwaTitle = currentLang === "en" ? "Learning PWA! 🚀" : "¡Aprendiendo PWA! 🚀";
  const pwaSummary = currentLang === "en" ? "Understanding Progressive Web Apps, Service Workers, and offline-first architecture" : "Entendiendo Progressive Web Apps, Service Workers y arquitectura offline-first";
  pwaNoteCard.innerHTML = `<header class="mb-3"><h3 class="text-sm font-semibold mb-1">${pwaTitle}</h3><p class="text-xs text-slate-300">${pwaSummary}</p></header><p class="text-[0.7rem] text-emerald-300 mt-2 inline-flex items-center gap-1">${currentLang === "en" ? "Read full article ↗" : "Leer artículo completo ↗"}</p>`;
  container.appendChild(pwaNoteCard);

  // Resto de notas
  notesList.forEach((note) => {
    const card = document.createElement("article");
    card.className = "bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:border-emerald-400/70 transition";
    card.innerHTML = `<header class="mb-3"><h3 class="text-sm font-semibold mb-1">${note.title}</h3></header><p class="text-[0.7rem] text-emerald-300 mt-2 inline-flex items-center gap-1">${currentLang === "en" ? "Read full article ↗" : "Leer artículo completo ↗"}</p>`;
    card.addEventListener("click", () => {
      const noteData = fetchNoteDetail(note.slug);
      if (noteData) openNoteModal(noteData);
    });
    container.appendChild(card);
  });
}
