namespace zauberbild {

    export abstract class Form {

        public position: Vector;
        public rotation: number; 
        public radius: number;   
        public velocity: Vector;
        public color: string; 
        

        constructor(_position?: Vector) {

            this.color = ""; 
            
            if (_position)
            this.position = _position.copy();
            else 
            this.velocity = new Vector(0, 0);

            this.radius = 25;
            this.velocity = new Vector(0, 0);
            this.rotation = 0;  
        }

        public  abstract draw(_crc: CanvasRenderingContext2D): void;

        public move(_timeslice: number): void {

            let offset: Vector = this.velocity.copy();
            //offset.scale(_timeslice);
            offset.x *= _timeslice * 0.5;
            offset.y *= _timeslice;
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += (crcMain.canvas.width);
            if (this.position.y < 0)
                this.position.y += crcMain.canvas.height;
            if (this.position.x > (crcMain.canvas.width))
                this.position.x -= (crcMain.canvas.width);
            if (this.position.y > crcMain.canvas.height)
                this.position.y -= crcMain.canvas.height;
        }
    }
}
