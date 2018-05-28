class Flag extends Laya.Sprite{
    //背景贴图纹理
    private bgTexture = null;
    //背景
    private bg = null;
    //事件名称
    public static DIE: string = "die";
    //类型
    public type:string = "flag1";
    private txt:Laya.Text;
    public passNum:number;
    
    constructor(){
        super();
        // this.init("flag1");
    }

    public init(_type:string,_passNum:number):void{
        this.type = _type;
        this.passNum = _passNum;
        var texture = Laya.loader.getRes("res/img/"+this.type+".png");
        this.bg = new Laya.Sprite();
        this.bg.graphics.drawTexture(texture,0,0,56,80);
        this.addChild(this.bg);

        if(this.type == "flag2"){
            //关卡
            this.txt = new Laya.Text();
		    this.txt.text = ""+this.passNum;
		    this.txt.fontSize = 20;
		    this.txt.bold = true; //粗体
		    this.txt.pos(8,10);
		    this.addChild(this.txt);
        }
    }
}