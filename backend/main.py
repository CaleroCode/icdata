from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

# 👇 PON AQUI TU USUARIO REAL DE GITHUB
GITHUB_USERNAME = "CaleroCode"

# Repos de fallback por si la llamada a GitHub falla
FALLBACK_REPOS = [
    {
        "name": "JULIA'S RUN",
        "description": "🎮 Julia's Run — Proyecto educativo de Programación Orientada a Objetos Juego en Python + Pygame para aprender POO de forma práctica e interactiva. Incluye notebook Jupyter, guía pedagógica y código legacy para analizar y mejorar.",
        "url": "https://github.com/CaleroCode/julias-run",
        "topics": ["python", "pygame", "educacion"],
    },
    {
        "name": "AJEDREZ",
        "description": "Aplicación web que permite jugar al ajedrez online en tiempo real y chatear con tu oponente durante la partida.",
        "url": "https://github.com/CaleroCode/ajedrez",
        "topics": ["python", "juego", "ajedrez"],
    },
    {
        "name": "TRADUCTOR",
        "description": "Chat en tiempo real para dos usuarios con traducción automática simultánea, diseñado con Node.js, Socket.IO y traducción vía API.",
        "url": "https://github.com/CaleroCode/traductor",
        "topics": ["python", "traduccion", "ia"],
    },
]

app = FastAPI(title="icdata backend")

# permitir que el frontend (localhost) llame al backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción afinar esto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- PROFILE MULTIIDIOMA ----------
@app.get("/api/profile")
def get_profile(lang: str = "es"):
    # skills comunes a ambos idiomas
    skills = {
        "Programming & Web": [
            "Python",
            "JavaScript",
            "HTML5",
            "CSS3",
            "SQL",
            "Java",
        ],
        "Frameworks & Libraries": [
            "FastAPI",
            "Flask",
            "Django",
            "React",
            "Node.js",
            "Express",
            "TailwindCSS",
            "Bootstrap",
        ],
        "Developer tools": [
            "Git",
            "GitHub",
            "VS Code",
            "Linux",
        ],
        "Databases": [
            "PostgreSQL",
            "MySQL",
            "SQLite",
        ],
        "Web Technologies": [
            "PWA",
            "Service Workers",
            "REST APIs",
        ],
        "AI & Machine Learning": [
            "IA PROPHET",
            "IA OLLAMA",
        ],
        "Design, 3D & Video": [
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Adobe InDesign",
            "Adobe After Effects",
            "Adobe Premiere Pro",
            "Adobe Dreamweaver",
            "Adobe Lightroom",
            "Blender",
            "Cinema 4D",
            "Autodesk 3ds Max",
            "Autodesk Maya",
        ],
    }

    if lang.lower() == "en":
        role = "Full stack developer in progress · Visual designer & wildlife photographer"
        bio = """I am a creative professional with extensive experience using the Adobe suite, specialising in Photoshop, After Effects, Premiere and Lightroom. With these tools I have developed visual design and editing projects. My background as a wildlife photographer has helped me refine my artistic eye, attention to detail and the ability to tell stories through images.

I also have experience in administrative roles, which has given me strong organisational skills, project management abilities and teamwork. During the periods when I was not working in creative positions, I worked in the metal industry, an experience that taught me to handle pressure, manage stress and work efficiently.

Currently I am expanding my professional and technical horizons by studying a full stack development bootcamp, a path that allows me to connect my creative profile with web development and programming. My goal is to integrate my visual experience with digital solutions, creating projects that combine design, functionality and technology."""
    else:
        role = "Desarrollador full stack en progreso · Diseñador visual & fotógrafo de fauna"
        bio = """Soy un profesional creativo con amplia experiencia en el uso de la suite Adobe, especializado en Photoshop, After Effects, Premiere y Lightroom, herramientas con las que he desarrollado proyectos de diseño visual y edición. Mi trayectoria como fotógrafo de fauna salvaje me ha permitido perfeccionar mi mirada artística, la atención al detalle y la capacidad para contar historias a través de imágenes.

Cuento también con experiencia en funciones administrativas, lo que me ha dotado de habilidades organizativas, gestión de proyectos y trabajo en equipo. Durante los períodos en los que no ejercí funciones creativas, trabajé en el sector metal, experiencia que me permitió adquirir competencias para soportar la presión, manejar el estrés y gestionar el trabajo de forma eficiente.

Actualmente, estoy ampliando mis horizontes profesionales y tecnológicos al cursar un bootcamp para convertirme en desarrollador full stack, un camino que me permite unir mi perfil creativo con el mundo del desarrollo web y la programación. Mi objetivo es integrar mi experiencia visual con las soluciones digitales, creando proyectos que combinen diseño, funcionalidad y tecnología."""

    return {
        "name": "Iván Calero",
        "brand": "icdata",
        "role": role,
        "bio": bio,
        "links": {
            "github": f"https://github.com/{GITHUB_USERNAME}",
            "instagram": "https://instagram.com/calero.wildlife",
            "linkedin": "https://www.linkedin.com/in/ivancalero/",
        },
        "skills": skills,
    }


