var CardSprite = cc.Layer.extend({
    number:0,
    labelCardNumber:null,
    cardColorBG:null,
    ctor:function(){
        this._super();
    },
    initCard:function(num, width, height, positionX, positionY) {
        // this.setAnchorPoint(0, 0);//这个可以注释掉，默认有这个效果的
        this.number = num;
        this.cardColorBG = new cc.LayerColor(new cc.color(200, 190, 180, 255), width-15, height-15);
        this.cardColorBG.setPosition(positionX, positionY);

        if(this.number > 0){
            this.labelCardNumber = new cc.LabelTTF(this.number,"Arial", 60);
            this.labelCardNumber.setPosition(this.cardColorBG.getContentSize().width/2, this.cardColorBG.getContentSize().height/2);
            this.labelCardNumber.setTag(8);
            this.cardColorBG.addChild(this.labelCardNumber);
        }else{
            this.labelCardNumber = new cc.LabelTTF(" ","Arial", 60);
            this.labelCardNumber.setPosition(this.cardColorBG.getContentSize().width/2, this.cardColorBG.getContentSize().height/2);
            this.labelCardNumber.setTag(8);
            this.cardColorBG.addChild(this.labelCardNumber);
        }
        this.addChild(this.cardColorBG);
    },
    getNumber:function(){
        return this.number;
    },
    setNumber:function(num){
        this.number = num;
        if(this.number > 0){
            this.labelCardNumber.setString(this.number);
        }else{
            this.labelCardNumber.setString("");
        }
        // 设置数字大小
        if(num >= 0){
            this.labelCardNumber.setFontSize(60);
        }
        if(num >= 16){
            this.labelCardNumber.setFontSize(55);
        }
        if(num >= 128){
            this.labelCardNumber.setFontSize(40);
        }
        if(num >= 1024){
            this.labelCardNumber.setFontSize(30)
        }
        //判断数字的大小来调整颜色
        if(this.number == 0){
            this.cardColorBG.setColor(new cc.color(200,190,180));
        }
        if (this.number == 2) {
            this.cardColorBG.setColor(new cc.color(240,230,220));
        }
        if (this.number == 4) {
            this.cardColorBG.setColor(new cc.color(240,220,200));
        }
        if (this.number == 8) {
            this.cardColorBG.setColor(new cc.color(240,180,120));
        }
        if (this.number == 16) {
            this.cardColorBG.setColor(new cc.color(240,140,90));
        }
        if (this.number == 32) {
            this.cardColorBG.setColor(new cc.color(240,120,90));
        }
        if (this.number == 64) {
            this.cardColorBG.setColor(new cc.color(240,90,60));
        }
        if (this.number == 128) {
            this.cardColorBG.setColor(new cc.color(240,90,60));
        }
        if (this.number == 256) {
            this.cardColorBG.setColor(new cc.color(240,200,70));
        }
        if (this.number == 512) {
            this.cardColorBG.setColor(new cc.color(240,200,70));
        }
        if (this.number == 1024) {
            this.cardColorBG.setColor(new cc.color(0,130,0));
        }
        if (this.number == 2048) {
            this.cardColorBG.setColor(new cc.color(0,130,0));
        }
    }
});

// 静态函数
CardSprite.createCardSprite = function(num, width, height, positionX, positionY)
{
    var card = new CardSprite();
    if(card){
        card.initCard(num, width, height, positionX, positionY);
        return card;
    }
    return null;
}