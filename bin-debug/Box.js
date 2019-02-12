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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(x, y, hp) {
        var _this = _super.call(this) || this;
        _this.size = Game.width * BOX_SIZE_PER_WIDTH * 0.95;
        _this.hp = hp;
        _this.setShape(x, y);
        return _this;
    }
    Box.prototype.setShape = function (x, y) {
        if (this.shape)
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(Box.getColor(this.hp));
        this.shape.graphics.drawRect(-0.5 * this.size, -0.5 * this.size, this.size, this.size);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        GameObject.display.setChildIndex(this.shape, 2);
        this.shape.x = x;
        this.shape.y = y;
    };
    Box.getColor = function (hp) {
        var rate = Game.clamp((hp - 1) / (Box.maxHp - 1), 0, 1);
        return Game.color(1, 1 - rate, 0);
    };
    Box.prototype.update = function () {
    };
    Box.boxes = [];
    Box.maxHp = 8;
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map