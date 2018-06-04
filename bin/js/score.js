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
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Score.prototype.init = function () {
        //步数
        this.scoreTxt = new Laya.Text();
        this.scoreTxt.text = "0";
        this.scoreTxt.fontSize = 100;
        this.scoreTxt.font = "Microsoft YaHei";
        this.scoreTxt.color = "#7babb4";
        this.scoreTxt.bold = true; //粗体
        this.scoreTxt.x = (Laya.stage.width - this.scoreTxt.textWidth) / 2;
        this.scoreTxt.y = 10;
        this.addChild(this.scoreTxt);
        //食物数
        this.foodTxt = new Laya.Text();
        this.foodTxt.text = "0";
        this.foodTxt.fontSize = 40;
        this.foodTxt.font = "Microsoft YaHei";
        this.foodTxt.color = "#fff";
        this.foodTxt.bold = true; //粗体
        this.foodTxt.x = Laya.stage.width - this.foodTxt.textWidth - 30;
        this.foodTxt.y = 10;
        this.addChild(this.foodTxt);
        this.smallFood = new Laya.Sprite;
        this.smallFood.loadImage("res/img/food.png");
        this.smallFood.scale(0.4, 0.4);
        this.smallFood.pos(this.foodTxt.x - 50, this.foodTxt.y + 10);
        this.addChild(this.smallFood);
        //关数
        this.king = new Laya.Sprite;
        this.king.loadImage("res/img/king.png");
        this.king.pos(this.foodTxt.x - 50, this.foodTxt.y + 10);
        this.king.x = this.scoreTxt.x;
        this.king.y = 150;
        this.addChild(this.king);
        this.levelTxt = new Laya.Text();
        this.levelTxt.text = "0";
        this.levelTxt.fontSize = 40;
        this.levelTxt.font = "Microsoft YaHei";
        this.levelTxt.color = "#fff";
        this.levelTxt.bold = true; //粗体
        this.levelTxt.x = this.king.x + 50;
        this.levelTxt.y = 140;
        this.addChild(this.levelTxt);
        //gameover
        this.gameoverTxt = new Laya.Text();
        this.gameoverTxt.text = "Game Over !\n点击继续游戏";
        this.gameoverTxt.fontSize = 90;
        this.gameoverTxt.font = "Microsoft YaHei";
        this.gameoverTxt.color = "#7babb4";
        this.gameoverTxt.bold = true; //粗体
        this.gameoverTxt.x = (Laya.stage.width - this.gameoverTxt.textWidth) / 2;
        this.gameoverTxt.y = Laya.stage.height / 2 - 100;
        this.gameoverTxt.visible = false;
        this.addChild(this.gameoverTxt);
    };
    return Score;
}(Laya.Sprite));
//# sourceMappingURL=Score.js.map