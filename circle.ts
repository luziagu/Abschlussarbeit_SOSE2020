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

        draw (_crc: CanvasRenderingContext2D): void {
            

            _crc.save();
            _crc.scale(0.7, 0.7); 
            _crc.translate(this.position.x, this.position.y); 
            var centerX = crc2.canvas.width / 2;
            var centerY = crc2.canvas.height / 2;
            var radius: number = 30;

            _crc.beginPath();
            _crc.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            _crc.fillStyle = "lightblue";
            _crc.closePath();
            _crc.fill();
            _crc.lineWidth = 0;
            _crc.strokeStyle = "lightblue";
            _crc.stroke();

            _crc.restore(); 

            
    
        }

        draggable(): void {
            let isdragged: boolean = true; 
            


            
        }

        

    }

}