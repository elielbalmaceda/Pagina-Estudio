// Referencias al DOM
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const errorDiv = document.querySelector('.form-error');
const successDiv = document.querySelector('.form-success');
const btn = document.getElementById('submit-btn');
const form = document.getElementById('contact-form');

// Función para alternar el menú móvil
const toggleMenu = () => {
    const isActive = navLinks.classList.contains('nav-active');
    navLinks.classList.toggle('nav-active');
    menuBtn.innerHTML = isActive 
        ? '<i class="fas fa-bars"></i>' 
        : '<i class="fas fa-times"></i>';
};

// Validación del email
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Validación del formulario de contacto
const validateForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const nombre = form.querySelector('#nombre').value.trim();
    const email = form.querySelector('#email').value.trim();
    const mensaje = form.querySelector('#mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
        errorDiv.textContent = 'Por favor, complete todos los campos';
        errorDiv.style.display = 'block';
        return;
    }

    if (!validateEmail(email)) {
        errorDiv.textContent = 'Por favor, ingrese un email válido';
        errorDiv.style.display = 'block';
        return;
    }

    // Si todo está bien
    errorDiv.style.display = 'none';
    successDiv.style.display = 'block';
    form.reset();
};

emailjs.init("13vrVxjlRSIHm0D7a");

// Envío del formulario con EmailJS
const sendEmail = async (event) => {
    event.preventDefault();
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const serviceID = 'default_service';
    const templateID = 'template_tlxar4g';

    try {
        await emailjs.sendForm(serviceID, templateID, form);
        alert('¡Mensaje enviado con éxito!');
        form.reset();
    } catch (err) {
        alert('Error al enviar el mensaje: ' + JSON.stringify(err));
    } finally {
        btn.textContent = 'Enviar';
        btn.disabled = false;
    }
};

// Eventos
menuBtn.addEventListener('click', toggleMenu);
form.addEventListener('submit', sendEmail);