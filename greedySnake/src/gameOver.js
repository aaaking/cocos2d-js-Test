var GameOverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
    }
});

var GameOverLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        var bg = new cc.LayerGradient(cc.color(0, 0, 0, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg);
        var deleteLabel = new cc.LabelTTF("GameOver", "", 40);
        deleteLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(deleteLabel);
    }
});