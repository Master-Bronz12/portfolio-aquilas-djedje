// ================= CONSTANTES & INITIALISATION =================
const SIDEBAR_ICONS = document.querySelectorAll('.icon');
const PAGES = document.querySelectorAll('.page');
const BUTTONS = document.querySelectorAll('button, .secondary');
const PORTFOLIO_CARDS = document.querySelectorAll('.portfolio-card');
const SKILL_BARS = document.querySelectorAll('.bar div');
const DOWNLOAD_CV_BTN = document.querySelector('.secondary[download]');
const VIEW_PROJECTS_BTN = document.querySelector('.primary[data-go]');

let currentPageIndex = 0;
let isAnimating = false;
let isTouchDevice = 'ontouchstart' in window;

// ================= ANIMATIONS DES BARRES DE COMPÉTENCES =================
function animateSkillBars() {
    SKILL_BARS.forEach(bar => {
        // Sauvegarder la largeur originale
        const originalWidth = bar.style.width;
        
        // Réinitialiser à 0
        bar.style.width = '0';
        bar.style.transition = 'width 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Animer vers la largeur originale
        setTimeout(() => {
            bar.style.width = originalWidth;
            
            // Ajouter une animation de pulsation légère
            bar.style.boxShadow = `
                0 0 20px rgba(0, 191, 255, 0.5),
                inset 0 0 15px rgba(255, 255, 255, 0.2)
            `;
            
            setTimeout(() => {
                bar.style.boxShadow = `
                    0 0 15px rgba(0, 191, 255, 0.4),
                    inset 0 0 10px rgba(255, 255, 255, 0.15)
                `;
            }, 1500);
        }, 300);
    });
}

// ================= GESTION DE LA NAVIGATION SPA =================
function navigateToPage(targetIndex) {
    // Vérifications de sécurité
    if (targetIndex === currentPageIndex || 
        isAnimating || 
        targetIndex < 0 || 
        targetIndex >= PAGES.length) {
        return;
    }

    isAnimating = true;
    
    const currentPage = PAGES[currentPageIndex];
    const targetPage = PAGES[targetIndex];
    const direction = targetIndex > currentPageIndex ? 'right' : 'left';

    // 1. Mise à jour des icônes
    SIDEBAR_ICONS.forEach(icon => icon.classList.remove('active'));
    SIDEBAR_ICONS[targetIndex].classList.add('active');
    
    // Animation de l'icône cliquée
    const clickedIcon = SIDEBAR_ICONS[targetIndex];
    clickedIcon.style.transform = 'scale(0.9)';
    setTimeout(() => {
        clickedIcon.style.transform = 'scale(1)';
    }, 200);

    // 2. Préparation des animations
    currentPage.classList.remove('active');
    targetPage.style.display = 'block';
    
    // Nettoyer les anciennes classes d'animation
    PAGES.forEach(page => {
        page.classList.remove('enter-left', 'enter-right', 'exit-left', 'exit-right');
    });

    // 3. Exécution des animations
    currentPage.classList.add(`exit-${direction}`);
    targetPage.classList.add(`enter-${direction}`, 'active');

    // 4. Nettoyage après animation
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
    }, 550);
}

// ================= ÉVÉNEMENTS SPÉCIFIQUES PAR PAGE =================
function onPageChange(pageIndex) {
    const pageId = PAGES[pageIndex].id;
    
    switch(pageId) {
        case 'skills':
            // Animer les barres de compétences
            setTimeout(animateSkillBars, 300);
            break;
            
        case 'portfolio':
            // Animation des cartes portfolio
            animatePortfolioCards();
            break;
            
        case 'home':
            // Réinitialiser l'avatar
            const avatar = document.querySelector('.avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1)';
            }
            break;
    }
}

// ================= ANIMATION DES CARTES PORTFOLIO =================
function animatePortfolioCards() {
    PORTFOLIO_CARDS.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150 + 300);
    });
}

// ================= GESTION DES BOUTONS =================
function setupButtons() {
    // Bouton "Voir mes projets"
    if (VIEW_PROJECTS_BTN) {
        VIEW_PROJECTS_BTN.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Effet de clic
            this.style.transform = 'scale(0.95)';
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
            // Effet de téléchargement
            e.preventDefault();
            
            const originalHTML = this.innerHTML;
            const originalBg = this.style.background;
            const originalBorder = this.style.borderColor;
            
            // Animation de téléchargement
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Téléchargement...';
            this.style.pointerEvents = 'none';
            this.style.background = 'linear-gradient(135deg, #00bfff, #007bff)';
            this.style.borderColor = '#00bfff';
            
            setTimeout(() => {
                // Simuler le téléchargement
                const link = document.createElement('a');
                link.href = this.href;
                link.download = 'Aquilas_DJEDJE_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Confirmation
                this.innerHTML = '<i class="fa-solid fa-check"></i> Téléchargé !';
                this.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
                this.style.borderColor = '#10b981';
                
                // Réinitialiser après 2 secondes
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = originalBg;
                    this.style.borderColor = originalBorder;
                    this.style.pointerEvents = 'auto';
                }, 2000);
                
            }, 1500);
        });
    }
    
    // Effets de survol pour tous les boutons
    BUTTONS.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        btn.addEventListener('mousedown', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(0.98)';
            }
        });
        
        btn.addEventListener('mouseup', function() {
            if (!this.classList.contains('disabled')) {
                this.style.transform = 'scale(1) translateY(-3px)';
            }
        });
    });
}

