module line {

export class Line extends Laya.Sprite{
    //背景贴图纹理
    private bgTexture = null;
    //背景
    private bg = null;
    private isOut = false; //右边超出屏幕
    //事件名称
    //超过屏幕一定值出发新的floor事件
    public static OUT_LINE: string = "out_line";
    //整个line都不在屏幕里面事件
    public static DIE_LINE: string = "die_line";
    //line类型
    public type:string;
    public angle:number; //旋转角度
    public hit:boolean;
    
    constructor(){
        super();
        // this.init();
    }

    public init(_type:string,maxAng:number):void{
        this.type = _type;//line的类型
        this.angle = maxAng * Math.random() ;  //line的旋转角度,随机-30~30
        if(this.type == "line"){
            this.angle = 0; 
        }
        //如果不开启autoSize 父容器的宽度和高度无法获取 
        this.autoSize = true;
        if(this.bg == null){
            //贴图纹理
            this.bgTexture = Laya.loader.getRes("res/img/"+_type+".png");

            this.bg = new Laya.Sprite();
            this.bg.graphics.clear();
            this.addChild(this.bg);
        }
        //随机一个长度的line
        this.bg.graphics.clear();
        this.rotation=this.angle; 
        this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 87, 14);
        // this.bg.graphics.fillTexture(this.bgTexture, 0, 0, w, 10);
        this.creteBlockFilter();//滤镜
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop():void{
        // this.x -= 1;

        //判断右边是否除了边界 如果出了 就通知生成新的line 这里增加一个变量来判断当前是否已经通知外部了 
        if(!this.isOut && (this.x + this.width) <= Laya.stage.width){
            this.isOut = true;
            this.event(Line.OUT_LINE, this);
            
        }else if((this.x + this.width) < 0){
            //判断整个line是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);
            // this.visible = false;
            this.destroy();
            this.event(Line.DIE_LINE, this);
        }
    }

    /**创建黑色滤镜**/
    creteBlockFilter():void{
		var blockMat = 
        [
				0.216, 0, 0, 0, 0, //R
				0.294, 0, 0, 0, 0, //G
				0.294, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		var blockFilter = new Laya.ColorFilter(blockMat);
        this.filters = [blockFilter];
    }
}
}