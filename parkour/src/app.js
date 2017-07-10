var ParkourSplashScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        var splashLayer = new SplashLayer();
        splashLayer.bake();
        this.addChild(splashLayer, 1, 1);
        setTimeout(function () {
            if (cc.sys.localStorage.getItem("username")) {
                cc.director.runScene(new WelcomeScene());
            } else {
                cc.director.runScene(new LoginScene());
            }
        }.bind(this), 1500);
    }
});

var SplashLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg, 0);

        var logo = new cc.Sprite(res.logo);
        logo.setPosition(cc.p(size.width / 2, size.height / 2));
        logo.setScale(2);
        this.addChild(logo, 1);
        logo.opacity = 0;
        var fadeIn = cc.FadeIn.create(0.3);
        var fadeOut = cc.FadeOut.create(0.2);
        var delay = cc.delayTime(1.2);
        var seq = cc.Sequence.create(
            fadeIn,
            delay);
        logo.runAction(seq);

        // cc.audioEngine.playEffect(res.splash_music);

        //load plist res to memory
        cc.spriteFrameCache.addSpriteFrames(res.gold_plist);
        cc.spriteFrameCache.addSpriteFrames(res.platform_plist);
        cc.spriteFrameCache.addSpriteFrames(res.panda_plist, res.panda_png);
        // cc.spriteFrameCache.addSpriteFrames(res.panda.plist);
        cc.spriteFrameCache.addSpriteFrames(res.shoes_plist);
        cc.spriteFrameCache.addSpriteFrames(res.redshoes_plist);
        cc.spriteFrameCache.addSpriteFrames(res.spring_plist);
        cc.spriteFrameCache.addSpriteFrames(res.bird_plist);
        cc.spriteFrameCache.addSpriteFrames(res.enemy_plist);
        cc.spriteFrameCache.addSpriteFrames(res.magnet_plist);

        //load image to memory
        String.prototype.endWith = function (s) {
            if (s == null || s == "" || this.length == 0 || s.length > this.length)
                return false;
            if (this.substring(this.length - s.length) == s)
                return true;
            else
                return false;
            return true;
        };

        //find all image  只有执行下面的代码 才会执行 String.prototype.endWith这段代码
        var temp = [];
        for (var i in res) {
            if (typeof res[i] == "object") {
                for (var j in res[i]) {
                    if (res[i] instanceof Array) {
                        continue;
                    } else {
                        if (typeof res[i][j] == "string") {
                            if (!res[i][j].endWith("plist") && !res[i][j].endWith("mp3")) {
                                temp.push(res[i][j]);
                            }
                        }
                    }
                }
            } else {
                if (typeof res[i] == "string") {
                    if (!res[i].endWith("plist") && !res[i].endWith("mp3")) {
                        temp.push(res[i]);
                    }
                }
            }
        }

        //load to mem
        for (var i in temp) {
            cc.textureCache.addImage(temp[i]);
        }

        //preload game objects
//		pre_bird = new Bird(-100, -100);
//		pre_frog = new Frog(-100, -100);
//		pre_magnet = new Magnet(-100, -100, 0.5);
//		pre_redshoes = new Redshoes(-100, -100);
//		pre_shoes = new Shoes(-100, -100);
//		pre_spring = new Spring(-100, -100, 0.7);
    }
});

