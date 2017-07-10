

var CARD_WIDTH = 88
var SPACE = 2
var initPosition = cc.p(display.cx, display.cy + 100)

var HandCardsView = CardsManager.extend({
    ctor:function(){
        this._super();
    }
})


HandCardsView.prototype.setCardsFront = function( cards ) {
    var cardViews = this.getCardViews();
    for (var k in cardViews) {
        var v = cardViews[k];
        var card = cards[k];
        var show = v.isShow

        v.initFront(card);
        v.setUIWithShow(show);
    }
    return cardViews
}

HandCardsView.prototype.fadeOutAction = function(d) {
    var cardViews = this.getCardViews();
    var action = [];
    for (var k in cardViews) {
        var v = cardViews[k];
        action.push(v.fadeOutAction(d));
    }
    return cc.spawn(action);
}

HandCardsView.prototype.FadeInAction = function( d ) {
    var cardViews = this.getCardViews();
    var action = [];
    for (var k in cardViews) {
        var v = cardViews[k];
        action.push(v.fadeInAction(d));
    }
    return cc.spawn(action);
}

HandCardsView.prototype.flipAllCards = function( callback ) {
    var cardViews = this.getCardViews();
    for (var i = 0; i < cardViews.length; i++) {
        var card = cardViews[i];
        var callF;
        if (callback && i == cardViews.length) {
            callF = cc.callFunc(callback)
        }
        var seq = cc.sequence(card.flipAction(), callF);
        card.runAction(seq);
    }
}

HandCardsView.prototype.setCardsOpacity = function( opac ) {
    var cardViews = this.getCardViews()
    for (var k in cardViews) {
        var v = cardViews[k];
        v:setOpacity(opac);
    }
}

HandCardsView.prototype.setCardsScale = function( scale ) {
    var cardViews = this.getCardViews();
    for (var k in cardViews) {
        var v = cardViews[k];
        v.setScale(scale);
    }
}

HandCardsView.prototype.showAllCards = function( callback ) {
    var cardViews = this.getCardViews();
    var hasCalled;
    for (var i = 0; i < 2; i++) {
        var cardView = cardViews[i];

        if (cardView && cardView.front && !cardView.isShow) {
            var callF;
            if (callback && !hasCalled) {
                callF = cc.callFunc(callback)
                hasCalled = true
            }
            cardView.runAction(cc.sequence([cardView.flipAction(), callF]));
        }
    }

    if (!hasCalled) {
        callback();
    }
}







