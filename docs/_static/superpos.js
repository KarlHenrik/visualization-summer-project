let superpos = function(p) {

let time = 0;

let aSlider1;
let pSlider1;
let pSlider2;
let fSlider1;

let phaseSlider1;
let phaseSlider2;

p.setup = function() {
  p.createCanvas(600, 500);
  aSlider1 = p.createSlider(20, 60, 40);
  aSlider1.position(0, 460);

  aSlider2 = p.createSlider(20, 60, 40);
  aSlider2.position(0, 480);

  pSlider1 = p.createSlider(100, 300, 150);
  pSlider1.position(195, 460)

  pSlider2 = p.createSlider(100, 300, 150);
  pSlider2.position(195, 480)

  phaseSlider1 = p.createSlider(0, 2*p.PI, 4, 0.01);
  phaseSlider1.position(390, 460);

  phaseSlider2 = p.createSlider(0, 2*p.PI, 2, 0.01);
  phaseSlider2.position(390, 480);

  wave1 = new Wave(70, 100, 0);
  wave2 = new Wave(50, 300, 0);

}

p.draw = function() {
  p.background(41, 64, 82);

  p.textSize(15); p.fill('white'); p.noStroke();
  p.text('Amplitude', aSlider1.x + 30, aSlider1.y - 7);
  p.text('Period', pSlider1.x + 40, pSlider1.y - 7);
  p.text('Phase', phaseSlider1.x + 40, phaseSlider1.y - 7);

  p.noStroke(); p.fill('black');

  wave1.phase = phaseSlider1.value();
  wave2.phase = phaseSlider2.value();
  wave1.period = pSlider1.value();
  wave2.period = pSlider2.value();
  wave1.amplitude = aSlider1.value();
  wave2.amplitude = aSlider2.value();


  p.push();
  p.translate(0, p.height/6);
  drawWave(wave1, p.width/1.1);
  p.pop();

  p.push();
  p.translate(0, p.height/3);
  drawWave(wave2, p.width/1.1);
  p.pop();


  p.push();
  p.translate(0, p.height/1.5);
  addWaves(wave1, wave2);
  p.pop();
}



function addWaves(wave1, wave2) {
  let y = [];
  if (wave1.y.length == wave2.y.length) {
    for (let i = 0; i < wave1.y.length; i++) {
      y[i] = wave1.y[i] + wave2.y[i];
      p.ellipse(i, y[i], 5);
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

    this.y = [];
  }

  calc(limit) {
    for (let i = 0; i < limit; i++) {
       this.y[i] = this.amplitude * p.sin(this.phase + 
                         p.TWO_PI * (i - 20 * time) * this.period / 20000 );
    }
  }

  show() {
    for (let i = 0; i < this.y.length; i+= 1) {
      p.ellipse(i, this.y[i], 5);
    }
  }

  update() {
    time += 0.05;
  }
}

};