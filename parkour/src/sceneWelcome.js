var WelcomeScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        var layer = new WelcomeLayer();
        this.addChild(layer);
    }
});

var WelcomeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        return true;
    },
    onEnter: function () {
        this._super();
        var winsize = cc.director.getWinSize();
        // var spritebg = new cc.Sprite(res.menu.bg);
        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        bg.attr({
            anchorX: 0,
            anchorY: 0,
            width: winsize.width,
            height: winsize.height
        });
        this.addChild(bg);

        cc.MenuItemFont.setFontSize(60);

        this.welcome = new cc.LabelTTF("欢迎您，" + cc.sys.localStorage.getItem("username"), "Arial", 60);
        this.welcome.setColor(cc.color(255, 255, 255));//white color
        this.welcome.setPosition(cc.p(140, winsize.height - 50));
        this.welcome.setScale(0.5);
        this.addChild(this.welcome, 10);

        //setting btn
        var setBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.setting),
            new cc.Sprite(res.setting),
            this.onSet, this));
        setBtn.setPosition(cc.p(winsize.width + 21, this.welcome.getPositionY()));//设置按钮图片的宽高都是42像素
        this.addChild(setBtn, 1);
        var actionTo = cc.MoveTo.create(2, cc.p(winsize.width - 21 - 40, this.welcome.getPositionY())).easing(cc.easeElasticOut());
        var seq = cc.Sequence.create(
            actionTo,
            cc.CallFunc.create(function (setBtn) {
                var shaking = cc.MoveTo.create(2, cc.p(winsize.width - 21 - 40 - 5, this.getPositionY())).easing(cc.easeBackInOut());
                var shakingBack = cc.MoveTo.create(2, cc.p(winsize.width - 21 - 40 + 5, this.getPositionY())).easing(cc.easeBackInOut());
                var shakingSeq = cc.Sequence.create(cc.DelayTime.create(0.3), shaking, shakingBack);
                setBtn.runAction(shakingSeq.repeatForever());
            }, setBtn));
        setBtn.runAction(seq);

        //exit button
        this.exitBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.back), // normal state image
            new cc.Sprite(res.back), // select state image
            function () {
                cc.director.end();
            }, this));
        this.exitBtn.setPosition(60, 60);
        this.exitBtn.attr({
            width: 72,
            height: 72
        });
        this.addChild(this.exitBtn);

        // play btn
        var playBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.play), // normal state image
            new cc.Sprite(res.play), // select state image
            this.onPlay, this));
        var playBtnPosX = winsize.width / 2, playBtnPosY = winsize.height / 2 - 200;
        playBtn.setPosition(cc.p(playBtnPosX, playBtnPosY));
        this.addChild(playBtn);
        var seq = cc.Sequence.create(
            // cc.MoveTo.create(2, cc.p(playBtnPosX, playBtnPosY)).easing(cc.easeElasticInOut(0.8)),
            cc.CallFunc.create(function (playBtn) {
                var shaking = cc.MoveTo.create(1, cc.p(playBtnPosX, playBtnPosY)).easing(cc.easeIn(2.0));
                var shakingBack = cc.MoveTo.create(1, cc.p(playBtnPosX, playBtnPosY - 10)).easing(cc.easeOut(2.0));
                var shakingSeq = cc.Sequence.create(shaking, shakingBack);
                var shakingSeq = cc.Sequence.create(shaking, shakingBack);
                playBtn.runAction(shakingSeq.repeatForever());
            }, playBtn));
        playBtn.runAction(seq);

        //storeBtn
        var storeBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.icon_rank),
            new cc.Sprite(res.icon_rank),
            this.onStore, this));
        storeBtn.setPosition(cc.p(winsize.width + 200, winsize.height - 220));
        this.addChild(storeBtn);
        var actionTo = cc.MoveTo.create(2, cc.p(winsize.width - 200, winsize.height - 220)).easing(cc.easeElasticOut());
        var seq = cc.Sequence.create(
            actionTo,
            cc.CallFunc.create(function (storeBtn) {
                var shaking = cc.MoveTo.create(2, cc.p(winsize.width - 205, winsize.height - 220)).easing(cc.easeBackInOut());
                var shakingBack = cc.MoveTo.create(2, cc.p(winsize.width - 195, winsize.height - 220)).easing(cc.easeBackInOut());
                var shakingSeq = cc.Sequence.create(shaking, shakingBack);
                storeBtn.runAction(shakingSeq.repeatForever());
            }, storeBtn));
        storeBtn.runAction(seq);

        //aboutBtn
        var aboutBtn = new cc.Menu(new cc.MenuItemSprite(
            new cc.Sprite(res.about),
            new cc.Sprite(res.about),
            this.onAbout, this));
        aboutBtn.setPosition(cc.p(winsize.width - 200, winsize.height + 100));
        this.addChild(aboutBtn, 1);
        var actionTo = cc.MoveTo.create(2, cc.p(winsize.width - 200, winsize.height - 303)).easing(cc.easeElasticOut());
        var seq = cc.Sequence.create(
            actionTo,
            cc.CallFunc.create(function (aboutBtn) {
                var shaking = cc.MoveTo.create(2, cc.p(winsize.width - 205, winsize.height - 303)).easing(cc.easeBackInOut());
                var shakingBack = cc.MoveTo.create(2, cc.p(winsize.width - 195, winsize.height - 303)).easing(cc.easeBackInOut());
                var shakingSeq = cc.Sequence.create(cc.DelayTime.create(0.2), shaking, shakingBack);
                aboutBtn.runAction(shakingSeq.repeatForever());
            }, aboutBtn));
        aboutBtn.runAction(seq);

        //add an player here
        this.spriteSheet = new cc.SpriteBatchNode(res.panda_png);
        this.runningAction = new cc.RepeatForever(new cc.Animate(
            new cc.Animation([1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("panda_run_0" + i + ".png");
            }), 0.08)
        ));
        this.runningAction.retain();
        this.sprite = new cc.Sprite("#panda_run_01.png");
        // this.sprite.setPosition(cc.p(-100, 30));
        // this.sprite.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
        // this.spriteSheet.setPosition(cc.p(-100, 30));
        this.spriteSheet.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
        this.spriteSheet.addChild(this.sprite);
        this.addChild(this.spriteSheet, 0);
        this.sprite.runAction(this.runningAction);

        // var moveTo = cc.MoveTo.create(10, cc.p(winsize.width + 200, 30));
        // var seq = cc.Sequence.create(moveTo, cc.CallFunc(function (panda) {
        //     panda.setPositionX(-100);
        // }, this.sprite));
        // this.spriteSheet.runAction(seq.repeatForever());

        var particle = cc.ParticleSystem.create(res.particle.circle);
        particle.setPosition(800, 100);
        this.addChild(particle, 100);

        this.scheduleUpdate();
        return true;
    },
    /**
     * Triggered when play is clicked.
     */
    onPlay: function () {
        cc.audioEngine.playEffect(res.sound.button);
        this.addChild(new GameModeLayer(), 100);
    },

    /**
     * Triggered when option is clicked.
     */
    onSet: function () {
        var winsize = cc.director.getWinSize();
        this.draw = new cc.DrawNode();
        this.draw.drawRect(cc.p(0, winsize.height), cc.p(winsize.width, 0), cc.color(0, 0, 0, 80), 0, cc.color(0, 0, 0, 80));
        this.addChild(this.draw, 4, 1);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            target: this.draw,
            onTouchBegan: function () {
                return true;
            },
            onTouchEnded: function () {
                this.target.removeFromParent();
            }
        }, this.draw);

        //音效
        var effectLabel = new cc.LabelTTF("音效", "Arial", 30);
        effectLabel.setPosition(cc.p(winsize.width + 100, winsize.height / 2 + 50));
        effectLabel.runAction(cc.MoveTo.create(1, cc.p(winsize.width / 2 - 50, winsize.height / 2 + 50)).easing(cc.easeElasticOut()));
        this.draw.addChild(effectLabel);
        var effectIsOn = cc.sys.localStorage.getItem("effectIsOn");
        var effectCheckBox = new ccui.CheckBox(res.off, res.on);
        effectCheckBox.setPosition(cc.p(winsize.width + 100, winsize.height / 2 + 50));
        effectCheckBox.runAction(cc.MoveTo.create(1, cc.p(winsize.width / 2 + 50, winsize.height / 2 + 50)).easing(cc.easeElasticOut()));
        effectCheckBox.setSelected(effectIsOn == 1);
        effectCheckBox.addEventListener(function (sender, type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    cc.sys.localStorage.setItem("effectIsOn", 1);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    cc.sys.localStorage.setItem("effectIsOn", 0);
                    break;
                default:
                    break;
            }
        }, this);
        this.draw.addChild(effectCheckBox);
        //音乐
        var musicLabel = new cc.LabelTTF("音乐", "Arial", 30);
        musicLabel.setPosition(cc.p(winsize.width + 100, winsize.height / 2 + 110));
        musicLabel.runAction(cc.MoveTo.create(1, cc.p(winsize.width / 2 - 50, winsize.height / 2 + 110)).easing(cc.easeElasticOut()));
        this.draw.addChild(musicLabel);
        var musicIsOn = cc.sys.localStorage.getItem("musicIsOn");
        var musicCheckBox = new ccui.CheckBox(res.off, res.on);
        musicCheckBox.setPosition(cc.p(winsize.width + 100, winsize.height / 2 + 110));
        musicCheckBox.runAction(cc.MoveTo.create(1, cc.p(winsize.width / 2 + 50, winsize.height / 2 + 110)).easing(cc.easeElasticOut()));
        musicCheckBox.setSelected(effectIsOn == 1);
        musicCheckBox.addEventListener(function (sender, type) {
            switch (type) {
                case ccui.CheckBox.EVENT_SELECTED:
                    cc.sys.localStorage.setItem("musicIsOn", 1);
                    break;
                case ccui.CheckBox.EVENT_UNSELECTED:
                    cc.sys.localStorage.setItem("musicIsOn", 0);
                    break;
                default:
                    break;
            }
        }, this);
        this.draw.addChild(musicCheckBox);
        //还有一个"难度"的设置，以后加上，diffDeg=1表示"难"，diffDeg=0表示容易

        //toggle //effect
        // var on = new cc.MenuItemImage(res.ui.onBtn);
        // var off = new cc.MenuItemImage(res.ui.offBtn);
        // if (!canAudioPlaying) {
        //     on = new cc.MenuItemImage(res.ui.onBtn);
        //     off = new cc.MenuItemImage(res.ui.offBtn);
        // } else {
        //     on = new cc.MenuItemImage(res.ui.offBtn);
        //     off = new cc.MenuItemImage(res.ui.onBtn);
        // }
        // var toggler = new cc.MenuItemToggle(on, off,
        //     function (that) {
        //         // TODO: settings.
        //         console.log(that);
        //     }, this);
        // this.effect = new cc.Menu(toggler);
        // this.effect.setPosition(cc.p(winsize.width + 100, winsize.height / 2 + 10));
        // this.effect.setScale(0.8);
        // this.effect.runAction(cc.MoveTo.create(1, cc.p(winsize.width / 2 - 30, winsize.height / 2 + 10)).easing(cc.easeElasticOut()));
        // this.draw.addChild(this.effect, 6);
    },

    /**
     * Triggered when about is clicked.
     */
    onAbout: function () {
        var winsize = cc.director.getWinSize();
        this.draw = new cc.DrawNode();
        this.draw.drawRect(cc.p(0, winsize.height), cc.p(winsize.width, 0), cc.color(0, 0, 0, 80), 0, cc.color(0, 0, 0, 80));
        // this.draw = new cc.LayerColor(cc.color(0, 0, 0, 80), winsize.width, winsize.height);
        this.addChild(this.draw, 4, 1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this.draw,
            swallowTouches: true,
            onTouchBegan: function () {
                return true;
            },
            onTouchEnded: function (touch, event) {
                var target = this.target;
                target.removeFromParent();
            }
        }, this.draw);

        var actionTo = cc.MoveTo.create(1, cc.p(winsize.width / 2, winsize.height / 2)).easing(cc.easeElasticOut());
        var deleteLabel = new cc.LabelTTF("只是用来熟悉\ncocos2d-js\n2017/07/10", "Arial", 35);
        deleteLabel.setPosition(winsize.width + deleteLabel.width / 2, winsize.height / 2);
        deleteLabel.setFontFillColor(cc.color.GREEN);
        deleteLabel.setTag(1);
        deleteLabel.runAction(actionTo);
        this.draw.addChild(deleteLabel);
    },

    /**
     * store layer
     */

    onStore: function () {
        this.openStore = true;
        cc.audioEngine.stopMusic();
        this.addChild(new RankLayer(), 100);
    },

    update: function (dt) {
        if (this.openStore) {
            //this.labelCoins.setString(this.totalCoin);
            //this.labelMagnet.setString(this.magnetNum);
            //this.labelShoes.setString(this.shoesNum);
            //this.labelRedshoes.setString(this.redshoesNum);
        }
    },
});

