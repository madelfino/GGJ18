function Moon(id) {
  this.id = id;
  this.population = 0;
  this.theta = random(2*PI);
  this.x = 0;
  this.y = 0;
  this.size = 10 + random(20);
  this.dist = this.size + 32 + random(200);
  this.color = color(random(256),random(256), random(256));
  this.rotationSpeed = 0.001 + random(0.02);
  this.update = function() {
    this.theta += this.rotationSpeed;
    this.x = width/2 + this.dist * cos(this.theta);
    this.y = height/2 + this.dist * sin(this.theta);
  }
  this.show = function() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
    textSize(18);
    text('Moon ' + this.id + ': ' + this.population, 10, 30 + this.id * 20);
  }
}
