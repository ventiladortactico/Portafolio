// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const reduceMotion = prefersReducedMotion();

    // Crear indicador de scroll (si no se prefiere reducir movimiento)
    if (!reduceMotion) {
        createScrollIndicator();
    }
    
    // Configurar smooth scroll para navegación (ajustado por reduce motion)
    setupSmoothScroll(reduceMotion);
    
    // Configurar efectos de hover para las cards (respetando reduce motion)
    setupCardEffects(reduceMotion);
    
    // Configurar lazy loading para imágenes
    setupLazyLoading();
    
    // Configurar animaciones de entrada (si no se prefiere reducir movimiento)
    if (!reduceMotion) {
        setupScrollAnimations();
    }

    // Configurar lightbox para galerías
    setupLightbox();
});

// Detectar preferencia de reduce motion
function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Crear barra de progreso de scroll
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Configurar scroll suave para navegación
function setupSmoothScroll(reduceMotion = false) {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: reduceMotion ? 'auto' : 'smooth'
                });
                
                // Añadir efecto visual al enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Gestionar aria-current para accesibilidad
                navLinks.forEach(l => l.removeAttribute('aria-current'));
                this.setAttribute('aria-current', 'page');
            }
        });
    });
}

// Efectos avanzados para las cards
function setupCardEffects(reduceMotion = false) {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Efecto de rotación sutil en hover
        card.addEventListener('mouseenter', function() {
            if (reduceMotion) return;
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'all 0.3s ease';
            
            // Efecto de brillo
            const overlay = document.createElement('div');
            overlay.className = 'card-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                transition: left 0.6s ease;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.left = '100%';
            }, 100);
        });
        
        card.addEventListener('mouseleave', function() {
            if (reduceMotion) return;
            this.style.transform = 'translateY(0) rotateX(0)';
            
            // Remover overlay después de la animación
            setTimeout(() => {
                const overlay = this.querySelector('.card-overlay');
                if (overlay) {
                    overlay.remove();
                }
            }, 600);
        });
        
        // Efecto de click con ondas
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') { // Solo si no se clickea un enlace
                if (!reduceMotion) {
                    createRippleEffect(this, e);
                }
            }
        });
    });
}

// Crear efecto de onda (ripple) en las cards
function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 2;
    `;
    
    // Añadir keyframes para la animación si no existe
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Configurar fade-in fiable para imágenes (sin ocultarlas permanentemente)
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.style.transition = 'opacity 0.3s ease';
        // Si ya está cargada (cache o carga previa), aseguremos visibilidad
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
        } else {
            // Aplicar fade-in al cargar o si falla
            img.style.opacity = '0';
            const show = () => { img.style.opacity = '1'; };
            img.addEventListener('load', show, { once: true });
            img.addEventListener('error', show, { once: true });
        }
    });
}

// Configurar animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Efecto parallax suave para el header
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (prefersReducedMotion()) return;
    if (scrolled > 100) {
        header.style.background = 'rgba(15, 23, 42, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Añadir efecto de typing al título principal
function addTypingEffect() {
    const title = document.querySelector('header h1');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Ejecutar efecto de typing cuando la página cargue
window.addEventListener('load', function() {
    if (!prefersReducedMotion()) {
        addTypingEffect();
    }
});

// Añadir partículas de fondo (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        animation: float ${Math.random() * 20 + 10}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;
    
    container.appendChild(particle);
}

// Añadir estilos para partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-1000px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyles);

// Inicializar partículas (comentado por defecto para mejor rendimiento)
// createParticles();

// =====================
// Lightbox de imágenes
// =====================
function setupLightbox() {
    // Crear overlay si no existe
    let overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-hidden', 'true');

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const img = document.createElement('img');
        img.className = 'lightbox-img';
        img.alt = '';

        // Botones de navegación
        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-prev';
        prevBtn.type = 'button';
        prevBtn.setAttribute('aria-label', 'Imagen anterior');
        prevBtn.textContent = '‹';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-next';
        nextBtn.type = 'button';
        nextBtn.setAttribute('aria-label', 'Imagen siguiente');
        nextBtn.textContent = '›';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Cerrar');
        closeBtn.textContent = '×';

        content.appendChild(img);
        content.appendChild(prevBtn);
        content.appendChild(nextBtn);
        content.appendChild(closeBtn);
        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Cerrar en click de overlay o botón
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) {
                closeLightbox();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        });

        // Click en botones de navegación
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    }

    const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
    let currentIndex = -1;

    galleryImages.forEach((thumb, index) => {
        thumb.addEventListener('click', () => openLightbox(index));
        thumb.style.cursor = 'zoom-in';
    });

    function openLightbox(index) {
        const overlay = document.querySelector('.lightbox-overlay');
        const img = overlay.querySelector('.lightbox-img');
        currentIndex = index;
        const current = galleryImages[currentIndex];
        img.src = current.src;
        img.alt = current.alt || '';

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        // Bloquear scroll de fondo mientras está abierto
        document.body.style.overflow = 'hidden';
        // Enfocar botón de cierre para accesibilidad
        const closeBtn = overlay.querySelector('.lightbox-close');
        closeBtn.focus({ preventScroll: true });
    }

    function closeLightbox() {
        const overlay = document.querySelector('.lightbox-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function nextImage() {
        if (currentIndex < 0) return;
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateImage();
    }

    function prevImage() {
        if (currentIndex < 0) return;
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateImage();
    }

    function updateImage() {
        const overlay = document.querySelector('.lightbox-overlay');
        const img = overlay.querySelector('.lightbox-img');
        const current = galleryImages[currentIndex];
        if (current) {
            img.src = current.src;
            img.alt = current.alt || '';
        }
    }
}

// (setupLightbox ya se invoca en el DOMContentLoaded principal)