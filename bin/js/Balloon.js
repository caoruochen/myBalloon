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
var Balloon = /** @class */ (function (_super) {
    __extends(Balloon, _super);
    function Balloon() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Balloon.prototype.init = function () {
        var balloon1 = this.createImg("res/img/balloon1.png");
        balloon1.y = 40;
        var balloon2 = this.createImg("res/img/balloon2.png");
        balloon2.x = 64;
        balloon2.y = 40;
        var balloon3 = this.createImg("res/img/balloon3.png");
        balloon3.x = 70;
        var balloon4 = this.createImg("res/img/balloon4.png");
        balloon4.x = 35;
        var balloon5 = this.createImg("res/img/balloon5.png");
        balloon5.x = 65;
        balloon5.y = 25;
        Laya.loader.load("res/atlas/bug.atlas", Laya.Handler.create(this, this.onBugLoaded), null, Laya.Loader.ATLAS);
        this.bugAni = new Laya.Animation();
        this.bugAni.x = 60;
        this.bugAni.y = -76;
    };
    Balloon.prototype.createImg = function (path) {
        var img = new Laya.Sprite();
        img.loadImage(path);
        this.addChild(img);
        return img;
    };
    Balloon.prototype.onBugLoaded = function () {
        Laya.Animation.createFrames(["bug/bug1.png", "bug/bug2.png"], "bug");
        this.bugAni.interval = 480;
        this.addChild(this.bugAni);
        this.bugAni.play(0, true, "bug");
    };
    return Balloon;
}(Laya.Sprite));
//# sourceMappingURL=Balloon.js.map