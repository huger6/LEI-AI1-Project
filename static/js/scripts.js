document.addEventListener('DOMContentLoaded', () => {
    currentLang = sessionStorage.getItem('petbond_lang') || "pt";
    if (typeof updatePageLanguage === 'function') {
        updatePageLanguage(currentLang, true);
    }

    navbarHamburguer();
    langSelector();
    slider();
});

/**
 * Handle responsiveness of the navbar
 */
function navbarHamburguer() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle Hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked (unless it's the dropdown toggle)
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
        if(!n.classList.contains('dropdown-toggle')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }));

    // Mobile Dropdown Click Handler
    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent click from bubbling to document

            // Close other open dropdowns
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close Dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        // Close Nav Dropdowns
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Reset on Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
}

/**
 * Handle language selector logic and changes
 */
function langSelector() {
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(select => {
        const selectedOption = select.querySelector('.selected-option');
        const optionsList = select.querySelector('.options-list');
        const options = optionsList.querySelectorAll('li');

        // Toggle Dropdown on click
        selectedOption.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close
            
            // Close other open selectors (if any)
            customSelects.forEach(other => {
                if (other !== select) other.classList.remove('active');
            });

            select.classList.toggle('active');
        });

        // Handle Option Selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Get inner HTML (flag + text)
                const content = option.innerHTML; 
                // Get data value (pt, uk, es)
                const lang = option.getAttribute('data-lang');
                localStorage.setItem('petbond_lang', lang);
                updatePageLanguage(lang, false);

                // Update the visible button
                selectedOption.innerHTML = `${content} <i class="bi bi-chevron-down arrow"></i>`;

                console.log("Language changed to:", lang);

                // Close dropdown
                select.classList.remove('active');
            });
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        customSelects.forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('active');
            }
        });
    });
}

/**
 * Handle Hero's slider logic
 */
function slider() {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let slideInterval;
    const autoPlayTime = 6000;

    // Create Dots based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to change slide
    function goToSlide(n) {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update Index
        currentSlide = (n + slides.length) % slides.length;

        // Add active class to new
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Button Functions
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Button event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Auto play 
    function startTimer() {
        slideInterval = setInterval(nextSlide, autoPlayTime);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Start the slider
    startTimer();
}

