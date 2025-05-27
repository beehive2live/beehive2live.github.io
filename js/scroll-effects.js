document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Get all elements to animate
    const elements = document.querySelectorAll('article, .image-with-context, h2, h3');
    
    // Add fade-in class to all elements
    elements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollingDown = scrollTop > lastScrollTop;
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add direction-specific class
                entry.target.classList.add('visible');
                entry.target.style.transform = scrollingDown ? 
                    'translateY(0)' : 'translateY(0)';
            } else {
                // Reset position based on scroll direction
                entry.target.classList.remove('visible');
                entry.target.style.transform = scrollingDown ? 
                    'translateY(20px)' : 'translateY(-20px)';
            }
        });
        
        lastScrollTop = scrollTop;
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in elements
    elements.forEach(element => {
        observer.observe(element);
    });
});