namespace zauberbild {

    let crc2: CanvasRenderingContext2D; 


    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        let smallCanvas: HTMLInputElement = <HTMLInputElement>document.querySelector("#format1");
        let middleCanvas: HTMLInputElement = <HTMLInputElement>document.querySelector("#format2");
        let bigCanvas: HTMLInputElement = <HTMLInputElement>document.querySelector("#format3");
    
       
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas"); 
        if (!canvas)
            return; 
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d"); 

        console.log("verknüpft"); 
       


        smallCanvas.addEventListener("click", chooseCanvas); 
        middleCanvas.addEventListener("click", chooseCanvas); 
        bigCanvas.addEventListener("click", chooseCanvas); 


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

   


    








}