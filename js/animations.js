/* ============================================
   ANIMATIONS.JS - Animation Utilities
   ============================================ */

// Intersection Observer for scroll animations
class ScrollAnimator {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, options);

        // Observe all elements with scroll-reveal class
        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(el => this.observer.observe(el));
    }

    addElement(element) {
        this.observer.observe(element);
    }
}

// Confetti animation
class ConfettiEffect {
    constructor(container = document.body) {
        this.container = container;
    }

    create(duration = 3000) {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createPiece(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 30);
        }
    }

    createPiece(color) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = color;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        this.container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Ripple effect on buttons
function addRippleEffect(button) {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Initialize ripple effects on all buttons with .btn-ripple class
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    rippleButtons.forEach(button => {
        // Add required CSS if not already added
        if (!button.style.position || button.style.position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        
        addRippleEffect(button);
    });

    // Add ripple CSS
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Stagger animation for lists
function staggerAnimation(container, delay = 100) {
    const items = container.children;
    Array.from(items).forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `fadeInUp 0.6s ease-out forwards`;
        item.style.animationDelay = `${index * delay}ms`;
    });
}

// Success checkmark animation
function showSuccessCheckmark(container) {
    const checkmark = document.createElement('div');
    checkmark.innerHTML = `
        <svg class="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style="width: 100px; height: 100px;">
            <circle cx="26" cy="26" r="25" fill="none" stroke="#4CAF50" stroke-width="2"/>
            <path fill="none" stroke="#4CAF50" stroke-width="3" stroke-linecap="round" 
                  stroke-linejoin="round" stroke-miterlimit="10" 
                  d="M14.1 27.2l7.1 7.2 16.7-16.8" 
                  style="stroke-dasharray: 100; stroke-dashoffset: 100; animation: checkmarkAnimation 0.5s ease-out forwards;"/>
        </svg>
    `;
    
    checkmark.style.display = 'flex';
    checkmark.style.justifyContent = 'center';
    checkmark.style.alignItems = 'center';
    checkmark.style.animation = 'scaleIn 0.5s ease-out';
    
    container.appendChild(checkmark);
    
    setTimeout(() => {
        checkmark.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => checkmark.remove(), 300);
    }, 2000);
}

// Page transition
function pageTransition(fromPage, toPage, type = 'fade') {
    const transitions = {
        fade: () => {
            fromPage.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                fromPage.style.display = 'none';
                toPage.style.display = 'block';
                toPage.style.animation = 'fadeIn 0.3s ease-out forwards';
            }, 300);
        },
        slide: () => {
            fromPage.style.animation = 'slideOutLeft 0.4s ease-out forwards';
            setTimeout(() => {
                fromPage.style.display = 'none';
                toPage.style.display = 'block';
                toPage.style.animation = 'slideInRight 0.4s ease-out forwards';
            }, 400);
        },
        zoom: () => {
            fromPage.style.animation = 'zoomOut 0.3s ease-out forwards';
            setTimeout(() => {
                fromPage.style.display = 'none';
                toPage.style.display = 'block';
                toPage.style.animation = 'scaleIn 0.3s ease-out forwards';
            }, 300);
        }
    };

    if (transitions[type]) {
        transitions[type]();
    } else {
        transitions.fade();
    }
}

// Loading spinner
function showLoadingSpinner(container, message = 'Loading...') {
    const spinner = document.createElement('div');
    spinner.className = 'loading-container';
    spinner.innerHTML = `
        <div class="loading-spinner"></div>
        <p class="loading-message">${message}</p>
    `;
    
    container.appendChild(spinner);
    return spinner;
}

function hideLoadingSpinner(spinner) {
    if (spinner && spinner.parentNode) {
        spinner.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => spinner.remove(), 300);
    }
}

// Toast notification with animation
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#FF9800',
        info: '#2196F3'
    };

    toast.style.background = colors[type] || colors.success;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.4s ease-out forwards';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// Celebrate streak milestone
function celebrateStreak(streakDays) {
    const confetti = new ConfettiEffect();
    confetti.create();
    
    showToast(`🔥 Amazing! ${streakDays} day streak!`, 'success', 4000);
    
    // Play sound if available (optional)
    if (typeof Audio !== 'undefined' && !localStorage.getItem('muteSounds')) {
        // const sound = new Audio('path/to/celebration-sound.mp3');
        // sound.play().catch(() => {});
    }
}

// Smooth scroll to element
function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Initialize all animations on page load
function initAnimations() {
    // Initialize scroll animations
    const scrollAnimator = new ScrollAnimator();
    
    // Initialize ripple effects
    initRippleEffects();
    
    // Add stagger animation to habit lists
    const habitLists = document.querySelectorAll('.habit-list');
    habitLists.forEach(list => {
        if (list.children.length > 0) {
            staggerAnimation(list, 50);
        }
    });

    // Add fadeInUp to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease-out forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimator,
        ConfettiEffect,
        addRippleEffect,
        initRippleEffects,
        staggerAnimation,
        showSuccessCheckmark,
        pageTransition,
        showLoadingSpinner,
        hideLoadingSpinner,
        showToast,
        celebrateStreak,
        smoothScrollTo,
        initAnimations
    };
}
