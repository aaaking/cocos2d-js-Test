/**
 * Created by Administrator on 14-2-27.
 */
var BulletLayer = cc.Layer.extend({
    planeSprite: null,
    bulletFactor: 1,
    bulletBatchNode: null,
    allBullets: [],

    ctor: function (planeSprite) {
        this._super();
        this.planeSprite = planeSprite;
        this.init();
        return true;
    },

    init: function () {
        var texture = cc.textureCache.getTextureForKey(res.s_shoot);
        this.bulletBatchNode = cc.SpriteBatchNode.createWithTexture(texture);
        this.addChild(this.bulletBatchNode);
    },
    startShoot: function (delay) {
        this.schedule(this.addBullet, 0.25 * this.bulletFactor, cc.REPEAT_FOREVER, delay);
    },
    stopShoot: function () {
        this.unschedule(this.addBullet);
    },
    addBullet: function () {
        // var bullet = cc.Sprite.createWithSpriteFrameName("bullet1.png");
        var bullet = cc.Sprite.create("#bullet1.png");
        this.bulletBatchNode.addChild(bullet);
        this.allBullets.push(bullet);
        // bullet.setScale(planeSprite.getContentSize().height/bullet.getContentSize().height)
        var bulletPosition = new cc.Point(this.planeSprite.getPositionX(), this.planeSprite.getPositionY() + this.planeSprite.getContentSize().height / 2);
        bullet.setPosition(bulletPosition);
        var length = cc.director.getWinSize().height + bullet.getContentSize().height / 2 - bullet.getPositionY();
        var realMoveDuration = length / (320 / 1);
        var actionMove = cc.MoveTo.create(realMoveDuration, cc.p(bullet.getPositionX(), cc.director.getWinSize().height + bullet.getContentSize().height / 2));
        var actionDone = cc.CallFunc.create(this.bulletMoveDone, this, bullet);
        var seqAction = cc.Sequence.create(actionMove, actionDone);
        bullet.runAction(seqAction);
    },
    bulletMoveDone: function (bullet) {
        cc.arrayRemoveObject(this.allBullets, bullet);
        this.bulletBatchNode.removeChild(bullet, true);

    },
    removeBullet: function (bullet) {
        this.bulletMoveDone(bullet);
    },


    EOF: function () {
    }
});