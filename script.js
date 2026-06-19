// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.className = 'fas fa-bars';
            
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 80;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterElement = entry.target.querySelector('.counter');
            if (counterElement) {
                const target = parseInt(counterElement.dataset.target);
                animateCounter(counterElement, target);
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-item').forEach(item => {
    counterObserver.observe(item);
});

// ==================== SCROLL ANIMATION ====================
const animatedElements = document.querySelectorAll('.course-card, .testimonial-card, .feature-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(40px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
    scrollObserver.observe(item);
});

// ==================== ANIMATION STYLES ====================
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    
    Object.assign(notif.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: '#fff',
        padding: '1rem 1.8rem',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        zIndex: '1000',
        fontFamily: "'Inter', sans-serif",
        fontWeight: '600',
        fontSize: '0.95rem',
        maxWidth: '400px',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.4s ease',
        cursor: 'pointer'
    });
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.transform = 'translateY(0)';
        notif.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notif.style.transform = 'translateY(100px)';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 400);
    }, 3000);
    
    notif.addEventListener('click', () => {
        notif.style.transform = 'translateY(100px)';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 400);
    });
}

// ==================== BUTTON CLICKS ====================
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.closest('a')) return;
        
        const text = this.textContent.trim();
        
        const messages = {
            'Kurslarni ko\'rish': '📚 Kurslar sahifasiga o\'tyapmiz!',
            'Bepul dars': '🎬 Bepul dars video\'si ochilmoqda!',
            'Ro\'yxatdan o\'tish': '📝 Ro\'yxatdan o\'tish formasi ochilmoqda!',
            'Kirish': '🔑 Kirish sahifasi tayyorlanmoqda.',
            'Barcha kurslarni ko\'rish': '📚 Barcha kurslar ro\'yxati ochilmoqda!',
            'Bepul sinab ko\'rish': '🎉 7 kunlik bepul sinovga yozildingiz!',
            'Bog\'lanish': '📞 Tez orada siz bilan bog\'lanamiz!'
        };
        
        for (const [key, value] of Object.entries(messages)) {
            if (text.includes(key)) {
                showNotification(value, 'success');
                return;
            }
        }
        
        showNotification('✅ Bu demo versiya! Asosiy funksiyalar tez orada qo\'shiladi.', 'info');
    });
});

// ==================== SOCIAL ICONS ====================
document.querySelectorAll('.social-icons i').forEach(icon => {
    icon.addEventListener('click', function () {
        const platform = this.className.replace('fab fa-', '');
        const names = {
            'telegram': 'Telegram',
            'instagram': 'Instagram',
            'youtube': 'YouTube',
            'github': 'GitHub',
            'linkedin': 'LinkedIn'
        };
        const name = names[platform] || platform;
        showNotification(`🌐 ${name} sahifasiga o'tish (demo)`, 'info');
    });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        navbar.style.background = 'rgba(255,255,255,0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
        navbar.style.background = 'rgba(255,255,255,0.95)';
    }
});

// ==================== CONSOLE ====================
console.log('🚀 Frontend University saytiga xush kelibsiz!');
console.log('📚 Biz bilan zamonaviy dasturlashni o\'rganing.');
console.log('💡 Yangi kurslar va aksiyalar haqida xabar olish uchun bizga qo\'shiling!');