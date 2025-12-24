/**
 * CRAZY GAMES - SNIPER MISSION / PEW PEW DOSE
 * Sistema principal do jogo
 */

// Configurações globais
const DEBUG = false;
let gameWidth = 0;
let gameHeight = 0;

// Instâncias globais
let canvas;
let ctx;
let player;
let weaponManager;
let enemyManager;
let missionManager;
let scoreSystem;
let gameUI;
let virtualJoystick;

// Estados do jogo
let gameState = 'playing'; // 'playing', 'paused', 'gameover', 'victory'
let gameTime = 0;
let gamePaused = false;

// Input
const keys = {};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    // Canvas
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    // Redimensionar canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Criar objetos do jogo
    player = new Player(gameWidth / 2, gameHeight / 2);
    weaponManager = new WeaponManager(player);
    enemyManager = new EnemyManager();
    missionManager = new MissionManager();
    scoreSystem = new ScoreSystem();
    gameUI = new GameUI(canvas);

    // Joystick virtual para mobile
    if (gameUI.checkMobileDevice()) {
        virtualJoystick = new VirtualJoystick('joystickContainer');
        gameUI.showMobileControls();
    }

    // Configurar controles
    setupControls();
    setupButtonListeners();

    // Iniciar loop do jogo
    gameLoop();
}

function resizeCanvas() {
    const container = canvas.parentElement;
    gameWidth = Math.min(container.clientWidth, window.innerWidth - 2);
    gameHeight = container.clientHeight - 90; // Desconta o HUD

    canvas.width = gameWidth;
    canvas.height = gameHeight;
}

// ===== CONTROLES =====
function setupControls() {
    // Teclado
    document.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;

        // Trocar de arma
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= 4) {
            weaponManager.switchWeapon(keyNum - 1);
        }

        // Pausa
        if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
            togglePause();
        }
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });

    // Mouse
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calcular ângulo para o mouse
        const dx = mouseX - gameWidth / 2;
        const dy = mouseY - gameHeight / 2;
        player.angle = Math.atan2(dy, dx);
    });

    document.addEventListener('click', (e) => {
        if (gameState === 'playing' && !gamePaused) {
            weaponManager.fire(player.x, player.y, player.angle);
        }
    });

    // Toque (mobile)
    canvas.addEventListener('touchstart', (e) => {
        if (gameState === 'playing' && !gamePaused) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;

            const dx = touchX - gameWidth / 2;
            const dy = touchY - gameHeight / 2;
            player.angle = Math.atan2(dy, dx);
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (gameState === 'playing' && !gamePaused) {
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;

            const dx = touchX - gameWidth / 2;
            const dy = touchY - gameHeight / 2;
            player.angle = Math.atan2(dy, dx);
        }
    });
}

function setupButtonListeners() {
    // Botão voltar
    document.getElementById('btnBack')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Botão fullscreen
    document.getElementById('btnFullscreen')?.addEventListener('click', () => {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        }
    });

    // Pausa
    document.getElementById('btnResume')?.addEventListener('click', togglePause);
    document.getElementById('btnRestart')?.addEventListener('click', restartGame);
    document.getElementById('btnHome')?.addEventListener('click', goHome);

    // Game Over
    document.getElementById('btnPlayAgain')?.addEventListener('click', restartGame);
    document.getElementById('btnMainMenu')?.addEventListener('click', goHome);
    document.getElementById('btnMainMenu2')?.addEventListener('click', goHome);

    // Próxima missão
    document.getElementById('btnNextLevel')?.addEventListener('click', nextLevel);

    // Botão de fogo (mobile)
    document.getElementById('btnFire')?.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (gameState === 'playing' && !gamePaused) {
            weaponManager.fire(player.x, player.y, player.angle);
        }
    });
}

// ===== LÓGICA DE ENTRADA =====
function handleInput() {
    if (gamePaused || gameState !== 'playing') return;

    // Movimento
    let moving = false;
    if (keys['w'] || keys['arrowup']) {
        player.move('up');
        moving = true;
    }
    if (keys['s'] || keys['arrowdown']) {
        player.move('down');
        moving = true;
    }
    if (keys['a'] || keys['arrowleft']) {
        player.move('left');
        moving = true;
    }
    if (keys['d'] || keys['arrowright']) {
        player.move('right');
        moving = true;
    }

    if (!moving) {
        player.move('stop');
    }

    // Joystick virtual (mobile)
    if (virtualJoystick) {
        const dir = virtualJoystick.getDirection();
        if (dir.x !== 0 || dir.y !== 0) {
            player.velocityX = dir.x * player.speed;
            player.velocityY = dir.y * player.speed;
        }
    }

    // Tiro contínuo com mouse
    if (keys['mouse']) {
        weaponManager.fire(player.x, player.y, player.angle);
    }

    // Espaço para tiro
    if (keys[' ']) {
        weaponManager.fire(player.x, player.y, player.angle);
    }
}

