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
            this.rotation = 0;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            //offset.scale(_timeslice);
            offset.x *= _timeslice * 0.5;
            offset.y *= _timeslice;
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += (zauberbild.crcMain.canvas.width);
            if (this.position.y < 0)
                this.position.y += zauberbild.crcMain.canvas.height;
            if (this.position.x > (zauberbild.crcMain.canvas.width))
                this.position.x -= (zauberbild.crcMain.canvas.width);
            if (this.position.y > zauberbild.crcMain.canvas.height)
                this.position.y -= zauberbild.crcMain.canvas.height;
        }
    }
    zauberbild.Form = Form;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=Form.js.map