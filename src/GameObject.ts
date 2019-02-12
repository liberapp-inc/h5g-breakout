// UnityのGameObjectライクなタスク管理クラス
//  update()に毎フレームの処理を書く
//  destroy()でオブジェクトを破棄する
//  破棄のときに後処理が必要なら、onDestroy()に記述
//  生成時の初期化はUnityと違い、constructor()を使う（引数を渡せる）

abstract class GameObject {
    
    public shape:egret.Shape = null;

    constructor() {
        GameObject.objects.push(this);
    }

    abstract update() : void;

    destroy() { this.deleteFlag = true; }
    onDestroy(){}   // virtual method

    // system
    private static objects: GameObject[];
    public static display: egret.DisplayObjectContainer;
    public static transit:()=>void;

    static initial(displayObjectContainer: egret.DisplayObjectContainer){
        GameObject.objects = [];
        GameObject.display = displayObjectContainer;
    }
    static process(){
        GameObject.objects.forEach( obj => obj.update() );
        GameObject.objects = GameObject.objects.filter( obj =>{
            if( obj.deleteFlag ) obj.delete();
            return ( !obj.deleteFlag );
        } );
        if( GameObject.transit ) {
            GameObject.dispose();
            GameObject.transit();
            GameObject.transit = null;
        }
    }
    static dispose(){
        GameObject.objects.forEach( obj => { obj.destroy(); obj.delete(); } );
        GameObject.objects = GameObject.objects.filter( obj => false );
        GameObject.objects = [];
    }

    protected deleteFlag;
    private delete(){
        this.onDestroy();
        if( this.shape ){
            GameObject.display.removeChild(this.shape);
            this.shape = null;
        }
    }
}
