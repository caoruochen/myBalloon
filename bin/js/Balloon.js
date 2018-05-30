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
var Balloon = /** @class */ (function (_super) {
    __extends(Balloon, _super);
    function Balloon() {
        var _this = _super.call(this) || this;
        _this.vy = 0; //初始的y轴速度  
        _this.gravity = 0.1; //重力加速度  
        _this.jumpV = 3.8; //跳跃时获得的向上速度
        _this.init();
        return _this;
    }
    Balloon.prototype.init = function () {
        // var balloon1 : Laya.Sprite = this.createImg("res/img/balloon1.png");
        // balloon1.y = 40;
        var balloon2 = this.createImg("res/img/balloon2.png");
        balloon2.x = 64;
        balloon2.y = 40;
        var balloon3 = this.createImg("res/img/balloon3.png");
        balloon3.x = 70;
        var balloon4 = this.createImg("res/img/balloon4.png");
        balloon4.x = 35;
        var balloon5 = this.createImg("res/img/balloon5.png");
        balloon5.x = 65;
        balloon5.y = 25;
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Balloon.prototype.onLoop = function () {
        //气球下落
        this.y += this.vy;
        this.vy += this.gravity;
        //实线时 控制下落最大值位置，line的上边
        // if(this.y >= 430){ //330-430
        //     this.y = 430
        // }
    };
    Balloon.prototype.createImg = function (path) {
        var img = new Laya.Sprite();
        img.loadImage(path);
        this.addChild(img);
        return img;
    };
    return Balloon;
}(Laya.Sprite));
//# sourceMappingURL=Balloon.js.map