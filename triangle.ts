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
          
            _crc.scale(1, 1); 
            
            _crc.translate(this.position.x, this.position.y); 
            _crc.fillStyle = "pink";
            _crc.beginPath();
            _crc.moveTo(0, 20);
            _crc.lineTo(-10, 20);
            _crc.lineTo(0, -20);
            _crc.lineTo(10, 20);
            _crc.lineTo(0, 20);
            _crc.fill();

            _crc.restore(); 
            
        }

        public move(_timeslice: number): void {
            let offset: Vector = this.velocity.copy(); 
            offset.x *= 0; 
            offset.y *=  _timeslice * 1.2;
            this.position.add(offset); 

            if (this.position.x < 0) {
                this.position.x += crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += crc2.canvas.height;
            }
            if (this.position.x > crc2.canvas.width) {
                this.position.x -= crc2.canvas.width;
            }
            if (this.position.y > crc2.canvas.height) {
                this.position.y -= crc2.canvas.height;
            }
        }



    }

}