class Cloud extends Laya.Sprite{
    private cloud:Laya.Sprite;

    constructor(){
        super();
        this.init();
    }

    init():void{
        var randomY = 500*Math.random();
        this.cloud = new Laya.Sprite();
        var texture = Laya.loader.getRes("res/img/cloud.png");
        this.cloud.graphics.drawTexture(texture,0,0);
        this.cloud.scale(10,10);
        this.cloud.alpha = 0.6;
        this.cloud.y = randomY;
        this.addChild(this.cloud);

        // Laya.timer.frameLoop(1,this,this.onLoad);
    }

}
