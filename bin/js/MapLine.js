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
        _this.typeFlag = true;
        _this.type = "line";
        _this.i = 0;
        _this.count = 5;
        _this.passNum = 0; //关卡
        _this.init();
        return _this;
    }
    MapLine.prototype.init = function () {
        this.addLine(this.type, 0, 500);
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    MapLine.prototype.onLoop = function () {
        this.type = this.typeFlag ? "line" : "line2";
        //监听有没有地板要移除
        while (this.dieLineList.length > 0) {
            var line = this.dieLineList.shift();
            line.removeSelf();
            // line.destory();
        }
    };
    //增加line
    MapLine.prototype.addLine = function (type, x, y) {
        var line = new Line();
        line.init(type);
        line.once(Line.OUT_LINE, this, this.getLine); //监听是否要生成一个新的line
        line.once(Line.DIE_LINE, this, this.delLine); //监听是否要移除line
        line.x = x;
        line.y = y;
        this.addChild(line);
    };
    // 获取上一个line
    MapLine.prototype.getLine = function (line) {
        //新生成的line的坐标
        var rad = 2 * Math.PI / 360 * line.angle;
        var x = line.x + line.width * Math.cos(rad) - 5;
        var y = line.y + line.width * Math.sin(rad);
        if (this.i > this.count) {
            this.typeFlag = !this.typeFlag;
            this.i = 0;
            this.count = 3 + Math.ceil(10 * Math.random());
        }
        // console.log(this.count)
        //旗子 出现在直线的第一段
        if (this.type == "line" && (this.i == 2 || this.i == this.count)) {
            //旗子
            var name = this.i == 2 ? "flag1" : "flag2";
            this.flag = new Flag();
            this.flag.init(name, this.passNum);
            this.flag.pivot(0, 70);
            this.flag.pos(x, y);
            this.flag.zOrder = 1;
            this.addChild(this.flag);
            if (name == "flag2") {
                this.passNum += 1;
            }
            ;
        }
        this.i++;
        this.addLine(this.type, x, y);
    };
    //  删除line
    MapLine.prototype.delLine = function (line) {
        this.dieLineList.push(line);
    };
    return MapLine;
}(Laya.Sprite));
//# sourceMappingURL=MapLine.js.map