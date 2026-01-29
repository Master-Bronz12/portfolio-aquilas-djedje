// ================= CONFIGURATION =================
const CONFIG = {
  animations: {
    enabled: true,
    duration: 800,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  },
  images: {
    lazyLoad: true,
    placeholder: './IMAGES/placeholder.jpg',
    loadingClass: 'image-loading',
    loadedClass: 'image-loaded'
  },
  gallery: {
    autoRotate: false,
    rotateInterval: 5000,
    transitionDuration: 500
  }
};

// ================= DONNÉES DES PROJETS =================
const projectsData = {
  ecommerce: {
    id: "ecommerce",
    title: "Plateforme E-commerce Moderne",
    category: "E-commerce Full Stack",
    subtitle: "Solution complète de commerce en ligne avec React et Node.js",
    heroImage: "./IMAGES/ec.jpg",
    description: `
      Développement d'une plateforme e-commerce moderne et performante offrant une expérience utilisateur exceptionnelle.
      Cette solution complète intègre toutes les fonctionnalités nécessaires pour une boutique en ligne réussie.
      Le projet a été conçu avec une architecture microservices permettant une scalabilité optimale.
      L'interface utilisateur intuitive et responsive garantit une expérience fluide sur tous les appareils.
    `,
    longDescription: `
      <p>Cette plateforme e-commerce a été développée pour répondre aux besoins d'une entreprise cherchant à digitaliser ses ventes.
      Le projet incluait la création d'un catalogue produit dynamique, un système de panier avancé, un processus de commande sécurisé,
      et un tableau de bord administrateur complet.</p>
      
      <p><strong>Objectifs principaux :</strong></p>
      <ul>
        <li>Créer une expérience utilisateur fluide et intuitive</li>
        <li>Implémenter des fonctionnalités e-commerce avancées</li>
        <li>Garantir une sécurité maximale pour les transactions</li>
        <li>Optimiser les performances pour un temps de chargement rapide</li>
        <li>Assurer la scalabilité pour supporter la croissance</li>
      </ul>
      
      <p>Le projet a été mené en utilisant les méthodologies Agile avec des sprints de 2 semaines,
      permettant des retours réguliers et des ajustements rapides.</p>
    `,
    features: [
      {
        icon: "fa-cart-shopping",
        title: "Panier intelligent",
        description: "Synchronisation en temps réel, sauvegarde automatique, suggestions personnalisées"
      },
      {
        icon: "fa-shield",
        title: "Paiement sécurisé",
        description: "Stripe intégré, cryptage SSL, validation 3D Secure, multiples méthodes de paiement"
      },
      {
        icon: "fa-mobile-screen-button",
        title: "Design Responsive",
        description: "Adaptation parfaite mobile, tablette, desktop - PWA compatible"
      },
      {
        icon: "fa-chart-line",
        title: "Dashboard admin",
        description: "Analytics temps réel, gestion produits, suivi commandes, rapports détaillés"
      },
      {
        icon: "fa-magnifying-glass",
        title: "Recherche avancée",
        description: "Moteur de recherche intelligent, filtres multiples, recherche par image"
      },
      {
        icon: "fa-user-group",
        title: "Système utilisateur",
        description: "Profils personnalisés, historique d'achats, listes de souhaits, avis produits"
      }
    ],
    gallery: [
      {
        src: "./IMAGES/app.jpg",
        alt: "Interface de gestion des produits avec tableau de bord administrateur",
        caption: "Dashboard administrateur"
      },
      {
        src: "./IMAGES/aap.jpg",
        alt: "Interface utilisateur du panier d'achat avec résumé de commande",
        caption: "Panier utilisateur"
      },
      {
        src: "./IMAGES/ap g.jpg",
        alt: "Page de paiement sécurisée avec formulaire Stripe",
        caption: "Processus de paiement"
      },
      {
        src: "./IMAGES/app3.jpg",
        alt: "Interface mobile responsive de la boutique en ligne",
        caption: "Version mobile"
      }
    ],
    details: {
      duration: "3 mois",
      client: "Startup Tech (Paris)",
      team: "2 développeurs + 1 designer",
      architecture: "Microservices MERN Stack",
      database: "MongoDB Atlas + Redis Cache",
      hosting: "AWS EC2 + S3 + CloudFront",
      status: "Live & Maintenu"
    },
    techStack: {
      frontend: ["React 18", "TypeScript", "Redux Toolkit", "React Query", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "JWT"],
      services: ["Stripe API", "SendGrid", "Cloudinary", "Google Analytics", "Docker", "AWS"]
    },
    challenges: [
      {
        title: "Optimisation des performances",
        description: "Mise en place de lazy loading, code splitting, cache Redis et compression GZIP pour réduire les temps de chargement de 60%."
      },
      {
        title: "Sécurité renforcée",
        description: "Implémentation de JWT avec refresh tokens, rate limiting, sanitization des inputs et protection contre les attaques XSS/CSRF."
      },
      {
        title: "Scalabilité horizontale",
        description: "Architecture microservices avec Docker, orchestration via Kubernetes et load balancing pour supporter une croissance exponentielle."
      }
    ],
    metrics: {
      uptime: "99.9%",
      loadTime: "<2s",
      satisfaction: "95%+",
      monthlyUsers: "10k+"
    },
    demoUrl: "https://demo-ecommerce.aquilas-djedje.com",
    sourceUrl: "https://github.com/Master-Bronz12/ecommerce-platform",
    caseStudyUrl: "#"
  },

  taskmanager: {
    id: "taskmanager",
    title: "Task Manager Pro",
    category: "Productivité",
    subtitle: "Application de gestion de projet avec collaboration d'équipe",
    heroImage: "./IMAGES/ap g.jpg",
    description: `
      Application de gestion de tâches avancée conçue pour les équipes de développement.
      Solution complète avec tableaux Kanban, gestion de sprints, et collaboration en temps réel.
      Interface moderne et intuitive permettant une productivité maximale.
    `,
    features: [
      {
        icon: "fa-kanban",
        title: "Tableaux Kanban",
        description: "Drag & drop, états personnalisables, workflows complexes"
      },
      {
        icon: "fa-users",
        title: "Collaboration",
        description: "Équipes, rôles, notifications en temps réel, commentaires"
      },
      {
        icon: "fa-chart-gantt",
        title: "Gestion de sprint",
        description: "Planning poker, burndown charts, retrospectives, velocity tracking"
      },
      {
        icon: "fa-bell",
        title: "Notifications",
        description: "Email, push, webhooks intégration, préférences personnalisées"
      }
    ],
    gallery: [
      {
        src: "./IMAGES/ec.jpg",
        alt: "Interface principale du gestionnaire de tâches",
        caption: "Vue d'ensemble"
      },
      {
        src: "./IMAGES/aap.jpg",
        alt: "Tableau Kanban avec tâches",
        caption: "Tableau Kanban"
      },
      {
        src: "./IMAGES/api.jpg",
        alt: "Analytics et rapports",
        caption: "Analytics"
      },
      {
        src: "./IMAGES/3D.jpg",
        alt: "Interface mobile de l'application",
        caption: "Version mobile"
      }
    ],
    details: {
      duration: "2 mois",
      client: "Agence Digital (Lyon)",
      team: "Full Stack Developer Solo",
      architecture: "SPA Vue.js + Node.js API",
      database: "PostgreSQL",
      hosting: "DigitalOcean + Cloudflare"
    },
    techStack: {
      frontend: ["Vue.js 3", "Vuex", "Vuetify", "Chart.js"],
      backend: ["Node.js", "Express", "PostgreSQL", "Socket.io"],
      services: ["JWT", "Redis", "Docker", "GitHub Actions"]
    },
    challenges: [
      {
        title: "Synchronisation en temps réel",
        description: "Implémentation de WebSockets pour la synchronisation multi-utilisateurs sans conflits de données."
      },
      {
        title: "Gestion des permissions",
        description: "Système de rôles et permissions complexe avec héritage et gestion granulaire."
      },
      {
        title: "Performance offline",
        description: "Mise en cache locale et synchronisation différée pour le mode hors ligne."
      }
    ],
    demoUrl: "https://demo-taskmanager.aquilas-djedje.com",
    sourceUrl: "https://github.com/Master-Bronz12/task-manager-pro"
  },

  // Ajouter les autres projets de la même manière...
  // (weather, uikit, modeling3d, api)
};

