/* ==========================================================================
   DR. GONDRES - SITIO WEB PREMIUM (PARTE 1 DE 2 - JAVASCRIPT)
   Contiene: Lógica de Menú Móvil, Navbar Adaptativa y ScrollSpy Dinámico
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. VARIABLES DE NAVEGACIÓN ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // --- 2. INTERACTIVIDAD DEL MENÚ MÓVIL (HAMBURGUESA) ---
    if (mobileMenuBtn && navMenu) {
        // Abrir / Cerrar menú al presionar el botón de tres líneas
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active');
            
            // Atributo de accesibilidad móvil
            const isOpen = navMenu.classList.contains('open');
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar el menú automáticamente cuando el usuario toca un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Cerrar el menú si el usuario toca cualquier otra parte de la pantalla
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // --- 3. COMPORTAMIENTO DE NAVBAR FLOTANTE Y SCROLLSPY ---
    const handleScrollEffects = () => {
        const scrollPosition = window.scrollY;

        // Efecto Premium: La barra se vuelve más compacta y estilizada al hacer scroll
        if (scrollPosition > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(26, 54, 93, 0.08)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '15px 0';
        }

        // ScrollSpy: Rastrea la lectura del usuario e ilumina la sección activa
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 110; // Compensación de altura de la navbar
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Aplica la clase activa al enlace correspondiente
        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    // Escuchar el evento de movimiento de pantalla
    window.addEventListener('scroll', handleScrollEffects);
    // Ejecutar una vez al cargar por si la página se recarga en medio del sitio
    handleScrollEffects();
    // --- 4. INTERACTIVIDAD DE LA FOTO PREMIUM (LIGHTBOX / MODAL) ---
    const profileTrigger = document.getElementById('profileImageTrigger');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxClose = document.getElementById('lightboxClose');

    if (profileTrigger && lightbox && lightboxClose) {
        // Abrir ventana flotante al hacer clic en la imagen
        profileTrigger.addEventListener('click', () => {
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
        });

        // Función reutilizable para cerrar la ventana
        const closeLightboxView = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = ''; // Restaura el scroll del fondo
        };

        // Cerrar al presionar la 'X'
        lightboxClose.addEventListener('click', closeLightboxView);

        // Cerrar al hacer clic en cualquier parte oscura del fondo
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                closeLightboxView();
            }
        });

        // Cerrar con la tecla 'Escape' del teclado (Detalle de navegación Premium)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightboxView();
            }
        });
    }

    // --- 5. GESTIÓN INTELIGENTE DEL FORMULARIO DE CONSULTA ---
    const appointmentForm = document.getElementById('premiumAppointmentForm');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la página se recargue bruscamente

            // Captura minuciosa de los datos ingresados por el usuario
            const parentName = document.getElementById('parentName').value.trim();
            const patientName = document.getElementById('patientName').value.trim();
            const patientAge = document.getElementById('patientAge').value.trim();
            const phoneContact = document.getElementById('phone').value.trim();
            const reasonSelect = document.getElementById('reason');
            const reasonText = reasonSelect.options[reasonSelect.selectedIndex].text;
            const extraMessage = document.getElementById('message').value.trim();

            // Interrupción visual Premium: Animamos el botón de envío para dar feedback de éxito
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Generando Solicitud Exclusiva...';
            submitBtn.style.backgroundColor = 'var(--accent)';
            submitBtn.disabled = true;

            // Formateo elegante del mensaje estructurado para WhatsApp
            const intro = "Hola, Dr. Gondres. Deseo agendar una consulta pediátrica privada a través de su sitio web:";
            const body = `\n\n• *Tutor:* ${parentName}\n• *Paciente:* ${patientName}\n• *Edad:* ${patientAge}\n• *Contacto:* ${phoneContact}\n• *Motivo:* ${reasonText}\n• *Notas:* ${extraMessage || 'Ninguna'}`;
            
            // Creación del enlace seguro directo a su número
            const whatsappBaseUrl = "https://wa.me/529984144170";
            const fullWhatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(intro + body)}`;

            // Retraso controlado para simular un proceso de carga premium y abrir la aplicación
            setTimeout(() => {
                window.open(fullWhatsappUrl, '_blank');
                
                // Restablecer el formulario y el diseño del botón
                appointmentForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 1200);
        });
    }

}); // Cierre definitivo del DOMContentLoaded principal de la primera mitad
