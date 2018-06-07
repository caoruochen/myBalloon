module flyball {

export class Flyball extends Laya.Sprite{
    // private flyball:Laya.Sprite;

    constructor(){
        super();
        this.init();
    }

    init():void{
        var num = 5 + Math.ceil(5 * Math.random());
        for(var i=0; i<num; i++){
            this.createFlyball();    
        }
    }

    createFlyball(): void {
        var flyball: Laya.Sprite = new Laya.Sprite();
        flyball.loadImage("res/img/flyball.png");
        this.addChild(flyball);
        this.addYellowFilter(flyball);
        var terminalY: number = 700 + Math.ceil(  800 * Math.random()); //随机位置出现        
        var x = Math.ceil(Laya.stage.width * Math.random());
        var y = Math.ceil(500 * Math.random());
        flyball.pos(x,y); //到达的位置， 随机
        var time = 3000 * Math.ceil(Math.random());
        // flyball使用Tween.from缓动
        Laya.Tween.from(flyball, { y: terminalY }, time,null,Laya.Handler.create(this,this.tweenComplete,[flyball]));
    }

    tweenComplete(flyball):void{
        flyball.destroy();
    }

    //添加滤镜
    addYellowFilter(me):void{
        var g = Math.random() * 0.7 + 0.3;
		var Mat = 
        [
				1, 0, 0, 0, 0, //R
				g, 0, 0, 0, 0, //G 0.3-1
				0, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		var Filter = new Laya.ColorFilter(Mat);
        me.filters = [Filter];
        me.alpha = 0.6;
    }
}
}