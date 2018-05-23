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
var MapLine = /** @class */ (function (_super) {
    __extends(MapLine, _super);
    function MapLine() {
        var _this = _super.call(this) || this;
        //要移除的地板
        _this.dieLineList = [];
        _this.init();
        return _this;
    }
    MapLine.prototype.init = function () {
        this.addLine(0);
        this.creteBlockFilter();
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    MapLine.prototype.onLoop = function () {
        //监听有没有地板要移除
        while (this.dieLineList.length > 0) {
            var line = this.dieLineList.shift();
            line.removeSelf();
        }
    };
    //增加line
    MapLine.prototype.addLine = function (x) {
        var line = new Line();
        line.once(Line.OUT_LINE, this, this.getLine);
        line.once(Line.DIE_LINE, this, this.delLine);
        line.x = x;
        this.addChild(line);
    };
    // 获取line
    MapLine.prototype.getLine = function (line) {
        var x = line.x + line.width;
        this.addLine(x);
    };
    //  删除line
    MapLine.prototype.delLine = function (line) {
        this.dieLineList.push(line);
    };
    /**创建黑色滤镜**/
    MapLine.prototype.creteBlockFilter = function () {
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，黑图
        var blockMat = [
            0.216, 0, 0, 0, 0,
            0.294, 0, 0, 0, 0,
            0.294, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
        ];
        //创建一个颜色滤镜对象
        var blockFilter = new Laya.ColorFilter(blockMat);
        //添加颜色滤镜
        this.filters = [blockFilter];
    };
    return MapLine;
}(Laya.Sprite));
//# sourceMappingURL=MapLine.js.map