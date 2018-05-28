// 程序入口
class GameMain{
    private mapLine:Laya.Sprite;
    private balloon:Laya.Sprite;
    private balloon1:Laya.Sprite;
    private bird:Laya.Sprite;
    private fingerAni:Laya.Animation;
    private score:number = 0;
    private scoreTxt:Laya.Text;
    private foodNun:number = 0;
    private foodTxt:Laya.Text;

    private balloonYV:number = 0;   //初始的y轴速度  
    private gravity:number = 0.1;    //重力加速度  
    private jumpV:number = 2.5;     //跳跃时获得的向上速度
    private sp: Laya.Particle2D;


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
        //加载资源
        var asset = [{
                url : [
                    "res/img/sky.png",
                    "res/img/line.png",
                    "res/img/line2.png",
                    "res/img/flag1.png",
                    "res/img/flag2.png",
                    "res/img/food.png",
                ],
                type : Laya.Loader.IMAGE
            },{
                url:[
                    "res/atlas/bug.atlas",
                    "res/atlas/finger.atlas",
                ],
                type : Laya.Loader.ATLAS
            }];
        Laya.loader.load(asset, Laya.Handler.create(this, this.onLoaded));
        Laya.loader.load("balloon.part", Laya.Handler.create(this, this.onPartLoaded), null, Laya.Loader.JSON);

