function Moon(id) {
  this.id = id;
  this.alive = true;
  this.population = 10;
  this.theta = random(2*PI);
  this.x = 0;
  this.y = 0;
  this.size = 40;
  this.dist = this.size + 64 + random(180);
  this.color = color(random(256),random(256), random(256));
  this.rotationSpeed = 0.001 + random(0.01);
  this.update = function() {
    this.theta += this.rotationSpeed;
    this.x = width/2 + this.dist * cos(this.theta);
    this.y = height/2 + this.dist * sin(this.theta);
  };
  this.show = function() {
    fill(this.color);
    noStroke();
    image(moonImages[id-1], this.x, this.y, 200, 100);
    textSize(18);
    text('Moon ' + this.id + ': ' + floor(this.population), 10, 30 + this.id * 20);
  };
  this.attack = function(dmg) {
    this.population -= dmg;
    if (this.population < 0) {
      this.alive = false;
    }
  };
}
