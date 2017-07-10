// --[[
// suit:
// 	1: 	heart
// 	2:	diamond
// 	3:	club
// 	4:	spade
// --]]
var HIGH_LIGHT_ZORDER = 1
var self
var resPath = "res/card/"
var CardView = cc.Node.extend({
    ctor:function(card,show){
        this._super();
        self = this;
       this.back = cc.Sprite.create("#bg.png");
       this.addChild(this.back);
        back = this.back;
        if (!card || card < 5 || card > 56) {
            return
        }
        this.initFront(card);
       
        this.setUIWithShow(show);
    },
    initFront:function(card){
        if (!card || card < 5 || card > 56) {
            return
        }
        this.card = card;
        var rank 	= Math.floor((card - 1) / 4 + 1);
        var suit 	= (card - 1) % 4 + 1;
        var color = Math.floor((suit - 1) / 2 + 1);

        var fgImg
        if (rank > 10 && rank < 14) {
            fgImg = "#rank_fg_"+rank+".png";
        }else {
            fgImg = "#fg.png";
        }

        this.front = cc.Sprite.create(fgImg);
        this.addChild(this.front);

        var rankImg 	= "#rank" + color + "_" + rank + ".png";
        var suitImg1 	= "#suit1_" + suit + ".png";
        var suitImg2	= "#suit2_" + suit + ".png";

        var rankSprite = cc.Sprite.create(rankImg);
        var smallSuit = cc.Sprite.create(suitImg1);
        var bigSuit = cc.Sprite.create(suitImg2);

        bigSuit.setPosition(54, 36);
        // this.back.addChild(bigSuit);
        this.front.addChild(bigSuit);
        rankSprite.setPosition(21, 100);
        // this.back.addChild(rankSprite);
        this.front.addChild(rankSprite);
        smallSuit.setPosition(21, 74);
        // this.back.addChild(smallSuit);
        this.front.addChild(smallSuit);
    }
});


CardView.prototype.flipAction = function() {
    // this.changeVisible();
    var action = cc.rotateBy(0.1, cc.math.vec3(0, 90, 0));
    var actionA = cc.targetedAction(this.front, action);
    var actionB = cc.targetedAction(this.back, action.clone());
    var spawn = cc.spawn(actionA, actionB);
    var callF = cc.callFunc(function(){this.changeVisible()}.bind(this));
    return cc.sequence(spawn,callF, spawn.clone());

};

CardView.prototype.fadeInAction = function(d) {
    var action = new Array();
    var children = this.getChildren();
    for (var k in children) {
        var v = children[k];
        var fadeIn = cc.targetedAction(v, cc.fadeIn(d));
        action.push(fadeIn);
    }

    if (this.front) {
        var frontC = this.front.getChildren();
        for (var k in frontC) {
            var v = frontC[k];
            var fadeIn = cc.targetedAction(v, cc.fadeIn(d));
            action.push(fadeIn);
        }
    }
    return cc.spawn(action);
};

CardView.prototype.fadeOutAction = function(d) {
    var action = new Array();
    var children = this.getChildren();
    for (var k in children) {
        var v = children[k];
        var fadeOut = cc.targetedAction(v, cc.fadeOut(d));
        action.push(fadeOut);
    }

    if (this.front) {
        var frontC = this.front.getChildren();
        for (var k in frontC) {
            var v = frontC[k];
            var fadeOut = cc.targetedAction(v, cc.fadeOut(d));
            action.push(fadeOut);
        }
    }
    return cc.spawn(action);
};

CardView.prototype.changeVisible = function() {
    this.isShow = !this.isShow;
    this.front.setVisible(this.isShow);
    this.back.setVisible(!this.isShow);
}

CardView.prototype.show = function() {
    if (this.isShow || !this.front) {
        return
    }
    this.frontX = -this.frontX;
    this.changeVisible();
    this.front.setScaleX(this.frontX);
    this.back.setScaleX(-this.frontX);
}

CardView.prototype.cover = function() {
    if (!this.isShow) {
        return
    }

    this.frontX = -this.frontX;
    this.front.setScaleX(this.frontX);
    this.back.setScaleX(-this.frontX);
    this.changeVisible();
}

CardView.prototype.setUIWithShow = function( show ) {
    this.frontX = -1;
    if (show) {
        this.frontX = 1;
    }

    this.isShow = show;
    this.back.setVisible(!show);
    this.back.setScaleX(-this.frontX);
    this.front.setVisible(show);
    // this.front.setScaleX(this.frontX);
};

CardView.prototype.setOpacity = function(opacity) {
    var children = this.getAllChildren();
    for (var k in children) {
        var v = children[k];
        v.setOpacity(opacity);
    }
};

CardView.prototype.getAllChildren = function() {
    var subViews = new Array();
    var children = this.getChildren();
    for (var k  in children) {
        subViews.push(children[k]);
    }

    if (this.front) {
        var frontC = this.front.getChildren();
        for (var k in frontC) {
            subViews.push(frontC[k]);
        }
    }

    return subViews
};

CardView.prototype.highLight = function() {
    var children = this.getAllChildren();
    for (var k in children) {
        children[k].setColor(cc.color(255, 255, 255));
    }

    if (!this.highLightFrame) {
        this.highLightFrame = cc.Sprite.create( "#high_light.png");
        this.highLightFrame.setAnchorPoint(cc.p(0, 0));
        this.highLightFrame.setPosition(cc.p(0, 0));
        this.front.addChild(this.highLightFrame, HIGH_LIGHT_ZORDER);
    }

    this.highLightFrame.setVisible(true);
};

CardView.prototype.normal = function() {
    var children = this.getAllChildren();
    for (var k in children) {
        children[k].setColor(cc.color(255, 255, 255));
    }

    if (this.highLightFrame) {
        this.highLightFrame.setVisible(false);
    }
};

CardView.prototype.dark = function(n) {
    var children = this.getAllChildren();
    for (var k in children) {
        children[k].setColor(cc.color(n, n, n));
    }

    if (this.highLightFrame) {
        this.highLightFrame.setVisible(false);
    }
};

CardView.prototype.getContentSize = function(){
    return this.back.getContentSize();
};

CardView.prototype.addShowFlag = function() {
    if (!this.front) {
        return;
    }

    this.showFlag = cc.Sprite.create("res/show_card_flag.png");
    var width = this.showFlag.getContentSize().width;
    var height = this.showFlag.getContentSize().height;

    this.showFlag.setPosition(width / 2 + 5, height / 2 + 5);
    this.front.addChild(this.showFlag);

    var color = this.front.getColor();
    this.showFlag.setColor(color);

};

CardView.prototype.removeShowFlag = function() {
    if (!this.showFlag) {
        return;
    }
    this.showFlag.removeFromParent();
    this.showFlag = null;
};
