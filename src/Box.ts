class Box extends GameObject{

    static boxes:Box[] = [];
    static readonly maxHp:number = 8;

    size:number;
    hp:number;

    constructor( x:number, y:number, hp:number ) {
        super();

        this.size = Game.width * BOX_SIZE_PER_WIDTH * 0.95;
        this.hp = hp;
        this.setShape(x, y);
    }
    setShape( x:number, y:number ){
        if( this.shape )
            GameObject.display.removeChild(this.shape);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(Box.getColor(this.hp));
        this.shape.graphics.drawRect(-0.5*this.size, -0.5*this.size, this.size, this.size);
        this.shape.graphics.endFill();
        GameObject.display.addChild(this.shape);
        GameObject.display.setChildIndex(this.shape, 2);
        this.shape.x = x;
        this.shape.y = y;
    }
    static getColor( hp:number ): number{
        let rate = Game.clamp((hp-1) / (Box.maxHp-1), 0, 1);
        return Game.color( 1, 1-rate, 0 );
    }
    
    update() {
    }
}

