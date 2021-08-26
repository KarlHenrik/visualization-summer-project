// adapted The Coding Train / Daniel Shiffman 's code
// Additive Waves

class Wave {
    constructor(amp, period, phase) {
      this.amplitude = amp;
      this.period = period;
      this.phase = phase;
    }
  
    evaluate(x) {
      return sin(this.phase + (TWO_PI * x) / this.period) * this.amplitude;
    }

    update() {
        this.phase -= 0.03;
    }

    update_back(){
        this.phase += 0.03;
    }
}

let wave_init; 
let wave_trans;
let wave_reflect;
let tex;
//var variable;
//var z_a; //left boundary
//var z_b; //right boundary
//var slider;


function setup() {
    createCanvas(600, 300); 

    let amp = 50;
    //creating sliders for user input
    createP('Slide across to choose impedance value z_a for the red boundary:')
    slider_red = createSlider(50,200,125); //(min,max,start)

    createP('Slide across to choose impedance value z_b for the black boundary:')
    slider_black = createSlider(50,200,125); //(min,max,start)

    let z_a = slider_red.value();
    let z_b = slider_black.value();

    let R = (z_b - z_a)/(z_a + z_b);
    let T = (2*z_a)/(z_a + z_b);

    wave_init = new Wave(amp, 300, 10); //original wave
    wave_trans = new Wave(amp*T, 300, 10); //transmitted
    wave_reflect = new Wave(amp*R, 300, 10); //reflected
    
}

  
function draw() {
    background(240);

    strokeWeight(6); //making boundaries thicker 
    stroke(3,19, 250); //left boundary, red
    line(1, 0, 1, 400);
    stroke(0,17,169); // right boundary, black
    line(400, 0, 400, 400);

    strokeWeight(1);
    stroke(0); //

    // impedances
    let z_a = slider_red.value();
    let z_b = slider_black.value();

    // tranmission and reflection coefficients
    let R = (z_b - z_a)/(z_a + z_b); 
    //let R = (z_a - z_b)/(z_a + z_b); not sure if this one is correct
    let T = (2*z_a)/(z_a + z_b);
    let amp = 100;
    //R = 5
    //T = 3
    //let amp = slider_red.value();
    wave_init.amplitude = amp;
    wave_trans.amplitude = amp*T;
    wave_reflect.amplitude = amp*R;

    for (let x = 0; x < 398; x += 5){
        let y = wave_init.evaluate(x);
        fill(1,152,77);
        ellipse(x, y + height/2, 15, 10);

    }

    for (let x = 404; x < width; x += 5){
        let y_small = wave_trans.evaluate(x);
        fill(179,218,198);
        ellipse(x, y_small + height/2, 15, 10);
        
    }

    for (let x = 399; x > 0; x -= 5){
        let y_big = wave_reflect.evaluate(x);
        fill(255,0,0);
        ellipse(x, y_big + height/2, 15, 10);   

    }

    wave_init.update();
    wave_trans.update();
    wave_reflect.update_back();
}

