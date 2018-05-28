class Flyball extends Laya.Sprite{
    // private flyball:Laya.Animation;
    private flyball:Laya.Sprite;

    constructor(){
        super();
        this.init();
    }

    init():void{
        var terminalX: number = 200;

        var flyball: Laya.Sprite = this.createFlyball("res/img/flyball.png");
        // flyball.pivot(46.5, 50);
        flyball.y = 100   
        this.graphics.drawLine(terminalX, 0, terminalX, Laya.stage.height, "#FFFFFF") 
        // flyball使用Tween.to缓动
        Laya.Tween.to(flyball, { x: terminalX }, 1000);
    }

    createFlyball(skin: string): Laya.Sprite {
        var character: Laya.Sprite = new Laya.Sprite();
        character.loadImage(skin);
        this.addChild(character);
        return character;
    }
}