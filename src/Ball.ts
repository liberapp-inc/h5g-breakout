
class Ball extends GameObject{

    static balls:Ball[] = [];

    vx:number;
    vy:number;
    radius:number;

    constructor() {
        super();

        Ball.balls.push(this);
        this.radius = BALL_SIZE_PER_WIDTH * Game.width;
        this.setShape(Game.width *0.5, Game.height *0.7, this.radius);
    }

    onDestroy(){
        Ball.balls = Ball.balls.filter( obj => obj != this );
    }

    setShape(x:number, y:number, radius:number){
        if( this.shape )
            GameObject.display.removeChild(this.shape);
        
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xffc000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    }
    
    update() {
        // check hit boxes

        // check fall out
    }
}
