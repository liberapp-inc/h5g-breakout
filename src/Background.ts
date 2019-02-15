
class Background extends GameObject{

    constructor() {
        super();

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x00c0e0);
        this.shape.graphics.drawRect(0, 0, Util.width, Util.height);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
    }
    
    update() {}
}

