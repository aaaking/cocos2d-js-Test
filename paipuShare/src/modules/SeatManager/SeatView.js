var SeatView = cc.Node.extend({
    ctor: function (seatid) {
        this._super();
        this.seatid = seatid;
        this.textures = {};
        var texture = cc.textureCache.addImage("res/avatar_male.png");
        this.textures[SIT_MALE] = texture;

        var texture = cc.textureCache.addImage("res/avatar_female.png");
        this.textures[SIT_FEMALE] = texture;

        texture = cc.textureCache.addImage("res/seat_empty.png");
        this.textures[EMPTY] = texture;

        this.view = new cc.Sprite("res/seat_empty.png");
        this.addChild(this.view);
        return true;
    }
});

var SIT_MALE = 1;
var SIT_FEMALE = 2;
var EMPTY = 3;

SeatView.prototype.changeToSitdownMale = function () {
    this.view.setTexture(this.textures[SIT_MALE]);
    this.touchable = true;
};

SeatView.prototype.changeToSitdownFemale = function () {
    this.view.setTexture(this.textures[SIT_FEMALE]);
    this.touchable = true;
};

SeatView.prototype.changeToEmpty = function () {
    this.view.setTexture(this.textures[EMPTY]);
    this.touchable = false;
};