// ================= VARIABLES GLOBALES =================
let currentProject = null;
let galleryInterval = null;
let currentGalleryIndex = 0;
let isGalleryAutoRotating = false;
let observers = [];

// ================= FONCTIONS UTILITAIRES =================
function getProjectFromURL() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project') || 'ecommerce';
    return projectsData[projectId] || projectsData.ecommerce;
  } catch (error) {
    console.error('Erreur lors de la récupération du projet depuis l\'URL:', error);
    return projectsData.ecommerce;
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// ================= GESTION DU DOM =================
function updatePageTitle(project) {
  try {
    document.title = `${project.title} | Portfolio Aquilas DJEDJE`;
    
    // Mettre à jour les meta tags dynamiquement
    updateMetaTags(project);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du titre:', error);
  }
}

function updateMetaTags(project) {
  // Mettre à jour la meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', project.subtitle);
  }
  
  // Mettre à jour les Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  
  if (ogTitle) ogTitle.setAttribute('content', project.title);
  if (ogDescription) ogDescription.setAttribute('content', project.subtitle);
  if (ogImage) ogImage.setAttribute('content', project.heroImage);
}

function createTechBadges(techStack) {
  if (!techStack || typeof techStack !== 'object') return '';
  
  let badges = '';
  
  // Frontend badges
  if (techStack.frontend && Array.isArray(techStack.frontend)) {
    badges += techStack.frontend.map(tech => 
      `<span class="tech-badge frontend">${tech}</span>`
    ).join('');
  }
  
  // Backend badges
  if (techStack.backend && Array.isArray(techStack.backend)) {
    badges += techStack.backend.map(tech => 
      `<span class="tech-badge backend">${tech}</span>`
    ).join('');
  }
  
  // Services badges
  if (techStack.services && Array.isArray(techStack.services)) {
    badges += techStack.services.map(tech => 
      `<span class="tech-badge service">${tech}</span>`
    ).join('');
  }
  
  return badges;
}

