
let aSlider1;
let pSlider1;
let fSlider1;

function setup() {

  aSlider1 = createSlider(20, 60, 40);
  pSlider1 = createSlider(100, 300, 150);


  aSlider2 = createSlider(20, 60, 40);
  pSlider2 = createSlider(100, 300, 150);


  createCanvas(500, 500);
  wave1 = new Wave(70, 100, 0);
  wave2 = new Wave(50, 300, 0);

}

function draw() {
  background(220);


  wave1.amplitude = aSlider1.value();
  wave1.period = pSlider1.value();


  wave2.amplitude = aSlider2.value();
  wave2.period = pSlider2.value();

  keyPressed(wave1);
  //keyPressed(wave2);


  push();
  translate(0, height/6);
  drawWave(wave1, width/1.2);
  pop();

  push();
  translate(0, height/3);
  drawWave(wave2, width/1.2);
  pop();


  push();
  translate(0, height/1.5);
  addWaves(wave1, wave2);
  pop();



}

function keyPressed(wave) {
  if (keyCode == UP_ARROW) {

  }
  else if(keyCode == DOWN_ARROW) {

  }
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

function drawWave(o, size) {

  o.calc(size);
  o.update();
  o.show();
}


class Wave {

  constructor(amplitude, period, phase) {
    this.amplitude = amplitude;
    this.period = period;
    this.phase = phase;
    this.f = 1;

    this.y = [];
  }

  calc(limit) {
    for (let i = 0; i < limit; i++) {
       this.y[i] = sin(this.phase + this.f + TWO_PI * ( i / this.period ) ) * this.amplitude;
    }
  }

  show() {
    for (let i = 0; i < this.y.length; i+= 5) {
      ellipse(i, this.y[i], 5);
    }
  }

  update() {
    this.phase += 0.1;
  }  
