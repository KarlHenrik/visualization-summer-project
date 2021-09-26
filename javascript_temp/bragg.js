let theta;
let d;
let dSlider;

let wc1, wc2, bc, pc;

function setup() {
  createCanvas(500, 500);
  frameRate(60);

  theta = -5*PI/6;
  d = 100;

  dSlider = createSlider(50, 150, 100);
  dSlider.position(0, 480)


  wc1 = ('yellow');
  wc2 = ('red');
  pc = ('white');
  bc = [90, 39, 41]

  initialWave1 = new Wave(20, 50, wc1); initialWave1.setStr(width/2);
  initialWave2 = new Wave(20, 50, wc1); initialWave2.setStr(width/2 + d*sin(-theta));
  scatteredWave1 = new Wave(20, 50, wc2); scatteredWave1.setStr(width/2);
  scatteredWave2 = new Wave(20, 50, wc2); scatteredWave2.setStr(width/2 + d*sin(-theta));

  plan1 = new Plan(pc);
  plan2 = new Plan(pc);
}

function draw() {
  background(bc);

  textSize(15); fill('white'); noStroke(); text('Plane spacing (d)', dSlider.x + 5, dSlider.y - 5)

  d = dSlider.value();

  initialWave2.setStr(width/2 + d*sin(-theta));
  scatteredWave2.setStr(width/2 + d*sin(-theta));

  push();
  plan1.pos(100,200);
  tegn(plan1, initialWave1, scatteredWave1);
  pop();

  push();
  plan2.pos(plan1.xpos, plan1.ypos + d);
  tegn(plan2, initialWave2, scatteredWave2);
  pop();

  initialWave1.bragg();

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (theta < -2*PI/3) {theta += PI/12;}
  }
  else if (keyCode === DOWN_ARROW) {
    if (theta < PI) {theta -= PI/12;}
  }
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

}

function drawWave(o) {

  o.calc();
  o.update();
  o.show();
}


class Plan {
  constructor(color) {
    this.xpos = 0;
    this.ypos = 0;
    this.str = width/2;
    this.center = [];
    this.c = color;
  }

  pos(x,y) {
    this.xpos = x;
    this.ypos = y;
    this.center = [this.xpos + 1/2*this.str, this.ypos];
  }
  show() {
    fill(this.c); rect(this.xpos, this.ypos, this.str, 5);
     for (let i = 25; i < this.str; i+= 50) {
       fill('brown'); noStroke();
       ellipse(this.xpos + i, this.ypos + 2, 20);
     }

  }

}


class Wave {

  constructor(amplitude, period, color) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = 0;
    this.str = 0;
    this.color = color;

    this.frequency = 1/this.period;
    this.vel = 2;
    this.lambda = this.vel/this.frequency;

    this.y = [];
  }

  setStr(s){
    this.str = s;
  }

  calc() {
    for (let i = 0; i < this.str; i++) {
       this.y[i] = sin(this.phase + TWO_PI * ( i / this.period ) ) * this.amplitude;
    }
  }

  bragg() {
    let a = round(2*d*sin(-theta))
    let b = this.lambda;
    textSize(30); fill(255); text("n(lambda) = n*" +  b, 200, 400);
    textSize(30); fill(255); text("2dsin(theta) = " + a, 200, 450);
  }

  show() {
    for (let i = 0; i < this.str; i+= 4) {
      fill(this.color); noStroke();
      ellipse(i, this.y[i], 6);
    }
  }

  update() {
    this.phase += 0.1;
  }

}
