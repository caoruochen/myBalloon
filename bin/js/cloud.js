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
var cloud;
(function (cloud) {
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        Cloud.prototype.init = function () {
            var randomY = 500 * Math.random();
            this.realcloud = new Laya.Sprite();
            var texture = Laya.loader.getRes("res/img/cloud.png");
            this.realcloud.graphics.drawTexture(texture, 0, 0);
            this.realcloud.scale(10, 10);
            this.realcloud.alpha = 0.6;
            this.realcloud.y = randomY;
            this.addChild(this.realcloud);
        };
        return Cloud;
    }(Laya.Sprite));
    cloud.Cloud = Cloud;
})(cloud || (cloud = {}));
//# sourceMappingURL=Cloud.js.map