class Balloon extends Laya.Sprite{
    
    private vy:number = 0;   //初始的y轴速度  
    private gravity:number = 0.1;    //重力加速度  
    private jumpV:number = 3.8;     //跳跃时获得的向上速度
    // private sp: Laya.Particle2D;

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
        //粉色滤镜
        // this.pinkFilter();
        // Laya.loader.load("balloonPart.part", Laya.Handler.create(this, this.onAssetsLoaded), null, Laya.Loader.JSON);
        // this.onAssetsLoaded();
        Laya.timer.frameLoop(1, this, this.onLoop);
   }

   onLoop():void{
        //气球下落
        this.y += this.vy;
        this.vy += this.gravity; 
        //实线时 控制下落最大值位置，line的上边
        // if(this.y >= 430){ //330-430
        //     this.y = 430
        // }
   }

    createImg(path: string): Laya.Sprite {
        var img : Laya.Sprite= new Laya.Sprite();
        img.loadImage(path);
        this.addChild(img);
        return img;   
    }

    // //添加粉色滤镜
    // pinkFilter():void{
	// 	var Mat = 
    //     [
	// 			0.988, 0, 0, 0, 0, //R
	// 			0.541, 0, 0, 0, 0, //G
	// 			0.675, 0, 0, 0, 0, //B
	// 			0, 0, 0, 1, 0, //A
	// 	];
	// 	var pinkFilter = new Laya.ColorFilter(Mat);
    //     this.filters = [pinkFilter];
    //     this.alpha = 0.92;
    // }

    // //粒子特效
    // public onAssetsLoaded(settings: Laya.ParticleSetting): void {
    //     this.sp = new Laya.Particle2D(settings);
    //     this.sp.emitter.start();
    //     this.sp.play();
    //     this.addChild(this.sp);
    // }
}