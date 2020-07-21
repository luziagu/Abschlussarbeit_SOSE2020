namespace zauberbild {
    export class Triangle extends Form { 

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

            
            crc5.save();
          
            crc5.scale(0.9, 0.9); 
            
            crc5.translate(this.position.x, this.position.y); 
            crc5.fillStyle = "pink";
            crc5.beginPath();
            crc5.moveTo(50, 50);
            crc5.lineTo(100, 90);
            crc5.lineTo(100, 10);
            crc5.fill();
        }



    }

}