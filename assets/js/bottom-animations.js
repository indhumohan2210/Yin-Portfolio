// ========================================
// BOTTOM PAGE ANIMATIONS
// ========================================

/**
 * Scroll to Top Button Animation
 */
const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.id = 'scroll-to-top';
  button.className = 'scroll-to-top';
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  button.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(button);

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });

  // Smooth scroll to top
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

/**
 * Footer Animation on Scroll
 */
const animateFooterOnScroll = () => {
  const footer = document.querySelector('footer');
  if (!footer) return;

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('footer-visible');
        
        // Animate footer items
        const footerItems = footer.querySelectorAll('p, ul, a');
        footerItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('footer-item-animate');
          }, index * 100);
        });
      }
    });
  }, { threshold: 0.3 });

  footerObserver.observe(footer);
};

/**
 * Floating Bubbles Animation at Bottom
 */
const createFloatingBubbles = () => {
  const container = document.createElement('div');
  container.className = 'floating-bubbles';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);

  // Create multiple bubbles
  for (let i = 0; i < 5; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.setProperty('--delay', `${i * 0.1}s`);
    bubble.style.setProperty('--size', `${Math.random() * 40 + 20}px`);
    bubble.style.setProperty('--x', `${Math.random() * 100}%`);
    container.appendChild(bubble);
  }
};

/**
 * Counter Animation on Scroll
 */
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter, [data-counter]');
  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = entry.target;
        const finalValue = parseInt(target.textContent) || parseInt(target.dataset.counter);
        const startValue = 0;
        const duration = 2000;
        const increment = finalValue / (duration / 16);

        let currentValue = startValue;
        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            target.textContent = finalValue + (target.textContent.includes('%') ? '%' : '');
            target.classList.add('counted');
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(currentValue) + (target.textContent.includes('%') ? '%' : '');
          }
        }, 16);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
};

/**
 * Social Links Bottom Animation
 */
const animateSocialLinks = () => {
  const socialLinks = document.querySelectorAll('.social-link, [data-social]');
  
  socialLinks.forEach((link, index) => {
    // Staggered initial animation
    link.style.animation = `social-link-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
    link.style.animationDelay = `${index * 0.1}s`;
    link.style.opacity = '0';

    // Hover animation
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) translateY(-5px)';
      this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      // Add glow effect
      const glow = document.createElement('span');
      glow.className = 'social-link-glow';
      glow.style.position = 'absolute';
      glow.style.borderRadius = '50%';
      glow.style.pointerEvents = 'none';
      glow.style.width = '100%';
      glow.style.height = '100%';
      glow.style.background = 'rgba(255, 107, 53, 0.3)';
      glow.style.animation = 'glow-pulse 0.6s ease-out';
      this.style.position = 'relative';
      this.appendChild(glow);
      
      setTimeout(() => glow.remove(), 600);
    });

    // Hover out animation
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
    });

    // Click ripple effect
    link.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.background = 'rgba(255, 255, 255, 0.7)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple-expand 0.6s ease-out';
      ripple.style.zIndex = '10';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
};

/**
 * Gradient Background Animation at Bottom
 */
const createGradientAnimation = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradient-shift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    .gradient-animated {
      background: linear-gradient(
        -45deg,
        #ff6b35,
        #f7931e,
        #fdb813,
        #ff6b35
      );
      background-size: 400% 400%;
      animation: gradient-shift 15s ease infinite;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Pulse Animation for Call-to-Action
 */
const createPulseAnimation = () => {
  const ctaButtons = document.querySelectorAll('.cta-button, [data-cta], .submit-btn');
  
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
    });

    button.addEventListener('mouseleave', function() {
      this.classList.remove('pulse');
    });
  });
};

/**
 * Scroll Progress Indicator
 */
const createScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

/**
 * Page Load Animation
 */
const pageLoadAnimation = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes page-load-fade {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    body {
      animation: page-load-fade 0.8s ease-out;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Mouse Trail Animation at Bottom
 */
let mouseTrail = [];
const createMouseTrail = () => {
  const trailContainer = document.createElement('div');
  trailContainer.className = 'mouse-trail-container';
  trailContainer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(trailContainer);

  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail-dot';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trailContainer.appendChild(trail);

    // Limit trail dots
    if (trailContainer.children.length > 20) {
      trailContainer.removeChild(trailContainer.children[0]);
    }

    // Fade out and remove
    setTimeout(() => {
      trail.style.opacity = '0';
      setTimeout(() => {
        if (trailContainer.contains(trail)) {
          trailContainer.removeChild(trail);
        }
      }, 300);
    }, 500);
  });
};

/**
 * Text Reveal Animation on Scroll
 */
const textRevealAnimation = () => {
  const textElements = document.querySelectorAll('[data-reveal-text], .reveal-text');
  
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        element.innerHTML = '';

        let index = 0;
        const interval = setInterval(() => {
          if (index < text.length) {
            element.textContent += text[index];
            index++;
          } else {
            clearInterval(interval);
          }
        }, 30);
      }
    });
  }, { threshold: 0.5 });

  textElements.forEach(element => textObserver.observe(element));
};

/**
 * Card Flip Animation
 */
const createCardFlipAnimation = () => {
  const cards = document.querySelectorAll('.flip-card, [data-flip]');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });

    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        this.classList.toggle('flipped');
      }
    });
  });
};

/**
 * Initialize All Bottom Animations
 */
const initBottomAnimations = () => {
  // Run animations on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createScrollToTopButton();
      animateFooterOnScroll();
      createFloatingBubbles();
      animateCounters();
      animateSocialLinks();
      createGradientAnimation();
      createPulseAnimation();
      createScrollProgress();
      pageLoadAnimation();
      createMouseTrail();
      textRevealAnimation();
      createCardFlipAnimation();
    });
  } else {
    // DOM already loaded
    createScrollToTopButton();
    animateFooterOnScroll();
    createFloatingBubbles();
    animateCounters();
    animateSocialLinks();
    createGradientAnimation();
    createPulseAnimation();
    createScrollProgress();
    pageLoadAnimation();
    createMouseTrail();
    textRevealAnimation();
    createCardFlipAnimation();
  }
};

// Initialize when script loads
initBottomAnimations();

// Export functions for external use
window.BottomAnimations = {
  initBottomAnimations,
  createScrollToTopButton,
  animateFooterOnScroll,
  createFloatingBubbles,
  animateCounters,
  animateSocialLinks,
  createScrollProgress,
  textRevealAnimation
};
