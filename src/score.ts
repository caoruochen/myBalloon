module score {

export class Score extends Laya.Sprite{
    public stepTxt:Laya.Text;
    private king:Laya.Sprite;
    public levelTxt:Laya.Text;
    public smallFood:Laya.Sprite;
    public foodTxt:Laya.Text;
    public gameoverTxt:Laya.Text;

    constructor(){
        super();
        this.init();
    }

    init():void{
        //步数
        this.stepTxt = new Laya.Text();
		this.stepTxt.text = "0";
		this.stepTxt.fontSize = 100;
		this.stepTxt.font = "Microsoft YaHei";
		this.stepTxt.color = "#7babb4";
		this.stepTxt.bold = true; //粗体
		this.stepTxt.pos((Laya.stage.width - this.stepTxt.textWidth)/2,10);
		this.addChild(this.stepTxt);

        //关数
        this.king = new Laya.Sprite;
        this.king.loadImage("res/img/king.png");
        this.king.pos(this.stepTxt.x,150);
        this.addChild(this.king);
         
        this.levelTxt = new Laya.Text();
		this.levelTxt.text = "0";
		this.levelTxt.fontSize = 40;
		this.levelTxt.font = "Microsoft YaHei";
		this.levelTxt.color = "#fff";
		this.levelTxt.bold = true; //粗体
        this.levelTxt.pos(this.king.x + 50,140);
		this.addChild(this.levelTxt);

        //食物数
        this.smallFood = new Laya.Sprite;
        this.smallFood.loadImage("res/img/food.png");
        this.smallFood.scale(0.4,0.4);
        this.smallFood.pos(Laya.stage.width - 120, 20);
        this.addChild(this.smallFood);

        this.foodTxt = new Laya.Text();
		this.foodTxt.text = "0";
		this.foodTxt.fontSize = 40;
		this.foodTxt.font = "Microsoft YaHei";
		this.foodTxt.color = "#fff";
		this.foodTxt.bold = true; //粗体
        this.foodTxt.pos(this.smallFood.x+50,10);
		this.addChild(this.foodTxt);


        //gameover
        this.gameoverTxt = new Laya.Text();
		this.gameoverTxt.text = "Game Over !\n点击继续游戏";
		this.gameoverTxt.fontSize = 90;
		this.gameoverTxt.font = "Microsoft YaHei";
		this.gameoverTxt.color = "#7babb4";
		this.gameoverTxt.bold = true; //粗体
		this.gameoverTxt.x = (Laya.stage.width - this.gameoverTxt.textWidth)/2;
		this.gameoverTxt.y = Laya.stage.height/2 -100;
        this.gameoverTxt.visible = false;
		this.addChild(this.gameoverTxt);
    }
}
}