/**
 * Classe Player - Representa o jogador
 */
class Player {
    constructor(x, y, width = 40, height = 40) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.health = 100;
        this.maxHealth = 100;
        this.angle = 0; // Ângulo da mira
        this.currentWeapon = 0; // Índice da arma atual
        this.weapons = [];
        this.isAlive = true;
    }

    update() {
        // Movimento
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Limites da tela
        this.x = Math.max(0, Math.min(this.x, gameWidth - this.width));
        this.y = Math.max(0, Math.min(this.y, gameHeight - this.height));
    }

    draw(ctx) {
        // Corpo do jogador
        ctx.fillStyle = '#9D4EDD';
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        // Indicador de direção/mira
        ctx.strokeStyle = '#FFD60A';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const miraX = this.x + Math.cos(this.angle) * 50;
        const miraY = this.y + Math.sin(this.angle) * 50;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(miraX, miraY);
        ctx.stroke();

        // Círculo de colisão (debug)
        if (DEBUG) {
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    move(direction) {
        const moveSpeed = this.speed;
        switch (direction) {
            case 'up':
                this.velocityY = -moveSpeed;
                break;
            case 'down':
                this.velocityY = moveSpeed;
                break;
            case 'left':
                this.velocityX = -moveSpeed;
                break;
            case 'right':
                this.velocityX = moveSpeed;
                break;
            case 'stop':
                this.velocityX = 0;
                this.velocityY = 0;
                break;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
    }

    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
    }

    fire() {
        if (this.weapons.length > 0) {
            const weapon = this.weapons[this.currentWeapon];
            if (weapon) {
                weapon.fire(this.x, this.y, this.angle);
            }
        }
    }

    switchWeapon(index) {
        if (index >= 0 && index < this.weapons.length) {
            this.currentWeapon = index;
        }
    }

    getWeapon() {
        return this.weapons[this.currentWeapon];
    }
}
