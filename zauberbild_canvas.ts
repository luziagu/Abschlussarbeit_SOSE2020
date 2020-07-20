namespace zauberbild {

    console.log("verknüpft"); 
    
    export let crc2: CanvasRenderingContext2D; 
    export let crc3: CanvasRenderingContext2D; 
    export let crc4: CanvasRenderingContext2D; 

    let figures: Form [] = [];


    
   
    let backgroundColor: HTMLSelectElement;
   


    let backgroundIMage: ImageData; 
    //let save: HTMLButtonElement; 
    
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {


        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#chooseFormat");
        backgroundColor = <HTMLSelectElement>document.querySelector("#chooseColor");
    
       
        let mainCanvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("#mainCanvasDraw"); 
        crc2 = <CanvasRenderingContext2D>mainCanvas.getContext("2d"); 

        let canvasStar: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("#star"); 
        crc3 = <CanvasRenderingContext2D>canvasStar.getContext("2d"); 

        let canvasCircle: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("#circle"); 
        crc4 = <CanvasRenderingContext2D>canvasCircle.getContext("2d"); 

        console.log("verknüpft"); 
       

        form.addEventListener("change", chooseCanvas); 
        
       
        
        backgroundColor.addEventListener("click", chooseBackground); 

        createForms(); 


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
       
        let form: number = 1;
       //Stern
     
        let x: number = 0; 
        let y: number = 0; 
        let position: Vector = new Vector(x, y);

        let star: Star = new Star(position);
        star.draw();
        figures.push(star);

        //Circle
        for (let i: number = 0; i < form; i++) {
        let x: number = 0; 
        let y: number = 0; 
        let position: Vector = new Vector(x, y);
        let circle:  Circle = new Circle(position);
        circle.draw();
        figures.push(circle);
        }


    }

   


    








}