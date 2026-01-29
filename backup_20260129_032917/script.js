// ================= CONSTANTES & INITIALISATION =================
const SIDEBAR_ICONS = document.querySelectorAll('.icon');
const PAGES = document.querySelectorAll('.page');
const BUTTONS = document.querySelectorAll('button, .secondary');
const PORTFOLIO_CARDS = document.querySelectorAll('.portfolio-card');
const SKILL_BARS = document.querySelectorAll('.bar-fill');
const DOWNLOAD_CV_BTN = document.getElementById('downloadCvBtn');
const VIEW_PROJECTS_BTN = document.getElementById('viewProjectsBtn');
const CURRENT_YEAR = document.getElementById('current-year');
const CONTACT_FORM = document.getElementById('contactForm');
const FORM_STATUS = document.getElementById('formStatus');

let currentPageIndex = 0;
let isAnimating = false;
let isTouchDevice = 'ontouchstart' in window || 
                   (navigator.maxTouchPoints > 0) || 
                   (navigator.msMaxTouchPoints > 0);
let resizeTimeout;

// ================= ANIMATIONS DES BARRES DE COMPÉTENCES =================
function animateSkillBars() {
    console.log('🎯 Animation des barres de compétences...');
    
    SKILL_BARS.forEach(bar => {
        // Obtenir le pourcentage depuis aria-valuenow ou le style
        const parentBar = bar.closest('.bar');
        const percentage = parentBar ? 
            (parentBar.getAttribute('aria-valuenow') || 
             (bar.style.width ? bar.style.width.replace('%', '') : '0')) : 
            '0';
        
        // Vérifier si l'animation est déjà en cours
        if (bar.classList.contains('animating')) {
            return;
        }
        
        bar.classList.add('animating');
        
        // Réinitialiser
        bar.style.width = '0%';
        bar.style.opacity = '0.8';
        bar.style.transition = 'width 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.5s ease';
        
        // Lancer l'animation
        requestAnimationFrame(() => {
            bar.style.width = `${percentage}%`;
            bar.style.opacity = '1';
            
            // Effet de pulsation
            setTimeout(() => {
                bar.style.boxShadow = '0 0 25px rgba(0, 191, 255, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.25)';
                
                setTimeout(() => {
                    bar.style.boxShadow = '0 0 15px rgba(0, 191, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.15)';
                    bar.classList.remove('animating');
                }, 600);
            }, 1600);
        });
    });
}

// ================= GESTION DE LA NAVIGATION SPA =================
function navigateToPage(targetIndex) {
    // Vérifications de sécurité
    if (targetIndex === currentPageIndex || 
        isAnimating || 
        targetIndex < 0 || 
        targetIndex >= PAGES.length) {
        console.warn(`⚠️ Navigation impossible vers la page ${targetIndex}`);
        return;
    }

    console.log(`🔀 Navigation vers la page ${targetIndex} (${PAGES[targetIndex].id})`);
    isAnimating = true;
    
    const currentPage = PAGES[currentPageIndex];
    const targetPage = PAGES[targetIndex];
    const direction = targetIndex > currentPageIndex ? 'right' : 'left';

    // 1. Mise à jour des icônes de navigation
    SIDEBAR_ICONS.forEach(icon => {
        icon.classList.remove('active');
        icon.removeAttribute('aria-current');
        icon.setAttribute('aria-selected', 'false');
    });
    
    SIDEBAR_ICONS[targetIndex].classList.add('active');
    SIDEBAR_ICONS[targetIndex].setAttribute('aria-current', 'page');
    SIDEBAR_ICONS[targetIndex].setAttribute('aria-selected', 'true');
    
    // Animation de l'icône cliquée
    const clickedIcon = SIDEBAR_ICONS[targetIndex];
    clickedIcon.style.transform = 'scale(0.85)';
    clickedIcon.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
        clickedIcon.style.transform = 'scale(1)';
    }, 200);

    // 2. Préparation des transitions de page
    currentPage.classList.remove('active');
    currentPage.setAttribute('aria-hidden', 'true');
    
    targetPage.style.display = 'block';
    targetPage.setAttribute('aria-hidden', 'false');
    
    // Nettoyer les anciennes classes d'animation
    PAGES.forEach(page => {
        page.classList.remove('enter-left', 'enter-right', 'exit-left', 'exit-right');
    });

    // 3. Exécution des animations de transition
    currentPage.classList.add(`exit-${direction}`);
    targetPage.classList.add(`enter-${direction}`, 'active');

    // 4. Mise à jour de l'accessibilité et focus
    targetPage.setAttribute('tabindex', '-1');
    targetPage.focus();
    targetPage.removeAttribute('tabindex');

    // 5. Nettoyage après animation
    setTimeout(() => {
        currentPage.classList.remove(`exit-${direction}`);
        currentPage.style.display = 'none';
        
        targetPage.classList.remove(`enter-${direction}`);
        
        isAnimating = false;
        currentPageIndex = targetIndex;
        
        // Déclencher des animations spécifiques à la page
        onPageChange(targetIndex);
        
        // Mettre à jour l'URL (pour le partage)
        updateURLHash(targetIndex);
        
        // Mettre à jour le titre de la page
        updatePageTitle(targetIndex);
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`✅ Navigation vers ${targetPage.id} terminée`);
    }, 600);
}

