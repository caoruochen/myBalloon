class MapLine extends Laya.Sprite{
    //要移除的地板
    private dieLineList = [];
    private type:string = "line";

    constructor(){
        super();
        this.init();
    }

    init():void{
        this.addLine(this.type,0);
        this.creteBlockFilter();
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop():void{
        //监听有没有地板要移除
        while(this.dieLineList.length > 0){
            var line = this.dieLineList.shift();
            line.removeSelf();
        }
    }

    //增加line
    addLine(type:string,x:number):void {
        var line = new Line();
        line.init(type);
        line.once(Line.OUT_LINE, this, this.getLine);
		line.once(Line.DIE_LINE, this, this.delLine);
        line.x = x;
        this.addChild(line);
    }
    // 获取line
    getLine(line):void{
        var x= line.x+line.width;
        //line和line2交替出现
         if(this.type == "line"){
            this.type = "line2";
        }else if(this.type == "line2"){
            this.type = "line";
        }
		this.addLine(this.type,x);
    }
    //  删除line
    delLine(line):void{
		this.dieLineList.push(line);
    }

    /**创建黑色滤镜**/
    creteBlockFilter():void{
       //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，黑图
		var blockMat = 
        [
				0.216, 0, 0, 0, 0, //R
				0.294, 0, 0, 0, 0, //G
				0.294, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		//创建一个颜色滤镜对象
		var blockFilter = new Laya.ColorFilter(blockMat);
        //添加颜色滤镜
        this.filters = [blockFilter];
    }
}