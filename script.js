const outputDiv = document.getElementById('output');
const commands = [
    { cmd: 'init_celebration.exe', output: 'Iniciando secuencia de fiesta...' },
    { cmd: 'load_wishes --all', output: 'Cargando buenos deseos: [██████████] 100%' },
    { cmd: 'echo "¡Feliz Cumpleaños!"', output: '¡FELIZ CUMPLEAÑOS!\n\nQue tengas un día lleno de éxitos, código limpio y cero bugs. \n¡Pásala increíble!' }
];

let cmdIndex = 0;
let charIndex = 0;
let isTypingCmd = true;

// Helper to create line elements
function createLine(text = '', isPrompt = true) {
    const line = document.createElement('div');
    if (isPrompt) {
        line.innerHTML = `<span class="prompt">$</span> <span class="cmd-text">${text}</span>`;
    } else {
        line.className = 'output';
        line.textContent = text;
    }
    return line;
}

// Typing simulation
function typeWriter() {
    if (cmdIndex >= commands.length) return;

    const currentCmd = commands[cmdIndex];

    if (isTypingCmd) {
        // Typing the command in the current pending line (simulated by updating last prompts)
        // Ideally we append char by char.
        // For simplicity: We create a finished line when done.
    }
}

// Simplified logic: Async wait function
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTerminal() {
    for (const item of commands) {
        // Type command
        const line = document.createElement('div');
        line.className = 'line';
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '$';
        const cmdSpan = document.createElement('span');
        cmdSpan.className = 'command';

        line.appendChild(prompt);
        line.appendChild(document.createTextNode(' '));
        line.appendChild(cmdSpan);
        outputDiv.appendChild(line);

        for (let i = 0; i < item.cmd.length; i++) {
            cmdSpan.textContent += item.cmd[i];
            await wait(50 + Math.random() * 50);
        }

        await wait(300);

        // Show output
        if (item.output) {
            const out = document.createElement('div');
            out.className = 'output';
            out.textContent = item.output;
            outputDiv.appendChild(out);
        }

        await wait(500);
    }
}

runTerminal();