# ---------- NOTAS / MINI BLOG (LISTA RESUMIDA) ----------
@app.get("/api/notes")
def get_notes(lang: str = "es"):
    if lang.lower() == "en":
        return [
            {
                "id": 1,
                "slug": "em-pulse-lessons",
                "title": "What I learned building EM-PULSE",
                "summary": "How working on a project about multiple sclerosis taught me to think about empathy, accessibility and real user needs in web development.",
            },
            {
                "id": 2,
                "slug": "fastapi-things-i-wish-i-knew",
                "title": "10 things I wish I had known before using FastAPI",
                "summary": "Small lessons about routes, models, CORS and project structure that would have saved me a lot of time in my first FastAPI projects.",
            },
            {
                "id": 3,
                "slug": "pygame-game-states",
                "title": "What building a Pygame game taught me about state management",
                "summary": "How creating Nutty Lucky helped me understand game loops, events and separating responsibilities in code through game states.",
            },
        ]
    else:
        return [
            {
                "id": 1,
                "slug": "aprendizajes-em-pulse",
                "title": "Lo que aprendí haciendo EM-PULSE",
                "summary": "Cómo trabajar en un proyecto sobre esclerosis múltiple me enseñó a pensar en empatía, accesibilidad y necesidades reales de las personas en el desarrollo web.",
            },
            {
                "id": 2,
                "slug": "cosas-fastapi",
                "title": "10 cosas que me hubiera gustado saber antes de usar FastAPI",
                "summary": "Pequeñas lecciones sobre rutas, modelos, CORS y estructura de proyecto que me habrían ahorrado mucho tiempo en mis primeros proyectos con FastAPI.",
            },
            {
                "id": 3,
                "slug": "pygame-y-estados",
                "title": "Qué me enseñó un juego en Pygame sobre los estados",
                "summary": "Cómo crear Nutty Lucky me ayudó a entender el bucle de juego, los eventos y la separación de responsabilidades en el código a través de estados.",
            },
        ]


