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
        var deleteColor = new cc.LayerColor(cc.color(255, 255, 0, 100), size.width, size.height);
        //飞机
        this.planeLayer = new PlaneLayer();
        deleteColor.addChild(this.planeLayer);
        this.addChild(deleteColor);
        //子弹
        this.bulletLayer = new BulletLayer(this.planeLayer.getChildByTag(AIRPLANE));
        this.bulletLayer.startShoot();
        deleteColor.addChild(this.bulletLayer);
    }
});

