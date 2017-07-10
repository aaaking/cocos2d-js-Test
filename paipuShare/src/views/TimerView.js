var TimerView = cc.Node.extend({
    ctor:function (isSelf) {
        this._super();
        this.isSelf = isSelf;
        this.speed = 1;
        this.bg = cc.Sprite.create("res/timer_bg.png");

        this.addChild(this.bg);
        this.timer = new cc.ProgressTimer(new cc.Sprite("res/white_timer.png"));
        this.timer.type = cc.ProgressTimer.TYPE_RADIAL;
        this.timer.setOpacity(255);
        this.timer.setReverseDirection(true);
        this.timer.setPercentage(100);
        this.addChild(this.timer,1);
        this.label = new cc.LabelTTF("","Arial", 24);
        this.label.setAnchorPoint(cc.p(0.5,0.5));
        this.label.setPosition(0,0);
        this.addChild(this.label,2);
        this.label.setVisible(false);


        this.particle = cc.Sprite.create("res/null_timer.png");
        var size = this.particle.getContentSize();
        this.particleSys =  new cc.ParticleSystem("res/xingxing2.plist");
        this.particleSys.setPosition(cc.p(size.width*0.5,size.height));
        this.particleSys.setColor(cc.color(0, 0, 0, 1));
        this.particle.addChild(this.particleSys);
        this.addChild(this.particle,2);
        this.setVisible(false);
    }
});

TimerView.prototype.timerAdjustTo = function(size, pos) {
    var tsize = this.timer.getContentSize();
    var scale = size.width / tsize.width;
    this.label.setPosition(pos);
    this.timer.setScale(scale);
    this.timer.setPosition(pos);

    this.particle.setScale(scale);
    this.particle.setPosition(pos);

    this.bg.setScale(scale);
    this.bg.setPosition(pos);
};

var time2string = function (time) {
    return Math.floor(time);
};

TimerView.prototype.startCount = function(time) {
    this.label.setVisible(!this.isSelf);
    this.time = time;
    this.label.setString(time2string(this.time));
    this.running = true;
    this.unschedule(this.counterAnim);
    this.schedule(this.counterAnim, 1 / this.speed);
};

TimerView.prototype.counterAnim = function() {
    this.time = this.time - 1;

    if (self.time == 5 && this.isSelf) {
        cc.audioEngine.playEffect("res/audio/timeOverTipSound.mp3");
    }
    this.label.setString(time2string(this.time));

    if (!this.running) {
        return
    }

    if (!this.time || this.time <= 0) {
        if (this.callback) {
            this.callback()
        }
        // dzglobal.performWithDelay(this, function () {
            this.label.setString("等待");
        // }, 1 / this.speed)
        this.unschedule(this.counterAnim);
        return;
    }

    // this.scheduleOnce(this.counterAnim, 1 / this.speed);
};

TimerView.prototype.startTimer = function(time, total_time) {
    this.hideTimer();
    this.setVisible(true)

    if (time > total_time) {
        time = total_time
    }
    var percentage = time * 100 / total_time;

    time = time / this.speed;

    this.timer.runAction(cc.progressFromTo(time, percentage, 1));

    this.timer.setColor(cc.color(0, 0, 0));

    this.startCount(time);

    var rotation = percentage * 3.6;
    this.particle.setRotation(360 - rotation);
    this.particle.runAction(cc.rotateBy(time, rotation));
     //this.particleSys.resetSystem();
     //this.particleSys.setStartColor(cc.color(1, 0.64, 0.06, 1));
     //this.particleSys.setEndColor(cc.color(1, 0.64, 0.06, 1));

};

TimerView.prototype.hideBg = function() {
    this.bg.setVisible(false)
};

TimerView.prototype.hideTimer = function() {
    this.stopAllActions();
    this.timer.stopAllActions();
    this.label.setVisible(false);

    this.setVisible(false);
    this.running = false;
    this.callback = null;
};

TimerView.prototype.changeColorAtTime = function(currentTime, beganTime, endTime, color ) {
    this.time = this.time || currentTime;

    var duration = beganTime - endTime;

    if (this.time > beganTime) {
        dzglobal.performWithDelay(this, function () {
            this.timer.runAction(cc.tintTo(duration / this.speed, color.r, color.g, color.b));
        }, this.time - beganTime)
    }
    else if (this.time > endTime) {
        var act_duration = self.time - endTime;

        var red_color = act_duration / duration * color.r;
        var green_color = act_duration / duration * color.g;
        var blue_color = act_duration / duration * color.b;

        this.timer.setColor(cc.color(red_color, green_color, blue_color));

        this.timer.runAction(cc.tintTo(act_duration / self.speed, color.r, color.g, color.b));
    } else {
        this.timer.setColor(color);
    }
};

TimerView.prototype.setTimeOutCallBack = function( callback ) {
   this.callback = callback;
};

TimerView.prototype.removeTimeOutCallBack = function() {
    this.callback = null;
};

TimerView.prototype.setTimerSpeed = function(speed) {
    this.speed = speed;
};

