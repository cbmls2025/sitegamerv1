// Configuração de eventos da página principal
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    setupEventListeners();
    loadGames();
});

function initializeUI() {
    // Fechar banner promocional
    const bannerClose = document.querySelector('.banner-close');
    if (bannerClose) {
        bannerClose.addEventListener('click', () => {
            document.querySelector('.banner-promo').style.display = 'none';
        });
    }
}

function setupEventListeners() {
    // Botões de jogar
    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const gameCard = e.target.closest('.game-card');
            const gameId = gameCard.dataset.game;
            playGame(gameId);
        });
    });

    // Cards clicáveis
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.dataset.game;
            openGamePage(gameId);
        });
    });

    // Filtro de jogos
    const filterDropdown = document.getElementById('filterDropdown');
    if (filterDropdown) {
        filterDropdown.addEventListener('change', (e) => {
            filterGames(e.target.value);
        });
    }

    // Headers buttons
    document.querySelector('.search-btn')?.addEventListener('click', () => {
        console.log('Busca clicada');
    });

    document.querySelector('.profile-btn')?.addEventListener('click', () => {
        console.log('Perfil clicado');
    });

    document.querySelector('.app-btn')?.addEventListener('click', () => {
        console.log('App clicado');
    });
}

function loadGames() {
    console.log('Jogos carregados');
}

function playGame(gameId) {
    // Redireciona para a página do jogo
    window.location.href = `jogo.html?game=${gameId}`;
}

function openGamePage(gameId) {
    // Alternativa: abre página de detalhes do jogo
    playGame(gameId);
}

function filterGames(filterType) {
    console.log('Filtrando por:', filterType);
    const cards = document.querySelectorAll('.game-card');
    
    cards.forEach(card => {
        // Implementar lógica de filtro
        card.style.display = 'block';
    });
}

// LocalStorage para dados do usuário
const gameStorage = {
    saveProgress: (gameId, progress) => {
        const data = JSON.parse(localStorage.getItem('gameProgress') || '{}');
        data[gameId] = {
            ...data[gameId],
            ...progress,
            lastPlayed: new Date().toISOString()
        };
        localStorage.setItem('gameProgress', JSON.stringify(data));
    },

    getProgress: (gameId) => {
        const data = JSON.parse(localStorage.getItem('gameProgress') || '{}');
        return data[gameId] || null;
    },

    getHighScore: (gameId) => {
        const progress = this.getProgress(gameId);
        return progress?.highScore || 0;
    }
};
