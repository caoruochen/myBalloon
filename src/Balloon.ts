class Balloon extends Laya.Sprite{
    private bugAni:Laya.Animation;
    
    private vy:number = 0;   //初始的y轴速度  
    private gravity:number = 0.1;    //重力加速度  
    private jumpV:number = 3.8;     //跳跃时获得的向上速度

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

        // 创建动画模板
        Laya.Animation.createFrames(["bug/bug1.png","bug/bug2.png"],"bug");
        this.bugAni = new Laya.Animation();
        this.bugAni.x = 60;
        this.bugAni.y = -76;
        this.bugAni.interval = 480;
        this.addChild(this.bugAni);  
        //播放动画   
        this.bugAni.play(0,true,"bug"); 
        this.pinkFilter();

        Laya.timer.frameLoop(1, this, this.onLoop)
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

//    jump():void{
//         this.vy = -10;
//     }
    //  //跳结束重置
    // jumpReset():void{
    //     this.vy = 0;
    // }


    createImg(path: string): Laya.Sprite {
        var img : Laya.Sprite= new Laya.Sprite();
        img.loadImage(path);
        this.addChild(img);
        return img;   
    }

    /**添加粉色滤镜**/
    pinkFilter():void{
		var Mat = 
        [
				0.988, 0, 0, 0, 0, //R
				0.541, 0, 0, 0, 0, //G
				0.675, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		var pinkFilter = new Laya.ColorFilter(Mat);
        this.filters = [pinkFilter];
        this.alpha = 0.92;
    } 

}