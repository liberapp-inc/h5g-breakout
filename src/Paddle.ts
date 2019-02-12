
class Paddle extends GameObject{

    static I:Paddle = null;   // singleton instance

    readonly size:number;
    touchOffsetX:number = 0;

    constructor() {
        super();

        Paddle.I = this;
        this.size = PADDLE_SIZE_PER_WIDTH * Game.width;
        this.setShape(Game.width *0.5, Game.height *0.9 );
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
    }
    setShape( x:number, y:number ){
        if( this.shape )
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff1040);
        this.shape.graphics.drawRect(-0.5*this.size, -0.5*this.size, this.size, this.size / 3);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    }

    onDestroy(){
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        Paddle.I = null;
    }

    
    update() {
    }

    touchBegin(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.touchOffsetX = this.shape.x - e.localX;
    }
    touchMove(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.shape.x = e.localX + this.touchOffsetX;
        this.shape.x = Game.clamp( this.shape.x, this.size*0.5, Game.width - this.size*0.5 );
        this.touchOffsetX = this.shape.x - e.localX;
    }

    pickItem(item:number){

    }
}
