// Liberapp 2019 - Tahiti Katagai
// 壊すボックス　上からだんだん降りてくる
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
        Box.boxes.push(_this);
        _this.sizeW = Util.width * BOX_SIZE_PER_WIDTH * 0.95;
        _this.sizeH = _this.sizeW * Box.sizeRateH;
        _this.hp = hp;
        _this.setShape(x, y);
        return _this;
    }
    Box.prototype.onDestroy = function () {
        var _this = this;
        Box.boxes = Box.boxes.filter(function (obj) { return obj != _this; });
    };
    Box.prototype.setShape = function (x, y) {
        if (this.shape)
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(Box.getColor(this.hp));
        this.shape.graphics.drawRect(-0.5 * this.sizeW, -0.5 * this.sizeH, this.sizeW, this.sizeH);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        GameObject.display.setChildIndex(this.shape, 2);
        this.shape.x = x;
        this.shape.y = y;
    };
    Box.getColor = function (hp) {
        var rate = Util.clamp((hp - 1) / (Box.maxHp - 1), 0, 1);
        return Util.colorLerp(0xf0d000, 0x800000, rate);
    };
    Box.prototype.update = function () { };
    Box.prototype.applyDamage = function (point) {
        if (point === void 0) { point = 1; }
        this.hp -= point;
        if (this.hp > 0) {
            this.setShape(this.shape.x, this.shape.y);
        }
        else {
            if (Util.randomInt(0, 4) == 0) {
                var itemTable = [ItemType.Ball, ItemType.Ball, ItemType.Ball, ItemType.Ball, ItemType.Big, ItemType.Way5];
                new Item(this.shape.x, this.shape.y, itemTable[Util.randomInt(0, itemTable.length - 1)]);
            }
            Score.I.breakBox();
            this.destroy();
        }
    };
    Box.boxes = [];
    Box.sizeRateH = 0.75;
    Box.maxHp = 15;
    return Box;
}(GameObject));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map