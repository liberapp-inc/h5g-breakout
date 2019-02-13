
class Ball extends GameObject{

    static balls:Ball[] = [];

    radius:number;
    vx:number;
    vy:number;

    constructor( x:number, y:number) {
        super();

        Ball.balls.push(this);
        this.radius = BALL_SIZE_PER_WIDTH * Game.width;
        this.setShape(x, y, this.radius);
        this.vx = this.radius * +0.5 * (Game.randomInt(0,1) * 2 - 1);
        this.vy = this.radius * -0.5;
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
        // move
        this.shape.x += this.vx;
        this.shape.y += this.vy;

        // hit boxes

        // bound on wall
        if( (this.shape.x - Game.width*0.5) ** 2 > (Game.width*0.5 - this.radius)**2 ) {
            this.vx *= -1;
            this.shape.x += this.vx;
        }
        if( this.shape.y < this.radius ) {
            this.vy *= -1;
            this.shape.y += this.vy;
        }
        // fall out
        if( this.shape.y > Game.height ) { // + this.radius ) {
            this.destroy();
        }
    }

    reflect(){
        

    }
}
