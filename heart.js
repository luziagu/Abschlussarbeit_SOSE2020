"use strict";
var zauberbild;
(function (zauberbild) {
    class Heart extends zauberbild.Form {
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
            zauberbild.crc6.save();
            zauberbild.crc6.scale(0.5, 0.5);
            zauberbild.crc6.translate(this.position.x, this.position.y);
            zauberbild.crc6.fillStyle = "lightred";
            zauberbild.crc6.beginPath();
            zauberbild.crc6.moveTo(75, 40);
            zauberbild.crc6.bezierCurveTo(75, 37, 70, 25, 50, 25);
            zauberbild.crc6.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            zauberbild.crc6.bezierCurveTo(20, 80, 40, 102, 75, 120);
            zauberbild.crc6.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            zauberbild.crc6.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            zauberbild.crc6.bezierCurveTo(85, 25, 75, 37, 75, 40);
            zauberbild.crc6.fill();
        }
    }
    zauberbild.Heart = Heart;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=heart.js.map