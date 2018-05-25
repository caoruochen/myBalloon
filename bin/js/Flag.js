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
        return _this;
        // this.init();
    }
    Flag.prototype.init = function (_type) {
    };
    //事件名称
    Flag.DIE = "die";
    return Flag;
}(Laya.Sprite));
//# sourceMappingURL=Flag.js.map