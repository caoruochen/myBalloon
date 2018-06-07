module flag{

export class Flag extends Laya.Sprite{
    private flag:Laya.Sprite;
    //事件名称
    // public DIE: string = "die";
    //类型
    public type:string = "flag1";

    constructor(){
        super();
    }

    public init(_type:string,_passNum:number):void{
        this.type = _type;

        var texture = Laya.loader.getRes("res/img/"+this.type+".png");
        this.flag = new Laya.Sprite();
        this.flag.graphics.drawTexture(texture,0,0,56,80);
        this.addChild(this.flag);
        
        //旗子2上有数字
        if(this.type == "flag2"){
            var txt = new Laya.Text();
		    txt.text = ""+_passNum;
		    txt.fontSize = 20;
		    txt.bold = true; //粗体
		    txt.pos(8,10);
		    this.addChild(txt);
        }
    }
}
}