/* todo

toggle between attack/reinforce modes

design considerations:
rate of incoming enemies
fixed speed/size of moons


*/

const ATTACK_MODE = -1;
const REINFORCE_MODE = 1;
let finalScore = 0;
let timer = 0;
let moon_x, moon_y;
var img;
var aliens = [];
var moons = [];
var moonImages = [];
var numMoons = 5;
var satTheta = 0;
var planetPopulation = 100;
var transmissionSize = 5;
var gameOver;
var logo;
var stars = [];
var sfx = {};
var planetImage, satImg;
var endImg, enemyImg;
var explodeAnim;
var reloadImg;

function preload() {
  moonImages.push(loadImage('images/icePlanet.png'));
  moonImages.push(loadImage('images/gasPlanet.png'));
  moonImages.push(loadImage('images/crystalPlanet.png'));
  moonImages.push(loadImage('images/lavaPlanet.png'));
  moonImages.push(loadImage('images/bubblePlanet.png'));
  planetImage = loadImage('images/waterPlanet.png');
  logo = loadImage('images/jetconelogo2.png');
  endImg = loadImage('images/end.png');
  enemyImg = loadImage('images/enemy.png');
  satImg = loadImage('images/sat.png');
  reloadImg = loadImage('images/reload.png');
  explodeAnim = loadImage('images/explode.gif');
  sfx['nice_laser_shoot'] = loadSound('sfx/nice_laser_shoot.wav');
  sfx['mean_laser_shoot'] = loadSound('sfx/mean_laser_shoot.wav');
  sfx['abduction'] = loadSound('sfx/abduction.wav');
  sfx['charged'] = loadSound('sfx/charged.wav');
  sfx['enemy_explosion'] = loadSound('sfx/enemy_explosion.wav');
  sfx['planet_explosion'] = loadSound('sfx/planet_explosion.wav');
  sfx['beam_switch'] = loadSound('sfx/beam_switch.wav');
  sfx['end'] = loadSound('sfx/Game-Over.mp3');
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  for (var item in sfx) {
    sfx[item].setVolume(0.1);
  }
  gameOver = false;
  for (var i=1; i<=numMoons; i++) {
    moons.push(new Moon(i));
  }
  for (var i=0; i<100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: 1 + random(4),
      brightness: 156 + random(100)
    });
  }
}

function draw() {
  background(30);
  for (var i=0; i<stars.length; i++) {
    noStroke();
    fill(stars[i].brightness);
    ellipse(stars[i].x, stars[i].y, stars[i].size);
  }
  if (gameOver) {
    imageMode(CORNER);
    image(endImg, 0, 0);
    imageMode(CENTER);
  }
  if (timer % 200 == 0 && !gameOver) {
    aliens.push(new Alien());    
  }
  timer++;
  for (var i=aliens.length - 1; i>= 0; i--) {
    aliens[i].update();
    aliens[i].show();
    if (!aliens[i].alive || gameOver) {
      aliens.splice(i, 1);
      sfx['enemy_explosion'].play();
    }
  }
  if (!gameOver) planetPopulation += 0.01;
  if (keyIsDown(LEFT_ARROW)) {
    satTheta -= 0.1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    satTheta += 0.1;
  }
  if (keyIsDown(UP_ARROW) && !laser_beam.alive && planetPopulation >= transmissionSize && laser_beam.charge == laser_beam.maxCharge) {
    if (laser_beam.mode == REINFORCE_MODE) {
      sfx['nice_laser_shoot'].play();
      planetPopulation -= transmissionSize;
    } else {
      sfx['mean_laser_shoot'].play();
      
    }
    laser_beam.charged = false;
    laser_beam.alive = true;
    laser_beam.x1 = width/2+42*cos(satTheta);
    laser_beam.y1 = height/2+42*sin(satTheta);
    laser_beam.x2 = laser_beam.x1;
    laser_beam.y2 = laser_beam.y1;
    laser_beam.dx = laser_beam.spd * cos(satTheta);    
    laser_beam.dy = laser_beam.spd * sin(satTheta);    
    laser_beam.charge = 0;
  }
  if (keyIsDown(DOWN_ARROW) && laser_beam.charge == laser_beam.maxCharge) {
    laser_beam.mode = -laser_beam.mode;
    laser_beam.charge = 0;
    laser_beam.charged = false;
    sfx['beam_switch'].play();
  }
  if (laser_beam.alive) {
    laser_beam.show();
    laser_beam.update();
  } else {
    laser_beam.chargeUp();
  }
  push()
  angleMode(RADIANS);
  translate(width/2, height/2);
  rotate(PI / 2.0 + satTheta);
  image(satImg, 0, -42, 20, 40);
  pop();
  if (laser_beam.mode == REINFORCE_MODE) fill(0,255,0);
  else fill(255, 0, 0);
  ellipse(width/2+42*cos(satTheta),height/2+42*sin(satTheta), 10*(laser_beam.charge/laser_beam.maxCharge));
  fill(0, 0, 255);
  image(planetImage, width/2 + 13, height/2 + 5, 200, 100);
  textSize(18);
  image(planetImage, 20, 30, 80, 40);
  text(floor(planetPopulation), 40, 30);
  fill(200); 
  if (!gameOver) text(floor(timer/10), 10, height - 10);
  for (var i=moons.length - 1; i>=0; i--) {
    moons[i].update();
    moons[i].show();
    if (!moons[i].alive) {
      image(explodeAnim, moons[i].x, moons[i].y);
      moons.splice(i, 1);
      sfx['planet_explosion'].play();
    }
  }
  if (moons.length == 0) {
    textSize(72);
    if (!gameOver) {
      finalScore = floor(timer/10) * floor(planetPopulation);
    sfx['end'].play();
    }
    fill(200);
    text("The End Of Us", 65, 100);
    text("Final Score", 50, 200);
    text(finalScore, 65, 300);
    gameOver = true;
  }
  if(gameOver) {
    image(reloadImg, width/2, height/2);
  }
}

function mouseClicked() {
  if (gameOver && dist(mouseX, mouseY, width/2, height/2) < 90) {
    setup();
  }
}
