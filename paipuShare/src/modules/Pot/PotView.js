var PotView = cc.Node.extend({
    ctor:function (bet) {
        this._super();
        this.bet_ = bet;
        this.initUI(bet);
        this.state = PotView.STATE_NORMAL;
    }
})


PotView.ICON_YELLOW = 1
PotView.ICON_RED = 2

PotView.STATE_NORMAL = 1
PotView.STATE_HIGHLIGHT = 2

// PotView.prototype.ctor = function( bet ) {
//     this._super();
//     this.bet_ = bet;
//     this.initUI(bet);
//     this.state = PotView.STATE_NORMAL;
// }

PotView.prototype.initUI = function( bet ) {
    this.bg = cc.Sprite.create("res/poolbet_bg.png");
    this.addChild(this.bg);
    this.chipsIcon = cc.Sprite.create("res/poolbet_chips_red.png");
    this.chipsIcon.setPosition(cc.p(32, 25));
    this.bg.addChild(this.chipsIcon);
    this.betLabel = new cc.LabelTTF(dzglobal.formatNumberStr(bet), "Arial", 30);
    this.betLabel.setAnchorPoint(cc.p(0.5, 0.5));
    this.betLabel.setPosition(cc.p(158, 26));
    this.bg.addChild(this.betLabel);
};

PotView.prototype.updateBet = function( bet ) {
    this.bet_ = bet;
    this.betLabel.setString(dzglobal.formatNumberStr(bet));
};

PotView.prototype.getUIBet = function() {
    return self.bet_;
};

PotView.prototype.changeIconColor = function( color ) {
    if (color == PotView.ICON_YELLOW) {
        var texture = cc.textureCache.addImage("res/poolbet_chips_yellow.png");
        this.chipsIcon.setTexture(texture);
    } else if (color == PotView.ICON_RED) {
        var texture = cc.textureCache.addImage("res/poolbet_chips_red.png")
        this.chipsIcon.setTexture(texture);
    }
};

PotView.prototype.highLightState = function () {
    if (this.state == PotView.STATE_HIGHLIGHT) {
        return
    }
    if (!this.highLight) {
        this.highLight = cc.Sprite.create("res/poolbet_high_light.png");
        this.addChild(this.highLight);
        this.highLight.setPosition(cc.p(0, 3));
    } else {
        this.highLight.setVisible(true);
    }
    this.state = PotView.STATE_HIGHLIGHT;
};

PotView.prototype.normalState = function() {
    if (this.state == PotView.STATE_NORMAL) {
        return;
    }
    if (!self.highLight) {
        return
    }
    this.highLight.setVisible(false);
    this.state = PotView.STATE_NORMAL;
};

