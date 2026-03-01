/* =============================================
   ORCHARD PARK — Homepage Scripts
   Clone of experiencesrliving.com interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('primary-menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const header = document.getElementById('masthead');
    const utilityHeader = document.querySelector('.utility-header');

    function handleScroll() {
        if (window.scrollY > 60) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll(
        '.about-columns, .testimonial-block, .gallery-2-photos, .gallery-6-photos, .gallery-4-square, .gallery-6-square, .dark-section, .services-heading, .features-section, .cta-section, .experience-section, .experience-carousel-section, .form-section, .feature-column'
    );

    revealElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // ===== CONTACT FORM UX =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.gform_button');
            const originalText = btn.textContent;
            btn.textContent = 'Thank You!';
            btn.disabled = true;
            btn.style.background = 'rgba(255,255,255,0.2)';

            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        });
    }

    // ===== SMOOTH SCROLL FOR HASH LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    // ===== EXPERIENCE CAROUSEL LOGIC =====
    const carouselContainer = document.getElementById('experienceCarousel');
    const prevBtn = document.getElementById('expPrevBtn');
    const nextBtn = document.getElementById('expNextBtn');

    if (carouselContainer && prevBtn && nextBtn) {
        // Calculate dynamic scroll amount based on current card width + gap
        const getScrollAmount = () => {
            const card = carouselContainer.querySelector('.experience-card');
            return card ? card.offsetWidth + 15 : 300; // 15px is the CSS gap
        };

        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }
});
