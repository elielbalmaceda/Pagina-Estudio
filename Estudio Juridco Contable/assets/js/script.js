// Referencias al DOM
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

// Configuración de EmailJS
document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("13vrVxjlRSIHm0D7a");
});

// Manejo del menú móvil
const toggleMenu = () => {
    navLinks.classList.toggle('nav-active');
    const isActive = navLinks.classList.contains('nav-active');
    
    menuBtn.innerHTML = isActive 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = isActive ? 'hidden' : '';
};

// Cerrar menú al hacer click en un enlace o fuera del menú
document.addEventListener('click', (e) => {
    const isMenuOpen = navLinks.classList.contains('nav-active');
    const isMenuBtn = e.target.closest('.menu-btn');
    const isNavLink = e.target.closest('.nav-link');
    
    if (isMenuOpen && !isMenuBtn && (isNavLink || !e.target.closest('.nav-links'))) {
        toggleMenu();
    }
});

// Validaciones
const validators = {
    nombre: (value) => {
        if (!value) return 'El nombre es requerido';
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return null;
    },
    apellido: (value) => {
        if (!value) return 'El apellido es requerido';
        if (value.length < 2) return 'El apellido debe tener al menos 2 caracteres';
        return null;
    },
    telefono: (value) => {
        if (!value) return 'El teléfono es requerido';
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
            return 'Ingrese un número de teléfono válido (10 dígitos)';
        }
        return null;
    },
    email: (value) => {
        if (!value) return 'El email es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Ingrese un email válido';
        }
        return null;
    },
    consulta: (value) => {
        if (!value) return 'La consulta es requerida';
        if (value.length < 10) return 'La consulta debe tener al menos 10 caracteres';
        return null;
    }
};

// Validación en tiempo real
Object.keys(validators).forEach(fieldName => {
    const input = document.getElementById(fieldName);
    if (input) {
        input.addEventListener('blur', () => {
            validateField(fieldName, input.value);
        });
    }
});

// Función para validar un campo específico
const validateField = (fieldName, value) => {
    const error = validators[fieldName]?.(value.trim());
    const input = document.getElementById(fieldName);
    const errorElement = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : document.createElement('div');
    
    if (error) {
        if (!errorElement.classList.contains('error-message')) {
            errorElement.className = 'error-message';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = error;
        input.classList.add('invalid');
    } else {
        errorElement.remove();
        input.classList.remove('invalid');
    }
    
    return !error;
};

// Manejo del envío del formulario
const handleSubmit = async (event) => {
    event.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    // Validar todos los campos
    const formData = new FormData(form);
    let isValid = true;

    for (const [fieldName, value] of formData.entries()) {
        if (!validateField(fieldName, value)) {
            isValid = false;
        }
    }

    if (!isValid) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
        return;
    }

    try {
        const serviceID = 'default_service';
        const templateID = 'template_tlxar4g';
        
        await emailjs.sendForm(serviceID, templateID, form);
        
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado con éxito!', 'success');
        form.reset();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
    }
};

// Función para mostrar notificaciones
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
};

// Event Listeners
menuBtn.addEventListener('click', toggleMenu);
form.addEventListener('submit', handleSubmit);

// Cerrar menú al redimensionar la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('nav-active')) {
        toggleMenu();
    }
});