namespace zauberbild {

    console.log("verknüpft");

    export let crcMain: CanvasRenderingContext2D;
    export let crc3: CanvasRenderingContext2D;
    export let crc4: CanvasRenderingContext2D;
    export let crc5: CanvasRenderingContext2D;
    export let crc6: CanvasRenderingContext2D;


    let url: string = "https://haushaltshilfe-app.herokuapp.com/";
    let mainCanvas: HTMLCanvasElement;

    let dragDrop: boolean = false;
    let objectDragDrop: Form;
    let saveButton: HTMLButtonElement;
    let deleteButton: HTMLButtonElement;
    export let colorpicker: string = "";

    let backgroundColor: HTMLSelectElement;
    let changeSymbol: HTMLSelectElement;
    let list: HTMLDataListElement;

    let circleDiv: HTMLDivElement;
    let starDiv: HTMLDivElement;
    let triangleDiv: HTMLDivElement;
    let heartDiv: HTMLDivElement;
    let backgroundColorSafe: string;

    let inputTitle: HTMLInputElement;


    let figures: Form[] = [];
    let safeMagicImage: string[] = [];
    let backgroundImage: ImageData;
    //let save: HTMLButtonElement; 

    window.addEventListener("load", handleLoad);

    async function handleLoad(_event: Event): Promise<void> {

        console.log("verknüpft");


        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#chooseFormat");
        backgroundColor = <HTMLSelectElement>document.querySelector("#chooseColor");
        changeSymbol = <HTMLSelectElement>document.getElementById("changeSymbol");

        circleDiv = <HTMLDivElement>document.getElementById("symbolOne");
        starDiv = <HTMLDivElement>document.getElementById("symbolTwo");
        triangleDiv = <HTMLDivElement>document.getElementById("symbolThree");
        heartDiv = <HTMLDivElement>document.getElementById("symbolFour");

        mainCanvas = <HTMLCanvasElement>document.getElementById("mainCanvasDraw");
        crcMain = <CanvasRenderingContext2D>mainCanvas.getContext("2d");

        let canvasCircle: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("circle");
        crc3 = <CanvasRenderingContext2D>canvasCircle.getContext("2d");

        let canvasStar: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("star");
        crc4 = <CanvasRenderingContext2D>canvasStar.getContext("2d");

        let canvasTriangle: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("triangle");
        crc5 = <CanvasRenderingContext2D>canvasTriangle.getContext("2d");

        let canvasHeart: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("heart");
        crc6 = <CanvasRenderingContext2D>canvasHeart.getContext("2d");


        deleteButton = <HTMLButtonElement>document.getElementById("buttonDelete");
        saveButton = <HTMLButtonElement>document.getElementById("buttonSafe");
        list = <HTMLDataListElement>document.querySelector("datalist#titles");
        inputTitle = <HTMLInputElement>document.querySelector("#namePic");

        form.addEventListener("change", chooseCanvas);
        backgroundColor.addEventListener("change", function (): void {
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

    function chooseSymbolForChange(_event: Event): void {

        console.log("Symbol wurde ausgewählt");
        let target: HTMLSelectElement = <HTMLSelectElement>_event.target;
        let value: string = target.value;

        let chooseLastSymbol: any = figures[figures.length - 1];

        switch (value) {

            case "pink":
                chooseLastSymbol.color = "#CE6CBE";
                break;
            case "orange":
                chooseLastSymbol.color = "#EB9A58";

                break;
            case "darkred":
                chooseLastSymbol.color = "#eb4444";
                break;
            case "blau":
                chooseLastSymbol.color = "#45388d";
                break;
            case "lightblue":
                chooseLastSymbol.color = "lightblue";
                break;
            case "lightrosa":
                chooseLastSymbol.color = "#da96c9";
                break;
            case "red":
                chooseLastSymbol.color = "#975050";
                break;
            case "green":
                chooseLastSymbol.color = "#76b670";
                break;
            case "darkgreen":
                chooseLastSymbol.color = "#386334";
                break;
        }
    }

    async function saveImage(_event: MouseEvent): Promise<void> {

        let nameOfPicture: string | null = prompt("Bennene dein Zauberbild: ");
        if (nameOfPicture == null || nameOfPicture == "") {
            alert("Du musst deinem Bild einen Namen geben, damit es gespeichert werden kann");
            prompt("Bennene dein Zauberbild: ");
        } else

            if (nameOfPicture != null) {

                //safeMagicImage.push(nameOfPicture); 
                safeMagicImage.push(mainCanvas.width.toString(), mainCanvas.height.toString());
                safeMagicImage.push(backgroundColorSafe);

                for (let figur of figures) {
                    safeMagicImage.push(Math.floor(figur.position.x).toString(), Math.floor(figur.position.y).toString());
                    safeMagicImage.push(figur.color);

                    if (figur instanceof Triangle) {
                        safeMagicImage.push("triangle");
                    }

                    if (figur instanceof Star) {
                        safeMagicImage.push("star");
                    }

                    if (figur instanceof Circle) {
                        safeMagicImage.push("circle");
                    }

                    if (figur instanceof Heart) {
                        safeMagicImage.push("heart");
                    }
                }

            }

        let dataServer: string = JSON.stringify(safeMagicImage); //wandelt Arraxy um, damit der Server es lesen kann 
        let query: URLSearchParams = new URLSearchParams(dataServer);
        let response: Response = await fetch(url + "?safeImage&name=" + nameOfPicture + "&" + query.toString());
        let texte: string = await response.text();
        console.log(texte);
        alert("Bild wurde gespeichert");
        //let data: Data = JSON.parse(texte); 
    }

    async function showTitles(_response: string): Promise<void> { //bildtitel in HTML (datalist) darstellen 
        let databaseContent: HTMLInputElement = <HTMLInputElement>document.querySelector("#namePic");
        let replace: string = _response.replace(/\\|\[|Object|object|{|}|"|name|:|]/g, ""); //g-> sonderzeichen von allen Elemten im string entfernt, nicht nur das erste
        let prettyArray: string[] = replace.split(","); //server antwort aufteilen 
        databaseContent.innerHTML = "";
        while (list.firstChild) {
            list.removeChild(list.firstChild);

        }
        for (let title of prettyArray) {
            if (title == "") {
                //databaseContent.innerHTML += "<br>"  + title;

            }


            else {
                let option: HTMLOptionElement = document.createElement("option");
                option.setAttribute("name", title);
                option.value = title;
                list.appendChild(option);
            }
        }
    }

    async function getTitles(): Promise<void> { //holt titel aus Datenbank -> in handleload
        let response: Response = await fetch(url + "?getTitles&");
        let texte: string = await response.text();
        console.log(texte);

        showTitles(texte);
    }

    async function getImage(_pictureTitle: String): Promise<void> { //holt Bilddaten aus Datenbank 
        let response: Response = await fetch(url + "?getImage&" + _pictureTitle);
        let texte: string = await response.text();
        let replace: string = texte.replace(/\\|\[|{|}|"|name|:|]/g, "");
        let prettyArray: string[] = replace.split(",");
        console.log(prettyArray);
        crcMain.canvas.width = parseInt(prettyArray[3]);
        crcMain.canvas.height = parseInt(prettyArray[4]);
        backgroundColorSafe = prettyArray[5];
        chooseBackground(prettyArray[5]);
        let info: string[] = [];
        prettyArray.splice(0, 6);


        for (let i: number = 0; i < prettyArray.length; i++) {

            switch (prettyArray[i]) {

                case "triangle":
                    let position: Vector = new Vector(parseInt(info[0]), parseInt(info[1]));
                    let triangle: Triangle = new Triangle(position, info[3]);
                    triangle.draw(crcMain);
                    figures.push(triangle);
                    info = [];
                    
                    break;
                case "circle":
                    let positionCircle: Vector = new Vector(parseInt(info[0]), parseInt(info[1]));
                    let circle: Triangle = new Triangle(positionCircle, info[3]);
                    circle.draw(crcMain);
                    figures.push(circle);
                    info = [];
                    
                    break;
                case "heart":
                    let positionHeart: Vector = new Vector(parseInt(info[0]), parseInt(info[1]));
                    let heart: Triangle = new Triangle(positionHeart, info[3]);
                    heart.draw(crcMain);
                    figures.push(heart);
                    info = [];
                    
                    break;
                case "star":
                    let positionStar: Vector = new Vector(parseInt(info[0]), parseInt(info[1]));
                    let star: Triangle = new Triangle(positionStar, info[3]);
                    star.draw(crcMain);
                    figures.push(star);
                    info = [];
                    
                    break;
                default:
                    info.push(prettyArray[i]);
                    break;
            }
        }
    }

    function choosenTitle(_event: Event): void {
        let value: string = inputTitle.value;
        getImage(value);
    }


    function chooseCanvas(_event: Event): void {

        console.log("ich wurde geklickt");
        let target: HTMLElement = <HTMLElement>_event.target;
        let id: string = target.id;
        switch (id) {

            case "format1":
                crcMain.canvas.width = 200;
                crcMain.canvas.height = 200;

                break;
            case "format2":
                crcMain.canvas.width = 200;
                crcMain.canvas.height = 500;

                break;
            case "format3":
                crcMain.canvas.width = 500;
                crcMain.canvas.height = 500;

                break;
        }
        backgroundImage = crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }

    function chooseBackground(_color?: string): void {

        console.log("choose color");
        let colors: HTMLInputElement = <HTMLInputElement>document.querySelector("select#chooseColor");
        let color: string = colors.value;

        if (_color) {
            crcMain.fillStyle = _color;
            crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.width);
            backgroundColorSafe = _color;
        } else {
            switch (color) {

                case "white":
                    crcMain.fillStyle = "white";
                    crcMain.fill();
                    crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                    break;

                case "yellow":
                    crcMain.fillStyle = "lightyellow";
                    crcMain.fill();
                    crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                    break;
                case "green":
                    crcMain.fillStyle = "#98c094";
                    crcMain.fill();
                    crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                    backgroundColorSafe = "lightgreen";
                    break;
                case "pink":
                    crcMain.fillStyle = "lightpink";
                    crcMain.fill();
                    crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                    backgroundColorSafe = "lightpink";
                    break;
                case "lightblue":
                    crcMain.fillStyle = "lightblue";
                    crcMain.fill();
                    crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                    backgroundColorSafe = "lightblue";
                    break;
                case "lavendel":
                    crcMain.fillStyle = "#d4b1bd";
                    crcMain.fill();
                    crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                    backgroundColorSafe = "lavendel";
                    break;
            }
        }

        backgroundImage = crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }

    function createForms(): void {

        //Stern
        let star: Star = new Star(new Vector(crc4.canvas.width / 2, crc4.canvas.height / 2));
        star.draw(crc4);

        //Circle
        let circle: Circle = new Circle(new Vector(crc3.canvas.width / 2, crc3.canvas.height / 2));
        circle.draw(crc3);

        //Dreieck
        let triangle: Triangle = new Triangle(new Vector(crc5.canvas.width / 2, crc5.canvas.height / 2));
        triangle.draw(crc5);

        //Herz
        let heart: Heart = new Heart(new Vector(crc6.canvas.width / 2, crc6.canvas.height / 2));
        heart.draw(crc6);
    }

    export function drawSymbolInMainCanvas(_event: MouseEvent): void {

        console.log("Ein Symbol wurde geklickt");

        let target: HTMLElement = <HTMLElement>_event.target;
        let id: string = target.id;
        let positionForCanvas: Vector = new Vector(crcMain.canvas.width / 2, crcMain.canvas.height / 2);
        let symbol: Form;
        switch (id) {
            case "star":
                symbol = new Star(positionForCanvas);
                break;
            case "circle":
                symbol = new Circle(positionForCanvas);
                break;
            case "heart":
                symbol = new Heart(positionForCanvas);
                break;
            case "triangle":
                symbol = new Triangle(positionForCanvas);
                break;
            default:
                return;
        }
        figures.push(symbol);
        symbol.draw(crcMain);
    }

    function animate(_event: MouseEvent): void {

        crcMain.putImageData(backgroundImage, 0, 0);

        for (let symbol of figures) {
            if (symbol instanceof Heart)
                symbol.move(1 / 20);
            else if (symbol instanceof Triangle)
                symbol.move(1 / 20);
            else if (symbol instanceof Circle)
                symbol.move(1 / 50);
            else if (symbol instanceof Star)
                symbol.move(1 / 20);
            symbol.draw(crcMain);
        }

        if (dragDrop == true) {
            objectDragDrop.draw(crcMain);
        }
    }

    function dragSymbol(_event: MouseEvent): void {

        //let position: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
        if (dragDrop == true) {
            objectDragDrop.position.x = _event.clientX - mainCanvas.getBoundingClientRect().left;
            objectDragDrop.position.y = _event.clientY - mainCanvas.getBoundingClientRect().top;
        }

    }

    function pickSymbol(_event: MouseEvent): void {
        console.log("Mousedown");

        dragDrop = true;

        let mousePosY: number = _event.clientY;
        let mousePosX: number = _event.clientX;
        let canvasRect: ClientRect | DOMRect = mainCanvas.getBoundingClientRect();

        let offsetX: number = mousePosX - canvasRect.left;
        let offsetY: number = mousePosY - canvasRect.top;

        for (let figur of figures) {

            if (figur.position.x - figur.radius < offsetX &&
                figur.position.x + figur.radius > offsetX &&
                figur.position.y - figur.radius < offsetY &&
                figur.position.y + figur.radius > offsetY) {
                console.log(figur);
                let index: number = figures.indexOf(figur);
                figures.splice(index, 1);
                objectDragDrop = figur;
            }
        }
    }

    function placeSymbol(_event: MouseEvent): void {

        console.log("MouseUp");

        if (dragDrop == true) {
            dragDrop = false;
            figures.push(objectDragDrop);
        }

    }

    function deleteSymbol(_event: MouseEvent): void {
        let mousePosY: number = _event.clientY;
        let mousePosX: number = _event.clientX;
        let canvasRect: ClientRect | DOMRect = mainCanvas.getBoundingClientRect();

        let offsetX: number = mousePosX - canvasRect.left;
        let offsetY: number = mousePosY - canvasRect.top;

        for (let figur of figures) {

            if (figur.position.x - figur.radius < offsetX &&
                figur.position.x + figur.radius > offsetX &&
                figur.position.y - figur.radius < offsetY &&
                figur.position.y + figur.radius > offsetY) {

                let index: number = figures.indexOf(figur);
                figures.splice(index, 1);

                console.log("Es funktioniert");
            }
        }
    }

    function clearCanvas(): void {

        crcMain.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        figures = [];

        let clearBackground: boolean = false;
        if (clearBackground == false) {

            backgroundImage = crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
            crcMain.fillStyle = "white";
            crcMain.fill();
            crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
            crcMain.restore();
        }
        crcMain.save();
    }

}