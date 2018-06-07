module cloud{

export class Cloud extends Laya.Sprite{
    public realcloud:Laya.Sprite;

    constructor(){
        super();
        this.init();
    }

    init():void{
        var randomY = 500*Math.random();
        this.realcloud = new Laya.Sprite();
        var texture = Laya.loader.getRes("res/img/cloud.png");
        this.realcloud.graphics.drawTexture(texture,0,0);
        this.realcloud.scale(10,10);
        this.realcloud.alpha = 0.6;
        this.realcloud.y = randomY;
        this.addChild(this.realcloud);
    }
}

}