/* todo

toggle between attack/reinforce modes

design considerations:
rate of incoming enemies
fixed speed/size of moons


*/

let timer = 0;
let moon_x, moon_y;
var img;
var aliens = [];
var moons = [];
var moonImages = [];
var numMoons = 6;
var satTheta = 0;
var planetPopulation = 100;
var transmissionSize = 5;
var gameOver;

function preload() {
  moonImages.push(loadImage('images/waterPlanet.png'));
  moonImages.push(loadImage('images/icePlanet.png'));
  moonImages.push(loadImage('images/gasPlanet.png'));
  moonImages.push(loadImage('images/crystalPlanet.png'));
  moonImages.push(loadImage('images/lavaPlanet.png'));
  moonImages.push(loadImage('images/bubblePlanet.png'));
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  gameOver = false;
  for (var i=1; i<=numMoons; i++) {
    moons.push(new Moon(i));
  }
}

function draw() {
  background(0);
  if (timer % 200 == 0 && !gameOver) {
    aliens.push(new Alien());    
  }
  timer++;
  for (var i=aliens.length - 1; i>= 0; i--) {
    aliens[i].update();
    aliens[i].show();
    if (!aliens[i].alive || gameOver) {
      aliens.splice(i, 1);
    }
  }
  planetPopulation += 0.01;
  if (keyIsDown(LEFT_ARROW)) {
    satTheta -= 0.1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    satTheta += 0.1;
  }
  if (keyIsDown(UP_ARROW) && !laser_beam.alive && planetPopulation >= transmissionSize && laser_beam.charge == laser_beam.maxCharge) {
    planetPopulation -= transmissionSize;
    laser_beam.alive = true;
    laser_beam.x1 = width/2+42*cos(satTheta);
    laser_beam.y1 = height/2+42*sin(satTheta);
    laser_beam.x2 = laser_beam.x1;
    laser_beam.y2 = laser_beam.y1;
    laser_beam.dx = laser_beam.spd * cos(satTheta);    
    laser_beam.dy = laser_beam.spd * sin(satTheta);    
    laser_beam.charge = 0;
  }
  if (laser_beam.alive) {
    laser_beam.show();
    laser_beam.update();
  } else {
    laser_beam.chargeUp();
  }
  strokeWeight(5);
  stroke(150);
  line(width/2, height/2, width/2+42*cos(satTheta), height/2+42*sin(satTheta));
  noStroke();
  fill(150);  
  ellipse(width/2 + 42 * cos(satTheta), height/2 + 42 * sin(satTheta), 10);
  fill(0,255,0);
  ellipse(width/2+42*cos(satTheta),height/2+42*sin(satTheta), 10*(laser_beam.charge/laser_beam.maxCharge));
  fill(0, 0, 150);
  ellipse(width/2, height/2, 64);
  textSize(18);
  text('Planet: ' + floor(planetPopulation), 10, 30);
  for (var i=moons.length - 1; i>=0; i--) {
    moons[i].update();
    moons[i].show();
    if (!moons[i].alive) {
      moons.splice(i, 1);
    }
  }
  if (moons.length == 0) {
    textSize(48);
    text("You Lose!", 100, 100);
    gameOver = true;
  }
}
