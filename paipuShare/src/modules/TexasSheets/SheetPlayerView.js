

var BUTTON_POS_X = display.cx
var BUTTON_POS_Y = display.cy - 200
var TIMER_LINE_ZORDER = 1
var BUTTON_ZORDER = 2

var SheetPlayerView = cc.Node.extend({
    ctor: function () {
        this._super();
        BUTTON_POS_X = display.cx;
        BUTTON_POS_Y = display.cy - 200;
        this.playSheet = new PlaySheet();
        this.addChild(this.playSheet);
        this.playSheet.onUpdateCallBack(this.update.bind(this));
        // this.msgID = 6;
        // this.nextButton =  new ccui.Button("res/sheet_start_button_1.png", "res/sheet_start_button_2.png");
        // this.addChild(this.nextButton);
        // this.nextButton.setPosition(600,500);
        // this.nextButton.addClickEventListener(function(){
        //     this.msgID++;
        //     alert("this.msgID"+this.msgID);
        //     this.playSheet.stopAndGoToMsg(10);
        //     this.restart();
        // }.bind(this))
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.TouchBegan.bind(this),
            onTouchEnded: this.TouchEnd.bind(this)
        }, this.layer)

        this.view = new cc.Node();
        this.addChild(this.view);
        this.view.showing = true;
        this.playing_ = false;
    },
    TouchBegan: function (touch, event) {
        this.beganX = touch.x;
        return true;
    },
    TouchEnd: function (touch, event) {
        if (this.playing_) {
            this.stopAllActions();

            if (this.view.showing) {
                this.hide();
            } else {
                this.show();
                this.scheduleOnce(function () {
                    this.hide()
                }.bind(this), 2)
            }
        }
    },
    openFile: function (path) {
        this.playSheet.openFile(path);
    },
    init: function () {
        this.hideAllBtns();
        this.playSheet.init();
        this.totalTime = this.playSheet.getTotalTime();

        this.showPlayBtn();
        this.playing_ = false;
        this.updateView();
        this.showTimerLine();
        // this.playSheet.play();
    },
    show: function () {
        this.view.setVisible(true);
        this.view.showing = true;
    },

    hide: function () {
        this.view.setVisible(false);
        this.view.showing = false;
    },

    updateView: function () {
        this.stopAllActions();
        if (this.playing_) {
            this.scheduleOnce(function () {
                this.hide()
            }.bind(this), 2)
        } else {
            this.show();
        }
    },
    update: function (time) {
        this.time = time;
        this.updateTimerLine();

        if (this.time >= this.totalTime) {
            this.ended();
        }
    },
    showTimerLine: function () {
        if (this.timerLine) {
            this.timerLine.setVisible(true)
        } else {
            this.timerLine = new SheetTimerLine();
            this.timerLine.setPosition(display.cx, display.cy - 380);
            // this.timerLine.setPosition(display.cx,display.cy);
            this.view.addChild(this.timerLine, TIMER_LINE_ZORDER);

            this.timerLine.setTimeLabel(this.time);
            this.timerLine.setThumbCallBack(this.onThumbTouchBegan.bind(this), this.onThumbTouchMove.bind(this), this.onThumbTouchEnd.bind(this));
            this.addButtonToTimerLine();

        }
        this.updateTimerLine();
    },
    updateTimerLine: function () {
        this.time = this.time || 0;
        var percentage = this.time / this.totalTime;
        if (percentage > 1) {
            percentage = 1
        }
        if (this.timerLine) {
            this.timerLine.setPercentage(percentage);
            this.timerLine.setTimeLabel(this.totalTime - this.time);
        }
    },
    changePlaySpeed: function () {
        if (!this.speed || this.speed == 1) {
            this.speed = 4;
        } else {
            this.speed = 1
        }
        this.playSheet.setSpeed(this.speed);
    },
    onThumbTouchBegan: function (sender, type) {

        var pos = sender.getTouchBeganPosition();
        var x = pos.x;
        var y = pos.y;
        var length = this.timerLine.getTimerLineLength();
        this.thumbBeganX = x;
        this.thumbBeganPosX = this.timerLine.thumb.getPositionX();
        this.pause();
        this.stopAllActions();
        // return true
    },


    onThumbTouchMove: function (sender, type) {
        var pos =sender.getTouchMovePosition();
        var length = this.timerLine.getTimerLineLength();
        var posX = pos.x - this.thumbBeganX + this.thumbBeganPosX;
        var percentage = posX / length;

        if (percentage < 0) {
            percentage = 0
        } else if (percentage > 1) {
            percentage = 1
        }

        this.timerLine.setPercentage(percentage)
    },
    onThumbTouchEnd: function (sender, type) {
        var pos = sender.getTouchMovePosition();
        var length = this.timerLine.getTimerLineLength();
        var posX = pos.x - this.thumbBeganX + this.thumbBeganPosX;
        var percentage = posX / length;

        var time = this.totalTime * percentage;
        this.playSheet.stopAndGoToTime(time);
        this.restart();
    },


    addButtonToTimerLine: function () {
        var percentages = [0];
        var startBtn = new ccui.Button("res/sheet_start_button_1.png", "res/sheet_start_button_2.png");

        startBtn.addTouchEventListener(function(btn,type){
            if(type == ccui.Widget.TOUCH_ENDED) {
                this.replay();
            }
        }, this);
        this.timerLine.addButtonAtPercentage(startBtn, 0);

        for (var i = 0; i < 3; i++) {
            (function (idx) {
                var msgId = this.playSheet.turns[idx];
                if (!msgId) {
                    return
                }

                var normal = "res/sheet_turn_button_1_" + (idx + 1) + ".png";
                var pressed = "res/sheet_turn_button_2_" + (idx + 1) + ".png";
                var btn = new ccui.Button(normal, pressed);
                btn.tag = msgId;
                btn.addClickEventListener(function(){
                    this.changeToTurnEnd(btn);
                }.bind(this))

                var time = this.playSheet.getRelativeTime(msgId);
                if (!time) {
                    return
                }

                var percentage = time / this.totalTime;
                if (percentage < percentages[idx] + 0.12) {
                    percentage = percentages[idx] + 0.12;
                }

                percentages.push(percentage);


                this.timerLine.addButtonAtPercentage(btn, percentage);
            }.bind(this))(i)

        }
    },

    changeToTurnEnd: function (button) {
        var msgId = button.tag;
        this.playSheet.stopAndGoToMsg(msgId);
        this.restart();
    },

    hideTimerLine: function () {
        if (!this.timerLine) {
            return
        }

        this.timerLine.setVisible(false);
    },

    showPlayBtn: function () {
        if (this.playBtn) {
            this.playBtn.setVisible(true);
            return
        }

        this.playBtn = new ccui.Button("res/sheet_play_button_1.png", "res/sheet_play_button_2.png");
        this.playBtn.setPosition(BUTTON_POS_X, BUTTON_POS_Y);
        this.view.addChild(this.playBtn, BUTTON_ZORDER);
        this.playBtn.addTouchEventListener(function (btn, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.play();
            }
        }, this);
    },

    hidePlayBtn: function () {
        if (!this.playBtn) {
            return
        }

        this.playBtn.setVisible(false);
    },

    showPauseBtn: function () {
        if (this.pauseBtn) {
            this.pauseBtn.setVisible(true);
            return
        }


        this.pauseBtn = new ccui.Button("res/sheet_pause_button_1.png", "res/sheet_pause_button_2.png");
        this.pauseBtn.setPosition(BUTTON_POS_X, BUTTON_POS_Y)
        this.view.addChild(this.pauseBtn, BUTTON_ZORDER)
        this.pauseBtn.addTouchEventListener(function (btn, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.pause();
            }
        }, this)
    },

    hidePauseBtn: function () {
        if (!this.pauseBtn) {
            return
        }

        this.pauseBtn.setVisible(false);
    },

    showResumeBtn: function () {
        if (this.resumeBtn) {
            this.resumeBtn.setVisible(true);
            return
        }

        this.resumeBtn = new ccui.Button("res/sheet_play_button_1.png", "res/sheet_play_button_2.png");
        this.resumeBtn.setPosition(BUTTON_POS_X, BUTTON_POS_Y);
        this.view.addChild(this.resumeBtn, BUTTON_ZORDER);
        this.resumeBtn.addTouchEventListener(function (btn, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.restart();
            }
        }, this);
    },

    hideResumeBtn: function () {
        if (!this.resumeBtn) return

        this.resumeBtn.setVisible(false);
    },

    showReplayBtn: function () {
        if (this.replayBtn) {
            this.replayBtn.setVisible(true);
            return
        }

        this.replayBtn = new ccui.Button("res/sheet_replay_button_1.png", "res/sheet_replay_button_2.png");
        this.replayBtn.setPosition(BUTTON_POS_X, BUTTON_POS_Y);
        this.view.addChild(this.replayBtn, BUTTON_ZORDER);
        this.replayBtn.addTouchEventListener(function (btn, type) {
            if (type == ccui.Widget.TOUCH_ENDED) {
                this.replay();
            }
        }, this);

    },

    hideReplayBtn: function () {
        if (!this.replayBtn)return


        this.replayBtn.setVisible(false);
    },

    play: function () {
        this.playing_ = true;
        this.hideAllBtns();
        this.showPauseBtn();
        this.showTimerLine();

        this.playSheet.play();
        this.updateView();

    },

    pause: function () {
        this.playing_ = true;

        this.hideAllBtns();
        this.showResumeBtn();

        this.playSheet.pause();


        this.updateView();
    },

    restart: function () {
        this.playing_ = true;
        this.hideAllBtns();
        this.showPauseBtn();
        this.showTimerLine();

        this.playSheet.restart();
        this.updateView();
    },

    ended: function () {
        this.playing_ = false;
        this.hideAllBtns();
        this.showReplayBtn();
        this.hideTimerLine();

        this.playSheet.stop();
        this.updateView();
    },

    replay: function () {
        this.init();
        this.play();
    },

    hideAllBtns: function () {
        this.hidePlayBtn();
        this.hidePauseBtn();
        this.hideResumeBtn();
        this.hideReplayBtn();
    }
})

















