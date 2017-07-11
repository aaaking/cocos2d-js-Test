

var SeatView = cc.Node.extend({
    ctor:function(seatid) {
        this._super();
        this.seatid = seatid;
        this.textures = {};
        var texture = cc.textureCache.addImage("res/sitdown.png");
        this.textures[SIT_DOWM] = texture;
        texture = cc.textureCache.addImage("res/seat_empty.png");
        this.textures[EMPTY] = texture;

        this.view = new cc.Sprite("res/seat_empty.png");
        this.addChild(this.view);
        return true;
    }
});

var SIT_DOWM = 1
var EMPTY = 2

 SeatView.prototype.changeToSitdown=function () {
     this.view.setTexture(this.textures[SIT_DOWM]);
     this.touchable = true;
 };


 SeatView.prototype.changeToEmptySeat = function () {
     this.view.setTexture(this.textures[EMPTY]);
     this.touchable = false;
 };



