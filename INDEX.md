# 📑 Índice Completo - CrazyGames

## 🎮 Projeto de Jogos de Tiro Online

---

## 📁 Estrutura de Arquivos

### 📄 Arquivos HTML
| Arquivo | Linhas | Descrição |
|---------|--------|-----------|
| `index.html` | 540 | Página inicial com grid de jogos |
| `jogo.html` | 110 | Página do jogo com canvas |
| `testes.html` | 300 | Testes de compatibilidade |
| `gerare_imagens.html` | 150 | Gerador de imagens para jogos |

### 🎨 Arquivos CSS
| Arquivo | Linhas | Descrição |
|---------|--------|-----------|
| `css/style.css` | 650 | Estilos da página inicial |
| `css/game.css` | 500 | Estilos da página do jogo |

### ⚙️ Arquivos JavaScript
| Arquivo | Linhas | Descrição |
|---------|--------|-----------|
| `js/main.js` | 80 | Lógica da página inicial |
| `js/game.js` | 450 | Loop principal do jogo |
| `js/player.js` | 100 | Classe do jogador |
| `js/enemy.js` | 230 | Classe dos inimigos |
| `js/weapons.js` | 320 | Sistema de armas |
| `js/missions.js` | 270 | Sistema de missões |
| `js/ui.js` | 290 | Interface e controles |

### 📚 Documentação
| Arquivo | Linhas | Descrição |
|---------|--------|-----------|
| `README.md` | 350 | Documentação completa |
| `DEPLOYMENT.md` | 300 | Guia de publicação |
| `QUICKSTART.md` | 200 | Início rápido |
| `CHANGELOG.md` | 400 | Histórico de versões |
| `CUSTOMIZATION.md` | 450 | Guia de customização |
| `SUMMARY.md` | 350 | Sumário do projeto |
| `package.json` | 40 | Metadados do projeto |
| `.gitignore` | 50 | Configuração do Git |

---

## 🔍 Encontrar Recursos Específicos

### Por Funcionalidade

#### Movimento do Jogador
- Arquivo: `js/player.js`
- Classe: `Player`
- Método: `move()`

#### Inimigos e IA
- Arquivo: `js/enemy.js`
- Classes: `Enemy`, `EnemyManager`
- Métodos: `update()`, `shoot()`

#### Sistema de Armas
- Arquivo: `js/weapons.js`
- Classes: `Weapon`, `WeaponManager`, `EnemyBulletManager`
- Métodos: `fire()`, `reload()`

#### Sistema de Missões
- Arquivo: `js/missions.js`
- Classes: `Mission`, `MissionManager`, `WaveSystem`, `ScoreSystem`
- Métodos: `updateProgress()`, `nextMission()`

#### Interface do Jogo
- Arquivo: `js/ui.js`
- Classes: `GameUI`, `VirtualJoystick`
- Métodos: `updateHUD()`, `showPauseMenu()`

#### Lógica Principal
- Arquivo: `js/game.js`
- Funções principais: `gameLoop()`, `update()`, `draw()`, `checkCollisions()`

#### Estilização
- Arquivo: `css/style.css` (página inicial)
- Arquivo: `css/game.css` (jogo)

### Por Tema

#### Cores (Theme)
- Arquivo: `css/style.css` linhas 1-20
- Arquivo: `css/game.css` linhas 1-20
- CSS Variables: `:root { --primary-color: ... }`

#### Responsividade Mobile
- Arquivo: `css/style.css` linhas 600-650
- Arquivo: `css/game.css` linhas 450-500
- Arquivo: `js/ui.js` classes `VirtualJoystick`

#### Controles
- Arquivo: `js/game.js` função `setupControls()`
- Arquivo: `js/ui.js` classe `VirtualJoystick`

#### Som
- Arquivo: `js/game.js` função `playSound()`
- API: Web Audio API (sem dependências)

#### Persistência de Dados
- Arquivo: `js/main.js` objeto `gameStorage`
- API: LocalStorage (navegador)

---

## 🎯 Guias por Caso de Uso

### Quero mudar cores
→ Veja `CUSTOMIZATION.md` - Seção "Mudança de Cores"
→ Edite `css/style.css` linhas 1-20

### Quero aumentar dificuldade
→ Veja `CUSTOMIZATION.md` - Seção "Mudança de Dificuldade"
→ Edite `js/enemy.js` linhas 1-20

### Quero adicionar novo jogo
→ Veja `CUSTOMIZATION.md` - Seção "Adicionar Novo Jogo"
→ Edite `index.html` e `js/game.js`

### Quero publicar online
→ Veja `DEPLOYMENT.md`
→ Escolha: GitHub Pages, Netlify ou Vercel

### Quero entender como funciona
→ Veja `README.md` - Seção "Classes Principais"
→ Comece por `js/game.js` - função `gameLoop()`

### Quero testar compatibilidade
→ Abra `testes.html`
→ Execute testes no seu navegador

### Quero adicionar sons customizados
→ Veja `CUSTOMIZATION.md` - Seção "Adicionar Sons Customizados"
→ Edite `js/game.js` função `playSound()`

### Quero criar novas armas
→ Veja `CUSTOMIZATION.md` - Seção "Criar Nova Arma"
→ Edite `js/weapons.js` classe `WeaponManager`

### Quero adicionar novas missões
→ Veja `CUSTOMIZATION.md` - Seção "Criar Nova Missão"
→ Edite `js/missions.js` classe `MissionManager`

---

## 📊 Índice de Classes

