var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function () {
        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg);
    }
});