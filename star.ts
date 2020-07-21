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

        public draw(): void {
            
            //if (drawSymbol = true){
            //    CanvasRenderingContext2D
            //}
            crc4.save(); 
            crc4.scale(0.4, 0.4); 
            crc4.translate(this.position.x, this.position.y);
            
            crc4.fillStyle = "yellow";
            crc4.beginPath();
            crc4.moveTo(108, 0.0);
            crc4.lineTo(141, 70);
            crc4.lineTo(218, 78.3);
            crc4.lineTo(162, 131);
            crc4.lineTo(175, 205);
            crc4.lineTo(108, 170);
            crc4.lineTo(41.2, 205);
            crc4.lineTo(55, 131);
            crc4.lineTo(1, 78);
            crc4.lineTo(75, 68);
            crc4.lineTo(108, 0);
            crc4.closePath();
            crc4.fill();
        }



    }

}