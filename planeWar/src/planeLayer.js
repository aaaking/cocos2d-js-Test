/**
 * Created by Administrator on 14-2-26.
 */

var AIRPLANE = 0x10001;
var PlaneLayer = cc.Layer.extend({

    isAlive: true,

    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function () {
        var deletePlane = new cc.LabelTTF("Plane", "Arial", 60);
        deletePlane.fillStyle = cc.color.RED;
        deletePlane.setPosition(200, 200);
        this.addChild(deletePlane);
    },
    blowUp: function () {
        this.isAlive = false;
        var animation = cc.Animation.create();
        animation.setDelayPerUnit(0.2);
        animation.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("hero_blowup_n1.png"));
        animation.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("hero_blowup_n2.png"));
        animation.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("hero_blowup_n3.png"));
        animation.addSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("hero_blowup_n4.png"));

        var animate = cc.Animate.create(animation);
        var removePlane = cc.CallFunc.create(this.removePlane, this);
        var actSeq = cc.Sequence.create(animate, removePlane);

        this.getChildByTag(AIRPLANE).stopAllActions();
        this.getChildByTag(AIRPLANE).runAction(actSeq);
    },
    removePlane: function () {
        this.removeChildByTag(AIRPLANE)

        var gameOverScene = new GameOverScene();
        gameOverScene.init();
        var hiScore = sys.localStorage["highScore"] || 0;
        gameOverScene.setScore(this.getParent().score, hiScore);
        var tras = cc.TransitionMoveInL.create(0.8, gameOverScene);
        cc.Director.getInstance().replaceScene(tras);
    },

    EOF: function () {
    }
});
