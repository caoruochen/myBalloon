// 程序入口
class GameMain{
    //游戏容器
    private line:Laya.Sprite;
    private balloon:Laya.Sprite;
    private fingerAni:Laya.Animation;

    // private balloonXV:number = 2;   //初始的x轴速度  
    private balloonYV:number = 0;   //初始的y轴速度  
    private gravity:number = 0.1;    //重力加速度  
    private jumpV:number = 3.8;     //跳跃时获得的向上速度

    constructor()
    {
        //TS或JS版本初始化微信小游戏的适配
        Laya.MiniAdpter.init();
        //初始化引擎，背景图宽高
		Laya.init(1925, 955, Laya.WebGL);
        // console.log(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
         //设置适配模式,最小比例缩放
        Laya.stage.scaleMode = "showall";
        //设置水平对齐
		Laya.stage.alignH = "center";
		//设置垂直对齐
		Laya.stage.alignV = "middle";
        //设置竖屏
        // Laya.stage.screenMode = "horizontal";

        //实例一个背景
        var bg = new Laya.Image();
        bg.skin = "res/img/sky.png";
        Laya.stage.addChild(bg);
        // Laya.stage.bgColor="#c3ebef";

        //创建循环滚动的line
        this.line = new Line();
        Laya.stage.addChild(this.line);
        this.line.y = 500;
        //给line加黑色滤镜
        this.creteBlockFilter();
        // this.line.zOrder = 1;        

        //气球容器对象
        this.balloon = new Balloon();
        Laya.stage.addChild(this.balloon);
        this.balloon.x = 400;
        this.balloon.y = 400; //330-430
        this.cretePinkFilter();

        //创建动画实例 手指
        this.fingerAni = new Laya.Animation();
        // 加载动画图集,加载成功后执行回调方法
        Laya.loader.load("res/atlas/finger.atlas",Laya.Handler.create(this,this.onFingerLoaded),null,Laya.Loader.ATLAS);

        //监听舞台的点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.clickHandler);

        //游戏的主要逻辑及绘制
        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    /**创建黑色滤镜**/
    private creteBlockFilter():void{
       //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，黑图
		var blockMat = 
        [
				0.216, 0, 0, 0, 0, //R
				0.294, 0, 0, 0, 0, //G
				0.294, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		//创建一个颜色滤镜对象
		var blockFilter = new Laya.ColorFilter(blockMat);
        //添加黑色颜色滤镜
        this.line.filters = [blockFilter];
    } 
    /**创建粉色滤镜**/
    private cretePinkFilter():void{
		var Mat = 
        [
				0.988, 0, 0, 0, 0, //R
				0.541, 0, 0, 0, 0, //G
				0.675, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		var pinkFilter = new Laya.ColorFilter(Mat);
        this.balloon.filters = [pinkFilter];
        this.balloon.alpha = 0.92;
    } 

    //手指动画
    private onFingerLoaded():void
    {   
        Laya.Animation.createFrames(["finger/finger1.png","finger/finger2.png","finger/finger3.png","finger/finger4.png"],"finger");
        this.fingerAni = new Laya.Animation();
        this.fingerAni.interval = 480;
        this.fingerAni.scaleX = 2;
        this.fingerAni.scaleY = 2;
        this.fingerAni.pos(1000, 600);
        Laya.stage.addChild(this.fingerAni);
        this.fingerAni.play(0,true,"finger");     
    }

    private onLoop():void{
        console.log(this.balloon.y);
        this.balloonDown();                    
        // if(this.balloon.y >= 330 && this.balloon.y <= 430){
        //     this.balloonDown();            
        // }else{
        //     this.balloonYV = 0;            
        // }
    }
    //气球运动
    private balloonDown():void{  
        this.balloon.y += this.balloonYV;
        this.balloonYV += this.gravity;
        // this.balloon.skewY = - this.balloonYV; //倾斜
        // this.balloon.rotation = -0.5 * this.balloonYV; //旋转
         if(this.balloon.y <= 330){
            this.balloonYV = 0;
        }
        if(this.balloon.y >= 430){
            this.balloonYV = 0;
        }
    }
     //监听点击事件
    private clickHandler():void {
        // this.balloon.y -= this.jumpV;
        this.balloonYV -= this.jumpV;
    }

    
}
new GameMain();