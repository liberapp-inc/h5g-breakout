// Liberapp 2019 - Tahiti Katagai
// スタート時の説明テキスト

class StartMessage extends GameObject{

    texts:egret.TextField[] = [];
    
    constructor() {
        super();

        this.texts[0] = Util.newTextField("１.スワイプで狙ってボールを撃つ", Util.width / 22, 0xffffff, 0.5, 0.4, true);
        this.texts[1] = Util.newTextField("２.はね返ったボールをパッドでキャッチ", Util.width / 22, 0xffffff, 0.5, 0.5, true);
        this.texts.forEach( text =>{ GameObject.display.addChild( text ); });

        GameObject.display.once(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => this.tap(e), this);
    }

    onDestroy(){
        this.texts.forEach( text =>{ GameObject.display.removeChild( text ); });
        this.texts = null;
    }

    update() {}

    tap(e:egret.TouchEvent){
        Paddle.I.setStateAiming();
        this.destroy();
    }
}
