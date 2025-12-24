# 🎨 Guia de Customização - CrazyGames

## Personalize Seu Site de Jogos!

Este guia mostra como customizar cores, dificuldade, conteúdo e mais.

---

## 🎨 Mudança de Cores

### Opção 1: Via CSS Variables (Recomendado)

Edite `css/style.css` e `css/game.css`:

```css
:root {
    /* Roxo primário */
    --primary-color: #9D4EDD;
    --primary-dark: #7209B7;
    
    /* Cores secundárias */
    --secondary-color: #FF006E; /* Rosa */
    --accent-color: #FFD60A;    /* Amarelo */
    
    /* Fundos */
    --bg-dark: #0A0E27;
    --bg-darker: #05071A;
    --bg-card: #1A1F3A;
    
    /* Textos */
    --text-primary: #FFFFFF;
    --text-secondary: #B8BFDB;
    
    /* Bordas */
    --border-color: #2D3561;
    
    /* Status */
    --success: #00FF41;
    --danger: #FF0041;
    --warning: #FFB703;
}
```

### Tema Exemplos

**Tema Neon (Cyberpunk)**
```css
--primary-color: #00FF41;        /* Verde neon */
--secondary-color: #FF0080;      /* Magenta */
--accent-color: #00FFFF;         /* Cyan */
--bg-dark: #0a0010;
```

**Tema Fogo (Hot)**
```css
--primary-color: #FF4500;        /* Laranja escuro */
--secondary-color: #FF0000;      /* Vermelho */
--accent-color: #FFD700;         /* Ouro */
--bg-dark: #1a0000;
```

**Tema Água (Cool)**
```css
--primary-color: #0080FF;        /* Azul brilhante */
--secondary-color: #00D4FF;      /* Ciano */
--accent-color: #FFFFFF;         /* Branco */
--bg-dark: #000033;
```

**Tema Roxo (Padrão)**
```css
--primary-color: #9D4EDD;        /* Roxo */
--secondary-color: #FF006E;      /* Rosa */
--accent-color: #FFD60A;         /* Amarelo */
--bg-dark: #0A0E27;
```

---

## 🎮 Mudança de Dificuldade

### Editar Velocidade dos Inimigos

Em `js/enemy.js`, procure a classe `Enemy`:

```javascript
// Velocidade padrão
this.speed = type === 'basic' ? 2 : type === 'shooter' ? 1.5 : type === 'elite' ? 2.5 : 1;

// Aumentar dificuldade (x2)
this.speed = type === 'basic' ? 4 : type === 'shooter' ? 3 : type === 'elite' ? 5 : 2;

// Diminuir dificuldade (÷2)
this.speed = type === 'basic' ? 1 : type === 'shooter' ? 0.75 : type === 'elite' ? 1.25 : 0.5;
```

### Editar Dano dos Inimigos

```javascript
// Dano padrão
this.damage = type === 'basic' ? 10 : type === 'shooter' ? 15 : type === 'elite' ? 20 : 30;

// Mais fácil (÷2)
this.damage = type === 'basic' ? 5 : type === 'shooter' ? 7 : type === 'elite' ? 10 : 15;

// Mais difícil (x1.5)
this.damage = type === 'basic' ? 15 : type === 'shooter' ? 22 : type === 'elite' ? 30 : 45;
```

### Editar Número Máximo de Inimigos

Em `js/enemy.js`, classe `EnemyManager`:

```javascript
// Padrão (10 inimigos)
this.maxEnemies = 10;

// Mais inimigos
this.maxEnemies = 20; // Ou 15, 25, etc.

// Menos inimigos
this.maxEnemies = 5;
```

### Editar Intervalo de Spawn

```javascript
// Padrão (2 segundos entre spawns)
this.spawnInterval = 120; // 120 frames = 2s em 60 FPS

// Spawn mais rápido (1 segundo)
this.spawnInterval = 60;

// Spawn mais lento (5 segundos)
this.spawnInterval = 300;
```

---

## 💥 Mudança de Armas

### Editar Arma Padrão

Em `js/game.js`, função `initializeGame()`:

```javascript
// Adicionar munição extra
const weapon = weaponManager.getCurrentWeapon();
weapon.ammo = 100;
```

