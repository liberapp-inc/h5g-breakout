// ゲームで便利に使えるUtilityクラス
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BOXES_IN_WIDTH = 8;
var BOX_SIZE_PER_WIDTH = 1 / BOXES_IN_WIDTH;
var BALL_SIZE_PER_WIDTH = BOX_SIZE_PER_WIDTH / 4;
var PADDLE_SIZE_PER_WIDTH = 1 / 4;
var Game = (function () {
    function Game() {
    }
    Game.init = function (eui) {
        this.height = eui.stage.stageHeight;
        this.width = eui.stage.stageWidth;
        Game.loadSceneGamePlay();
    };
    Game.loadSceneGamePlay = function () {
        new Background();
        new Paddle();
        new Score();
    };
    Game.random = function (min, max) {
        return min + Math.random() * (max - min);
    };
    Game.randomInt = function (min, max) {
        return Math.floor(min + Math.random() * (max + 0.999 - min));
    };
    Game.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        if (value > max)
            value = max;
        return value;
    };
    Game.color = function (r, g, b) {
        return (Math.floor(r * 0xff) * 0x010000 + Math.floor(g * 0xff) * 0x0100 + Math.floor(b * 0xff));
    };
    Game.newTextField = function (text, size, color, xRatio, yRatio, bold) {
        var tf = new egret.TextField();
        tf.text = text;
        tf.bold = bold;
        tf.size = size;
        tf.textColor = color;
        tf.x = (Game.width - tf.width) * xRatio;
        tf.y = (Game.height - tf.height) * yRatio;
        return tf;
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map