function createFeaturesGrid(features) {
  if (!Array.isArray(features)) return '';
  
  return features.map((feature, index) => `
    <div class="feature-item" data-aos="fade-up" data-aos-delay="${index * 100}">
      <div class="feature-icon">
        <i class="fa-solid ${feature.icon}" aria-hidden="true"></i>
      </div>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    </div>
  `).join('');
}

function createGalleryItems(gallery) {
  if (!Array.isArray(gallery)) return '';
  
  return gallery.map((item, index) => `
    <figure class="gallery-item" data-index="${index}">
      <img src="${item.src}" 
           alt="${item.alt || 'Image du projet'}"
           loading="lazy"
           data-src="${item.src}"
           width="600"
           height="400">
      ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ''}
    </figure>
  `).join('');
}

function createDetailsList(details) {
  const detailsMap = {
    duration: { icon: 'fa-calendar-days', label: 'Durée' },
    client: { icon: 'fa-building', label: 'Client' },
    team: { icon: 'fa-users', label: 'Équipe' },
    architecture: { icon: 'fa-layer-group', label: 'Architecture' },
    database: { icon: 'fa-database', label: 'Base de données' },
    hosting: { icon: 'fa-server', label: 'Hébergement' },
    status: { icon: 'fa-code-branch', label: 'Statut' }
  };
  
  return Object.entries(detailsMap)
    .filter(([key]) => details[key])
    .map(([key, { icon, label }], index) => `
      <li class="detail-item" data-aos="fade-right" data-aos-delay="${index * 50}">
        <i class="fa-solid ${icon}" aria-hidden="true"></i>
        <div>
          <strong>${label}</strong>
          <p>${details[key]}</p>
        </div>
      </li>
    `).join('');
}

function createChallengesList(challenges) {
  if (!Array.isArray(challenges)) return '';
  
  return challenges.map((challenge, index) => `
    <div class="challenge-item" data-aos="fade-right" data-aos-delay="${index * 100}">
      <div class="challenge-number">0${index + 1}</div>
      <div class="challenge-content">
        <h3>${challenge.title}</h3>
        <p>${challenge.description}</p>
      </div>
    </div>
  `).join('');
}

function getRelatedProjects(currentProjectId) {
  const allIds = Object.keys(projectsData);
  const otherIds = allIds.filter(id => id !== currentProjectId);
  
  // Mélanger et prendre 3 projets
  const shuffled = [...otherIds].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);
  
  return selected.map(id => projectsData[id]);
}

