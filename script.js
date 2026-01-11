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

    // Ensure overlay blocks interaction initially
    overlay.classList.add('active');

    // Sequence
    setTimeout(() => {
        // 1. Reveal (Split panels + fade text)
        overlay.classList.add('start-reveal');

        // 2. Allow interaction after split starts to finish (approx)
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 1500);

        // 3. Trigger hero animations slightly after split starts
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, 800 + (index * 200)); // Start revealing hero items as curtains open
        });

    }, 1500); // Initial wait
});
