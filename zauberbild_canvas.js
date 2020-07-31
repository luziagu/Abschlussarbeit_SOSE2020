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
    let circleDiv;
    let starDiv;
    let triangleDiv;
    let heartDiv;
    let backgroundColorSafe;
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
        form.addEventListener("change", chooseCanvas);
        backgroundColor.addEventListener("change", chooseBackground);
        changeSymbol.addEventListener("change", chooseSymbolForChange);
        circleDiv.addEventListener("click", drawSymbolInMainCanvas);
        starDiv.addEventListener("click", drawSymbolInMainCanvas);
        triangleDiv.addEventListener("click", drawSymbolInMainCanvas);
        heartDiv.addEventListener("click", drawSymbolInMainCanvas);
        deleteButton.addEventListener("click", clearCanvas);
        saveButton.addEventListener("click", saveImage);
        chooseBackground(_event);
        setInterval(animate, 100);
        createForms();
        mainCanvas.addEventListener("dblclick", deleteSymbol);
        mainCanvas.addEventListener("mousedown", pickSymbol);
        mainCanvas.addEventListener("mouseup", placeSymbol);
        mainCanvas.addEventListener("mousemove", dragSymbol);
    }
    function chooseSymbolForChange(_event) {
        console.log("Symbol wurde ausgewählt");
        let target = _event.target;
        let value = target.value;
        let chooseLastSymbol = figures[figures.length - 1];
        switch (value) {
            case "yellow":
                chooseLastSymbol.color = "yellow";
                figures.splice(1);
                break;
            case "green":
                figures.splice(1);
                chooseLastSymbol.color = "lightgreen";
                break;
            case "pink":
                chooseLastSymbol.color = "pink";
                break;
            case "lightblue":
                chooseLastSymbol.color = "lightblue";
                break;
        }
        backgroundImage = zauberbild.crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }
    async function saveImage(_event) {
        let nameOfPicture = prompt("Bennene dein Zauberbild: ");
        if (nameOfPicture != null) {
            //safeMagicImage.push(nameOfPicture); 
            safeMagicImage.push(mainCanvas.width.toString(), mainCanvas.height.toString());
            safeMagicImage.push(backgroundColorSafe);
            for (let figur of figures) {
                safeMagicImage.push(Math.floor(figur.position.x).toString(), Math.floor(figur.position.y).toString());
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
        let response = await fetch(url + "?safeImage&name=" + "A" + nameOfPicture + "&" + query.toString());
        let texte = await response.text();
        console.log(texte);
        alert(texte);
        //let data: Data = JSON.parse(texte); 
    }
    /*async function showTitles(_response: string): Promise<void> {
        let titles: string[] = _response.split(",");
        for (let title of titles) {
            if (title == "") {

            }
            else {
                let option: HTMLOptionElement = document.createElement("option");
                option.setAttribute("name", title);
                option.value = title;
            }
        }
    }*/
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
    function chooseBackground(_event) {
        console.log("choose color");
        let target = _event.target;
        let value = target.value;
        switch (value) {
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
        backgroundImage = zauberbild.crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }
    /*function animation() {
        return setInterval(createForms, 50);
    }*/
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
            zauberbild.crcMain.fillStyle = "white";
            zauberbild.crcMain.fill();
            zauberbild.crcMain.fillRect(0, 0, zauberbild.crcMain.canvas.width, zauberbild.crcMain.canvas.height);
            zauberbild.crcMain.restore();
        }
        zauberbild.crcMain.save();
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
    /*async function showDatabaseContent(_event: Event): Promise<void> {

        console.log("Ich wurde geklickt");
        let databaseContent: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#savedPictures");
        let response: Response = await fetch(serverUrl + "?" + "getmagicPicture=yes");
        
        databaseContent.innerHTML = "";
        let responseText: string = await response.text();
        let replace: string = responseText.replace(/\\|{|}|"|/g, "");
        console.log(replace);
        for (let entry of replace) {
            switch (entry) {
                case ("_"):
                    databaseContent.innerHTML += "<br>"  + entry;
                    break;
                case ("["):
                    break;
                case ("]"):
                    break;
                case (","):
                    databaseContent.innerHTML += "<br>";
                    break;
                case (":"):
                    databaseContent.innerHTML += entry + " ";
                    break;
                default:
                    databaseContent.innerHTML += "" + entry;
                    break;
            }
        }
        console.log(responseText);

    }*/
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=zauberbild_canvas.js.map