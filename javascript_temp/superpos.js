
let time = 0;

let aSlider1;
let pSlider1;
let pSlider2;
let fSlider1;

let phaseSlider1;
let phaseSlider2;

function setup() {
  createCanvas(500, 500);

  aSlider1 = createSlider(20, 60, 40);
  aSlider1.position(0, 460);

  aSlider2 = createSlider(20, 60, 40);
  aSlider2.position(0, 480);

  pSlider1 = createSlider(100, 300, 150);
  pSlider1.position(150, 460)

  pSlider2 = createSlider(100, 300, 150);
  pSlider2.position(150, 480)

  phaseSlider1 = createSlider(0, 2*PI, 2);
  phaseSlider1.position(300, 460);

  phaseSlider2 = createSlider(0, 2*PI, 2);
  phaseSlider2.position(300, 480);

  wave1 = new Wave(70, 100, 0);
  wave2 = new Wave(50, 300, 0);

}

function draw() {
  background(41, 64, 82);

  textSize(15); fill('white'); noStroke();
  text('Amplitude', aSlider1.x + 30, aSlider1.y - 7);
  text('Period', pSlider1.x + 40, pSlider1.y - 7);
  text('Phase', phaseSlider1.x + 40, phaseSlider1.y - 7);

  noStroke(); fill('black');

  wave1.phase = phaseSlider1.value();
  wave2.phase = phaseSlider2.value();
  wave1.period = pSlider1.value();
  wave2.period = pSlider2.value();
  wave1.amplitude = aSlider1.value();
  wave2.amplitude = aSlider2.value();


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
       this.y[i] = sin(this.phase + time + this.f + TWO_PI * ( i / this.period ) ) * this.amplitude;
    }
  }

  show() {
    for (let i = 0; i < this.y.length; i+= 1) {
      ellipse(i, this.y[i], 5);
    }
  }

  update() {
    time += 0.05;
  }
}
