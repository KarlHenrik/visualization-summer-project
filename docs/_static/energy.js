let energy = function(p) {
    let mePos = [300, 300];
    let earthPos = [50, 300];
    let kinetic0 = 700;

    let earthC = p.color(50, 154, 200);
    let meC = p.color(245, 204, 15);
    let barC = p.color(188, 204, 200);
    let potC = p.color(0, 20, 200);
    let kinC = p.color(200, 20, 40);
    let bg = p.color(40, 15, 15);


    p.setup = function() {
        p.createCanvas(1080, 360);
        p.noStroke();
    };

    p.draw = function() {
        p.clear()
        //p.background(bg); // black
        // Earth
        p.fill(earthC);
        p.ellipse(earthPos[0], earthPos[1], 40, 40);
        // Me
        p.fill(meC);
        p.ellipse(mePos[0], mePos[1], 30, 30);
        // Arrow
        let pot = potentialEnergy();
        let spd = Math.sqrt(kinetic0 - pot) * 5
        let pad = 20
        p.rect(    mePos[0] + pad           , mePos[1] - 10, spd, 20);
        p.triangle(mePos[0] + pad + spd     , mePos[1] - 15,
                   mePos[0] + pad + spd     , mePos[1] + 15,
                   mePos[0] + pad + spd + 30, mePos[1]);
        // Empty bars
        p.fill(barC);
        p.rect(30, 50, 800, 50);
        p.rect(30, 180, 800, 50);
        // Filled bars
        p.fill(potC);
        p.rect(30, 50, pot, 50);
        p.fill(kinC);
        p.rect(30, 180, kinetic0 - pot, 50);
        // Text
        p.textSize(28);
        p.fill(0, 0, 0);
        p.text('Potential Energy', 360, 30);
        p.fill(0, 0, 0);
        p.text('Kinetic Energy', 375, 160);
        // User input
        if (p.mouseIsPressed &&
        p.mouseX > 0 && p.mouseY > 0 &&
        p.mouseX < 1080 && p.mouseY < 720) {
            mePos[0] = p.mouseX;
        }
    };

    function potentialEnergy() {
        let h0 = 20;
        let mp = Math.max(mePos[0], h0);
        let R = Math.abs(mp - earthPos[0]);
        R = Math.max(R, h0);
        return 12000 / h0 - 12000 / R;
    };

};
