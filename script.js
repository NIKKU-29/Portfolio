const dynamicText = document.querySelector('.dynamic-text');
const texts = ['`Design`', '`Create`', '`Code`'];
let index = 0;

function changeText() {
    dynamicText.classList.remove('show');
    setTimeout(() => {
        dynamicText.textContent = texts[index];
        dynamicText.setAttribute('data-text', texts[index]);
        dynamicText.classList.add('show');
        index = (index + 1) % texts.length;
    }, 500);
}

setInterval(changeText, 3000);
changeText();

document.querySelectorAll('a[href^="#projects"], a[href^="#cont"], a[href^="#abt"]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior (jumping)
        const targetId = link.getAttribute('href'); // Get the href attribute (e.g., "#projects", "#contact-main", or "#hero")
        const targetElement = document.querySelector(targetId); // Select the target element based on the ID
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

let progress = 0;
const progressBar = document.querySelector('.progress-bar');
const progressText = document.querySelector('.progress-text');
const schoolMilestone = document.querySelector('.milestone.school');
const btechMilestone = document.querySelector('.milestone.btech');

function updateProgress() {
    progressBar.style.width = `${progress}%`;

    if (progress >= 20) {
        schoolMilestone.classList.add('active');
    } else {
        schoolMilestone.classList.remove('active');
    }

    if (progress >= 60) {
        btechMilestone.classList.add('active');
    } else {
        btechMilestone.classList.remove('active');
    }

    progress += 1;

    if (progress > 60) {
        progress = 60;
    }
}

setInterval(updateProgress, 40);

document.querySelectorAll('a[href^="#projects"]').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior (jumping)
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to projects section
    });
});


const projectPanels = document.querySelectorAll('.right-panel, .right-panel1, .left-panel, .left-panel1');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to make the panels fade in from the left
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Trigger the fade-in when 10% of the element is visible

projectPanels.forEach(panel => {
    observer.observe(panel);
});

const footer = document.getElementById('contact-main');

// Create an intersection observer
const footerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to make the footer fade in
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing after it shows
        }
    });
}, { threshold: 0.4 }); // Trigger when 30% of the footer is visible

footerObserver.observe(footer);

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.expertise-slider');
    const containers = document.querySelectorAll('.con1, .con2');
    
    if (!slider || !containers.length) return;

    let currentTranslate = 0;
    let isScrolling = false;
    let scrollTimeout;
    let autoMovePosition = 0;
    let lastTime = performance.now();

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function autoMove(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        if (!isScrolling) {
            // Move automatically when not scrolling
            autoMovePosition += deltaTime * 0.001; // Adjust speed by changing this multiplier
            if (autoMovePosition >= 100) autoMovePosition = 0;

            containers.forEach(container => {
                container.style.transform = `translateX(${-autoMovePosition}%)`;
            });
        }

        requestAnimationFrame(autoMove);
    }

    requestAnimationFrame(autoMove);

    window.addEventListener('scroll', function() {
        const sliderPosition = slider.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(sliderPosition < screenPosition) {
            slider.classList.add('show');
        }

        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const targetTranslate = scrollPercent * 100;

        isScrolling = true;
        clearTimeout(scrollTimeout);

        autoMovePosition = targetTranslate;

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);

        // Animate the translation during scroll
        function updatePosition() {
            if (!isScrolling) return;

            currentTranslate = lerp(currentTranslate, targetTranslate, 0.1);

            containers.forEach(container => {
                container.style.transform = `translateX(${-currentTranslate}%)`;
            });

            if (isScrolling) {
                requestAnimationFrame(updatePosition);
            }
        }

        requestAnimationFrame(updatePosition);
    });

    containers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            isScrolling = true;
        });

        container.addEventListener('mouseleave', () => {
            isScrolling = false;
        });
    });
});

const sliderWrapper = document.querySelector('.slider-wrapper');

function pauseAnimation() {
    sliderWrapper.style.animationPlayState = 'paused';
    sliderWrapper.style.transform = 'rotate(360deg) scale(1.1)'; // Combine both transformations
}

function resumeAnimation() {
    sliderWrapper.style.animationPlayState = 'running';
    sliderWrapper.style.transform = ''; // Reset transform to remove scaling and rotation
}

sliderWrapper.addEventListener('mouseenter', pauseAnimation);
sliderWrapper.addEventListener('mouseleave', resumeAnimation);

window.onload = function () {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(function (element) {
        element.style.transform = 'translateX(-200px)'; // Increased negative value to start more from left
        element.style.opacity = '0';
        setTimeout(function () {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
            element.classList.add('active');
        }, 300);
    });
};

