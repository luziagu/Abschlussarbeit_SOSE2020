namespace zauberbild {

    console.log("verknüpft"); 
    
    export let crc2: CanvasRenderingContext2D; 
    export let crc3: CanvasRenderingContext2D; 
    export let crc4: CanvasRenderingContext2D; 
    export let crc5: CanvasRenderingContext2D; 
    export let crc6: CanvasRenderingContext2D; 


    let mainCanvas: HTMLCanvasElement; 

    let figures: Form [] = [];
   
    let backgroundColor: HTMLSelectElement;
    let circleDiv: HTMLDivElement; 
    let starDiv: HTMLDivElement; 
    let triangleDiv: HTMLDivElement; 
    let heartDiv: HTMLDivElement; 
    export let drawSymbol: boolean = true; 

   
    let backgroundIMage: ImageData; 
    //let save: HTMLButtonElement; 
    
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {


        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#chooseFormat");
        backgroundColor = <HTMLSelectElement>document.querySelector("#chooseColor");
    
        circleDiv = <HTMLDivElement>document.getElementById("symbolOne"); 
        starDiv = <HTMLDivElement>document.getElementById("symbolTwo"); 
        triangleDiv = <HTMLDivElement>document.getElementById("symbolThree"); 
        heartDiv = <HTMLDivElement>document.getElementById("symbolFour"); 
       
        mainCanvas = <HTMLCanvasElement> document.getElementById("mainCanvasDraw"); 
        crc2 = <CanvasRenderingContext2D>mainCanvas.getContext("2d"); 

        let canvasCircle: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("circle"); 
        crc3 = <CanvasRenderingContext2D>canvasCircle.getContext("2d"); 

        let canvasStar: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("star"); 
        crc4 = <CanvasRenderingContext2D>canvasStar.getContext("2d"); 

        let canvasTriangle: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("triangle"); 
        crc5 = <CanvasRenderingContext2D>canvasTriangle.getContext("2d"); 

        let canvasHeart: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("heart"); 
        crc6 = <CanvasRenderingContext2D>canvasHeart.getContext("2d"); 

        console.log("verknüpft"); 
       
        

        form.addEventListener("change", chooseCanvas); 

        
        backgroundColor.addEventListener("click", chooseBackground);

        createForms(); 

        

        circleDiv.addEventListener("click", drawSymbolInMainCanvas);
        starDiv.addEventListener("click", drawSymbolInMainCanvas);
        triangleDiv.addEventListener("click", drawSymbolInMainCanvas);
        heartDiv.addEventListener("click", drawSymbolInMainCanvas);


    }

    function chooseCanvas(_event: Event): void {
 
        console.log("ich wurde geklickt"); 
        let target: HTMLElement = <HTMLElement>_event.target; 
        let id: string = target.id;
        

        switch (id) {
            
            case "format1":
                crc2.canvas.width = 200; 
                crc2.canvas.height = 200; 
                //divFrame.setAttribute("width", "200"); 
                //divFrame.setAttribute("height", "200"); 


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

    function chooseBackground (_event: Event): void {

        console.log("choose color"); 


    }

    function createForms (): void {
       
        let symbol: number = 1;
       //Stern
     
        let x: number = 20; 
        let y: number = 10; 
        let position: Vector = new Vector(x, y);

        let star: Star = new Star(position);
        star.draw();
        figures.push(star);

        //Circle
        for (let i: number = 0; i < symbol; i++) {
        let x: number = -80; 
        let y: number = 0; 
        let position: Vector = new Vector(x, y);
        let circle:  Circle = new Circle(position);
        circle.draw();
        figures.push(circle);
        }

        //Dreieck
        for (let i: number = 0; i < symbol; i++) {
            let x: number = -20; 
            let y: number = 0; 
            let position: Vector = new Vector(x, y);
            let triangle:  Triangle = new Triangle(position);
            triangle.draw();
            figures.push(triangle);
            }
    
    
        //Herz
        for (let i: number = 0; i < symbol; i++) {
            let x: number = 30; 
            let y: number = 0; 
            let position: Vector = new Vector(x, y);
            let heart:  Heart = new Heart (position);
            heart.draw();
            figures.push(heart);
            }

    }

    export function drawSymbolInMainCanvas(_event: MouseEvent): void {


        console.log("Ein Symbol wurde geklickt"); 
        
         
        let target: HTMLElement = <HTMLElement>_event.target; 
        let id: string = target.id; 

        //if (target.id) { 
        //    drawSymbol = true; 
        //}
        


        switch (id) {
            case "star":
        
                
                let positionStar: Vector = new Vector(0, 0);
                let star:  Star = new Star(positionStar); 
                
                star.draw();
                figures.push(star);
                        

                break;
            case "circle":

                let positionCircle: Vector = new Vector(0, 0);
                let circle:  Heart = new Heart(positionCircle);
                circle.draw();
                figures.push(circle);
                
              
                
                break; 
            case "heart":

            
                let positionHeart: Vector = new Vector(0, 0);
                let heart:  Heart = new Heart(positionHeart);
                heart.draw();
                figures.push(heart);
                
               
                
                break; 
            case "triangle":
                    
                let position: Vector = new Vector(0, 0);
                let triangle:  Triangle = new Triangle(position);
                triangle.draw();
                figures.push(triangle);     
                break; 

        }


    }

   


    








}