/* todo

initialize poluation, transmit

*/

let timer = 0;
let moon_x, moon_y;
var img;
var moons = [];
var numMoons = 6;
var satTheta = 0;

var laser_beam = {
  x1:0,
  y1:0,
  x2:0,
  y2:0,
  dx:0,
  dy:0, 
  len:90,
  spd:9,
  alive: false,
  show: function() {
    stroke(0, 200, 0);
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
    if (this.x2 > width || this.x2 < 0 || this.y2 > height || this.y2 < 0) {
      this.alive = false;
    }
  }
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  img = loadImage("images/planet.png");
  for (var i=0; i<numMoons; i++) {
    moons.push(new Moon());
  }
}

function draw() {
  background(0);
  if (keyIsDown(LEFT_ARROW)) {
    satTheta -= 0.1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    satTheta += 0.1;
  }
  if (keyIsDown(UP_ARROW) && !laser_beam.alive) {
    laser_beam.alive = true;
    laser_beam.x1 = width/2+42*cos(satTheta);
    laser_beam.y1 = height/2+42*sin(satTheta);
    laser_beam.x2 = laser_beam.x1;
    laser_beam.y2 = laser_beam.y1;
    laser_beam.dx = laser_beam.spd * cos(satTheta);    
    laser_beam.dy = laser_beam.spd * sin(satTheta);    
    //stroke(0, 200, 0);
    //line(width/2, height/2, width/2+1000*cos(satTheta), height/2+1000*sin(satTheta));
  }
  if (laser_beam.alive) {
    laser_beam.show();
    laser_beam.update();
  }
  strokeWeight(5);
  stroke(150);
  line(width/2, height/2, width/2+42*cos(satTheta), height/2+42*sin(satTheta));
  noStroke();
  fill(150);  
  ellipse(width/2 + 42 * cos(satTheta), height/2 + 42 * sin(satTheta), 10);
  fill(0, 0, 150);
  ellipse(width/2, height/2, 64);
  for (var i=0; i<moons.length; i++) {
    moons[i].update();
    moons[i].show();
  }
}