function createRelatedProjects(projects) {
  return projects.map(project => `
    <article class="related-project-card" data-aos="fade-up">
      <a href="portfolio.html?project=${project.id}" class="project-link" aria-label="Voir le projet ${project.title}">
        <div class="project-image-container">
          <img src="${project.heroImage}" 
               alt="${project.title}"
               loading="lazy"
               width="400"
               height="250">
          <div class="project-overlay">
            <span class="view-project">
              Voir le projet <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div class="project-content">
          <span class="project-tag">${project.category}</span>
          <h3>${project.title}</h3>
          <p>${project.subtitle}</p>
          <div class="project-tech">
            ${project.techStack?.frontend?.slice(0, 2).map(tech => `<span>${tech}</span>`).join('') || ''}
          </div>
        </div>
      </a>
    </article>
  `).join('');
}

// ================= RENDU DE LA PAGE =================
async function renderProjectPage(project) {
  try {
    console.log(`🎨 Rendu de la page pour: ${project.title}`);
    
    // Mettre à jour le titre de la page
    updatePageTitle(project);
    
    // Mettre à jour les éléments principaux
    updateMainElements(project);
    
    // Générer le contenu dynamique
    generateDynamicContent(project);
    
    // Initialiser la galerie
    initGallery(project.gallery);
    
    // Précharger les images
    preloadProjectImages(project);
    
    // Ajouter les écouteurs d'événements
    addEventListeners();
    
    // Mettre à jour l'historique
    updateBrowserHistory(project.id);
    
    // Animer l'entrée
    animatePageEntry();
    
    console.log(`✅ Page rendue avec succès pour: ${project.title}`);
  } catch (error) {
    console.error('❌ Erreur lors du rendu de la page:', error);
    showErrorMessage('Erreur lors du chargement du projet. Veuillez réessayer.');
  }
}

function updateMainElements(project) {
  const elements = {
    category: document.querySelector('.project-category'),
    title: document.querySelector('.project-title'),
    subtitle: document.querySelector('.project-subtitle'),
    heroImage: document.querySelector('.hero-image'),
    description: document.querySelector('.project-description .section-content')
  };
  
  if (elements.category) elements.category.textContent = project.category;
  if (elements.title) elements.title.innerHTML = project.title.replace('E-commerce', '<span class="highlight">E-commerce</span>');
  if (elements.subtitle) elements.subtitle.textContent = project.subtitle;
  if (elements.heroImage) {
    elements.heroImage.src = project.heroImage;
    elements.heroImage.alt = project.title;
  }
  if (elements.description && project.longDescription) {
    elements.description.innerHTML = project.longDescription;
  }
}