// ================= ÉVÉNEMENTS SPÉCIFIQUES PAR PAGE =================
function onPageChange(pageIndex) {
    const pageId = PAGES[pageIndex].id;
    
    console.log(`📄 Changement vers la page: ${pageId}`);
    
    switch(pageId) {
        case 'skills':
            // Animer les barres de compétences
            setTimeout(() => {
                if (document.getElementById('skills').classList.contains('active')) {
                    animateSkillBars();
                }
            }, 400);
            break;
            
        case 'portfolio':
            // Animation des cartes portfolio
            setTimeout(() => {
                if (document.getElementById('portfolio').classList.contains('active')) {
                    animatePortfolioCards();
                }
            }, 400);
            break;
            
        case 'home':
            // Réinitialiser l'avatar
            const avatar = document.querySelector('.avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
            break;
            
        case 'contact':
            // Réinitialiser le formulaire
            if (CONTACT_FORM) {
                CONTACT_FORM.reset();
                clearFormErrors();
            }
            break;
    }
}

// ================= ANIMATION DES CARTES PORTFOLIO =================
function animatePortfolioCards() {
    console.log('🖼️ Animation des cartes portfolio...');
    
    PORTFOLIO_CARDS.forEach((card, index) => {
        // Réinitialiser les styles
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        card.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Animation en cascade
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            // Effet de profondeur
            setTimeout(() => {
                card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
            }, 300);
        }, index * 120 + 200);
    });
}

