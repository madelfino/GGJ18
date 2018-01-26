function Alien() {
  var target_index = floor(random(moons.length));
  this.target = moons[target_index];
  this.x = 0; this.y = 0;
  this.spd = 2;
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
    if (this.target.x < this.x) this.x -= this.spd;
    if (this.target.x > this.x) this.x += this.spd;
    if (this.target.y < this.y) this.y -= this.spd;
    if (this.target.y > this.y) this.y += this.spd;
  };
  this.show = function() {
    noStroke();
    fill(200, 0, 0);
    ellipse(this.x, this.y, 50, 20);
    };
}
