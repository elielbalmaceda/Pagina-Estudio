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
}

// Validación de formulario de contacto
const validateForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const nombre = form.querySelector('#nombre').value;
    const email = form.querySelector('#email').value;
    const mensaje = form.querySelector('#mensaje').value;
    const errorDiv = document.querySelector('.form-error');
    
    if (!nombre || !email || !mensaje) {
        errorDiv.textContent = 'Por favor, complete todos los campos';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (!email.includes('@')) {
        errorDiv.textContent = 'Por favor, ingrese un email válido';
        errorDiv.style.display = 'block';
        return;
    }
    // Si todo está bien, mostrar mensaje de éxito
    errorDiv.style.display = 'none';
    const successDiv = document.querySelector('.form-success');
    successDiv.style.display = 'block';
    form.reset();
}
/*Enviar a correo*/
const btn = document.getElementById('submit-btn');
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    const serviceID = 'default_service';
    const templateID = 'template_tlxar4g';
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.textContent = 'Enviar';
            btn.disabled = false;
            alert('¡Mensaje enviado con éxito!');
            form.reset();
        })
        .catch((err) => {
            btn.textContent = 'Enviar';
            btn.disabled = false;
            alert('Error al enviar el mensaje: ' + JSON.stringify(err));
        });
});