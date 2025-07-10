console.log("Welcome to the future of portfolios!");

// ---- Three.js setup ----
import * as THREE from 'https://cdn.skypack.dev/three@0.150.1';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-bg').appendChild(renderer.domElement);

// Create geometry (torus knot for futuristic vibe)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0x00ffff,
  emissiveIntensity: 0.5
});
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x043b3b, 0.2);
pointLight.position.set(15, 25, 5);
scene.add(pointLight);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

// Update on resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---- Typing animation ----
new TypeIt("#hero-text", {
  strings: ["Hello, I'm Yamen"],
  speed: 60,
  waitUntilVisible: true,
  cursorChar: "_",
}).go();

// ---- Custom cursor ----
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
AOS.init();

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#00ffff" },
    "shape": {
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" },
      "polygon": { "nb_sides": 5 }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00ffff",
      "opacity": 0.3,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
      "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
      "repulse": { "distance": 200, "duration": 0.4 },
      "push": { "particles_nb": 4 },
      "remove": { "particles_nb": 2 }
    }
  },
  "retina_detect": true
});

const svg = document.getElementById("blobs");

function createBlob(id, color, delay) {
  const blob = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  blob.setAttribute("r", "150");
  blob.setAttribute("fill", color);
  blob.setAttribute("opacity", "0.15");
  svg.appendChild(blob);

  let angle = Math.random() * 360;
  let radius = 200 + Math.random() * 100;

  function animate() {
    angle += 0.5;
    const x = window.innerWidth / 2 + radius * Math.cos(angle * Math.PI / 180);
    const y = window.innerHeight / 2 + radius * Math.sin(angle * Math.PI / 180);
    blob.setAttribute("cx", x);
    blob.setAttribute("cy", y);
    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    animate();
  }, delay);
}

// Create multiple blobs with different colors & delays
createBlob("blob1", "#00ffff", 0);
createBlob("blob2", "#ff00ff", 500);
createBlob("blob3", "#ffffff", 1000);

const ambient = document.getElementById("ambientSound");
const toggleBtn = document.getElementById("soundToggle");

let isMuted = false;

toggleBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  ambient.muted = isMuted;
  toggleBtn.textContent = "🔇 Sound Off";

});

ambient.volume = 0.2; // subtle pad

ambient.addEventListener("canplay", () => {
  ambient.currentTime = 55; // skip first 55 seconds
  ambient.play();
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const pauseBtn = document.querySelector('.pause-btn');
const progressFill = document.querySelector('.progress-fill');

let currentIndex = 0;
let autoSlideInterval;
let progressInterval;
let isPaused = false;
const slideDuration = 5000; // 5 seconds

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function startProgress() {
  progressFill.style.transition = 'none';
  progressFill.style.width = '0%';
  requestAnimationFrame(() => {
    progressFill.style.transition = `width ${slideDuration}ms linear`;
    progressFill.style.width = '100%';
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    updateDots();
    startProgress();
  }, slideDuration);
  startProgress();
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  progressFill.style.transition = 'none';
}

pauseBtn.addEventListener('click', () => {
  if (isPaused) {
    pauseBtn.textContent = '⏸️ Pause';
    startAutoSlide();
  } else {
    pauseBtn.textContent = '▶️ Play';
    stopAutoSlide();
  }
  isPaused = !isPaused;
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
  updateDots();
  if (!isPaused) {
    stopAutoSlide();
    startAutoSlide();
  }
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
  updateDots();
  if (!isPaused) {
    stopAutoSlide();
    startAutoSlide();
  }
});

window.addEventListener('resize', updateCarousel);

// ----- Dots logic from before -----
const dotsContainer = document.querySelector('.carousel-dots');

slides.forEach((_, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
    updateDots();
    if (!isPaused) {
      stopAutoSlide();
      startAutoSlide();
    }
  });
});

// Start initial auto-slide
startAutoSlide();
function updateFocus() {
  const slideWidth = slides[0].getBoundingClientRect().width + 20;
  const centered = Math.round(track.scrollLeft / slideWidth);
  slides.forEach(s => s.classList.remove('focused'));
  slides[centered]?.classList.add('focused');
}

// Sync focus on auto-slide and manual scroll
track.addEventListener('scroll', () => {
  clearTimeout(track._scrollTimeout);
  track._scrollTimeout = setTimeout(updateFocus, 100);
});