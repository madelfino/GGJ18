/* todo

change laser to shoot once/delayed
initialize poluation, transmit

*/

let timer = 0;
let moon_x, moon_y;
var img;
var moons = [];
var numMoons = 6;
var satTheta = 0;

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
  if (keyIsDown(UP_ARROW)) {
    stroke(0, 200, 0);
    line(width/2, height/2, width/2+1000*cos(satTheta), height/2+1000*sin(satTheta));
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
