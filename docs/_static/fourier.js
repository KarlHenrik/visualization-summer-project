let fourier = function(p) {

let time = 0;
let wave = [];
let nSlider;
let rSlider;
let speed;
let button;
    
p.setup = function() {
    p.createCanvas(850, 600);
    rSlider = p.createSlider(50, 85, 60);
    rSlider.position(10, 550);
    nSlider = p.createSlider(1, 25, 1);
    nSlider.position(220, 550);
    speed = p.createSlider(1, 10, 2);
    speed.position(430, 550);
    button = p.createSelect();
    button.option('sawtooth');
    button.option('square');
    button.position(680, 550);
}

p.draw = function() {
    p.background(0);
    p.text('n = ' + nSlider.value().toString(), nSlider.x + 50 , nSlider.y - 10);
    p.text('Speed', speed.x + 40, speed.y - 10);
    p.text('Wave', button.x + 20 , button.y - 10);
    p.text('Radius', rSlider.x + 40 , rSlider.y - 10);
    p.translate(200, 250);
    let r;
    let x = 0;
    let y = 0;
    let offset = 200;

    for(let i = 0; i < nSlider.value(); i++) {
        let prevX = x;
        let prevY = y;
        let n;
        let c;

        if(button.value() == 'sawtooth') {
            if(i % 2 == 0) {
                n = i+1;
            } else {
                n = -(i+1);
            }
            c = i+1;
            r = rSlider.value() * (4 / (n * p.PI));
        } else {
            n = i * 2 + 1; c = n;
            r = rSlider.value() * (4 / (n * p.PI));
        }
        x += r * (p.cos(c * time));
        y += r * (p.sin(c * time));

        p.stroke(255);
        p.noFill();
        p.ellipse(prevX, prevY, r * 2);

        p.fill(255);
        p.line(x, y, prevX, prevY);
    }
    wave.unshift(y);

    p.translate(offset, 0);
    p.line(x-offset, y, 0, wave[0]);
    p.noFill();
    p.beginShape();
    for(let i = 0; i < wave.length; i++){
        p.vertex(i, wave[i]);
    }
    p.endShape();

    if(wave.length > 500) {wave.pop();}

    time += 0.01*speed.value();
}
    
}