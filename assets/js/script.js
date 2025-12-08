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
      // Staggered delay logic
      // Check if it's already active to avoid re-triggering
      if (!element.classList.contains("active")) {
        // Calculate a delay based on its index relative to the viewport or just a simple sequence?
        // Since we loop all, we can just use a simple timeout if we wanted complex staggering.
        // For now, let's keep it immediate but cleaner, or add a transition-delay via inline style?

        // Let's add a small random or indexed delay if multiple trigger at once for a "natural" feel
        // But strict indexing is better.
        // Since CSS handles the transition duration, we just add the class.
        // To make it "js animation" staggered:
        setTimeout(() => {
          element.classList.add("active");
        }, (i % 5) * 100); // 100ms delay per item, resetting every 5 items
      }
    }
  }
}


window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);


/**
 * 3D Tilt Effect
 */


// const tiltElements = document.querySelectorAll("[data-tilt]");

// const initTilt = function () {
//   tiltElements.forEach(element => {
//     // Add Glare Element
//     const glare = document.createElement("div");
//     glare.classList.add("card-glare");
//     glare.style.position = "absolute";
//     glare.style.top = "0";
//     glare.style.left = "0";
//     glare.style.width = "100%";
//     glare.style.height = "100%";
//     glare.style.borderRadius = "inherit";
//     glare.style.background = "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)";
//     glare.style.opacity = "0";
//     glare.style.pointerEvents = "none";
//     glare.style.zIndex = "4";
//     glare.style.transition = "opacity 0.5s ease";
//     element.appendChild(glare);

//     element.addEventListener("mouseenter", function () {
//       // Remove transition on enter for direct control
//       // Keep box-shadow transition active if needed, but transform should be fast
//       element.style.transition = "transform 0.1s ease, box-shadow 0.5s ease";
//     });

//     element.addEventListener("mousemove", function (event) {
//       const rect = element.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;

//       element.style.setProperty("--x", `${x}px`);
//       element.style.setProperty("--y", `${y}px`);

//       const multiplier = 20; // Maximum rotation in degrees
//       const moveMultiplier = 15; // Maximum translation in pixels

//       const xRotate = multiplier * ((x - rect.width / 2) / rect.width);
//       const yRotate = -multiplier * ((y - rect.height / 2) / rect.height);

//       const xMove = moveMultiplier * ((x - rect.width / 2) / rect.width);
//       const yMove = moveMultiplier * ((y - rect.height / 2) / rect.height);

//       // Apply Tilt, Scale, and Magnetic Move
//       element.style.transform = `perspective(1000px) rotateX(${yRotate}deg) rotateY(${xRotate}deg) scale(1.05) translate(${xMove}px, ${yMove}px)`;

//       // Apply Glare
//       // Calculate opacity based on mouse position (more visible at top-left)
//       const glareOpacity = 1 - (y / rect.height);
//       glare.style.opacity = Math.max(0, Math.min(1, glareOpacity * 0.5));
//       glare.style.transform = `translate(${x - rect.width / 2}px, ${y - rect.height / 2}px)`;
//     });

//     element.addEventListener("mouseleave", function () {
//       // Smooth reset
//       element.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
//       element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1) translate(0, 0)";
//       glare.style.opacity = "0";
//     });

//     element.addEventListener("click", function (e) {
//       // Create ripple element
//       const ripple = document.createElement("span");
//       ripple.classList.add("ripple");

//       const rect = element.getBoundingClientRect();
//       const size = Math.max(rect.width, rect.height);

//       // Position ripple
//       const x = e.clientX - rect.left - size / 2;
//       const y = e.clientY - rect.top - size / 2;

//       ripple.style.width = ripple.style.height = `${size}px`;
//       ripple.style.left = `${x}px`;
//       ripple.style.top = `${y}px`;

//       element.appendChild(ripple);

//       // Remove ripple after animation
//       setTimeout(() => {
//         ripple.remove();
//       }, 600);
//     });
//   });
// }



/**
 * BACK TO TOP
 */

const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});


/**
 * TYPING EFFECT
 */

const typingText = document.querySelector(".typing-text");
if (typingText) {
  const textOptions = JSON.parse(typingText.getAttribute('data-text-options'));
  let optionIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentText = textOptions[optionIndex];
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // Faster deleting
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 150; // Normal typing
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      optionIndex = (optionIndex + 1) % textOptions.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing
  setTimeout(type, 1000);
}
