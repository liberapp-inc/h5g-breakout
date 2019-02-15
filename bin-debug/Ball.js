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
    function Ball(x, y, vx, vy) {
        var _this = _super.call(this) || this;
        Ball.balls.push(_this);
        _this.radius = BALL_SIZE_PER_WIDTH * Util.width * 0.5;
        _this.setShape(x, y, _this.radius);
        _this.vx = vx;
        _this.vy = vy;
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
        var _this = this;
        // 移動処理
        this.shape.x += this.vx;
        this.shape.y += this.vy;
        // BOXとの接触判定（一番近いもの）
        var nearest = null;
        var nd2 = 0;
        Box.boxes.forEach(function (box) {
            var dx = box.shape.x - _this.shape.x;
            var dy = box.shape.y - _this.shape.y;
            var dx2 = Math.pow(dx, 2);
            var dy2 = Math.pow(dy, 2);
            if (!nearest) {
                var xr = box.sizeW * 0.5 + _this.radius;
                var yr = box.sizeH * 0.5 + _this.radius;
                if (dx2 < Math.pow(xr, 2) && dy2 < Math.pow(yr, 2)) {
                    nearest = box;
                    nd2 = dx2 + dy2;
                }
            }
            else {
                if (nd2 > dx2 + dy2) {
                    nearest = box;
                    nd2 = dx2 + dy2;
                }
            }
        });
        if (nearest) {
            var dx = nearest.shape.x - this.shape.x;
            var dy = nearest.shape.y - this.shape.y;
            if (Math.abs(dy / dx) >= Box.sizeRateH) {
                this.vy *= -1;
            }
            else {
                this.vx *= -1;
            }
            // ダメージ〜破壊
            nearest.applyDamage(1);
        }
        // 壁で跳ね返り
        if (Math.pow((this.shape.x - Util.width * 0.5), 2) > Math.pow((Util.width * 0.5 - this.radius), 2)) {
            this.vx *= -1;
            this.shape.x += this.vx;
        }
        if (this.vy < 0 && this.shape.y < this.radius) {
            this.vy *= -1;
            this.shape.y += this.vy;
        }
        // 下に落ちたら消える
        if (this.shape.y > Util.height) {
            Paddle.I.ballCount--;
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