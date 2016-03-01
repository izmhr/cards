var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        _super.call(this);
        this.text = new createjs.Text("rotation", "18px Arial", "#FFF");
    }
    Card.prototype.loadImage = function (filename, width) {
        var _this = this;
        var image = new Image();
        image.src = filename;
        image.onload = function (ev) {
            var image = ev.target;
            _this.bitmap = new createjs.Bitmap(image);
            _this.width = width;
            _this.bitmap.scaleX = _this.bitmap.scaleY = _this.width / _this.bitmap.image.width;
            _this.height = _this.bitmap.image.height * _this.bitmap.scaleX;
            _this.shorterEdge = _this.width > _this.height ? _this.height / 2 : _this.width / 2;
            _this.bitmap.x = -_this.width / 2;
            _this.bitmap.y = -_this.height / 2;
            _super.prototype.addChild.call(_this, _this.bitmap, _this.text);
            _this.on("mousedown", _this.mousedown);
            _this.on("pressmove", _this.pressmove);
        };
    };
    Card.prototype.mousedown = function (ev) {
        this.lastTouch = { x: ev.stageX, y: ev.stageY };
        this.lastHandleAngle = Math.atan2(this.lastTouch.y - this.y, this.lastTouch.x - this.x) * 180 / Math.PI;
        this.handleLength = Math.sqrt(Math.pow((this.lastTouch.x - this.x), 2) + Math.pow((this.lastTouch.y - this.y), 2));
        this.power = this.handleLength / this.shorterEdge;
        this.parent.addChild(this);
    };
    Card.prototype.pressmove = function (ev) {
        var tempHandleAngle = 0;
        var anglediff = 0;
        var newHandleAngle = 0;
        tempHandleAngle = Math.atan2(ev.stageY - this.y, ev.stageX - this.x) * 180 / Math.PI;
        anglediff = (tempHandleAngle - this.lastHandleAngle);
        if (anglediff > 180) {
            anglediff = anglediff - 360;
        }
        else if (anglediff < -180) {
            anglediff = 360 + anglediff;
        }
        if (this.power > 1)
            this.power = 1;
        this.rotation += anglediff * Math.pow(this.power, 3);
        newHandleAngle = this.lastHandleAngle + anglediff * Math.pow(this.power, 3);
        this.x = ev.stageX - this.handleLength * Math.cos(newHandleAngle * Math.PI / 180),
            this.y = ev.stageY - this.handleLength * Math.sin(newHandleAngle * Math.PI / 180);
        if (newHandleAngle > 180)
            newHandleAngle -= 360;
        if (newHandleAngle < -180)
            newHandleAngle += 360;
        this.lastHandleAngle = newHandleAngle;
        this.text.text = this.rotation.toFixed(1);
        this.lastTouch = { x: ev.stageX, y: ev.stageY };
    };
    return Card;
}(createjs.Container));
