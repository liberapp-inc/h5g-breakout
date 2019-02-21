// Liberapp 2019 Tahiti Katagai
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
    ItemType[ItemType["Big"] = 2] = "Big";
    ItemType[ItemType["Way5"] = 3] = "Way5";
    ItemType[ItemType["Total"] = 4] = "Total";
})(ItemType || (ItemType = {}));
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(x, y, type) {
        var _this = _super.call(this) || this;
        Item.count++;
        _this.type = type;
        _this.shape = new egret.Shape();
        switch (_this.type) {
            case ItemType.Ball:
                _this.radius = Util.width * BALL_SIZE_PER_WIDTH * 0.5 * 0.7;
                _this.shape.graphics.beginFill(0xffc000);
                _this.shape.graphics.drawCircle(0, 0, _this.radius);
                _this.shape.graphics.endFill();
                break;
            case ItemType.Big:
                _this.radius = Util.width * BALL_SIZE_PER_WIDTH * 0.5 * 2;
                _this.shape.graphics.lineStyle(8, 0xffc000);
                // this.shape.graphics.beginFill(0xffc000);
                _this.shape.graphics.drawCircle(0, 0, _this.radius);
                // this.shape.graphics.endFill();
                break;
            case ItemType.Way5:
                var r = Util.width * BALL_SIZE_PER_WIDTH * 0.5;
                _this.radius = r * 2;
                _this.shape.graphics.beginFill(0xffc000);
                _this.shape.graphics.drawCircle(-2.0 * r, +0.4 * r, 0.5 * r);
                _this.shape.graphics.drawCircle(-1.0 * r, -0.0 * r, 0.5 * r);
                _this.shape.graphics.drawCircle(-0.0 * r, -0.3 * r, 0.5 * r);
                _this.shape.graphics.drawCircle(+1.0 * r, -0.0 * r, 0.5 * r);
                _this.shape.graphics.drawCircle(+2.0 * r, +0.4 * r, 0.5 * r);
                _this.shape.graphics.endFill();
                break;
        }
        GameObject.display.addChild(_this.shape);
        _this.shape.x = x;
        _this.shape.y = y;
        return _this;
    }
    Item.prototype.onDestroy = function () {
        Item.count--;
    };
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
    Item.count = 0;
    return Item;
}(GameObject));
__reflect(Item.prototype, "Item");
//# sourceMappingURL=Item.js.map