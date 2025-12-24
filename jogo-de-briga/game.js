// Main game loop and logic
(function(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const startBtn = document.getElementById('startBtn');
  const modeSelect = document.getElementById('modeSelect');
  const p1HealthEl = document.getElementById('p1Health');
  const p2HealthEl = document.getElementById('p2Health');
  const centerMsg = document.getElementById('centerMsg');

  let W = canvas.width;
  let H = canvas.height;
  let floorY = H - 40;

  let player1, player2;
  let gravity = 0.6;
  let running = false;
  let mode = 'ai';
  let frameCount = 0;

  function resizeCanvas(){
    // keep logical size fixed for simplicity
    const rect = canvas.getBoundingClientRect();
    W = canvas.width;
    H = canvas.height;
    floorY = H - 40;
  }

  function reset(){
    player1 = new Character({x:120,y:floorY-80,color:'#ff6b6b',name:'P1',facing:1});
    player2 = new Character({x:W-200,y:floorY-80,color:'#4da6ff',name:'P2',facing:-1});
    player1.health = 100; player2.health = 100;
    frameCount = 0;
    centerMsg.textContent = '';
  }

  function start(){
    mode = modeSelect.value;
    reset();
    running = true;
    requestAnimationFrame(loop);
  }

  function stop(winner){
    running = false;
    centerMsg.textContent = winner ? (winner + ' venceu!') : 'Empate';
  }

  function applyControls(){
    // Player 1
    if(Controls.isDown('p1_left')) player1.moveLeft();
    else if(Controls.isDown('p1_right')) player1.moveRight();
    else player1.stop();
    if(Controls.isDown('p1_jump')) player1.jump();
    if(Controls.isDown('p1_punch') || Controls.isDown('p1_kick')) player1.attack();

    // Player 2 (local)
    if(mode==='local'){
      if(Controls.isDown('p2_left')) player2.moveLeft();
      else if(Controls.isDown('p2_right')) player2.moveRight();
      else player2.stop();
      if(Controls.isDown('p2_jump')) player2.jump();
      if(Controls.isDown('p2_punch') || Controls.isDown('p2_kick')) player2.attack();
    }
  }

  function handleAttacks(){
    // p1 hits p2
    const ab1 = player1.attackBox();
    if(ab1 && rectsOverlap(ab1, player2.bbox())){
      // apply damage once per attack activation
      if(player1.attackTimer === player1.attackDuration-1) player2.takeDamage(player1.attackPower);
    }
    const ab2 = player2.attackBox();
    if(ab2 && rectsOverlap(ab2, player1.bbox())){
      if(player2.attackTimer === player2.attackDuration-1) player1.takeDamage(player2.attackPower);
    }
  }

  function drawBackground(){
    // simple ground and stage
    ctx.fillStyle = '#0b0b0b';
    ctx.fillRect(0,0,W,H);
    // ground
    ctx.fillStyle = '#222';
    ctx.fillRect(0,floorY,W,H-floorY);
    // center line
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke();
  }

  function drawHUD(){
    p1HealthEl.textContent = player1.health;
    p2HealthEl.textContent = player2.health;
  }

  function loop(){
    frameCount++;
    resizeCanvas();

    if(!running) return;

    // AI or controls
    applyControls();
    if(mode==='ai') updateAI(player2, player1, frameCount);

    // physics update
    player1.update(gravity,floorY);
    player2.update(gravity,floorY);

    // attack handling
    handleAttacks();

    // clear & draw
    drawBackground();
    player1.draw(ctx);
    player2.draw(ctx);

    drawHUD();

    // check win
    if(player1.health<=0 || player2.health<=0){
      const winner = player1.health>player2.health ? 'Player 1' : (player2.health>player1.health ? 'Player 2' : null);
      stop(winner);
      return;
    }

    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', ()=>{
    if(!running) start(); else { reset(); }
  });

  // init
  reset();
  // draw initial frame
  drawBackground();
  player1.draw(ctx);
  player2.draw(ctx);

})();