// ================= GESTION DES BOUTONS =================
function setupButtons() {
    console.log('🔘 Configuration des boutons...');
    
    // Bouton "Voir mes projets"
    if (VIEW_PROJECTS_BTN) {
        VIEW_PROJECTS_BTN.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('👁️ Clic sur "Voir mes projets"');
            
            // Effet de clic
            this.style.transform = 'scale(0.92)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Navigation vers portfolio
            const portfolioIndex = Array.from(PAGES).findIndex(page => page.id === 'portfolio');
            if (portfolioIndex !== -1) {
                navigateToPage(portfolioIndex);
            }
        });
    }
    
    // Bouton "Télécharger mon CV"
    if (DOWNLOAD_CV_BTN) {
        DOWNLOAD_CV_BTN.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('📥 Début du téléchargement du CV');
            
            // Sauvegarder l'état original
            const originalText = this.innerHTML;
            const originalColor = this.style.color;
            const originalBackground = this.style.background;
            
            // Animation de téléchargement
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Téléchargement...';
            this.style.pointerEvents = 'none';
            this.style.opacity = '0.8';
            this.setAttribute('aria-label', 'Téléchargement en cours...');
            
            // Simuler un délai de téléchargement
            setTimeout(() => {
                try {
                    // Créer un lien pour le téléchargement
                    const link = document.createElement('a');
                    link.href = this.href;
                    link.download = this.download || 'Aquilas_DJEDJE_CV.pdf';
                    link.style.display = 'none';
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    console.log('✅ CV téléchargé avec succès');
                    
                    // Animation de succès
                    this.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Téléchargé !';
                    this.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                    this.style.color = 'white';
                    this.setAttribute('aria-label', 'CV téléchargé avec succès');
                    
                    // Réinitialiser après 2 secondes
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = originalBackground;
                        this.style.color = originalColor;
                        this.style.pointerEvents = 'auto';
                        this.style.opacity = '1';
                        this.setAttribute('aria-label', 'Télécharger mon CV');
                    }, 2000);
                    
                } catch (error) {
                    console.error('❌ Erreur lors du téléchargement:', error);
                    
                    // Animation d'erreur
                    this.innerHTML = '<i class="fa-solid fa-exclamation-triangle" aria-hidden="true"></i> Erreur !';
                    this.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
                    this.style.color = 'white';
                    this.setAttribute('aria-label', 'Erreur lors du téléchargement');
                    
                    // Réinitialiser après 2 secondes
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = originalBackground;
                        this.style.color = originalColor;
                        this.style.pointerEvents = 'auto';
                        this.style.opacity = '1';
                        this.setAttribute('aria-label', 'Télécharger mon CV');
                    }, 2000);
                }
            }, 800);
        });
    }
    
    // Effets de survol pour tous les boutons
    BUTTONS.forEach(btn => {
        if (btn.classList.contains('disabled')) return;
        
        // Desktop hover effects
        btn.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 191, 255, 0.25)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
        
        // Touch/mobile effects
        btn.addEventListener('touchstart', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(0.96)';
                this.style.transition = 'transform 0.1s ease';
            }
        });
        
        btn.addEventListener('touchend', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(1)';
            }
        });
        
        btn.addEventListener('mousedown', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(0.96)';
                this.style.transition = 'transform 0.1s ease';
            }
        });
        
        btn.addEventListener('mouseup', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
}

// ================= GESTION DU FORMULAIRE DE CONTACT =================
function setupContactForm() {
    if (!CONTACT_FORM) {
        console.log('📝 Formulaire de contact non trouvé');
        return;
    }
    
    console.log('📝 Configuration du formulaire de contact...');
    
    // Validation en temps réel
    const inputs = CONTACT_FORM.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Soumission du formulaire
    CONTACT_FORM.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📨 Tentative d\'envoi du formulaire');
        
        // Valider tous les champs
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
            return;
        }
        
        // Désactiver le formulaire pendant l'envoi
        const submitBtn = CONTACT_FORM.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        CONTACT_FORM.style.opacity = '0.7';
        CONTACT_FORM.style.pointerEvents = 'none';
        
        try {
            // Récupérer les données du formulaire
            const formData = new FormData(CONTACT_FORM);
            const data = Object.fromEntries(formData);
            
            console.log('📤 Données du formulaire:', data);
            
            // Ici, normalement, vous enverriez les données à un serveur
            // Pour l'exemple, on simule un délai d'envoi
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simuler une réponse réussie
            const response = {
                success: true,
                message: 'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
            };
            
            if (response.success) {
                showFormMessage(response.message, 'success');
                CONTACT_FORM.reset();
                clearFormErrors();
                
                // Animation de succès
                CONTACT_FORM.style.animation = 'successPulse 2s ease';
                setTimeout(() => {
                    CONTACT_FORM.style.animation = '';
                }, 2000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            showFormMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
        } finally {
            // Réactiver le formulaire
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            CONTACT_FORM.style.opacity = '1';
            CONTACT_FORM.style.pointerEvents = 'auto';
        }
    });
    
    // Bouton de réinitialisation
    const resetBtn = CONTACT_FORM.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            console.log('🔄 Réinitialisation du formulaire');
            clearFormErrors();
            showFormMessage('Formulaire réinitialisé.', 'warning');
            
            // Animation de réinitialisation
            CONTACT_FORM.style.animation = 'resetPulse 1s ease';
            setTimeout(() => {
                CONTACT_FORM.style.animation = '';
            }, 1000);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Vérifier si le champ est requis
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'Ce champ est requis.';
    }
    
    // Validation spécifique par type de champ
    if (isValid && value) {
        switch(field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer une adresse email valide.';
                }
                break;
                
            case 'tel':
                const phoneRegex = /^[\d\s\-\+\(\)]{8,20}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer un numéro de téléphone valide.';
                }
                break;
        }
    }
    
    // Mise à jour de l'état du champ
    if (errorElement) {
        errorElement.textContent = errorMessage;
        if (errorMessage) {
            field.classList.add('error');
            field.classList.remove('success');
        } else {
            field.classList.remove('error');
            field.classList.add('success');
        }
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.classList.remove('error', 'success');
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const fields = CONTACT_FORM.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.classList.remove('error', 'success');
    });
}

