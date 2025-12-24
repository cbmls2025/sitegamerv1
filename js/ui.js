/**
 * Sistema de UI do jogo
 */
class GameUI {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    updateHUD(player, weaponManager, missionManager, scoreSystem) {
        // Atualizar barra de vida
        const healthPercent = (player.health / player.maxHealth) * 100;
        const healthBar = document.getElementById('healthBar');
        const healthText = document.getElementById('healthText');
        
        if (healthBar) {
            healthBar.style.width = healthPercent + '%';
        }
        if (healthText) {
            healthText.textContent = `${Math.floor(player.health)}/${player.maxHealth}`;
        }

        // Atualizar munição
        const weaponInfo = weaponManager.getWeaponInfo();
        const ammoText = document.getElementById('ammoText');
        if (ammoText) {
            ammoText.textContent = `${weaponInfo.ammo}/${weaponInfo.maxAmmo}`;
        }

        // Atualizar pontos
        const scoreText = document.getElementById('scoreText');
        if (scoreText) {
            scoreText.textContent = scoreSystem.getScore();
        }

        // Atualizar missão
        const missionInfo = missionManager.getMissionInfo();
        if (missionInfo) {
            const missionTitle = document.getElementById('missionTitle');
            const missionDesc = document.getElementById('missionDesc');
            const missionProgress = document.getElementById('missionProgress');
            const progressText = document.getElementById('progressText');

            if (missionTitle) missionTitle.textContent = missionInfo.title;
            if (missionDesc) missionDesc.textContent = missionInfo.description;
            if (missionProgress) missionProgress.style.width = missionInfo.percent + '%';
            if (progressText) progressText.textContent = `${missionInfo.progress}/${missionInfo.objective}`;
        }
    }

    showPauseMenu() {
        const overlay = document.getElementById('pauseOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hidePauseMenu() {
        const overlay = document.getElementById('pauseOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    showGameOverMenu(score, killCount, time) {
        const overlay = document.getElementById('gameoverOverlay');
        const finalScore = document.getElementById('finalScore');
        const enemiesKilled = document.getElementById('enemiesKilled');
        const finalTime = document.getElementById('finalTime');

        if (finalScore) finalScore.textContent = score;
        if (enemiesKilled) enemiesKilled.textContent = killCount;
        if (finalTime) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            finalTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideGameOverMenu() {
        const overlay = document.getElementById('gameoverOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    showVictoryMenu(score, bonus) {
        const overlay = document.getElementById('victoryOverlay');
        const victoryScore = document.getElementById('victoryScore');
        const victoryBonus = document.getElementById('victoryBonus');

        if (victoryScore) victoryScore.textContent = score;
        if (victoryBonus) victoryBonus.textContent = bonus;

        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideVictoryMenu() {
        const overlay = document.getElementById('victoryOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    drawOnCanvas(ctx) {
        // Desenhar crosshair (mira) no centro
        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;

        ctx.strokeStyle = 'rgba(157, 78, 221, 0.5)';
        ctx.lineWidth = 2;

        // Linhas horizontais
        ctx.beginPath();
        ctx.moveTo(centerX - 20, centerY);
        ctx.lineTo(centerX - 35, centerY);
        ctx.moveTo(centerX + 20, centerY);
        ctx.lineTo(centerX + 35, centerY);
        ctx.stroke();

        // Linhas verticais
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 20);
        ctx.lineTo(centerX, centerY - 35);
        ctx.moveTo(centerX, centerY + 20);
        ctx.lineTo(centerX, centerY + 35);
        ctx.stroke();

        // Ponto central
        ctx.fillStyle = 'rgba(157, 78, 221, 0.7)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    checkMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    showMobileControls() {
        const controls = document.getElementById('mobileControls');
        if (controls && this.checkMobileDevice()) {
            controls.style.display = 'flex';
        }
    }

    hideMobileControls() {
        const controls = document.getElementById('mobileControls');
        if (controls) {
            controls.style.display = 'none';
        }
    }
}

/**
 * Sistema de joystick virtual para mobile
 */
class VirtualJoystick {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.stick = document.getElementById('joystickStick');
        this.isPressed = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.maxDistance = 40; // Raio máximo

        if (this.container && this.stick) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.container.addEventListener('touchstart', (e) => this.onStart(e));
        this.container.addEventListener('touchmove', (e) => this.onMove(e));
        this.container.addEventListener('touchend', (e) => this.onEnd(e));
    }

    onStart(e) {
        this.isPressed = true;
        const touch = e.touches[0];
        const rect = this.container.getBoundingClientRect();
        this.startX = touch.clientX - rect.left - rect.width / 2;
        this.startY = touch.clientY - rect.top - rect.height / 2;
    }

    onMove(e) {
        if (!this.isPressed) return;

        const touch = e.touches[0];
        const rect = this.container.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;

        const distance = Math.sqrt(x * x + y * y);
        if (distance > this.maxDistance) {
            this.currentX = (x / distance) * this.maxDistance;
            this.currentY = (y / distance) * this.maxDistance;
        } else {
            this.currentX = x;
            this.currentY = y;
        }

        // Atualizar posição visual do stick
        if (this.stick) {
            this.stick.style.transform = `translate(calc(-50% + ${this.currentX}px), calc(-50% + ${this.currentY}px))`;
        }
    }

    onEnd(e) {
        this.isPressed = false;
        this.currentX = 0;
        this.currentY = 0;
        if (this.stick) {
            this.stick.style.transform = 'translate(-50%, -50%)';
        }
    }

    getDirection() {
        const distance = Math.sqrt(this.currentX * this.currentX + this.currentY * this.currentY);
        if (distance === 0) return { x: 0, y: 0 };

        return {
            x: this.currentX / this.maxDistance,
            y: this.currentY / this.maxDistance
        };
    }
}
