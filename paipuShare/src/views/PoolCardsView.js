

var SPACE = 89
var MOVE_TIME = 0.17
var MAX_CARDS_NUM = 5
var PoolCardsView = CardsManager.extend({
    ctor:function(){
        this._super();
        for (var i = 1; i <= MAX_CARDS_NUM; i++) {
            var posX = SPACE * (i - Math.ceil(MAX_CARDS_NUM * 0.5));
            var cardsFrame = cc.Sprite.create("res/pool_cards_frame.png");
            cardsFrame.setPosition(posX, 0);
            this.addChild(cardsFrame);
        }
    }
});



// function PoolCardsView.ctor()
// {
//     cc(self)
// :
//     addComponent("app.modules.CardsManager.CardsManager")
// :
//     exportMethods()
//
//     for (var i = 1; i < MAX_CARDS_NUM; i++) {
//         var posX = SPACE * (i - math.ceil(MAX_CARDS_NUM * 0.5));
//         var cardsFrame = cc.Sprite.create("pool_cards_frame.png", posX, 0)
//         cardsFrame.setPosition(cc.p(posX, 0));
//         this.addChild(cardsFrame);
//     }
// }

PoolCardsView.prototype.addCardsAnim = function( cards, delay, callback ) {
    var len = cards.length;
    var had_cards = this.getCardViews();
    var cnt = had_cards.length - len;
    for (var i = 0; i < len; i++) {
        (function (idx) {
            var card = cards[idx];
            card.cover();

            var beganX = SPACE * Math.ceil(cnt - MAX_CARDS_NUM * 0.5);
            card.setPosition(cc.p(beganX, 0));
            this.addChild(card);
            card.setVisible(false);

            var duration = idx  * MOVE_TIME;
            var totalTime = (len - 1) * MOVE_TIME;
            var posX = SPACE * (cnt + idx + 1 - Math.ceil(MAX_CARDS_NUM * 0.5));
            var move = cc.moveTo(duration, cc.p(posX, 0));
            var delayAct = cc.delayTime(totalTime - duration);
            var flip = card.flipAction();
            var callF = cc.callFunc(function(){});
            if (idx == (len - 1) && callback) {
                callF = cc.callFunc(callback.bind(this));
            }
            var callF1 = cc.callFunc(function () {
                card.setVisible(true);
            }.bind(this));

            var delayAct1 = cc.delayTime(delay);
            card.runAction(cc.sequence(callF1, move, delayAct, flip, delayAct1, callF));

        }).bind(this)(i);
        // var card = cards[i];
        // card.cover();
        //
        // var beganX = SPACE * Math.ceil(cnt - MAX_CARDS_NUM * 0.5);
        // card.setPosition(cc.p(beganX, 0))
        // this.addChild(card);
        // card.setVisible(false);
        //
        // var duration = (i - 1) * MOVE_TIME;
        // var totalTime = (len - 1) * MOVE_TIME;
        // var posX = SPACE * (cnt + i - Math.ceil(MAX_CARDS_NUM * 0.5));
        // var move = cc.moveTo(duration, cc.p(posX, 0));
        // var delayAct = cc.delayTime(totalTime - duration);
        // var flip = card.flipAction();
        // var callF = cc.callFunc(function(){});
        // if (i == len && callback) {
        //     callF = cc.callFunc(callback.bind);
        // }
        // var callF1 = cc.callFunc(function () {
        //     card.setVisible(true);
        // }.bind(this))
        //
        // var delayAct1 = cc.delayTime(delay);
        //
        // card.runAction(cc.sequence(callF1, move, delayAct, flip, delayAct1, callF));
    }
};

PoolCardsView.prototype.updatePoolCards = function(cards, callback) {
    var cardViews = this.updateCards(cards);

    for (var k in cardViews) {
        var posX = SPACE * (parseInt(k)+parseInt(1) - Math.ceil(MAX_CARDS_NUM * 0.5));
        var v = cardViews[k];
        v.setPosition(posX, 0)
        this.addChild(v);
        v.show();
    }
};

PoolCardsView.prototype.addPoolCards = function( cards, callback) {

    var len = cards.length;
    var added_cards = new Array();
    var delay = 1;

    var callF = function () {
        this.addPoolCards(cards, callback);
    }.bind(this)

    if (len == 0) {
        if (callback) {
            callback();
        }
    }
    else if (cards.length >= 3) {
        for (var i = 0; i < 3; i++) {
            added_cards.push(cards.splice(0, 1));
        }

        var cardViews = this.addCards(added_cards);
        this.addCardsAnim(cardViews, delay, callF);

    } else if (cards.length < 3) {
        var added_cards = [];
        added_cards.push(cards.splice(0, 1));

        var cardViews = this.addCards(added_cards);
        this.addCardsAnim(cardViews, delay, callF);
    }

    delay = 1
};

PoolCardsView.prototype.playInsureAnim = function( cnt, anim_name, callback ) {
    var sp = ccs.csLoader.createNode("res/"+anim_name);
    var cardViews = this.getCardViews();
    var card = cardViews[cnt-1];
    sp.setPosition(cc.p(0, 80));
    card.addChild(sp);

    var action = ccs.load("res/"+anim_name);
    sp.runAction(action.action);

    action.action.gotoFrameAndPlay(0, 40, false);

    this.scheduleOnce(function () {
        sp.stopAllActions();
        sp.removeFromParent();
        if (callback) {
            callback();
        }

    }.bind(this), 2)
};
