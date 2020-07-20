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
            zauberbild.crc4.save();
            zauberbild.crc4.translate(this.position.x, this.position.y);
            zauberbild.crc4.fillStyle = "yellow";
            zauberbild.crc4.beginPath();
            zauberbild.crc4.moveTo(108, 0.0);
            zauberbild.crc4.lineTo(141, 70);
            zauberbild.crc4.lineTo(218, 78.3);
            zauberbild.crc4.lineTo(162, 131);
            zauberbild.crc4.lineTo(175, 205);
            zauberbild.crc4.lineTo(108, 170);
            zauberbild.crc4.lineTo(41.2, 205);
            zauberbild.crc4.lineTo(55, 131);
            zauberbild.crc4.lineTo(1, 78);
            zauberbild.crc4.lineTo(75, 68);
            zauberbild.crc4.lineTo(108, 0);
            zauberbild.crc4.closePath();
            zauberbild.crc4.fill();
        }
    }
    zauberbild.Star = Star;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=star.js.map