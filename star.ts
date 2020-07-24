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

        public draw(_crc: CanvasRenderingContext2D): void {
            
            //if (drawSymbol = true){
            //    CanvasRenderingContext2D
            //}
            _crc.save(); 
            _crc.scale(0.3, 0.3); 
            _crc.translate(this.position.x, this.position.y);
            
            _crc.fillStyle = "rgb(253, 224, 144)";
            _crc.beginPath();
            _crc.moveTo(108, 0.0);
            _crc.lineTo(141, 70);
            _crc.lineTo(218, 78.3);
            _crc.lineTo(162, 131);
            _crc.lineTo(175, 205);
            _crc.lineTo(108, 170);
            _crc.lineTo(41.2, 205);
            _crc.lineTo(55, 131);
            _crc.lineTo(1, 78);
            _crc.lineTo(75, 68);
            _crc.lineTo(108, 0);
            _crc.closePath();
            _crc.fill();

            _crc.restore(); 
        }



    }

}