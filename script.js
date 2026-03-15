/* ============================================
   INITIALIZE AOS (Animate On Scroll)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: false,
        mirror: true,
        offset: 120
    });

    // Initialize other features
    initNavigation();
    initSmoothScroll();
    initParallaxEffect();
    createFloatingParticles();
    initScrollReveal();
});

/* ============================================
   NAVIGATION
   ============================================ */

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        updateActiveLink();
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--color-gold)';
        } else {
            link.style.color = 'var(--color-cream)';
        }
    });
}

/* ============================================
   SMOOTH SCROLL (with fallback)
   ============================================ */

function initSmoothScroll() {
    // Browser native smooth scroll is handled by CSS
    // This adds extra polish for specific interactions
    
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

/* ============================================
   PARALLAX EFFECT
   ============================================ */

function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    const decorationItems = document.querySelectorAll('.decoration-item');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero section
        if (heroSection && scrollPosition < heroSection.offsetHeight) {
            const yPos = scrollPosition * 0.5;
            decorationItems.forEach(item => {
                item.style.transform = `translateY(${yPos * 0.3}px)`;
            });
        }

        // Background stars animation
        const bgStars = document.querySelector('.background-stars');
        if (bgStars) {
            bgStars.style.backgroundPosition = `${scrollPosition * 0.1}% 0%`;
        }
    });
}

/* ============================================
   FLOATING PARTICLES
   ============================================ */

function createFloatingParticles() {
    const celebrationSection = document.querySelector('.celebration-section');
    
    if (celebrationSection) {
        // Create subtle particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: radial-gradient(circle, 
                    var(--color-gold) 0%, 
                    var(--color-red) 100%);
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                pointer-events: none;
                animation: floatParticle ${Math.random() * 3 + 2}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            celebrationSection.appendChild(particle);
        }
    }

    // Add keyframes for particle animation
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.innerHTML = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0.1;
                }
                50% {
                    transform: translateY(-30px) translateX(20px);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   SCROLL REVEAL EFFECT
   ============================================ */

function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.detail-card, .lunch-card, .message-card, .venue-card'
    );

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
}

/* ============================================
   BUTTON INTERACTIONS
   ============================================ */

function setupButtonInteractions() {
    const buttons = document.querySelectorAll('.cta-button, .venue-button, .lunch-button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.innerHTML = `
            @keyframes rippleEffect {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   INTERSECTION OBSERVER for performance
   ============================================ */

function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

/* ============================================
   LOAD EVENT
   ============================================ */

window.addEventListener('load', () => {
    setupButtonInteractions();
    initIntersectionObserver();
    
    // Add splash effect on page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInDown 1s ease-out';
    }
});

/* ============================================
   RESPONSIVE ADJUSTMENTS
   ============================================ */

function handleResponsive() {
    if (window.innerWidth <= 768) {
        AOS.reset();
        AOS.init({
            duration: 600,
            easing: 'ease-in-out-cubic',
            once: true,
            offset: 80
        });
    }
}

window.addEventListener('resize', handleResponsive);
handleResponsive();

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Reduce motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-smooth', '0.01s');
    document.documentElement.style.setProperty('--transition-slow', '0.01s');
}

prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-smooth', '0.01s');
        document.documentElement.style.setProperty('--transition-slow', '0.01s');
    } else {
        document.documentElement.style.setProperty('--transition-smooth', '0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
        document.documentElement.style.setProperty('--transition-slow', '0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
    }
});

/* ============================================
   ANALYTICS & TRACKING (Optional)
   ============================================ */

// Track section views
function trackSectionViews() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`User viewed: ${entry.target.id}`);
                // Add your analytics code here
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

// Uncomment to enable tracking
// trackSectionViews();

/* ============================================
   PRACTICAL UTILITIES
   ============================================ */

// Utility: Get current scroll position
function getScrollPercentage() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
}

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    updateActiveLink();
}, 100);

window.addEventListener('scroll', optimizedScroll);

/* ============================================
   BLESSING & CELEBRATION FUNCTION
   ============================================ */

function initCelebration() {
    const celebrationBtn = document.getElementById('celebrationBtn');
    const celebrationContainer = document.getElementById('celebrationContainer');

    if (!celebrationBtn) return;

    celebrationBtn.addEventListener('click', () => {
        triggerFullCelebration(celebrationContainer);
        
        // Add button animation feedback
        celebrationBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            celebrationBtn.style.transform = 'scale(1)';
        }, 200);
    });
}

function triggerFullCelebration(container) {
    // Get button position for burst effect
    const btn = document.getElementById('celebrationBtn');
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Trigger all celebration effects simultaneously
    createConfetti(container, centerX, centerY);
    setTimeout(() => createEmojiBurst(container, centerX, centerY), 100);
    setTimeout(() => createParticles(container), 150);
    setTimeout(() => createBalloons(container), 200);
}

/* Confetti Falling Effect */
function createConfetti(container, startX, startY) {
    const colors = ['🎉', '🎊', '✨', '⭐', '💫'];
    
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'celebration-confetti';
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        // Random angle spread
        const angle = (Math.PI * 2 * i) / 40;
        const velocity = 3 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 30;
        const ty = Math.sin(angle) * velocity * 30;
        
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.transform = `translate(${tx}px, ${ty}px)`;
        
        const duration = 2.5 + Math.random() * 1;
        confetti.style.animationDuration = duration + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

/* Emoji Burst - Quick explosion effect */
function createEmojiBurst(container, startX, startY) {
    const emojis = ['🎉', '🎊', '💝', '❤️', '✨', '🌟', '⭐', '💫'];
    
    for (let i = 0; i < 30; i++) {
        const burst = document.createElement('div');
        burst.className = 'celebration-burst';
        burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Radial burst pattern
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 150 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        burst.style.left = startX + 'px';
        burst.style.top = startY + 'px';
        burst.style.setProperty('--tx', tx + 'px');
        burst.style.setProperty('--ty', ty + 'px');
        
        container.appendChild(burst);
        
        setTimeout(() => burst.remove(), 1200);
    }
}

/* Celebration Particles - Sparkle Effect */
function createParticles(container) {
    const particles = ['✨', '💫', '⭐', '🌟', '✨', '💥'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const px = (Math.random() - 0.5) * 200;
        
        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.setProperty('--px', px + 'px');
        
        const duration = 1.5 + Math.random() * 1;
        particle.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 0.3;
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    }
}

/* Balloons Animation - Slow Rising */
function createBalloons(container) {
    const balloonColors = ['🎈', '🎈', '🎈', '🎉', '🎊'];
    
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'celebration-balloon';
        balloon.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        
        const startX = Math.random() * window.innerWidth;
        const floatAmount = (Math.random() - 0.5) * 100;
        
        balloon.style.left = startX + 'px';
        balloon.style.bottom = '-100px';
        balloon.style.setProperty('--float', floatAmount + 'px');
        
        const duration = 4 + Math.random() * 2;
        balloon.style.animationDuration = duration + 's';
        
        const delay = i * 0.1;
        balloon.style.animationDelay = delay + 's';
        
        container.appendChild(balloon);
        
        setTimeout(() => balloon.remove(), (duration + delay) * 1000);
    }
}

// Initialize celebration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCelebration();
});

console.log('Wedding invitation website loaded successfully! 🎉');
