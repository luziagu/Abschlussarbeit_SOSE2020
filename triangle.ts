namespace zauberbild {
    export class Triangle extends Form { 

        constructor(_position?: Vector, _color?: string) {

            super(_position); 
    
    
            if (_position)
            this.position = _position.copy();
            else 
            this.velocity = new Vector(0, 0);
    
            this.radius = 25;
            if (_color)
            this.color = _color; 
            else
            this.color = "pink";

            this.velocity = new Vector(0, 0);
            this.velocity = Vector.getRandom(5, 10);
        }

        public draw(_crc: CanvasRenderingContext2D): void {

            
            _crc.save();
            _crc.translate(this.position.x, this.position.y); 
            _crc.scale(1, 1); 
            _crc.fillStyle = this.color;
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
                this.position.x += crcMain.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += crcMain.canvas.height;
            }
            if (this.position.x > crcMain.canvas.width) {
                this.position.x -= crcMain.canvas.width;
            }
            if (this.position.y > crcMain.canvas.height) {
                this.position.y -= crcMain.canvas.height;
            }
        }



    }

}