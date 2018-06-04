class Balloon extends Laya.Sprite{
    
    public vy:number = 0;   //初始的y轴速度  
    private gravity:number = 0.08;    //重力加速度  
    // private jumpV:number = 3.8;     //跳跃时获得的向上速度

    constructor(){
        super();
        this.init();
    }

    init():void{
        // var balloon1 : Laya.Sprite = this.createImg("res/img/balloon1.png");
        // balloon1.y = 40;
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

        Laya.timer.frameLoop(1, this, this.onLoop);
   }

   onLoop():void{
        //气球下落
        this.y += this.vy;
        this.vy += this.gravity; 
   }

    createImg(path: string): Laya.Sprite {
        var img : Laya.Sprite= new Laya.Sprite();
        img.loadImage(path);
        this.addChild(img);
        return img;   
    }

}