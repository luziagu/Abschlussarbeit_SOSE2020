
namespace zauberbild {
        export class Heart extends Form { 
    
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
    
            public draw(_crc: CanvasRenderingContext2D): void {
                
                _crc.save(); 
                _crc.scale(0.5, 0.5); 
                _crc.translate(this.position.x, this.position.y);


                _crc.fillStyle = "HSL(0,53%,58%)";
                _crc.beginPath();
                _crc.moveTo(75, 40);
                _crc.bezierCurveTo(75, 37, 70, 25, 50, 25);
                _crc.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
                _crc.bezierCurveTo(20, 80, 40, 102, 75, 120);
                _crc.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
                _crc.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
                _crc.bezierCurveTo(85, 25, 75, 37, 75, 40);
                _crc.fill();

                _crc.restore(); 
            }
    
    
    
        }
    
}