// Basic variables: Change G here and the divident in gas to alter difficulty
let jorda;
let spacex;
let G = 12;

function setup() {
  createCanvas(1000, 1000); //Canvas size
  frameRate(60);

  jorda = new Planet(100, createVector(0, 0), 70);

  let r = 180;
  let theta = (2 / 3) * PI; //Starting position of the spaceship
  let romskipPos = createVector(r * cos(theta), r * sin(theta));

  let romskipVel = romskipPos.copy();
  romskipVel.rotate(HALF_PI); //Initial spaceship velocity
  romskipVel.setMag(sqrt((G * jorda.mass) / romskipPos.mag()));
  romskipVel.mult(0.7);

  spacex = new Romskip(10, romskipPos, romskipVel, 10);
}

function draw() {
  background(60);
  translate(width / 2 + 60, height / 2 - 100); //Center drawing to the middle of the canvas, change the +- numbers to
  //shift the drawing
  for (let i = 0; i < 2; i++) {
    jorda.gravity(spacex);
    spacex.update();
  }

  if (abs(spacex.pos.x) > 550 || abs(spacex.pos.y) > 550) {
    for (let j = 0; j < 20; j++) {
      jorda.gravity(spacex);
      spacex.update();
    }
  }

  if (
    mouseIsPressed && // Apply fuel by pressing anywhere on the canvas with the mouse.
    mouseX > 0 &&
    mouseY > 0 &&
    mouseX < width &&
    mouseY < height
  ) {
    spacex.gas(); //Change the velocity of the spaceship
  }

  spacex.tegnFuel(-200, -320); //Show the fuel
  spacex.tegnEnergi(-200, -200); //Show the mechanical energy

  stroke("yellow");
  text("Kinetic energy :" + spacex.E_k, -width / 2.5, height / 2.5); // Display kinetic energy
  stroke("yellow");
  text("Potential energy:" + spacex.E_p, -width / 2.5, height / 2.2); // Display potential energy

  spacex.gameOver();

  jorda.show(); // Draw the planet
  spacex.show(); // Draw the spaceship
}

class Planet {
  constructor(mass, pos, r) {
    this.mass = mass;
    this.pos = pos;
    this.r = r;
  }

  show() {
    noStroke();
    fill("orange");
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  gravity(romskip) {
    let force = p5.Vector.sub(this.pos, romskip.pos);
    let distance = force.mag();
    force.setMag((G * this.mass * romskip.mass) / distance ** 2);
    romskip.apply(force);
    romskip.pot(distance, this.mass);

    //textSize(50); text(distance, 100, 100);
  }
}

class Romskip {
  constructor(mass, pos, vel, r) {
    this.mass = mass; //mass of spaceship
    this.r = r; // size of spaceship

    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0, 0);

    this.w = 400;
    this.drivstoff = this.w; //Fuel and displaybar

    this.history = []; //Position history to draw path

    this.E_k = 0;
    this.E_p = 0;
    this.E = 0;
  }

  kinetic() {
    this.E_k = 0.5 * this.mass * this.vel.mag() ** 2;
  }
  pot(a, m) {
    this.E_p = (-G * this.mass * m) / a;
  }
  mek() {
    this.E = this.E_k + this.E_p;
  }

  apply(f) {
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.history.push(this.pos.copy());

    this.kinetic();
    this.mek();
    this.acc.set(0);
  }

  gas() {
    if (this.drivstoff > 0) {
      this.drivstoff -= 4;
      let propelent = this.vel.copy();
      propelent.normalize();
      this.acc.add(propelent.div(85));
    }
  }

  show() {
    noStroke();
    fill("white");
    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let posi = this.history[i];
      stroke(0);
      noFill();
      vertex(posi.x, posi.y);
      if (this.history.length > 1500) {
        this.history.splice(0, 1);
      }
    }
    endShape();
  }

  tegnEnergi(startX, startY) {
    let h = 70; //Rectangle height
    stroke(0);
    noFill();
    rect(startX, startY, this.w, h); // Empty rectangle
    fill("red");
    rect(startX, startY, 2 * this.E - startX, h); //Filled rectangle dependent on this.E
    textSize(20);
    fill("white");
    noStroke();
    text(
      " Mechanical energy = " + this.E,
      startX + (1 / 4) * this.w,
      startY - (1 / 4) * h
    );
    stroke("yellow");
    line(0, startY, 0, startY + h);
  }

  tegnFuel(startX, startY) {
    let h = 70;
    noFill();
    rect(startX, startY, this.w, h);
    fill(255, 0, 0);
    rect(startX, startY, this.drivstoff, h);
    textSize(20);
    fill("white");
    noStroke();
    text(
      " Fuel = " + this.drivstoff / 4,
      startX + (1 / 2.5) * this.w,
      startY - (1 / 4) * h
    );
  }

  gameOver() {
    if (this.E > 0) {
      textSize(70);
      stroke(255, 0, 0);
      text("You escaped orbit!", -width / 2.6, 0);
    } else if (this.drivstoff == 0 && this.E < 0) {
      textSize(70);
      stroke(255, 0, 0);
      text("You did not escape orbit!", -width / 2.3, 0);
    }
  }
}
