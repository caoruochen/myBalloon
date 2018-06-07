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
var flag;
(function (flag) {
    var Flag = /** @class */ (function (_super) {
        __extends(Flag, _super);
        function Flag() {
            var _this = _super.call(this) || this;
            //事件名称
            // public DIE: string = "die";
            //类型
            _this.type = "flag1";
            return _this;
        }
        Flag.prototype.init = function (_type, _passNum) {
            this.type = _type;
            var texture = Laya.loader.getRes("res/img/" + this.type + ".png");
            this.flag = new Laya.Sprite();
            this.flag.graphics.drawTexture(texture, 0, 0, 56, 80);
            this.addChild(this.flag);
            //旗子2上有数字
            if (this.type == "flag2") {
                var txt = new Laya.Text();
                txt.text = "" + _passNum;
                txt.fontSize = 20;
                txt.bold = true; //粗体
                txt.pos(8, 10);
                this.addChild(txt);
            }
        };
        return Flag;
    }(Laya.Sprite));
    flag.Flag = Flag;
})(flag || (flag = {}));
//# sourceMappingURL=Flag.js.map