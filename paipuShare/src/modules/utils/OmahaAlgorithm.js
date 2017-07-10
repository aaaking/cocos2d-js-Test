/**
 * Created by Administrator on 2016/6/17.
 */

var OmahaAlgorithm = {}

var typeCards_cnt = [0, 2, 4, 3, 5, 5, 5, 4, 5, 5]

var compCard = function( a, b ) {
    if (a.rank == b.rank) {
        return 0
    } else if (a.rank > b.rank) {
        return 2
    } else if (a.rank < b.rank) {
        return 1
    }
}


var compCards = function( a, b ) {
    if (a.type == b.type) {
        for (var i = 0; i < a.typeCards.length; i++) {
            if (compCard(a.typeCards[i], b.typeCards[i]) == 1) {
                return 1
            } else if (compCard(a.typeCards[i], b.typeCards[i]) == 2) {
                return 2
            }
        }
        return 0
    } else if (a.type < b.type) {
        return 1
    } else if (a.type > b.type) {
        return 2
    }
}

var compLowCard = function(a,b) {

    if (a.rank == 14) {
        a.rank = 1
    }
    if (!b)  return 1;
    if (b.rank == 14) {
        b.rank = 1
    }
    if (a.rank == b.rank) {
        return 0
    } else if (a.rank > b.rank) {
        return 2
    } else if (a.rank < b.rank) {
        return 1
    }
}

var compLowCards = function(a,b) {

    if (a.typeCards.length > b.typeCards.length)  return 1
    if (a.typeCards.length < b.typeCards.length) return 2
    for (var i = 0; i < a.typeCards.lenght; i++) {
        if (compLowCard(a.typeCards[i], b.typeCards[i]) == 1) {
            return 1
        } else if (compLowCard(a.typeCards[i], b.typeCards[i]) == 2) {
            return 2
        }
    }
    return 0
}

var sortLowRank = function(cards) {
    var compRank = function(a, b) {
        return a.rank < b.rank
    }
    cards.sort(compRank)
}

var sortWithRank = function( cards ) {
    var compRank = function (a, b) {
        return a.rank > b.rank
    }
    cards.sort(compRank)
}

var sortWithSuit = function( cards ) {
    var compSuit = function (a, b) {
        if (a.suit == b.suit) {
            return a.rank > b.rank;
        } else {
            return a.suit > b.suit;
        }
    }
    cards.sort(compSuit);
}




var copyLowCards = function(cards) {
    var copied = []
    for (var k in cards) {
        var v = cards[k]
        if (v.rank < 9 || v.rank == 14) {
            copied.push(v)
        }
    }
    return copied
}

var copyTable = function( table ) {
    var copied = []
    for (var k in table) {
        copied[k] = table[k]
    }
    return copied
}

// --同样大小的牌组
var  sameRankCards = function( cards, sameNo ) {
    if (cards.length < sameNo) {
        return [false];
    }
    var copied = copyTable(cards);
    var i = 1;
    for (var k = 1; k < cards.length; k++) {
        if (cards[k].rank == cards[k - 1].rank) {
            i = i + 1;
            if (i == sameNo) {
                var tempCards = [];
                for (var i = 1; i < sameNo; i++) {
                    tempCards[i] = copied.splice(k - sameNo + 1, 1);
                }
                return [true, tempCards, copied]
            }
        }else {
            i = 1;
        }
    }
    return [false];
}


// --高牌
var highCard = function (cards) {
    var copied = copyTable(cards);
    return [copied.splice(copied, 1), copied];
}

// --一对
var pair = function (cards) {
    return sameRankCards(cards, 2);
}


// --两对
var twoPair = function (cards) {
    var isPair, pairCards, restCards1 = pair(cards);
    if (isPair) {
        var nextPair, nextPairCards, restCards2 = pair(restCards1);
        if (nextPair) {
            for (var i = 0; i < 2; i++) {
                pairCards[pairCards.length] = nextPairCards[i];
            }
            return [true, pairCards, restCards2];
        }
    }
    return [false];
}

