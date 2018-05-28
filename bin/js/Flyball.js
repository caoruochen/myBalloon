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
        var terminalX = 200;
        var flyball = this.createFlyball("res/img/flyball.png");
        // flyball.pivot(46.5, 50);
        flyball.y = 100;
        this.graphics.drawLine(terminalX, 0, terminalX, Laya.stage.height, "#FFFFFF");
        // flyball使用Tween.to缓动
        Laya.Tween.to(flyball, { x: terminalX }, 1000);
    };
    Flyball.prototype.createFlyball = function (skin) {
        var character = new Laya.Sprite();
        character.loadImage(skin);
        this.addChild(character);
        return character;
    };
    return Flyball;
}(Laya.Sprite));
//# sourceMappingURL=Flyball.js.map