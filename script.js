(function () {
    'use strict';

    const WHATSAPP_PHONE = '50499999999';
    const FORM_MIN_MS = 2500;
    const FORM_COOLDOWN_MS = 45000;
    let lastSubmitAt = 0;

    const messages = {
        'web-informativa': 'Hola! Me interesa una Web Informativa para mi negocio. ¿Me pueden cotizar?',
        'web-catalogo': 'Hola! Me interesa una Web + Catálogo conectada a WhatsApp. ¿Me pueden dar información?',
        'web-reservaciones': 'Hola! Me interesa Web + Reservaciones para citas/reservas. ¿Me pueden cotizar?',
        'web-eventos': 'Hola! Me interesa Web + Eventos. ¿Me pueden dar más información?',
        'web-pedidos': 'Hola! Me interesa Web + Pedidos (menú digital / QR / delivery). ¿Me pueden cotizar?',
        'tienda-online': 'Hola! Me interesa una Tienda Online. ¿Me pueden dar precios y proceso?',
        'plataforma-web': 'Hola! Necesito una Plataforma Web a medida. ¿Podemos conversar?',
        cotizacion: 'Hola! Me gustaría solicitar una cotización para un sitio web.',
        general: 'Hola! Tengo una consulta sobre sus soluciones web para empresas.'
    };

    function sanitizeText(value, max) {
        return String(value || '')
            .replace(/[<>]/g, '')
            .replace(/[\u0000-\u001F\u007F]/g, '')
            .trim()
            .slice(0, max);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function openWhatsApp(type, customMessage) {
        const allowed = Object.prototype.hasOwnProperty.call(messages, type) || Boolean(customMessage);
        if (!allowed) return;

        const message = customMessage || messages[type] || messages.general;
        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function showNotification(message, type) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type || 'info'}`;
        notification.setAttribute('role', 'status');

        const content = document.createElement('div');
        content.className = 'notification-content';

        const text = document.createElement('span');
        text.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'notification-close';
        closeBtn.setAttribute('aria-label', 'Cerrar');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', () => notification.remove());

        content.appendChild(text);
        content.appendChild(closeBtn);
        notification.appendChild(content);

        const bg = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
        notification.style.cssText = `position:fixed;top:100px;right:20px;background:${bg};color:#fff;padding:1rem 1.5rem;border-radius:12px;box-shadow:0 8px 24px rgba(25,40,76,.2);z-index:10000;max-width:400px;`;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    // Mobile nav
    const hamburger = document.querySelector('.hamburger');
    const navMenuContainer = document.querySelector('.nav-menu-container');

    function closeMobileMenu() {
        if (!hamburger || !navMenuContainer) return;
        hamburger.classList.remove('active');
        navMenuContainer.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar) => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }

    if (hamburger && navMenuContainer) {
        hamburger.addEventListener('click', () => {
            const open = hamburger.classList.toggle('active');
            navMenuContainer.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
            const bars = hamburger.querySelectorAll('.bar');
            if (open) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars.forEach((bar) => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }

    document.querySelectorAll('.nav-link, .dropdown-menu a').forEach((el) => {
        el.addEventListener('click', closeMobileMenu);
    });

    // Smooth scroll same-page
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        navbar.style.boxShadow = window.scrollY > 100
            ? '0 4px 20px rgba(25, 40, 76, 0.25)'
            : '0 2px 4px rgba(25, 40, 76, 0.1)';
    }, { passive: true });

    // Product showcase tabs
    const showcase = document.getElementById('productShowcase');
    if (showcase) {
        const tabs = Array.from(showcase.querySelectorAll('.product-tab'));
        const cards = Array.from(showcase.querySelectorAll('.product-stage-card'));

        function selectProduct(productId) {
            tabs.forEach((tab) => {
                const active = tab.getAttribute('data-product') === productId;
                tab.classList.toggle('is-active', active);
                tab.setAttribute('aria-selected', active ? 'true' : 'false');
                if (active) {
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            });

            cards.forEach((card) => {
                const active = card.getAttribute('data-product') === productId;
                card.classList.toggle('is-active', active);
                if (active) card.removeAttribute('hidden');
                else card.setAttribute('hidden', '');
            });
        }

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                selectProduct(tab.getAttribute('data-product'));
            });

            tab.addEventListener('keydown', (e) => {
                const index = tabs.indexOf(tab);
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    const next = tabs[(index + 1) % tabs.length];
                    next.focus();
                    selectProduct(next.getAttribute('data-product'));
                }
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prev = tabs[(index - 1 + tabs.length) % tabs.length];
                    prev.focus();
                    selectProduct(prev.getAttribute('data-product'));
                }
            });
        });
    }

    // WhatsApp UI
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappPanel = document.getElementById('whatsappPanel');
    const whatsappToggle = document.getElementById('whatsappToggle');
    const whatsappClose = document.getElementById('whatsappClose');

    function setWhatsAppOpen(open) {
        if (!whatsappPanel || !whatsappToggle) return;
        whatsappPanel.classList.toggle('active', open);
        if (open) whatsappPanel.removeAttribute('hidden');
        else whatsappPanel.setAttribute('hidden', '');
        whatsappToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    if (whatsappToggle) {
        whatsappToggle.addEventListener('click', () => {
            const open = !whatsappPanel.classList.contains('active');
            setWhatsAppOpen(open);
        });
    }
    if (whatsappClose) whatsappClose.addEventListener('click', () => setWhatsAppOpen(false));

    document.addEventListener('click', (e) => {
        if (!whatsappFloat || !whatsappPanel) return;
        if (!whatsappFloat.contains(e.target) && whatsappPanel.classList.contains('active')) {
            setWhatsAppOpen(false);
        }
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-whatsapp]');
        if (!btn) return;
        e.preventDefault();
        const type = btn.getAttribute('data-whatsapp');
        openWhatsApp(type);
        setWhatsAppOpen(false);
    });

    // Contact form hardening
    const contactForm = document.getElementById('contactForm');
    const formTs = document.getElementById('form_ts');
    if (formTs) formTs.value = String(Date.now());

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const honeypot = sanitizeText(this.company_website && this.company_website.value, 100);
            if (honeypot) {
                showNotification('No se pudo enviar el formulario.', 'error');
                return;
            }

            const startedAt = Number(formTs && formTs.value) || 0;
            if (!startedAt || Date.now() - startedAt < FORM_MIN_MS) {
                showNotification('Espera un momento e inténtalo de nuevo.', 'error');
                return;
            }

            if (Date.now() - lastSubmitAt < FORM_COOLDOWN_MS) {
                showNotification('Ya enviaste una consulta hace poco. Espera un minuto.', 'error');
                return;
            }

            const name = sanitizeText(this.name.value, 80);
            const email = sanitizeText(this.email.value, 120).toLowerCase();
            const phone = sanitizeText(this.phone.value, 20);
            const service = sanitizeText(this.service.value, 40);
            const message = sanitizeText(this.message.value, 1000);

            const allowedServices = [
                'web-informativa', 'web-catalogo', 'web-reservaciones', 'web-eventos',
                'web-pedidos', 'tienda-online', 'plataforma-web', 'otro'
            ];

            if (!name || !email || !service || !message) {
                showNotification('Completa todos los campos requeridos.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showNotification('Ingresa un email válido.', 'error');
                return;
            }
            if (!allowedServices.includes(service)) {
                showNotification('Selecciona una solución válida.', 'error');
                return;
            }

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Enviando...</span>';

            const waMessage = `Hola! Soy ${name}.\nEmail: ${email}${phone ? `\nTel: ${phone}` : ''}\nProducto: ${service}\nMensaje: ${message}`;
            lastSubmitAt = Date.now();

            setTimeout(() => {
                showNotification('Gracias. Te abrimos WhatsApp para confirmar tu consulta.', 'success');
                openWhatsApp('cotizacion', waMessage);
                this.reset();
                if (formTs) formTs.value = String(Date.now());
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 600);
        });
    }

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.product-showcase, .industry-card, .product-detail, .why-feature').forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        observer.observe(el);
    });

    // Active nav
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 120) current = section.id;
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });
})();
