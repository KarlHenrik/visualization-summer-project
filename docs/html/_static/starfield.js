let starfield = function(p) {
    class Star {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        getx() {
            return this.x;
        }

        draw() {
            p.point(this.x, this.y);
        }

        move() {
            this.x += this.y * 0.01 - this.x * 0.007;
            this.y += -this.x * 0.01 + this.y * 0.007;
        }
    }

    let stars = [];
    let centerX;
    let centerY;

    p.setup = function() {
        var canvas = p.createCanvas(1080, 720);
        canvas.mouseClicked(canvasClick);
        centerX = p.width / 2;
        centerY = p.height / 2;
        p.translate(centerX, centerY);
        p.background(021);
        p.frameRate(144);

        p.fill("red");
        p.stroke("red");
        p.circle(0, 0, 40);
        p.stroke("orange");
        p.strokeWeight(1);

        for(var i = 0; i < 1000; i++) {
            stars.push(new Star((Math.random() * p.width - centerX) * 3, (Math.random() * p.height - centerY) * 3));
        }
    };

    function canvasClick() {
        if (p.mouseButton == LEFT) {
            p.background(021);
            centerX = p.mouseX;
            centerY = p.mouseY;
            stars = [];
            for(var i = 0; i < 1000; i++) {
                stars.push(new Star((Math.random() * p.width - centerX) * 3, (Math.random() * p.height - centerY) * 3));
            }
        }
    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(021);
    };

    p.draw = function() {
        p.translate(centerX, centerY);
        p.fill("red");
        p.stroke("red");
        p.circle(0, 0, 40);
        p.stroke("orange");
        //background(021);
        stars.forEach(star => star.move());
        stars.forEach(star => star.draw());
    }
};
