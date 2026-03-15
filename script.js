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
    console.log('🔧 initCelebration() starting...');
    const celebrationBtn = document.getElementById('celebrationBtn');
    let celebrationContainer = document.getElementById('celebrationContainer');

    if (!celebrationBtn) {
        console.error('❌ CRITICAL: Celebration button #celebrationBtn NOT FOUND');
        return;
    }

    console.log('✅ Celebration button found');

    // Create celebration container if it doesn't exist
    if (!celebrationContainer) {
        celebrationContainer = document.createElement('div');
        celebrationContainer.id = 'celebrationContainer';
        celebrationContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(celebrationContainer);
        console.log('✅ Celebration container created');
    } else {
        console.log('✅ Celebration container already exists');
    }

    // Handle click event
    celebrationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ Button clicked - triggering celebration');
        const container = document.getElementById('celebrationContainer');
        triggerFullCelebration(container);
        animateButton(celebrationBtn);
    });

    // Add touch support for mobile devices
    celebrationBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('👆 Button touched - triggering celebration');
        const container = document.getElementById('celebrationContainer');
        triggerFullCelebration(container);
        animateButton(celebrationBtn);
    });
    
    // Prevent double-trigger on touch
    celebrationBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
    });
    
    console.log('✅ CELEBRATION SYSTEM INITIALIZED - Ready to celebrate!');
}

function animateButton(btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

function triggerFullCelebration(container) {
    // Ensure container exists
    if (!container) {
        container = document.getElementById('celebrationContainer');
        if (!container) {
            console.error('❌ Celebration container not found');
            return;
        }
    }

    // Advanced mobile detection (viewport + user agent)
    const isMobileViewport = window.innerWidth <= 768 || window.innerHeight <= 600;
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobile = isMobileViewport || isMobileUserAgent;
    
    // Detect low-end devices (smaller screens)
    const isLowEndDevice = window.innerWidth <= 480;

    console.log('🎉 CELEBRATION TRIGGERED!', {
        isMobile: isMobile,
        isMobileViewport: isMobileViewport,
        isMobileUserAgent: isMobileUserAgent,
        isLowEndDevice: isLowEndDevice,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        containerExists: !!container,
        containerSize: `${container.offsetWidth}x${container.offsetHeight}`
    });

    // Ensure container is visible and functional
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.pointerEvents = 'none';

    // Calculate center position relative to viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // AGGRESSIVE MOBILE OPTIMIZATION
    // Mobile: 15 confetti, 12 burst, 20 particles, 8 balloons
    // Desktop: 40 confetti, 30 burst, 50 particles, 20 balloons
    if (isMobile) {
        console.log('📱 MOBILE MODE - Aggressive Optimization');
        
        // Even more aggressive for low-end devices
        if (isLowEndDevice) {
            console.log('📱 LOW-END DEVICE - Ultra-Light Mode');
            createConfetti(container, centerX, centerY, 10);
            setTimeout(() => createEmojiBurst(container, centerX, centerY, 8), 80);
            setTimeout(() => createParticles(container, 15), 120);
            setTimeout(() => createBalloons(container, 5), 160);
        } else {
            // Standard mobile aggressive optimization
            createConfetti(container, centerX, centerY, 15);
            setTimeout(() => createEmojiBurst(container, centerX, centerY, 12), 100);
            setTimeout(() => createParticles(container, 20), 150);
            setTimeout(() => createBalloons(container, 8), 200);
        }
    } else {
        console.log('🖥️ DESKTOP MODE - Full Effects');
        createConfetti(container, centerX, centerY, 40);
        setTimeout(() => createEmojiBurst(container, centerX, centerY, 30), 100);
        setTimeout(() => createParticles(container, 50), 150);
        setTimeout(() => createBalloons(container, 20), 200);
    }

    console.log('✅ All celebration effects triggered');
}

/* Confetti Falling Effect - Aggressive Mobile Optimized */
function createConfetti(container, startX, startY, count = 40) {
    const colors = ['🎉', '🎊', '✨', '⭐', '💫'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'celebration-confetti';
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)];
        
        // Reduced spread radius for mobile
        const isMobile = window.innerWidth <= 768;
        const angle = (Math.PI * 2 * i) / count;
        const velocity = isMobile ? (1.5 + Math.random() * 2.5) : (2 + Math.random() * 4);
        const spreadMultiplier = isMobile ? 15 : 25;
        const tx = Math.cos(angle) * velocity * spreadMultiplier;
        const ty = Math.sin(angle) * velocity * spreadMultiplier;
        
        // Aggressive mobile optimization
        confetti.style.position = 'fixed';
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.fontSize = '1.5rem';
        confetti.style.willChange = 'transform, opacity';
        confetti.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
        
        const duration = 2.5 + Math.random() * 1;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationName = 'confettiFall';
        confetti.style.animationFillMode = 'forwards';
        
        container.appendChild(confetti);
        
        // Immediate cleanup after animation completes
        const timeoutId = setTimeout(() => {
            if (confetti && confetti.parentNode) {
                confetti.remove();
            }
        }, duration * 1000 + 100);
    }
    
    console.log('✨ Confetti created: ' + count + ' particles');
}