### Criar Nova Arma

Em `js/weapons.js`, classe `WeaponManager`:

```javascript
initializeWeapons() {
    // ... armas existentes ...
    
    // Nova arma: Laser
    this.addWeapon(new Weapon(
        'Laser',        // Nome
        75,             // Dano
        45,             // Fire Rate
        15,             // Munição
        15,             // Max Ammo
        800,            // Range
        14              // Speed
    ));
}
```

### Editar Características de Armas Existentes

```javascript
// Pistola mais poderosa
new Weapon('Pistola', 20, 15, 30, 30, 400, 8); // Dano 20 (era 10)

// Rifle com mais munição
new Weapon('Rifle', 25, 30, 50, 50, 600, 10); // Max ammo 50 (era 20)

// Sniper mais rápido
new Weapon('Sniper', 50, 30, 10, 10, 1000, 12); // Fire rate 30 (era 60)
```

---

## 👾 Customização de Inimigos

### Adicionar Novo Tipo de Inimigo

Em `js/enemy.js`:

```javascript
// Na classe Enemy, adicione um novo tipo
getHealthByType(type) {
    const healthMap = {
        'basic': 20,
        'shooter': 30,
        'elite': 50,
        'boss': 200,
        'tank': 150  // Novo tipo!
    };
    return healthMap[type] || 20;
}

// E na função draw():
const colors = {
    'basic': '#FF006E',
    'shooter': '#FFB703',
    'elite': '#FF4500',
    'boss': '#FF0000',
    'tank': '#008000'  // Verde para tank
};
```

### Editar Cores dos Inimigos

No método `draw()` da classe `Enemy`:

```javascript
const colors = {
    'basic': '#00FF41',      // Verde
    'shooter': '#FFFF00',    // Amarelo
    'elite': '#FF8800',      // Laranja
    'boss': '#FF00FF'        // Magenta
};
```

---

## 📝 Mudança de Missões

### Criar Nova Missão

Em `js/missions.js`, classe `MissionManager`:

```javascript
initializeMissions() {
    this.missions = [
        // ... missões existentes ...
        
        new Mission(
            6,
            'Destruidor de Elites',      // Título
            'Elimine 10 inimigos Elite', // Descrição
            10,                          // Objetivo
            3000                         // Pontos de recompensa
        )
    ];
}
```

### Editar Missão Existente

```javascript
new Mission(
    1,
    'Novo Título',           // Mude aqui
    'Nova descrição',        // Mude aqui
    15,                      // Mude objetivo
    750                      // Mude recompensa
)
```

---

## 🎮 Adicionar Novo Jogo

### Step 1: Criar URL Query

Em `js/main.js`:

```javascript
function playGame(gameId) {
    // gameId pode ser 'sniper-mission', 'meu-novo-jogo', etc
    window.location.href = `jogo.html?game=${gameId}`;
}
```

### Step 2: Adicionar Card na Página Inicial

Em `index.html`:

```html
<!-- Card 7: Meu Novo Jogo -->
<div class="game-card" data-game="meu-novo-jogo">
    <div class="game-image">
        <img src="assets/images/meu-novo-jogo.jpg" alt="Meu Novo Jogo">
        <div class="game-overlay">
            <button class="btn-play">Jogar</button>
        </div>
    </div>
    <div class="game-info">
        <h3>Meu Novo Jogo</h3>
        <p class="game-category">Tiro</p>
        <div class="game-stats">
            <span>⭐ 4.9</span>
            <span>👥 10K</span>
        </div>
    </div>
</div>
```

### Step 3: Detectar Jogo em game.js

```javascript
// No início de game.js
function getGameConfig() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');
    
    // Configurar por jogo
    if (gameId === 'meu-novo-jogo') {
        return {
            title: 'Meu Novo Jogo',
            difficulty: 1.2,
            maxEnemies: 15
        };
    }
    // ... outros jogos ...
}
```

---

## 🖼️ Adicionar Imagens Personalizadas

### Gerar Imagens

Use `gerare_imagens.html` para criar imagens base, depois:

1. Abra em navegador
2. Clique "Gerar Imagens"
3. Salve em `assets/images/`

