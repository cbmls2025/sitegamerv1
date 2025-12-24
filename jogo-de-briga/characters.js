// Character class and helpers (global)
class Character {
  constructor(opts){
    this.x = opts.x || 100;
    this.y = opts.y || 0;
    this.w = opts.w || 48;
    this.h = opts.h || 80;
    this.color = opts.color || '#ff6b6b';
    this.name = opts.name || 'Player';
    this.vx = 0;
    this.vy = 0;
    this.speed = opts.speed || 3.2;
    this.jumpStrength = opts.jumpStrength || 10;
    this.grounded = false;
    this.facing = opts.facing || 1; // 1 right, -1 left
    this.health = 100;
    this.maxHealth = 100;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.attackDuration = 14; // frames
    this.attackPower = opts.attackPower || 8;
  }

  bbox(){
    return {x:this.x,y:this.y,w:this.w,h:this.h};
  }

  center(){
    return {x:this.x+this.w/2,y:this.y+this.h/2};
  }

  update(gravity,floorY){
    // apply gravity
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    // floor collision
    if(this.y + this.h >= floorY){
      this.y = floorY - this.h;
      this.vy = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    if(this.attackTimer>0){
      this.attackTimer--;
      if(this.attackTimer===0) this.isAttacking=false;
    }
  }

  draw(ctx){
    // body
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y,this.w,this.h);

    // simple face
    ctx.fillStyle = '#111';
    ctx.fillRect(this.x+10,this.y+12,8,8);
    ctx.fillRect(this.x+this.w-18,this.y+12,8,8);

    // attack indicator
    if(this.isAttacking){
      const reach = 24;
      const ax = this.facing>0 ? this.x + this.w : this.x - reach;
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.fillRect(ax,this.y+20,reach,this.h-40);
    }

    ctx.restore();
  }

  moveLeft(){ this.vx = -this.speed; this.facing = -1; }
  moveRight(){ this.vx = this.speed; this.facing = 1; }
  stop(){ this.vx = 0; }
  jump(){ if(this.grounded){ this.vy = -this.jumpStrength; this.grounded=false; } }
  attack(){ if(!this.isAttacking){ this.isAttacking=true; this.attackTimer=this.attackDuration; } }

  attackBox(){
    if(!this.isAttacking) return null;
    const reach = 24;
    if(this.facing>0){
      return {x:this.x+this.w,y:this.y+20,w:reach,h:this.h-40};
    } else {
      return {x:this.x-reach,y:this.y+20,w:reach,h:this.h-40};
    }
  }

  takeDamage(v){
    this.health = Math.max(0,this.health - v);
  }
}

// simple AABB collision
function rectsOverlap(a,b){
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

window.Character = Character;
window.rectsOverlap = rectsOverlap;
