"use strict";
var zauberbild;
(function (zauberbild) {
    class Circle extends zauberbild.Form {
        constructor(_position, _color) {
            super(_position);
            if (_position)
                this.position = _position.copy();
            else
                this.velocity = new zauberbild.Vector(0, 0);
            this.radius = 25;
            if (_color)
                this.color = _color;
            else
                this.color = "lightblue";
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity = zauberbild.Vector.getRandom(5, 10);
        }
        draw(_crc) {
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.scale(0.7, 0.7);
            var radius = 30;
            _crc.beginPath();
            _crc.arc(0, 0, radius, 0, 2 * Math.PI, false);
            _crc.fillStyle = this.color;
            _crc.closePath();
            _crc.fill();
            _crc.lineWidth = 0;
            _crc.strokeStyle = "lightblue";
            _crc.stroke();
            _crc.restore();
        }
    }
    zauberbild.Circle = Circle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=circle.js.map