// Liberapp 2019 - Tahiti Katagai
// 跳ねるボール（大）

class BigBall extends Ball{

    hp:number = 40;

    constructor( x:number, y:number, vx:number, vy:number ) {
        super( x, y, vx, vy );

        this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5 * 2;
        this.setShape(x, y, this.radius);
    }

    // onDestroy(){
    //     Ball.balls = Ball.balls.filter( obj => obj != this );
    // }
    
    update() {
        // 移動処理
        this.shape.x += this.vx;
        this.shape.y += this.vy;

        // BOXとの接触判定
        Box.boxes.forEach( box => {
            let dx = box.shape.x - this.shape.x;
            let dy = box.shape.y - this.shape.y;
            let dx2 = dx**2;
            let dy2 = dy**2;

            let xr = box.sizeW * 0.5 + this.radius;
            let yr = box.sizeH * 0.5 + this.radius;
            if( dx2 < xr**2 && dy2 < yr**2 ){
                box.applyDamage( 1 );
                if( --this.hp <= 0 ){
                    new Ball( this.shape.x, this.shape.y, this.vx, this.vy );
                    this.destroy();
                    return;
                }
            }
        });

        this.boundWall();
    }
}

