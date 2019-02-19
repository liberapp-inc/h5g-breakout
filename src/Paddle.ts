
class Paddle extends GameObject{

    static I:Paddle = null;   // singleton instance

    static readonly sizeRateH = (1/3);
    readonly sizeW:number;
    readonly sizeH:number;
    touchOffsetX:number = 0;
    touch:boolean = false;

    padAim:PadAim = null;
    aimDir:number;  // まっすぐ上方向(0,-1)が０度のラジアン
    
    ballCount:number = 3;
    rowCount:number = 0;

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
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    onDestroy(){
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
        Paddle.I = null;
    }

    setShape( x:number, y:number ){
        if( this.shape )
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x703000);
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
        let isGameOver = false;

        Score.I.combo = 0;

        // scroll down all remaining boxes
        Box.boxes.forEach( box => {
            box.shape.y += BOX_SIZE_PER_WIDTH * Util.width * Box.sizeRateH;
            if( box.shape.y > this.shape.y )
                isGameOver = true;
        });

        // Generate a new box row
        this.rowCount++;
        let sizeW = BOX_SIZE_PER_WIDTH * Util.width;
        let sizeH = sizeW * Box.sizeRateH;
        for( let i=1 ; i<BOXES_IN_WIDTH ; i++ ){
            let hp = Util.randomInt( -1, Util.clamp(this.rowCount+1, 1, Box.maxHp) );
            if( hp > 0 )
                new Box( sizeW * i, sizeH * 1, hp );
        }
        
        // Is game over?
        if( isGameOver || this.ballCount == 0 ){
            this.state = this.stateAiming;
            new GameOver();
        }else{
            this.state = this.stateAiming;
            this.padAim = new PadAim(this.shape.x, this.shape.y - this.sizeH*0.5 - (BALL_SIZE_PER_WIDTH*Util.width*0.5));
        }
    }

    stateAiming(){
    }
    shoot( dir:number ){
        this.aimDir = dir;
        let vx = -Math.sin( dir );
        let vy = -Math.cos( dir );
        this.padAim = null;

        this.state = this.stateCatch;
        let x = this.shape.x;
        let y = this.shape.y - this.sizeH*0.5 - (BALL_SIZE_PER_WIDTH*Util.width*0.5);
        let baseSpeed = BALL_SIZE_PER_WIDTH * Util.width * 0.5 * 0.5;
        for( let i=0 ; i<this.ballCount ; i++ ) {
            let speed = baseSpeed * ( 1 + i * 0.2 );
            new Ball( x, y, vx * speed, vy * speed );
        }
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

        if( Ball.balls.length == 0 && Item.count == 0 && this.touch == false ) {
            this.state = this.stateWave;
        }
    }

    touchBegin(e:egret.TouchEvent){
        if( this.deleteFlag || this.state != this.stateCatch )
            return;
        this.touchOffsetX = this.shape.x - e.localX;
        this.touch = true;
    }

    touchMove(e:egret.TouchEvent){
        if( this.deleteFlag || this.state != this.stateCatch )
            return;
        this.shape.x = e.localX + this.touchOffsetX;
        this.shape.x = Util.clamp( this.shape.x, this.sizeW*0.5, Util.width - this.sizeW*0.5 );
        this.touchOffsetX = this.shape.x - e.localX;
    }

    touchEnd(e:egret.TouchEvent){
        if( this.deleteFlag || this.state != this.stateCatch )
            return;
        this.touch = false;
    }


    pickItem(item:ItemType){
        switch( item ){
            case ItemType.Ball:
            this.ballCount++;
            break;
        }
    }
}
