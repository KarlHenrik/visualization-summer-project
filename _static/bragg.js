let bragg = function(p) {


let theta;
let d;
let dSlider;

let wc1, wc2, bc, pc;

p.setup = function() {
  p.createCanvas(500, 500);
  p.frameRate(60);

  theta = -5*p.PI/6;
  d = 100;

  dSlider = p.createSlider(50, 150, 100);
  dSlider.position(0, 480)


  wc1 = ('yellow');
  wc2 = ('red');
  pc = ('white');
  bc = [90, 39, 41]

  initialWave1 = new Wave(20, 50, wc1); initialWave1.setStr(p.width/2);
  initialWave2 = new Wave(20, 50, wc1); initialWave2.setStr(p.width/2 + d*p.sin(-theta));
  scatteredWave1 = new Wave(20, 50, wc2); scatteredWave1.setStr(p.width/2);
  scatteredWave2 = new Wave(20, 50, wc2); scatteredWave2.setStr(p.width/2 + d*p.sin(-theta));

  plan1 = new Plan(pc);
  plan2 = new Plan(pc);
}

p.draw = function() {
  p.background(bc);

  p.textSize(15); p.fill('white'); p.noStroke(); p.text('Plane spacing (d)', dSlider.x + 5, dSlider.y - 5)

  d = dSlider.value();

  initialWave2.setStr(p.width/2 + d*p.sin(-theta));
  scatteredWave2.setStr(p.width/2 + d*p.sin(-theta));

  p.push();
  plan1.pos(100,200);
  tegn(plan1, initialWave1, scatteredWave1);
  p.pop();

  p.push();
  plan2.pos(plan1.xpos, plan1.ypos + d);
  tegn(plan2, initialWave2, scatteredWave2);
  p.pop();

  initialWave1.bragg();

}

p.keyPressed = function() {
  if (p.key === "w") {
    if (theta < -2*p.PI/3) {theta += p.PI/12;}
  }
  else if (p.key === "s") {
    if (theta < p.PI) {theta -= p.PI/12;}
  }
}


function tegn(plan, bølge1, bølge2) {
  plan.show();

  let x = plan.center[0]; let y = plan.center[1];
  let str = bølge1.str;

  p.translate(x,y);

  let x1 = (str * p.cos(theta)); let y1 = (str * p.sin(theta));

  p.push();
  p.translate(x1, y1);
  p.rotate(theta + p.PI);
  drawWave(bølge1);
  p.pop();

  p.push();
  p.rotate(-theta + p.PI);
  drawWave(bølge2);
  p.pop();

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
    this.str = p.width/2;
    this.center = [];
    this.c = color;
  }

  pos(x,y) {
    this.xpos = x;
    this.ypos = y;
    this.center = [this.xpos + 1/2*this.str, this.ypos];
  }
  show() {
    p.fill(this.c); p.rect(this.xpos, this.ypos, this.str, 5);
     for (let i = 25; i < this.str; i+= 50) {
       p.fill('brown'); p.noStroke();
       p.ellipse(this.xpos + i, this.ypos + 2, 20);
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
       this.y[i] = p.sin(this.phase + p.TWO_PI * ( i / this.period ) ) * this.amplitude;
    }
  }

  bragg() {
    let a = p.round(2*d*p.sin(-theta))
    let b = this.lambda;
    p.textSize(30); p.fill(255); p.text("n(lambda) = n*" +  b, 200, 400);
    p.textSize(30); p.fill(255); p.text("2dsin(theta) = " + a, 200, 450);
  }

  show() {
    for (let i = 0; i < this.str; i+= 4) {
      p.fill(this.color); p.noStroke();
      p.ellipse(i, this.y[i], 6);
    }
  }

  update() {
    this.phase += 0.1;
  }

}
  
}