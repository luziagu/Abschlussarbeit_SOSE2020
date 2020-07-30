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
            this.radius = 25;
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity = zauberbild.Vector.getRandom(5, 10);
        }
        draw(_crc) {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.scale(1, 1);
            _crc.fillStyle = "pink";
            _crc.beginPath();
            _crc.moveTo(0, 20);
            _crc.lineTo(-10, 20);
            _crc.lineTo(0, -20);
            _crc.lineTo(10, 20);
            _crc.lineTo(0, 20);
            _crc.fill();
            _crc.restore();
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.x *= 0;
            offset.y *= _timeslice * 1.2;
            this.position.add(offset);
            if (this.position.x < 0) {
                this.position.x += zauberbild.crcMain.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += zauberbild.crcMain.canvas.height;
            }
            if (this.position.x > zauberbild.crcMain.canvas.width) {
                this.position.x -= zauberbild.crcMain.canvas.width;
            }
            if (this.position.y > zauberbild.crcMain.canvas.height) {
                this.position.y -= zauberbild.crcMain.canvas.height;
            }
        }
    }
    zauberbild.Triangle = Triangle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=triangle.js.map