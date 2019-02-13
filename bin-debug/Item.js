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
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(x, y) {
        var _this = _super.call(this) || this;
        _this.radius = Game.width * BALL_SIZE_PER_WIDTH * 0.5;
        _this.shape = new egret.Shape();
        _this.shape.graphics.beginFill(0xffc000);
        _this.shape.graphics.drawCircle(0, 0, _this.radius);
        _this.shape.graphics.endFill();
        GameObject.display.addChild(_this.shape);
        _this.shape.x = x;
        _this.shape.y = y;
        return _this;
    }
    Item.prototype.update = function () {
        this.shape.y += Game.height / (60 * 4); // 4sec
        // collision
        var dx = Paddle.I.shape.x - this.shape.x;
        var dy = Paddle.I.shape.y - this.shape.y;
        var r = Paddle.I.size * 0.5 + this.radius;
        if (dx * dx + dy * dy < r * r) {
            Paddle.I.pickItem(0);
            this.destroy();
        }
        if (this.shape.y >= Game.height)
            this.destroy();
    };
    return Item;
}(GameObject));
__reflect(Item.prototype, "Item");
//# sourceMappingURL=Item.js.map