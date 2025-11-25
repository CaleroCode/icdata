from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

# 👇 PON AQUI TU USUARIO REAL DE GITHUB
GITHUB_USERNAME = "CaleroCode"

# Repos de fallback por si la llamada a GitHub falla
FALLBACK_REPOS = [
    {
        "name": "EM-pulse",
        "description": "Plataforma web sobre esclerosis múltiple para sensibilizar y acompañar a pacientes y entorno.",
        "url": "https://github.com/CaleroCode/EM-pulse",
        "topics": ["python", "fastapi", "react"],
    },
    {
        "name": "CocinIA",
        "description": "App que genera recetas personalizadas usando modelos de lenguaje y Flask.",
        "url": "https://github.com/CaleroCode/CocinIA",
        "topics": ["python", "flask", "ia"],
    },
    {
        "name": "nutty_lucky",
        "description": "Endless runner en Pygame con una ardilla muy intensa.",
        "url": "https://github.com/CaleroCode/nutty_lucky",
        "topics": ["python", "pygame", "game-dev"],
    },
    {
        "name": "julias-run",
        "description": "Juego educativo en Pygame para enseñar POO de forma práctica.",
        "url": "https://github.com/CaleroCode/julias-run",
        "topics": ["python", "pygame", "educacion"],
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
            "MongoDB",
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
            "instagram": "https://instagram.com/ivancalero.wildlife",
            "linkedin": "https://www.linkedin.com/in/tu-usuario/",
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
    url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                url,
                headers={
                    "Accept": "application/vnd.github+json",
                    "User-Agent": "icdata-portfolio",
                },
                timeout=10.0,
            )
    except httpx.RequestError as e:
        print(f"[GitHub] Error de conexión: {e}")
        return FALLBACK_REPOS

    if response.status_code != 200:
        print(
            f"[GitHub] Respuesta no OK: {response.status_code} - {response.text[:200]}"
        )
        return FALLBACK_REPOS

    repos_data = response.json()

    repos_filtrados = []
    for repo in repos_data:
        if repo.get("fork"):
            continue

        repos_filtrados.append(
            {
                "name": repo.get("name"),
                "description": repo.get("description") or "Sin descripción.",
                "url": repo.get("html_url"),
                "topics": repo.get("topics") or [],
            }
        )

    destacados = {
        "EM-pulse",
        "CocinIA",
        "nutty_lucky",
        "julias-run",
        "github-search",
        "AgendaApp",
    }

    repos_filtrados = [r for r in repos_filtrados if r["name"] in destacados]

    for r in repos_filtrados:
        if not r["topics"]:
            nombre = r["name"].lower()
            if "django" in nombre:
                r["topics"] = ["python", "django"]
            elif "fastapi" in nombre:
                r["topics"] = ["python", "fastapi"]
            elif "pygame" in nombre:
                r["topics"] = ["python", "pygame"]
            else:
                r["topics"] = ["python", "project"]

    if not repos_filtrados:
        return FALLBACK_REPOS

    return repos_filtrados


# ---------- INSTAGRAM FOTOS ----------
@app.get("/api/instagram-photos")
def get_instagram_photos():
    return [
        {
            "id": 1,
            "image_url": "assets/instagram/foto1.jpg",
            "caption": "Vamos a probar a ver si esto funciona lorem ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet consectetur adipiscing elit. lorem ipsum dolor sit amet consectetur adipiscing elit.",
        },
        {
            "id": 2,
            "image_url": "assets/instagram/foto2.jpg",
            "caption": "Texto para foto 2.",
        },
        {
            "id": 11,
            "image_url": "assets/instagram/foto011.jpg",
            "caption": "Texto para foto 11.",
        },
        {
            "id": 3,
            "image_url": "assets/instagram/foto3.jpg",
            "caption": "Texto para foto 3.",
        },
        {
            "id": 4,
            "image_url": "assets/instagram/foto4.jpg",
            "caption": "Texto para foto 4.",
        },
        {
            "id": 5,
            "image_url": "assets/instagram/foto5.jpg",
            "caption": "Texto para foto 5.",
        },
        {
            "id": 6,
            "image_url": "assets/instagram/foto6.jpg",
            "caption": "Texto para foto 6.",
        },
        {
            "id": 7,
            "image_url": "assets/instagram/foto7.jpg",
            "caption": "Texto para foto 7.",
        },
        {
            "id": 8,
            "image_url": "assets/instagram/foto8.jpg",
            "caption": "Texto para foto 8.",
        },
        {
            "id": 9,
            "image_url": "assets/instagram/foto9.jpg",
            "caption": "Texto para foto 9.",
        },
        {
            "id": 10,
            "image_url": "assets/instagram/foto010.jpg",
            "caption": "Texto para foto 10.",
        },
    ]
