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
        var size = cc.director.getWinSize();
        cc.spriteFrameCache.addSpriteFrames(res.s_ShootList, res.s_shoot);
        var plane = cc.Sprite.create("#hero1.png");
        plane.setPosition(size.width / 2, plane.getContentSize().height / 2);
        plane.attr = PlanCfg.newPlane();
        this.addChild(plane, 0, AIRPLANE);
        //动画
        var blink = cc.Blink.create(1, 3);
        var animation =  cc.Animation.create();
        animation.setDelayPerUnit(0.1);
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero1.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero2.png"));
        var animate = cc.Animate.create(animation);
        plane.runAction(blink);
        plane.runAction(cc.RepeatForever.create(animate));
    },
    blowUp: function () {
        this.isAlive = false;
        var animation = cc.Animation.create();
        animation.setDelayPerUnit(0.2);
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n1.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n2.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n3.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("hero_blowup_n4.png"));
        var animate = cc.Animate.create(animation);
        var removePlane = cc.CallFunc.create(this.removePlane, this);
        var actSeq = cc.Sequence.create(animate, removePlane);
        this.getChildByTag(AIRPLANE).stopAllActions();
        this.getChildByTag(AIRPLANE).runAction(actSeq);
    },
    removePlane: function () {
        this.removeChildByTag(AIRPLANE);
        var gameOverScene = new GameOverScene();
        gameOverScene.init();
        var hiScore = cc.sys.localStorage["highScore"] || 0;
        gameOverScene.setScore(this.getParent().score, hiScore);
        var tras = cc.TransitionMoveInL.create(0.8, gameOverScene);
        cc.director.runScene(tras);
    },

    EOF: function () {
    }
});
