document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation on scroll using Intersection Observer
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements we want to animate
    document.querySelectorAll('.card, .section-title, .rsvp-intro').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Opening Animation Logic
    const overlay = document.getElementById('opening-overlay');

    // Sequence
    setTimeout(() => {
        // 1. Open the envelope flap
        overlay.classList.add('open-flap');

        // 2. Expand the card inside
        setTimeout(() => {
            overlay.classList.add('expand-card');
        }, 1600); // 1.5s transition + small buffer

        // 3. Hide overlay completely after expansion covers screen
        setTimeout(() => {
            overlay.classList.add('hidden');

            // Ensure display:none is applied after fade out (1s transition in CSS)
            setTimeout(() => {
                overlay.classList.add('removed');
            }, 1000);

            // 4. Trigger hero animations
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 100);
            });

        }, 3000); // 1600 (flap) + 1200 (expansion) + buffer
    }, 1000); // Initial start delay
});
