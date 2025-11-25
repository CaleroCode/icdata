# icdata — Portafolio de Iván Calero

Portafolio personal de **Iván Calero**: desarrollo web, fotografía y diseño visual en una sola web.  
Combina un **backend en Python (FastAPI)** con un **frontend en HTML + TailwindCSS + JavaScript vanilla**.

> Muestra quién soy, qué construyo y cómo pienso.

---

## ✨ Funcionalidades principales

### 🧑‍💻 Sobre mí
- Texto de presentación cargado desde el backend (`/api/profile`).
- Bio dividida en párrafos y con texto justificado.
- Imagen flotante en el hero (`principal.jpg`) que refuerza la identidad visual.
- Logo con la misma imagen en la navbar, coherente con la marca **icdata**.

### 🛠️ Skills por categorías
Las habilidades se agrupan en categorías (por ejemplo):

- **Programming & Web**
- **Developer Tools**
- **Databases**
- **Design, 3D & Video**

Cada categoría se muestra con chips/badges visuales para una lectura rápida.

### 🐙 Proyectos destacados (GitHub)
Sección de **proyectos destacados**, conectada con el backend:

- Los repositorios se obtienen dinámicamente desde la API de GitHub (`/api/github-repos` en el backend, que a su vez tira de `https://api.github.com/users/CaleroCode/repos`).
- Filtro de proyectos relevantes (por ejemplo: `EM-pulse`, `CocinIA`, `nutty_lucky`, etc.).
- Cada tarjeta incluye:
  - Nombre del repo
  - Descripción
  - Tags / topics (tecnologías o contexto)
  - Enlace directo a GitHub

Además, hay un enlace a:

> **"Ver todos los repos en GitHub"**

que lleva directamente al perfil de GitHub con la pestaña de repositorios.

### 🎨 Proyectos destacados con contexto
Sección específica **“Proyectos destacados”** donde se explican tres proyectos clave con más detalle:

- **EM-PULSE**
  - Plataforma sobre esclerosis múltiple.
  - Full stack (backend + frontend + base de datos).
  - Enfoque en empatía y accesibilidad.

- **CocinIA**
  - Web que genera recetas con IA.
  - Integración de modelos de lenguaje y APIs.

- **Nutty Lucky**
  - Juego 2D en Pygame (endless runner).
  - Práctica de POO, estados de juego, colisiones, parallax, etc.

Cada proyecto incluye:
- Contexto del problema.
- Tecnologías usadas.
- Enlace directo al repositorio.

### 📷 Fotografía & visual

Sección **“Fotografía & visual”**:

- Las fotos se definen en el backend (`/api/instagram-photos`), con:
  - `image_url` (rutas a `/assets/instagram/...`)
  - `caption` (texto corto para cada foto)
  - opcionalmente `post_url` (para enlazar a Instagram directo).
- En el frontend:
  - Las imágenes se muestran en **blanco y negro** (filtro CSS).
  - Al hacer hover, se ven en **color**.
  - Al hacer click en una tarjeta:
    - Se abre un **modal** con la imagen grande.
    - El modal tiene una animación donde la imagen “sale” desde su posición, crece y rota en el eje Y (efecto de card girando).
- Enlace inferior:
  - **“Ver más fotos en Instagram”** → abre el perfil real de Instagram en una nueva pestaña.

### 📝 Notas / Aprendizajes (mini blog)

Sección **“Notas / Aprendizajes”**:

- Tarjetas tipo mini-blog donde se resumen ideas como:
  - *“Lo que aprendí haciendo EM-PULSE”*
  - *“10 cosas que me hubiera gustado saber antes de usar FastAPI”*
  - *“Qué me enseñó construir un juego en Pygame sobre estados y eventos”*
- Es una forma de mostrar **mentalidad y proceso de aprendizaje**, no solo resultado.

*(El contenido se puede ir ampliando poco a poco.)*

### 📩 Contacto

Sección de contacto clara y directa:

- Enlace de correo:
  - `mailto:ivanicaleroo@gmail.com`
