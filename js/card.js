var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(obj) {
        _super.call(this);
        this.text = new createjs.Text("rotation", "18px Arial", "#FFF");
        if (obj) {
            this.setObject(obj);
        }
    }
    Card.prototype.setObject = function (obj) {
        this.obj = obj;
        this.addChild(this.obj);
        var bounds = this.getBounds();
        var width = bounds.width;
        var height = bounds.height;
        this.shorterEdge = width > height ? height / 2 : width / 2;
        this.regX = width / 2;
        this.regY = height / 2;
        this.addChild(this.text);
        this.on("mousedown", this.mousedown);
        this.on("pressmove", this.pressmove);
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
