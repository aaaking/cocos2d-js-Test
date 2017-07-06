/**
 * Created by Administrator on 14-3-3.
 */
var ControlLayer = cc.Layer.extend({

    pauseItem: null,
    scoreItem: null,

    ctor: function () {
        this._super();
        this.init();
        this.loadListener();
    },

    init: function () {
        var winSize = cc.director.getWinSize();
        var norPause = cc.Sprite.create("#game_pause_nor.png");
        var pressPause = cc.Sprite.create("#game_pause_pressed.png");
        this.pauseItem = cc.MenuItemSprite.create(norPause, pressPause, null, null, this);
        //pauseItem.initWithNormalSprite();
        this.pauseItem.setPosition(cc.p(norPause.getContentSize().width / 2 + 10, winSize.height - norPause.getContentSize().height / 2 - 10));
        var menuPause = cc.Menu.create(this.pauseItem);
        menuPause.setPosition(cc.p(0, 0));
        this.addChild(menuPause, 101);
        this.scoreItem = cc.LabelBMFont.create("0", res.s_font);
        this.scoreItem.setColor(cc.color(143, 146, 147, 255));
        this.scoreItem.setAnchorPoint(cc.p(0, 0.5));
        this.scoreItem.setPosition(cc.p(this.pauseItem.getPositionX() + norPause.getContentSize().width / 2 + 10, this.pauseItem.getPositionY()));
        this.addChild(this.scoreItem);

//        if (!sys.localStorage["isHaveSaveData"]) {
//            sys.localStorage.setItem("isHaveSaveData",true);
//            sys.localStorage.setItem("highScore",12000)
//        } else {
//            var hiScore = sys.localStorage["highScore"]
//            var hiScoreItem = cc.LabelBMFont.create( hiScore,"font/font.fnt");
//            hiScoreItem.setColor(cc.c3(143, 146, 147));
//            hiScoreItem.setAnchorPoint(cc.p(0, 0.5));
//            hiScoreItem.setPosition(cc.p(this.scoreItem.getPositionX() +
//                norPause.getContentSize().width / 2 + 10, this.pauseItem.getPositionY()));
//            this.addChild(hiScoreItem);
//        }

    },
    loadListener: function () {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this.pauseItem,
            swallowTouches: true,//不向下触摸，简单点来说，比如有两个sprite ,A 和 B，A在上B在下（位置重叠），触摸A的时候，B不会受到影响
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this.pauseItem);
    },
    onTouchBegan: function (touch , event) {
        var self = this.target;
        var touchPoint = touch.getLocation();
        var locationInNode = self.convertToNodeSpace(touchPoint);
        var rect = cc.rect(0, 0, self.getContentSize().width, self.getContentSize().height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {

    },
    onTouchEnded: function (touch, event) {
        var self = this.target;
        var touchPoint = touch.getLocation();
        var locationInNode = self.convertToNodeSpace(touchPoint);
        var rect = cc.rect(0, 0, self.getContentSize().width, self.getContentSize().height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return;
        }
        self.getParent().getParent().menuPauseCallback();
    },
    menuPauseCallback: function (obj) {
        var director = cc.director;
        if (!director.isPaused()) {
            this.pauseItem.setNormalImage(cc.Sprite.create("#game_resume_nor.png"));
            this.pauseItem.setSelectedImage(cc.Sprite.create("#game_resume_pressed.png"));
            director.pause();
        } else {
            this.pauseItem.setNormalImage(cc.Sprite.create("#game_pause_nor.png"));
            this.pauseItem.setSelectedImage(cc.Sprite.create("#game_pause_pressed.png"));
            director.resume();
        }
    },
    updateScore: function (score) {
        this.scoreItem.setString(score);
    },

    EOF: function () {
    }
});