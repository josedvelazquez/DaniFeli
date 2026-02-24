const textContainer = document.getElementById('typewriter-text');
const btn = document.getElementById('typeBtn');

const message = `Querida hermana,

Hoy comienza un nuevo capítulo en tu vida, y me emociona pensar en todas las 
cosas maravillosas que aún están por escribirse en tu historia. Cada año que 
pasa te vuelves más fuerte, más sabia y aún más especial.

Deseo que este nuevo ciclo esté lleno de alegría sincera, sueños cumplidos, 
oportunidades increíbles y momentos que te hagan sonreír todos los días. 
Que los retos te hagan crecer y que nunca te falte amor, salud y éxito en 
todo lo que emprendas.

Gracias por ser una hermana extraordinaria, por tu cariño, tu apoyo y por estar siempre presente. 
Te quiero muchísimo y siempre voy a desear lo mejor para ti.

    ¡Feliz cumpleaños!`;

let i = 0;
let isTyping = false;

function typeWriter() {
    if (i < message.length) {
        // Handle newlines
        if (message.charAt(i) === '\n') {
            textContainer.innerHTML += '<br>';
        } else {
            textContainer.innerHTML += message.charAt(i);
        }
        i++;
        setTimeout(typeWriter, 50); // Speed
    } else {
        isTyping = false;
        // Add blinking cursor at end
        textContainer.innerHTML += '<span class="cursor"></span>';
    }
}

function startTyping() {
    if (isTyping) return;
    isTyping = true;
    textContainer.innerHTML = ''; // Clear
    i = 0;
    typeWriter();
}

btn.addEventListener('click', startTyping);

// Image Zoom Logic
const polaroid = document.querySelector('.polaroid-hint');
const overlay = document.getElementById('imageOverlay');
const closeBtn = document.querySelector('.close-btn');

polaroid.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

// Auto start
startTyping();
