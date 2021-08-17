let oberth = function(p) {
    let earthPos = p.createVector(240, 460);
    let ec = p.color(0, 204, 200); // earth color, blue
  
    let pos = p.createVector(300, 460);
    let vel = p.createVector(0, 1.5);
    let acc = p.createVector(0, 0);
    let mc = p.color(255, 204, 0); // moon color, yellow
  
    let maxFuel = 300;
    let fuel = maxFuel;
    let dt = 0.2;
    let energy = 0;
    let history = [];
  
    let barC = p.color(188, 204, 200);
    let potC = p.color(0, 20, 200);
    let kinC = p.color(200, 20, 40);
    let bg = p.color(40, 15, 15);
  
    p.setup = function() {
        p.frameRate(60);
        p.createCanvas(1080, 720);
        p.background(021); // black
        p.noStroke();
      
        energy = mechanical(earthPos, pos, vel);
      
        let button = p.createButton("reset sketch");
        button.mousePressed(resetSketch);
    };

    p.draw = function() {
        for (let i = 0; i < 10; i++) {
            step();
        }
      
        p.background(021); // black
      
        if (p.mouseIsPressed && p.mouseX > 0 && 
            p.mouseY > 0 && p.mouseX < 1080 && p.mouseY < 720 &&
            fuel > 0) {
            energy = mechanical(earthPos, pos, vel);
            p.fill("red");
            let velunit = p5.Vector.normalize(vel).mult(20)
            p.triangle(pos.x, pos.y,
                       pos.x - velunit.y * 0.5 - velunit.x, pos.y + velunit.x * 0.5 - velunit.y,
                       pos.x + velunit.y * 0.5 - velunit.x, pos.y - velunit.x * 0.5 - velunit.y
                       );
        }
        
        p.fill(ec);
        p.ellipse(earthPos.x, earthPos.y, 10, 10);
      
        p.fill(mc);
        p.ellipse(pos.x, pos.y, 10, 10);
      
        history.push(pos.copy());
        p.beginShape();
        p.noFill();
        p.stroke("yellow");
        for (let i = Math.max(0, history.length - 1000); i < history.length; i++) {
            let pos_i = history[i];
            p.vertex(pos_i.x, pos_i.y);
        }
        p.endShape();
        p.noStroke();
      
        // Empty bars
        p.fill(barC);
        p.rect(120, 45, 800, 50);
        p.rect(120, 160, 800, 50);
        // Filled bars
        p.fill(potC);
        p.rect(120, 45, 800 * fuel/maxFuel, 50);
        p.fill(kinC);
        p.rect(120, 160, 400 + energy, 50);
        p.fill("black");
        p.text(energy.toFixed(2), 815, 193);
        // Zero border
        p.fill("yellow");
        p.rect(518, 160, 4, 50);
        // Text
        p.textSize(28);
        p.fill(233, 233, 233);
        p.text('Fuel', 490, 30);
        p.text('Mechanical Energy', 405, 140);
    };
  
    function step() {
        acc = gravity(pos, earthPos).add(boost(vel));
        vel.add(p5.Vector.mult(acc, dt));
        pos.add(p5.Vector.mult(vel, dt));
    }

    function gravity(pos1, pos2) {
        let dist = pos1.dist(pos2);
        let consts = -300 / dist**3;
        let grav = p5.Vector.sub(pos1, pos2).mult(consts);
        return grav;
    };
  
    function boost(vel) {
        let bst;
        if (p.mouseIsPressed && p.mouseX > 0 && 
            p.mouseY > 0 && p.mouseX < 1080 && p.mouseY < 720 &&
            fuel > 0) {
            bst = p5.Vector.normalize(vel).mult(0.017);
            fuel -= 1;
        } else {
            bst = p.createVector(0, 0);
        }
        return bst;
    }
  
    function mechanical(earthPos, pos, vel) {
        energy = 0.5 * vel.magSq()
        energy -= 300 / earthPos.dist(pos);
        return energy * 100;
    }
  
    function resetSketch() {
        pos = p.createVector(300, 460);
        vel = p.createVector(0, 1.5);
        history = [];
        fuel = maxFuel;
        energy = mechanical(earthPos, pos, vel);
    };
};