document.addEventListener("DOMContentLoaded", () => {
    const randomChars = "!*_+?/-";
    const defaultRevealSpeed = 500; // Velocidad de revelación por defecto en milisegundos por palabra
    const visibleSpace = ' '; // Espacio visible
    const paragraphSeparator = '\n\n'; // Separador de párrafos

    function getRandomChar() {
        return randomChars[Math.floor(Math.random() * randomChars.length)];
    }

    function revealText(element) {
        const text = element.getAttribute('data-text');
        const revealSpeed = element.getAttribute('data-speed') || defaultRevealSpeed;
        const randomDuration = parseInt(element.getAttribute('data-random-duration')) || 300; // Leer la duración del atributo
        const highlightIndexes = (element.getAttribute('data-highlight') || "").split(',').map(index => parseInt(index)); // Posiciones a resaltar
        element.style.visibility = 'visible';
        element.style.opacity = 1;
        element.innerHTML = "";
        const paragraphs = text.split(paragraphSeparator);

        paragraphs.forEach((paragraph, pIndex) => {
            const paragraphDiv = document.createElement('div');
            paragraphDiv.style.marginBottom = '0px'; // Espaciado entre párrafos
            element.appendChild(paragraphDiv);

            const wordsArray = paragraph.split(' ');

            wordsArray.forEach((word, wIndex) => {
                const span = document.createElement('span');
                span.style.display = 'inline-flex';
                span.style.opacity = 1;

                // Resaltar la palabra si está en el índice especificado
                if (highlightIndexes.includes(wIndex)) {
                    span.style.color = '#FF893C'; // Cambia el color aquí si lo deseas
                }

                paragraphDiv.appendChild(span);

                const charsArray = word.split('');

                charsArray.forEach((char, charIndex) => {
                    const charSpan = document.createElement('span');
                    charSpan.textContent = getRandomChar();
                    charSpan.style.opacity = 0;
                    span.appendChild(charSpan);

                    setTimeout(() => {
                        charSpan.className = 'random';
                        charSpan.textContent = getRandomChar();
                        charSpan.style.opacity = 1;
                    }, charIndex * revealSpeed);

                    setTimeout(() => {
                        charSpan.className = 'revealed';
                        charSpan.textContent = char;
                        charSpan.style.opacity = 1;
                    }, charIndex * revealSpeed + randomDuration);
                });

                setTimeout(() => {
                    span.className = 'revealed';
                    span.style.opacity = 1;
                }, wIndex * revealSpeed);

                if (wIndex < wordsArray.length - 1) {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.textContent = visibleSpace;
                    spaceSpan.style.display = 'inline';
                    paragraphDiv.appendChild(spaceSpan);
                }
            });

            if (pIndex < paragraphs.length - 1) {
                const paragraphBreak = document.createElement('br');
                element.appendChild(paragraphBreak);
            }
        });
    }

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealText(entry.target);
            } else {
                entry.target.style.visibility = 'hidden';
                entry.target.style.opacity = 0;
            }
        });
    }, observerOptions);

    document.querySelectorAll('.text-prediction').forEach(element => {
        element.style.visibility = 'hidden';
        element.style.opacity = 0;
        observer.observe(element);
    });
});
