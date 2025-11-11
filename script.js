/**
 * PEACECONNECT - FRONT OFFICE SCRIPT
 * Gestion des interactions et animations
 */

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCarousel();
    initODD();
    initNewsletter();
    initScrollEffects();
});

// ============================================
// NAVIGATION
// ============================================

/**
 * Initialise la navigation sticky et le menu mobile
 */
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header sticky avec effet au scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Toggle menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Active le lien de navigation correspondant à la section visible
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
}

// ============================================
// CARROUSEL TÉMOIGNAGES
// ============================================

/**
 * Initialise le carrousel de témoignages
 */
function initCarousel() {
    const carouselContainer = document.getElementById('carouselContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!carouselContainer || testimonialCards.length === 0) return;

    let currentIndex = 0;
    const totalCards = testimonialCards.length;

    // Créer les dots de navigation
    function createDots() {
        carouselDots.innerHTML = '';
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Aller au témoignage ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }
    }

    // Afficher un slide spécifique
    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        // Mettre à jour les dots
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Aller à un slide spécifique
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalCards - 1;
        if (currentIndex >= totalCards) currentIndex = 0;
        showSlide(currentIndex);
    }

    // Slide suivant
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        showSlide(currentIndex);
    }

    // Slide précédent
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        showSlide(currentIndex);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Navigation au clavier
    carouselContainer.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Auto-play (optionnel - désactivé par défaut pour l'accessibilité)
    // let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause au survol
    // carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    // carouselContainer.addEventListener('mouseleave', () => {
    //     autoPlayInterval = setInterval(nextSlide, 5000);
    // });

    // Initialisation
    createDots();
    showSlide(0);
}

// ============================================
// ODD (Objectifs de Développement Durable)
// ============================================

/**
 * Initialise la section ODD avec les 17 objectifs
 */
function initODD() {
    const oddGrid = document.getElementById('oddGrid');
    if (!oddGrid) return;

    // Les 17 ODD des Nations Unies
    const oddList = [
        { number: 1, title: 'Pas de pauvreté' },
        { number: 2, title: 'Faim zéro' },
        { number: 3, title: 'Bonne santé et bien-être' },
        { number: 4, title: 'Éducation de qualité' },
        { number: 5, title: 'Égalité entre les sexes' },
        { number: 6, title: 'Eau propre et assainissement' },
        { number: 7, title: 'Énergie propre et d\'un coût abordable' },
        { number: 8, title: 'Travail décent et croissance économique' },
        { number: 9, title: 'Industrie, innovation et infrastructure' },
        { number: 10, title: 'Inégalités réduites' },
        { number: 11, title: 'Villes et communautés durables' },
        { number: 12, title: 'Consommation et production responsables' },
        { number: 13, title: 'Mesures relatives à la lutte contre les changements climatiques' },
        { number: 14, title: 'Vie aquatique' },
        { number: 15, title: 'Vie terrestre' },
        { number: 16, title: 'Paix, justice et institutions efficaces' },
        { number: 17, title: 'Partenariats pour la réalisation des objectifs' }
    ];

    // Générer les cartes ODD
    oddList.forEach(odd => {
        const card = document.createElement('div');
        card.className = 'odd-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `ODD ${odd.number}: ${odd.title}`);
        
        card.innerHTML = `
            <div class="odd-number">${odd.number}</div>
            <div class="odd-title">${odd.title}</div>
        `;

        // Effet hover et clic
        card.addEventListener('click', function() {
            showODDDetails(odd);
        });

        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showODDDetails(odd);
            }
        });

        oddGrid.appendChild(card);
    });
}

/**
 * Affiche les détails d'un ODD (peut être étendu avec une modale)
 */
function showODDDetails(odd) {
    // Pour l'instant, on affiche juste une alerte
    // Dans une version complète, on pourrait ouvrir une modale
    console.log(`ODD ${odd.number}: ${odd.title}`);
    // alert(`ODD ${odd.number}: ${odd.title}\n\nDétails à venir...`);
}

// ============================================
// NEWSLETTER
// ============================================

/**
 * Initialise le formulaire de newsletter
 */
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            // Ici, on pourrait envoyer les données à un script PHP
            // Pour l'instant, on simule juste une soumission réussie
            showNotification('Merci pour votre inscription à la newsletter !', 'success');
            emailInput.value = '';
            
            // Exemple d'appel PHP (à implémenter)
            // submitNewsletter(email);
        } else {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
        }
    });
}

/**
 * Valide une adresse email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Affiche une notification
 */
function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#16a34a' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Retirer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ============================================
// EFFETS DE SCROLL
// ============================================

/**
 * Initialise les effets d'animation au scroll
 */
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.action-card, .testimonial-card, .odd-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Soumet le formulaire de newsletter via PHP (à implémenter)
 */
function submitNewsletter(email) {
    // Exemple d'appel AJAX vers un script PHP
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../api/newsletter.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    showNotification('Merci pour votre inscription !', 'success');
                } else {
                    showNotification(response.message || 'Une erreur est survenue.', 'error');
                }
            } else {
                showNotification('Une erreur est survenue.', 'error');
            }
        }
    };
    xhr.send('email=' + encodeURIComponent(email));
    */
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

