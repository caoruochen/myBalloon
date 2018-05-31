class Cloud extends Laya.Sprite{
    // private cloud

    constructor(){
        super();
        this.init();
    }

    init(){
        var cloud:Laya.Sprite;
        cloud = new Laya.Sprite();
        cloud.loadImage("res/img/cloud.png");
        cloud.scale(10,10);
        cloud.alpha = 0.6;
        // this.cloud.y = 500;
        cloud.zOrder = 3;
        Laya.stage.addChild(cloud);
    }
}