- Enlace a LinkedIn:
  - `https://www.linkedin.com/in/ivancalero/`
- Botones para:
  - **Escríbeme** (email)
  - **Ver LinkedIn**
  - **Descargar CV (PDF)** → `assets/cv-ivan-calero.pdf`

---

## 🧱 Arquitectura

### Backend

- **Lenguaje:** Python
- **Framework:** FastAPI
- **Servidor de desarrollo:** Uvicorn
- **Librerías clave:**  
  - `fastapi`  
  - `uvicorn`  
  - `httpx` (para consultar la API de GitHub)
  - `fastapi.middleware.cors` (CORS para permitir llamadas desde el frontend)

Endpoints principales:

- `GET /api/profile`
  - Devuelve:
    - nombre
    - marca (`icdata`)
    - rol
    - bio (texto largo, en varios párrafos)
    - enlaces (GitHub, Instagram, LinkedIn)
    - skills agrupadas por categorías

- `GET /api/github-repos`
  - Llama a la API de GitHub para el usuario `CaleroCode`.
  - Filtra y transforma los repos a un formato más amigable para el frontend.
  - Opcionalmente filtra por proyectos “destacados”.

- `GET /api/instagram-photos`
  - Devuelve una lista fija de fotos:
    - rutas locales tipo `assets/instagram/foto1.jpg`
    - textos descriptivos (`caption`)
    - opcionalmente `post_url` a Instagram.

### Frontend

- **HTML5** simple (sin framework).
- **TailwindCSS** vía CDN.
- **JavaScript vanilla** (`main.js`).

Responsabilidades del frontend:

- Cargar el año actual en el footer.
- Cargar el perfil con `fetch('/api/profile')` y:
  - Dividir la bio en párrafos.
  - Pintar las skills por categorías.
- Cargar repos con `fetch('/api/github-repos')` y crear tarjetas.
- Cargar fotos con `fetch('/api/instagram-photos')` y:
  - Crear la cuadrícula de fotos.
  - Aplicar filtros y efectos hover.
  - Gestionar la lógica del modal (abrir/cerrar, animaciones, etc.).
- Gestionar el modal:
  - Click en una tarjeta → abre modal con foto y texto.
  - Click en ✕, click fuera del contenedor o tecla `Escape` → cierra modal.

---

## 📁 Estructura del proyecto (simplificada)

```bash
icdata/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── ...
└── frontend/
    ├── index.html
    ├── styles.css
    ├── main.js
    └── assets/
        ├── instagram/
        │   ├── principal.jpg
        │   ├── foto1.jpg
        │   ├── foto2.jpg
        │   └── ...
        └── cv-ivan-calero.pdf


## 🚀 Puesta en marcha

### 1. Backend (FastAPI)

Desde la carpeta `backend`:

```bash
# Crear y activar entorno virtual (ejemplo en Windows + Git Bash)
python -m venv .venv
source .venv/Scripts/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servidor
python -m uvicorn backend.main:app --reload

### 2. Frontend

Desde la carpeta `frontend`, puedes usar:

- **Live Server** (VS Code), o  
- Un servidor estático simple (por ejemplo, con Python):

```bash
# Desde la carpeta frontend
python -m http.server 5500

## 🧭 Futuras mejoras

- Añadir favicon personalizado (logotipo **icdata**).
- Terminar de pulir el contenido de la sección **Notas / Aprendizajes**.
- Internacionalización completa (ES/EN) en todo el contenido.
- Deploy:
  - Backend en **Render / Railway / Fly.io**.
  - Frontend en **Netlify / Vercel / GitHub Pages**.
- Añadir tests básicos para el backend (**Pytest**).

---

## 💬 Autor

**Iván Calero** — Desarrollador full stack en progreso, fotógrafo de fauna salvaje y creador de **icdata**.

- GitHub: [@CaleroCode](https://github.com/CaleroCode)
- LinkedIn: [ivancalero](https://www.linkedin.com/in/ivancalero/)

> “Doy forma a ideas con imagen y código.”
