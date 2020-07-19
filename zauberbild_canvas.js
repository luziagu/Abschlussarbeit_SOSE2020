"use strict";
var zauberbild;
(function (zauberbild) {
    let crc2;
    let figures = [];
    let backgroundColor;
    let bigCanvas;
    let middleCanvas;
    let smallCanvas;
    let backgroundIMage;
    let save;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        smallCanvas = document.querySelector("#format1");
        middleCanvas = document.querySelector("#format2");
        bigCanvas = document.querySelector("#format3");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        console.log("verknüpft");
        smallCanvas.addEventListener("click", chooseCanvas);
        middleCanvas.addEventListener("click", chooseCanvas);
        bigCanvas.addEventListener("click", chooseCanvas);
    }
    function chooseCanvas(_event) {
        console.log("ich wurde geklickt");
        let target = _event.target;
        let id = target.id;
        let canvasDraw;
        switch (id) {
            case "format1":
                canvasDraw = document.querySelector("#canvas");
                crc2.canvas.setAttribute("height: 200px", "width: 200px");
                break;
            case "format2":
                crc2.canvas.setAttribute("height: 500px", "width: 500px");
                break;
            case "format3":
                crc2.canvas.setAttribute("height: 700px", "width: 700px");
                break;
        }
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map