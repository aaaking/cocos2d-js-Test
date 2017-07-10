

var THUMB_ZORDER = 3
var FG_ZORDER = 2
var BUTTON_ZORDER = 1
var SheetTimerLine = cc.Node.extend({
    ctor:function(percentage){
        this._super();
        this.initUI(percentage);
    },
    initUI : function(percentage) {
        percentage = percentage || 0;
        this.unTouchLayer = new cc.LayerColor(cc.color(255, 255, 255, 0));
        this.unTouchLayer.width = display.width;
        this.unTouchLayer.height = 228;
        this.unTouchLayer.setPosition(-display.cx, -70);
        this.addChild(this.unTouchLayer);
        this.layer = cc.Sprite.create("res/sheet_timer_layer.png")
        this.layer.setPosition(0, 25);
        this.addChild(this.layer);

        this.bg = cc.Sprite.create("res/sheet_timer_bg.png");
        this.bg.setPosition(-40, 0);
        this.addChild(this.bg);
        this.bgSize = this.bg.getContentSize();

        this.fg = cc.Sprite.create("res/sheet_timer_fg.png");
        this.fgSize = this.fg.getContentSize();
        this.fg.setTextureRect(cc.rect(0, 0, percentage * this.fgSize.width, this.fgSize.height));
        this.fg.setAnchorPoint(cc.p(0, 0.5));
        this.fg.setPosition(0, 6);
        this.bg.addChild(this.fg, FG_ZORDER);

        var images = {normal: "res/sheet_play_thumb_1.png", pressed: "res/sheet_play_thumb_2.png"}
        // this.thumb = cc.Sprite.create("res/sheet_play_thumb_1.png");
        this.thumb = new ccui.Button("res/sheet_play_thumb_1.png","res/sheet_play_thumb_2.png");

        this.bg.addChild(this.thumb, THUMB_ZORDER);
        this.setPosition(percentage * this.fgSize.width, this.bgSize.height);

        this.thumb.percentage = percentage;
    },
    setPercentage : function(percentage) {
        this.thumb.percentage = percentage || 0;
        this.fg.setTextureRect(cc.rect(0, 0, this.thumb.percentage * this.fgSize.width, this.fgSize.height));
        this.thumb.setPosition(this.thumb.percentage * this.fgSize.width, this.bgSize.height * 0.5);
    },

    setTimeLabel : function(time) {
        time = time || 0;
        if (time < 0) {
            time = 0
        }
        var hour = Math.floor(time / 3600);
        var minute = Math.floor((time % 3600) / 60);
        var second = Math.floor(time % 60);
        String.format = function () {
            if (arguments.length == 0) {
                return null;
            }
            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        }
        var text = hour + ":" + minute + ":" + second;
        // var text = String.format("- %02d:%02d:%02d", hour, minute, second);

        var size = this.bg.getContentSize();
        var posX = size.width + 15;
        var posY = size.height * 0.5;

        if (!this.timeLabel) {

            this.timeLabel = new cc.LabelTTF(text, "Arial", 22);
            this.timeLabel.setAnchorPoint(cc.p(0, 0.5));
            this.timeLabel.setPosition(posX, posY);
            this.bg.addChild(this.timeLabel);
        } else {
            this.timeLabel.setString(text)
            this.timeLabel.setAnchorPoint(cc.p(0, 0.5));
            this.timeLabel.setPosition(posX, posY);
        }
    },

    addButtonAtPercentage : function(button, percentage) {
        var btnSize = button.getContentSize();
        var size = this.bg.getContentSize();
        var posX = size.width * percentage + 4;
        var posY = -27.5;

        button.setPosition(posX, posY);
        button.setAnchorPoint(cc.p(0.5, 0));
        this.bg.addChild(button, BUTTON_ZORDER);
    },

    setThumbCallBack : function(callback1,callback2,callback3) {
        if (this.thumb) {
            // this.thumb.setTouchEnabled(true);
            // cc.eventManager.addListener({
            //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //     swallowTouches: true,
            //     onTouchBegan: callback1,
            //     onTouchMoved: callback2,
            //     onTouchEnded: callback3
            // }, this.thumb);
            this.thumb.addTouchEventListener(function(sender,type){
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN:
                        callback1(sender,type);
                        break;

                    case ccui.Widget.TOUCH_MOVED:
                        callback2(sender,type);
                        break;

                    case ccui.Widget.TOUCH_ENDED:
                        callback3(sender,type);
                        break;
                }
            })
        }
    },

    getTimerLineLength : function() {
        return this.bg.getContentSize().width
    }
})





