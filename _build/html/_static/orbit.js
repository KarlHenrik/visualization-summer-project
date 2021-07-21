let orbit = function(p) {
    p.pos = [732, 360];
    p.earthPos = [540, 360];
    p.vel = [0, 2];
    p.ec = p.color(0, 204, 200); // earth color, blue
    p.mc = p.color(255, 204, 0); // moon color, yellow

    p.setup = function() {
        p.createCanvas(1080, 720);
        p.background(021); // black
        p.noStroke();

        p.fill(p.ec);
        p.ellipse(p.earthPos[0], p.earthPos[1], 10, 10);
    };

    p.draw = function() {
        if (p.mouseIsPressed && p.mouseX > 0 && p.mouseY > 0 && p.mouseX < 1080 && p.mouseY < 720) {
            p.earthPos = [p.mouseX, p.mouseY];
            p.fill(p.ec);
            p.ellipse(p.earthPos[0], p.earthPos[1], 10, 10);
        }
        let grav = gravity(p.pos, p.earthPos);
        p.vel[0] += grav[0]
        p.vel[1] += grav[1]
        p.pos[0] += p.vel[0]
        p.pos[1] += p.vel[1]
        p.fill(p.mc);
        p.ellipse(p.pos[0], p.pos[1], 10, 10);
    };

    function gravity(pos1, pos2) {
        let dist = Math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)
        let consts = -800;
        let grav = [consts * (pos1[0] - pos2[0])/dist**3, consts * (pos1[1] - pos2[1])/dist**3]
        return grav
    };
};
