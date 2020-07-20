namespace zauberbild {

    export class Vector {
        public x: number; 
        public y: number; 

        constructor(_x: number, _y: number) {
            this.x = _x; 
            this.y = _y; 
        }

        public static getRandom(_minLength: number, _maxLength: number): Vector {
            let vector: Vector = new Vector(0, 0); 
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * 2 * Math.PI;

            vector.set(Math.cos(direction), Math.sin(direction));
            vector.scale(length);
            return vector; 
        
        }

        public get length(): number {
            return Math.hypot(this.x, this.y);
        }

        public set(_x: number, _y: number): void {
            this.x = _x; 
            this.y = _y; 
        }

        public add(_addend: Vector): void {

            this.x += _addend.x; 
            this.y += _addend.y; 
        }

        public scale(_scale: number): void {
            this.x *= _scale; 
            this.y *= _scale; 
        }

        

        public copy(): Vector {
            return new Vector(this.x, this.y); 
        }
    }



}