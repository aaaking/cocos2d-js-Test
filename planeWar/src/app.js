
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
    background1: null,
    background2: null,
    planeLayer: null,
    bulletLayer: null,
    enemyLayer: null,
    controlLayer: null,
    bgPosY: 0,
    bgHeight: 0,
    score: 0,
    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function () {
        // this.setTouchEnabled(true);
        // this.setMouseEnabled(true);
        // this.setKeyboardEnabled(true);
        var size = cc.winSize;
        var deleteLayer = new cc.LayerColor(cc.color(100, 200, 100, 255), size.width, size.height);

        var deleteLabel = new cc.LabelTTF("Hello", "Arial", 60);
        deleteLabel.fillStyle = cc.color.GREEN;
        deleteLabel.setAnchorPoint(0, 0);
        deleteLabel.setPosition(size.width / 2, size.height / 2);
        deleteLayer.addChild(deleteLabel);

        this.addChild(deleteLayer, 0);
    }
});

