class Line extends Laya.Sprite{
    //背景贴图纹理
    private bgTexture = null;
    //背景
    private bg = null;
    private isOut = false; //右边超出屏幕
    //事件名称
    //超过屏幕一定值出发新的floor事件
    public static OUT_LINE: string = "out_line";
    //整个地板都不在屏幕里面事件
    public static DIE_LINE: string = "die_line";
    //line类型
    public type:string;
    
    constructor(){
        super();
        // this.init();
    }

    public init(_type:string):void{
        this.type = _type;
        //如果不开启autoSize 父容器的宽度和高度无法获取 
        this.autoSize = true;
        this.x = 0;
        this.y = 500;
        if(this.bg == null){
            //贴图纹理
            this.bgTexture = Laya.loader.getRes("res/img/"+_type+".png");

            this.bg = new Laya.Sprite();
            this.bg.graphics.clear();
            this.addChild(this.bg);
        }
        //随机一个长度的line
        var w = 87 * (5 + Math.floor(10 * Math.random()));
        this.bg.graphics.clear();
        // this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 14);
        this.bg.graphics.fillTexture(this.bgTexture, 0, 0, w, 10);

        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop():void{
        this.x -= 1;

        //判断右边是否除了边界 如果出了 就通知生成新的line 这里增加一个变量来判断当前是否已经通知外部了 
        if(!this.isOut && (this.x + this.width) <= 1925){
            this.isOut = true;
            this.event(Line.OUT_LINE, this);
            // console.log(this.x + this.width);
            
        }else if((this.x + this.width) < 0){
            //判断整个line是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);
            this.visible = false;
            this.event(Line.DIE_LINE, this);
        }
    }

    // //碰撞检测 (x,y)碰撞点
    // public checkHit(x,y):boolean{
    //     if(x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height)){
    //         return true;
    //     }
    //     return false;
    // }
}