var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super.call(this) || this;
        //背景贴图纹理
        _this.bgTexture = null;
        //背景
        _this.bg = null;
        _this.isOut = false; //右边超出屏幕
        return _this;
        // this.init();
    }
    Line.prototype.init = function (_type) {
        this.type = _type;
        //如果不开启autoSize 父容器的宽度和高度无法获取 
        this.autoSize = true;
        this.x = 0;
        this.y = 500;
        if (this.bg == null) {
            //贴图纹理
            this.bgTexture = Laya.loader.getRes("res/img/" + _type + ".png");
            this.bg = new Laya.Sprite();
            this.bg.graphics.clear();
            this.addChild(this.bg);
        }
        //随机一个长度的line
        var w = 87 * (5 + Math.floor(10 * Math.random()));
        this.bg.graphics.clear();
        // this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 14);
        this.bg.graphics.fillTexture(this.bgTexture, 0, 0, w, 10);
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Line.prototype.onLoop = function () {
        this.x -= 1;
        //判断右边是否除了边界 如果出了 就通知生成新的line 这里增加一个变量来判断当前是否已经通知外部了 
        if (!this.isOut && (this.x + this.width) <= 1925) {
            this.isOut = true;
            this.event(Line.OUT_LINE, this);
            // console.log(this.x + this.width);
        }
        else if ((this.x + this.width) < 0) {
            //判断整个line是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);
            this.visible = false;
            this.event(Line.DIE_LINE, this);
        }
    };
    //事件名称
    //超过屏幕一定值出发新的floor事件
    Line.OUT_LINE = "out_line";
    //整个地板都不在屏幕里面事件
    Line.DIE_LINE = "die_line";
    return Line;
}(Laya.Sprite));
//# sourceMappingURL=Line.js.map