let jorda;
let spacex;
let G = 20;


function setup() {
  createCanvas(700, 700);


  jorda = new Planet(100, createVector(0,0), createVector(0,0));


  let r = 300;

  let theta = 2/3 * PI;

  let romskipPos = createVector(r*cos(theta), r*sin(theta));

  let romskipVel = romskipPos.copy();
  romskipVel.rotate(HALF_PI);
  romskipVel.setMag( sqrt(G * jorda.mass / romskipPos.mag()) );
  romskipVel.mult(0.7);
  spacex = new Romskip (10, romskipPos, romskipVel);

}

function draw() {
  background(180);
  translate(width/2 + 60, height/2 - 100)

  jorda.tiltrekk(spacex);
  spacex.update();
  jorda.show();
  spacex.show();

  // Lag rektangel som har full bar med farge og tekst drivstoff inni, for hvert mustrykk, går fargen mot venstre.

  noFill(); stroke(0);
  rect(-200, -240, 400, 70); // Ufarget bar for drivstoff



  fill(255, 0, 0);
  rect(-200, -240, spacex.drivstoff, 70); //Farget bar for drivstoff

  //text:
  textSize(28);
  fill(255);
  text("Drivstoff", -50, -200);

  if (mouseIsPressed && // Bruk drivstoff
        mouseX > 0 && mouseY > 0 &&
        mouseX < 700 && mouseY < 700) {
    spacex.gas();
  }

  // Lag rektangel over energi, vet ikke hvordan per nå.


  //noStroke(); fill(255, 0, 0);

  //ellipse(-300,-100, spacex.E_k * 0.5, spacex.E_k * 0.5);
  //textSize(15);
  //fill(255);
  //text("Kinetisk energi", -350, -75);

  text("Kinetisk energi :" + spacex.E_k, -400, -100);
  text("potensiel energi:" + spacex.E_p, -400, -140);


  text("Mekanisk energi :" + spacex.E, -350, 400);


}


class Planet {
  constructor(mass, pos, vel) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.r = this.mass;
  }

  show() {
    noStroke(); fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }


  tiltrekk(romskip) {

    let r = dist(this.pos.x, this.pos.y, romskip.pos.x, romskip.pos.y);

    let f = this.pos.copy().sub(romskip.pos);
    f.setMag( (G * this.mass * romskip.mass) / (r * r) );
    romskip.grav(f);
    romskip.E_p = - G * (romskip.mass * this.mass) / r;

  }

}

class Romskip {
  constructor(mass, pos, vel) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.r = this.mass;
    this.drivstoff = 400;
    this.history = [];
    this.E_k = 0;
    this.E_p = 0;
    this.E = 0;
  }

  show() {
    stroke(255); fill(0);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);

    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let posi = this.history[i];
      stroke(0);  noFill();
      vertex(posi.x, posi.y);
    }
    endShape();

  }

  kinetic() {
    this.E_k = 0.5 * this.mass * (this.vel.mag()**2);
  }


  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.history.push(this.pos.copy());
    this.kinetic();
    this.E = this.E_k + this.E_p; // Total energy
  }

  grav(f) {
    this.vel.x += f.x / this.mass;
    this.vel.y += f.y / this.mass;
  }

  gas() {
    if (this.drivstoff > 0) {
      this.drivstoff -= 10;
      let norm =  this.vel.copy();
      norm.normalize();
      this.vel.x += norm.x / 50;
      this.vel.y += norm.y / 50;
    }
  }


}
