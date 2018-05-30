class Flyball extends Laya.Sprite{
    private flyball:Laya.Sprite;

    constructor(){
        super();
        this.init();
    }

    init():void{
        // var flyball: Laya.Sprite = this.createFlyball("res/img/flyball.png");
        // this.createFlyball();
        var num = 3 + Math.ceil(10 * Math.random());
        console.log(num);        
        for(var i=0; i<num; i++){
            this.createFlyball();    
            console.log(i);        
        }
    }

    createFlyball(): void {
        var flyball: Laya.Sprite = new Laya.Sprite();
        flyball.loadImage("res/img/flyball.png");
        this.addChild(flyball);
        var terminalY: number = 500 + Math.ceil(Laya.Browser.clientHeight * Math.random()); //随机位置出现        
        var x = Math.ceil(Laya.Browser.clientWidth * Math.random());
        var y = Math.ceil(100 * Math.random());
        flyball.pos(x,y); //到达的位置， 随机
        var time = 3000 * Math.ceil(Math.random());
        // flyball使用Tween.from缓动
        Laya.Tween.from(flyball, { y: terminalY }, time,null,Laya.Handler.create(this,this.tweenComplete,[flyball]));
    }

    tweenComplete(flyball):void{
        flyball.destroy();
    }
}