const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const textYear = document.querySelector('.year-3d');
const scene = document.querySelector('.scene');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Interactive Parallax
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;
    
    scene.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    textYear.style.textShadow = `${x}px ${y}px 20px rgba(255,255,255,0.5)`;
});

// Fireworks Logic (Enhanced)
class Particle {
    constructor(x, y, color, velocity) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * velocity + 1;
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.friction = 0.98;
        this.gravity = 0.05;
        this.decay = Math.random() * 0.01 + 0.005;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        
        // Glitter effect
        if (Math.random() > 0.5) ctx.fillStyle = '#fff';
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.dx *= this.friction;
        this.dy *= this.friction;
        this.dy += this.gravity;
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= this.decay;
    }
}

let particles = [];

function createExplosion(x, y) {
    const palette = [
        '#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#ffffff', '#ffd700'
    ];
    const color = palette[Math.floor(Math.random() * palette.length)];
    const particleCount = 100;
    
    for(let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color, 6)); // Higher velocity
    }
}

function loop() {
    requestAnimationFrame(loop);
    
    // Trail effect using transparent fill
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, index) => {
        if(p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(index, 1);
        }
    });
    
    // Auto launch
    if(Math.random() < 0.03) {
        createExplosion(
            Math.random() * canvas.width,
            Math.random() * canvas.height * 0.6
        );
    }
}

loop();

// Click interaction
document.addEventListener('click', (e) => {
    createExplosion(e.clientX, e.clientY);
    
    // Thump effect on text
    textYear.style.transform = "scale(1.1) translateZ(50px)";
    setTimeout(() => {
        textYear.style.transform = "scale(1) translateZ(0)";
    }, 100);
});