document.addEventListener('scroll', () => {
    const header = document.querySelector('container');
    const scrollPosition = window.scrollY;
    if (scrollPosition > window.innerHeight * 0.2) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const timeZones = [
    'UTC', 'USA/New York', 'Europe/London',
    'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'
];
let currentZoneIndex = 3; // Start with UTC
function updateClock() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZones[currentZoneIndex],
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const timeString = formatter.format(now);
    document.getElementById('clock').textContent = timeString;
}
function changeTimeZone() {
    currentZoneIndex = (currentZoneIndex + 1) % timeZones.length;
    document.getElementById('timezone-text').textContent = timeZones[currentZoneIndex];
    updateClock();
}
document.getElementById('timezone-icon').addEventListener('click', changeTimeZone);
setInterval(updateClock, 1000); // Update clock every second
updateClock(); // Initialize immediately

class SpaceMonsterGame {
    constructor(container) {
        this.container = container;
        this.scoreElement = document.getElementById('score');
        this.playButton = document.getElementById('play-button');
        this.timerElement = document.getElementById('timer');
        this.score = 0;
        this.timeLeft = 20;
        this.timerElement.style.display = 'none';
        this.playButton.addEventListener('click', () => this.openGameWindow());
    }

    openGameWindow() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        // Create game window
        this.gameWindow = document.createElement('div');
        this.gameWindow.style.cssText = `
            width: 80vw;
            height: 80vh;
            background: #101010;
            position: relative;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        `;

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 0.2vw;
            right: 0.2vw;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
        `;
        closeButton.addEventListener('click', () => this.closeGameWindow());

        // Setup game elements in the new window
        this.gameWindow.appendChild(this.scoreElement);
        this.gameWindow.appendChild(this.timerElement);
        this.overlay.appendChild(this.gameWindow);
        this.gameWindow.appendChild(closeButton);
        document.body.appendChild(this.overlay);

        // Start the game
        this.startGame();
    }

    closeGameWindow() {
        this.endGame();
        document.body.removeChild(this.overlay);
        this.container.appendChild(this.scoreElement);
        this.container.appendChild(this.timerElement);
    }

    startGame() {
        this.gameWindow.style.backgroundColor = '#101010';
        this.playButton.style.display = 'none';
        this.scoreElement.style.display = 'block';
        this.timerElement.style.display = 'block';
        this.startTimer();
        this.spawnInterval = setInterval(() => this.spawnMonsters(), 1000);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timerElement.textContent = `Time Left: ${this.timeLeft}s`;
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    spawnMonsters() {
        const numberOfMonsters = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numberOfMonsters; i++) {
            this.spawnMonster();
        }
    }

    spawnMonster() {
        const monster = document.createElement('div');
        monster.classList.add('monster');
        const containerRect = this.gameWindow.getBoundingClientRect();
        const maxX = containerRect.width - 50;
        const maxY = containerRect.height - 50;
        monster.style.left = `${Math.random() * maxX}px`;
        monster.style.top = `${Math.random() * maxY}px`;
        monster.addEventListener('click', (e) => this.destroyMonster(e));
        this.gameWindow.appendChild(monster);
        setTimeout(() => {
            if (monster.parentElement) {
                monster.remove();
            }
        }, 3000);
    }

    destroyMonster(e) {
        const monster = e.target;
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        explosion.style.left = `${monster.offsetLeft - 25}px`;
        explosion.style.top = `${monster.offsetTop - 25}px`;
        this.gameWindow.appendChild(explosion);
        monster.remove();
        this.incrementScore();
        setTimeout(() => explosion.remove(), 500);
    }

    incrementScore() {
        this.score++;
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    endGame() {
        clearInterval(this.spawnInterval);
        clearInterval(this.timerInterval);
        alert(`Game Over! Final Score: ${this.score}`);
        this.resetGame();
    }

    resetGame() {
        this.score = 0;
        this.timeLeft = 20;
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.timerElement.textContent = `Time Left: 20s`;
        this.scoreElement.style.display = 'none';
        this.timerElement.style.display = 'none';
        this.playButton.style.display = 'block';
    }
}
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
let cSlide = 0;

function moveToNextSlide() {
    cSlide = (cSlide + 1) % slides.length; // Loop back to the first slide
    if (cSlide == 3) cSlide = 0;
    sliderTrack.style.transform = `translateY(-${cSlide * 100}%)`;
}
setInterval(moveToNextSlide, 3000);
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    new SpaceMonsterGame(gameContainer);
});

let audio = document.getElementById("background-audio");

function toggleAudio() {
    if (!audio) return; // Guard clause if audio element is not found
    try {
        if (audio.paused) {
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Playback prevented by browser");
                });
            }
        } else {
            audio.pause();
        }
        document.querySelector('.music-icon').classList.toggle('clicked');
    } catch (error) {
        console.log("Audio playback error:", error);
    }
}

document.getElementById("close-overlay")?.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click from triggering the toggleAudio function
    if (audio) {
        audio.pause(); // Stop the audio
        document.querySelector('.music-icon').classList.remove('clicked'); // Hide the overlay
    }
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');

    // Remove transition temporarily when resetting to first slide
    if (index >= totalSlides) {
        slider.style.transition = 'none';
        currentSlide = 0;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Force reflow
        slider.offsetHeight;
        slider.style.transition = 'transform 1s ease';
    } else {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    if (currentSlide == 2) {
        currentSlide = -1;
    }
}

showSlide(currentSlide);
setInterval(() => {
    showSlide(currentSlide + 1);
}, 3000);