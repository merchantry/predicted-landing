document.addEventListener('wheel', (event) => {
  // Verificar si el dispositivo es móvil
  if (window.innerWidth <= 768 || 'ontouchstart' in window) {
    return; // No ejecuta el código en móviles
  }

  event.preventDefault(); // Previene el comportamiento de scroll default

  let sections = document.querySelectorAll('section');
  let currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest('section');

  if (!currentSection) return;

  let nextSection;
  if (event.deltaY > 0) {
    // Scroll hacia abajo
    nextSection = currentSection.nextElementSibling;
  } else {
    // Scroll hacia arriba
    nextSection = currentSection.previousElementSibling;
  }

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}, { passive: false });
