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
var Flag = /** @class */ (function (_super) {
    __extends(Flag, _super);
    function Flag() {
        var _this = _super.call(this) || this;
        //背景贴图纹理
        _this.bgTexture = null;
        //背景
        _this.bg = null;
        //类型
        _this.type = "flag1";
        return _this;
        // this.init("flag1");
    }
    Flag.prototype.init = function (_type, _passNum) {
        this.type = _type;
        this.passNum = _passNum;
        var texture = Laya.loader.getRes("res/img/" + this.type + ".png");
        this.bg = new Laya.Sprite();
        this.bg.graphics.drawTexture(texture, 0, 0, 56, 80);
        this.addChild(this.bg);
        if (this.type == "flag2") {
            //关卡
            this.txt = new Laya.Text();
            this.txt.text = "" + this.passNum;
            this.txt.fontSize = 20;
            this.txt.bold = true; //粗体
            this.txt.pos(8, 10);
            this.addChild(this.txt);
        }
    };
    //事件名称
    Flag.DIE = "die";
    return Flag;
}(Laya.Sprite));
//# sourceMappingURL=Flag.js.map