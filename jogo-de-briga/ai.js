// Very simple AI for single-player opponent
function updateAI(aiPlayer, target, frameCount){
  // if player close, random chance to attack
  const dx = (target.x + target.w/2) - (aiPlayer.x + aiPlayer.w/2);
  const dist = Math.abs(dx);

  // face the player
  aiPlayer.facing = dx >= 0 ? 1 : -1;

  // movement: approach if far, stop if near
  if(dist > 120){
    aiPlayer.vx = (dx>0) ? aiPlayer.speed : -aiPlayer.speed;
  } else if(dist > 60){
    // slow approach
    aiPlayer.vx = (dx>0) ? aiPlayer.speed*0.6 : -aiPlayer.speed*0.6;
  } else {
    aiPlayer.vx = 0;
  }

  // jump occasionally if target is above
  if(frameCount % 180 === 0 && Math.random() > 0.6 && aiPlayer.grounded){
    aiPlayer.jump();
  }

  // attack if in range
  if(dist < 70 && !aiPlayer.isAttacking){
    if(Math.random() > 0.5) aiPlayer.attack();
  }
}

window.updateAI = updateAI;
