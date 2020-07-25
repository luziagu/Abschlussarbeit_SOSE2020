namespace zauberbild {
    export class Triangle extends Form { 

        constructor(_position?: Vector) {

            super(_position); 
    
    
            if (_position)
            this.position = _position.copy();
            else 
            this.velocity = new Vector(0, 0);
    
            this.radius = 25;
    
            this.velocity = new Vector(0, 0);
            this.velocity = Vector.getRandom(5, 10);
        }

        public draw(_crc: CanvasRenderingContext2D): void {

            
            _crc.save();
          
            _crc.scale(0.9, 0.9); 
            
            _crc.translate(this.position.x, this.position.y); 
            _crc.fillStyle = "pink";
            _crc.beginPath();
            _crc.moveTo(50, 50);
            _crc.lineTo(100, 90);
            _crc.lineTo(100, 10);
            _crc.fill();

            _crc.restore(); 
            
        }



    }

}