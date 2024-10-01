///////////////////////////// CARACTERES RANDOM

const characters = "abcdefghijklmñopqABCDEFGHIJK!@#$%^&*()_+?/-";

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function generateRandomText(length) {
  let randomText = "";
  for (let i = 0; i < length; i++) {
      randomText += getRandomCharacter();
  }
  return randomText;
}

function animateRandomText(element, length) {
  function updateText() {
      element.textContent = generateRandomText(length);
      setTimeout(updateText, 100); // Adjust speed of animation
  }
  updateText();
}

document.querySelectorAll('.random-text').forEach(element => {
  const length = element.getAttribute('data-length') || 8; // Default to 8 if not specified
  animateRandomText(element, length);
});



///////////////////////////// LINEA SVG

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
      threshold: 0.1 // El porcentaje de visibilidad requerido para disparar la animación
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
          } else {
              entry.target.classList.remove('animate');
          }
      });
  }, observerOptions);

  document.querySelectorAll('.animated-path').forEach(element => {
      observer.observe(element);
  });
});



/////////////////////// TOGGLE SCROLL TO TOP

const scrollToTopBtn = document.getElementById('scroll-to-top');
const scrollToTopArrow = document.getElementById('scroll-to-top-arrow');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add('scale-100');
    scrollToTopBtn.classList.remove('scale-50');
    scrollToTopArrow.classList.add('scale-100');
    scrollToTopArrow.classList.remove('scale-0');

  } else {
    scrollToTopBtn.classList.add('scale-50');
    scrollToTopBtn.classList.remove('scale-100');
    scrollToTopArrow.classList.add('scale-0');
    scrollToTopArrow.classList.remove('scale-100');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});