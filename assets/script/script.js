// DOM Elements
const DOM = {
    header: document.querySelector('#header'),
    nav: document.querySelector('#header nav'),
    menuButton: document.querySelector('.menu-button'),
    navLinks: document.querySelector('.nav-links'),
    navLinksItems: document.querySelectorAll('.nav-links a'),
    backToTopButton: document.querySelector('.back-to-top'),
    sections: document.querySelectorAll('main section[id]')
  };
  
  /**
   * Mobile Navigation Handler
   * Controls mobile menu behavior including toggle and click outside
   */
  class MobileNav {
    static init() {
      // Toggle menu on button click
      DOM.menuButton.addEventListener('click', () => {
        DOM.menuButton.classList.toggle('active');
        DOM.navLinks.classList.toggle('active');
      });
  
      // Close menu when clicking links
      DOM.navLinksItems.forEach(link => {
        link.addEventListener('click', MobileNav.closeMenu);
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!DOM.menuButton.contains(e.target) && !DOM.navLinks.contains(e.target)) {
          MobileNav.closeMenu();
        }
      });
    }
  
    static closeMenu() {
      DOM.menuButton.classList.remove('active');
      DOM.navLinks.classList.remove('active');
    }
  }
  
  /**
   * Scroll Handler
   * Manages all scroll-related functionality
   */
  class ScrollHandler {
    static init() {
      window.addEventListener('scroll', () => {
        this.handleHeaderScroll();
        this.handleBackToTop();
        this.handleActiveSection();
      });
    }
  
    // Changes header style on scroll
    static handleHeaderScroll() {
      const navHeight = DOM.header.offsetHeight;
      DOM.header.classList.toggle('scroll', window.scrollY >= navHeight);
    }
  
    // Shows/hides back to top button
    static handleBackToTop() {
      const aboutSection = document.querySelector('#about');
      if (!aboutSection) return;
      
      DOM.backToTopButton.classList.toggle('show', 
        window.scrollY >= aboutSection.offsetTop
      );
    }
  
    // Highlights current section in navigation
    static handleActiveSection() {
      const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;
  
      DOM.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const menuItem = document.querySelector(`nav ul li a[href*=${sectionId}]`);
  
        if (menuItem) {
          const isInSection = checkpoint >= sectionTop && 
                            checkpoint <= sectionTop + sectionHeight;
          menuItem.classList.toggle('active', isInSection);
        }
      });
    }
  }
  
  /**
   * Back to Top Button Handler
   */
  class BackToTop {
    static init() {
      if (!DOM.backToTopButton) return;
  
      DOM.backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  
      // Check initial state
      ScrollHandler.handleBackToTop();
    }
  }
  
  /**
   * Testimonials Slider
   * Initializes and configures the testimonials slider
   */
  class TestimonialsSlider {
    static init() {
      new Swiper('.testimonials.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          }
        }
      });
    }
  }
  
  /**
   * Scroll Reveal Animations
   * Initializes and configures scroll reveal animations
   */
  class ScrollRevealAnimations {
    static init() {
      ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 700,
        reset: true
      }).reveal(
        `#home .image, #home .text,
        #about .image, #about .text,
        #services header, #services .card, 
        #testimonials header, #testimonials .testimonials,
        #contact .text, #contact .links,
        footer .brand, footer .social`,
        { interval: 100 }
      );
    }
  }
  
  /**
   * App Initialization
   * Main entry point of the application
   */
  class App {
    static init() {
      // Initialize all components
      MobileNav.init();
      BackToTop.init();
      ScrollHandler.init();
      TestimonialsSlider.init();
      ScrollRevealAnimations.init();
  
      // Initial check for scroll position
      document.addEventListener('DOMContentLoaded', () => {
        ScrollHandler.handleBackToTop();
      });
    }
  }
  
  // Start the application
  App.init();