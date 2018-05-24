// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.balloonYV = 0; //初始的y轴速度  
        this.gravity = 0.1; //重力加速度  
        this.jumpV = 2.5; //跳跃时获得的向上速度
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
                url: [
                    "res/img/sky.png",
                    "res/img/line.png",
                    "res/img/line2.png"
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
    }
    GameMain.prototype.onLoaded = function () {
        //实例一个背景
        // Laya.stage.bgColor="#c3ebef";
        var bg = new Laya.Image();
        bg.skin = "res/img/sky.png";
        Laya.stage.addChild(bg);
        //铁丝线
        this.mapLine = new MapLine();
        Laya.stage.addChild(this.mapLine);
        //气球容器对象
        this.balloon = new Balloon();
        this.balloon.x = 400;
        this.balloon.y = 400; //330-430
        Laya.stage.addChild(this.balloon);
        //手指动画
        this.createfingerAni();
        //监听舞台的点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.clickHandler);
        //游戏的主要逻辑及绘制
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    GameMain.prototype.onLoop = function () {
        //如果气球碰到带刺铁丝，就把气球销毁,播放销毁动画
        for (var i = this.mapLine.numChildren - 1; i > -1; i--) {
            var line = this.mapLine.getChildAt(i);
            //气球圈里的上边点，下边点
            if (line.type == "line2" && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 72) || line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 190))) {
                this.balloon.removeSelf();
            }
            //检测气球下落在line上了
            if (line.type == "line" && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 72))) {
                //如果落到地板了 就把气球的坐标设置到地板上面，重置速度为0
                this.balloon.y = line.y - 72;
                this.balloon.vy = 0;
            }
            //检测气球上升line上了
            if (line.type == "line" && (line.hitTestPoint(this.balloon.x + 64, this.balloon.y + 190))) {
                //如果落到地板了 就把气球的坐标设置到地板上面，重置速度为0
                this.balloon.y = line.y - 180;
                this.balloon.vy = 0;
            }
        }
    };
    //点击事件
    GameMain.prototype.clickHandler = function () {
        this.balloon.vy = -this.jumpV;
    };
    //创建手指动画
    GameMain.prototype.createfingerAni = function () {
        //创建动画实例 手指
        Laya.Animation.createFrames(["finger/finger1.png", "finger/finger2.png", "finger/finger3.png", "finger/finger4.png"], "finger");
        this.fingerAni = new Laya.Animation();
        this.fingerAni.interval = 480;
        this.fingerAni.scaleX = 2;
        this.fingerAni.scaleY = 2;
        this.fingerAni.pos(1000, 600);
        Laya.stage.addChild(this.fingerAni);
        this.fingerAni.play(0, true, "finger");
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=Game.js.map