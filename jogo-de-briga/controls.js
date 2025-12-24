// Controls handling (global)
window.Controls = {
  keys: {},
  map: {
    // player 1
    p1_left: 'KeyA',
    p1_right: 'KeyD',
    p1_jump: 'KeyW',
    p1_punch: 'KeyF',
    p1_kick: 'KeyG',
    // player 2
    p2_left: 'ArrowLeft',
    p2_right: 'ArrowRight',
    p2_jump: 'ArrowUp',
    p2_punch: 'Slash', // '/'
    p2_kick: 'Period'  // '.'
  }
};

window.addEventListener('keydown', (e)=>{
  Controls.keys[e.code] = true;
  // prevent page scroll for arrow keys
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e)=>{
  Controls.keys[e.code] = false;
});

// helper to query mapped actions
Controls.isDown = function(action){
  const code = Controls.map[action];
  return !!Controls.keys[code];
}
