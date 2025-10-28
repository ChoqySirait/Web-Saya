document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const skillsSection = document.getElementById('skills');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsSection.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});