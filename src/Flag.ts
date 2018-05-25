class Flag extends Laya.Sprite{
    //背景贴图纹理
    private bgTexture = null;
    //背景
    private bg = null;
    //事件名称
    public static DIE: string = "die";
    //类型
    public type:string;
    
    constructor(){
        super();
        // this.init();
    }

    public init(_type:string):void{

    }
}