// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.balloonYV = 0; //初始的y轴速度  
        this.gravity = 0.1; //重力加速度  
        this.jumpV = 3.8; //跳跃时获得的向上速度
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
        //加载图片
        Laya.loader.load(["res/img/sky.png", "res/img/line.png", "res/img/line2.png"], laya.utils.Handler.create(this, this.onLoaded));
        //气球容器对象
        this.balloon = new Balloon();
        Laya.stage.addChild(this.balloon);
        this.balloon.x = 400;
        this.balloon.y = 400; //330-430
        //创建动画实例 手指
        this.fingerAni = new Laya.Animation();
        // 加载动画图集,加载成功后执行回调方法
        Laya.loader.load("res/atlas/finger.atlas", Laya.Handler.create(this, this.onFingerLoaded), null, Laya.Loader.ATLAS);
        //监听舞台的点击事件
        Laya.stage.on(Laya.Event.CLICK, this, this.clickHandler);
        //游戏的主要逻辑及绘制
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    GameMain.prototype.onLoaded = function () {
        //实例一个背景
        var bg = new Laya.Image();
        bg.skin = "res/img/sky.png";
        Laya.stage.addChild(bg);
        // Laya.stage.bgColor="#c3ebef";
        //创建循环滚动的line
        // this.line = new Line();
        // Laya.stage.addChild(this.line);
        // this.line.y = 500;
        // this.line.zOrder = 1; 
        this.mapLine = new MapLine();
        Laya.stage.addChild(this.mapLine);
    };
    //手指动画
    GameMain.prototype.onFingerLoaded = function () {
        Laya.Animation.createFrames(["finger/finger1.png", "finger/finger2.png", "finger/finger3.png", "finger/finger4.png"], "finger");
        this.fingerAni = new Laya.Animation();
        this.fingerAni.interval = 480;
        this.fingerAni.scaleX = 2;
        this.fingerAni.scaleY = 2;
        this.fingerAni.pos(1000, 600);
        Laya.stage.addChild(this.fingerAni);
        this.fingerAni.play(0, true, "finger");
    };
    GameMain.prototype.onLoop = function () {
        // console.log(this.balloon.y);
        this.balloonDown();
    };
    //气球运动
    GameMain.prototype.balloonDown = function () {
        if (this.balloon.y <= 330 && this.balloonYV <= 0) {
            this.balloonYV += this.gravity;
            return;
        }
        this.balloon.y += this.balloonYV;
        this.balloonYV += this.gravity;
        if (this.balloon.y >= 430) {
            this.balloonYV = 0;
        }
        // this.balloon.skewY = - this.balloonYV; //倾斜
        // this.balloon.rotation = -0.5 * this.balloonYV; //旋转
    };
    //监听点击事件
    GameMain.prototype.clickHandler = function () {
        this.balloonYV -= this.jumpV;
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=Game.js.map