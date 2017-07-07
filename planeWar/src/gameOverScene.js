/**
 * Created by Administrator on 14-3-4.
 */
var GameOverScene = cc.Scene.extend({

    score: 0,
    hiScore: 0,

    onEnter: function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
        layer.init(this.score, this.hiScore);
    },

    setScore: function (score, hiscore) {
        this.score = score;
        this.hiScore = hiscore;
    }
});

var GameOverLayer = cc.Layer.extend({

    scoreItem: null,
    hiScoreItem: null,
    backItem: null,

    init: function (score, hiScore) {
        this._super();
        var winSize = cc.director.getWinSize();
        var backgroud = cc.Sprite.create("#gameover.png");
        backgroud.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        backgroud.setScale(gameScale);
        this.addChild(backgroud);

        var norBack = cc.Sprite.create("#btn_finish.png");
        var pressBack = cc.Sprite.createWithSpriteFrameName("#btn_finish.png");

        this.backItem = cc.MenuItemSprite.create(norBack, pressBack, null, this.backToGame, this);
        //pauseItem.initWithNormalSprite();
        this.backItem.setPosition(cc.p(winSize.width - norBack.getContentSize().width / 2 - 10 - gameMarginX, norBack.getContentSize().height / 2 + 10 + gameMarginY));
        var menuBack = cc.Menu.create(this.backItem);
        menuBack.setPosition(cc.p(0, 0));
        this.addChild(menuBack);

        this.scoreItem = cc.LabelBMFont.create(score, "font/font.fnt");
        this.scoreItem.setColor(cc.color(143, 146, 147, 255));
        this.scoreItem.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(this.scoreItem);

        this.hiScoreItem = cc.LabelBMFont.create(hiScore, "font/font.fnt");
        this.hiScoreItem.setColor(cc.color(143, 146, 147, 255));
        this.hiScoreItem.setAnchorPoint(cc.p(0, 0.5));
        this.hiScoreItem.setPosition(cc.p(150 * gameScale + gameMarginX, winSize.height - 54 * gameScale - gameMarginY));
        this.addChild(this.hiScoreItem);

        var delay = cc.DelayTime.create(0.5);
        var scaleOut = cc.ScaleBy.create(0.5, 2);
        var scaleIn = cc.ScaleBy.create(0.5, 0.75);
        var actSeq = cc.Sequence.create(delay, scaleOut, scaleIn);
        this.scoreItem.runAction(actSeq);
        if (score > hiScore) {
            cc.sys.localStorage.setItem("highScore", score);
            var delay = cc.DelayTime.create(1.3);
            var moveOut = cc.MoveBy.create(0.1, cc.p(0, 100));//第二个参数表示deltaPosition偏移量
            var changeScore = cc.CallFunc.create(function (caller, data) {
                this.hiScoreItem.setString(data)
            }, this, score);
            var moveIn = cc.MoveBy.create(0.1, cc.p(0, -100));
            var actSeq = cc.Sequence.create(delay, moveOut, changeScore, moveIn);
            this.hiScoreItem.runAction(actSeq);
        }

    },
    backToGame: function () {
        var gameScene = new HelloWorldScene();
        var tras = cc.TransitionCrossFade.create(0.8, gameScene);
        cc.director.runScene(tras);
    },

    EOF: function () {
    }
});