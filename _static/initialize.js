function setup() {
    // id: function pairs
    var functions = {
        orbitsketch: orbit,
        starfield: starfield,
        vectors: vectors,
        energy_canvas: energy,
        oberthdemo: oberth,
        impedanceviz: impedance,
        superposviz: superpos,
        braggviz: bragg,
        fourierviz: fourier,
    };

    var myEle;
    for (var id in functions) {
        myEle = document.getElementById(id);
        if(myEle) {
            let sketch = new p5(functions[id], id);
        }
    }
}
