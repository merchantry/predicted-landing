const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.style.imageRendering = "pixelated";


const frameCount = 120;
const currentFrame = index => (
  `canvas/frame.${index.toString().padStart(0, '0')}.webp`
);

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

img.onload = function() {
  drawCoveringImage(img);
};

const drawCoveringImage = image => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const imageAspect = image.width / image.height;
  const canvasAspect = canvasWidth / canvasHeight;

  let drawWidth, drawHeight;

  if (canvasAspect > imageAspect) {
    // Canvas is wider relative to its height than the image
    drawWidth = canvasWidth;
    drawHeight = drawWidth / imageAspect;
  } else {
    // Canvas is taller relative to its width than the image
    drawHeight = canvasHeight;
    drawWidth = drawHeight * imageAspect;
  }

  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(image, x, y, drawWidth, drawHeight);
};

const updateImage = index => {
  img.src = currentFrame(index);
  img.onload = function() {
    drawCoveringImage(img);
  };
};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawCoveringImage(img);
});

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex));
  // requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
