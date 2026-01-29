// ================= SCRIPT PORTFOLIO DÉTAILLÉ =================
console.log("📁 Page portfolio détaillée chargée");

document.addEventListener('DOMContentLoaded', function() {
    // Animation d'entrée
    const container = document.querySelector('.portfolio-container');
    if (container) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Gestion du bouton retour
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }
    
    console.log("✅ Portfolio page initialisée");
});