        Laya.Stat.show();
    }

    onLoaded():void{
        //实例一个背景
        // Laya.stage.bgColor="#c3ebef";
        var bg = new Laya.Image();
        bg.skin = "res/img/sky.png";
        Laya.stage.addChild(bg);
        //铁丝线
        this.mapLine = new MapLine();
		Laya.stage.addChild(this.mapLine);
        this.mapLine.zOrder = 1;        

        //气球容器对象
        this.balloon = new Balloon();
        Laya.stage.addChild(this.balloon);
        this.balloon.x = 400;
        this.balloon.y = 400; //330-430
        this.balloon.zOrder = 2;   
        this.addPinkFilter(this.balloon);         
        //气球后面的部分
        this.balloon1 = new Laya.Sprite();
        this.balloon1.loadImage("res/img/balloon1.png");
        Laya.stage.addChild(this.balloon1);
        this.addPinkFilter(this.balloon1);

        //小鸟
        this.bird = new Bird();
        Laya.stage.addChild(this.bird);

        //手指动画
        this.createfingerAni();

        //监听舞台的点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.clickHandler);

        //分数
        this.scoreTxt = new Laya.Text();
		this.scoreTxt.text = "0";
		this.scoreTxt.fontSize = 100;
		this.scoreTxt.font = "Microsoft YaHei";
		this.scoreTxt.color = "#7babb4";
		this.scoreTxt.bold = true; //粗体
		this.scoreTxt.x = (Laya.stage.width - this.scoreTxt.textWidth) / 2;
		this.scoreTxt.y = 10;
		Laya.stage.addChild(this.scoreTxt);
        //食物数
        this.foodTxt = new Laya.Text();
		this.foodTxt.text = "0";
		this.foodTxt.fontSize = 40;
		this.foodTxt.font = "Microsoft YaHei";
		this.foodTxt.color = "#fff";
		this.foodTxt.bold = true; //粗体
        // this.foodTxt.bgColor = "b0d2d8";
		this.foodTxt.x = Laya.stage.width - this.foodTxt.textWidth -30;
		this.foodTxt.y = 10;
		Laya.stage.addChild(this.foodTxt);

        var smallFood = new Laya.Sprite;
        smallFood.loadImage("res/img/food.png");
        smallFood.scale(0.4,0.4);
        smallFood.pos(this.foodTxt.x - 50, this.foodTxt.y+10);
        this.addPinkFilter(smallFood);
        Laya.stage.addChild(smallFood);

        //Flyball
        var flyball = new Flyball();
        Laya.stage.addChild(flyball);

        Laya.timer.frameLoop(1,this,this.onLoop);        
        console.log(this.mapLine)
    };
    onPartLoaded(settings: Laya.ParticleSetting):void{
        // 粒子
        this.sp = new Laya.Particle2D(settings);
        this.sp.autoPlay = false;
        Laya.stage.addChild(this.sp);
        this.sp.emitter.clear();
        // this.sp.emitter.start();        
        // this.sp.play();       
        this.sp.zOrder = 1;
    }

    onLoop():void{
		//如果气球碰到带刺铁丝，就把气球销毁,播放销毁动画
		for(var i = this.mapLine.numChildren - 1; i > -1; i--){
			var line = this.mapLine.getChildAt(i);
            //气球圈里的上边点，下边点 
            if(line.type == "line2" && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+72) || line.hitTestPoint(this.balloon.x+64, this.balloon.y+190))){
                // this.balloon.removeSelf(); //将自身从父节点移除
                // this.balloon.destroy(); //销毁
                this.balloon.visible = false; //不可见
                Laya.stage.off(Laya.Event.CLICK, this, this.clickHandler);  //移除点击事件 
                //播放粒子
                this.sp.x = this.balloon.x+50;
                this.sp.y = this.balloon.y+50;
                this.sp.emitter.start();
                Laya.timer.frameOnce(5,this,function(){this.sp.emitter.stop()});
            } 
            //检测气球下落在line上了
            if(line.type == "line" && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+72))){
				//如果落到地板了 就把气球的坐标设置到地板上面，重置速度为0
				this.balloon.y = line.y-72;
                this.balloon.vy = 0;
            }
            //检测气球上升line上了
            if(line.type == "line" && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+190))){
				//如果落到地板了 就把气球的坐标设置到地板上面，重置速度为0
				this.balloon.y = line.y-180;
                this.balloon.vy = 0;
            }
            if((line.type == "flag1" || line.type == "flag2") && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+72))){
                //设置轴心点
                line.rotation = 90;
            }
		}
        
        //小鸟位置跟随balloon
        if(this.balloon.visible){
            this.bird.x = this.balloon.x+60;
            this.bird.y = this.balloon.y-76; 
            this.balloon1.x = this.balloon.x;
            this.balloon1.y = this.balloon.y+40;
        }else{
            this.bird.x += 2;
            this.bird.y -= 1; 
            this.balloon1.visible = false;
        }
             
    }
   
    
     //点击事件
    clickHandler():void {
        Laya.timer.clear(this,this.stopLoop);        
        Laya.timer.frameLoop(1,this,this.lineLoop);                
        Laya.timer.once(1500,this,this.stopLoop);   

        this.balloon.vy = -this.jumpV;
		this.scoreTxt.text = (++this.score) + "";        
    }
    //铁丝移动
    lineLoop():void{
        for(var i = this.mapLine.numChildren - 1; i > -1; i--){
			var line = this.mapLine.getChildAt(i);
            line.x -= 2;
        }
    }
    //停止铁丝移动
    stopLoop():void{
        Laya.timer.clear(this,this.lineLoop);
    }

    //创建手指动画
    createfingerAni():void
    {   
        //创建动画实例 手指
        Laya.Animation.createFrames(["finger/finger1.png","finger/finger2.png","finger/finger3.png","finger/finger4.png"],"finger");
        this.fingerAni = new Laya.Animation();
        this.fingerAni.interval = 480;
        this.fingerAni.scaleX = 2;
        this.fingerAni.scaleY = 2;
        this.fingerAni.pos(1000, 700);
        Laya.stage.addChild(this.fingerAni);
        this.fingerAni.play(0,true,"finger");     
    }
     //添加粉色滤镜
    addPinkFilter(me):void{
		var Mat = 
        [
				0.988, 0, 0, 0, 0, //R
				0.541, 0, 0, 0, 0, //G
				0.675, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
		];
		var pinkFilter = new Laya.ColorFilter(Mat);
        me.filters = [pinkFilter];
        me.alpha = 0.92;
    }
}
new GameMain();