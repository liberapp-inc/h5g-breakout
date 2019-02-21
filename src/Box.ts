// Liberapp 2019 - Tahiti Katagai
// 壊すボックス　上からだんだん降りてくる

class Box extends GameObject{

    static boxes:Box[] = [];
    static readonly sizeRateH = 0.75;
    static readonly maxHp:number = 15;

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
        let rate = Util.clamp((hp-1) / (Box.maxHp-1), 0, 1);
        return Util.colorLerp( 0xf0d000, 0x800000, rate );
    }
    
    update() { }

    applyDamage( point:number = 1 ){
        this.hp -= point;
        if( this.hp > 0 ){
            this.setShape( this.shape.x, this.shape.y );
        }else{
            if( Util.randomInt( 0, 4 ) == 0 ) {
                let itemTable:number[] = [ ItemType.Ball, ItemType.Ball, ItemType.Ball, ItemType.Ball, ItemType.Big, ItemType.Way5 ];
                new Item( this.shape.x, this.shape.y, itemTable[ Util.randomInt( 0, itemTable.length-1 ) ] );
            }
            Score.I.breakBox();
            this.destroy();
        }
    }
}
