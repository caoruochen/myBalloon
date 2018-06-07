module game {
    
// import Cloud from "./Cloud";
// import MapLine from "./MapLine";
// import Balloon from "./Balloon";
// import Bird from "./Bird";
// import Score from "./Score";
import Cloud = cloud.Cloud;
import MapLine = mapline.MapLine;
import Balloon = balloon.Balloon;
import Bird = bird.Bird;
import Score = score.Score;
import Flyball = flyball.Flyball;
import Line = line.Line;
// 程序入口
export class GameMain{
    private cloud:Cloud;
    private mapLine:MapLine;
    private balloon:Balloon;
    private balloon1:Laya.Sprite;
    private bird:Bird;
    private fingerAni:Laya.Animation;
    private mapScore:Score;
    private step:number = 0;  //点击加1 的分数
    private score:number = 0; //过一关时记录的分数
    private level:number = 0;

    private f:boolean = true; //气球旋转方向
    private sp: Laya.Particle2D; //粒子
    private W:number = 955;
    private H:number = 1925;

    constructor()
    {
        //TS或JS版本初始化微信小游戏的适配
        Laya.MiniAdpter.init();
        //初始化引擎，背景图宽高
		Laya.init(this.W, this.H, Laya.WebGL);
        // console.log(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        //设置居中对齐
        Laya.stage.alignH = "center";
        //设置横竖屏
        Laya.stage.screenMode = "vertical";
        //加载资源
        var asset = [{
                url : [
                    "res/img/sky.png",
                    "res/img/cloud.png",
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
        var bg = new Laya.Image();
        bg.skin = "res/img/sky.png";
        bg.rotation = 90;
        bg.pos(955,0);
        Laya.stage.addChild(bg);
        //白云
        this.cloud = new Cloud();
        this.cloud.zOrder = 3;   
        Laya.stage.addChild(this.cloud);

        //手指动画
        this.createfingerAni();
        this.fingerAni.play(); 

        //分数
        this.mapScore = new Score();
		Laya.stage.addChild(this.mapScore);
        this.addPinkFilter(this.mapScore.smallFood);
  
        this.restart();     
    };

    restart():void{
        //清除铁丝,小鸟
        if(this.mapLine){
            Laya.timer.clear(this,this.onLoop);            
            this.mapLine.destroy();
            this.bird.removeSelf();
            Laya.Pool.recover("bird",this.bird);
            this.mapScore.gameoverTxt.visible = false;
        };
        this.step = this.score;

        //铁丝线
        this.mapLine = new MapLine();
        this.mapLine.init(this.level);
		Laya.stage.addChild(this.mapLine);
        this.mapLine.zOrder = 1;        

        //气球容器对象
        this.balloon = new Balloon();
        this.balloon.pos(200,Laya.stage.height/2-300); //初始位置
        this.balloon.zOrder = 2;   
        this.addPinkFilter(this.balloon);   
        Laya.stage.addChild(this.balloon);
              
        //气球后面的部分
        this.balloon1 = new Laya.Sprite();
        this.balloon1.loadImage("res/img/balloon1.png");
        Laya.stage.addChild(this.balloon1);
        this.addPinkFilter(this.balloon1);

        //小鸟
        this.bird = Laya.Pool.getItemByClass("bird",Bird);
        Laya.stage.addChild(this.bird);
        
        //监听舞台的点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.clickHandler);
        Laya.timer.frameLoop(1,this,this.onLoop);              
    }


    onLoop():void{
        //气球下落
        this.balloon.y += this.balloon.vy;
        this.balloon.vy += this.balloon.gravity; 
        //小鸟位置跟随balloon
        if(this.balloon.visible){
            this.bird.x = this.balloon.x+60;
            this.bird.y = this.balloon.y-76; 
            this.balloon1.x = this.balloon.x;
            this.balloon1.y = this.balloon.y+40;
        }else{
            this.bird.x += 4;
            this.bird.y -= 2; 
            this.balloon1.visible = false;
        }

        //碰撞检测
		for(var i = this.mapLine.numChildren - 1; i > -1; i--){
			var line:Line = this.mapLine.getChildAt(i) as Line;
		    //如果气球碰到带刺铁丝，就把气球销毁,播放销毁动画
            //气球圈里的上边点，下边点 
            if(line.type == "line2" && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+70) || line.hitTestPoint(this.balloon.x+64, this.balloon.y+190))){
                // this.balloon.removeSelf(); //将自身从父节点移除
                // this.balloon.destroy(); //销毁
                this.balloon.visible = false; //不可见
                Laya.stage.off(Laya.Event.CLICK, this, this.clickHandler);  //移除点击事件 
                //播放粒子
                this.sp.x = this.balloon.x+50;
                this.sp.y = this.balloon.y+50;
                this.sp.emitter.start();
                Laya.timer.frameOnce(5,this,function(){this.sp.emitter.stop()});

                //gameover
                this.mapScore.gameoverTxt.visible = true;
                //注册舞台点击事件，点击重新开始游戏
                this.mapScore.gameoverTxt.once(Laya.Event.CLICK,this,this.restart);
            } 
            //检测气球下落在line上了
            if(line.type == "line" && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+72))){
				//如果落到地板了 就把气球的坐标设置到地板上面，重置速度为0
				this.balloon.y = line.y-72;
                this.balloon.vy = 0;
            }
            //检测气球上升到line上了
            if(line.type == "line" && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+185))){
				this.balloon.y = line.y-185+14;
                this.balloon.vy = 0;
            }
            //检测气球碰到旗子
            if((line.type == "flag1" || line.type == "flag2") && (line.hitTestPoint(this.balloon.x+64, this.balloon.y+80))){
                line.rotation = 90; //旗子旋转
                //Flyball 放气球
                if(line.type == "flag1" && !(line.hit)){
                    var flyball = new Flyball();
                    Laya.stage.addChild(flyball);
                    line.hit = true;

                    this.level += 1;
                    this.mapScore.levelTxt.text = ''+this.level;
                    this.score = this.step; //记录一关开始时的步数
                }
            }
		}
    }
   
    
     //点击事件
    clickHandler():void {
        Laya.timer.clear(this,this.stopLoop);        
        Laya.timer.frameLoop(1,this,this.lineLoop);                
        Laya.timer.once(1200,this,this.stopLoop);   

        this.balloon.vy = -this.balloon.jumpV;
        
		this.mapScore.stepTxt.text = "" + (++this.step);    

        this.fingerAni.stop();  
        this.fingerAni.visible = false;    
    }
    //铁丝移动
    lineLoop():void{
        for(var i = this.mapLine.numChildren - 1; i > -1; i--){
			var line:Line = this.mapLine.getChildAt(i) as Line;
            line.x -= 3;
        }
        // this.balloon.scaleX = 0.97;
        // this.balloon1.scaleX = 0.97;
        //气球左右摆动
        if(this.balloon.rotation > 6 || this.balloon.rotation <0){
            this.f = !this.f;
        }
        if(this.f){
            this.balloon.rotation += 0.15;
            this.balloon1.rotation += 0.15;
        }
        if(!this.f){
            this.balloon.rotation -= 0.15;
            this.balloon1.rotation -= 0.15;
        }

        //白云移动
        this.cloud.x -= 1;
        var realcloud = this.cloud.realcloud;
        if(realcloud.x + this.cloud.x < -1000){
            realcloud.x += 1000 + Laya.stage.width;
            realcloud.y = 300 * Math.random();
        }
    }
    //停止铁丝移动
    stopLoop():void{
        Laya.timer.clear(this,this.lineLoop);

        this.fingerAni.play();   
        this.fingerAni.visible = true;                          
    }

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

    //创建手指动画
    createfingerAni():void
    {   
        this.fingerAni = new Laya.Animation();
        this.fingerAni.loadAnimation("finger.ani");
        this.fingerAni.scaleX = 2;
        this.fingerAni.scaleY = 2;
        this.fingerAni.pos(this.W/2+100, this.H/2+600);
        Laya.stage.addChild(this.fingerAni);
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
        me.alpha = 0.93;
    }
}
}

new game.GameMain();