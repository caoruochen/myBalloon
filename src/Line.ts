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
    
    constructor(){
        super();
        this.init();
    }

    init():void{
        //如果不开启autoSize 父容器的宽度和高度无法获取 
        this.autoSize = true;
        this.x = 0;
        this.y = 500;
        if(this.bg == null){
            //贴图纹理
            this.bgTexture = Laya.loader.getRes("res/img/line2.png");

            this.bg = new Laya.Sprite();
            this.bg.graphics.clear();
            this.addChild(this.bg);
        }
        // this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 14);
        //随机一个范围值
        var _w = 87 * (3 + Math.floor(10 * Math.random()));
        this.bg.graphics.clear();
        console.log(Laya.Texture.createFromTexture(this.bgTexture,0,0,_w,14));
        //Texture.createFromTexture 是根据宽度和高度来截取一个图片并且返回一个Texture对象
        this.bg.graphics.drawTexture(Laya.Texture.createFromTexture(this.bgTexture,0,0,_w,14), 0, 0, _w, 14);

        Laya.timer.frameLoop(1, this, this.onLoop)
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
}