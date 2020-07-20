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
        draw() {
            zauberbild.crc3.save();
            zauberbild.crc3.translate(this.position.x, this.position.y);
            var centerX = zauberbild.crc2.canvas.width / 2;
            var centerY = zauberbild.crc2.canvas.height / 2;
            var radius = 70;
            zauberbild.crc3.beginPath();
            zauberbild.crc3.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            zauberbild.crc3.fillStyle = "lightblue";
            zauberbild.crc3.closePath();
            zauberbild.crc3.fill();
            zauberbild.crc3.lineWidth = 0;
            zauberbild.crc3.strokeStyle = "lightblue";
            zauberbild.crc3.stroke();
        }
    }
    zauberbild.Circle = Circle;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=circle.js.map