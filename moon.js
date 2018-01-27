function Moon(id) {
  this.id = id;
  this.alive = true;
  this.population = 10;
  this.theta = random(2*PI);
  this.x = 0;
  this.y = 0;
  this.size = 40;
  this.dist = this.size + 64 + random(180);
  this.color = [
    color(0, 100, 2550),
    color(0, 255, 0),
    color(200, 0, 200),
    color(255, 0, 0),
    color(180, 250, 200)
  ][id-1];;
  this.rotationSpeed = 0.001 + random(0.01);
  this.update = function() {
    this.theta += this.rotationSpeed;
    this.x = width/2 + this.dist * cos(this.theta);
    this.y = height/2 + this.dist * sin(this.theta);
  };
  this.show = function() {
    fill(this.color);
    noStroke();
    image(moonImages[id-1], this.x, this.y, 120, 60);
    textSize(18);
    image(moonImages[id-1], 20, 30 + this.id * 30, 60, 30);
    text(floor(this.population), 40, 30 + this.id * 30);
  };
  this.attack = function(dmg) {
    this.population -= dmg;
    if (this.population < 0) {
      this.alive = false;
    }
  };
}
