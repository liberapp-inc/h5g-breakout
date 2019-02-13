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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this) || this;
        Ball.balls.push(_this);
        _this.radius = BALL_SIZE_PER_WIDTH * Game.width;
        _this.setShape(x, y, _this.radius);
        _this.vx = _this.radius * +0.5 * (Game.randomInt(0, 1) * 2 - 1);
        _this.vy = _this.radius * -0.5;
        return _this;
    }
    Ball.prototype.onDestroy = function () {
        var _this = this;
        Ball.balls = Ball.balls.filter(function (obj) { return obj != _this; });
    };
    Ball.prototype.setShape = function (x, y, radius) {
        if (this.shape)
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xffc000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        this.shape.x = x;
        this.shape.y = y;
    };
    Ball.prototype.update = function () {
        // move
        this.shape.x += this.vx;
        this.shape.y += this.vy;
        // hit boxes
        // bound on wall
        if (Math.pow((this.shape.x - Game.width * 0.5), 2) > Math.pow((Game.width * 0.5 - this.radius), 2)) {
            this.vx *= -1;
            this.shape.x += this.vx;
        }
        if (this.shape.y < this.radius) {
            this.vy *= -1;
            this.shape.y += this.vy;
        }
        // fall out
        if (this.shape.y > Game.height) {
            this.destroy();
        }
    };
    Ball.prototype.reflect = function () {
    };
    Ball.balls = [];
    return Ball;
}(GameObject));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map