window.onload = function () {
    new Main();
};
var Main = (function () {
    function Main() {
        var _this = this;
        this.canvas = document.getElementById("testCanvas");
        this.stage = new createjs.Stage(this.canvas);
        createjs.Touch.enable(this.stage);
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.top = '0px';
        this.stats.domElement.style.left = '0px';
        document.body.appendChild(this.stats.domElement);
        this.handleResize();
        window.addEventListener("resize", function () {
            _this.handleResize();
        });
        this.createSampleObjects();
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on("tick", this.tick, this);
    }
    Main.prototype.tick = function (evt) {
        console.log("tick");
        this.stage.update(evt);
        this.stats.update();
    };
    Main.prototype.handleResize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };
    Main.prototype.createSampleObjects = function () {
        var _this = this;
        var rectGraphics = new createjs.Graphics()
            .beginFill("#00ffff").drawRect(0, 0, 200, 150);
        var rect = new createjs.Shape(rectGraphics);
        rect.setBounds(0, 0, 200, 150);
        var rectCard = new Card(rect);
        rectCard.x = Math.random() * this.canvas.width;
        rectCard.y = Math.random() * this.canvas.height;
        this.stage.addChild(rectCard);
        var cmplxGraphics = new createjs.Graphics()
            .beginFill("#ffff00").moveTo(0, 0)
            .lineTo(100, 150)
            .lineTo(240, 250)
            .lineTo(300, 100)
            .lineTo(100, 50)
            .clone();
        var cmplx = new createjs.Shape(cmplxGraphics);
        cmplx.setBounds(0, 0, 300, 250);
        var cmplxCard = new Card(cmplx);
        cmplxCard.x = Math.random() * this.canvas.width;
        cmplxCard.y = Math.random() * this.canvas.height;
        this.stage.addChild(cmplxCard);
        var bmImage = new Image();
        bmImage.src = "/assets/P1060346.JPG";
        bmImage.onload = function (ev) {
            var bitmap = new createjs.Bitmap(bmImage);
            bitmap.scaleX = bitmap.scaleY = 0.25;
            var bmCard = new Card(bitmap);
            bmCard.x = Math.random() * _this.canvas.width;
            bmCard.y = Math.random() * _this.canvas.height;
            _this.stage.addChild(bmCard);
        };
        var text = new createjs.Text("draggable\nobject", "bold 40px Arial", "#FFF");
        var textCard = new Card(text);
        textCard.x = Math.random() * this.canvas.width;
        textCard.y = Math.random() * this.canvas.height;
        this.stage.addChild(textCard);
        var ssImage = new Image();
        ssImage.src = "/assets/spritesheet_grant.png";
        ssImage.onload = function (ev) {
            var spriteSheet = new createjs.SpriteSheet({
                framerate: 30,
                images: [ssImage],
                frames: { "height": 292, "count": 64, "width": 165 },
                animations: {
                    "run": [0, 25, "run", 1.5],
                    "jump": [26, 63, "run"]
                }
            });
            var grant = new createjs.Sprite(spriteSheet, "run");
            var ssCard = new Card(grant);
            ssCard.x = Math.random() * _this.canvas.width;
            ssCard.y = Math.random() * _this.canvas.height;
            _this.stage.addChild(ssCard);
        };
    };
    return Main;
}());