// -- 三条
var three = function (cards) {
    return sameRankCards(cards, 3);
}

// -- 顺子
var straight = function (cards) {
    var length = 5

    if (cards.length < length) {
        return [false];
    }

// --不同大小的卡牌
    var oCards = new Array();
    var k = 0;
    oCards[k] = cards[k];
    for (var i = 1; i < cards.length; i++) {
        if (oCards[k].rank != cards[i].rank) {
            k = k + 1;
            oCards[k] = cards[i];
        }
    }

// --是否是顺子
    if (oCards.length < length) {
        return [false];
    }
    k = 1;
    for (var i = 1; i < oCards; i++) {
        if (oCards[i - 1].rank == (oCards[i].rank + 1)) {
            k = k + 1;
            if (k == length) {
                var tempCards = [];
                for (var n = 0; n < length; n++) {
                    tempCards[n] = oCards[i - length + n];
                }
                return [true, tempCards];
            }
        } else {
            k = 1
        }
    }
// --是否是“5”、“4”、“3”、“2”、“1”
    var tempCards = [];

    var a = 0;
    var len = oCards.length;
    for (var i = 0; i < 5; i++) {
        var k = (i + len - 5) % len;
        a = a * 100 + oCards[k].rank;
        tempCards[i] = oCards[k];
    }
    if (a == 504030214) {
        return [true, tempCards]
    }
    return [false];
}

// -- 同花
var flush = function (cards) {
    if (cards.length < 5) {
        return [false];
    }

    var copied = copyTable(cards);
    var i = 1;
    var sameNo = 5;
    var flushEnd = cards.length;

    for (var k = 1; k < cards.length; k++) {
        if (cards[k].suit == cards[k - 1].suit) {
            i = i + 1;
        } else {
// --返回所有同花的卡牌， 不只5张
            if (k > 2) {
                flushEnd = k - 1;
                break;
            }
            i = 1;
        }
    }

    if (i >= sameNo) {
        var tempCards = [];
        for (var n = 0; n < i; n++) {
            tempCards[n] = copied.splice(flushEnd - i + 1, 1);
        }
        sortWithRank(tempCards);

        return [true, tempCards]
    }
    return [false]
}

// -- 葫芦
var fullHouse = function (cards) {
    if (cards.length < 5) {
        return [false]
    }

    var isThree, threeCards, restCards1 = three(cards);
    if (isThree) {
        var isPair, pairCards, restCards2 = pair(restCards1);

        if (isPair) {
            for (var i = 0; i < 2; i++) {
                threeCards[threeCards.length] = pairCards[i];
            }
            return [true, threeCards, restCards2];
        }
    }
}


// -- 四条
var four = function (cards) {
    return sameRankCards(cards, 4);
}

// -- 同花顺
var straightFlush = function (cards) {
    if (cards.length < 5) {
        return [false]
    }

    var flush, flushCards = flush(cards);
    if (flush) {
        var straight, straightCards, royal = straight(flushCards)
        if (straight) {
            return [true, straightCards, royal]
        }
    }
    return [false]
}

// -- 皇家同花顺
var royalStraightFlush = function (cards) {
    if (cards.length < 5) {
        return [false]
    }
    var sf, sfCards, royal = straightFlush(cards);
    if (sf && royal) {
        return [true, sfCards]
    }

    return [false]
}

var royalWithSF = function (cards) {
    var a = 0;
    for (var i = 0; i < 5; i++) {
        a = a * 100 + cards[i].rank;
    }
    if (a == 1413121110) {
        return [true, cards]
    }
    return [false]
}

var insertRestCards = function (cards, restCards, maxCardsNo) {
    var restNo = maxCardsNo - cards.length;
    if (restNo > restCards.length) {
        restNo = restCards.length;
    }
    var card;
    for (var i = 0; i < restNo; i++) {
        var info = highCard(restCards);
        card = info[0];
        restCards = info[1];
        cards.push(card);
    }
}