### Adicionar Imagens Customizadas

```bash
# Copiar suas imagens para:
assets/
├── images/
│   ├── sniper-mission.jpg
│   ├── pew-pew-dose.jpg
│   ├── seu-jogo.jpg
│   └── ... outras imagens
```

### Tamanhos Recomendados

- **Cards de Jogo:** 400x224px (16:9)
- **Banner:** 1200x300px
- **Logo:** 200x60px

---

## 🔊 Adicionar Sons Customizados

### Web Audio API (Sem Arquivos)

Sons já estão implementados via Web Audio API em `js/game.js`:

```javascript
function playSound(type) {
    // Sons já estão aqui!
    // Não precisa de arquivos externos
}
```

### Adicionar Novo Som

```javascript
function playSound(type) {
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) return;
    
    const ctx = new audioContext();
    const now = ctx.currentTime;
    
    if (type === 'novo-som') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = 600; // Frequência em Hz
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);
    }
}
```

---

## 📱 Ajustar para Mobile

### Alterar Tamanho do Joystick

Em `css/game.css`:

```css
.joystick-container {
    width: 120px;  /* Aumentar para 150px se preferir maior */
    height: 120px;
}
```

### Alterar Tamanho do Botão de Fogo

```css
.btn-fire {
    max-width: 150px; /* Aumentar tamanho do botão */
    padding: 1.5rem;  /* Mais preenchimento */
}
```

### Ajustar Sensibilidade do Joystick

Em `js/ui.js`, classe `VirtualJoystick`:

```javascript
this.maxDistance = 40; // Aumentar para 60 se quiser mais sensível
```

---

## ⚙️ Configurações Avançadas

### Debug Mode

Em `js/game.js`:

```javascript
const DEBUG = true; // Mostrar hitboxes

// Isso vai desenhar:
// - Círculos de colisão
// - Grid de fundo
// - Informações de debug
```

### Aumentar FPS

```javascript
// gameLoop já usa requestAnimationFrame (60 FPS)
// Para 120 FPS, seria necessário alterações maiores
```

### Alterar Velocidade do Jogo

```javascript
// Em game.js, dentro do gameLoop:
function gameLoop() {
    update();
    update();  // Rodar update 2x = 2x mais rápido
    draw();
    requestAnimationFrame(gameLoop);
}
```

---

## 🌐 Customizações de Interface

### Mudar Logo

Em `index.html` e `jogo.html`:

```html
<!-- Substituir emoji -->
<span class="logo-icon">🎮</span>

<!-- Por outro emoji ou texto -->
<span class="logo-icon">🔫</span>
```

### Mudar Nome do Site

```html
<span class="logo-text">CRAZY GAMES</span>
<!-- Para -->
<span class="logo-text">MEU JOGO</span>
```

### Mudar Textos do HUD

Em `jogo.html`:

```html
<label>VIDA:</label>  <!-- Mude para "SAÚDE" ou "HP" -->
<label>MUNIÇÃO:</label>  <!-- Mude para "AMMO" -->
```

---

## 📊 Dicas de Performance

### Reduzir Qualidade Gráfica

```javascript
// Remover grid de fundo
function drawGrid() {
    // Comentar todo o código
}

// Reduzir efeitos visuais
// Remover animações desnecessárias
```

### Otimizar para Dispositivos Lentos

```javascript
// Reduzir número de inimigos
this.maxEnemies = 5; // ao invés de 10

// Reduzir taxa de spawn
this.spawnInterval = 180; // ao invés de 120
```

---

## ✅ Checklist de Customização

- [ ] Mudei as cores?
- [ ] Ajustei a dificuldade?
- [ ] Criei novas armas?
- [ ] Editei as missões?
- [ ] Adicionei imagens?
- [ ] Testei em mobile?
- [ ] Testei performance?
- [ ] Verifiquei console (F12)?

---

## 🚀 Pronto!

Seu site de jogos está customizado! Agora:

1. Teste localmente
2. Verifique em diferentes navegadores
3. Deploy para Netlify/Vercel
4. Compartilhe com amigos!

---

**Divirta-se customizando! 🎨🎮**
