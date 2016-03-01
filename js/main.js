window.onload = function () {
    new Main();
};
var images = [
    "../assets/IMG_2760.JPG",
    "../assets/IMG_5104.JPG",
    "../assets/IMG_5275.JPG",
    "../assets/P1060346.JPG",
    "../assets/P1060484.JPG",
    "../assets/P1060413.JPG"
];
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
        this.loadImages();
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
    Main.prototype.loadImages = function () {
        var _this = this;
        images.forEach(function (value, index) {
            var card = new Card();
            var width = Math.random() * 100 + 200;
            card.loadImage(value, width);
            card.x = _this.canvas.width * Math.random();
            card.y = _this.canvas.height * Math.random();
            card.rotation = 360 * Math.random();
            _this.stage.addChild(card);
        });
    };
    return Main;
}());
