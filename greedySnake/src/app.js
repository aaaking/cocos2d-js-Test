var MainLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;

        var layerGradient = new cc.LayerGradient(cc.color.RED, new cc.Color(255, 0, 0, 0), cc.p(0, -1),
            [{p: 0, color: cc.color.RED},
                {p: .5, color: new cc.Color(0, 0, 0, 0)},
                {p: 1, color: cc.color.RED}]);

        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg);
        // this.addChild(layerGradient);
        var helloLabel = new cc.LabelTTF("GreedySnake", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);
        var start = new cc.MenuItemFont("StartGame", function () {
            cc.director.runScene(new cc.TransitionFade(0.8, new GameScene()));//TransitionMoveInL  TransitionCrossFade
        }, this);
        start.setFontSize(60);
        var menu = new cc.Menu(start);
        this.addChild(menu);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

