'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
    navbar.classList.remove("active");
    navToggler.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);




/**
 * header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});



/**
 * scroll reveal
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
    for (let i = 0; i < revealElements.length; i++) {
        const element = revealElements[i];
        if (element.getBoundingClientRect().top < window.innerHeight / 1.15) {
            if (!element.classList.contains("active")) {
                element.classList.add("active");
            }
        }
    }
}


window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);


/**
 * Background Animations
 */
const bgIconsContainer = document.getElementById("backgroundIcons");

const icons = [
    '<ion-icon name="shapes-outline"></ion-icon>',
    '<ion-icon name="moon-outline"></ion-icon>',
    '<ion-icon name="star-outline"></ion-icon>',
    '<ion-icon name="heart-outline"></ion-icon>',
    '<ion-icon name="code-slash-outline"></ion-icon>',
    '<ion-icon name="logo-css3"></ion-icon>',
    '<ion-icon name="logo-javascript"></ion-icon>',
    '<ion-icon name="logo-html5"></ion-icon>',
    '<ion-icon name="logo-react"></ion-icon>'
];

const animationClasses = ["float-rotate", "float-diagonal", "float-circular"];

function createBgIcons(count) {
    if (!bgIconsContainer) return;

    for (let i = 0; i < count; i++) {
        const iconWrapper = document.createElement("div");
        iconWrapper.classList.add("bg-icon");

        // Random icon
        const iconHTML = icons[Math.floor(Math.random() * icons.length)];
        iconWrapper.innerHTML = iconHTML;

        // Random animation
        const animClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
        iconWrapper.classList.add(animClass);

        // Random position
        iconWrapper.style.left = Math.random() * 100 + "vw";
        iconWrapper.style.top = Math.random() * 100 + "vh";

        // Random size
        const size = Math.random() * 20 + 20 + "px"; // 20-40px
        iconWrapper.style.fontSize = size;
        iconWrapper.style.color = "var(--theme-color)";

        // Random animation duration and delay
        const duration = Math.random() * 10 + 10 + "s"; // 20-30s reduced to 10-20 for visibility
        const delay = Math.random() * 5 + "s";

        iconWrapper.style.animationDuration = duration;
        iconWrapper.style.animationDelay = delay;

        // Random opacity (subtle)
        iconWrapper.style.setProperty('--data-opacity', Math.random() * 0.2 + 0.05); // passed to CSS var if needed, or inline
        iconWrapper.style.opacity = "0.1"; // Start low

        bgIconsContainer.appendChild(iconWrapper);
    }
}

// Check if we are on a large screen to enable these heavy animations
if (window.innerWidth > 768) {
    window.addEventListener("load", () => createBgIcons(15));
}

/**
 * ADVANCED RESPONSIVE TABS FUNCTIONALITY
 */

const initTabs = function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabIndicator = document.querySelector('.tab-indicator');

    if (!tabButtons.length) return;

    // Set initial indicator position
    const updateIndicator = function (button) {
        if (!tabIndicator) return;
        
        const rect = button.getBoundingClientRect();
        const navRect = button.parentElement.getBoundingClientRect();
        
        tabIndicator.style.width = rect.width + 'px';
        tabIndicator.style.left = (button.offsetLeft) + 'px';
    };

    // Switch tab function
    const switchTab = function (tabName) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.querySelector(`[data-content="${tabName}"]`);

        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-selected', 'true');
            updateIndicator(activeButton);
        }

        if (activeContent) {
            activeContent.classList.add('active');
        }
    };

    // Add click listeners to tab buttons
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });

        // Keyboard navigation
        button.addEventListener('keydown', function (e) {
            let targetButton = null;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetButton = tabButtons[(index + 1) % tabButtons.length];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetButton = tabButtons[(index - 1 + tabButtons.length) % tabButtons.length];
            }

            if (targetButton) {
                targetButton.focus();
                targetButton.click();
            }
        });
    });

    // Initialize first tab as active
    if (tabButtons[0]) {
        updateIndicator(tabButtons[0]);
    }

    // Update indicator on window resize
    window.addEventListener('resize', function () {
        const activeButton = document.querySelector('.tab-btn.active');
        if (activeButton) {
            updateIndicator(activeButton);
        }
    });
};

// Initialize tabs when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
} else {
    initTabs();
}