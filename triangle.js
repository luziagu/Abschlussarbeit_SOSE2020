"use strict";
var zauberbild;
(function (zauberbild) {
    class Triangle extends zauberbild.Form {
        constructor(_position) {
            super(_position);
            if (_position)
                this.position = _position.copy();
            else
                this.velocity = new zauberbild.Vector(0, 0);
            this.radius = 5;
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity = zauberbild.Vector.getRandom(5, 10);
        }
        draw() {
            zauberbild.crc5.save();
            zauberbild.crc5.scale(0.9, 0.9);
            zauberbild.crc5.translate(this.position.x, this.position.y);
            zauberbild.crc5.fillStyle = "pink";
            zauberbild.crc5.beginPath();
            zauberbild.crc5.moveTo(50, 50);
            zauberbild.crc5.lineTo(100, 90);
            zauberbild.crc5.lineTo(100, 10);
            zauberbild.crc5.fill();
        }
    }
    zauberbild.Triangle = Triangle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=triangle.js.map