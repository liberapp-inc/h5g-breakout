
class Paddle extends GameObject{

    static I:Paddle = null;   // singleton instance

    static readonly sizeRateH = (1/3);
    readonly sizeW:number;
    readonly sizeH:number;
    touchOffsetX:number = 0;

    ballCount:number = 3;
    itemType:ItemType = ItemType.None;
    itemSpan:number = 0;
    state:()=>void = this.stateWave;

    constructor() {
        super();

        Paddle.I = this;
        this.sizeW = PADDLE_SIZE_PER_WIDTH * Util.width;
        this.sizeH = this.sizeW * Paddle.sizeRateH;
        this.setShape(Util.width *0.5, Util.height *0.9 );
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
    }

    onDestroy(){
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        Paddle.I = null;
    }

    setShape( x:number, y:number ){
        if( this.shape )
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xe00030);
        this.shape.graphics.drawRect(-0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    }

    update() {
        this.state();
    }

    stateWave(){
        Box.boxes.forEach( box => {
            box.shape.y += BOX_SIZE_PER_WIDTH * Util.width * Box.sizeRateH;
        });

        let sizeW = BOX_SIZE_PER_WIDTH * Util.width;
        let sizeH = sizeW * Box.sizeRateH;
        for( let i=1 ; i<BOXES_IN_WIDTH ; i++ )
            new Box( sizeW * i, sizeH * 1, Util.randomInt(1,Box.maxHp) );

        this.state = this.stateShoot;
    }

    stateShoot(){

    }

    stateCatch(){
        // ボールとの接触判定
        Ball.balls.forEach( ball => {
            if( ball.vy > 0 ){
                let dx = ball.shape.x - this.shape.x;
                let dy = ball.shape.y - this.shape.y;
                let xr = ball.radius + this.sizeW*0.5;
                let yr = ball.radius + this.sizeH*0.5;

                if( dx*dx < xr*xr && dy*dy < yr*yr ){
                    ball.destroy();
                }
            }
        });

        if( Ball.balls.length == 0 )
            this.state = this.stateWave;
    }

    touchBegin(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.touchOffsetX = this.shape.x - e.localX;

        if( this.state == this.stateShoot ){
            let x = this.shape.x;
            let y = this.shape.y - this.sizeH*0.5 - (BALL_SIZE_PER_WIDTH*Util.width*0.5);
            let vx = BALL_SIZE_PER_WIDTH * Util.width * 0.5 * 0.5;
            let vy = BALL_SIZE_PER_WIDTH * Util.width * 0.5 * -0.5;

            for( let i=0 ; i<this.ballCount ; i++ ) {
                let rate = 1 + i * 0.2;
                new Ball( x, y, vx * rate, vy * rate );
            }
            this.state = this.stateCatch;
        }
    }

    touchMove(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.shape.x = e.localX + this.touchOffsetX;
        this.shape.x = Util.clamp( this.shape.x, this.sizeW*0.5, Util.width - this.sizeW*0.5 );
        this.touchOffsetX = this.shape.x - e.localX;
    }

    pickItem(item:ItemType){
        switch( item ){
            case ItemType.Ball:
            this.ballCount++;
            break;
        }
    }
}
