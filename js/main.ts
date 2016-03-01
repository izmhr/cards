/// <reference path="../typings/easeljs/easeljs.d.ts"/>
/// <reference path="../typings/stats/stats.d.ts"/>
/// <reference path="./card.ts"/>

window.onload = () => {
  new Main();
}

class Main {

  private stage: createjs.Stage;
  private canvas: HTMLCanvasElement;
  private stats: Stats;

  constructor() {
    // Set-up Create.js
    this.canvas = <HTMLCanvasElement>document.getElementById("testCanvas");
    this.stage = new createjs.Stage(this.canvas);
    createjs.Touch.enable(this.stage);

    // FPS
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.stats.domElement.style.left = '0px';
    document.body.appendChild(this.stats.domElement);

    // Resize
    this.handleResize();
    window.addEventListener("resize", ()=> {
      this.handleResize()
    });

    // create some sample draggable objects.
    this.createSampleObjects();

    // create.js loop start
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.on("tick", this.tick, this);
  }

  /**
   * loop
   * @param {any} evt evt.delta is the past-time from last draw.
   */
  private tick(evt: any): void {
    console.log("tick");
    this.stage.update(evt);
    this.stats.update();
  }

  /**
   * be called when the display size changes
   */
  private handleResize():void {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

  /**
   * create some sample draggable objects
   */
  private createSampleObjects(): void {

    // (1) simple shape
    let rectGraphics: createjs.Graphics = new createjs.Graphics()
      .beginFill("#00ffff").drawRect(0, 0, 200, 150);
    let rect: createjs.Shape = new createjs.Shape(rectGraphics);
    // Easel.js does not support automatic bounds calculations of createjs.Shape
    rect.setBounds(0, 0, 200, 150);
    let rectCard: Card = new Card(rect);
    rectCard.x = Math.random() * this.canvas.width;
    rectCard.y = Math.random() * this.canvas.height;
    this.stage.addChild(rectCard);

    // (2) complex shape
    let cmplxGraphics: createjs.Graphics = new createjs.Graphics()
      .beginFill("#ffff00").moveTo(0, 0)
      .lineTo(100, 150)
      .lineTo(240, 250)
      .lineTo(300, 100)
      .lineTo(100, 50)
      .clone();
    let cmplx: createjs.Shape = new createjs.Shape(cmplxGraphics);
    cmplx.setBounds(0, 0, 300, 250);
    let cmplxCard: Card = new Card(cmplx);
    cmplxCard.x = Math.random() * this.canvas.width;
    cmplxCard.y = Math.random() * this.canvas.height;
    this.stage.addChild(cmplxCard);

    // (3) normal bitmap
    let bmImage: HTMLImageElement = new Image();
    bmImage.src = "../assets/P1060346.JPG";
    bmImage.onload = (ev: Event) => {
      let bitmap: createjs.Bitmap = new createjs.Bitmap(bmImage);
      bitmap.scaleX = bitmap.scaleY = 0.25;
      let bmCard: Card = new Card(bitmap);
      bmCard.x = Math.random() * this.canvas.width;
      bmCard.y = Math.random() * this.canvas.height;
      this.stage.addChild(bmCard);
    }

    // (4) Text
    let text: createjs.Text = new createjs.Text("draggable\nobject", "bold 40px Arial", "#FFF");
    let textCard: Card = new Card(text);
    textCard.x = Math.random() * this.canvas.width;
    textCard.y = Math.random() * this.canvas.height;
    this.stage.addChild(textCard);

    // (5) spritesheet animation
    let ssImage: HTMLImageElement = new Image();
    ssImage.src = "../assets/spritesheet_grant.png";
    ssImage.onload = (ev: Event) => {
      let spriteSheet: createjs.SpriteSheet = new createjs.SpriteSheet({
        framerate: 30,
        images: [ssImage],
        // frames: {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
        frames: {"height": 292, "count": 64,"width": 165},
        animations: {
					"run": [0, 25, "run", 1.5],
					"jump": [26, 63, "run"]
				}
      });
      let grant: createjs.Sprite = new createjs.Sprite(spriteSheet, "run");
      let ssCard: Card = new Card(grant);
      ssCard.x = Math.random() * this.canvas.width;
      ssCard.y = Math.random() * this.canvas.height;
      this.stage.addChild(ssCard);
    }
  }
}
