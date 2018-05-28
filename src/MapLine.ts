class MapLine extends Laya.Sprite{
    //要移除的地板
    private dieLineList = [];
    private typeFlag:boolean = true;
    private type:string = "line";
    private i:number = 0;
    private count:number = 5;
    private flag:Laya.Sprite;
    public passNum:number = 0;//关卡

    constructor(){
        super();
        this.init();
    }

    init():void{
        this.addLine(this.type,0,500);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop():void{
        this.type = this.typeFlag ? "line" : "line2";
        //监听有没有地板要移除
        while(this.dieLineList.length > 0){
            var line = this.dieLineList.shift();
            line.removeSelf();
            // line.destory();
        }
    }

    //增加line
    addLine(type:string,x:number,y:number):void {
        var line = new Line();
        line.init(type);
        line.once(Line.OUT_LINE, this, this.getLine); //监听是否要生成一个新的line
		line.once(Line.DIE_LINE, this, this.delLine); //监听是否要移除line
        line.x = x;
        line.y = y;
        this.addChild(line);
    }
    // 获取上一个line
    getLine(line):void{
        //新生成的line的坐标
        var rad = 2*Math.PI/360 * line.angle;
        var x= line.x+line.width*Math.cos(rad)-5;
        var y= line.y+line.width*Math.sin(rad);

        if(this.i > this.count){
            this.typeFlag = !this.typeFlag;
            this.i = 0;
            this.count = 3+ Math.ceil(10*Math.random());
        }
        // console.log(this.count)
        //旗子 出现在直线的第一段
        if(this.type=="line" && (this.i == 2 || this.i == this.count)){
            //旗子
            var name = this.i == 2 ? "flag1" : "flag2";            
            this.flag = new Flag();
            this.flag.init(name,this.passNum);             
            this.flag.pivot(0, 70);
            this.flag.pos(x,y);       
            this.flag.zOrder = 1;     
            this.addChild(this.flag);
            if(name == "flag2"){
                this.passNum += 1;
            }; 
        }
        this.i ++;        
		this.addLine(this.type,x,y);
    }
    //  删除line
    delLine(line):void{
		this.dieLineList.push(line);
    }
    
}