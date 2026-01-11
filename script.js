const container = document.getElementById('heart-container');
const urlParams = new URLSearchParams(window.location.search);
let text = urlParams.get('name') || "I LOVE YOU";

function createLayer(z, scale, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'text-particle';
        
        const content = document.createElement('div');
        content.className = 'text-content';
        content.textContent = text;
        
        // Add random delay for glittering effect (colorChange, counterSpin, sparkle)
        const delay = Math.random() * 3;
        content.style.animationDelay = `-${delay}s, 0s, -${delay}s`;
        
        el.appendChild(content);
        
        const t = (i / count) * Math.PI * 2;
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
        
        // Increased size multiplier from 10 to 15
        const s = 15 * scale;
        x *= s;
        y *= -s;
        
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        container.appendChild(el);
    }
}

// Create layers for volume
createLayer(0, 1, 25);
createLayer(20, 0.9, 20);
createLayer(-20, 0.9, 20);
createLayer(40, 0.75, 15);
createLayer(-40, 0.75, 15);
createLayer(60, 0.5, 10);
createLayer(-60, 0.5, 10);

// Animation Toggle Logic
let currentMode = 1;
const btn = document.getElementById('anim-btn');
const body = document.body;

btn.addEventListener('click', () => {
    currentMode = (currentMode % 3) + 1; // Cycle 1 -> 2 -> 3 -> 1
    body.className = ''; // Clear previous classes
    if (currentMode === 2) body.classList.add('mode-2');
    if (currentMode === 3) body.classList.add('mode-3');
});

// Background Lips Animation
const lipsContainer = document.getElementById('bg-lips');

function createLip() {
    const lip = document.createElement('div');
    lip.className = 'bg-lip';
    lip.textContent = Math.random() > 0.5 ? '💋' : '❤️';
    
    const startLeft = Math.random() * 100;
    const duration = Math.random() * 5 + 5; // 5-10 seconds
    const size = Math.random() * 40 + 20; // 20-60px
    
    lip.style.left = startLeft + '%';
    lip.style.animationDuration = duration + 's';
    lip.style.fontSize = size + 'px';
    
    lipsContainer.appendChild(lip);
    
    setTimeout(() => lip.remove(), duration * 1000);
}

setInterval(createLip, 800);

// Update Name Logic
const nameInput = document.getElementById('name-input');
const updateBtn = document.getElementById('update-btn');
const resetBtn = document.getElementById('reset-btn');

if (urlParams.has('name')) {
    nameInput.value = text;
}

updateBtn.addEventListener('click', () => {
    if (nameInput.value.trim() !== "") {
        text = nameInput.value.trim();
        const particles = document.querySelectorAll('.text-content');
        particles.forEach(p => p.textContent = text);
    }
});

resetBtn.addEventListener('click', () => {
    text = "I LOVE YOU";
    nameInput.value = "";
    const particles = document.querySelectorAll('.text-content');
    particles.forEach(p => p.textContent = text);

    // Stop music
    audio.pause();
    audio.currentTime = 0;
    musicBtn.textContent = "Play Music";
});

// Share Button Logic
const shareBtn = document.getElementById('share-btn');

shareBtn.addEventListener('click', () => {
    const baseUrl = window.location.href.split('?')[0];
    const urlToShare = `${baseUrl}?name=${encodeURIComponent(text)}`;
    if (navigator.share) {
        navigator.share({
            title: '3D Heart Animation',
            text: `Check out this heart for ${text}!`,
            url: urlToShare
        }).catch(console.error);
    } else {
        alert("Copy this link: " + urlToShare);
    }
});

// Music Logic
const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicBtn.textContent = "Pause Music";
    } else {
        audio.pause();
        musicBtn.textContent = "Play Music";
    }
});

// Try to play if autoplay was blocked by browser
document.body.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicBtn.textContent = "Pause Music";
    }
}, { once: true });