//游戏模式选择
var GameModeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var winsize = cc.director.getWinSize();
        this.draw = new cc.DrawNode();
        this.draw.drawRect(cc.p(0, winsize.height), cc.p(winsize.width, 0), cc.color(0, 0, 0, 80), 0, cc.color(0, 0, 0, 80));
        this.addChild(this.draw, 4, 1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            target: this.draw,
            onTouchBegan: function () {
                return true;
            },
            onTouchEnded: function () {
                this.target.removeFromParent();
            }
        }, this.draw);

        //图层定位,以屏幕中心偏移
        var offsetX = 0;
        var offsetY = 0;
        //图层大小
        var clipWidth = 650;
        var clipHeight = 450;
        //圆角半径
        var radius = 25;
        //圆角层实现代码
        var size = cc.winSize;
        var stencil = new cc.DrawNode();
        stencil.drawRect(cc.p((size.width - clipWidth) / 2 + offsetX, (size.height - clipHeight) / 2 + offsetY + radius), cc.p(size.width / 2 + clipWidth / 2 + offsetX, size.height / 2 + clipHeight / 2 + offsetY - radius), cc.color(0, 0, 0), 1, cc.color(0, 0, 0));
        stencil.drawRect(cc.p((size.width - clipWidth) / 2 + offsetX + radius, (size.height - clipHeight) / 2 + offsetY), cc.p(size.width / 2 + clipWidth / 2 + offsetX - radius, size.height / 2 + clipHeight / 2 + offsetY), cc.color(0, 0, 0), 1, cc.color(0, 0, 0));
        stencil.drawCircle(cc.p(size.width / 2 - clipWidth / 2 + offsetX + radius, size.height / 2 - clipHeight / 2 + offsetY + radius), radius / 3, 0, 100, false, radius, cc.color(0, 0, 0));
        stencil.drawCircle(cc.p(size.width / 2 + clipWidth / 2 + offsetX - radius, size.height / 2 - clipHeight / 2 + offsetY + radius), radius / 3, 0, 100, false, radius, cc.color(0, 0, 0));
        stencil.drawCircle(cc.p(size.width / 2 + clipWidth / 2 + offsetX - radius, size.height / 2 + clipHeight / 2 + offsetY - radius), radius / 3, 0, 100, false, radius, cc.color(0, 0, 0));
        stencil.drawCircle(cc.p(size.width / 2 - clipWidth / 2 + offsetX + radius, size.height / 2 + clipHeight / 2 + offsetY - radius), radius / 3, 0, 100, false, radius, cc.color(0, 0, 0));
        var modeBoard = new cc.ClippingNode();
        modeBoard.stencil = stencil;
        //层颜色
        var layer = new cc.LayerColor(cc.color(255, 0, 0), clipWidth, clipHeight);
        layer.x = (size.width - clipWidth) / 2 + offsetX;
        layer.y = (size.height - clipHeight) / 2 + offsetY;
        //层透明度
        layer.opacity = 200;
        modeBoard.addChild(layer);
        this.draw.addChild(modeBoard);

        var modeDesc = new cc.LabelTTF("请选择模式", "Arial", 30);
        modeDesc.setPosition(winsize.width / 2, winsize.height / 2 + 225 - 50);
        modeBoard.addChild(modeDesc);

        var modeOneFont = new cc.MenuItemFont("休闲模式", function () {
            console.log("点击休闲模式");
        }, this);
        modeOneFont.setFontSize(45);
        var modeOne = new cc.Menu(modeOneFont);
        modeOne.setPosition(winsize.width / 2, modeDesc.getPositionY() - 100);
        modeBoard.addChild(modeOne);

        var modeTwoFont = new cc.MenuItemFont("团队模式", function () {
            console.log("点击休闲模式");
        }, this);
        modeTwoFont.setFontSize(45);
        var modeTwo = new cc.Menu(modeTwoFont);
        modeTwo.setPosition(winsize.width / 2, modeDesc.getPositionY() - 210);
        modeBoard.addChild(modeTwo);

        // this.modeone = new cc.Menu(new cc.MenuItemSprite(
        //     new cc.Sprite(res.mode.mode1),
        //     new cc.Sprite(res.mode.mode1),
        //     this.relaxMode, this));
        // this.modeone.setPosition(cc.p(winsize.width / 2 - 120, winsize.height + 30));
        // this.draw.addChild(this.modeone, 11);
        //
        // var actionTo = cc.MoveTo.create(1, cc.p(winsize.width / 2 - 120, winsize.height / 2)).easing(cc.easeElasticOut());
        // this.modeone.runAction(actionTo);
        //
        // this.modetwo = new cc.Menu(new cc.MenuItemSprite(
        //     new cc.Sprite(res.mode.mode2),
        //     new cc.Sprite(res.mode.mode2),
        //     this.relayMode, this));
        // this.modetwo.setPosition(cc.p(winsize.width / 2 + 120, winsize.height + 30));
        // this.draw.addChild(this.modetwo, 11);
        //
        // var actionTo = cc.MoveTo.create(1, cc.p(winsize.width / 2 + 120, winsize.height / 2)).easing(cc.easeElasticOut());
        // this.modetwo.runAction(actionTo);
    },

    relaxMode: function () {
        cc.director.runScene(new PlayScene());
    },

    relayMode: function () {
        cc.director.runScene(new NetworkPlayScene());
    }
});