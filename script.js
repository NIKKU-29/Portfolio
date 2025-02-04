document.addEventListener('DOMContentLoaded', () => {
    // Dynamic text rotation
    const dynamicText = document.querySelector('.dynamic-text');
    const texts = ['`Design`', '`Create`', '`Code`'];
    let textIndex = 0;
  
    function changeText() {
      dynamicText.classList.remove('show');
      setTimeout(() => {
        const currentText = texts[textIndex];
        dynamicText.textContent = currentText;
        dynamicText.setAttribute('data-text', currentText);
        dynamicText.classList.add('show');
        textIndex = (textIndex + 1) % texts.length;
      }, 500);
    }
  
    // Use a recursive timeout to avoid overlapping intervals
    function cycleText() {
      changeText();
      setTimeout(cycleText, 3000);
    }
    cycleText();
  
    // Consolidated smooth scrolling using event delegation
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        // Check if the href matches one of the desired sections
        if (/^#(projects|cont|abt)/.test(href)) {
          event.preventDefault();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  
    // Progress bar update using requestAnimationFrame for smoother timing
    let progress = 0;
    const progressBar = document.querySelector('.progress-bar');
    const schoolMilestone = document.querySelector('.milestone.school');
    const btechMilestone = document.querySelector('.milestone.btech');
    let lastTimestamp = null;
  
    function updateProgress(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      if (elapsed >= 40) { // approximately every 40ms
        progress = Math.min(progress + 1, 60);
        progressBar.style.width = `${progress}%`;
        schoolMilestone.classList.toggle('active', progress >= 20);
        btechMilestone.classList.toggle('active', progress >= 60);
        lastTimestamp = timestamp;
      }
      if (progress < 60) {
        requestAnimationFrame(updateProgress);
      }
    }
    requestAnimationFrame(updateProgress);
  
    // IntersectionObserver for fade-in effects
    // Create one observer for panels (with a threshold of 0.1)
    const panels = document.querySelectorAll('.right-panel, .right-panel1, .left-panel, .left-panel1');
    const panelObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    panels.forEach(panel => panelObserver.observe(panel));
  
    // Create a separate observer for the footer with a higher threshold (0.4)
    const footer = document.getElementById('contact-main');
    if (footer) {
      const footerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      footerObserver.observe(footer);
    }
  });
  

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.expertise-slider');
    const containers = document.querySelectorAll('.con1, .con2');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (!slider || !containers.length || !sliderWrapper) return;
  
    let currentTranslate = 0;
    let targetTranslate = 0;
    let isScrolling = false;
    let autoMovePosition = 0;
    let lastFrameTime = performance.now();
    let isAnimating = false;
    let scrollTimeout;
  
    const lerp = (start, end, factor) => start + (end - start) * factor;
  
    function updateAnimation(currentTime) {
      const deltaTime = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      let needsUpdate = false;
  
      if (isScrolling) {
        currentTranslate = lerp(currentTranslate, targetTranslate, 0.08);
        needsUpdate = Math.abs(currentTranslate - targetTranslate) > 0.01;
      } else {
        autoMovePosition += deltaTime * 0.0025; 
        if (autoMovePosition >= 100) autoMovePosition = 0;
        currentTranslate = lerp(currentTranslate, autoMovePosition, 0.05);
        needsUpdate = true;
      }
  
      if (needsUpdate) {
        containers.forEach(container => {
          container.style.transform = `translateX(${-currentTranslate}%)`;
        });
        requestAnimationFrame(updateAnimation);
      } else {
        isAnimating = false;
      }
    }
  
    function startAnimation() {
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(updateAnimation);
      }
    }
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) slider.classList.add('show');
      });
    }, { threshold: 0.3 });
  
    observer.observe(slider);
  
    window.addEventListener(
      'scroll',
      () => {
        targetTranslate =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        isScrolling = true;
        startAnimation();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          startAnimation();
        }, 200);
      },
      { passive: true }
    );
  
    containers.forEach(container => {
      container.addEventListener('pointerenter', () => (isScrolling = true));
      container.addEventListener('pointerleave', () => (isScrolling = false, startAnimation()));
    });
  
    function toggleAnimation(pause) {
      sliderWrapper.style.animationPlayState = pause ? 'paused' : 'running';
      sliderWrapper.style.transform = pause ? 'rotate(360deg) scale(1.1)' : '';
    }
  
    sliderWrapper.addEventListener('pointerenter', () => toggleAnimation(true));
    sliderWrapper.addEventListener('pointerleave', () => toggleAnimation(false));
  
    startAnimation();
  });

  document.addEventListener('DOMContentLoaded', () => {
    /* ------------------------------
       Fade-in Elements on Load
    ------------------------------ */
    // Cache fade-in elements and apply initial styles via CSS instead of inline when possible.
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      // Set initial state (could be moved to CSS for better performance)
      element.style.transform = 'translateX(-200px)';
      element.style.opacity = '0';
    });
    // Use a single timeout to trigger all fade-ins
    setTimeout(() => {
      fadeElements.forEach(element => {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
        element.classList.add('active');
      });
    }, 300);
  
    /* ------------------------------
       Header Scroll Effects (Debounced)
    ------------------------------ */
    // Cache the header element once (assuming the intended element has a class or tag; here 'container' is assumed to be a tag name—adjust as needed)
    const header = document.querySelector('container');
    let lastScrollTime = 0;
    const scrollThreshold = window.innerHeight * 0.2;
    
    function onScroll() {
      const now = Date.now();
      // Throttle to roughly 60fps (~16ms) or a custom value (here 50ms)
      if (now - lastScrollTime < 50) return;
      lastScrollTime = now;
      const scrollPos = window.scrollY;
      if (scrollPos > scrollThreshold) {
        header && header.classList.add('scrolled');
      } else {
        header && header.classList.remove('scrolled');
      }
    }
    document.addEventListener('scroll', onScroll);
  
    /* ------------------------------
       Time Zone Clock & Toggle
    ------------------------------ */
    const timeZones = [
      'UTC', 'USA/New York', 'Europe/London',
      'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney'
    ];
    let currentZoneIndex = 3; // Start with Asia/Kolkata as default
    const clockEl = document.getElementById('clock');
    const timezoneTextEl = document.getElementById('timezone-text');
    const timezoneIconEl = document.getElementById('timezone-icon');
  
    function updateClock() {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZones[currentZoneIndex],
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      if (clockEl) {
        clockEl.textContent = formatter.format(now);
      }
    }
  
    function changeTimeZone() {
      currentZoneIndex = (currentZoneIndex + 1) % timeZones.length;
      if (timezoneTextEl) {
        timezoneTextEl.textContent = timeZones[currentZoneIndex];
      }
      updateClock();
    }
  
    timezoneIconEl && timezoneIconEl.addEventListener('click', changeTimeZone);
    updateClock();
    setInterval(updateClock, 1000);
  
    /* ------------------------------
       Space Monster Game
    ------------------------------ */
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
        // Create overlay and game window elements with a single style assignment
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8); z-index: 1000;
          display: flex; justify-content: center; align-items: center;
        `;
        this.gameWindow = document.createElement('div');
        this.gameWindow.style.cssText = `
          width: 80vw; height: 80vh; background: #101010;
          position: relative; border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        `;
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
          position: absolute; top: 0.2vw; right: 0.2vw;
          background: none; border: none; color: white;
          font-size: 24px; cursor: pointer; z-index: 1001;
        `;
        closeButton.addEventListener('click', () => this.closeGameWindow());
  
        // Append static game elements once
        this.gameWindow.append(closeButton, this.scoreElement, this.timerElement);
        this.overlay.appendChild(this.gameWindow);
        document.body.appendChild(this.overlay);
        this.startGame();
      }
  
      closeGameWindow() {
        this.endGame();
        document.body.removeChild(this.overlay);
        this.container.append(this.scoreElement, this.timerElement);
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
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
          this.spawnMonster();
        }
      }
  
      spawnMonster() {
        const monster = document.createElement('div');
        monster.classList.add('monster');
        const rect = this.gameWindow.getBoundingClientRect();
        monster.style.left = `${Math.random() * (rect.width - 50)}px`;
        monster.style.top = `${Math.random() * (rect.height - 50)}px`;
        monster.addEventListener('click', (e) => this.destroyMonster(e));
        this.gameWindow.appendChild(monster);
        setTimeout(() => monster.parentElement && monster.remove(), 3000);
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
    const gameContainer = document.getElementById('game-container');
    gameContainer && new SpaceMonsterGame(gameContainer);
  
    /* ------------------------------
       Slider Animations
    ------------------------------ */
    // Vertical slider (for slider-track)
    const sliderTrack = document.querySelector('.slider-track');
    const verticalSlides = document.querySelectorAll('.slide');
    let currentVSlide = 0;
    function moveToNextVSlide() {
        if(currentVSlide == 2) currentVSlide=-1;
      currentVSlide = (currentVSlide + 1) % verticalSlides.length;
      sliderTrack.style.transform = `translateY(-${currentVSlide * 100}%)`;
    }
    setInterval(moveToNextVSlide, 3000);
  
    // Horizontal slider (for slider)
    const slider = document.querySelector('.slider');
    const horizontalSlides = slider ? slider.querySelectorAll('.slide') : [];
    let currentHSlide = 0;
    function showSlide(index) {
      const total = horizontalSlides.length;
      if (!slider || total === 0) return;
      // Reset slider instantly if reached the end
      if (index >= total) {
        slider.style.transition = 'none';
        currentHSlide = 0;
        slider.style.transform = `translateX(0)`;
        // Force reflow
        slider.offsetHeight;
        slider.style.transition = 'transform 1s ease';
      } else {
        currentHSlide = index;
        slider.style.transform = `translateX(-${currentHSlide * 100}%)`;
      }
      // Prepare for looping if needed
      if (currentHSlide === total - 1) {
        currentHSlide = -1;
      }
    }
    showSlide(currentHSlide);
    setInterval(() => showSlide(currentHSlide + 1), 8000);
  
    /* ------------------------------
       Audio Toggle Functionality
    ------------------------------ */
    const audio = document.getElementById("background-audio");
    const musicIcon = document.querySelector('.music-icon');
    const closeOverlayEl = document.getElementById("close-overlay");
  
    function toggleAudio() {
      if (!audio) return;
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.log("Playback prevented by browser"));
        }
      } else {
        audio.pause();
      }
      musicIcon && musicIcon.classList.toggle('clicked');
    }
  
    // Use event delegation on the audio toggle button/icon if possible.
    musicIcon && musicIcon.addEventListener('click', toggleAudio);
  
    // Stop propagation on the close overlay button to prevent accidental toggling.
    closeOverlayEl && closeOverlayEl.addEventListener('click', event => {
      event.stopPropagation();
      if (audio) {
        audio.pause();
        musicIcon && musicIcon.classList.remove('clicked');
      }
    });
  });
  