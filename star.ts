namespace zauberbild {
    export class Star extends Form { 

        drawSymbol: boolean = true; 

        constructor(_position?: Vector) {

            super(_position); 
    
    
            if (_position)
            this.position = _position.copy();
            else 
            this.velocity = new Vector(0, 0);
    
            this.radius = 5;
    
    
            this.velocity = new Vector(0, 0);
            this.velocity = Vector.getRandom(5, 10);
        }

        public draw(crc: CanvasRenderingContext2D): void {
            
            //if (drawSymbol = true){
            //    CanvasRenderingContext2D
            //}
            crc.save(); 
            crc.scale(0.3, 0.3); 
            crc.translate(this.position.x, this.position.y);
            
            crc.fillStyle = "darkorange";
            crc.beginPath();
            crc.moveTo(108, 0.0);
            crc.lineTo(141, 70);
            crc.lineTo(218, 78.3);
            crc.lineTo(162, 131);
            crc.lineTo(175, 205);
            crc.lineTo(108, 170);
            crc.lineTo(41.2, 205);
            crc.lineTo(55, 131);
            crc.lineTo(1, 78);
            crc.lineTo(75, 68);
            crc.lineTo(108, 0);
            crc.closePath();
            crc.fill();
        }



    }

}