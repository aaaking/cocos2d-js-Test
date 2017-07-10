AVATAR_MOVE_DUR = 0.5
var HAND_CARD_POS = cc.p(0, -20)

var SelfPlayerView = PlayerView.extend({
    ctor:function (p) {
        this._super(p);
        this.goldPos = cc.p(0, 65);
        this.nicknamePos = cc.p(0, -65);
        this.initView(p)
    },
    initView:function(p){
        this.setAvatarWithUrl(p.avatar);
        this.setGoldView(p.gold);
        this.setNicknameView(p.nickname);
    },
    foldAnim : function() {

        this.darkCard();

        var foldCards = new HandCardsView()
        this.addChild(foldCards);
        foldCards.setPosition(HAND_CARD_POS);

        var cards = foldCards.updateCards(this.handCardsView.getCards());

        for (var k in cards) {
            var arr = this.handcardPosAndRotation(parseInt(k) + 1);
            var pos = arr[0], rotation = arr[1];
            cards[k].setPosition(pos);
            cards[k].setRotation(rotation);
            foldCards.addChild(cards[k]);
            cards[k].setOpacity(125);
            cards[k].show();
        }
        //console.info(foldCards);
        var fadeout = foldCards.fadeOutAction(PlayerView.FOLD_CARDS_T);
        var move = cc.moveBy(PlayerView.FOLD_CARDS_T, this.dealCardsPos);
        var scale = cc.scaleTo(PlayerView.FOLD_CARDS_T, 0.5);
        //console.info(fadeout);
        var spawn = cc.spawn(fadeout, move, scale);
        foldCards.runAction(spawn);
        // this.hideTimer();
    }
});




SelfPlayerView.prototype.initHandCardsView =function() {
    this.handCardsView.stopAllActions();
    this.handCardsView.removeAllCards();
    this.handCardsView.setPosition(HAND_CARD_POS);
}

SelfPlayerView.prototype.updateHandCardsPos = function() {
    this.handCardsView.setPosition(HAND_CARD_POS);
}

SelfPlayerView.prototype.handcardPosAndRotation = function( i ) {
    var coff = i * 2 - 3;
    var pos = cc.p(coff * 35, 0);
    var rotation = coff * 5;
    return [pos,rotation]
}

SelfPlayerView.prototype.setHandCardsView = function(cards) {
    var cardViews = this.handCardsView.updateCards(cards)
    for (var k  in cardViews) {
        var arr = this.handcardPosAndRotation(parseInt(k)+1);
        var pos = arr[0], rotation = arr[1];
        cardViews[k].setPosition(pos);
        cardViews[k].setRotation(rotation);
        this.handCardsView.addChild(cardViews[k]);
    }
}

SelfPlayerView.prototype.dealCards = function(cardid, index, anim) {
    var view = this.handCardsView;
    var arr = this.handcardPosAndRotation(parseInt(index)+1);
    var pos = arr[0], rotation = arr[1];
    var card = view.addCards(cardid);
    this.handCardsView.addChild(card);

    if (anim) {
        card.setOpacity(0);
        card.setScale(0.25);
        card.setPosition(this.dealCardsPos);

        var move = (cc.moveTo(PlayerView.DEAL_CARDS_T, pos).easing(cc.easeIn(2)));
        var opac = card.fadeInAction(PlayerView.DEAL_CARDS_T);
        var scale = cc.scaleTo(PlayerView.DEAL_CARDS_T, 1.0);
        var spawn = cc.spawn(move, opac, scale)
        var delay1 = cc.delayTime(0.2);
        var flip = card.flipAction();
        var rot = cc.rotateBy(0.2, rotation);

        card.runAction(cc.sequence(spawn, delay1, flip, rot));
    }
    else {
        card.setRotation(rotation);
        card.setPosition(cc.p(pos.x, pos.y));
        card.show();
    }

}

SelfPlayerView.prototype.onShowCardListener = function( listener ) {
    this.showCardsListener = listener;
}

SelfPlayerView.prototype.findShowCard = function( card ) {
    this.showCards = this.showCards || {};
    for(var k in this.showCards) {
        if (this.showCards[k] == card) {
            return k;
        }
    }
}

SelfPlayerView.prototype.changeShowCards = function( cardView, card ) {
    var i = this.findShowCard(card);
    if (i) {
        this.showCards.remove(i);
        cardView.removeShowFlag();
    }
    else {
        this.showCards.push(card);
        cardView.addShowFlag();
    }

    if (this.showCardsListener) {
        this.showCardsListener();
    }
}

SelfPlayerView.prototype.removeShowFlag = function(i) {
    var cardViews = this.handCardsView.getCardViews();

    if (cardViews) {
        var cardView = cardViews[i];
        if (cardView) {
            cardView.removeShowFlag();

            var i = this.findShowCard(cardView.card);
            if (i) {
                this.showCards.remove(i);
            }
        }
    }
}

SelfPlayerView.prototype.darkCard = function() {
    var cardViews = this.handCardsView.getCardViews();
    for (var k in cardViews) {
        cardViews[k].dark(100);
    }
}



SelfPlayerView.prototype.avatarMove = function(anim) {
    this.avatar.stopAllActions();
    if (anim) {
        this.avatar.runAction(cc.moveTo(AVATAR_MOVE_DUR, cc.p(-275, -75)));
    } else {
        this.avatar.setPosition(cc.p(-275, -75));
    }
    //if (app.gameMode == 1 || app.gameMode == 3) {
    //    this.updateRanking(this.ranking)
    //}
}

SelfPlayerView.prototype.avatarBack = function() {
    this.avatar.stopAllActions();
    this.avatar.runAction(cc.moveTo(AVATAR_MOVE_DUR, cc.p(0, 0)));
}

SelfPlayerView.prototype.updateRanking = function(ranking) {
    ranking = ranking || 1;
    this.ranking = this.ranking || 0;
    if (ranking == this.ranking) return;
    this.ranking = ranking;

    if (this.rankingImg) {
        this.rankingImg.removeFromParent();
        this.rankingImg = null;
    }

    var img;
    if (ranking > 0 && ranking <= 3) {
        img = "match_me_rank_" + ranking + ".png";
    } else {
        img = "match_me_rank_4.png";
    }

    this.rankingImg = cc.Sprite.create(img);
    this.rankingImg.setPosition(-5, 75);
    this.avatar.addChild(this.rankingImg);
    String.prototype.format=function(args){
        if(arguments.length>0){
            var result=this;
            if(arguments.length==1&&typeof(args)=="object"){
                for(var key in args){
                    var reg=new RegExp("({"+key+"})","g");
                    result=result.replace(reg, args[key]);
                }
            }
            else{
                for(var i=0;i<arguments.length;i++){
                    if(arguments[i]==undefined){
                        return "";
                    }
                    else{
                        var reg=new RegExp ("({["+i+"]})","g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
            return result;
        }
        else{
            return this;
        }
    }
    var text = localizedStrings.getString("RankingStr");
    var label = new cc.LabelTTF(text.format({ranking:ranking}), "Arial", 20);
    this.rankingImg.addChild(label);

    if (ranking <= 3) {
        label.setPosition(75, 24);
        label.setAnchorPoint(cc.p(0, 0));
    } else {
        this.rankingImg.setPosition(0, 75);
        label.setPosition(56, 18);
        label.setAnchorPoint(cc.p(0, 0));
    }
}
