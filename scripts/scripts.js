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

const sections = document.querySelectorAll('section, header, footer');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === currentSectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

const skillsSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsSection.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {root: null, rootMargin: '0px', threshold: 0.4});

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const modal = document.getElementById("projectModal");
const closeModal = document.getElementsByClassName("close-button")[0];

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalImage = document.getElementById("modalImage");

document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const item = this.closest('.project-item');
        
        modalTitle.innerText = item.dataset.title;
        modalDescription.innerText = item.dataset.desc;
        modalTech.innerText = "Technologies: " + item.dataset.tech;
        modalImage.src = item.dataset.image;
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    });
});

closeModal.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}