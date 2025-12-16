// Enhanced Responsive Utilities

/**
 * Mobile Menu Enhancements
 */
const mobileMenuClose = () => {
  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelector("[data-nav-toggler]");
  
  if (navbar && navToggler) {
    navbar.classList.remove("active");
    navToggler.classList.remove("active");
  }
};

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelector("[data-nav-toggler]");
  
  if (navbar && navToggler && !navbar.contains(e.target) && !navToggler.contains(e.target)) {
    mobileMenuClose();
  }
});

// Close menu on window resize to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    mobileMenuClose();
  }
});

/**
 * Responsive Image Loading
 */
const responsiveImages = document.querySelectorAll("[data-responsive-src]");

responsiveImages.forEach(img => {
  const updateImage = () => {
    const width = window.innerWidth;
    let src = img.dataset.responsiveSrc;
    
    if (width <= 480 && img.dataset.sm) {
      src = img.dataset.sm;
    } else if (width <= 768 && img.dataset.md) {
      src = img.dataset.md;
    } else if (img.dataset.lg) {
      src = img.dataset.lg;
    }
    
    if (src && img.src !== src) {
      img.src = src;
    }
  };
  
  updateImage();
  window.addEventListener("resize", updateImage);
});

/**
 * Touch Event Enhancements
 */
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, false);

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  // Swipe left - might close mobile menu in future
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      console.log("Swiped left");
    } else {
      console.log("Swiped right");
    }
  }
};

/**
 * Viewport Height Fix for Mobile
 */
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

setViewportHeight();
window.addEventListener("resize", setViewportHeight);
window.addEventListener("orientationchange", setViewportHeight);

/**
 * Prevent Double Tap Zoom
 */
let lastTouchEnd = 0;

document.addEventListener(
  "touchend",
  (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);

/**
 * Smooth Scroll for Navigation Links
 */
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 60; // Adjust for fixed header
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      
      // Close mobile menu after clicking a link
      mobileMenuClose();
    }
  });
});

/**
 * Responsive Table Enhancement
 */
const tables = document.querySelectorAll("table");

tables.forEach(table => {
  if (window.innerWidth < 768) {
    table.classList.add("mobile-table");
  }
});

window.addEventListener("resize", () => {
  tables.forEach(table => {
    if (window.innerWidth < 768) {
      table.classList.add("mobile-table");
    } else {
      table.classList.remove("mobile-table");
    }
  });
});

/**
 * Form Field Enhancement
 */
const formFields = document.querySelectorAll(".input-field");

formFields.forEach(field => {
  field.addEventListener("focus", function() {
    this.parentElement.classList.add("focused");
  });
  
  field.addEventListener("blur", function() {
    if (!this.value) {
      this.parentElement.classList.remove("focused");
    }
  });
});

/**
 * Lazy Load Images
 */
if ("IntersectionObserver" in window) {
  const lazyImages = document.querySelectorAll("img[data-lazy]");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.lazy;
        img.removeAttribute("data-lazy");
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => observer.observe(img));
}

/**
 * Detect Device Type
 */
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTablet = /(iPad|tablet|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
const isDesktop = !isMobile && !isTablet;

if (isMobile) {
  document.documentElement.classList.add("mobile-device");
}
if (isTablet) {
  document.documentElement.classList.add("tablet-device");
}
if (isDesktop) {
  document.documentElement.classList.add("desktop-device");
}

/**
 * Responsive Font Sizing
 */
const adjustFontSizes = () => {
  const width = window.innerWidth;
  const root = document.documentElement;
  
  if (width < 480) {
    root.style.fontSize = "8px";
  } else if (width < 768) {
    root.style.fontSize = "9px";
  } else if (width < 1024) {
    root.style.fontSize = "9.5px";
  } else {
    root.style.fontSize = "10px";
  }
};

adjustFontSizes();
window.addEventListener("resize", adjustFontSizes);
window.addEventListener("orientationchange", adjustFontSizes);

/**
 * Network-Aware Loading
 */
if ("connection" in navigator) {
  const connection = navigator.connection;
  
  const handleConnectionChange = () => {
    const type = connection.effectiveType;
    
    if (type === "4g") {
      document.documentElement.classList.add("fast-connection");
    } else if (type === "3g") {
      document.documentElement.classList.add("medium-connection");
    } else {
      document.documentElement.classList.add("slow-connection");
    }
  };
  
  connection.addEventListener("change", handleConnectionChange);
  handleConnectionChange();
}

/**
 * Print Friendly Styles
 */
const printContent = () => {
  window.print();
};

/**
 * Export responsive utilities globally
 */
window.ResponsiveUtils = {
  isMobile,
  isTablet,
  isDesktop,
  closeMobileMenu: mobileMenuClose,
  getViewportHeight: () => window.innerHeight,
  getViewportWidth: () => window.innerWidth
};
