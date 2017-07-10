// var algorithm = require "app.utils.TexasAlgorithm"
// --[[
//     10：	皇家同花顺
// 9：	同花顺
// 8：	四条
// 7：	葫芦
// 6:	同花
// 5:	顺子
// 4:	三条
// 3:	两队
// 2:	一对
// 1:	高牌
// --]]
var types = [localizedStrings.getString("HighCard_1"),
    localizedStrings.getString("OnePair_1"),
    localizedStrings.getString("TwoPair_1"),
    localizedStrings.getString("Three_1"),
    localizedStrings.getString("Straight_1"),
    localizedStrings.getString("Flush_1"),
    localizedStrings.getString("FullHouse_1"),
    localizedStrings.getString("Four_1"),
    localizedStrings.getString("StraightFlush_1"),
    localizedStrings.getString("RoyalStraightFlush")];

var CardTypeView = cc.Node.extend({
    ctor:function(){
        this._super();
        this.initUI();
    },
    initUI:function(){
        this.bg = cc.Sprite.create("res/card_type.png")
        this.addChild(this.bg);

        this.label =new cc.LabelTTF("","Arial",24);
        this.label.setColor(cc.color(51,77,101));
        this.label.setAnchorPoint(cc.p(0.5,0.5));
        this.label.setPosition(0,0);
        this.addChild(this.label);
    },
    updateType : function( handcard, poolCards ) {
        handcard = handcard || new Array();
        poolCards = poolCards || new Array();
        var type, cards, cnt
        var info = algorithm.typeAndCards(handcard, poolCards);
        type = info[0];
        cards = info[1];
        cnt = info[2];
        //if (!type){
        //    this.label.setString("");
        //}else {
            this.label.setString(types[type]);
        //}
        return [cards, cnt]
    },
    setCardType : function(text) {
        this.label.setString(text.toString());
    },
    setBg : function(bg) {
        var texture = cc.textureCache.addImage(bg)
        this.bg.setTexture(texture);
    },
    getHeight : function() {
        return this.bg.getContentSize().height;
    }
});

