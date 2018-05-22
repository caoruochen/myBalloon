/*
* 循环滚动的line;
*/
class Line extends Laya.Sprite{
    // private screenX : number = Laya.Browser.clientWidth;
    private lineNum : number = Math.ceil(1925 / 87)+1;
    private num1 = Math.ceil(this.lineNum/2);
    private num2 = this.lineNum - this.num1;

    constructor(){
        super();
        this.init();
    }

    init():void{
        // var randomNum : number = Math.floor(Math.random()*10);
        var posX : number = 0;

        for(var i=0;i<this.num1;i++){
            var line1 : Laya.Sprite = this.createLine("res/img/line.png");
            line1.x = posX;
            posX += 87;
        }
        for(var i=0;i<this.num2;i++){
            var line2 : Laya.Sprite = this.createLine("res/img/line2.png");
            line2.x = posX;
            posX += 87;
        }
        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    private createLine(skin: string): Laya.Sprite {
        var line : Laya.Sprite= new Laya.Sprite();
        line.loadImage(skin);
        // line.pos(0,500);
        this.addChild(line);

        return line;   
    }

    onLoop():void{
        //容器每帧向右移动一像素
        this.x-=1;
        //遍历所有的line
        for(var i:number = this.numChildren-1;i>-1;i--){
            var line = this.getChildAt(i);
            if(line.x + this.x <= -87){
                line.x += 87*this.numChildren;
            }
        }
    }


}