/* Emoji Burst - Quick explosion effect - Mobile Optimized */
function createEmojiBurst(container, startX, startY, count = 30) {
    const emojis = ['🎉', '🎊', '💝', '❤️', '✨', '🌟', '⭐', '💫'];
    const isMobile = window.innerWidth <= 768;
    
    for (let i = 0; i < count; i++) {
        const burst = document.createElement('span');
        burst.className = 'celebration-burst';
        burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Reduced distance spread for mobile
        const angle = (Math.PI * 2 * i) / count;
        const maxDistance = isMobile ? 100 : 150;
        const randomDistance = maxDistance + Math.random() * (isMobile ? 80 : 150);
        const distance = Math.min(randomDistance, window.innerWidth / 3);
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        burst.style.position = 'fixed';
        burst.style.left = startX + 'px';
        burst.style.top = startY + 'px';
        burst.style.zIndex = '9999';
        burst.style.pointerEvents = 'none';
        burst.style.fontSize = '2.5rem';
        burst.style.willChange = 'transform, opacity';
        
        burst.style.setProperty('--tx', tx + 'px');
        burst.style.setProperty('--ty', ty + 'px');
        burst.style.animationName = 'emojiBurst';
        burst.style.animationDuration = '1.2s';
        burst.style.animationFillMode = 'forwards';
        
        container.appendChild(burst);
        
        const timeoutId = setTimeout(() => {
            if (burst && burst.parentNode) {
                burst.remove();
            }
        }, 1300);
    }
    
    console.log('💥 Emoji burst created: ' + count + ' particles');
}

/* Celebration Particles - Sparkle Effect - Mobile Optimized */
function createParticles(container, count = 50) {
    const particles = ['✨', '💫', '⭐', '🌟', '💥'];
    const isMobile = window.innerWidth <= 768;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        particle.className = 'celebration-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        
        // Reduced spread for mobile
        const viewportMargin = isMobile ? 50 : 100;
        const randomX = Math.random() * (window.innerWidth - viewportMargin * 2) + viewportMargin;
        const randomY = Math.random() * (window.innerHeight - viewportMargin * 2) + viewportMargin;
        const px = (Math.random() - 0.5) * (isMobile ? 80 : 150);
        
        particle.style.position = 'fixed';
        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.zIndex = '9999';
        particle.style.pointerEvents = 'none';
        particle.style.fontSize = '1.8rem';
        particle.style.willChange = 'transform, opacity';
        
        particle.style.setProperty('--px', px + 'px');
        
        const duration = isMobile ? (1 + Math.random() * 0.8) : (1.5 + Math.random() * 1);
        particle.style.animationDuration = duration + 's';
        particle.style.animationName = 'particleFloat';
        particle.style.animationFillMode = 'forwards';
        
        const delay = Math.random() * (isMobile ? 0.15 : 0.3);
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
        
        const timeoutId = setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000 + 100);
    }
    
    console.log('✨ Particles created: ' + count + ' sparkles');
}

/* Balloons Animation - Slow Rising - Mobile Optimized */
function createBalloons(container, count = 20) {
    const balloonColors = ['🎈', '🎈', '🎈', '🎉', '🎊'];
    const isMobile = window.innerWidth <= 768;
    
    for (let i = 0; i < count; i++) {
        const balloon = document.createElement('span');
        balloon.className = 'celebration-balloon';
        balloon.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        
        // Keep balloons within viewport bounds
        const startX = Math.random() * (window.innerWidth - 40) + 20;
        const floatAmount = (Math.random() - 0.5) * (isMobile ? 50 : 80);
        
        balloon.style.position = 'fixed';
        balloon.style.left = startX + 'px';
        balloon.style.bottom = '-100px';
        balloon.style.zIndex = '9999';
        balloon.style.pointerEvents = 'none';
        balloon.style.fontSize = '2rem';
        balloon.style.willChange = 'transform, opacity';
        
        balloon.style.setProperty('--float', floatAmount + 'px');
        
        const duration = isMobile ? (3 + Math.random() * 1.5) : (4 + Math.random() * 2);
        balloon.style.animationDuration = duration + 's';
        balloon.style.animationName = 'balloonRise';
        balloon.style.animationFillMode = 'forwards';
        
        const delay = i * 0.08;
        balloon.style.animationDelay = delay + 's';
        
        container.appendChild(balloon);
        
        const timeoutId = setTimeout(() => {
            if (balloon && balloon.parentNode) {
                balloon.remove();
            }
        }, (duration + delay) * 1000 + 100);
    }
    
    console.log('🎈 Balloons created: ' + count + ' balloons');
}

// Initialize celebration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📍 DOM loaded - Initializing celebration');
    initCelebration();
});

// Add retry mechanism in case DOM is ready before script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => initCelebration(), 100);
    });
} else {
    // DOM already loaded
    setTimeout(() => {
        console.log('📍 Checking celebration button availability...');
        if (!document.getElementById('celebrationBtn')) {
            console.warn('⚠️ Button not found on immediate check, retrying...');
            setTimeout(() => initCelebration(), 500);
        } else {
            initCelebration();
        }
    }, 100);
}

console.log('Wedding invitation website loaded successfully! 🎉');

// ============================================
// TEST FUNCTION - Call from console: testCelebration()
// ============================================
window.testCelebration = function() {
    console.log('🧪 TEST CELEBRATION FUNCTION');
    const container = document.getElementById('celebrationContainer');
    const btn = document.getElementById('celebrationBtn');
    
    console.log('Container exists:', !!container);
    console.log('Button exists:', !!btn);
    
    if (container && btn) {
        console.log('✅ Both elements exist - Triggering celebration...');
        triggerFullCelebration(container);
    } else {
        console.error('❌ Missing elements:');
        if (!container) console.error('  - celebrationContainer not found');
        if (!btn) console.error('  - celebrationBtn not found');
    }
};

console.log('💡 TIP: Type testCelebration() in console to manually test celebration effects');
