// Liberapp 2019 - Tahiti Katagai
// 跳ねるボール（大）
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
var BigBall = (function (_super) {
    __extends(BigBall, _super);
    function BigBall(x, y, vx, vy) {
        var _this = _super.call(this, x, y, vx, vy) || this;
        _this.hp = 40;
        _this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5 * 2;
        _this.setShape(x, y, _this.radius);
        return _this;
    }
    // onDestroy(){
    //     Ball.balls = Ball.balls.filter( obj => obj != this );
    // }
    BigBall.prototype.update = function () {
        var _this = this;
        // 移動処理
        this.shape.x += this.vx;
        this.shape.y += this.vy;
        // BOXとの接触判定
        Box.boxes.forEach(function (box) {
            var dx = box.shape.x - _this.shape.x;
            var dy = box.shape.y - _this.shape.y;
            var dx2 = Math.pow(dx, 2);
            var dy2 = Math.pow(dy, 2);
            var xr = box.sizeW * 0.5 + _this.radius;
            var yr = box.sizeH * 0.5 + _this.radius;
            if (dx2 < Math.pow(xr, 2) && dy2 < Math.pow(yr, 2)) {
                box.applyDamage(1);
                if (--_this.hp <= 0) {
                    new Ball(_this.shape.x, _this.shape.y, _this.vx, _this.vy);
                    _this.destroy();
                    return;
                }
            }
        });
        this.boundWall();
    };
    return BigBall;
}(Ball));
__reflect(BigBall.prototype, "BigBall");
//# sourceMappingURL=BigBall.js.map