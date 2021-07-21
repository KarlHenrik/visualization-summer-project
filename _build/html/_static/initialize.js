function setup() {
    // id: function pairs
    var functions = {
        orbitsketch: orbit,
        starfield: starfield,
        vectors: vectors,
        vectors2: orbit,
    };

    var myEle;
    for (var id in functions) {
        myEle = document.getElementById(id);
        if(myEle) {
            let sketch = new p5(functions[id], id);
        }
    }
}
