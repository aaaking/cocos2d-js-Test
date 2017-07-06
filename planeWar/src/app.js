var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
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
        // this.setKeyboardEnabled(true);//We have delete these three functions from layer in v3.0.
        var size = cc.winSize;
        this.planeLayer = new PlaneLayer();
        this.addChild(this.planeLayer);
    }
});