### Classe Player (`js/player.js`)
- Construtor: `Player(x, y, width, height)`
- Métodos principais:
  - `update()` - Atualizar posição
  - `draw(ctx)` - Renderizar
  - `move(direction)` - Mover
  - `fire()` - Atirar
  - `takeDamage(damage)` - Receber dano

### Classe Enemy (`js/enemy.js`)
- Construtor: `Enemy(x, y, type, width, height)`
- Tipos: `'basic'`, `'shooter'`, `'elite'`, `'boss'`
- Métodos principais:
  - `update(player)` - IA e movimento
  - `draw(ctx)` - Renderizar
  - `shoot()` - Atirar
  - `takeDamage(damage)` - Receber dano

### Classe Weapon (`js/weapons.js`)
- Construtor: `Weapon(name, damage, fireRate, ammo, maxAmmo, range, speed)`
- Métodos principais:
  - `fire(x, y, angle)` - Disparar
  - `update()` - Atualizar projéteis
  - `reload(amount)` - Recarregar

### Classe Mission (`js/missions.js`)
- Construtor: `Mission(id, title, description, objective, reward)`
- Métodos principais:
  - `updateProgress(amount)` - Atualizar progresso
  - `isCompleted()` - Verificar conclusão

### Classe GameUI (`js/ui.js`)
- Construtor: `GameUI(canvas)`
- Métodos principais:
  - `updateHUD(...)` - Atualizar HUD
  - `showPauseMenu()` - Mostrar pausa
  - `showGameOverMenu()` - Mostrar derrota

### Classe VirtualJoystick (`js/ui.js`)
- Construtor: `VirtualJoystick(containerId)`
- Métodos principais:
  - `setupEventListeners()` - Configurar touch
  - `getDirection()` - Obter direção

---

## 🔑 Funções Principais de game.js

| Função | Descrição |
|--------|-----------|
| `initializeGame()` | Inicializar jogo |
| `gameLoop()` | Loop principal (60 FPS) |
| `update()` | Atualizar lógica |
| `draw()` | Renderizar |
| `checkCollisions()` | Detectar colisões |
| `handleInput()` | Processar entrada |
| `togglePause()` | Pausar/Retomar |
| `endGame(type)` | Encerrar jogo |
| `playSound(type)` | Reproduzir som |

---

## 📖 Fluxo de Execução

```
1. Abrir index.html
   ↓
2. Carregar CSS e JS
   ↓
3. Executar main.js
   ↓
4. Clicar em "Jogar"
   ↓
5. Redirecionar para jogo.html
   ↓
6. Executar game.js
   ↓
7. initializeGame()
   ├─ Criar Player
   ├─ Criar WeaponManager
   ├─ Criar EnemyManager
   ├─ Criar MissionManager
   └─ Iniciar gameLoop()
   ↓
8. gameLoop() contínuo (60 FPS)
   ├─ update() - atualizar lógica
   ├─ draw() - renderizar
   ├─ updateHUD() - atualizar interface
   └─ requestAnimationFrame() - próximo frame
   ↓
9. Ao pressionar ESC
   └─ togglePause()
   ↓
10. Ao morrer/completar missão
    └─ endGame()
    ├─ Mostrar overlay
    └─ Esperar botão
    ↓
11. Ao clicar "Voltar"
    └─ location.href = 'index.html'
```

---

## 🧪 Como Testar

### Teste de Funcionalidade
1. Abra `index.html`
2. Clique em "Jogar"
3. Verifique:
   - [ ] Controles funcionam (WASD ou joystick)
   - [ ] Atirar funciona (Click ou toque)
   - [ ] Inimigos aparecem
   - [ ] Dano funciona
   - [ ] Pausa funciona
   - [ ] HUD atualiza

### Teste de Compatibilidade
1. Abra `testes.html`
2. Verifique relatório
3. Deve passar em 95%+ dos testes

### Teste de Performance
1. Abra `jogo.html`
2. Abra DevTools (F12)
3. Vá para "Performance"
4. Gravue video
5. Verifique FPS (deve estar 60)

### Teste de Responsividade
1. Abra DevTools (F12)
2. Ative "Toggle device toolbar"
3. Teste em diferentes tamanhos:
   - iPhone (375x667)
   - iPad (768x1024)
   - Desktop (1920x1080)

---

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Jogo não carrega | Verifique console (F12) |
| Controles não funcionam | Clique no canvas primeiro |
| Sem som | Verifique volume, teste em outro navegador |
| Canvas quebrado | Verifique suporte WebGL |
| Lento em mobile | Reduza maxEnemies em enemy.js |
| Imagens não aparecem | Verifique path em assets/images |

---

## 📞 Suporte Rápido

- **Erro de sintaxe?** → Abra `testes.html`
- **Não sabe como editar?** → Veja `CUSTOMIZATION.md`
- **Quer publicar?** → Veja `DEPLOYMENT.md`
- **Primeira vez?** → Veja `QUICKSTART.md`
- **Documentação completa?** → Veja `README.md`

---

## ✨ Próximos Passos

1. **Explore o código** - Comece por `js/game.js`
2. **Customize** - Mude cores, dificuldade, etc
3. **Teste** - Abra `testes.html` e `jogo.html`
4. **Publique** - Siga `DEPLOYMENT.md`
5. **Compartilhe** - Mostre para amigos!

---

**Versão:** 1.0.0  
**Data:** 13 de Dezembro de 2025  
**Status:** ✅ Completo e Documentado  

---

🎮 **Pronto para dominar CrazyGames? Bom jogo!**
