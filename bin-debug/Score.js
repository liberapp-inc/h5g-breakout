// Liberapp 2019 - Tahiti Katagai
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
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this.point = 0;
        _this.combo = 0; // １ターンで壊したBOX数だけコンボになる（高得点）
        _this.text = null;
        Score.I = _this;
        _this.point = 0;
        _this.text = Util.newTextField("SCORE : 0", Util.width / 18, 0xffff00, 0.5, 0.0, true);
        GameObject.display.addChild(_this.text);
        return _this;
    }
    Score.prototype.onDestroy = function () {
        GameObject.display.removeChild(this.text);
        this.text = null;
    };
    Score.prototype.update = function () {
        this.text.text = "SCORE : " + this.point.toFixed();
    };
    Score.prototype.breakBox = function () {
        this.point += 1 + this.combo;
        this.combo++;
    };
    Score.I = null; // singleton instance
    return Score;
}(GameObject));
__reflect(Score.prototype, "Score");
//# sourceMappingURL=Score.js.map