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
        draw(_crc) {
            _crc.save();
            _crc.scale(0.9, 0.9);
            _crc.translate(this.position.x, this.position.y);
            _crc.fillStyle = "pink";
            _crc.beginPath();
            _crc.moveTo(50, 50);
            _crc.lineTo(100, 90);
            _crc.lineTo(100, 10);
            _crc.fill();
            _crc.restore();
        }
    }
    zauberbild.Triangle = Triangle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=triangle.js.map