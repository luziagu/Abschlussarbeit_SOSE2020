"use strict";
var zauberbild;
(function (zauberbild) {
    class Star extends zauberbild.Form {
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
            zauberbild.crc2.save();
            zauberbild.crc2.translate(this.position.x, this.position.y);
            zauberbild.crc2.fillStyle = "yellow";
            zauberbild.crc2.beginPath();
            zauberbild.crc2.moveTo(108, 0.0);
            zauberbild.crc2.lineTo(141, 70);
            zauberbild.crc2.lineTo(218, 78.3);
            zauberbild.crc2.lineTo(162, 131);
            zauberbild.crc2.lineTo(175, 205);
            zauberbild.crc2.lineTo(108, 170);
            zauberbild.crc2.lineTo(41.2, 205);
            zauberbild.crc2.lineTo(55, 131);
            zauberbild.crc2.lineTo(1, 78);
            zauberbild.crc2.lineTo(75, 68);
            zauberbild.crc2.lineTo(108, 0);
            zauberbild.crc2.closePath();
            zauberbild.crc2.fill();
        }
    }
    zauberbild.Star = Star;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=star.js.map