function showFormMessage(message, type = 'info') {
    if (!FORM_STATUS) return;
    
    FORM_STATUS.textContent = message;
    FORM_STATUS.className = 'form-status';
    FORM_STATUS.classList.add(type);
    FORM_STATUS.style.display = 'block';
    FORM_STATUS.setAttribute('role', 'alert');
    
    // Masquer automatiquement après 5 secondes
    setTimeout(() => {
        FORM_STATUS.style.display = 'none';
        FORM_STATUS.classList.remove(type);
    }, 5000);
}

// ================= GESTION DU HASH URL =================
function updateURLHash(pageIndex) {
    const pageId = PAGES[pageIndex].id;
    const newURL = `${window.location.pathname}#${pageId}`;
    
    if (window.history && window.history.pushState) {
        window.history.pushState({ page: pageId }, '', newURL);
    }
    
    console.log(`🔗 URL mise à jour: ${newURL}`);
}

function parseURLHash() {
    const hash = window.location.hash.substring(1);
    
    if (hash) {
        const targetIndex = Array.from(PAGES).findIndex(page => page.id === hash);
        if (targetIndex !== -1 && targetIndex !== currentPageIndex) {
            setTimeout(() => navigateToPage(targetIndex), 100);
        }
    } else {
        // Par défaut, aller à la page d'accueil
        if (currentPageIndex !== 0) {
            setTimeout(() => navigateToPage(0), 100);
        }
    }
}

// ================= MISE À JOUR DU TITRE DE LA PAGE =================
function updatePageTitle(pageIndex) {
    const page = PAGES[pageIndex];
    const pageTitle = page.querySelector('h1, h2, h3')?.textContent || '';
    const siteTitle = 'Aquilas DJEDJE | Développeur FullStack & UI/UX Designer';
    
    if (pageTitle) {
        document.title = `${pageTitle} | ${siteTitle}`;
    } else {
        document.title = siteTitle;
    }
}

// ================= NAVIGATION CLAVIER =================
function setupKeyboardNavigation() {
    console.log('⌨️ Configuration de la navigation clavier...');
    
    document.addEventListener('keydown', (e) => {
        if (isAnimating || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        let targetIndex = currentPageIndex;
        let handled = false;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                targetIndex = (currentPageIndex + 1) % PAGES.length;
                handled = true;
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                targetIndex = (currentPageIndex - 1 + PAGES.length) % PAGES.length;
                handled = true;
                break;
                
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                handled = true;
                break;
                
            case 'End':
                e.preventDefault();
                targetIndex = PAGES.length - 1;
                handled = true;
                break;
                
            case '1': case '2': case '3': case '4': case '5': case '6':
                const num = parseInt(e.key) - 1;
                if (num < PAGES.length) {
                    e.preventDefault();
                    targetIndex = num;
                    handled = true;
                }
                break;
        }
        
        if (handled && targetIndex !== currentPageIndex) {
            console.log(`⌨️ Navigation clavier vers la page ${targetIndex}`);
            navigateToPage(targetIndex);
        }
    });
}

