function Alien() {
  var target_index = floor(random(moons.length));
  this.ttl = 1000;
  this.target = moons[target_index];
  this.x = 0; this.y = 0; this.alive = true;
  this.spd = 1.2;
  var direction = floor(random(4));
  if (direction == 0) {
    this.y = random(height);
  }
  if (direction == 1) {
    this.x = random(width);
  }
  if (direction == 2) {
    this.x = width;
    this.y = random(height);
  }
  if (direction == 3) {
    this.y = height;
    this.x = random(width);
  }
  this.update = function() {
    this.ttl--;
    if (this.ttl <= 0) this.alive = false;
    if (this.target.x < this.x) this.x -= this.spd;
    if (this.target.x > this.x) this.x += this.spd;
    if (this.target.y < this.y) this.y -= this.spd;
    if (this.target.y > this.y) this.y += this.spd;
    if (dist(this.target.x, this.target.y, this.x, this.y) < this.target.size /2) {
      this.target.attack(1+random(9));
      this.alive = false;
    }
  };
  this.show = function() {
    noStroke();
    fill(100, 0, 0);
    ellipse(this.x, this.y, 50, 20);
    };
}
