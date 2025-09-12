function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Enhanced project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    

    // Project filtering with animation
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Add stagger animation to filtered results
            let delay = 0;
            
            projectCards.forEach((card, index) => {
                if (filterValue === 'all') {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = `scaleIn 0.6s ease-out ${delay}s both`;
                    }, delay * 100);
                    delay += 0.1;
                } else {
                    const categories = card.getAttribute('data-category');
                    if (categories && categories.includes(filterValue)) {
                        setTimeout(() => {
                            card.classList.remove('hidden');
                            card.style.animation = `scaleIn 0.6s ease-out ${delay}s both`;
                        }, delay * 100);
                        delay += 0.1;
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Enhanced intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Add special effects for project cards
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(`
        .fade-in-up, .scale-in, .slide-in-left, 
        .slide-in-right, .slide-in-center, 
        .slide-in-bottom, .fade-in-item, .project-card , .hero-description
    `);

    animatedElements.forEach((el, index) => {
        el.style.animationPlayState = 'paused';
        
        // Add stagger effect for project cards
        if (el.classList.contains('project-card')) {
            el.style.transform = 'translateY(30px)';
            el.style.opacity = '0';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        observer.observe(el);
    });

    // Add smooth scroll behavior for project navigation
    const projectLinks = document.querySelectorAll('a[href*="#projects"]');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation for project cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('project-btn-primary') || 
                focusedElement.classList.contains('project-btn-secondary')) {
                const projectCard = focusedElement.closest('.project-card');
                if (projectCard) {
                    projectCard.style.transform = 'translateY(-12px)';
                    projectCard.style.boxShadow = '0 20px 40px rgba(212, 163, 115, 0.25)';
                }
            }
        }
    });

    // Reset card styles when focus is lost
    document.addEventListener('focusout', function(e) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (!card.contains(document.activeElement) && !card.matches(':hover')) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    });
});
