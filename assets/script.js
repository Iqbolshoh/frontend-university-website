'use strict';

// ============================================
// DOM REFERENCES
// ============================================
const preloader = document.getElementById('preloader');
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const counters = document.querySelectorAll('.counter');

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 800);
});

// ============================================
// THEME TOGGLE
// ============================================
const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
};

// Initial theme
setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ============================================
// HAMBURGER MENU
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('open');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navList.classList.contains('open')) {
        hamburger.classList.remove('active');
        navList.classList.remove('open');
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (currentScroll >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Back to top button
    if (currentScroll > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// BACK TO TOP
// ============================================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================
let countersAnimated = false;

const animateCounters = () => {
    if (countersAnimated) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
    
    countersAnimated = true;
};

// ============================================
// INTERSECTION OBSERVER
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger counters
            if (entry.target.id === 'statistics') {
                animateCounters();
            }
            
            // Animate cards
            const cards = entry.target.querySelectorAll('.course-card, .testimonial-card, .feature-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe sections
document.querySelectorAll('.courses, .testimonials, .features, #statistics').forEach(section => {
    observer.observe(section);
});

// Set initial state for cards
document.querySelectorAll('.course-card, .testimonial-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const offset = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape key closes menu
    if (e.key === 'Escape' && navList.classList.contains('open')) {
        hamburger.classList.remove('active');
        navList.classList.remove('open');
    }
});

// ============================================
// CONSOLE
// ============================================
console.log('%c🚀 Frontend University', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c💡 Dark mode va Light mode mavjud!', 'font-size: 14px; color: #94a3b8;');
console.log('%c📚 Kurslar bilan tanishib chiqing!', 'font-size: 14px; color: #94a3b8;');
console.log('%c🔗 https://frontend.uz', 'font-size: 14px; color: #6366f1;');