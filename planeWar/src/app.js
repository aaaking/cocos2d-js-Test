var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
    background1:null,
    background2:null,
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
        cc.spriteFrameCache.addSpriteFrames(res.s_ShootBackgroundList, res.s_ShootBackground);
        this.background1 = cc.Sprite.create("#background.png");
        this.background1.setAnchorPoint(0, 0);
        this.background1.setScaleX(size.width / this.background1.getContentSize().width);
        this.background1.setScaleY(size.height / this.background1.getContentSize().height);
        this.addChild(this.background1);
        this.background2 = cc.Sprite.create("#background.png");
        this.background2.setAnchorPoint(0, 0);
        this.background2.setScaleX(size.width / this.background2.getContentSize().width);
        this.background2.setScaleY(size.height / this.background2.getContentSize().height);
        this.addChild(this.background1);
        //飞机
        this.planeLayer = new PlaneLayer();
        this.addChild(this.planeLayer);
        //子弹
        this.bulletLayer = new BulletLayer(this.planeLayer.getChildByTag(AIRPLANE));
        this.bulletLayer.startShoot();
        this.addChild(this.bulletLayer);
    }
});