# Contenidos completos de las notas (cada una con 10 puntos)
NOTES_CONTENT = {
    "es": {
        "aprendizajes-em-pulse": """EM-PULSE nació como un proyecto técnico y terminó siendo también un proyecto humano.

1. Empatía antes que código  
Trabajar con un tema como la esclerosis múltiple me obligó a pensar en cómo se siente la persona que usa la app y qué entiende de verdad.

2. Accesibilidad básica  
Incluso en un proyecto pequeño empecé a cuidar contraste, tamaños de fuente y jerarquía visual.

3. Lenguaje claro  
Tuve que aprender a explicar conceptos médicos y técnicos de forma sencilla, sin perder rigor pero evitando abrumar.

4. Menos pantallas, más intención  
Descubrí que muchas pantallas se podían simplificar si me preguntaba constantemente: “¿Qué necesita realmente ver esta persona ahora mismo?”.

5. Microcopys con cariño  
Los pequeños textos de feedback (“guardado”, “error”, “vuelve cuando puedas”) también pueden acompañar emocionalmente al usuario.

6. Diseño pensando en la fatiga  
La esclerosis múltiple implica cansancio: tuve que tenerlo en cuenta al elegir tamaños, espaciados y evitar saturar de información.

7. Backend con propósito  
FastAPI no era solo un stack de moda: necesitaba diseñar endpoints que respondieran a necesidades concretas del proyecto y no al revés.

8. Datos como responsabilidad  
Cualquier información relacionada con salud, aunque sea indirecta, hay que tratarla con más respeto y cuidado que un CRUD cualquiera.

9. Documentar para el futuro yo  
Dejar notas, diagramas y explicaciones me ahorró tiempo cuando retomé el proyecto semanas después.

10. Mezclar tecnología y humanidad  
El aprendizaje más grande fue entender que una buena app sobre salud no es solo código limpio, sino también sensibilidad y respeto hacia quienes la usan.""",

        "cosas-fastapi": """FastAPI me ha gustado mucho, pero hay varias cosas que habría agradecido saber antes.

1. Empezar simple  
No hace falta montar una arquitectura enorme para aprender. Un par de endpoints bien pensados enseñan muchísimo.

2. Pydantic ayuda de verdad  
Definir modelos desde el principio evita muchos errores de tipos y validaciones.

3. CORS desde el inicio  
Si vas a tener un frontend aparte, conviene configurar CORS pronto para no volverse loco con los bloqueos del navegador.

4. Separar esquemas de modelos  
No es lo mismo el modelo de la base de datos que el esquema que expones en la API. Separarlos hace el código más claro.

5. Manejar errores de forma explícita  
Levantar HTTPException con mensajes claros evita bugs silenciosos y mejora el feedback al frontend.

6. Versionar la API  
Aunque el proyecto sea pequeño, empezar usando rutas tipo /api/v1/... ayuda a no sufrir cuando quieras cambiar cosas.

7. Dependencias reutilizables  
Las dependencias de FastAPI (como obtener el usuario actual o la sesión de DB) son oro si las piensas bien desde el principio.

8. Settings centralizados  
Tener la configuración (URLs, claves, DEBUG, etc.) en un solo sitio evita perseguir constantes sueltas por todo el proyecto.

9. Auto docs no significa auto diseño  
La documentación automática de Swagger es genial, pero sigue siendo tu responsabilidad diseñar una API entendible.

10. Pensar en el despliegue desde el día 1  
Saber cómo vas a ejecutar FastAPI en producción (uvicorn, gunicorn, Docker, etc.) te evita rehacer parte del proyecto al final.""",

        "pygame-y-estados": """Nutty Lucky empezó como un experimento con Pygame y acabó enseñándome bastante sobre estructura de código.

1. El bucle de juego  
Separar entrada, actualización y dibujado hace que el juego sea mucho más fácil de mantener.

2. Estados de juego  
Tener estados como MENU, RUNNING o GAME_OVER evita tener un montón de condicionales repartidos por todo el código.

3. Entidades pequeñas y claras  
Crear clases para jugador, enemigos, plataformas, etc. ayuda a no meter toda la lógica en un solo archivo gigante.

4. Colisiones con cabeza  
Las colisiones son más fáciles de manejar cuando separas la detección de la reacción (qué pasa cuando chocan).

5. Velocidades y física sencillas  
No hace falta una simulación realista: con unas pocas reglas bien pensadas, el juego ya “se siente” bien.

6. Recursos organizados  
Tener carpetas claras para sprites, sonidos y mapas ahorra tiempo y hace que el proyecto se vea más profesional.

7. Depurar con HUD sencillo  
Mostrar puntuación, vidas o FPS en pantalla me ayudó muchísimo a entender qué estaba pasando en tiempo real.

8. Pausas y reintentos  
Implementar pausa y reinicio del nivel me obligó a estructurar mejor cómo se inicializaba y reseteaba el estado del juego.

9. Ajustar la dificultad  
Tocar pequeñas cosas como la velocidad de los enemigos o la frecuencia de aparición de obstáculos cambia totalmente la sensación del juego.

10. Terminar algo jugable  
Más allá de la perfección técnica, el mayor aprendizaje fue llevar una idea desde “prototipo raro” hasta algo que alguien puede jugar y disfrutar."""
    },
    "en": {
        "em-pulse-lessons": """EM-PULSE started as a technical project and ended up being a human one too.

1. Empathy before code  
Working with multiple sclerosis forced me to think about how the person using the app feels and what they really understand.

2. Basic accessibility  
Even in a small project I had to care about contrast, font sizes and visual hierarchy.

3. Clear language  
I had to explain medical and technical ideas in a simple way, without losing accuracy but avoiding overwhelming people.

4. Fewer screens, more intention  
Many screens could be simplified just by asking: “What does this person really need to see right now?”.

5. Caring microcopy  
Small pieces of text (“saved”, “error”, “come back later”) can also support the user emotionally.

6. Design aware of fatigue  
Multiple sclerosis often means tiredness: that influenced how much text, how many actions and how much visual noise I allowed.

7. Backend with a reason  
FastAPI was not just a trendy framework: I needed endpoints that answered specific problems, not the other way around.

8. Data as a responsibility  
Any information related to health, even indirectly, must be handled with more care than a typical CRUD.

9. Documenting for future me  
Leaving notes, diagrams and short explanations saved me time when I came back to the project weeks later.

10. Mixing technology and humanity  
The biggest lesson: a good health-related app is not only clean code, it is also sensitivity and respect for the people using it.""",

        "fastapi-things-i-wish-i-knew": """FastAPI is great, but there are a few things I wish I had known from the start.

1. Start small  
You don’t need a huge architecture to learn. A couple of well-designed endpoints teach a lot.

2. Pydantic really helps  
Defining models from the beginning avoids many bugs related to types and validation.

3. Configure CORS early  
If you have a separate frontend, set CORS as soon as possible so the browser does not block your requests.

4. Separate schemas from models  
The database model is not the same as the API schema. Separating them makes the code clearer.

5. Handle errors explicitly  
Raising HTTPException with clear messages improves debugging and the frontend experience.

6. Think about versioning  
Using paths like /api/v1/... from day one makes later changes and new versions less painful.

7. Reusable dependencies  
FastAPI dependencies (like getting the current user or DB session) are powerful if you design them carefully.

8. Centralised settings  
Storing config (URLs, keys, DEBUG, etc.) in one place avoids chasing constants in multiple files.

9. Auto docs ≠ auto design  
Swagger docs are nice, but you are still responsible for designing an API that is easy to understand.

10. Think deployment from day 1  
Knowing how you’ll run FastAPI in production (uvicorn, gunicorn, Docker, etc.) saves refactors at the end of the project.""",

        "pygame-game-states": """Nutty Lucky started as a small Pygame experiment and ended up teaching me a lot about structure.

1. The game loop  
Splitting input, update and draw phases makes the game easier to reason about.

2. Game states  
Having states like MENU, RUNNING or GAME_OVER keeps the code from turning into a giant if/else jungle.

3. Small, focused entities  
Creating classes for player, enemies and platforms keeps logic from living in one huge file.

4. Collisions with intent  
It is easier to manage collisions when you separate “detecting” from “reacting”.

5. Simple physics  
You don’t need realistic physics. A few consistent rules can make the game feel good enough.

6. Organised assets  
A clear folder structure for sprites, sounds and maps saves time and looks more professional.

7. Debug HUD  
Showing score, lives or FPS on screen really helps to see what is happening during gameplay.

8. Pause and restart  
Implementing pause and restart forced me to design how to initialise and reset game state properly.

9. Tuning difficulty  
Tiny tweaks to speed, spawn rate or hit boxes change the entire feel of the game.

10. Finishing something playable  
Beyond technical details, the biggest win was taking an idea from “weird prototype” to something someone can actually play and enjoy."""
    },
}


