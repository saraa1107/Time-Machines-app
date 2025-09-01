// Funcționalități interactive pentru site-ul Time Machines

document.addEventListener('DOMContentLoaded', function() {
    // Inițializare
    initializeApp();
    
    // Event listeners
    setupEventListeners();
    
    // Animații la scroll - dezactivate pentru a evita problemele de încărcare
    // setupScrollAnimations();
});

function initializeApp() {
    console.log('Time Machines - Site de promovare inițializat!');
    
    // Simulează încărcarea datelor
    simulateDataLoading();
}

function setupEventListeners() {
    // Butonul de instalare
    const installBtn = document.querySelector('.btn-install');
    if (installBtn) {
        installBtn.addEventListener('click', handleInstallClick);
    }
    
    // Butonul de share
    const shareBtn = document.querySelector('.btn-share');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShareClick);
    }
    
    // Butonul de wishlist
    const wishlistBtn = document.querySelector('.btn-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', handleWishlistClick);
    }
    
    // Barra de căutare
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('focus', handleSearchFocus);
        searchInput.addEventListener('blur', handleSearchBlur);
    }
    
    // Navigarea
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Capturile de ecran
    const screenshots = document.querySelectorAll('.screenshot img');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('click', handleScreenshotClick);
    });
    
    // Cardurile de aplicații similare
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.addEventListener('click', handleAppCardClick);
    });
    
    // Butonul de conectare
    const signinBtn = document.querySelector('.btn-signin');
    if (signinBtn) {
        signinBtn.addEventListener('click', handleSigninClick);
    }
}

function handleInstallClick() {
    // Afișează întotdeauna ghidul de descărcare
    showDownloadGuide();
    
    // Schimbă textul butonului temporar
    const btn = this;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-eye"></i> Ghid Afișat';
    btn.style.background = '#2196F3';
    
    // Resetează după 2 secunde
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

function handleShareClick() {
    // Implementează funcționalitatea de share
    if (navigator.share) {
        navigator.share({
            title: 'Time Machines - Călătorie în Istorie',
            text: 'Descarcă acest joc educațional captivant!',
            url: window.location.href
        }).then(() => {
            showNotification('Link-ul a fost partajat! 📤', 'info');
        }).catch((error) => {
            console.log('Eroare la partajare:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Fallback pentru browserele care nu suportă Web Share API
    const url = window.location.href;
    const text = 'Time Machines - Călătorie în Istorie';
    
    // Copiază URL-ul în clipboard
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Link-ul a fost copiat în clipboard! 📋', 'info');
    }).catch(() => {
        // Fallback pentru browserele vechi
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link-ul a fost copiat în clipboard! 📋', 'info');
    });
}

function handleWishlistClick() {
    const btn = this;
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('fas')) {
        // Adaugă la wishlist
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.background = '#ff4081';
        showNotification('Adăugat la wishlist! ❤️', 'success');
    } else {
        // Elimină din wishlist
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.background = '';
        showNotification('Eliminat din wishlist! 💔', 'info');
    }
}

function handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    
    // Simulează căutarea
    if (query.length > 2) {
        // Aici ai putea implementa logica reală de căutare
        console.log('Căutare pentru:', query);
    }
}

function handleSearchFocus() {
    this.parentElement.style.boxShadow = '0 0 0 2px rgba(1, 135, 95, 0.2)';
}

function handleSearchBlur() {
    this.parentElement.style.boxShadow = '';
}

function handleNavClick(event) {
    event.preventDefault();
    
    // Elimină clasa active de la toate linkurile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Adaugă clasa active la linkul apăsat
    this.classList.add('active');
    
    // Verifică dacă linkul duce la o ancoră
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Scroll smooth la elementul țintă
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Actualizează URL-ul fără a face reload
            history.pushState(null, null, href);
            
            const section = this.textContent.toLowerCase();
            showNotification(`Navigare la secțiunea: ${section}`, 'info');
        }
    } else {
        // Simulează navigarea pentru linkurile fără ancoră
        const section = this.textContent.toLowerCase();
        showNotification(`Navigare la secțiunea: ${section}`, 'info');
    }
}

function handleScreenshotClick() {
    // Creează un modal pentru a afișa imaginea mărită
    createImageModal(this.src, this.alt);
}

function handleAppCardClick() {
    const appName = this.querySelector('h4').textContent;
    showNotification(`Aplicația ${appName} va fi deschisă în curând!`, 'info');
}

function handleSigninClick() {
    // Simulează procesul de conectare
    showNotification('Redirecționare către pagina de conectare...', 'info');
    
    // Aici ai putea implementa logica reală de autentificare
    setTimeout(() => {
        this.textContent = 'Conectat';
        this.style.background = '#4CAF50';
    }, 1000);
}

