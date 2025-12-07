
// ----- PWA - Progressive Web App -----
let deferredPrompt = null;

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('Service Worker registrado:', registration);
      })
      .catch((err) => {
        console.warn('Error registrando Service Worker:', err);
      });
  });
}

// Capturar evento de instalación (beforeinstallprompt)
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('Evento beforeinstallprompt capturado');
  event.preventDefault();
  deferredPrompt = event;
  console.log('PWA lista para instalar');
});

// Manejar clic en botón de instalar
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('pwa-install-btn');
  
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      console.log('Clic en botón instalar. deferredPrompt:', deferredPrompt ? 'disponible' : 'no disponible');
      
      if (deferredPrompt) {
        // Mostrar el diálogo de instalación nativa
        deferredPrompt.prompt();
        
        // Esperar a que el usuario responda
        const { outcome } = await deferredPrompt.userChoice;
        console.log('Resultado de instalación:', outcome);
        
        // Limpiar la referencia
        deferredPrompt = null;
        
        // Mostrar mensaje de éxito
        if (outcome === 'accepted') {
          console.log('PWA instalada exitosamente');
        }
      } else {
        // Si no hay prompt disponible, mostrar instrucciones
        alert(
          'Para instalar esta app:\n\n' +
          '📱 En Android: Abre el menú (⋮) y selecciona "Instalar aplicación"\n' +
          '🍎 En iOS: Toca el botón Compartir (⬆️) y selecciona "Agregar a Pantalla de Inicio"\n' +
          '💻 En PC: Haz clic en el icono de instalación en la barra de direcciones del navegador'
        );
      }
    });
  }
});

// Detectar si ya está instalada
window.addEventListener('appinstalled', () => {
  console.log('PWA instalada desde el navegador');
  const installBtn = document.getElementById('pwa-install-btn');
  if (installBtn) {
    installBtn.textContent = '✅ ICDATA instalada';
    installBtn.disabled = true;
    installBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
});

// Detectar si está en modo standalone (app instalada)
if (window.navigator.standalone === true) {
  console.log('App está en modo standalone (instalada)');
  document.body.classList.add('pwa-standalone');
}

// Mostrar notificación cuando se actualiza el Service Worker
window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker actualizado');
      // Mostrar notificación al usuario si deseas
    });
  }
});