function generateDynamicContent(project) {
  // Features
  const featuresGrid = document.querySelector('.features-grid');
  if (featuresGrid) {
    featuresGrid.innerHTML = createFeaturesGrid(project.features);
  }
  
  // Gallery
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) {
    galleryGrid.innerHTML = createGalleryItems(project.gallery);
  }
  
  // Details
  const detailsList = document.querySelector('.infrastructure-list');
  if (detailsList) {
    detailsList.innerHTML = createDetailsList(project.details);
  }
  
  // Tech Stack
  const techStack = document.querySelector('.tech-stack-section');
  if (techStack && project.techStack) {
    techStack.innerHTML = `
      <h3>Frontend</h3>
      <div class="tech-stack">
        ${project.techStack.frontend?.map(tech => `<span class="tech-badge frontend">${tech}</span>`).join('') || ''}
      </div>
      
      <h3>Backend</h3>
      <div class="tech-stack">
        ${project.techStack.backend?.map(tech => `<span class="tech-badge backend">${tech}</span>`).join('') || ''}
      </div>
      
      <h3>Services & APIs</h3>
      <div class="tech-stack">
        ${project.techStack.services?.map(tech => `<span class="tech-badge service">${tech}</span>`).join('') || ''}
      </div>
    `;
  }
  
  // Challenges
  const challengesList = document.querySelector('.challenges-list');
  if (challengesList) {
    challengesList.innerHTML = createChallengesList(project.challenges);
  }
  
  // Metrics
  const metricsGrid = document.querySelector('.metrics-grid');
  if (metricsGrid && project.metrics) {
    metricsGrid.innerHTML = `
      <div class="metric-item" data-aos="zoom-in">
        <div class="metric-value">${project.metrics.uptime}</div>
        <div class="metric-label">Uptime</div>
      </div>
      
      <div class="metric-item" data-aos="zoom-in" data-aos-delay="100">
        <div class="metric-value">${project.metrics.loadTime}</div>
        <div class="metric-label">Load Time</div>
      </div>
      
      <div class="metric-item" data-aos="zoom-in" data-aos-delay="200">
        <div class="metric-value">${project.metrics.satisfaction}</div>
        <div class="metric-label">Satisfaction</div>
      </div>
      
      <div class="metric-item" data-aos="zoom-in" data-aos-delay="300">
        <div class="metric-value">${project.metrics.monthlyUsers}</div>
        <div class="metric-label">Users/mois</div>
      </div>
    `;
  }
  
  // Actions
  const actionsGrid = document.querySelector('.actions-grid');
  if (actionsGrid) {
    actionsGrid.innerHTML = `
      <a href="${project.demoUrl}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="demo-btn action-btn"
         aria-label="Voir la démo live de ${project.title}">
        <i class="fa-solid fa-play" aria-hidden="true"></i>
        <span>Voir la démo live</span>
        <small>Site de démonstration fonctionnel</small>
      </a>
      
      <a href="${project.sourceUrl}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="source-btn action-btn"
         aria-label="Voir le code source de ${project.title} sur GitHub">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        <span>Code source GitHub</span>
        <small>Repository public</small>
      </a>
      
      <a href="./CV/mon cv.pdf" 
         download="Aquilas_DJEDJE_CV.pdf"
         class="cv-btn action-btn"
         aria-label="Télécharger le CV de Aquilas DJEDJE">
        <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
        <span>Télécharger le CV</span>
        <small>Voir plus de projets</small>
      </a>
    `;
  }
  
  // Related projects
  const relatedGrid = document.querySelector('.projects-grid');
  if (relatedGrid) {
    const relatedProjects = getRelatedProjects(project.id);
    relatedGrid.innerHTML = createRelatedProjects(relatedProjects);
  }
}

// ================= GALERIE =================
function initGallery(gallery) {
  if (!gallery || gallery.length === 0) return;
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  const totalSlides = galleryItems.length;
  
  if (totalSlides === 0) return;
  
  // Mettre à jour le compteur
  updateGalleryCounter(1, totalSlides);
  
  // Initialiser les événements de navigation
  initGalleryNavigation(galleryItems, totalSlides);
  
  // Initialiser le mode plein écran
  initFullscreenGallery(gallery);
  
  // Démarrer la rotation automatique si configurée
  if (CONFIG.gallery.autoRotate && totalSlides > 1) {
    startGalleryAutoRotation(galleryItems, totalSlides);
  }
}

function updateGalleryCounter(current, total) {
  const currentEl = document.querySelector('.current-slide');
  const totalEl = document.querySelector('.total-slides');
  
  if (currentEl) currentEl.textContent = current;
  if (totalEl) totalEl.textContent = total;
}

function initGalleryNavigation(galleryItems, totalSlides) {
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      navigateGallery(-1, galleryItems, totalSlides);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      navigateGallery(1, galleryItems, totalSlides);
    });
  }
  
  // Navigation clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateGallery(-1, galleryItems, totalSlides);
    } else if (e.key === 'ArrowRight') {
      navigateGallery(1, galleryItems, totalSlides);
    } else if (e.key === 'Escape') {
      closeFullscreenGallery();
    }
  });
  
  // Navigation par swipe sur mobile
  initGallerySwipe(galleryItems, totalSlides);
}

function navigateGallery(direction, galleryItems, totalSlides) {
  // Arrêter la rotation automatique
  stopGalleryAutoRotation();
  
  // Cacher l'image actuelle
  galleryItems[currentGalleryIndex].classList.remove('active');
  
  // Calculer le nouvel index
  currentGalleryIndex = (currentGalleryIndex + direction + totalSlides) % totalSlides;
  
  // Afficher la nouvelle image
  galleryItems[currentGalleryIndex].classList.add('active');
  
  // Mettre à jour le compteur
  updateGalleryCounter(currentGalleryIndex + 1, totalSlides);
  
  // Redémarrer la rotation automatique après un délai
  if (CONFIG.gallery.autoRotate) {
    setTimeout(() => startGalleryAutoRotation(galleryItems, totalSlides), 3000);
  }
}