// ================= TOUCH & SWIPE SUPPORT =================
function setupTouchNavigation() {
    if (!isTouchDevice) {
        console.log('👆 Appareil non tactile détecté - Swipe désactivé');
        return;
    }
    
    console.log('👆 Configuration de la navigation tactile...');
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    const SWIPE_THRESHOLD = 50;
    const SWIPE_TIME_THRESHOLD = 500;
    
    document.addEventListener('touchstart', (e) => {
        if (isAnimating) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Vérifier si c'est un swipe horizontal rapide
        if (touchDuration < SWIPE_TIME_THRESHOLD && 
            Math.abs(diffX) > SWIPE_THRESHOLD && 
            Math.abs(diffX) > Math.abs(diffY)) {
            
            let targetIndex = currentPageIndex;
            
            if (diffX > 0) {
                // Swipe gauche → droite = page suivante
                targetIndex = (currentPageIndex + 1) % PAGES.length;
                console.log('👆 Swipe gauche -> droite: page suivante');
            } else {
                // Swipe droite → gauche = page précédente
                targetIndex = (currentPageIndex - 1 + PAGES.length) % PAGES.length;
                console.log('👆 Swipe droite -> gauche: page précédente');
            }
            
            navigateToPage(targetIndex);
        }
    }, { passive: true });
}

// ================= EFFETS VISUELS & INTERACTIONS =================
function setupVisualEffects() {
    console.log('✨ Configuration des effets visuels...');
    
    // Effets de survol sur les cartes portfolio (desktop seulement)
    PORTFOLIO_CARDS.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768 && !isTouchDevice) {
                card.style.zIndex = '100';
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 40px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(0, 191, 255, 0.3)';
                
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.08)';
                }
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768 && !isTouchDevice) {
                card.style.zIndex = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
                
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            }
        });
        
        // Touch feedback pour mobile
        card.addEventListener('touchstart', () => {
            if (window.innerWidth <= 768 || isTouchDevice) {
                card.style.transform = 'scale(0.97)';
                card.style.transition = 'transform 0.1s ease';
            }
        });
        
        card.addEventListener('touchend', () => {
            if (window.innerWidth <= 768 || isTouchDevice) {
                card.style.transform = 'scale(1)';
            }
        });
    });
    
    // Effet sur l'avatar (desktop seulement)
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768 && !isTouchDevice) {
                avatar.style.transform = 'scale(1.08) rotate(5deg)';
                avatar.style.boxShadow = 
                    '0 35px 70px rgba(0, 191, 255, 0.4), 0 0 100px rgba(0, 191, 255, 0.3)';
            }
        });
        
        avatar.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768 && !isTouchDevice) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
                avatar.style.boxShadow = 
                    '0 20px 40px rgba(0, 191, 255, 0.3), 0 0 60px rgba(0, 191, 255, 0.2)';
            }
        });
        
        // Effet de clic/touch
        avatar.addEventListener('click', () => {
            avatar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Effet de focus pour l'accessibilité
    document.addEventListener('focusin', (e) => {
        const target = e.target;
        
        if (target.classList.contains('icon')) {
            target.style.outline = '3px solid var(--primary)';
            target.style.outlineOffset = '4px';
            target.style.borderRadius = '12px';
        }
        
        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
            target.style.outline = '2px solid var(--primary)';
            target.style.outlineOffset = '2px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        const target = e.target;
        
        if (target.classList.contains('icon')) {
            target.style.outline = 'none';
        }
        
        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
            target.style.outline = 'none';
        }
    });
    
    // Effet de pulse sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('.icon, .portfolio-card, button, .social-link');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.animation = 'pulse 2s infinite';
        });
        
        element.addEventListener('blur', () => {
            element.style.animation = 'none';
        });
    });
}

