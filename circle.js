"use strict";
var zauberbild;
(function (zauberbild) {
    class Circle extends zauberbild.Form {
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
            _crc.scale(0.7, 0.7);
            _crc.translate(this.position.x, this.position.y);
            var centerX = zauberbild.crc2.canvas.width / 2;
            var centerY = zauberbild.crc2.canvas.height / 2;
            var radius = 30;
            _crc.beginPath();
            _crc.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            _crc.fillStyle = "lightblue";
            _crc.closePath();
            _crc.fill();
            _crc.lineWidth = 0;
            _crc.strokeStyle = "lightblue";
            _crc.stroke();
        }
    }
    zauberbild.Circle = Circle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=circle.js.map