@app.get("/api/notes/{slug}")
def get_note_detail(slug: str, lang: str = "es"):
    lang_key = "en" if lang.lower() == "en" else "es"

    # reutilizamos la lista corta para título/summary
    notes = get_notes(lang=lang)
    base = next((n for n in notes if n["slug"] == slug), None)
    if base is None:
        raise HTTPException(status_code=404, detail="Note not found")

    content = NOTES_CONTENT.get(lang_key, {}).get(slug)
    if content is None:
        raise HTTPException(status_code=404, detail="Content not found")

    return {
        "id": base["id"],
        "slug": base["slug"],
        "title": base["title"],
        "summary": base["summary"],
        "content": content,
    }


# ---------- GITHUB REPOS ----------
@app.get("/api/github-repos")
async def get_github_repos():
    # Devolver directamente los repos destacados sin hacer llamada a GitHub
    # (Esto es más rápido y evita dependencias de la API de GitHub)
    return FALLBACK_REPOS


# ---------- INSTAGRAM FOTOS ----------
# Instagram photo captions translations
PHOTO_CAPTIONS = {
    1: {
        "es": "De mis fotos favoritas. Me llevó muchos meses conseguir el encuadre y la luz perfectos para capturar este mágico momento ¡La paciencia y la perseverancia siempre dan sus frutos! Gracias a la distancia del 600mm f4 de Canon, pude poner el hide a varios metros y mantener una distancia de seguridad suficiente.",
        "en": "One of my favorite photos. It took me many months to achieve the perfect framing and lighting to capture this magical moment. Patience and perseverance always pay off! Thanks to the range of my Canon 600mm f4, I was able to place the hide several meters away and maintain a safe distance.",
    },
    2: {
        "es": "Un hermoso ejemplar, con la cornamenta en plena fase de crecimiento. Los ciervos son animales impresionantes, y fotografiarlos en su hábitat natural es una experiencia única que siempre me llena de emoción. El lugar, en uno de mis rincones favoritos del Parque Natural de Redes (Principado de Asturias), ayuda a que el encuadre sea genial.",
        "en": "A beautiful specimen with antlers in full growth phase. Deer are impressive animals, and photographing them in their natural habitat is a unique experience that always fills me with emotion. The location, in one of my favorite corners of the Redes Natural Park (Asturias), helps create an excellent composition.",
    },
    11: {
        "es": "Fotografía realizada gracias a un hide casero en el medio del río, poniendo carnaza (eliminada mediante las herramientas de Adobe Photoshop) y esperando pacientemente a que se decidiera a ponerse en una posición fotogénica. El agua en primer plano, el valle detrás de él y la gran montaña en el fondo ayudan a crear una fotografía que, personalmente, forma parte de mis Top10 mejores fotografías.",
        "en": "Photo taken from a homemade hide in the middle of the river, using bait (removed with Adobe Photoshop tools) and patiently waiting for the right moment. The water in the foreground, the valley behind and the large mountain in the background help create a photograph that is personally part of my Top 10 best photos.",
    },
    3: {
        "es": "Lugar emblemático del Principado de Asturias, lugar católico de visita obligada. Se trata de la Cueva Santa, situada cerca de la Basílica de Santa María la Real de Covadonga. Fotografía con un gran angular,jugando con la velocidad de obturación para conseguir ese tan precioso efecto seda en la cascada.",
        "en": "An emblematic location in Asturias and a must-visit Catholic site. This is the Holy Cave, located near the Basilica of Santa María la Real de Covadonga. Shot with a wide-angle lens, playing with shutter speed to achieve that precious silk effect on the waterfall.",
    },
    4: {
        "es": "Enero de 2021, en plena tormenta Filomena. Esta preciosa cierva y un servidor, bajo la enorme ventisca, compartimos un momento bellísimo cuando me miró fíjamente y tuve la oportunidad para capturar esta imagen. La nieve cayendo, el viento y el frío no fueron impedimento para que esta fotografía formara parte de mis favoritas.",
        "en": "January 2021, in the midst of Storm Filomena. This beautiful doe and I shared a beautiful moment in the enormous blizzard when she looked directly at me and I had the chance to capture this image. Falling snow, wind and cold did not prevent this photo from becoming one of my favorites.",
    },
    5: {
        "es": "Trabajo realizado gracias a un maestro de la cetrería. La luz y la composición están estudiadas, con un par de flashes en un estudio fotografíco. Se consiguió crear una luz suave y envolvente, que resalta los detalles del ave y crea un ambiente dramático.",
        "en": "Work done thanks to a master of falconry. The light and composition are carefully studied, with a pair of flashes in a photo studio. A soft, enveloping light was achieved, highlighting the details of the bird and creating a dramatic atmosphere.",
    },
    6: {
        "es": "Un gamo, en la Sierra del Sueve (Principado de Asturias). Fotografía realizada a ras de suelo, con un tumbing hide, con un 300mm de tamron. La luz suave del amanecer, el entorno natural y la posición del animal hacen que esta fotografía sea de las que más he vendido.",
        "en": "A fallow deer in the Sierra del Sueve (Asturias). Photo taken at ground level with a tumbing hide and a 300mm Tamron lens. The soft light of dawn, the natural environment and the animal's position make this one of my best-selling photographs.",
    },
    7: {
        "es": "Un precioso zorro rojo (Vulpes vulpes), fotografiado en plena naturaleza, en el Parque Natural de Somiedo (Principado de Asturias). La bonita nevada hace de la escena un entorno mágico, y el zorro, con su pelaje espeso y su mirada curiosa, añade un toque de vida y dinamismo a la imagen.",
        "en": "A beautiful red fox (Vulpes vulpes), photographed in the wild at the Somiedo Natural Park (Asturias). The lovely snowfall makes the scene a magical setting, and the fox, with its thick fur and curious gaze, adds a touch of life and dynamism to the image.",
    },
    8: {
        "es": "¿Qué es más hermoso que disfrutar de la compañía de una madre protectora con sus cachorros? Una de las zonas oseras más importantes del Principado de Asturias, ofrece escenas tan magníficas e impactantes como ésta.",
        "en": "What is more beautiful than enjoying the company of a protective mother with her cubs? One of the most important bear zones in Asturias offers scenes as magnificent and striking as this one.",
    },
    9: {
        "es": "El Rey. Sin duda mi favorita (hablando de fotografías de osos). La fuerza, la majestuosidad y la presencia de este ejemplar adulto de oso pardo (Ursus arctos) son impresionantes. La luz suave del amanecer resalta los detalles de su pelaje y crea un ambiente mágico alrededor de este magnífico animal.",
        "en": "The King. Undoubtedly my favorite (speaking of bear photographs). The strength, majesty and presence of this adult brown bear specimen (Ursus arctos) are impressive. The soft light of dawn highlights the details of its fur and creates a magical atmosphere around this magnificent animal.",
    },
    10: {
        "es": "Uno de mis animales favoritos. Con esa majestuosidad, ese porte, esa cornamenta imponente... El ciervo es sin duda uno de los animales más bellos y emblemáticos de la fauna europea. Fotografía realizada en el Parque Natural de Redes (Principado de Asturias), en plena época de berrea.",
        "en": "One of my favorite animals. With that majesty, that bearing, that imposing antlers... The deer is undoubtedly one of the most beautiful and emblematic animals of European fauna. Photo taken at the Redes Natural Park (Asturias), during the rutting season.",
    },
}