// ================= OBSERVER POUR ANIMATIONS AU SCROLL =================
function setupIntersectionObserver() {
    console.log('👀 Configuration de l\'Intersection Observer...');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (!element.classList.contains('animated')) {
                    element.classList.add('animated');
                    
                    // Animation spécifique pour les compétences
                    if (element.id === 'skills') {
                        console.log('🎯 Section compétences visible - animation déclenchée');
                        setTimeout(animateSkillBars, 300);
                    }
                    
                    // Animation spécifique pour le portfolio
                    if (element.id === 'portfolio') {
                        console.log('🖼️ Section portfolio visible - animation déclenchée');
                        setTimeout(animatePortfolioCards, 300);
                    }
                    
                    // Animation générale pour les cartes
                    if (element.classList.contains('card')) {
                        element.style.animation = 'fadeInUp 0.8s ease forwards';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observer toutes les pages
    PAGES.forEach(page => {
        observer.observe(page);
    });
    
    // Observer les cartes individuellement
    PORTFOLIO_CARDS.forEach(card => {
        observer.observe(card);
    });
    
    // Observer les éléments de compétences
    document.querySelectorAll('.skill').forEach(skill => {
        observer.observe(skill);
    });
}

// ================= GESTION DU REDIMENSIONNEMENT =================
function setupResizeHandler() {
    console.log('📏 Configuration du gestionnaire de redimensionnement...');
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            console.log('🔄 Redimensionnement détecté');
            
            // Mettre à jour la détection d'appareil tactile
            isTouchDevice = 'ontouchstart' in window || 
                          (navigator.maxTouchPoints > 0) || 
                          (navigator.msMaxTouchPoints > 0);
            
            // Réinitialiser les transformations sur mobile
            if (window.innerWidth <= 768) {
                BUTTONS.forEach(btn => {
                    btn.style.transform = '';
                    btn.style.boxShadow = '';
                });
                
                PORTFOLIO_CARDS.forEach(card => {
                    card.style.transform = '';
                    card.style.zIndex = '';
                    card.style.boxShadow = '';
                    
                    const img = card.querySelector('img');
                    if (img) img.style.transform = '';
                });
                
                const avatar = document.querySelector('.avatar');
                if (avatar) {
                    avatar.style.transform = '';
                    avatar.style.boxShadow = '';
                }
            }
            
            // Forcer le recalcul des animations si nécessaire
            if (document.getElementById('skills').classList.contains('active')) {
                animateSkillBars();
            }
            
        }, 250);
    });
}

// ================= MISE À JOUR DE L'ANNÉE DU FOOTER =================
function updateCurrentYear() {
    if (CURRENT_YEAR) {
        CURRENT_YEAR.textContent = new Date().getFullYear();
        console.log(`📅 Année mise à jour: ${CURRENT_YEAR.textContent}`);
    }
}

// ================= GESTION DES PAGES EN OFFLINE =================
function setupOfflineSupport() {
    console.log('📡 Configuration du support hors ligne...');
    
    window.addEventListener('online', () => {
        console.log('✅ Connexion Internet rétablie');
        document.body.classList.remove('offline');
        
        // Afficher une notification
        showFormMessage('Connexion Internet rétablie.', 'success');
    });
    
    window.addEventListener('offline', () => {
        console.log('⚠️ Mode hors ligne activé');
        document.body.classList.add('offline');
        
        // Afficher une notification
        showFormMessage('Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.', 'warning');
    });
}