var removeOverCards = function (cards, max_cnt) {
    var tempCards = [];
    for (var i = 0; i < max_cnt; i++) {
        tempCards.push(cards[i]);
    }

    return tempCards
}

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
var typeOfCards = function (cards) {
    var rankedCards = copyTable(cards);
    sortWithRank(rankedCards);
    var suitedCards = copyTable(rankedCards);
    sortWithSuit(suitedCards);

    var typeCards = [];
    var restCards = [];
    var result = false;
    var maxCardsNo = 5;
    var result, typeCards, restCards
    var info = flush(suitedCards);
    result = info[0];
    if (info[1]) typeCards = info[1];
    if (info[2]) restCards = info[2];
    if (result) {
        var result, typeCards1, restCards1
        var info = straight(typeCards);
        result = info[0];
        if (info[1]) typeCards1 = info[1];
        if (info[2]) restCards1 = info[2];
        if (result) {
            var result, typeCards2, restCards2
            var info  = royalWithSF(typeCards1);
            result = info[0];
            if (info[1]) typeCards2 = info[1];
            if (info[2]) restCards2 = info[2];
            if (result) {
                return [10, typeCards2]
            }

            return [9 , typeCards1]
        }
        return [6, removeOverCards(typeCards, maxCardsNo)]
    }

    info = straight(rankedCards);
    result = info[0];
    if (info[1]) typeCards = info[1];
    if (info[2]) restCards = info[2];
    if (result) {
        return [5, typeCards]
    }

    info = four(rankedCards);
    result = info[0];
    if (info[1]) typeCards = info[1];
    if (info[2]) restCards = info[2];
    if (result) {
        insertRestCards(typeCards, restCards, maxCardsNo);
        return [8, typeCards]
    }

    info = three(rankedCards);
    result = info[0];
    if (info[1]) typeCards = info[1];
    if (info[2]) restCards = info[2];
    if (result) {
        var result, typeCards1, restCards1
        var info = pair(restCards);
        result = info[0];
        if (info[1]) typeCards1 = info[1];
        if (info[2]) restCards1 = info[2];
        if (result) {
            insertRestCards(typeCards, typeCards1, maxCardsNo);
            return [7, typeCards]
        }

        insertRestCards(typeCards, restCards, maxCardsNo);
        return [4, typeCards]
    }

    info = pair(rankedCards);
    result = info[0];
    if (info[1]) typeCards = info[1];
    if (info[2]) restCards = info[2];
    if (result) {
        var result, typeCards1, restCards1
        var info = pair(restCards);
        result = info[0];
        if (info[1]) typeCards1 = info[1];
        if (info[2]) restCards1 = info[2];
        if (result) {
            insertRestCards(typeCards, typeCards1, maxCardsNo);
            insertRestCards(typeCards, restCards1, maxCardsNo);
            return [3, typeCards]
        }

        insertRestCards(typeCards, restCards, maxCardsNo);
        return [2, typeCards]
    }

    typeCards = [];
    insertRestCards(typeCards, rankedCards, maxCardsNo);
    return [1, typeCards]
}


var lowOfCards = function(cards) {
    var rankCards = copyLowCards(cards);

    var cardType, typeCards;
    var info = typeOfCards(rankCards);
    if (cardType == 1 || cardType == 5 || cardType == 6) {
        return [1, typeCards]
    } else {
        return [0, []]
    }
}

var changeCardsToNumber = function (cards) {
    var tempCards = [];
    for (var k in cards) {
        var v = cards[k];
        tempCards[k] = (v.rank - 1) * 4 + v.suit;
    }
    return tempCards
}

var changeCardToRankAndSuit = function (card) {
    var t = {};
    t.rank = Math.floor((card - 1) / 4 + 1);
    t.suit = Math.floor((card - 1) % 4 + 1);
    return t
}

