class MapLine extends Laya.Sprite{
    //要移除的地板
    private dieLineList = [];
    private type:string = "line";
    private i:number = 1; //线段编号
    private count:number = 18;
    private flag:Laya.Sprite;
    public passNum:number = 0;//关卡，控制难度
    public direction:boolean = true;//旋转方向
    public changeDirArr = []; //记录要转换节点的下标

    constructor(){
        super();
        this.init();
    }

    init():void{
        this.addLine(this.type,0,Laya.stage.height/2-200,true); //线段初始位置
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    onLoop():void{
        //监听有没有地板要移除
        while(this.dieLineList.length > 0){
            var line = this.dieLineList.shift();
            line.removeSelf();
            // line.destory();
            Laya.Pool.recover("line",line); //放到对象池中
        }
    }

    //增加line
    addLine(type:string,x:number,y:number,direction:boolean):void {
        var maxAng =5 + 2*this.passNum ; //控制难度1：旋转角度随机，根据关卡增大
        if(maxAng >= 30) maxAng = 30 ; //最大变化角度是30， -30~30
        if(!direction) maxAng = -maxAng; //旋转的方向

        // var line = new Line();
        var line = Laya.Pool.getItemByClass("line",Line);
        line.init(type,maxAng);
        line.once(Line.OUT_LINE, this, this.getLine); //监听是否要生成一个新的line
		line.once(Line.DIE_LINE, this, this.delLine); //监听是否要移除line
        line.x = x;
        line.y = y;
        this.addChild(line);
    }
    // 获取上一个line，计算下一个line的位置信息，并生成新的line
    getLine(line):void{
        //新生成的line的坐标
        var rad = 2*Math.PI/360 * line.angle; //角度边弧度
        var x= line.x+line.width*Math.cos(rad)-5;
        var y= line.y+line.width*Math.sin(rad);

        if(this.i > this.count){ 
            this.i = 1;            
            //改变铁丝类型
            this.type = this.type == "line" ? "line2" : "line"; 
            if(this.type == "line2"){
                this.count = 5 + Math.ceil( 8 *Math.random()) + this.passNum; //控制难度2：带刺线段数，随关数增加 
                //开始位置在中间下面，则旋转角度为负
                y>Laya.stage.height/2 ? this.direction = false : this.direction = true;
            }else{
                this.count = 8;
            }

            this.changeDirArr = [];        
            var n; //控制难度3：取n个节点位置转换方向  
            if(this.passNum < 5){
                n=0
            }else if(this.passNum < 10){
                n=1
            }else if(this.passNum < 20){
                n=2
            }else if(this.passNum < 30){
                n=3
            }else{
                n=4
            }
            
            for(var i = 0; i<n; i++){ //取n次
                var index = Math.ceil(this.count * Math.random());
                this.changeDirArr.push(index);
            }
        }
        //随机在第n个地方转换方向
        //在changeDirArr记录位置转变方向
        for(var i = 0; i<this.changeDirArr.length; i++){
            if(this.i == this.changeDirArr[i]) this.direction = !this.direction;                  
        }

        if(y<100 || y>Laya.stage.height-100){ //到顶,底后 转变旋转方向
            this.direction = !this.direction;
        }


        //旗子 出现在直线上
        if(this.type=="line" && (this.i == 2 || this.i == this.count-1)){
            var name = this.i == 2 ? "flag1" : "flag2";    
            if(this.passNum>0){
                this.flag = new Flag();
                this.flag.init(name,this.passNum);             
                this.flag.pivot(0, 70);
                this.flag.pos(x,y);       
                this.flag.zOrder = 1;     
                this.addChild(this.flag);
            }        
            if(name == "flag2") this.passNum += 1;            
        }

        this.i ++;        
		this.addLine(this.type,x,y,this.direction);
    }
    //  删除line
    delLine(line):void{
		this.dieLineList.push(line);
    }
    
}

// export default MapLine;