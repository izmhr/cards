/// <reference path="../typings/easeljs/easeljs.d.ts"/>
/// <reference path="../typings/stats/stats.d.ts"/>
/// <reference path="./card.ts"/>

window.onload = () => {
  new Main();
}

// sample images
var images = [
  "../assets/IMG_2760.JPG",
  "../assets/IMG_5104.JPG",
  "../assets/IMG_5275.JPG",
  "../assets/P1060346.JPG",
  "../assets/P1060484.JPG",
  "../assets/P1060413.JPG"
]

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

    this.loadImages();

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
   * load sample images
   */
  private loadImages(): void {
    images.forEach((value: string, index: number)=>{
      // create new card
      let card: Card = new Card();
      // set random width
      let width: number = Math.random() * 100 + 200;
      card.loadImage(value, width);
      // set random position
      card.x = this.canvas.width * Math.random();
      card.y = this.canvas.height * Math.random();
      card.rotation = 360 * Math.random();
      // add to stage
      this.stage.addChild(card);
    });
  }
}
