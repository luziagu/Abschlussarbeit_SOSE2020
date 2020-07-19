namespace zauberbild {

    let crc2: CanvasRenderingContext2D; 

    let smallCanvas: HTMLInputElement = <HTMLInputElement>document.querySelector("#format1");
    let middleCanvas: HTMLInputElement = <HTMLInputElement>document.querySelector("#format2");
    let bigCanvas: HTMLInputElement = <HTMLInputElement>document.querySelector("#format3");

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

       
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
 
        
        if (smallCanvas.classList.contains("#format1")) {
            crc2.canvas.setAttribute("height: 200px", "width: 200px"); 
         
            let background: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
            background.canvas.width = 200;
            background.canvas.height = 200;
            background.fillStyle = "#FFA07A";
            background.fillRect(0, 0,  background.canvas.width,  background.canvas.height);   
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


    








}