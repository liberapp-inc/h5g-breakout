// ゲームで便利に使えるUtilityクラス

const BOXES_IN_WIDTH = 8;
const BOX_SIZE_PER_WIDTH = 1/BOXES_IN_WIDTH;
const BALL_SIZE_PER_WIDTH = BOX_SIZE_PER_WIDTH / 4;
const PADDLE_SIZE_PER_WIDTH = 1 / 4;

class Game{

    public static height: number;
    public static width: number;

    static init( eui:eui.UILayer ) {
        this.height = eui.stage.stageHeight;
        this.width  = eui.stage.stageWidth;

        Game.loadSceneGamePlay();
    }

    static loadSceneGamePlay() {
        new Background();
        new Paddle();
        new Score();
    }

    static random(min:number, max:number):number {
        return min + Math.random() * (max - min);
    }

    static randomInt(min:number, max:number):number {
        return Math.floor( min + Math.random() * (max+0.999 - min) );
    }

    static clamp(value:number, min:number, max:number):number {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    static color( r:number, g:number, b:number):number {
        return ( Math.floor(r * 0xff)*0x010000 + Math.floor(g * 0xff)*0x0100 + Math.floor(b * 0xff) );
    }

    static newTextField(text:string, size:number, color:number, xRatio:number, yRatio:number, bold:boolean): egret.TextField {
        let tf = new egret.TextField();
        tf.text = text;
        tf.bold = bold;
        tf.size = size;
        tf.textColor = color;
        tf.x = (Game.width  - tf.width)  * xRatio;
        tf.y = (Game.height - tf.height) * yRatio;
        return tf;
    }
}