function initGallerySwipe(galleryItems, totalSlides) {
  let touchStartX = 0;
  let touchEndX = 0;
  
  const galleryContainer = document.querySelector('.gallery-grid');
  if (!galleryContainer) return;
  
  galleryContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  galleryContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGallerySwipe(touchStartX, touchEndX, galleryItems, totalSlides);
  }, { passive: true });
}

function handleGallerySwipe(startX, endX, galleryItems, totalSlides) {
  const swipeThreshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe gauche → droite
      navigateGallery(1, galleryItems, totalSlides);
    } else {
      // Swipe droite → gauche
      navigateGallery(-1, galleryItems, totalSlides);
    }
  }
}

function startGalleryAutoRotation(galleryItems, totalSlides) {
  if (totalSlides <= 1) return;
  
  stopGalleryAutoRotation();
  
  isGalleryAutoRotating = true;
  galleryInterval = setInterval(() => {
    navigateGallery(1, galleryItems, totalSlides);
  }, CONFIG.gallery.rotateInterval);
}

function stopGalleryAutoRotation() {
  if (galleryInterval) {
    clearInterval(galleryInterval);
    galleryInterval = null;
    isGalleryAutoRotating = false;
  }
}

function initFullscreenGallery(gallery) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openFullscreenGallery(gallery, index);
    });
  });
}

