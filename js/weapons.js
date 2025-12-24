/**
 * Classe Weapon - Representa armas
 */
class Weapon {
    constructor(name, damage, fireRate, ammo, maxAmmo, range, speed) {
        this.name = name;
        this.damage = damage;
        this.fireRate = fireRate; // Frames entre tiros
        this.ammo = ammo;
        this.maxAmmo = maxAmmo;
        this.range = range;
        this.speed = speed; // Velocidade dos projéteis
        this.cooldown = 0;
        this.bullets = [];
    }

    fire(x, y, angle) {
        if (this.ammo > 0 && this.cooldown <= 0) {
            this.ammo--;
            this.cooldown = this.fireRate;

            // Criar projétil
            const bullet = {
                x: x,
                y: y,
                vx: Math.cos(angle) * this.speed,
                vy: Math.sin(angle) * this.speed,
                damage: this.damage,
                range: this.range,
                distanceTraveled: 0,
                active: true
            };

            this.bullets.push(bullet);
            return true;
        }
        return false;
    }

    update() {
        this.cooldown--;

        // Atualizar projéteis
        this.bullets.forEach(bullet => {
            if (bullet.active) {
                bullet.x += bullet.vx;
                bullet.y += bullet.vy;
                bullet.distanceTraveled += Math.sqrt(bullet.vx * bullet.vx + bullet.vy * bullet.vy);

                // Remover projéteis fora de alcance ou da tela
                if (
                    bullet.distanceTraveled > bullet.range ||
                    bullet.x < 0 || bullet.x > gameWidth ||
                    bullet.y < 0 || bullet.y > gameHeight
                ) {
                    bullet.active = false;
                }
            }
        });

        // Remover projéteis inativos
        this.bullets = this.bullets.filter(b => b.active);
    }

    draw(ctx) {
        this.bullets.forEach(bullet => {
            // Projétil
            ctx.fillStyle = '#FFD60A';
            ctx.beginPath();
            ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
            ctx.fill();

            // Trilho (para armas de fogo)
            ctx.strokeStyle = 'rgba(255, 214, 10, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(bullet.x - bullet.vx * 5, bullet.y - bullet.vy * 5);
            ctx.lineTo(bullet.x, bullet.y);
            ctx.stroke();
        });
    }

    reload(amount = this.maxAmmo) {
        this.ammo = Math.min(this.ammo + amount, this.maxAmmo);
    }

    getAmmoPercent() {
        return (this.ammo / this.maxAmmo) * 100;
    }
}

/**
 * Classe para gerenciar armas do jogador
 */
class WeaponManager {
    constructor(player) {
        this.weapons = [];
        this.currentWeapon = 0;
        this.initializeWeapons();
    }

    initializeWeapons() {
        // Pistola
        this.addWeapon(new Weapon(
            'Pistola',
            10,
            15, // fireRate
            30,
            30, // ammo
            400, // range
            8 // speed
        ));

        // Rifle
        this.addWeapon(new Weapon(
            'Rifle',
            25,
            30,
            20,
            20,
            600,
            10
        ));

        // Sniper
        this.addWeapon(new Weapon(
            'Sniper',
            50,
            60,
            10,
            10,
            1000,
            12
        ));

        // Metralhadora
        this.addWeapon(new Weapon(
            'Metralhadora',
            5,
            5,
            100,
            100,
            300,
            7
        ));
    }

    addWeapon(weapon) {
        this.weapons.push(weapon);
    }

    getCurrentWeapon() {
        return this.weapons[this.currentWeapon];
    }

    switchWeapon(index) {
        if (index >= 0 && index < this.weapons.length) {
            this.currentWeapon = index;
        }
    }

    fire(x, y, angle) {
        const weapon = this.getCurrentWeapon();
        return weapon.fire(x, y, angle);
    }

    update() {
        this.weapons.forEach(weapon => weapon.update());
    }

    draw(ctx) {
        this.weapons.forEach(weapon => weapon.draw(ctx));
    }

    getBullets() {
        return this.weapons.flatMap(w => w.bullets);
    }

    // Adicionar munição
    addAmmo(amount) {
        const weapon = this.getCurrentWeapon();
        weapon.reload(amount);
    }

    // Obter informações da arma atual
    getWeaponInfo() {
        const weapon = this.getCurrentWeapon();
        return {
            name: weapon.name,
            ammo: weapon.ammo,
            maxAmmo: weapon.maxAmmo
        };
    }
}

/**
 * Classe para projéteis inimigos
 */
class EnemyBullet {
    constructor(x, y, angle, damage, speed) {
        this.x = x;
        this.y = y;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.damage = damage;
        this.active = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Remover se sair da tela
        if (this.x < 0 || this.x > gameWidth || this.y < 0 || this.y > gameHeight) {
            this.active = false;
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#FF006E';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    isAlive() {
        return this.active;
    }
}

/**
 * Classe para gerenciar projéteis inimigos
 */
class EnemyBulletManager {
    constructor() {
        this.bullets = [];
    }

    add(bullet) {
        this.bullets.push(bullet);
    }

    update() {
        this.bullets.forEach(bullet => bullet.update());
        this.bullets = this.bullets.filter(b => b.isAlive());
    }

    draw(ctx) {
        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    getBullets() {
        return this.bullets;
    }

    clear() {
        this.bullets = [];
    }
}
