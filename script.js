
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

        // Select all matching elements
        document.querySelectorAll('a[href^="#projects"], a[href^="#contactForm"], a[href^="#abt"]').forEach(link => {
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
        }, { threshold: 0.3 }); // Trigger the fade-in when 10% of the element is visible

        // Observe each project panel
        projectPanels.forEach(panel => {
            observer.observe(panel);
        });

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


        document.addEventListener('contextmenu', event => event.preventDefault()); // Disable right-click

        document.onkeydown = function (e) {
            if (e.keyCode == 123 || // Disable F12
                (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Disable Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Disable Ctrl+Shift+J
                (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) { // Disable Ctrl+U (View Source)
                return false;
            }
        };


  