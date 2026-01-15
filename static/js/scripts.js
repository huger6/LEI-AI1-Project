document.addEventListener('DOMContentLoaded', () => {
    // Get saved language from localStorage (persists across sessions)
    currentLang = localStorage.getItem('petbond_lang') || "pt";
    
    if (typeof updatePageLanguage === 'function') {
        updatePageLanguage(currentLang, true);
    }
    
    // Update language selector visual to match saved language
    updateLanguageSelectorVisual(currentLang);

    navbarHamburguer();
    langSelector();
    startLiveClock();
    scrollTopBtn();
});

/**
 * Update the language selector dropdown to show the correct flag/text
 * @param {string} lang - The language code (pt, uk, es)
 */
function updateLanguageSelectorVisual(lang) {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        const selectedOption = select.querySelector('.selected-option');
        const optionsList = select.querySelector('.options-list');
        const matchingOption = optionsList.querySelector(`li[data-lang="${lang}"]`);
        
        if (matchingOption && selectedOption) {
            const content = matchingOption.innerHTML;
            selectedOption.innerHTML = `${content} <i class="bi bi-chevron-down arrow"></i>`;
        }
    });
}

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

    // Close menu when a link is clicked (including dropdown toggle since submenu is always visible on mobile)
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Mobile Dropdown Click Handler
    // If we want to activate dropdown by click
    // dropdowns.forEach(dropdown => {
    //     const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        
    //     toggleBtn.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         e.stopPropagation(); // Prevent click from bubbling to document

    //         // Close other open dropdowns
    //         dropdowns.forEach(other => {
    //             if (other !== dropdown) {
    //                 other.classList.remove('active');
    //             }
    //         });

    //         // Toggle current dropdown
    //         dropdown.classList.toggle('active');
    //     });
    // });

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
 * Initiates and handles footer clock
 */
function startLiveClock() {
    const clockElement = document.getElementById('liveClock');
    
    if (clockElement) {
        function updateTime() {
            const now = new Date();
            // Format time as HH:MM:SS
            const timeString = now.toLocaleTimeString(); 
            clockElement.textContent = timeString;
        }

        // Run immediately so we don't wait 1 second for first update
        updateTime();
        
        // Update every second
        setInterval(updateTime, 1000);
    }
}

/**
 * Handle button to return to the top of the screen
 */
function scrollTopBtn() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
}

