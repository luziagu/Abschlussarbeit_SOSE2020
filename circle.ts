namespace zauberbild {
    export class Circle extends Form { 

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
            

            crc3.save();
            crc3.scale(0.7, 0.7); 
            crc3.translate(this.position.x, this.position.y); 
            var centerX = crc2.canvas.width / 2;
            var centerY = crc2.canvas.height / 2;
            var radius: number = 30;

            crc3.beginPath();
            crc3.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            crc3.fillStyle = "lightblue";
            crc3.closePath();
            crc3.fill();
            crc3.lineWidth = 0;
            crc3.strokeStyle = "lightblue";
            crc3.stroke();
            
    
        }

        

    }

}