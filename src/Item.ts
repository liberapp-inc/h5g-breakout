
// パワーアップアイテム

enum ItemType {
    None,
    Ball,
    Chain,
    BigBall,
    Shot,
}

class Item extends GameObject{

    radius:number;
    type:ItemType;

    constructor( x:number, y:number, type:ItemType ) {
        super();

        this.radius = Util.width * BALL_SIZE_PER_WIDTH * 0.5;
        this.type = type;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xffc000);
        this.shape.graphics.drawCircle(0, 0, this.radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    }
    
    update() {
        this.shape.y += Util.height / (60 * 4); // 4sec

        // collision
        let dx = Paddle.I.shape.x - this.shape.x;
        let dy = Paddle.I.shape.y - this.shape.y;
        let xr = Paddle.I.sizeW*0.5 + this.radius;
        let yr = Paddle.I.sizeH*0.5 + this.radius;

        if( dx*dx < xr*xr && dy*dy < yr*yr ){
            Paddle.I.pickItem( this.type );
            this.destroy();
        }
        
        if( this.shape.y >= Util.height )
            this.destroy();
    }
}
