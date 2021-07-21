let vectors = function(p) {
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        getx() {
            return this.x;
        }
        setx(x) {
            this.x = x;
        }
        gety() {
            return this.y;
        }
        sety(y) {
            this.y = y;
        }
        add(vec) {
            return new Vector(this.x + vec.getx(), this.y + vec.gety());
        }
        sub(vec) {
            return new Vector(this.x - vec.getx(), this.y - vec.gety());
        }
        len() {
            return Math.sqrt(this.x**2 + this.y**2)
        }
        multNew(fac) {
            return new Vector(this.x * fac, this.y * fac);
        }
        mult(fac) {
            this.x *= fac;
            this.y *= fac;
            return this;
        }
        draw() {
            p.line(0, 0, this.x * scaling, -this.y * scaling);
            let x = this.x * scaling;
            let y = this.y * scaling;
            let len = this.len() * scaling;
            let ny = y/len;
            let nx = -x/len;
            let hl = 5
            let hw = 5
            p.triangle(x, -y, x + hl * nx - hw * ny, -(y - hl * ny - hw * nx), x + hl * nx + hw * ny, -(y - hl * ny + hw * nx));
        }
        dir() {
            return this.multNew(1/this.len())
        }
        transform(matrix) {
            let x = matrix[0] * this.x + matrix[1] * this.y
            let y = matrix[2] * this.x + matrix[3] * this.y
            return new Vector(x, y);
        }
    }

    let vec = new Vector(2, 1);
    let vec2 = new Vector(1, -3);
    let scaling;

    p.setup = function() {
        p.createCanvas(1080, 720);
        p.translate(p.width / 2, p.height / 2);
        p.background(021);
        p.stroke(color(200,200,200));
        scaling = 40
        p.strokeCap(p.SQUARE);

        clears();
    };

    function clears() {
        p.clear();

        p.strokeWeight(1);
        for(let i = -15; i < 15; i++) {
            let middle = i == 0
            if(middle) {
                p.stroke(color(255,11,11));
                p.line(i * scaling, -p.height, i * scaling, p.height);
                p.line(-p.width, i * scaling, p.width, i * scaling);
                p.stroke(color(200,200,200));
            } else {
                p.line(i * scaling, -p.height, i * scaling, p.height);
                p.line(-p.width, i * scaling, p.width, i * scaling);
            }
        }
    }

    p.draw = function() {
        p.translate(p.width / 2, p.height / 2);
        clears();

        vec.setx((p.mouseX - p.width/2)/scaling);
        vec.sety((-p.mouseY + p.height/2)/scaling);
        if(mouseIsPressed) {
            p.strokeWeight(4);
            vec.draw();
            vec.transform([-1,2,1,-1]).draw();
        }
    };
};
