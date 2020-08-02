"use strict";
var zauberbild;
(function (zauberbild) {
    console.log("verknüpft");
    let url = "https://haushaltshilfe-app.herokuapp.com/";
    let mainCanvas;
    let dragDrop = false;
    let objectDragDrop;
    let saveButton;
    let deleteButton;
    zauberbild.colorpicker = "";
    let backgroundColor;
    let changeSymbol;
    let list;
    let circleDiv;
    let starDiv;
    let triangleDiv;
    let heartDiv;
    let backgroundColorSafe;
    let inputTitle;
    let figures = [];
    let safeMagicImage = [];
    let backgroundImage;
    //let save: HTMLButtonElement; 
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        console.log("verknüpft");
        let form = document.querySelector("div#chooseFormat");
        backgroundColor = document.querySelector("#chooseColor");
        changeSymbol = document.getElementById("changeSymbol");
        circleDiv = document.getElementById("symbolOne");
        starDiv = document.getElementById("symbolTwo");
        triangleDiv = document.getElementById("symbolThree");
        heartDiv = document.getElementById("symbolFour");
        mainCanvas = document.getElementById("mainCanvasDraw");
        zauberbild.crcMain = mainCanvas.getContext("2d");
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
        list = document.querySelector("datalist#titles");
        inputTitle = document.querySelector("#namePic");
        form.addEventListener("change", chooseCanvas);
        backgroundColor.addEventListener("change", function () {
            chooseBackground();
        });
        changeSymbol.addEventListener("change", chooseSymbolForChange);
        circleDiv.addEventListener("click", drawSymbolInMainCanvas);
        starDiv.addEventListener("click", drawSymbolInMainCanvas);
        triangleDiv.addEventListener("click", drawSymbolInMainCanvas);
        heartDiv.addEventListener("click", drawSymbolInMainCanvas);
        deleteButton.addEventListener("click", clearCanvas);
        saveButton.addEventListener("click", saveImage);
        inputTitle.addEventListener("change", choosenTitle);
        mainCanvas.addEventListener("dblclick", deleteSymbol);
        mainCanvas.addEventListener("mousedown", pickSymbol);
        mainCanvas.addEventListener("mouseup", placeSymbol);
        mainCanvas.addEventListener("mousemove", dragSymbol);
        chooseBackground();
        setInterval(animate, 100);
        createForms();
        getTitles();
    }
    function chooseSymbolForChange(_event) {
        console.log("Symbol wurde ausgewählt");
        let target = _event.target;
        let value = target.value;
        let chooseLastSymbol = figures[figures.length - 1];
        switch (value) {
            case "pink":
                chooseLastSymbol.color = "rgb(206, 108, 190)";
                break;
            case "orange":
                chooseLastSymbol.color = "rgb(235, 154, 88)";
                break;
            case "darkred":
                chooseLastSymbol.color = "rgb(235, 68, 68)";
                break;
            case "blau":
                chooseLastSymbol.color = "rgb(69, 56, 141)";
                break;
            case "lightblue":
                chooseLastSymbol.color = "lightblue";
                break;
            case "lightrosa":
                chooseLastSymbol.color = "rgb(218, 150, 201)";
                break;
            case "red":
                chooseLastSymbol.color = "rgb(151, 80, 80)";
                break;
            case "green":
                chooseLastSymbol.color = "rgb(118, 182, 112";
                break;
            case "darkgreen":
                chooseLastSymbol.color = "rgb(56, 99, 52)";
                break;
        }
    }
    async function saveImage(_event) {
        let nameOfPicture = prompt("Bennene dein Zauberbild: ");
        if (nameOfPicture == null || nameOfPicture == "") {
            alert("Du musst deinem Bild einen Namen geben, damit es gespeichert werden kann");
            prompt("Bennene dein Zauberbild: ");
        }
        else if (nameOfPicture != null) {
            //safeMagicImage.push(nameOfPicture); 
            safeMagicImage.push(mainCanvas.width.toString(), mainCanvas.height.toString());
            safeMagicImage.push(backgroundColorSafe);
            for (let figur of figures) {
                safeMagicImage.push(Math.floor(figur.position.x).toString(), Math.floor(figur.position.y).toString());
                safeMagicImage.push(figur.color);
                if (figur instanceof zauberbild.Triangle) {
                    safeMagicImage.push("triangle");
                }
                if (figur instanceof zauberbild.Star) {
                    safeMagicImage.push("star");
                }
                if (figur instanceof zauberbild.Circle) {
                    safeMagicImage.push("circle");
                }
                if (figur instanceof zauberbild.Heart) {
                    safeMagicImage.push("heart");
                }
            }
        }
        let dataServer = JSON.stringify(safeMagicImage); //wandelt Arraxy um, damit der Server es lesen kann 
        let query = new URLSearchParams(dataServer);
        let response = await fetch(url + "?safeImage&name=" + nameOfPicture + "&" + query.toString());
        let texte = await response.text();
        console.log(texte);
        alert("Bild wurde gespeichert");
        //let data: Data = JSON.parse(texte); 
    }
    async function showTitles(_response) {
        let databaseContent = document.querySelector("#namePic");
        let replace = _response.replace(/\\|\[|Object|object|{|}|"|name|:|]/g, ""); //g-> sonderzeichen von allen Elemten im string entfernt, nicht nur das erste
        let prettyArray = replace.split(","); //server antwort aufteilen 
        databaseContent.innerHTML = "";
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        for (let title of prettyArray) {
            if (title == "") {
                //databaseContent.innerHTML += "<br>"  + title;
            }
            else {
                let option = document.createElement("option");
                option.setAttribute("name", title);
                option.value = title;
                list.appendChild(option);
            }
        }
    }
    async function getTitles() {
        let response = await fetch(url + "?getTitles&");
        let texte = await response.text();
        console.log(texte);
        showTitles(texte);
    }
    async function getImage(_pictureTitle) {
        let response = await fetch(url + "?getImage&" + _pictureTitle);
        let texte = await response.text();
        let replace = texte.replace(/\\|\[|{|}|"|name|:|]/g, "");
        let prettyArray = replace.split(",");
        console.log(prettyArray);
        mainCanvas.width = parseInt(prettyArray[3]);
        mainCanvas.height = parseInt(prettyArray[4]);
        backgroundColorSafe = prettyArray[5];
        chooseBackground(prettyArray[5]);
        let info = [];
        prettyArray.splice(0, 6);
        for (let i = 0; i < prettyArray.length; i++) {
            switch (prettyArray[i]) {
                case "triangle":
                    let position = new zauberbild.Vector(parseInt(info[0]), parseInt(info[1]));
                    let triangle = new zauberbild.Triangle(position, info[5]);
                    triangle.draw(zauberbild.crcMain);
                    info = [];
                    figures.push(triangle);
                    break;
                case "circle":
                    let positionCircle = new zauberbild.Vector(parseInt(info[0]), parseInt(info[1]));
                    let circle = new zauberbild.Triangle(positionCircle, info[5]);
                    circle.draw(zauberbild.crcMain);
                    info = [];
                    figures.push(circle);
                    break;
                case "heart":
                    let positionHeart = new zauberbild.Vector(parseInt(info[0]), parseInt(info[1]));
                    let heart = new zauberbild.Triangle(positionHeart, info[5]);
                    heart.draw(zauberbild.crcMain);
                    info = [];
                    figures.push(heart);
                    break;
                case "star":
                    let positionStar = new zauberbild.Vector(parseInt(info[0]), parseInt(info[1]));
                    let star = new zauberbild.Triangle(positionStar, info[5]);
                    star.draw(zauberbild.crcMain);
                    info = [];
                    figures.push(star);
                    break;
                default:
                    info.push(prettyArray[i]);
                    break;
            }
        }
    }
    function choosenTitle(_event) {
        let value = inputTitle.value;
        getImage(value);
    }
    function chooseCanvas(_event) {
        console.log("ich wurde geklickt");
        let target = _event.target;
        let id = target.id;
        switch (id) {
            case "format1":
                zauberbild.crcMain.canvas.width = 200;
                zauberbild.crcMain.canvas.height = 200;
                break;
            case "format2":
                zauberbild.crcMain.canvas.width = 200;
                zauberbild.crcMain.canvas.height = 500;
                break;
            case "format3":
                zauberbild.crcMain.canvas.width = 500;
                zauberbild.crcMain.canvas.height = 500;
                break;
        }
        backgroundImage = zauberbild.crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }
    function chooseBackground(_color) {
        console.log("choose color");
        let colors = document.querySelector("select#chooseColor");
        let color = colors.value;
        if (_color) {
            zauberbild.crcMain.fillStyle = _color;
            zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.width);
            backgroundColorSafe = _color;
        }
        else {
            switch (color) {
                case "white":
                    zauberbild.crcMain.fillStyle = "white";
                    zauberbild.crcMain.fill();
                    zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
                    break;
                case "yellow":
                    zauberbild.crcMain.fillStyle = "lightyellow";
                    zauberbild.crcMain.fill();
                    zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
                    break;
                case "green":
                    zauberbild.crcMain.fillStyle = "rgb(152, 192, 148)";
                    zauberbild.crcMain.fill();
                    zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
                    backgroundColorSafe = "lightgreen";
                    break;
                case "pink":
                    zauberbild.crcMain.fillStyle = "lightpink";
                    zauberbild.crcMain.fill();
                    zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
                    backgroundColorSafe = "lightpink";
                    break;
                case "lightblue":
                    zauberbild.crcMain.fillStyle = "lightblue";
                    zauberbild.crcMain.fill();
                    zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
                    backgroundColorSafe = "lightblue";
                    break;
                case "lavendel":
                    zauberbild.crcMain.fillStyle = "rgb(212, 177, 189)";
                    zauberbild.crcMain.fill();
                    zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
                    backgroundColorSafe = "lavendel";
                    break;
            }
        }
        backgroundImage = zauberbild.crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }
    function createForms() {
        //Stern
        let star = new zauberbild.Star(new zauberbild.Vector(zauberbild.crc4.canvas.width / 2, zauberbild.crc4.canvas.height / 2));
        star.draw(zauberbild.crc4);
        //Circle
        let circle = new zauberbild.Circle(new zauberbild.Vector(zauberbild.crc3.canvas.width / 2, zauberbild.crc3.canvas.height / 2));
        circle.draw(zauberbild.crc3);
        //Dreieck
        let triangle = new zauberbild.Triangle(new zauberbild.Vector(zauberbild.crc5.canvas.width / 2, zauberbild.crc5.canvas.height / 2));
        triangle.draw(zauberbild.crc5);
        //Herz
        let heart = new zauberbild.Heart(new zauberbild.Vector(zauberbild.crc6.canvas.width / 2, zauberbild.crc6.canvas.height / 2));
        heart.draw(zauberbild.crc6);
    }
    function drawSymbolInMainCanvas(_event) {
        console.log("Ein Symbol wurde geklickt");
        let target = _event.target;
        let id = target.id;
        let positionForCanvas = new zauberbild.Vector(zauberbild.crcMain.canvas.width / 2, zauberbild.crcMain.canvas.height / 2);
        let symbol;
        switch (id) {
            case "star":
                symbol = new zauberbild.Star(positionForCanvas);
                break;
            case "circle":
                symbol = new zauberbild.Circle(positionForCanvas);
                break;
            case "heart":
                symbol = new zauberbild.Heart(positionForCanvas);
                break;
            case "triangle":
                symbol = new zauberbild.Triangle(positionForCanvas);
                break;
            default:
                return;
        }
        figures.push(symbol);
        symbol.draw(zauberbild.crcMain);
    }
    zauberbild.drawSymbolInMainCanvas = drawSymbolInMainCanvas;
    function animate(_event) {
        zauberbild.crcMain.putImageData(backgroundImage, 0, 0);
        for (let symbol of figures) {
            if (symbol instanceof zauberbild.Heart)
                symbol.move(1 / 20);
            else if (symbol instanceof zauberbild.Triangle)
                symbol.move(1 / 20);
            else if (symbol instanceof zauberbild.Circle)
                symbol.move(1 / 50);
            else if (symbol instanceof zauberbild.Star)
                symbol.move(1 / 20);
            symbol.draw(zauberbild.crcMain);
        }
        if (dragDrop == true) {
            objectDragDrop.draw(zauberbild.crcMain);
        }
    }
    function dragSymbol(_event) {
        //let position: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
        if (dragDrop == true) {
            objectDragDrop.position.x = _event.clientX - mainCanvas.getBoundingClientRect().left;
            objectDragDrop.position.y = _event.clientY - mainCanvas.getBoundingClientRect().top;
        }
    }
    function pickSymbol(_event) {
        console.log("Mousedown");
        dragDrop = true;
        let mousePosY = _event.clientY;
        let mousePosX = _event.clientX;
        let canvasRect = mainCanvas.getBoundingClientRect();
        let offsetX = mousePosX - canvasRect.left;
        let offsetY = mousePosY - canvasRect.top;
        for (let figur of figures) {
            if (figur.position.x - figur.radius < offsetX &&
                figur.position.x + figur.radius > offsetX &&
                figur.position.y - figur.radius < offsetY &&
                figur.position.y + figur.radius > offsetY) {
                console.log(figur);
                let index = figures.indexOf(figur);
                figures.splice(index, 1);
                objectDragDrop = figur;
            }
        }
    }
    function placeSymbol(_event) {
        console.log("MouseUp");
        if (dragDrop == true) {
            dragDrop = false;
            figures.push(objectDragDrop);
        }
    }
    function deleteSymbol(_event) {
        let mousePosY = _event.clientY;
        let mousePosX = _event.clientX;
        let canvasRect = mainCanvas.getBoundingClientRect();
        let offsetX = mousePosX - canvasRect.left;
        let offsetY = mousePosY - canvasRect.top;
        for (let figur of figures) {
            if (figur.position.x - figur.radius < offsetX &&
                figur.position.x + figur.radius > offsetX &&
                figur.position.y - figur.radius < offsetY &&
                figur.position.y + figur.radius > offsetY) {
                let index = figures.indexOf(figur);
                figures.splice(index, 1);
                console.log("Es funktioniert");
            }
        }
    }
    function clearCanvas() {
        zauberbild.crcMain.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        figures = [];
        let clearBackground = false;
        if (clearBackground == false) {
            backgroundImage = zauberbild.crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
            zauberbild.crcMain.fillStyle = "white";
            zauberbild.crcMain.fill();
            zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
            zauberbild.crcMain.restore();
        }
        zauberbild.crcMain.save();
    }
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map