@app.get("/api/instagram-photos")
def get_instagram_photos(lang: str = "es"):
    photos = [
        {"id": 1, "image_url": "assets/instagram/foto1.jpg"},
        {"id": 2, "image_url": "assets/instagram/foto2.jpg"},
        {"id": 11, "image_url": "assets/instagram/foto011.jpg"},
        {"id": 3, "image_url": "assets/instagram/foto3.jpg"},
        {"id": 4, "image_url": "assets/instagram/foto4.jpg"},
        {"id": 5, "image_url": "assets/instagram/foto5.jpg"},
        {"id": 6, "image_url": "assets/instagram/foto6.jpg"},
        {"id": 7, "image_url": "assets/instagram/foto7.jpg"},
        {"id": 8, "image_url": "assets/instagram/foto8.jpg"},
        {"id": 9, "image_url": "assets/instagram/foto9.jpg"},
        {"id": 10, "image_url": "assets/instagram/foto010.jpg"},
    ]
    
    # Agregar URLs optimizadas para cada foto
    for photo in photos:
        base_url = photo["image_url"]
        # LQIP (Low Quality Image Placeholder) - 50x50px muy comprimido
        photo["lqip_url"] = f"{base_url}?w=50&h=50&q=20&blur=10"
        # Responsive srcset
        photo["srcset"] = {
            "mobile": f"{base_url}?w=300&h=300&fit=crop&q=80",    # Celular
            "tablet": f"{base_url}?w=500&h=500&fit=crop&q=85",    # Tablet
            "desktop": f"{base_url}?w=800&h=800&fit=crop&q=90",   # Desktop
        }
        # Post URL por defecto vacío
        if "post_url" not in photo:
            photo["post_url"] = None
    
    # Add captions in the requested language
    lang = lang if lang in ["es", "en"] else "es"
    for photo in photos:
        photo["caption"] = PHOTO_CAPTIONS.get(photo["id"], {}).get(lang, "")
    
    return photos
