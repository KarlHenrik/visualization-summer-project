let theta;
let d;

function setup() {
  createCanvas(500, 500);

  theta = -5*PI/6;
  d = 100;

  initialWave1 = new Wave(20, 50, 'yellow', width/2);
  initialWave2 = new Wave(20, 50, 'yellow', width/2 - d*sin(theta));
  scatteredWave1 = new Wave(20, 50, 'red', width/2);
  scatteredWave2 = new Wave(20, 50, 'red', width/2 - d*sin(theta));

  plan1 = new Plan();
  plan2 = new Plan();
}

function draw() {
  background(0);

  push();
  plan1.pos(100,200);
  tegn(plan1, initialWave1, scatteredWave1);
  pop();

  push();
  plan2.pos(plan1.xpos, plan1.ypos + d);
  tegn(plan2, initialWave2, scatteredWave2);
  pop();

}

function tegn(plan, bølge1, bølge2) {


  plan.show();

  let x = plan.center[0]; let y = plan.center[1];
  let str = bølge1.str;

  translate(x,y);

  let x1 = (str * cos(theta)); let y1 = (str * sin(theta));

  push();
  translate(x1, y1);
  rotate(theta + PI);
  drawWave(bølge1);
  pop();

  push();
  rotate(-theta + PI);
  drawWave(bølge2);
  pop();

  print("   " + 2*d*sin(-theta));



}

function addWaves(wave1, wave2) {
  let y = [];
  if (wave1.y.length == wave2.y.length) {
    for (let i = 0; i < wave1.y.length; i++) {
      y[i] = wave1.y[i] + wave2.y[i];
      ellipse(i, y[i], 5);
    }
  }
}

function drawWave(o) {

  o.calc(o.str);
  o.update();
  o.show();
}


class Plan {
  constructor() {
    this.xpos = 0;
    this.ypos = 0;
    this.str = width/2;
    this.center = [];
  }

  pos(x,y) {
    this.xpos = x;
    this.ypos = y;
    this.center = [this.xpos + 1/2*this.str, this.ypos];
  }
  show() {
    noFill(); stroke('blue'); line(this.xpos, this.ypos, this.xpos + this.str, this.ypos);
  }

}


class Wave {

  constructor(amplitude, period, color, str) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = 0;
    this.str = str;
    this.color = color;

    this.frequency = 1/this.period;
    this.vel = 2;
    this.lambda = this.vel/this.frequency;

    this.y = [];
  }

  calc(str) {
    for (let i = 0; i < str; i++) {
       this.y[i] = sin(this.phase + TWO_PI * ( i / this.period ) ) * this.amplitude;
    }
  }

  bragg() {
    for (let i = 0; i < 10; i++) {
      if (i*this.lambda == 2*d*sin(-theta));
      textSize(25); text('Bragg', 200, 300);
    }
  }

  show() {
    for (let i = 0; i < this.y.length; i+= 5) {
      noStroke();
      fill(this.color);
      ellipse(i, this.y[i], 5);
    }
  }

  update() {
    this.phase += 0.1;
  }

}
