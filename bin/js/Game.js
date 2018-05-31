// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.score = 0;
        this.foodNun = 0;
        // private balloonYV:number = 0;   //初始的y轴速度  
        // private gravity:number = 0.1;    //重力加速度  
        this.jumpV = 1.4; //跳跃时获得的向上速度
        this.f = true; //气球旋转方向
        this.W = 955;
        this.H = 1925;
        //TS或JS版本初始化微信小游戏的适配
        Laya.MiniAdpter.init();
        //初始化引擎，背景图宽高
        Laya.init(955, 1925, Laya.WebGL);
        // console.log(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
        //设置适配模式,最小比例缩放
        Laya.stage.scaleMode = "showall";
        //设置水平对齐
        Laya.stage.alignH = "center";
        //设置垂直对齐
        Laya.stage.alignV = "middle";
        //设置竖屏
        Laya.stage.screenMode = "horizontal";
        //加载资源
        var asset = [{
                url: [
                    "res/img/sky.png",
                    "res/img/cloud.png",
                    "res/img/line.png",
                    "res/img/line2.png",
                    "res/img/flag1.png",
                    "res/img/flag2.png",
                    "res/img/food.png",
                ],
                type: Laya.Loader.IMAGE
            }, {
                url: [
                    "res/atlas/bug.atlas",
                    "res/atlas/finger.atlas",
                ],
                type: Laya.Loader.ATLAS
            }];
        Laya.loader.load(asset, Laya.Handler.create(this, this.onLoaded));
        Laya.loader.load("balloon.part", Laya.Handler.create(this, this.onPartLoaded), null, Laya.Loader.JSON);
        Laya.Stat.show();
    }
    GameMain.prototype.onLoaded = function () {
        //实例一个背景
        // Laya.stage.bgColor="#c3ebef";
        var bg = new Laya.Image();
        bg.skin = "res/img/sky.png";
        bg.rotation = 90;
        bg.pos(955, 0);
        Laya.stage.addChild(bg);
        //白云
        // this.cloud = new Laya.Sprite();
        // this.cloud.loadImage("res/img/cloud.png");
        // this.cloud.scale(10,10);
        // this.cloud.alpha = 0.6;
        // // this.cloud.y = 500;
        // this.cloud.zOrder = 3;
        // Laya.stage.addChild(this.cloud);
        this.cloud = new Cloud();
        console.log(this.cloud);
        //铁丝线
        this.mapLine = new MapLine();
        Laya.stage.addChild(this.mapLine);
        this.mapLine.zOrder = 1;
        //气球容器对象
        this.balloon = new Balloon();
        this.balloon.pos(200, Laya.stage.height / 2 - 300); //初始位置
        this.balloon.zOrder = 2;
        this.addPinkFilter(this.balloon);
        Laya.stage.addChild(this.balloon);
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
        this.fingerAni.play();
        //监听舞台的点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.clickHandler);
        //分数
        this.scoreTxt = new Laya.Text();
        this.scoreTxt.text = "0";
        this.scoreTxt.fontSize = 100;
        this.scoreTxt.font = "Microsoft YaHei";
        this.scoreTxt.color = "#7babb4";
        this.scoreTxt.bold = true; //粗体
        this.scoreTxt.x = (this.W - this.scoreTxt.textWidth) / 2;
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
        this.foodTxt.x = this.W - this.foodTxt.textWidth - 30;
        this.foodTxt.y = 10;
        Laya.stage.addChild(this.foodTxt);
        var smallFood = new Laya.Sprite;
        smallFood.loadImage("res/img/food.png");
        smallFood.scale(0.4, 0.4);
        smallFood.pos(this.foodTxt.x - 50, this.foodTxt.y + 10);
        this.addPinkFilter(smallFood);
        Laya.stage.addChild(smallFood);
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    ;
    GameMain.prototype.onPartLoaded = function (settings) {
        // 粒子
        this.sp = new Laya.Particle2D(settings);
        this.sp.autoPlay = false;
        Laya.stage.addChild(this.sp);
        this.sp.emitter.clear();
        // this.sp.emitter.start();        
        // this.sp.play();       
        this.sp.zOrder = 1;
    };
    GameMain.prototype.onLoop = function () {
        //如果气球碰到带刺铁丝，就把气球销毁,播放销毁动画
        for (var i = this.mapLine.numChildren - 1; i > -1; i--) {
            var line = this.mapLine.getChildAt(i);
            //气球圈里的上边点，下边点 
            if (line.type == "line2" && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 70) || line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 190))) {
                // this.balloon.removeSelf(); //将自身从父节点移除
                // this.balloon.destroy(); //销毁
                this.balloon.visible = false; //不可见
                Laya.stage.off(Laya.Event.CLICK, this, this.clickHandler); //移除点击事件 
                //播放粒子
                this.sp.x = this.balloon.x + 50;
                this.sp.y = this.balloon.y + 50;
                this.sp.emitter.start();
                Laya.timer.frameOnce(5, this, function () { this.sp.emitter.stop(); });
            }
            //检测气球下落在line上了
            if (line.type == "line" && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 72))) {
                //如果落到地板了 就把气球的坐标设置到地板上面，重置速度为0
                this.balloon.y = line.y - 72;
                this.balloon.vy = 0;
            }
            //检测气球上升到line上了
            if (line.type == "line" && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 185))) {
                this.balloon.y = line.y - 185 + 14;
                this.balloon.vy = 0;
            }
            //检测气球碰到旗子
            if ((line.type == "flag1" || line.type == "flag2") && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 72))) {
                line.rotation = 90; //旗子旋转
                //Flyball 放气球
                if (line.type == "flag1" && !(line.hit)) {
                    var flyball = new Flyball();
                    Laya.stage.addChild(flyball);
                    line.hit = true;
                }
            }
        }
        //小鸟位置跟随balloon
        if (this.balloon.visible) {
            this.bird.x = this.balloon.x + 60;
            this.bird.y = this.balloon.y - 76;
            this.balloon1.x = this.balloon.x;
            this.balloon1.y = this.balloon.y + 40;
        }
        else {
            this.bird.x += 4;
            this.bird.y -= 2;
            this.balloon1.visible = false;
        }
    };
    //点击事件
    GameMain.prototype.clickHandler = function () {
        Laya.timer.clear(this, this.stopLoop);
        Laya.timer.frameLoop(1, this, this.lineLoop);
        Laya.timer.once(1500, this, this.stopLoop);
        this.balloon.vy = -this.jumpV;
        this.scoreTxt.text = (++this.score) + "";
        this.fingerAni.stop();
        this.fingerAni.visible = false;
    };
    //铁丝移动
    GameMain.prototype.lineLoop = function () {
        for (var i = this.mapLine.numChildren - 1; i > -1; i--) {
            var line = this.mapLine.getChildAt(i);
            line.x -= 3;
        }
        // this.balloon.scaleX = 0.97;
        // this.balloon1.scaleX = 0.97;
        //气球左右摆动
        if (this.balloon.rotation > 6 || this.balloon.rotation < 0) {
            this.f = !this.f;
        }
        if (this.f) {
            this.balloon.rotation += 1 / 5;
            this.balloon1.rotation += 1 / 5;
        }
        if (!this.f) {
            this.balloon.rotation -= 1 / 5;
            this.balloon1.rotation -= 1 / 5;
        }
        //白云移动
        this.cloud._x -= 1;
        console.log(this.cloud.x);
    };
    //停止铁丝移动
    GameMain.prototype.stopLoop = function () {
        Laya.timer.clear(this, this.lineLoop);
        this.fingerAni.play();
        this.fingerAni.visible = true;
    };
    //创建手指动画
    GameMain.prototype.createfingerAni = function () {
        this.fingerAni = new Laya.Animation();
        this.fingerAni.loadAnimation("finger.ani");
        this.fingerAni.scaleX = 2;
        this.fingerAni.scaleY = 2;
        this.fingerAni.pos(this.W / 2 + 100, this.H / 2 + 600);
        Laya.stage.addChild(this.fingerAni);
    };
    //添加粉色滤镜
    GameMain.prototype.addPinkFilter = function (me) {
        var Mat = [
            0.988, 0, 0, 0, 0,
            0.541, 0, 0, 0, 0,
            0.675, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
        ];
        var pinkFilter = new Laya.ColorFilter(Mat);
        me.filters = [pinkFilter];
        me.alpha = 0.93;
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=Game.js.map