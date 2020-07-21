
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
    
            public draw(): void {
                
                crc6.save(); 
                crc6.scale(0.5, 0.5); 
                crc6.translate(this.position.x, this.position.y);
                crc6.fillStyle = "lightred";
                crc6.beginPath();
                crc6.moveTo(75, 40);
                crc6.bezierCurveTo(75, 37, 70, 25, 50, 25);
                crc6.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
                crc6.bezierCurveTo(20, 80, 40, 102, 75, 120);
                crc6.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
                crc6.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
                crc6.bezierCurveTo(85, 25, 75, 37, 75, 40);
                crc6.fill();
            }
    
    
    
        }
    
}