"use strict";
var zauberbild;
(function (zauberbild) {
    console.log("verknüpft");
    let mainCanvas;
    let dragDrop = false;
    let objectDragDrop;
    let saveButton;
    let deleteButton;
    let backgroundColor;
    let circleDiv;
    let starDiv;
    let triangleDiv;
    let heartDiv;
    let deleteForm;
    let figures = [];
    let backgroundImage;
    //let save: HTMLButtonElement; 
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("verknüpft");
        deleteForm = true;
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
        deleteButton = document.getElementById("buttonDelete");
        saveButton = document.getElementById("buttonSafe");
        form.addEventListener("change", chooseCanvas);
        backgroundColor.addEventListener("change", chooseBackground);
        circleDiv.addEventListener("click", drawSymbolInMainCanvas);
        starDiv.addEventListener("click", drawSymbolInMainCanvas);
        triangleDiv.addEventListener("click", drawSymbolInMainCanvas);
        heartDiv.addEventListener("click", drawSymbolInMainCanvas);
        deleteButton.addEventListener("click", clearCanvas);
        saveButton.addEventListener("click", saveImage);
        chooseBackground(_event);
        setInterval(animate, 100);
        createForms();
        mainCanvas.addEventListener("click", deleteSymbol);
        mainCanvas.addEventListener("mousedown", mooveSymbol);
        mainCanvas.addEventListener("mouseup", placeSymbol);
    }
    function saveImage(_event) {
        let nameOfPicture = prompt("Bennene dein Zauberbild: ");
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
        console.log(figures);
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
        backgroundImage = zauberbild.crc2.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }
    /*function animation() {
        return setInterval(createForms, 50);
    }*/
    function createForms() {
        let symbol = 1;
        //Stern
        let x = 80;
        let y = 20;
        let position = new zauberbild.Vector(x, y);
        let star = new zauberbild.Star(position);
        star.draw(zauberbild.crc4);
        //figures.push(star);
        //Circle
        for (let i = 0; i < symbol; i++) {
            let x = 35;
            let y = 35;
            let position = new zauberbild.Vector(x, y);
            let circle = new zauberbild.Circle(position);
            circle.draw(zauberbild.crc3);
            //figures.push(circle);
        }
        //Dreieck
        for (let i = 0; i < symbol; i++) {
            let x = 50;
            let y = 47;
            let position = new zauberbild.Vector(x, y);
            let triangle = new zauberbild.Triangle(position);
            triangle.draw(zauberbild.crc5);
            //figures.push(triangle);
        }
        //Herz
        for (let i = 0; i < symbol; i++) {
            let x = 30;
            let y = 20;
            let position = new zauberbild.Vector(x, y);
            let heart = new zauberbild.Heart(position);
            heart.draw(zauberbild.crc6);
            //figures.push(heart);
        }
    }
    function drawSymbolInMainCanvas(_event) {
        console.log("Ein Symbol wurde geklickt");
        let target = _event.target;
        let id = target.id;
        //if (target.id) { 
        //    drawSymbol = true; 
        //}
        let x = 50;
        let y = 50;
        switch (id) {
            case "star":
                let positionStar = new zauberbild.Vector(x, y);
                let star = new zauberbild.Star(positionStar);
                star.draw(zauberbild.crc2);
                figures.push(star);
                break;
            case "circle":
                let positionCircle = new zauberbild.Vector(x, y);
                let circle = new zauberbild.Circle(positionCircle);
                circle.draw(zauberbild.crc2);
                figures.push(circle);
                break;
            case "heart":
                let positionHeart = new zauberbild.Vector(x, y);
                let heart = new zauberbild.Heart(positionHeart);
                heart.draw(zauberbild.crc2);
                figures.push(heart);
                break;
            case "triangle":
                let position = new zauberbild.Vector(x, y);
                let triangle = new zauberbild.Triangle(position);
                triangle.draw(zauberbild.crc2);
                figures.push(triangle);
                break;
        }
    }
    zauberbild.drawSymbolInMainCanvas = drawSymbolInMainCanvas;
    function animate(_event) {
        zauberbild.crc2.putImageData(backgroundImage, 0, 0);
        for (let symbol of figures) {
            if (symbol instanceof zauberbild.Heart)
                symbol.move(1 / 20);
            else if (symbol instanceof zauberbild.Triangle)
                symbol.move(1 / 20);
            else if (symbol instanceof zauberbild.Circle)
                symbol.move(1 / 50);
            else if (symbol instanceof zauberbild.Star)
                symbol.move(1 / 20);
            symbol.draw(zauberbild.crc2);
        }
        if (dragDrop == true) {
            objectDragDrop.position.x = _event.clientX;
            objectDragDrop.position.y = _event.clientY;
            objectDragDrop.draw(zauberbild.crc2);
        }
    }
    function mooveSymbol(_event) {
        console.log("Mousedowm");
        dragDrop = true;
        let mousePosY = _event.clientY;
        let mousePosX = _event.clientX;
        let canvasRect = mainCanvas.getBoundingClientRect();
        let offsetX = mousePosX - canvasRect.left;
        let offsetY = mousePosY - canvasRect.top;
        console.log(offsetX, offsetY);
        for (let figur of figures) {
            if (figur.position.x - figur.radius < offsetX &&
                figur.position.x + figur.radius > offsetX &&
                figur.position.y - figur.radius < offsetY &&
                figur.position.y + figur.radius > offsetY) {
                let index = figures.indexOf(figur);
                figures.splice(index, 1);
                objectDragDrop = figur;
            }
        }
    }
    function placeSymbol(_event) {
        dragDrop = false;
        figures.push(objectDragDrop);
    }
    function deleteSymbol(_event) {
        let mousePosY = _event.clientY;
        let mousePosX = _event.clientX;
        let canvasRect = mainCanvas.getBoundingClientRect();
        let offsetX = mousePosX - canvasRect.left;
        let offsetY = mousePosY - canvasRect.top;
        console.log(offsetX, offsetY);
        for (let figur of figures) {
            if (figur.position.x - figur.radius < offsetX &&
                figur.position.x + figur.radius > offsetX &&
                figur.position.y - figur.radius < offsetY &&
                figur.position.y + figur.radius > offsetY) {
                let index = figures.indexOf(figur);
                figures.splice(index, 1);
                console.log("Es funktioniert");
                console.log(index);
            }
        }
    }
    function clearCanvas() {
        zauberbild.crc2.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        figures = [];
        zauberbild.crc2.save();
        zauberbild.crc2.fillStyle = "white";
        zauberbild.crc2.fill();
        zauberbild.crc2.fillRect(0, 0, zauberbild.crc2.canvas.width, zauberbild.crc2.canvas.height);
        zauberbild.crc2.restore();
    }
    //function selectSymbol(_event: MouseEvent): void {
    //console.log("Der MainCanvas wurde geklickt"); 
    /*let target: HTMLElement = <HTMLElement>_event.target;
    let symbol  = target.appendChild;

    
    if (symbol) {

        let newSymbol: Triangle = new Triangle();
        newSymbol.draw(crc2);
    }*/
    //}
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map