class Bird extends Laya.Sprite{
    private birdAni:Laya.Animation;
    
    constructor(){
        super();
        this.init();
    }

    init():void{
        // 创建动画模板
        Laya.Animation.createFrames(["bug/bug1.png","bug/bug2.png"],"bug");
        this.birdAni = new Laya.Animation();
        // this.birdAni.x = 60;
        // this.birdAni.y = -76;
        this.birdAni.interval = 480;
        this.addChild(this.birdAni);  
        //播放动画   
        this.birdAni.play(0,true,"bug"); 
    }
    
}