// パワーアップアイテム
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
var ItemType;
(function (ItemType) {
    ItemType[ItemType["None"] = 0] = "None";
    ItemType[ItemType["Ball"] = 1] = "Ball";
    ItemType[ItemType["Chain"] = 2] = "Chain";
    ItemType[ItemType["BigBall"] = 3] = "BigBall";
    ItemType[ItemType["Shot"] = 4] = "Shot";
})(ItemType || (ItemType = {}));
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(x, y, type) {
        var _this = _super.call(this) || this;
        _this.radius = Util.width * BALL_SIZE_PER_WIDTH * 0.5;
        _this.type = type;
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
        this.shape.y += Util.height / (60 * 4); // 4sec
        // collision
        var dx = Paddle.I.shape.x - this.shape.x;
        var dy = Paddle.I.shape.y - this.shape.y;
        var xr = Paddle.I.sizeW * 0.5 + this.radius;
        var yr = Paddle.I.sizeH * 0.5 + this.radius;
        if (dx * dx < xr * xr && dy * dy < yr * yr) {
            Paddle.I.pickItem(this.type);
            this.destroy();
        }
        if (this.shape.y >= Util.height)
            this.destroy();
    };
    return Item;
}(GameObject));
__reflect(Item.prototype, "Item");
//# sourceMappingURL=Item.js.map