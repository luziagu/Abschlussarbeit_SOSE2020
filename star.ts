namespace zauberbild {
    export class Star extends Form { 

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
            
            crc2.save();
            crc2.translate(this.position.x, this.position.y); 
            
            crc2.fillStyle = "yellow";
            crc2.beginPath();
            crc2.moveTo(108, 0.0);
            crc2.lineTo(141, 70);
            crc2.lineTo(218, 78.3);
            crc2.lineTo(162, 131);
            crc2.lineTo(175, 205);
            crc2.lineTo(108, 170);
            crc2.lineTo(41.2, 205);
            crc2.lineTo(55, 131);
            crc2.lineTo(1, 78);
            crc2.lineTo(75, 68);
            crc2.lineTo(108, 0);
            crc2.closePath();
            crc2.fill();
        }



    }

}