
var CardsManager = cc.Node.extend({
    ctor : function(){
        this._super();
        this.cards = new Array();
        this.cardViews = new Array();
    },
    updateCards : function(cards) {
        this.removeAllCards();

        if (!cards) {
            return;
        }

        return this.addCards(cards);
    },

    removeAllCards : function() {
        var cardViews = this.cardViews;
        this.cardViews = new Array();
        this.cards = new Array();

        for (var k in cardViews) {
            var v = cardViews[k];
            v.stopAllActions();
            v.removeFromParent();
        }

        return cardViews
    },

    addCards : function(cards) {
        var newCards = new Array();
        var cardView;

        if (cards && typeof(cards) == "object") {
            for (var k in cards) {
                cardView = new CardView(cards[k]);

                this.cards.push(cards[k]);
                this.cardViews.push(cardView);
                newCards.push(cardView);
            }
        } else {
            cards = cards || 0;
            newCards = new CardView(cards);

            this.cards.push(cards);
            this.cardViews.push(newCards);

        }
        return newCards
    },
    highLightCard : function( k ) {
        var card = this.cardViews[k];
        if (card) {
            card.highLight();
        }
    },

    normalCard : function( k ) {
        var card = this.cardViews[k];
        if (card) {
            card.normal();
        }
    },

    darkCard : function( k ) {
        var card = this.cardViews[k];
        if (card) {
            card.dark(125);
        }
    },

    changeLightWithCards : function(cards, cnt) {
        if (!cards) {
            return
        }

        this.cards = this.cards || {};

        for (var i in this.cards) {
            var c = this.cards[i];
            this.darkCard(i);
            for (var k in cards) {
                var v = cards[k];
                if (v == c) {
                    if (k <= cnt) {
                        this.highLightCard(i);
                    } else {
                        this.normalCard(i);
                    }
                    break;
                }
            }
        }
    },

    cardsCnt : function() {
        return this.cardViews.length;
    },

    getCardViews : function() {
        return this.cardViews;
    },

    getCards : function() {
        return this.cards;
    }
});

// function CardsManager:ctor()
// CardsManager.super.ctor(self, "CardsManager")
// this.cards = {}
// this.cardViews = {}
// end



// CardsManager.prototype.exportMethods = function(){
//     this.exportMethods_({
//     "updateCards",
//     "removeAllCards",
//     "addCards",
//     "highLightCard",
//     "normalCard",
//     "darkCard",
//     "changeLightWithCards",
//     "getCardViews",
//     "getCards",
//     "cardsCnt",
// })
// return this.target_
// end

