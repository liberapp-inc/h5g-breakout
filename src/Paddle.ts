// Liberapp 2019 - Tahiti Katagai
// 左右に操作するパドル

class Paddle extends GameObject{

    static I:Paddle = null;   // singleton instance

    static readonly sizeRateH = (1/3);
    readonly sizeW:number;
    readonly sizeH:number;
    touchOffsetX:number = 0;
    touch:boolean = false;

    padAim:PadAim = null;
    aimDir:number;  // まっすぐ上方向(0,-1)が０度のラジアン
    
    ballCount:number = 2;
    rowCount:number = 0;

    itemType:ItemType = ItemType.None;
    state:()=>void = this.stateWave;

    constructor() {
        super();

        Paddle.I = this;
        this.sizeW = PADDLE_SIZE_PER_WIDTH * Util.width;
        this.sizeH = this.sizeW * Paddle.sizeRateH;
        this.setShape(Util.width *0.5, Util.height *0.8 );
        for( let i=0 ; i<2 ; i++ )
            this.generateNewBoxRow();

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
        const w = this.sizeW + this.sizeH * 0.5;
        const h = this.sizeH;
        this.shape.graphics.drawRect(-0.5*(w-h), -0.5*h, w-h, h);
        this.shape.graphics.drawCircle(-0.5*(w-h), 0, 0.5*h);
        this.shape.graphics.drawCircle(+0.5*(w-h), 0, 0.5*h);
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

        // generate boxes
        if( this.generateNewBoxRow() || this.ballCount == 0 ){
            new GameOver();
        }else{
            this.padAim = new PadAim(this.shape.x, this.shape.y - this.sizeH*0.5 - (BALL_SIZE_PER_WIDTH*Util.width*0.5));
        }
        this.state = this.stateAiming;
    }
    generateNewBoxRow() : boolean {
        let isGameOver = false;

        // scroll down all remaining boxes
        Box.boxes.forEach( box => {
            box.shape.y += BOX_SIZE_PER_WIDTH * Util.width * Box.sizeRateH;
            if( box.shape.y >= this.shape.y - this.sizeH * 0.5 )
                isGameOver = true;
        });

        // Generate a new box row
        this.rowCount++;
        let sizeW = BOX_SIZE_PER_WIDTH * Util.width;
        let sizeH = sizeW * Box.sizeRateH;
        for( let i=1 ; i<BOXES_IN_WIDTH ; i++ ){
            if( Math.random() <= Math.min( this.rowCount / 20 + 0.2, 0.82 ) ){
                let maxHp = Math.min( this.rowCount, Box.maxHp );
                new Box( sizeW * i, sizeH * 1, Util.randomInt( maxHp * 0.33, maxHp ) );
            }
        }
        return isGameOver;
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

        // ボール一発目はアイテム効果
        switch( this.itemType ){
            default: console.error("unknown item type");
            case ItemType.None:
            new Ball( x, y, vx * baseSpeed, vy * baseSpeed );
            break;
            case ItemType.Big:
            new BigBall( x, y, vx * baseSpeed, vy * baseSpeed );
            break;
            case ItemType.Way5:
            for( let i=-3 ; i<=3 ; i++ ){
                let angle = dir + i * Math.PI * (1/10);
                new Ball( x, y, -Math.sin( angle ) * baseSpeed, -Math.cos( angle ) * baseSpeed );
            }
            break;
        }
        
        for( let i=1 ; i<this.ballCount ; i++ ) {
            let speed = baseSpeed * ( 1 + i * 0.2 );
            new Ball( x, y, vx * speed, vy * speed );
        }
        this.itemType = ItemType.None;
        Paddle.I.ballCount = 0;
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
                    Paddle.I.ballCount++;
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
        this.ballCount++;
        switch( item ){
            default: console.error("unknown type of item");
            case ItemType.Ball:
            break;
            case ItemType.Big:
            this.itemType = item;
            break;
            case ItemType.Way5:
            this.itemType = item;
            break;
        }
    }
}
