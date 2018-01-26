function Moon() {
  this.theta = random(2*PI);
  this.size = 10 + random(20);
  this.dist = this.size + 32 + random(200);
  this.color = color(random(256),random(256), random(256));
  this.rotationSpeed = 0.001 + random(0.02);
  this.update = function() {
    this.theta += this.rotationSpeed;
  }
  this.show = function() {
    fill(this.color);
    noStroke();
    ellipse(width/2 + this.dist * cos(this.theta), height/2 + this.dist * sin(this.theta), this.size);
  }
}
