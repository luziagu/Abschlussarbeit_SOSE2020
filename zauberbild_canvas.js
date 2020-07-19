"use strict";
var zauberbild;
(function (zauberbild) {
    let crc2;
    let smallCanvas = document.querySelector("#format1");
    let middleCanvas = document.querySelector("#format2");
    let bigCanvas = document.querySelector("#format3");
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
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
        if (smallCanvas.classList.contains("#format1")) {
            crc2.canvas.setAttribute("height: 200px", "width: 200px");
            let background = document.createElement("canvas").getContext("2d");
            background.canvas.width = 200;
            background.canvas.height = 200;
            background.fillStyle = "#FFA07A";
            background.fillRect(0, 0, background.canvas.width, background.canvas.height);
            background.strokeStyle = "#E9967A";
            background.stroke();
            background.closePath();
        }
        if (smallCanvas.classList.contains("#format2")) {
            crc2.canvas.setAttribute("height: 500px", "width: 500px");
        }
        if (smallCanvas.classList.contains("#format3")) {
            crc2.canvas.setAttribute("height: 700px", "width: 700px");
        }
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map