var GameOverScene = cc.Scene.extend({
    ctor: function (score) {
      this._super();
        this.score = score;
    },
    onEnter: function () {
        this._super();
        var layer = new GameOverLayer(this.score);
        this.addChild(layer);
    }
});

var GameOverLayer = cc.Layer.extend({
    score: 0,
    highScore: 0,
    ctor: function (score) {
        this._super();
        this.score = score;
        this.highScore = cc.sys.localStorage["highScoreSnake"] || 0;
        this.init();
    },
    init: function () {
        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg);
        var scoreLabel = new cc.LabelTTF("" + this.score, "", 60);
        scoreLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        scoreLabel.runAction(cc.sequence(cc.DelayTime.create(0.5), cc.scaleTo(0.2, 2), cc.scaleTo(0.2, 0.5), cc.scaleTo(0.2, 1)));
        this.addChild(scoreLabel);
        //最高分
        var highScoreLabel = new cc.LabelTTF("最高分", "", 45);
        highScoreLabel.setPosition(highScoreLabel.width / 2 + 10, cc.winSize.height - highScoreLabel.height / 2 - 10);
        this.addChild(highScoreLabel);
        var highScoreNum = new cc.LabelTTF("" + this.highScore, "", 45);
        highScoreNum.setPosition(highScoreLabel.width + highScoreNum.width / 2 + 15, highScoreLabel.getPositionY());
        this.addChild(highScoreNum);
        //刷新最高分
        if (this.score > this.highScore) {
            cc.sys.localStorage.setItem("highScoreSnake", this.score);
            var delay = cc.DelayTime.create(1);
            var moveOut = cc.MoveBy.create(0.1, cc.p(0, 100));//第二个参数表示deltaPosition偏移量
            var changeScore = cc.CallFunc.create(function (caller, data) {
                highScoreNum.setString(data);
                highScoreNum.setPositionX(highScoreLabel.width + highScoreNum.width / 2 + 15);
            }, this, this.score);
            var moveIn = cc.MoveBy.create(0.1, cc.p(0, -100));
            var actSeq = cc.Sequence.create(delay, moveOut, changeScore, moveIn);
            highScoreNum.runAction(actSeq);
        }
        //返回
        var backLabel = new cc. MenuItemFont("返回", function () {
            cc.director.runScene(new cc.TransitionFade(1, new HelloWorldScene()));
        }, this);
        backLabel.setFontSize(45);
        var backMenu = new cc.Menu(backLabel);
        backMenu.setPosition(cc.winSize.width - backLabel.width / 2 - 25, backLabel.height + 10);
        this.addChild(backMenu)
    }
});