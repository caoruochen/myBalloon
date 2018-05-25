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
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Bird.prototype.init = function () {
        // 创建动画模板
        Laya.Animation.createFrames(["bug/bug1.png", "bug/bug2.png"], "bug");
        this.birdAni = new Laya.Animation();
        // this.birdAni.x = 60;
        // this.birdAni.y = -76;
        this.birdAni.interval = 480;
        this.addChild(this.birdAni);
        //播放动画   
        this.birdAni.play(0, true, "bug");
    };
    return Bird;
}(Laya.Sprite));
//# sourceMappingURL=Bird.js.map