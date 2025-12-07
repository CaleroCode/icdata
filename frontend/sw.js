// Service Worker para PWA - Cachea archivos para funcionar offline

const CACHE_NAME = 'icdata-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
  '/manifest.json',
];

// Instalar Service Worker y cachear archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: cacheando archivos');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Algunos archivos no pudieron ser cacheados:', err);
        // No fallar si algunos archivos no se cachean
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activar Service Worker y limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: eliminando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar requests: primero online, luego offline
self.addEventListener('fetch', (event) => {
  // Solo cachear requests GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // Primero intentar red (mejor para contenido dinámico)
    fetch(event.request)
      .then((response) => {
        // Si funciona, cachear la respuesta
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, usar cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si no hay cache, mostrar página offline (opcional)
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