// ================= ANIMATIONS CSS DYNAMIQUES =================
function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pageEnter {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(0, 191, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(0, 191, 255, 0);
            }
        }
        
        @keyframes successPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
            }
            50% {
                box-shadow: 0 0 0 20px rgba(16, 185, 129, 0);
            }
        }
        
        @keyframes resetPulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
            }
            50% {
                box-shadow: 0 0 0 20px rgba(245, 158, 11, 0);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(1deg);
            }
        }
        
        @keyframes shimmer {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(100%);
            }
        }
        
        /* Transition entre les pages */
        .page.enter-right {
            animation: slideInRight 0.6s ease forwards;
        }
        
        .page.exit-right {
            animation: slideOutLeft 0.6s ease forwards;
        }
        
        .page.enter-left {
            animation: slideInLeft 0.6s ease forwards;
        }
        
        .page.exit-left {
            animation: slideOutRight 0.6s ease forwards;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutLeft {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100px);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        /* Classes pour les champs de formulaire */
        input.error,
        textarea.error,
        select.error {
            border-color: var(--error) !important;
            background: rgba(239, 68, 68, 0.05) !important;
        }
        
        input.success,
        textarea.success,
        select.success {
            border-color: var(--success) !important;
            background: rgba(16, 185, 129, 0.05) !important;
        }
        
        /* Mode hors ligne */
        body.offline::before {
            content: '⚠️ Hors ligne';
            position: fixed;
            top: 10px;
            right: 10px;
            background: var(--warning);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
        }
    `;
    
    document.head.appendChild(style);
    console.log('🎨 Styles dynamiques injectés');
}

// ================= INITIALISATION =================
function init() {
    console.log('🚀 Initialisation du portfolio de Aquilas DJEDJE');
    
    // Injecter les styles dynamiques
    injectDynamicStyles();
    
    // Mettre à jour l'année
    updateCurrentYear();
    
    // Initialiser la navigation depuis l'URL
    parseURLHash();
    
    // Configurer les écouteurs d'événements pour les icônes
    SIDEBAR_ICONS.forEach((icon, index) => {
        // Récupérer le texte de l'icône pour l'accessibilité
        const iconText = icon.querySelector('.icon-text')?.textContent || 
                        icon.getAttribute('aria-label') || 
                        `Section ${index + 1}`;
        
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`🖱️ Clic sur l'icône: ${iconText}`);
            navigateToPage(index);
        });
        
        // Accessibilité
        icon.setAttribute('role', 'button');
        icon.setAttribute('tabindex', '0');
        icon.setAttribute('aria-label', `Aller à ${iconText}`);
        
        // Support clavier
        icon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log(`⌨️ Touche ${e.key} sur l'icône: ${iconText}`);
                navigateToPage(index);
            }
        });
    });
    
    // Configurer les autres fonctionnalités
    setupButtons();
    setupContactForm();
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupVisualEffects();
    setupIntersectionObserver();
    setupResizeHandler();
    setupOfflineSupport();
    
    // Animer les éléments initiaux
    setTimeout(() => {
        console.log('🎬 Démarrage des animations initiales');
        if (document.getElementById('skills').classList.contains('active')) {
            animateSkillBars();
        }
        if (document.getElementById('portfolio').classList.contains('active')) {
            animatePortfolioCards();
        }
    }, 800);
    
    // Gérer le changement de hash
    window.addEventListener('hashchange', parseURLHash);
    
    // Gérer le bouton retour/avant
    window.addEventListener('popstate', (e) => {
        console.log('↩️ Navigation historique détectée');
        if (e.state && e.state.page) {
            const targetIndex = Array.from(PAGES).findIndex(page => page.id === e.state.page);
            if (targetIndex !== -1) {
                navigateToPage(targetIndex);
            }
        } else {
            parseURLHash();
        }
    });
    
    // Précharger les images importantes
    preloadImages();
    
    console.log('✅ Portfolio initialisé avec succès !');
}

// ================= PRÉCHARGEMENT DES IMAGES =================
function preloadImages() {
    console.log('🖼️ Préchargement des images...');
    
    const images = [
        './IMAGES/IMG0.png',
        './IMAGES/ai-min.png',
        './IMAGES/ec.jpg',
        './IMAGES/ap g.jpg',
        './IMAGES/aap.jpg',
        './IMAGES/app3.jpg',
        './IMAGES/3D.jpg',
        './IMAGES/api.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`✅ Image préchargée: ${src}`);
        img.onerror = () => console.warn(`⚠️ Impossible de précharger: ${src}`);
    });
}

// ================= DÉMARRAGE =================
// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM déjà chargé
    setTimeout(init, 100);
}

// ================= GESTION DES ERREURS =================
window.addEventListener('error', (e) => {
    console.error('❌ Erreur JavaScript:', e.error);
    
    // Afficher un message d'erreur convivial
    if (FORM_STATUS) {
        showFormMessage('Une erreur est survenue. Veuillez recharger la page.', 'error');
    }
});

// Gestion des promesses non capturées
window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ Promesse rejetée non capturée:', e.reason);
});

// ================= EXPORT POUR LE DÉVELOPPEMENT =================
// Exposer certaines fonctions pour la console de développement
if (process.env.NODE_ENV === 'development') {
    window.portfolioApp = {
        navigateToPage,
        animateSkillBars,
        animatePortfolioCards,
        showFormMessage,
        currentPage: () => PAGES[currentPageIndex].id,
        version: '1.0.0'
    };
    
    console.log('🔧 Mode développement activé - API disponible sur window.portfolioApp');
}

// Note pour portfolio.html
// Le code pour portfolio.html devrait être dans un fichier séparé script-portfolio.js
// Nous allons le traiter dans le prochain fichier