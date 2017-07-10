
var HAND_CARD_SCALE = 0.25
var SEAT_RADIUS = 47
var self
var OtherPlayerView = PlayerView.extend({
    ctor:function(p){
        this._super(p);
        self = this;
        this.goldPos = cc.p(0, -65);
        this.nicknamePos = cc.p(0, 65);
        this.initView(p);
    },
    initView:function (p) {
         this.setAvatarWithUrl(p.avatar);
        this.setGoldView(p.gold);
        this.setNicknameView(p.nickname);
    }
})



OtherPlayerView.prototype.initHandCardsView = function(pos) {
    this.handCardsView.stopAllActions();
    this.handCardsView.removeAllCards();
    this.handCardsView.setPosition(pos);

    this.showing_hand_cards = null;
}

OtherPlayerView.prototype.updateHandCardsPos = function(pos) {
    this.handCardsView.runAction(cc.moveTo(0.5, pos));
}

OtherPlayerView.prototype.handcardPosAndRotation = function( i ) {
    var coff = i * 2 - 3;
    var pos = cc.p(coff*5, 0);
    var rotation = coff * 15;
    // console.info(pos);
    return [pos,rotation]
}

OtherPlayerView.prototype.dealCards = function(cardid, index, anim) {
    var view = this.handCardsView;
    var arr = this.handcardPosAndRotation(parseInt(index)+1);
    // console.info(arr);
    var pos = arr[0], rotation = arr[1];
    // console.info(pos);
    var card = view.addCards(cardid);

    if (cardid) {
        view.setPosition(cc.p(0, 0));
        card.setPosition(cc.p(25 * (2 * index - 1), 0));
        card.setScale(0.7);
        card.show();
    } else {
        card.setScale(HAND_CARD_SCALE);
        card.setRotation(rotation);
        if (anim) {
            card.setPosition(this.dealCardsPos);
            card.setOpacity(0);

            var move = cc.moveBy(PlayerView.DEAL_CARDS_T, pos).easing(cc.easeIn(2));
            var opac = card.fadeInAction(PlayerView.DEAL_CARDS_T);
            var spawn = cc.spawn(move, opac)
            card.runAction(cc.sequence(spawn));
        }
        else {
        }
        // console.info(pos);
        card.setPosition(pos.x, pos.y);
    }
    this.handCardsView.addChild(card);
}


OtherPlayerView.prototype.foldAnim = function() {

    var view = this.handCardsView;

    var move = cc.moveTo(PlayerView.FOLD_CARDS_T, self.dealCardsPos);
    var fade = view.fadeOutAction(PlayerView.FOLD_CARDS_T);
    var spawn = cc.spawn(move, fade);
    var callF = cc.callFunc(function () {
        view.removeAllCards();
    }.bind(this))
    return view.runAction(cc.sequence(spawn, callF));
}

OtherPlayerView.prototype.showHandCards = function( cards, callback ) {
    var view = this.handCardsView;
    var cards = view.setCardsFront(cards);
    var duration = 0.3;

    if (!this.showing_hand_cards) {
        this.showing_hand_cards = true;

        //for (var k in cards) {
            var view1 = cards[0];
            var coff = 1;
            //view1.setRotation(0);
            //view1.setScale(0.7);
            //view1.setPosition(-25,0);
            var rot = cc.rotateBy(duration, coff * 15);
            var move = cc.moveTo(duration, cc.p(-25 * coff, 0));
            var scale = cc.scaleTo(duration, 0.7);
            view1.runAction(rot);
            view1.runAction(move);
            view1.runAction(scale);
         var view2 = cards[1];
        //view2.setRotation(0);
        //view2.setScale(0.7);
        //view2.setPosition(25,0);
         coff = -1;
         rot = cc.rotateBy(duration, coff * 15);
         move = cc.moveTo(duration, cc.p(-25 * coff, 0));
         scale = cc.scaleTo(duration, 0.7);
        view2.runAction(rot);
        view2.runAction(move);
        view2.runAction(scale);
        //}
        var move = cc.moveTo(duration, cc.p(0, 0));
        var callF = cc.callFunc(function () {
            view.showAllCards(callback);
        }.bind(this))

        view.runAction(cc.sequence(move, callF));
    } else {
        view.showAllCards(callback);
    }
}

