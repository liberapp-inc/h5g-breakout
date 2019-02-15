
class Box extends GameObject{

    static boxes:Box[] = [];
    static readonly sizeRateH = (1/2);
    static readonly maxHp:number = 2;

    readonly sizeW:number;
    readonly sizeH:number;
    hp:number;

    constructor( x:number, y:number, hp:number ) {
        super();

        Box.boxes.push(this);
        this.sizeW = Util.width * BOX_SIZE_PER_WIDTH * 0.95;
        this.sizeH = this.sizeW * Box.sizeRateH;
        this.hp = hp;
        this.setShape(x, y);
    }
    
    onDestroy(){
        Box.boxes = Box.boxes.filter( obj => obj != this );
    }

    setShape( x:number, y:number ){
        if( this.shape )
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(Box.getColor(this.hp));
        this.shape.graphics.drawRect(-0.5*this.sizeW, -0.5*this.sizeH, this.sizeW, this.sizeH);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        GameObject.display.setChildIndex(this.shape, 2);
        this.shape.x = x;
        this.shape.y = y;
    }
    static getColor( hp:number ): number{
        let rate = Util.clamp((hp-1) / (Box.maxHp-1), 0, 1) * 0.8 + 0.2;
        return Util.color( 0.9 * rate, 0, 0.2 * rate );
    }
    
    update() {
    }

    applyDamage( point:number = 1 ){
        this.hp -= point;
        if( this.hp > 0 ){
            this.setShape( this.shape.x, this.shape.y );
        }else{
            if( Util.randomInt( 0, 3 ) == 0 ){
                new Item( this.shape.x, this.shape.y, ItemType.Ball );
            }
            this.destroy();
        }
    }
}