function openFullscreenGallery(gallery, startIndex) {
  // Créer la modale plein écran
  const modal = document.createElement('div');
  modal.className = 'fullscreen-gallery';
  modal.innerHTML = `
    <div class="fullscreen-overlay"></div>
    <div class="fullscreen-content">
      <button class="fullscreen-close" aria-label="Fermer la galerie">
        <i class="fa-solid fa-times"></i>
      </button>
      <div class="fullscreen-image-container">
        <img src="${gallery[startIndex].src}" alt="${gallery[startIndex].alt}">
        <div class="image-caption">${gallery[startIndex].caption || ''}</div>
      </div>
      <div class="fullscreen-controls">
        <button class="fullscreen-prev" aria-label="Image précédente">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="fullscreen-counter">
          <span class="current-slide">${startIndex + 1}</span> / 
          <span class="total-slides">${gallery.length}</span>
        </div>
        <button class="fullscreen-next" aria-label="Image suivante">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Ajouter les événements
  setupFullscreenEvents(modal, gallery, startIndex);
}

function setupFullscreenEvents(modal, gallery, startIndex) {
  let currentIndex = startIndex;
  const overlay = modal.querySelector('.fullscreen-overlay');
  const closeBtn = modal.querySelector('.fullscreen-close');
  const prevBtn = modal.querySelector('.fullscreen-prev');
  const nextBtn = modal.querySelector('.fullscreen-next');
  const imageContainer = modal.querySelector('.fullscreen-image-container');
  const currentSlideEl = modal.querySelector('.current-slide');
  const totalSlidesEl = modal.querySelector('.total-slides');
  
  function updateFullscreenImage() {
    const img = imageContainer.querySelector('img');
    const caption = imageContainer.querySelector('.image-caption');
    
    img.src = gallery[currentIndex].src;
    img.alt = gallery[currentIndex].alt;
    caption.textContent = gallery[currentIndex].caption || '';
    currentSlideEl.textContent = currentIndex + 1;
  }
  
  function navigateFullscreen(direction) {
    currentIndex = (currentIndex + direction + gallery.length) % gallery.length;
    updateFullscreenImage();
  }
  
  // Événements
  overlay.addEventListener('click', closeFullscreenGallery);
  closeBtn.addEventListener('click', closeFullscreenGallery);
  
  prevBtn.addEventListener('click', () => navigateFullscreen(-1));
  nextBtn.addEventListener('click', () => navigateFullscreen(1));
  
  // Navigation clavier
  document.addEventListener('keydown', function fullscreenKeyHandler(e) {
    if (e.key === 'Escape') {
      closeFullscreenGallery();
    } else if (e.key === 'ArrowLeft') {
      navigateFullscreen(-1);
    } else if (e.key === 'ArrowRight') {
      navigateFullscreen(1);
    }
  });
  
  // Initialiser
  totalSlidesEl.textContent = gallery.length;
}

function closeFullscreenGallery() {
  const modal = document.querySelector('.fullscreen-gallery');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

// ================= ANIMATIONS =================
function initAnimations() {
  if (!CONFIG.animations.enabled) return;
  
  const observerOptions = {
    threshold: CONFIG.animations.threshold,
    rootMargin: CONFIG.animations.rootMargin
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observer les éléments animables
  const animatableElements = document.querySelectorAll(
    '.feature-item, .gallery-item, .related-project-card, .tech-badge, .metric-item, .challenge-item, .detail-item'
  );
  
  animatableElements.forEach(el => {
    animationObserver.observe(el);
  });
  
  observers.push(animationObserver);
}

function animatePageEntry() {
  const page = document.querySelector('.portfolio-detail-page');
  if (page) {
    page.style.opacity = '0';
    page.style.transform = 'translateY(20px)';
    
    requestAnimationFrame(() => {
      page.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      page.style.opacity = '1';
      page.style.transform = 'translateY(0)';
    });
  }
}

// ================= NAVIGATION =================
function initNavigation() {
  // Navigation smooth scroll pour la sidebar
  document.querySelectorAll('.portfolio-sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Mettre à jour l'URL hash
        updateURLHash(targetId);
      }
    });
  });
  
  // Bouton retour en haut
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Afficher/masquer le bouton au scroll
    window.addEventListener('scroll', debounce(() => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, 100));
  }
  
  // Mettre à jour la sidebar active
  updateActiveSidebarLink();
  
  // Navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.location.href = 'index.html';
    }
  });
}

function updateActiveSidebarLink() {
  const sections = document.querySelectorAll('.content-section');
  const sidebarLinks = document.querySelectorAll('.portfolio-sidebar a[href^="#"]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => sectionObserver.observe(section));
  observers.push(sectionObserver);
}

function updateURLHash(hash) {
  if (history.pushState) {
    history.pushState(null, null, hash);
  } else {
    window.location.hash = hash;
  }
}

// ================= GESTION DES IMAGES =================
function preloadProjectImages(project) {
  const imageUrls = [
    project.heroImage,
    ...(project.gallery?.map(item => item.src) || [])
  ];
  
  preloadImages(imageUrls);
}

function initImageLoading() {
  if (!CONFIG.images.lazyLoad) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        
        img.classList.remove(CONFIG.images.loadingClass);
        img.classList.add(CONFIG.images.loadedClass);
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add(CONFIG.images.loadingClass);
    imageObserver.observe(img);
  });
  
  observers.push(imageObserver);
}

function handleImageError(e) {
  console.error('❌ Erreur de chargement image:', e.target.src);
  
  const img = e.target;
  img.src = CONFIG.images.placeholder;
  img.alt = 'Image non disponible - Placeholder';
  img.classList.add('image-error');
  
  // Afficher un message d'erreur
  const errorMsg = document.createElement('div');
  errorMsg.className = 'image-error-message';
  errorMsg.textContent = 'Image non disponible';
  
  img.parentNode.insertBefore(errorMsg, img.nextSibling);
}

// ================= GESTION DE L'HISTORIQUE =================
function updateBrowserHistory(projectId) {
  try {
    const url = new URL(window.location);
    url.searchParams.set('project', projectId);
    
    if (history.replaceState) {
      history.replaceState({ projectId }, '', url);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'historique:', error);
  }
}

// ================= GESTION DES ÉVÉNEMENTS =================
function addEventListeners() {
  // Gestion des erreurs d'images
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      handleImageError(e);
    }
  }, true);
  
  // Redimensionnement de la fenêtre
  window.addEventListener('resize', debounce(handleResize, 250));
  
  // Avant de quitter la page
  window.addEventListener('beforeunload', cleanup);
}

function handleResize() {
  // Réinitialiser les animations si nécessaire
  if (window.innerWidth <= 768) {
    stopGalleryAutoRotation();
  }
}

function cleanup() {
  // Nettoyer les observers
  observers.forEach(observer => {
    observer.disconnect();
  });
  observers = [];
  
  // Arrêter les intervalles
  stopGalleryAutoRotation();
}

// ================= GESTION DES ERREURS =================
function showErrorMessage(message) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'error-message';
  errorContainer.innerHTML = `
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p>${message}</p>
    <button class="retry-btn">Réessayer</button>
  `;
  
  document.querySelector('.container').prepend(errorContainer);
  
  // Bouton de réessai
  const retryBtn = errorContainer.querySelector('.retry-btn');
  retryBtn.addEventListener('click', () => {
    errorContainer.remove();
    initPortfolioPage();
  });
}

// ================= INITIALISATION =================
async function initPortfolioPage() {
  try {
    console.log('🚀 Initialisation de la page portfolio détaillée');
    
    // Récupérer le projet depuis l'URL
    currentProject = getProjectFromURL();
    
    // Rendre la page
    await renderProjectPage(currentProject);
    
    // Initialiser les animations
    if (CONFIG.animations.enabled) {
      initAnimations();
    }
    
    // Initialiser la navigation
    initNavigation();
    
    // Initialiser le chargement des images
    initImageLoading();
    
    console.log(`✅ Page portfolio initialisée: ${currentProject.title}`);
    
    // Déclencher un événement personnalisé
    const event = new CustomEvent('portfolioPageLoaded', {
      detail: { project: currentProject }
    });
    document.dispatchEvent(event);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    showErrorMessage('Une erreur est survenue lors du chargement de la page.');
  }
}

// ================= API PUBLIQUE =================
const PortfolioAPI = {
  // Obtenir les informations du projet actuel
  getCurrentProject: () => currentProject,
  
  // Obtenir tous les projets
  getAllProjects: () => projectsData,
  
  // Changer de projet
  navigateToProject: (projectId) => {
    if (projectsData[projectId]) {
      window.location.href = `portfolio.html?project=${projectId}`;
    } else {
      console.warn(`Projet "${projectId}" non trouvé`);
    }
  },
  
  // Redémarrer la galerie
  restartGallery: () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const totalSlides = galleryItems.length;
    
    if (totalSlides > 0) {
      stopGalleryAutoRotation();
      currentGalleryIndex = 0;
      
      galleryItems.forEach((item, index) => {
        item.classList.toggle('active', index === 0);
      });
      
      updateGalleryCounter(1, totalSlides);
      
      if (CONFIG.gallery.autoRotate) {
        startGalleryAutoRotation(galleryItems, totalSlides);
      }
    }
  },
  
  // Configuration
  config: CONFIG,
  
  // Vérifier l'état
  getStatus: () => ({
    projectLoaded: !!currentProject,
    galleryAutoRotating: isGalleryAutoRotating,
    galleryIndex: currentGalleryIndex,
    observersCount: observers.length
  })
};

// ================= DÉMARRAGE =================
// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolioPage);
} else {
  // DOM déjà chargé
  setTimeout(initPortfolioPage, 100);
}

// Exposer l'API globalement pour le débogage
if (process.env.NODE_ENV === 'development') {
  window.PortfolioAPI = PortfolioAPI;
  console.log('🔧 Mode développement - PortfolioAPI disponible');
}

// Gestion des promesses non capturées
window.addEventListener('unhandledrejection', (e) => {
  console.error('❌ Promesse rejetée non capturée:', e.reason);
});

// ================= STYLES DYNAMIQUES =================
// Injecter des styles CSS dynamiques
function injectDynamicStyles() {
  const styles = `
    /* Animations */
    .animate-in {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    .image-loading {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .image-loaded {
      opacity: 1;
    }
    
    .image-error {
      filter: grayscale(100%);
      opacity: 0.5;
    }
    
    .image-error-message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--error);
      font-size: 0.9rem;
    }
    
    /* Galerie */
    .gallery-item {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .gallery-item.active {
      opacity: 1;
      transform: scale(1);
    }
    
    .gallery-item:not(.active) {
      opacity: 0.5;
      transform: scale(0.95);
    }
    
    /* Bouton retour en haut */
    .scroll-top-btn {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }
    
    .scroll-top-btn.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Messages d'erreur */
    .error-message {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid var(--error);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
      color: var(--error);
    }
    
    .error-message i {
      font-size: 2rem;
      margin-bottom: 10px;
    }
    
    .retry-btn {
      background: var(--error);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      margin-top: 10px;
      cursor: pointer;
    }
    
    /* Galerie plein écran */
    .fullscreen-gallery {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .fullscreen-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    
    .fullscreen-content {
      position: relative;
      z-index: 1;
      max-width: 90%;
      max-height: 90%;
    }
    
    .fullscreen-close {
      position: absolute;
      top: -50px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }
    
    /* Keyframes */
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
  `;
  
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

// Injecter les styles au démarrage
injectDynamicStyles();