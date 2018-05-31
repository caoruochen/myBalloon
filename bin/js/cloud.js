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
var Cloud = /** @class */ (function (_super) {
    __extends(Cloud, _super);
    // private cloud
    function Cloud() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Cloud.prototype.init = function () {
        var cloud;
        cloud = new Laya.Sprite();
        cloud.loadImage("res/img/cloud.png");
        cloud.scale(10, 10);
        cloud.alpha = 0.6;
        // this.cloud.y = 500;
        cloud.zOrder = 3;
        Laya.stage.addChild(cloud);
    };
    return Cloud;
}(Laya.Sprite));
//# sourceMappingURL=Cloud.js.map