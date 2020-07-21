"use strict";
var zauberbild;
(function (zauberbild) {
    console.log("verknüpft");
    let mainCanvas;
    let figures = [];
    let backgroundColor;
    let circleDiv;
    let starDiv;
    let triangleDiv;
    let heartDiv;
    zauberbild.drawSymbol = true;
    let backgroundIMage;
    //let save: HTMLButtonElement; 
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let form = document.querySelector("div#chooseFormat");
        backgroundColor = document.querySelector("#chooseColor");
        circleDiv = document.getElementById("symbolOne");
        starDiv = document.getElementById("symbolTwo");
        triangleDiv = document.getElementById("symbolThree");
        heartDiv = document.getElementById("symbolFour");
        mainCanvas = document.getElementById("mainCanvasDraw");
        zauberbild.crc2 = mainCanvas.getContext("2d");
        let canvasCircle = document.getElementById("circle");
        zauberbild.crc3 = canvasCircle.getContext("2d");
        let canvasStar = document.getElementById("star");
        zauberbild.crc4 = canvasStar.getContext("2d");
        let canvasTriangle = document.getElementById("triangle");
        zauberbild.crc5 = canvasTriangle.getContext("2d");
        let canvasHeart = document.getElementById("heart");
        zauberbild.crc6 = canvasHeart.getContext("2d");
        console.log("verknüpft");
        form.addEventListener("change", chooseCanvas);
        backgroundColor.addEventListener("change", chooseBackground);
        createForms();
        circleDiv.addEventListener("click", drawSymbolInMainCanvas);
        starDiv.addEventListener("click", drawSymbolInMainCanvas);
        triangleDiv.addEventListener("click", drawSymbolInMainCanvas);
        heartDiv.addEventListener("click", drawSymbolInMainCanvas);
    }
    function chooseCanvas(_event) {
        console.log("ich wurde geklickt");
        let target = _event.target;
        let id = target.id;
        switch (id) {
            case "format1":
                zauberbild.crc2.canvas.width = 200;
                zauberbild.crc2.canvas.height = 200;
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
        let target = _event.target;
        let value = target.value;
        switch (value) {
            case "yellow":
                zauberbild.crc2.fillStyle = "lightyellow";
                zauberbild.crc2.fill();
                zauberbild.crc2.fillRect(0, 0, zauberbild.crc2.canvas.width, zauberbild.crc2.canvas.height);
                break;
            case "green":
                zauberbild.crc2.fillStyle = "lightgreen";
                zauberbild.crc2.fill();
                zauberbild.crc2.fillRect(0, 0, zauberbild.crc2.canvas.width, zauberbild.crc2.canvas.height);
                break;
            case "pink":
                zauberbild.crc2.fillStyle = "lightpink";
                zauberbild.crc2.fill();
                zauberbild.crc2.fillRect(0, 0, zauberbild.crc2.canvas.width, zauberbild.crc2.canvas.height);
                break;
            case "lightblue":
                zauberbild.crc2.fillStyle = "lightblue";
                zauberbild.crc2.fill();
                zauberbild.crc2.fillRect(0, 0, zauberbild.crc2.canvas.width, zauberbild.crc2.canvas.height);
                break;
        }
    }
    function createForms() {
        let symbol = 1;
        //Stern
        let x = 20;
        let y = 10;
        let position = new zauberbild.Vector(x, y);
        let star = new zauberbild.Star(position);
        star.draw();
        figures.push(star);
        //Circle
        for (let i = 0; i < symbol; i++) {
            let x = -80;
            let y = 0;
            let position = new zauberbild.Vector(x, y);
            let circle = new zauberbild.Circle(position);
            circle.draw();
            figures.push(circle);
        }
        //Dreieck
        for (let i = 0; i < symbol; i++) {
            let x = -20;
            let y = 0;
            let position = new zauberbild.Vector(x, y);
            let triangle = new zauberbild.Triangle(position);
            triangle.draw();
            figures.push(triangle);
        }
        //Herz
        for (let i = 0; i < symbol; i++) {
            let x = 30;
            let y = 0;
            let position = new zauberbild.Vector(x, y);
            let heart = new zauberbild.Heart(position);
            heart.draw();
            figures.push(heart);
        }
    }
    function drawSymbolInMainCanvas(_event) {
        console.log("Ein Symbol wurde geklickt");
        let target = _event.target;
        let id = target.id;
        //if (target.id) { 
        //    drawSymbol = true; 
        //}
        switch (id) {
            case "star":
                let positionStar = new zauberbild.Vector(0, 0);
                let star = new zauberbild.Star(positionStar);
                star.draw();
                figures.push(star);
                break;
            case "circle":
                let positionCircle = new zauberbild.Vector(0, 0);
                let circle = new zauberbild.Heart(positionCircle);
                circle.draw();
                figures.push(circle);
                break;
            case "heart":
                let positionHeart = new zauberbild.Vector(0, 0);
                let heart = new zauberbild.Heart(positionHeart);
                heart.draw();
                figures.push(heart);
                break;
            case "triangle":
                let position = new zauberbild.Vector(0, 0);
                let triangle = new zauberbild.Triangle(position);
                triangle.draw();
                figures.push(triangle);
                break;
        }
    }
    zauberbild.drawSymbolInMainCanvas = drawSymbolInMainCanvas;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map