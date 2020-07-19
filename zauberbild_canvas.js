"use strict";
var zauberbild;
(function (zauberbild) {
    console.log("verknüpft");
    let crc2;
    //let figures: Form [] = [];
    //let backgroundColor: HTMLInputElement; 
    let bigCanvas;
    let middleCanvas;
    let smallCanvas;
    //let backgroundIMage: ImageData; 
    //let save: HTMLButtonElement; 
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
        switch (id) {
            case "format1":
                crc2.canvas.width = 200;
                crc2.canvas.height = 200;
                break;
            case "format2":
                crc2.canvas.width = 200;
                crc2.canvas.height = 500;
                break;
            case "format3":
                crc2.canvas.width = 500;
                crc2.canvas.height = 500;
                break;
        }
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map