// ===== ATUALIZAÇÃO DO JOGO =====
function update() {
    if (gameState !== 'playing') return;

    handleInput();

    // Atualizar jogador
    player.update();

    // Atualizar armas
    weaponManager.update();

    // Atualizar inimigos
    enemyManager.update(player);

    // Atualizar pontuação
    scoreSystem.update();

    // Atualizar tempo
    gameTime++;

    // Verificar colisões
    checkCollisions();

    // Verificar vitória
    if (missionManager.isCurrentMissionCompleted()) {
        endGame('victory');
    }

    // Verificar derrota
    if (!player.isAlive) {
        endGame('gameover');
    }
}

// ===== COLISÕES =====
function checkCollisions() {
    // Projéteis do jogador vs inimigos
    const playerBullets = weaponManager.getBullets();
    const enemies = enemyManager.getEnemies();

    playerBullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (checkCircleCollision(bullet.x, bullet.y, 3, enemy.x, enemy.y, enemy.width / 2)) {
                enemy.takeDamage(bullet.damage);
                bullet.active = false;

                if (!enemy.isAlive()) {
                    const points = scoreSystem.addKill(enemy.type);
                    missionManager.updateProgress(1);
                    playSound('kill');
                }
            }
        });
    });

    // Inimigos vs jogador
    enemies.forEach(enemy => {
        if (checkCircleCollision(player.x, player.y, player.width / 2, enemy.x, enemy.y, enemy.width / 2)) {
            player.takeDamage(5);
            playSound('hit');
        }

        // Projéteis inimigos vs jogador
        if (enemy.canShoot()) {
            const bulletData = enemy.shoot();
            if (bulletData) {
                const enemyBullet = new EnemyBullet(
                    bulletData.x,
                    bulletData.y,
                    bulletData.angle,
                    bulletData.damage,
                    bulletData.speed
                );
                // Adicionar à lista de projéteis (seria necessário criar um manager)
            }
        }
    });
}

function checkCircleCollision(x1, y1, r1, x2, y2, r2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
}

// ===== RENDERIZAÇÃO =====
function draw() {
    // Limpar canvas
    ctx.fillStyle = 'rgba(5, 7, 26, 0.8)';
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    // Desenhar fundo de grade
    drawGrid();

    // Desenhar jogo
    if (gameState === 'playing') {
        // Desenhar inimigos
        enemyManager.draw(ctx);

        // Desenhar armas/projéteis
        weaponManager.draw(ctx);

        // Desenhar jogador
        player.draw(ctx);

        // Desenhar UI do canvas
        gameUI.drawOnCanvas(ctx);
    }
}

function drawGrid() {
    const gridSize = 40;
    ctx.strokeStyle = 'rgba(157, 78, 221, 0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x < gameWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, gameHeight);
        ctx.stroke();
    }

    for (let y = 0; y < gameHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(gameWidth, y);
        ctx.stroke();
    }
}

// ===== LOOP PRINCIPAL =====
function gameLoop() {
    update();
    draw();

    // Atualizar HUD
    gameUI.updateHUD(player, weaponManager, missionManager, scoreSystem);

    requestAnimationFrame(gameLoop);
}

// ===== CONTROLE DE JOGO =====
function togglePause() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        gameUI.showPauseMenu();
    } else {
        gameUI.hidePauseMenu();
    }
}

function endGame(type) {
    gameState = type;
    if (type === 'gameover') {
        gameUI.showGameOverMenu(
            scoreSystem.getScore(),
            scoreSystem.killCount,
            Math.floor(gameTime / 60)
        );
        playSound('gameover');
    } else if (type === 'victory') {
        const missionReward = missionManager.getCurrentMission().reward;
        gameUI.showVictoryMenu(scoreSystem.getScore(), missionReward);
        playSound('victory');
    }
}

function restartGame() {
    location.reload();
}

function nextLevel() {
    if (missionManager.nextMission()) {
        gameState = 'playing';
        gamePaused = false;
        gameTime = 0;
        gameUI.hideVictoryMenu();
        missionManager.resetCurrentMission();
        scoreSystem.reset();
        enemyManager.clearAll();
        player.health = player.maxHealth;
    } else {
        // Fim de todas as missões
        goHome();
    }
}

function goHome() {
    window.location.href = 'index.html';
}

// ===== SONS =====
function playSound(type) {
    // Sistema de som básico (sem importar arquivos ainda)
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) return;

    const ctx = new audioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
        case 'kill':
            osc.frequency.value = 800;
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;
        case 'hit':
            osc.frequency.value = 200;
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            break;
        case 'gameover':
            const frequencies = [300, 250, 200];
            frequencies.forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(ctx.destination);
                o.frequency.value = freq;
                g.gain.setValueAtTime(0.1, now + i * 0.1);
                g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
                o.start(now + i * 0.1);
                o.stop(now + i * 0.1 + 0.2);
            });
            break;
        case 'victory':
            const victoryFreqs = [400, 500, 600];
            victoryFreqs.forEach((freq, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(ctx.destination);
                o.frequency.value = freq;
                g.gain.setValueAtTime(0.1, now + i * 0.1);
                g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
                o.start(now + i * 0.1);
                o.stop(now + i * 0.1 + 0.2);
            });
            break;
    }
}

// Suprimir aviso do AudioContext
if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    try {
        new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        // Ignorar erro
    }
}
