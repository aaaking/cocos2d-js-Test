
var PotViewsManager = cc.Node.extend({
    ctor:function () {
        this._super();
        this.potViews = new Array();
    }
});


var  get_pot_pos = function( k, n ) {
    var line_num = Math.ceil(k / 3);
    // 行数
    var row_num = Math.floor((k - 1) % 3 + 1);
    //列数
    var total = n - (line_num - 1) * 3;
    //这一行总的个数
    if (total > 3) {
        total = 3;
    }

    var posX = (1 - total + (row_num - 1) * 2) * 80;
    var posY = (line_num - 1) * 80;

    return posX, posY
}

var  find_self_seatid = function( seatid, poolbet ) {
    for (var k in poolbet.seatids) {
        var v = poolbet.seatids[k];
        if (seatid == v) {
            return true;
        }
    }
    return false;
}



PotViewsManager.prototype.updatePots = function( pots, realtimePot ){
var lastCnt = this.potViews.length;

if (lastCnt > pots.length) {
    this.removeAllPot();
}

for (var k in pots) {
    var v = pots[k];
    if (v.bet && v.bet > 0) {
        var potView = this.potViews[k];
        if (!potView) {
            var lastPotView = this.potViews[lastCnt];
            var posX, posY, scale
            if (!lastPotView) {
                posX = 0
                posY = 0
            } else {
                posX = lastPotView.getPositionX();
                posY = lastPotView.getPositionY();
            }
            var potView = new PotView(v.bet)
            potView.setPosition(cc.p(posX, posY));
            this.addChild(potView);
            this.potViews[k] = potView;
        } else {
            var bet = potView.getUIBet();
            if (bet != v.bet) {
                potView.updateBet(v.bet);
            }
        }
    } else
        {
            var potView = this.potViews[k];
            if (potView) {
                potView.removeFromParent();
                this.potViews[k] = null;
            }
        }
    }
    if (lastCnt != this.potViews.length) {
        this.updatePos();
    }
    this.changePotState(pots);
    this.updateRealTimePot(realtimePot);
};

PotViewsManager.prototype.changePotState = function(pots) {
    if (this.potViews.length < 2) {
        return
    }

    for (var k in pots) {
        var v = pots[k];
        if (find_self_seatid(app.userInfo.seatid, v)) {
            this.potViews[k].highLightState();
        } else {
            this.potViews[k].normalState();
        }
    }
};

PotViewsManager.prototype.updatePos = function() {
    var n = this.potViews.length;

    var scale = 1;
    if (n > 1) {
        scale = 0.5
    }

    for (var k in this.potViews) {
        var v = this.potViews[k];
        if (k != n) {
            v.changeIconColor(PotView.ICON_YELLOW);
        } else {
            v.changeIconColor(PotView.ICON_RED);
        }

        var posX, posY = get_pot_pos(k, n);
        v.runAction(cc.scaleTo(cc.p(0.3, scale)));
        v.runAction(cc.moveTo(0.3, cc.p(posX, posY)));
    }
};

PotViewsManager.prototype.removeAllPot = function() {
    for (var k in this.potViews) {
        var v = this.potViews[k];
        v.removeFromParent();
        this.potViews[k] = null;
    }

    if (this.rtLabel) {
        this.rtLabel.removeFromParent();
        this.rtLabel = null;
    }
};

PotViewsManager.prototype.updateRealTimePot = function( bet ) {
    if (bet && bet > 0) {
        if (!this.rtLabel) {
            this.rtLabel = new cc.LabelTTF("底池：" + bet, "Arial", 30);
            this.rtLabel.setColor(cc.color(130, 188, 237));
            this.rtLabel.setAnchorPoint(cc.p(0.5, 0.5));
            this.rtLabel.setPosition(cc.p(0, -50));
            this.addChild(this.rtLabel);
        } else {
            this.rtLabel.setString("底池：" + bet);
        }
    }
};
