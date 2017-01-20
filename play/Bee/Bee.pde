int PARTICLE_NUM = 2000;
float PARTICLE_RADIOUS = 7;
float PARTICLE_MAX_SPEED = 10.0;
float PARTICLE_MAX_ACCELERATION = 1.0;
float PARTICLE_IMPACT_SPEED = 300;
float PARTICLE_SPEED_VARIANT = 1;
float randomX = random(width);
float randomY = random(height);
int start;
int count;
int i = 0;

Particle[] particles;

void setup() {
  size(1000,600);
  start = millis();
  count = 200;
  particles = new Particle[PARTICLE_NUM];
  for (int i = 0; i < PARTICLE_NUM; i++) {
    particles[i] = new Particle();
  }
}

void draw() {
  background(0);
  if ( (millis()-start) >= 1000 ) {
    start = millis();
    count--; 
    if ( count == -1 ) {
      count = 200;
    }
  }
  if ((count % 2) == 0) {
    i = int (random(0, 4));
  }

  if (i == 0) {
    randomX = random(width/2);
    randomY = random(height/2);
  } else {
    if (i == 1) {
      randomX = random(width/2, width);
      randomY = random(height/2, height);
    } else {
      if (i == 2) {
        randomX = random(width/2);
        randomY = random(height/2, height);
      } else {
        randomX = random(width/2, width);
        randomY = random(height/2);
      }
    }
  }

  for (Particle particle : particles) {
    particle.display();
    particle.update();
  }
}

void keyPressed() {
  if (key=='e') {
    PARTICLE_MAX_SPEED += 3;
  }
  if (key=='q') {
    PARTICLE_MAX_SPEED -= 3;
  }
  if(key=='2'){
    PARTICLE_MAX_SPEED = 0;
  }
  if(key=='1'){
   PARTICLE_MAX_SPEED = -2; 
  }
  if(key=='3'){
   PARTICLE_MAX_SPEED = 2; 
  }
  if(key=='5'){
   PARTICLE_MAX_SPEED = 10; 
  }
  if(key=='4'){
   PARTICLE_MAX_SPEED = -10; 
  }
}

void mousePressed() {
  for (Particle particle : particles) {
    particle.impact();
  }
}


class Particle {

  PVector position;
  PVector velocity;
  color c;

  Particle() {
    position = new PVector(random(width), random(height));
    setRandomVelocity();
    c = color(random(255), random(255), random(255));
  }

  void setRandomVelocity() {
    velocity = new PVector(random(2) - 1.0, random(2) - 1.0);
    velocity.normalize();
    velocity.mult(random(PARTICLE_MAX_SPEED * 2) - PARTICLE_MAX_SPEED);
  }

  void impact() {
    velocity = PVector.random2D();
    velocity.normalize();
    velocity.mult(PARTICLE_IMPACT_SPEED);
  }

  void display() {
    noStroke();
    fill(c);
    ellipse(position.x, position.y, PARTICLE_RADIOUS * 2, PARTICLE_RADIOUS * 2);
  }

  void update() {
    PVector mouse = new PVector(randomX, randomY);
    PVector direction = PVector.sub(mouse, position);
    direction.normalize();
    PVector acceleration = PVector.mult(direction, PARTICLE_MAX_ACCELERATION);
    velocity.add(acceleration);
    PVector velocityVariant = new PVector(random(2) - 1.0, random(2) - 1.0);
    velocityVariant.normalize();
    velocityVariant.mult(PARTICLE_SPEED_VARIANT);
    velocity.add(velocityVariant);
    velocity.limit(PARTICLE_MAX_SPEED);
    position.add(velocity);
  }
}
