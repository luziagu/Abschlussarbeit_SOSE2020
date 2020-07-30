"use strict";
var zauberbild;
(function (zauberbild) {
    class Star extends zauberbild.Form {
        constructor(_position) {
            super(_position);
            this.drawSymbol = true;
            this.rotation = 0;
            if (_position)
                this.position = _position.copy();
            else
                this.velocity = new zauberbild.Vector(0, 0);
            this.radius = 25;
            this.velocity = new zauberbild.Vector(0, 0);
            this.velocity = zauberbild.Vector.getRandom(5, 10);
        }
        rotate() {
            this.rotation += 1;
        }
        draw(_crc) {
            //if (drawSymbol = true){
            //    CanvasRenderingContext2D
            //}
            this.rotate();
            _crc.beginPath();
            _crc.save();
            _crc.translate(this.position.x, this.position.y);
            _crc.translate(-30, -30);
            _crc.scale(0.3, 0.3);
            //_crc.rotate(this.rotation * Math.PI / 70); 
            _crc.fillStyle = "rgb(253, 224, 144)";
            _crc.moveTo(108, 0.0);
            _crc.lineTo(141, 70);
            _crc.lineTo(218, 78.3);
            _crc.lineTo(162, 131);
            _crc.lineTo(175, 205);
            _crc.lineTo(108, 170);
            _crc.lineTo(41.2, 205);
            _crc.lineTo(55, 131);
            _crc.lineTo(1, 78);
            _crc.lineTo(75, 68);
            _crc.lineTo(108, 0);
            _crc.closePath();
            _crc.fill();
            _crc.restore();
        }
    }
    zauberbild.Star = Star;
})(zauberbild || (zauberbild = {}));
//# sourceMappingURL=star.js.map