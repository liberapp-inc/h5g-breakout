
class Score extends GameObject{

    static point:number;
    text:egret.TextField = null;

    constructor() {
        super();

        Score.point = 0;
        this.text = Util.newTextField("SCORE : 0", Util.width / 18, 0xffff00, 0.5, 0.0, true);
        GameObject.display.addChild( this.text );
    }
    
    onDestroy() {
        GameObject.display.removeChild( this.text );
        this.text = null;
    }

    update() {
        this.text.text = "SCORE : " + Score.point.toFixed();
    }
}
