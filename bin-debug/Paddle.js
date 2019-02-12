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
        this.shape.graphics.drawRect(-0.5 * this.size, -0.5 * this.size, this.size, this.size / 3);
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
    };
    Paddle.prototype.touchBegin = function (e) {
        if (this.deleteFlag)
            return;
        this.touchOffsetX = this.shape.x - e.localX;
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