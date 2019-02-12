
class GameOver extends GameObject{

    textGameOver:egret.TextField = null;
    textScore:egret.TextField = null;

    constructor() {
        super();

        this.textGameOver = Game.newTextField("GAME OVER", Game.width / 10, 0xffff00, 0.5, 0.45, true);
        GameObject.display.addChild( this.textGameOver );
        
        this.textScore = Game.newTextField("SCORE : " + Score.point.toFixed(), Game.width / 12, 0xffff00, 0.5, 0.55, true);
        GameObject.display.addChild( this.textScore );

        GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.tap(e), this);
    }

    onDestroy() {
        GameObject.display.removeChild( this.textGameOver );
        this.textGameOver = null;
        GameObject.display.removeChild( this.textScore );
        this.textScore = null;
    }
    
    update() { }

    tap(e:egret.TouchEvent){
        GameObject.transit = Game.loadSceneGamePlay;
        this.destroy();
    }
}
