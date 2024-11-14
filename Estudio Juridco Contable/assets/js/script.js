// Menú móvil
const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        navLinks.classList.add('nav-active');
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
};