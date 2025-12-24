/**
 * Classe Enemy - Representa inimigos
 */
class Enemy {
    constructor(x, y, type = 'basic', width = 30, height = 30) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // 'basic', 'shooter', 'elite', 'boss'
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = type === 'basic' ? 2 : type === 'shooter' ? 1.5 : type === 'elite' ? 2.5 : 1;
        this.health = this.getHealthByType(type);
        this.maxHealth = this.health;
        this.angle = 0;
        this.shootCooldown = 0;
        this.shootInterval = type === 'basic' ? 60 : type === 'shooter' ? 30 : type === 'elite' ? 20 : 10;
        this.detectionRange = 300;
        this.attackRange = 200;
        this.damage = type === 'basic' ? 10 : type === 'shooter' ? 15 : type === 'elite' ? 20 : 30;
        this.points = type === 'basic' ? 100 : type === 'shooter' ? 200 : type === 'elite' ? 500 : 1000;
    }

    getHealthByType(type) {
        const healthMap = {
            'basic': 20,
            'shooter': 30,
            'elite': 50,
            'boss': 200
        };
        return healthMap[type] || 20;
    }

    update(player) {
        // Calcular distância do jogador
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // IA: Perseguir ou Atacar
        if (distance < this.detectionRange) {
            // Normalizar direção
            const dirX = dx / distance;
            const dirY = dy / distance;

            // Ângulo para o jogador
            this.angle = Math.atan2(dy, dx);

            if (distance > this.attackRange) {
                // Mover em direção ao jogador
                this.velocityX = dirX * this.speed;
                this.velocityY = dirY * this.speed;
            } else {
                // Parar e atirar
                this.velocityX = 0;
                this.velocityY = 0;
                this.shootCooldown--;
            }
        } else {
            // Patrulha (movimento aleatório lento)
            if (Math.random() < 0.02) {
                this.velocityX = (Math.random() - 0.5) * this.speed;
                this.velocityY = (Math.random() - 0.5) * this.speed;
            }
        }

        // Aplicar velocidade
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Limites da tela
        this.x = Math.max(0, Math.min(this.x, gameWidth - this.width));
        this.y = Math.max(0, Math.min(this.y, gameHeight - this.height));
    }

    draw(ctx) {
        // Cor por tipo
        const colors = {
            'basic': '#FF006E',
            'shooter': '#FFB703',
            'elite': '#FF4500',
            'boss': '#FF0000'
        };

        ctx.fillStyle = colors[this.type];
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        // Barra de vida
        this.drawHealthBar(ctx);

        // Indicador de tipo (para o boss)
        if (this.type === 'boss') {
            ctx.strokeStyle = '#FF0000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2 + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    drawHealthBar(ctx) {
        const barWidth = this.width + 10;
        const barHeight = 4;
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.height / 2 - 10;

        // Fundo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Preenchimento
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = healthPercent > 0.5 ? '#00FF41' : healthPercent > 0.25 ? '#FFB703' : '#FF0000';
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

        // Borda
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    canShoot() {
        return this.shootCooldown <= 0;
    }

    shoot() {
        if (this.canShoot()) {
            this.shootCooldown = this.shootInterval;
            return {
                x: this.x,
                y: this.y,
                angle: this.angle,
                damage: this.damage,
                speed: 4
            };
        }
        return null;
    }

    isAlive() {
        return this.health > 0;
    }
}

/**
 * Classe para gerenciar inimigos
 */
class EnemyManager {
    constructor() {
        this.enemies = [];
        this.spawnCooldown = 0;
        this.spawnInterval = 120; // Frames entre spawns
        this.maxEnemies = 10;
        this.waveCount = 0;
    }

    update(player) {
        // Atualizar inimigos existentes
        this.enemies.forEach(enemy => {
            enemy.update(player);
        });

        // Remover inimigos mortos
        this.enemies = this.enemies.filter(e => e.isAlive());

        // Spawnar novos inimigos
        this.spawnCooldown--;
        if (this.spawnCooldown <= 0 && this.enemies.length < this.maxEnemies) {
            this.spawn();
            this.spawnCooldown = this.spawnInterval;
        }
    }

    spawn() {
        const side = Math.floor(Math.random() * 4);
        let x, y;

        switch (side) {
            case 0: // Top
                x = Math.random() * gameWidth;
                y = -20;
                break;
            case 1: // Right
                x = gameWidth + 20;
                y = Math.random() * gameHeight;
                break;
            case 2: // Bottom
                x = Math.random() * gameWidth;
                y = gameHeight + 20;
                break;
            case 3: // Left
                x = -20;
                y = Math.random() * gameHeight;
                break;
        }

        // Tipo aleatório de inimigo
        const types = ['basic', 'basic', 'basic', 'shooter', 'elite'];
        const type = types[Math.floor(Math.random() * types.length)];

        const enemy = new Enemy(x, y, type);
        this.enemies.push(enemy);
    }

    draw(ctx) {
        this.enemies.forEach(enemy => enemy.draw(ctx));
    }

    getEnemies() {
        return this.enemies;
    }

    clearAll() {
        this.enemies = [];
    }

    increaseWave() {
        this.waveCount++;
        this.maxEnemies = Math.min(10 + this.waveCount * 2, 20);
        this.spawnInterval = Math.max(60, 120 - this.waveCount * 10);
    }
}