// ================= GESTION DU HASH URL =================
function updateURLHash(pageIndex) {
    const pageId = PAGES[pageIndex].id;
    window.history.pushState({}, '', `#${pageId}`);
}

function parseURLHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetIndex = Array.from(PAGES).findIndex(page => page.id === hash);
        if (targetIndex !== -1 && targetIndex !== currentPageIndex) {
            navigateToPage(targetIndex);
        }
    }
}

// ================= NAVIGATION CLAVIER =================
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (isAnimating) return;
        
        let targetIndex = currentPageIndex;
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                targetIndex = (currentPageIndex + 1) % PAGES.length;
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                targetIndex = (currentPageIndex - 1 + PAGES.length) % PAGES.length;
                break;
                
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
                
            case 'End':
                e.preventDefault();
                targetIndex = PAGES.length - 1;
                break;
                
            case '1': case '2': case '3': case '4': case '5': case '6':
                const num = parseInt(e.key) - 1;
                if (num < PAGES.length) {
                    e.preventDefault();
                    targetIndex = num;
                }
                break;
        }
        
        if (targetIndex !== currentPageIndex) {
            navigateToPage(targetIndex);
        }
    });
}

// ================= TOUCH & SWIPE SUPPORT =================
function setupTouchNavigation() {
    if (!isTouchDevice) return;
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (isAnimating) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Vérifier si c'est un swipe horizontal (plus horizontal que vertical)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            let targetIndex = currentPageIndex;
            
            if (diffX > 0) {
                // Swipe gauche → droite = page suivante
                targetIndex = (currentPageIndex + 1) % PAGES.length;
            } else {
                // Swipe droite → gauche = page précédente
                targetIndex = (currentPageIndex - 1 + PAGES.length) % PAGES.length;
            }
            
            navigateToPage(targetIndex);
        }
    }, { passive: true });
}

// ================= EFFETS VISUELS & INTERACTIONS =================
function setupVisualEffects() {
    // Effets de survol sur les cartes portfolio
    PORTFOLIO_CARDS.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
            const img = card.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Effet sur l'avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.05) rotate(5deg)';
            avatar.style.boxShadow = 
                '0 30px 60px rgba(0, 191, 255, 0.4), 0 0 80px rgba(0, 191, 255, 0.3)';
        });
        
        avatar.addEventListener('mouseleave', () => {
            avatar.style.transform = 'scale(1) rotate(0)';
            avatar.style.boxShadow = 
                '0 20px 40px rgba(0, 191, 255, 0.3), 0 0 60px rgba(0, 191, 255, 0.2)';
        });
    }
    
    // Effet de focus pour l'accessibilité
    document.addEventListener('focusin', (e) => {
        if (e.target.classList.contains('icon')) {
            e.target.style.outline = '2px solid #00bfff';
            e.target.style.outlineOffset = '3px';
        }
    });
    
    document.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('icon')) {
            e.target.style.outline = 'none';
        }
    });
}

// ================= OBSERVER POUR ANIMATIONS AU SCROLL =================
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animation spécifique pour les compétences
                if (entry.target.id === 'skills' && entry.isIntersecting) {
                    setTimeout(animateSkillBars, 300);
                }
                
                // Animation spécifique pour le portfolio
                if (entry.target.id === 'portfolio' && entry.isIntersecting) {
                    setTimeout(animatePortfolioCards, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observer toutes les pages
    PAGES.forEach(page => {
        observer.observe(page);
    });
}

// ================= INITIALISATION =================
function init() {
    console.log('🚀 Initialisation du portfolio de Aquilas DJEDJE');
    
    // Initialiser la navigation
    parseURLHash();
    
    // Configurer les écouteurs d'événements
    SIDEBAR_ICONS.forEach((icon, index) => {
        icon.addEventListener('click', () => navigateToPage(index));
        
        // Accessibilité
        icon.setAttribute('role', 'button');
        icon.setAttribute('tabindex', '0');
        icon.setAttribute('aria-label', `Aller à la section ${PAGES[index].id}`);
    });
    
    // Configurer les autres fonctionnalités
    setupButtons();
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupVisualEffects();
    setupIntersectionObserver();
    
    // Animer les éléments initiaux
    setTimeout(() => {
        animateSkillBars();
        animatePortfolioCards();
    }, 1000);
    
    // Gérer le changement de hash
    window.addEventListener('hashchange', parseURLHash);
    
    // Gérer le bouton retour/avant
    window.addEventListener('popstate', parseURLHash);
    
    console.log('✅ Portfolio initialisé avec succès !');
}

// ================= DÉMARRAGE =================
// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ================= EXPORT POSSIBLE POUR USAGE FUTUR =================
// export { navigateToPage, animateSkillBars, animatePortfolioCards };