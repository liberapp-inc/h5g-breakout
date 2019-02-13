
class Item extends GameObject{

    radius:number;

    constructor( x:number, y:number ) {
        super();

        this.radius = Game.width * BALL_SIZE_PER_WIDTH * 0.5;
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xffc000);
        this.shape.graphics.drawCircle(0, 0, this.radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    }
    
    update() {
        this.shape.y += Game.height / (60 * 4); // 4sec

        // collision
        let dx = Paddle.I.shape.x - this.shape.x;
        let dy = Paddle.I.shape.y - this.shape.y;
        let r = Paddle.I.size*0.5 + this.radius;

        if( dx*dx + dy*dy < r*r ){
            Paddle.I.pickItem( 0 );
            this.destroy();
        }
        
        if( this.shape.y >= Game.height )
            this.destroy();
    }
}
