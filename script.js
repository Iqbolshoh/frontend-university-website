// ==================== NAVBAR HAMBURGER ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navbarni yopish (link bosilganda)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Tema holatini saqlash
let isDarkMode = true;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    body.classList.toggle('light-mode', !isDarkMode);
    
    const icon = themeToggle.querySelector('i');
    if (isDarkMode) {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
    
    // Tema holatini localStorage ga saqlash
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);

// Saqlangan temani yuklash
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    isDarkMode = false;
    body.classList.add('light-mode');
    themeToggle.querySelector('i').className = 'fas fa-sun';
} else {
    themeToggle.querySelector('i').className = 'fas fa-moon';
}

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                countersAnimated = true;
                return;
            }
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    });
}

// ==================== SCROLL ANIMATION (Intersection Observer) ====================
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Counterlarni ishga tushirish
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
            
            // Card larga animatsiya qo'shish
            entry.target.querySelectorAll('.course-card, .testimonial-card, .feature-card').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// ==================== STATS OBSERVER ====================
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ==================== CARDS ANIMATION ====================
document.querySelectorAll('.course-card, .testimonial-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// ==================== SMOOTH SCROLL NAVBAR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.style.color = 'var(--text-secondary)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// ==================== CONSOLE LOG ====================
console.log('🚀 Frontend University saytiga xush kelibsiz!');
console.log('💡 Dark mode va Light mode mavjud!');
console.log('📚 Kurslar bilan tanishib chiqing!');