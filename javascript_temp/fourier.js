let time = 0;
let wave = [];
let nSlider;
let rSlider;
let speed;
let button;
function setup() {
	createCanvas(1000, 600);
	rSlider = createSlider(50, 100, 50);
	rSlider.position(50, 550);
	nSlider = createSlider(1, 25, 1);
	nSlider.position(200, 550);
	speed = createSlider(1, 10, 2);
	speed.position(350, 550);
	button = createSelect();
	button.option('sawtooth');
	button.option('square');
	button.position(500, 550);
}

function draw() {
	background(0);
	text('n', nSlider.x + 50 , nSlider.y - 10);
	text('Speed', speed.x + 40, speed.y - 10);
	text('Wave', button.x + 20 , button.y - 10);
	text('Radius', rSlider.x + 40 , rSlider.y - 10);
	translate(200, 250);
	let r;
	let x = 0;
	let y = 0;
	let offset = 400;

	for(let i = 0; i < nSlider.value(); i++){

    let prevX = x;
		let prevY = y;
		let n;
		let c;

		if(button.value() == 'sawtooth'){
			if(i % 2 == 0){
				n = i+1;
			}
      else{
				n = -(i+1);
			}
			c = i+1;
			r = rSlider.value() * (4 / (n * PI));
		}
    else {
			n = i * 2 + 1; c = n;
			r = rSlider.value() * (4 / (n * PI));
		}

		x += r * (cos(c * time));
		y += r * (sin(c * time));

		stroke(255);
		noFill();
		ellipse(prevX, prevY, r * 2);

		fill(255);
		line(x, y, prevX, prevY);
	}
	wave.unshift(y);

	translate(offset, 0);
	line(x-offset, y, 0, wave[0]);
	noFill();
	beginShape();
    for(let i = 0; i < wave.length; i++){
		vertex(i, wave[i]);
	}
	endShape();

	if(wave.length > 500) {wave.pop();}

  time += 0.01*speed.value();