var changeCardsToRankAndSuit = function (cards) {
    var tempCards = [];
    for (var k in cards) {
        var v = cards[k];
        var card = changeCardToRankAndSuit(v);
        tempCards[k] = card;
    }
    return tempCards
}

var combinePoolAndHandCard = function (poolCards, handcard) {
    var cards = [];
    for (var i in poolCards) {
        var v = poolCards[i];
        cards[cards.length] = v;
    }
    for (var i in handcard) {
        var v = handcard[i];
        cards[cards.length] = v;
    }
    return cards
}

var getMaxCards = function(handCode,baseCard) {
    var cards = changeCardsToRankAndSuit(handCode)
    var card = {};

    var info = typeOfCards(cards)
    card.type = info[0];
    card.typeCards = info[1];
    if (baseCard.type == 0) {
        return card
    }

    if (compCards(card, baseCard) == 2) {
        return card
    }
    return baseCard
}

var getMinCards = function(handCode,baseCard) {
    var cards = changeCardsToRankAndSuit(handCode)
    var card = {}
    var info = lowOfCards(cards)
    card.type = info[0];
    card.typeCards = info[1];
    if (baseCard.type == 0) {
        return card
    }
    if (compLowCards(card, baseCard) == 1) {
        return card
    }
    return baseCard
}

 OmahaAlgorithm.typeAndCards = function( handcard, poolCards, showlow ) {
     var showlow = showlow || 0;

     var baseCard = {};
     baseCard.type = 0;
     baseCard.typeCards = [];

     var gameMode = app.gameMode
     for (i = 0; i < handcard.length - 1; i++) {
         for (j = i + 1; j < handcard.length; j++) {
             var handCode = [];
             if (poolCards.length == 0) {
                 handCode = [];
                 handCode.push(handcard[i]);
                 handCode.push(handcard[j]);
                 if (showlow == 0) {
                     baseCard = getMaxCards(handCode, baseCard)
                 } else {
                     baseCard = getMinCards(handCode, baseCard)
                 }
             } else if (poolCards.length == 3) {
                 handCode = [];
                 handCode.push(handcard[i]);
                 handCode.push(handcard[j]);
                 for (var c = 0; c < 3; c++) {
                     handCode.push(poolCards[c])
                 }
                 if (showlow == 0) {
                     baseCard = getMaxCards(handCode, baseCard)
                 } else {
                     baseCard = getMinCards(handCode, baseCard)
                 }
             } else if (poolCards.length == 4) {
                 for (var k = 0; k < 4; k++) {
                     handCode = [];
                     handCode.push(handcard[i]);
                     handCode.push(handcard[j]);
                     for (var c = 1; c < 4; c++) {
                         if (c != k) {
                             handCode.push(poolCards[c]);
                         }
                     }
                     if (showlow == 0) {
                         baseCard = getMaxCards(handCode, baseCard)
                     } else {
                         baseCard = getMinCards(handCode, baseCard)
                     }
                 }
             } else if (poolCards.length == 5) {
                 for (var k = 0; k < 3; k++) {
                     for (var l = k + 1; l < 4; l++) {
                         for (var m = l + 1; m < 5; m++) {
                             handCode = [];
                             handCode.push(handcard[i]);
                             handCode.push(handcard[j]);
                             handCode.push(poolCards[k]);
                             handCode.push(poolCards[l]);
                             handCode.push(poolCards[m]);
                             if (showlow == 0) {
                                 baseCard = getMaxCards(handCode, baseCard)
                             } else {
                                 baseCard = getMinCards(handCode, baseCard)
                             }
                         }
                     }
                 }
             }

         }
     }
     var numCards = changeCardsToNumber(baseCard.typeCards)
     if (showlow == 1 && numCards.length == 5) {
         return [baseCard.type, numCards, 5]
     }
     return [baseCard.type, numCards, typeCards_cnt[baseCard.type]]
 }

