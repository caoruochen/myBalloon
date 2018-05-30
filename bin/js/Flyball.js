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
var Flyball = /** @class */ (function (_super) {
    __extends(Flyball, _super);
    function Flyball() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Flyball.prototype.init = function () {
        // var flyball: Laya.Sprite = this.createFlyball("res/img/flyball.png");
        // this.createFlyball();
        var num = 3 + Math.ceil(10 * Math.random());
        console.log(num);
        for (var i = 0; i < num; i++) {
            this.createFlyball();
            console.log(i);
        }
    };
    Flyball.prototype.createFlyball = function () {
        var flyball = new Laya.Sprite();
        flyball.loadImage("res/img/flyball.png");
        this.addChild(flyball);
        var terminalY = 500 + Math.ceil(Laya.Browser.clientHeight * Math.random()); //随机位置出现        
        var x = Math.ceil(Laya.Browser.clientWidth * Math.random());
        var y = Math.ceil(100 * Math.random());
        flyball.pos(x, y); //到达的位置， 随机
        var time = 3000 * Math.ceil(Math.random());
        // flyball使用Tween.from缓动
        Laya.Tween.from(flyball, { y: terminalY }, time, null, Laya.Handler.create(this, this.tweenComplete, [flyball]));
    };
    Flyball.prototype.tweenComplete = function (flyball) {
        flyball.destroy();
    };
    return Flyball;
}(Laya.Sprite));
//# sourceMappingURL=Flyball.js.map