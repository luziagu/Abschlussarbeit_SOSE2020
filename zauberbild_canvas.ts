namespace zauberbild {

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D; 
    let figures: Form [] = [];


    let backgroundColor: HTMLInputElement; 
    let bigCanvas: HTMLInputElement; 
    let middleCanvas: HTMLInputElement; 
    let smallCanvas: HTMLInputElement;


    let backgroundIMage: ImageData; 
    let save: HTMLButtonElement; 
    
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        
        smallCanvas = <HTMLInputElement>document.querySelector("#format1");
    
        middleCanvas = <HTMLInputElement>document.querySelector("#format2");
    
        bigCanvas = <HTMLInputElement>document.querySelector("#format3");
    
       
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas"); 
        if (!canvas)
            return; 
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d"); 

        console.log("verknüpft"); 
       


        smallCanvas.addEventListener("click", chooseCanvas); 
        middleCanvas.addEventListener("click", chooseCanvas); 
        bigCanvas.addEventListener("click", chooseCanvas); 


       


    }

    function chooseCanvas(_event: Event): void {
 
        console.log("ich wurde geklickt"); 

        
        if (smallCanvas.classList.contains("#format1")) {
            crc2.canvas.setAttribute("height: 200px", "width: 200px"); 
       
        }
        

        if (smallCanvas.classList.contains("#format2")) {
            crc2.canvas.setAttribute("height: 500px", "width: 500px"); 

        }
        if (smallCanvas.classList.contains("#format3")) {
            crc2.canvas.setAttribute("height: 700px", "width: 700px"); 

        }
      
      
      
    }

   


    








}