/// <reference path="../typings/easeljs/easeljs.d.ts" />

class Card extends createjs.Container {

  private obj: createjs.DisplayObject;
  private text: createjs.Text;  // for debug

  private width: number;
  private height: number;
  private shorterEdge: number;
  private lastTouch: {x: number, y: number};
  private lastHandleAngle: number;
  private handleLength: number;
  private power: number;

  constructor(obj?: createjs.DisplayObject) {
    super();
    this.text = new createjs.Text("rotation", "18px Arial", "#FFF");
    if(obj) {
      this.setObject(obj);
    }
  }

  /**
   * 対象のオブジェクトをセットします
   * @param {createjs.DisplayObject} obj 対象のオブジェクト
   */
  setObject(obj: createjs.DisplayObject): void {
    this.obj = obj;
    this.addChild(this.obj);

    let bounds: createjs.Rectangle = this.getBounds();

    let width: number = bounds.width;
    let height: number = bounds.height;
    this.shorterEdge = width > height ? height/2 : width/2;
    // this.obj.x = -width/2;
    // this.obj.y = -height/2;
    this.regX = width/2;
    this.regY = height/2;

    this.addChild(this.text);

    // event handlers
    this.on("mousedown", this.mousedown);
    this.on("pressmove", this.pressmove);
  }


  mousedown(ev: any): void {
    this.lastTouch = {x: ev.stageX, y: ev.stageY};
    this.lastHandleAngle =  Math.atan2(this.lastTouch.y - this.y, this.lastTouch.x - this.x) * 180 / Math.PI;
    this.handleLength = Math.sqrt( Math.pow((this.lastTouch.x - this.x), 2) + Math.pow((this.lastTouch.y - this.y), 2) );
    this.power = this.handleLength/this.shorterEdge;

    // put this to the top.
    this.parent.addChild(this);
  }

  pressmove(ev: any): void {
    // 何も処理をしない場合のハンドルの向き
    let tempHandleAngle: number = 0;
    // 一つ前の向きからの変分。これを基準に一定の粘性？引きずり？をかけて回転させる
    let anglediff: number = 0;
    // 最終的に決まるハンドルの向き
    let newHandleAngle:number = 0;

    tempHandleAngle = Math.atan2(ev.stageY - this.y, ev.stageX - this.x) * 180 / Math.PI;
    anglediff = (tempHandleAngle - this.lastHandleAngle);
    // FIXME: ここは 360度に制約されない処理が必要
    if(anglediff > 180) { // ccw
      anglediff = anglediff - 360;
    } else if(anglediff < -180) { //cw
      anglediff = 360 + anglediff;
    }

    if(this.power > 1) this.power = 1;
    // 中心からの距離の三乗に比例して回転する
    this.rotation += anglediff * Math.pow(this.power, 3);
    // ハンドル向きも同様に回転させておく
    newHandleAngle = this.lastHandleAngle + anglediff * Math.pow(this.power, 3);
    // 中心座標は、タッチ位置を基準に、ハンドル分戻したところとする
    this.x = ev.stageX - this.handleLength * Math.cos(newHandleAngle*Math.PI/180),
    this.y = ev.stageY - this.handleLength * Math.sin(newHandleAngle*Math.PI/180);

    // FIXME: 回転角を制約する
    if(newHandleAngle > 180) newHandleAngle -= 360;
    if(newHandleAngle < -180) newHandleAngle += 360;
    this.lastHandleAngle = newHandleAngle;

    this.text.text = this.rotation.toFixed(1);

    this.lastTouch = {x: ev.stageX, y: ev.stageY};
  }
}
