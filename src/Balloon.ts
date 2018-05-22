class Balloon extends Laya.Sprite{
    private bugAni:Laya.Animation;

    constructor(){
        super();
        this.init();
    }

    init():void{
        var balloon1 : Laya.Sprite = this.createImg("res/img/balloon1.png");
        balloon1.y = 40;
        var balloon2 : Laya.Sprite = this.createImg("res/img/balloon2.png");
        balloon2.x = 64;
        balloon2.y = 40;
        var balloon3 : Laya.Sprite = this.createImg("res/img/balloon3.png");
        balloon3.x = 70;
        var balloon4 : Laya.Sprite = this.createImg("res/img/balloon4.png");
        balloon4.x = 35;        
        var balloon5 : Laya.Sprite = this.createImg("res/img/balloon5.png");
        balloon5.x = 65;        
        balloon5.y = 25;        

        Laya.loader.load("res/atlas/bug.atlas",Laya.Handler.create(this,this.onBugLoaded),null,Laya.Loader.ATLAS);
        this.bugAni = new Laya.Animation();
        this.bugAni.x = 60;
        this.bugAni.y = -76;
   }

    private createImg(path: string): Laya.Sprite {
        var img : Laya.Sprite= new Laya.Sprite();
        img.loadImage(path);
        this.addChild(img);
        return img;   
    }

    private onBugLoaded():void
    {   
        Laya.Animation.createFrames(["bug/bug1.png","bug/bug2.png"],"bug");
        this.bugAni.interval = 480;
        this.addChild(this.bugAni);
        this.bugAni.play(0,true,"bug");     
    }
}