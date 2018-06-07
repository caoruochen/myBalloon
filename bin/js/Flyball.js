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
var flyball;
(function (flyball_1) {
    var Flyball = /** @class */ (function (_super) {
        __extends(Flyball, _super);
        // private flyball:Laya.Sprite;
        function Flyball() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Flyball.prototype.init = function () {
            var num = 5 + Math.ceil(5 * Math.random());
            for (var i = 0; i < num; i++) {
                this.createFlyball();
            }
        };
        Flyball.prototype.createFlyball = function () {
            var flyball = new Laya.Sprite();
            flyball.loadImage("res/img/flyball.png");
            this.addChild(flyball);
            this.addYellowFilter(flyball);
            var terminalY = 700 + Math.ceil(800 * Math.random()); //随机位置出现        
            var x = Math.ceil(Laya.stage.width * Math.random());
            var y = Math.ceil(500 * Math.random());
            flyball.pos(x, y); //到达的位置， 随机
            var time = 3000 * Math.ceil(Math.random());
            // flyball使用Tween.from缓动
            Laya.Tween.from(flyball, { y: terminalY }, time, null, Laya.Handler.create(this, this.tweenComplete, [flyball]));
        };
        Flyball.prototype.tweenComplete = function (flyball) {
            flyball.destroy();
        };
        //添加滤镜
        Flyball.prototype.addYellowFilter = function (me) {
            var g = Math.random() * 0.7 + 0.3;
            var Mat = [
                1, 0, 0, 0, 0,
                g, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 1, 0,
            ];
            var Filter = new Laya.ColorFilter(Mat);
            me.filters = [Filter];
            me.alpha = 0.6;
        };
        return Flyball;
    }(Laya.Sprite));
    flyball_1.Flyball = Flyball;
})(flyball || (flyball = {}));
//# sourceMappingURL=Flyball.js.map