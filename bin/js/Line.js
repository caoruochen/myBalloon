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
/*
* 循环滚动的line;
*/
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super.call(this) || this;
        // private screenX : number = Laya.Browser.clientWidth;
        _this.lineNum = Math.ceil(1925 / 87) + 1;
        _this.num1 = Math.ceil(_this.lineNum / 2);
        _this.num2 = _this.lineNum - _this.num1;
        _this.init();
        return _this;
    }
    Line.prototype.init = function () {
        // var randomNum : number = Math.floor(Math.random()*10);
        var posX = 0;
        for (var i = 0; i < this.num1; i++) {
            var line1 = this.createLine("res/img/line.png");
            line1.x = posX;
            posX += 87;
        }
        for (var i = 0; i < this.num2; i++) {
            var line2 = this.createLine("res/img/line2.png");
            line2.x = posX;
            posX += 87;
        }
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    Line.prototype.createLine = function (skin) {
        var line = new Laya.Sprite();
        line.loadImage(skin);
        // line.pos(0,500);
        this.addChild(line);
        return line;
    };
    Line.prototype.onLoop = function () {
        //容器每帧向右移动一像素
        this.x -= 1;
        //遍历所有的line
        for (var i = this.numChildren - 1; i > -1; i--) {
            var line = this.getChildAt(i);
            if (line.x + this.x <= -87) {
                line.x += 87 * this.numChildren;
            }
        }
    };
    return Line;
}(Laya.Sprite));
//# sourceMappingURL=Line.js.map