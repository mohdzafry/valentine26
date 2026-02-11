// Timer calculation
const startDate = new Date('2024-05-30T00:00:00');

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const timerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const timerElement = document.getElementById('timer');
    const timerTreeElement = document.getElementById('timer-tree');

    if (timerElement) timerElement.textContent = timerText;
    if (timerTreeElement) timerTreeElement.textContent = timerText;
}

// Update timer every second
updateTimer();
setInterval(updateTimer, 1000);

// Button interactions
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionScreen = document.getElementById('question-screen');
const treeScreen = document.getElementById('tree-screen');
const fallingHeart = document.getElementById('falling-heart');
const loveTree = document.getElementById('love-tree');
const treeMessage = document.querySelector('.tree-message');
const poemContainer = document.querySelector('.poem-container');

// No button - moves away when mouse gets close
let noBtnTimeout;

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within container
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    let newX, newY;

    // For mobile, use simpler positioning
    if (window.innerWidth <= 768) {
        newX = Math.random() > 0.5 ? -20 : 20;
        newY = Math.random() * 100 - 50;
    } else {
        newX = Math.random() * maxX - (btnRect.left - containerRect.left);
        newY = Math.random() * maxY - (btnRect.top - containerRect.top);

        // Ensure it moves a minimum distance
        const distance = Math.sqrt(newX * newX + newY * newY);
        if (distance < 100) {
            newX = newX * (100 / distance);
            newY = newY * (100 / distance);
        }
    }

    // Apply transform
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;

    // Add a little shake
    noBtn.style.transition = 'transform 0.2s ease';
}

// Yes button - trigger animation sequence
yesBtn.addEventListener('click', () => {
    // Hide question screen
    questionScreen.style.transition = 'opacity 1s ease';
    questionScreen.style.opacity = '0';

    setTimeout(() => {
        questionScreen.classList.remove('active');
        treeScreen.classList.add('active');

        // Start falling heart animation
        fallingHeart.classList.add('animate');

        // Grow the tree after heart falls
        loveTree.classList.add('grow');

        // Show tree message and poem
        treeMessage.classList.add('show');
        poemContainer.classList.add('show');
    }, 1000);
});

// Add random floating hearts to background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = Math.random() > 0.5 ? '💕' : '💗';
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-10%';
    heart.style.opacity = '0.3';
    heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';

    const heartsBackground = document.querySelector('.hearts-background');
    if (heartsBackground) {
        heartsBackground.appendChild(heart);
    }
}

// Create multiple floating hearts
for (let i = 0; i < 15; i++) {
    setTimeout(() => createFloatingHeart(), i * 800);
}

// Add sparkle effect to Yes button
yesBtn.addEventListener('mouseenter', () => {
    yesBtn.style.filter = 'brightness(1.2)';
});

yesBtn.addEventListener('mouseleave', () => {
    yesBtn.style.filter = 'brightness(1)';
});
