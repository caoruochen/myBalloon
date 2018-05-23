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
var Line_old = /** @class */ (function (_super) {
    __extends(Line_old, _super);
    function Line_old() {
        var _this = _super.call(this) || this;
        // private screenX : number = Laya.Browser.clientWidth;
        _this.lineNum = Math.ceil(1925 / 87) + 1;
        _this.num1 = Math.ceil(_this.lineNum / 2);
        _this.num2 = _this.lineNum - _this.num1;
        _this.init();
        return _this;
    }
    Line_old.prototype.init = function () {
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
        //给line加黑色滤镜
        this.creteBlockFilter();
    };
    Line_old.prototype.createLine = function (skin) {
        var line = new Laya.Sprite();
        line.loadImage(skin);
        // line.pos(0,500);
        this.addChild(line);
        return line;
    };
    Line_old.prototype.onLoop = function () {
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
    /**创建黑色滤镜**/
    Line_old.prototype.creteBlockFilter = function () {
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，黑图
        var blockMat = [
            0.216, 0, 0, 0, 0,
            0.294, 0, 0, 0, 0,
            0.294, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
        ];
        //创建一个颜色滤镜对象
        var blockFilter = new Laya.ColorFilter(blockMat);
        //添加黑色颜色滤镜
        this.filters = [blockFilter];
    };
    return Line_old;
}(Laya.Sprite));
//# sourceMappingURL=Line_old.js.map