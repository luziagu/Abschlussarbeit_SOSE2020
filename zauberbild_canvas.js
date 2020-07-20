"use strict";
var zauberbild;
(function (zauberbild) {
    console.log("verknüpft");
    let figures = [];
    let backgroundColor;
    let divFrame;
    let backgroundIMage;
    //let save: HTMLButtonElement; 
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let form = document.querySelector("div#chooseFormat");
        divFrame = document.querySelector("div#canvas");
        backgroundColor = document.querySelector("#chooseColor");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        zauberbild.crc2 = canvas.getContext("2d");
        zauberbild.crc3 = canvas.getContext("2d");
        console.log("verknüpft");
        form.addEventListener("change", chooseCanvas);
        backgroundColor.addEventListener("click", chooseBackground);
        createForms();
    }
    function chooseCanvas(_event) {
        console.log("ich wurde geklickt");
        let target = _event.target;
        let id = target.id;
        switch (id) {
            case "format1":
                zauberbild.crc2.canvas.width = 200;
                zauberbild.crc2.canvas.height = 200;
                //divFrame.setAttribute("width", "200"); 
                //divFrame.setAttribute("height", "200"); 
                break;
            case "format2":
                zauberbild.crc2.canvas.width = 200;
                zauberbild.crc2.canvas.height = 500;
                break;
            case "format3":
                zauberbild.crc2.canvas.width = 500;
                zauberbild.crc2.canvas.height = 500;
                break;
        }
    }
    function chooseBackground(_event) {
        console.log("choose color");
    }
    function createForms() {
        let form = 1;
        //Stern
        let x = 0;
        let y = 0;
        let position = new zauberbild.Vector(x, y);
        let star = new zauberbild.Star(position);
        star.draw();
        figures.push(star);
        //Circle
        for (let i = 0; i < form; i++) {
            let x = 0;
            let y = 0;
            let position = new zauberbild.Vector(x, y);
            let circle = new zauberbild.Circle(position);
            circle.draw();
            figures.push(circle);
        }
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map