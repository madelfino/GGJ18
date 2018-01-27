var laser_beam = { 
  x1:0,
  y1:0,
  x2:0,
  y2:0,
  dx:0,
  dy:0, 
  len:90,
  spd:9,
  charge: 0,
  maxCharge: 80, 
  mode: 1,
  alive: false,
  charged: false,
  chargeUp: function() {
    if (!this.charged) this.charge++;
    if (this.charge > this.maxCharge) {
      this.charge = this.maxCharge;
      sfx['charged'].play();
      this.charged = true;
    }   
  },  
  show: function() {
    if (this.mode == REINFORCE_MODE) stroke(0, 200, 0);
    else stroke(200, 0, 0);
    strokeWeight(5);
    line(this.x1, this.y1, this.x2, this.y2);
  },  
  update: function() {
    this.x1 += this.dx;
    this.y1 += this.dy;
    if (dist(this.x1, this.y1, this.x2, this.y2) >= this.len) {
      this.x2 += this.dx;
      this.y2 += this.dy;
    }
    for (var seg=0; seg<this.len/this.spd; seg++) {
      var x = this.x1 - this.dx * seg;
      var y = this.y1 - this.dy * seg;
      noStroke();
      if (this.mode == REINFORCE_MODE) fill(0,255,0);
      else fill(255, 0, 0);
      ellipse(x, y, 3); 
      for (var i=0; i<moons.length; i++) {
        if (dist(x, y, moons[i].x, moons[i].y) < moons[i].size / 2) {
          this.alive = false;
          moons[i].attack(-transmissionSize * this.mode);
        }
      }
      for (var i=0; i<aliens.length; i++) {
        if (dist(x, y, aliens[i].x, aliens[i].y) < 30) {
          this.alive = false;
          if (this.mode == ATTACK_MODE)
            aliens[i].alive = false;
        }
      }
    }
    for (var i=0; i<aliens.length; i++) {
      for (var seg=0; seg<this.len/this.spd; seg++) {
      
      }
    }   
    if (this.x2 > width || this.x2 < 0 || this.y2 > height || this.y2 < 0) {
      this.alive = false;
    }   
  }
} 
