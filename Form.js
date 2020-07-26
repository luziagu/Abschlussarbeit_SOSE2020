"use strict";
var zauberbild;
(function (zauberbild) {
    class Form {
        constructor(_position) {
            // console.log("Moveable");
            if (_position)
                this.position = _position.copy();
            else
                this.velocity = new zauberbild.Vector(0, 0);
            this.radius = 25;
            this.velocity = new zauberbild.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            //offset.scale(_timeslice);
            offset.x *= _timeslice * 0.5;
            offset.y *= _timeslice;
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += (zauberbild.crc2.canvas.width);
            if (this.position.y < 0)
                this.position.y += zauberbild.crc2.canvas.height;
            if (this.position.x > (zauberbild.crc2.canvas.width))
                this.position.x -= (zauberbild.crc2.canvas.width);
            if (this.position.y > zauberbild.crc2.canvas.height)
                this.position.y -= zauberbild.crc2.canvas.height;
        }
        rotate(_timeslice) {
            let rotateAngle = 0.005;
            for (var angle = 0; angle < 2 * Math.PI; angle += 0.01) {
                var x = 200 * Math.cos(2 * angle) * Math.cos(angle);
                var y = 200 * Math.cos(2 * angle) * Math.sin(angle);
                zauberbild.crc2.lineTo(x, y);
            }
            zauberbild.crc2.rotate(rotateAngle);
        }
    }
    zauberbild.Form = Form;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Form.js.map