function createImageModal(imageSrc, imageAlt) {
    // Elimină modalul existent dacă există
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Creează modalul
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${imageSrc}" alt="${imageAlt}">
                <p>${imageAlt}</p>
            </div>
        </div>
    `;
    
    // Adaugă stilurile pentru modal
    const modalStyles = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            padding: 20px;
            max-width: 90vw;
            max-height: 90vh;
            position: relative;
            text-align: center;
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 8px;
            margin-bottom: 10px;
        }
        
        .modal-content p {
            margin: 0;
            font-weight: 600;
            color: #333;
        }
    `;
    
    // Adaugă stilurile la head
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Adaugă modalul la body
    document.body.appendChild(modal);
    
    // Event listener pentru închiderea modalului
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    
    // Închide modalul la click pe overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Închide modalul la apăsarea tastei Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function showNotification(message, type = 'info') {
    // Elimină notificările existente
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Creează notificarea
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Adaugă stilurile pentru notificări
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-content {
            background: white;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification-success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification-info {
            border-left: 4px solid #2196F3;
        }
        
        .notification-warning {
            border-left: 4px solid #FF9800;
        }
        
        .notification-error {
            border-left: 4px solid #F44336;
        }
        
        .notification-message {
            flex: 1;
            color: #333;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
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
    `;
    
    // Adaugă stilurile la head
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Adaugă notificarea la body
    document.body.appendChild(notification);
    
    // Event listener pentru închiderea notificării
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Elimină automat notificarea după 5 secunde
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Adaugă animația de ieșire
    const slideOutStyles = `
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
    
    if (!document.querySelector('#slideout-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'slideout-styles';
        styleSheet.textContent = slideOutStyles;
        document.head.appendChild(styleSheet);
    }
}

function setupScrollAnimations() {
    // Animații la scroll pentru elementele
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
    
    // Observă elementele pentru animații
    const animatedElements = document.querySelectorAll('.app-details, .similar-apps, .screenshot, .review, .app-card, .bibliography-section, .developer-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function simulateDataLoading() {
    // Simulează încărcarea datelor
    const loadingElements = document.querySelectorAll('.app-rating, .rating-count, .app-size');
    
    loadingElements.forEach(element => {
        const originalContent = element.textContent;
        element.textContent = 'Se încarcă...';
        
        setTimeout(() => {
            element.textContent = originalContent;
        }, Math.random() * 2000 + 1000);
    });
}

// Funcții utilitare
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

// Optimizare pentru performanță
const optimizedSearch = debounce(handleSearchInput, 300);

// Event listener pentru scroll optimizat
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Aici poți adăuga logica pentru animații la scroll
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Funcția pentru afișarea ghidului de descărcare
function showDownloadGuide() {
    const downloadGuide = document.getElementById('download-guide');
    if (downloadGuide) {
        // Afișează ghidul
        downloadGuide.style.display = 'block';
        
        // Scroll la ghid
        downloadGuide.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Adaugă animație de fade-in
        downloadGuide.style.opacity = '0';
        downloadGuide.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            downloadGuide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            downloadGuide.style.opacity = '1';
            downloadGuide.style.transform = 'translateY(0)';
        }, 100);
        
        showNotification('Ghidul de descărcare a fost afișat! 📱', 'info');
    }
}

// Funcția pentru afișarea/ascunderea ghidului de descărcare (toggle)
function toggleDownloadGuide() {
    const downloadGuide = document.getElementById('download-guide');
    if (downloadGuide) {
        // Verifică dacă ghidul este vizibil
        const isVisible = downloadGuide.style.display !== 'none' && downloadGuide.style.opacity !== '0';
        
        if (!isVisible) {
            // Afișează ghidul
            downloadGuide.style.display = 'block';
            
            // Scroll la ghid
            downloadGuide.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Adaugă animație de fade-in
            downloadGuide.style.opacity = '0';
            downloadGuide.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                downloadGuide.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                downloadGuide.style.opacity = '1';
                downloadGuide.style.transform = 'translateY(0)';
            }, 100);
            
            showNotification('Ghidul de descărcare a fost afișat! 📱', 'info');
        } else {
            // Ascunde ghidul cu animație
            downloadGuide.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            downloadGuide.style.opacity = '0';
            downloadGuide.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                downloadGuide.style.display = 'none';
            }, 300);
            
            showNotification('Ghidul de descărcare a fost ascuns! 👁️', 'info');
        }
    }
}

// Export pentru utilizarea în alte module (dacă este necesar)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        createImageModal,
        handleInstallClick,
        toggleDownloadGuide,
        showDownloadGuide
    };
}

