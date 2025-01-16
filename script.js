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
    // Add event listener to each link
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor behavior (jumping)

        // Determine which section to scroll to based on the link clicked
        const targetId = link.getAttribute('href'); // Get the href attribute (e.g., "#projects", "#contact-main", or "#hero")
        const targetElement = document.querySelector(targetId); // Select the target element based on the ID

        // Smooth scroll to the target element if it exists
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
    // Update progress bar width and text
    progressBar.style.width = `${progress}%`;

    // Check milestones
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

    // Increment progress
    progress += 1;

    // Reset when reaching 100%
    if (progress > 60) {
        progress = 60;
    }
}

// Start the animation
setInterval(updateProgress, 40);

// Select all matching elements
document.querySelectorAll('a[href^="#projects"]').forEach(link => {
    // Add event listener to each link
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior (jumping)
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to projects section
    });
});


// Select all panels that need to be observed
const projectPanels = document.querySelectorAll('.right-panel, .right-panel1, .left-panel, .left-panel1');

// Create an intersection observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to make the panels fade in from the left
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Trigger the fade-in when 10% of the element is visible

// Observe each project panel
projectPanels.forEach(panel => {
    observer.observe(panel);
});

// Select the footer
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

// Start observing the footer
footerObserver.observe(footer);





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
    // Select elements you want to fade in
    const elements = document.querySelectorAll('.fade-in');

    // Add the 'active' class after a small delay
    elements.forEach(function (element) {
        setTimeout(function () {
            element.classList.add('active');
        }, 300); // You can adjust the delay here
    });
};



//scroll of nav

document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;

    // Trigger the scrolled state after scrolling down 30% of the viewport height
    if (scrollPosition > window.innerHeight * 0.2) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const timeZones = [
    'UTC', 'America/New_York', 'Europe/London',
    'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'
];
let currentZoneIndex = 3; // Start with UTC

// Function to update the clock
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

// Function to change the timezone
function changeTimeZone() {
    currentZoneIndex = (currentZoneIndex + 1) % timeZones.length;
    document.getElementById('timezone-text').textContent = timeZones[currentZoneIndex];
    updateClock();
}

// Event listener for changing timezone
document.getElementById('timezone-icon').addEventListener('click', changeTimeZone);

// Initialize the clock and timezone display
setInterval(updateClock, 1000); // Update clock every second
updateClock(); // Initialize immediately



function checkStatus() {
    // Simulate API data
    return new Promise((resolve) => {
        setTimeout(() => {
            const activities = [
                { status: "online", activity: "Editing in VS Code" },
                { status: "online", activity: "Listening to Spotify" },
                { status: "offline", activity: "Inactive" },
            ];
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            resolve(randomActivity);
        }, 2000); // Simulate a 2-second delay
    });
}

// Function to update the activity status box
class SpaceMonsterGame {
  constructor(container) {
    this.container = container;
    this.scoreElement = document.getElementById('score');
    this.playButton = document.getElementById('play-button');
    this.timerElement = document.getElementById('timer'); // Add timer element
    this.score = 0;
    this.timeLeft = 20; // Game time in seconds
    this.timerElement.style.display = 'none';
    // Play button starts the game
    this.playButton.addEventListener('click', () => this.startGame());
  }

  startGame() {
    // Change background color, hide play button, and show score and timer
    this.container.style.backgroundColor = '#101010';
    this.playButton.style.display = 'none';
    this.scoreElement.style.display = 'block';
    this.timerElement.style.display = 'block'; // Show timer

    // Start the countdown timer
    this.startTimer();

    // Start spawning monsters
    this.spawnInterval = setInterval(() => this.spawnMonsters(), 1000);
  }

  startTimer() {
    // Update the timer every second
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.timerElement.textContent = `Time Left: ${this.timeLeft}s`;

      // End the game when the time runs out
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  spawnMonsters() {
    const numberOfMonsters = Math.floor(Math.random() * 3) + 1; // Spawn 1 to 3 monsters
    for (let i = 0; i < numberOfMonsters; i++) {
      this.spawnMonster();
    }
  }

  spawnMonster() {
    const monster = document.createElement('div');
    monster.classList.add('monster');

    const containerRect = this.container.getBoundingClientRect();
    const maxX = containerRect.width - 50;
    const maxY = containerRect.height - 50;

    monster.style.left = `${Math.random() * maxX}px`;
    monster.style.top = `${Math.random() * maxY}px`;

    monster.addEventListener('click', (e) => this.destroyMonster(e));
    this.container.appendChild(monster);

    // Remove monster if not clicked
    setTimeout(() => {
      if (monster.parentElement) {
        this.container.removeChild(monster);
      }
    }, 3000);
  }

  destroyMonster(e) {
    const monster = e.target;
    const explosion = document.createElement('div');
    explosion.classList.add('explosion');

    explosion.style.left = `${monster.offsetLeft - 25}px`;
    explosion.style.top = `${monster.offsetTop - 25}px`;

    this.container.appendChild(explosion);
    this.container.removeChild(monster);

    this.incrementScore(); // Increase score when a monster is destroyed

    setTimeout(() => {
      this.container.removeChild(explosion);
    }, 500);
  }

  incrementScore() {
    this.score++;
    this.scoreElement.textContent = `Score: ${this.score}`;
  }

  endGame() {
    // Stop spawning monsters and stop the timer
    clearInterval(this.spawnInterval);
    clearInterval(this.timerInterval);

    // Show final score and a game over message (Optional)
    alert(`Game Over! Final Score: ${this.score}`);
    this.resetGame();
  }

  resetGame() {
    // Reset the game state
    this.score = 0;
    this.timeLeft = 20;
    this.scoreElement.textContent = `Score: ${this.score}`;
    this.timerElement.textContent = `Time Left: 20s`;

    // Reset the game container background color and hide score and timer
    this.container.style.backgroundColor = '#101010'; // Reset background color
    this.scoreElement.style.display = 'none'; // Hide score
    this.timerElement.style.display = 'none'; // Hide timer

    // Show the play button again
    this.playButton.style.display = 'block'; // Show play button to start a new game
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

// Automatically move to the next slide every 3 seconds
setInterval(moveToNextSlide, 3000);


document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    new SpaceMonsterGame(gameContainer);
});

let audio = document.getElementById("background-audio");

function toggleAudio() {
    if (audio.paused) {
        audio.play(); // Play the audio if it's paused
    } else {
        audio.pause(); // Pause the audio if it's playing
    }

    // Toggle the "clicked" class to show the overlay cross
    document.querySelector('.music-icon').classList.toggle('clicked');
}

// Add functionality to the cross overlay to stop audio
document.getElementById("close-overlay").onclick = function (event) {
    event.stopPropagation(); // Prevent the click from triggering the toggleAudio function
    audio.pause(); // Stop the audio
    document.querySelector('.music-icon').classList.remove('clicked'); // Hide the overlay
};

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

// Initialize first slide
showSlide(currentSlide);

// Auto-advance slides
setInterval(() => {
    showSlide(currentSlide + 1);
}, 8000);
