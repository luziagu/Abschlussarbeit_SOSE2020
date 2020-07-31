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

    let circleDiv: HTMLDivElement;
    let starDiv: HTMLDivElement;
    let triangleDiv: HTMLDivElement;
    let heartDiv: HTMLDivElement;
    let backgroundColorSafe: string;


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

    function chooseSymbolForChange(_event: Event): void {

        console.log("Symbol wurde ausgewählt");
        let target: HTMLSelectElement = <HTMLSelectElement>_event.target;
        let value: string = target.value;

        let chooseLastSymbol: any = figures[figures.length - 1 ];
                
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

        backgroundImage = crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    }

    async function saveImage(_event: MouseEvent): Promise<void> {

        let nameOfPicture: string | null = prompt("Bennene dein Zauberbild: ");



        if (nameOfPicture != null) {

            //safeMagicImage.push(nameOfPicture); 
            safeMagicImage.push(mainCanvas.width.toString(), mainCanvas.height.toString());
            safeMagicImage.push(backgroundColorSafe);
         




            for (let figur of figures) {
                safeMagicImage.push(Math.floor(figur.position.x).toString(), Math.floor(figur.position.y).toString());

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
        let response: Response = await fetch(url + "?safeImage&name=" + "A" + nameOfPicture + "&" + query.toString());
        let texte: string = await response.text();
        console.log(texte);
        alert("Bild wurde gespeichert");
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

    function chooseBackground(_event: Event): void {

        console.log("choose color");
        let target: HTMLSelectElement = <HTMLSelectElement>_event.target;
        let value: string = target.value;

        switch (value) {

            case "yellow":
                crcMain.fillStyle = "lightyellow";
                crcMain.fill();
                crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                break;
            case "green":
                crcMain.fillStyle = "rgb(152, 192, 148)";
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
                crcMain.fillStyle = "rgb(212, 177, 189)";
                crcMain.fill();
                crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
                backgroundColorSafe = "lavendel";
                break;


        }



        backgroundImage = crcMain.getImageData(0, 0, mainCanvas.width, mainCanvas.height);



    }



    /*function animation() {
        return setInterval(createForms, 50);
    }*/

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

            crcMain.fillStyle = "white";
            crcMain.fill();
            crcMain.fillRect(0, 0, crcMain.canvas.width, crcMain.canvas.height);
            crcMain.restore();
        }
        crcMain.save();
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










}