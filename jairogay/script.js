const card = document.querySelector('.card');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let isAnimating = false;

// Interactions
card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
    if (card.classList.contains('is-flipped') && !isAnimating) {
        isAnimating = true;
        animate(); // Start fireworks
    }
});

// Canvas Setup
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Fireworks Logic
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        this.dx = Math.cos(angle) * velocity;
        this.dy = Math.sin(angle) * velocity;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.1; // Gravity
        this.dx *= 0.98; // Friction
        this.dy *= 0.98;
        this.alpha -= this.decay;
    }
}

let particles = [];

function createFirework(x, y) {
    const colors = ['#facc15', '#f8fafc', '#ef4444', '#3b82f6', '#10b981'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        if (p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(index, 1);
        }
    });

    // Auto fireworks when card is open
    if (card.classList.contains('is-flipped')) {
        if (Math.random() < 0.08) { // Frequency
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.4 // Upper part of screen
            );
        }
    }
}

// Initial firework for background ambience (optional, maybe distracting?)
// let's stick to only when opened.
