// Configurare pentru Time Machines - Statistici în timp real de la Expo
// Acest fișier nu mai este necesar pentru statistici - datele vin direct de la Expo API

window.TimeMachinesConfig = {
    // Informații despre joc (pentru afișare)
    gameInfo: {
        name: 'Time Machines',
        developer: 'Chronos Studios',
        category: 'Educațional',
        version: '1.0.0',
        launchDate: '2024-12-01'
    },

    // Setări pentru actualizare
    updateSettings: {
        autoUpdate: true,     // Actualizare automată
        updateInterval: 120000, // 2 minute (în milisecunde)
        showRealTime: true    // Afișează "în timp real"
    },

    // Mesaj informativ
    info: {
        message: '📊 Statisticile se încarcă automat de la Expo API',
        lastUpdated: 'Configurare automată'
    }
};

// Funcție pentru a afișa informații despre configurare
function showConfigInfo() {
    if (window.TimeMachinesConfig) {
        console.log('🎮 Time Machines Config:', window.TimeMachinesConfig);
        console.log('📊 Statisticile se încarcă automat de la Expo API');
        console.log('🔄 Nu mai ai nevoie să configurezi manual numerele!');
    }
}

// Afișează informațiile când se încarcă pagina
document.addEventListener('DOMContentLoaded', function() {
    showConfigInfo();
    
    // Adaugă un mesaj informativ în UI
    setTimeout(() => {
        const appStats = document.querySelector('.app-stats');
        if (appStats) {
            const infoDiv = document.createElement('div');
            infoDiv.className = 'config-info';
            infoDiv.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <span>Statistici în timp real de la Expo</span>
            `;
            appStats.appendChild(infoDiv);
        }
    }, 1000);
});

// Adaugă stilurile pentru informațiile de configurare
const configStyles = `
    .config-info {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 8px;
        padding: 4px 8px;
        background: var(--background-gray);
        border-radius: 12px;
        width: fit-content;
        opacity: 0.8;
    }
    
    .config-info i {
        font-size: 12px;
        color: var(--primary-color);
    }
`;

// Adaugă stilurile în head
if (!document.querySelector('#config-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'config-styles';
    styleSheet.textContent = configStyles;
    document.head.appendChild(styleSheet);
}
