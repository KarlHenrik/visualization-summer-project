let theta = 0;
let waves = [];
let radi = 100;

let slider;

function setup() {
  createCanvas(1000, 1000);
  slider = createSlider(1, 50, 1);
}

function draw() {
  background(0);
  translate(width / 3, height / 2);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {

    let prevx = x;
    let prevy = y;


    let n = 2*i + 1;
    let r = radi * ( 4/(n*PI) );

    x += r * cos( n*theta );
    y += r * sin( n*theta );


    if (prevx == 0 && prevy == 0) {noFill(); stroke('white'); ellipse(prevx, prevy, r*2); } else{
      noFill(); stroke(100); ellipse(prevx, prevy, r*2);
    }
    stroke('white'); noFill(); line(prevx,prevy, x,y);


  }

  waves.unshift(y);


  translate(200, 0);


  stroke(255); line(x-200, y, 0, waves[0]);

  beginShape();
  for(let i = 0; i < waves.length; i++) {
    vertex(i, waves[i]);
  }
  endShape(); if(waves.length > 500) {waves.pop();}



  theta += 0.01;
}
