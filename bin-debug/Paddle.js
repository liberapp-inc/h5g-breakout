var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle() {
        var _this = _super.call(this) || this;
        _this.sizeRateY = (1 / 3);
        _this.touchOffsetX = 0;
        Paddle.I = _this;
        _this.size = PADDLE_SIZE_PER_WIDTH * Game.width;
        _this.setShape(Game.width * 0.5, Game.height * 0.9);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchBegin(e); }, _this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) { return _this.touchMove(e); }, _this);
        return _this;
    }
    Paddle.prototype.setShape = function (x, y) {
        if (this.shape)
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff1040);
        this.shape.graphics.drawRect(-0.5 * this.size, -0.5 * this.size * this.sizeRateY, this.size, this.size * this.sizeRateY);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    };
    Paddle.prototype.onDestroy = function () {
        var _this = this;
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) { return _this.touchBegin(e); }, this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) { return _this.touchMove(e); }, this);
        Paddle.I = null;
    };
    Paddle.prototype.update = function () {
        // check to hit balls
        // let p = new Vec2( this.shape.x, this.shape.y );
        // Ball.balls.forEach( ball => {
        //     let bp = new Vec2( ball.shape.x, ball.shape.y );
        //     let dv = new Vec2( p.x, p.y ).sub( bp );
        //     let d = dv.magnitude();
        //     // in bound
        //     if( d < this.size*0.5 + ball.radius ){
        //         // the nearest point on paddle
        //         let uv = new Vec2( dv.x, dv.y ).normalize();
        //         let nv = uv.scale( Vec2.dot( uv, dv ) );
        //         let np = new Vec2( p.x, p.y ).... 
        //     }
        // });
        var _this = this;
        // check to hit balls
        Ball.balls.forEach(function (ball) {
            if (ball.vy > 0) {
                // boundary
                var dx = ball.shape.x - _this.shape.x;
                var dy = ball.shape.y - _this.shape.y;
                var xr = ball.radius + _this.size * 0.5;
                var yr = ball.radius + _this.size * _this.sizeRateY * 0.5;
                if (dx * dx < xr * xr && dy * dy < yr * yr) {
                    if (-dy / Math.abs(dx) >= _this.sizeRateY) {
                        ball.vy *= -1;
                        ball.shape.y += ball.vy;
                    }
                    else {
                        ball.vx *= -1;
                        ball.shape.x += ball.vx;
                    }
                }
            }
        });
    };
    Paddle.prototype.touchBegin = function (e) {
        if (this.deleteFlag)
            return;
        this.touchOffsetX = this.shape.x - e.localX;
        new Ball(this.shape.x, this.shape.y - this.size * 0.5 * this.sizeRateY - (BALL_SIZE_PER_WIDTH * Game.width * 0.5));
    };
    Paddle.prototype.touchMove = function (e) {
        if (this.deleteFlag)
            return;
        this.shape.x = e.localX + this.touchOffsetX;
        this.shape.x = Game.clamp(this.shape.x, this.size * 0.5, Game.width - this.size * 0.5);
        this.touchOffsetX = this.shape.x - e.localX;
    };
    Paddle.prototype.pickItem = function (item) {
    };
    Paddle.I = null; // singleton instance
    return Paddle;
}(GameObject));
__reflect(Paddle.prototype, "Paddle");
//# sourceMappingURL=Paddle.js.map