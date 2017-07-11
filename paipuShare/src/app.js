app = {}
app.userInfo = {}
app.gameMode = 0
app.play_mode = 0
app.userInfo.tableid = "123456"
app.userInfo.token = 0
app.userInfo.seatid = 2

bgColorNormal = null;
bgColorSng = null;
bgColorMTT = null;
bgColorPineapple = null;

display = {}

display.size = {width: 740, height: 931}
display.sizeInPixels = {width: 720, height: 1280}
display.width = 720
display.height = 1280
display.cx = 360
display.cy = 640
display.c_left = -320
display.c_right = 320
display.c_top = 640
display.c_bottom = -640
display.left = 0
display.right = 720
display.top = 1280
display.bottom = 0
display.widthInPixels = 720
display.heightInPixels = 1280
display.CENTER = 0
display.LEFT_TOP = 1
display.TOP_LEFT = 1
display.CENTER_TOP = 2
display.TOP_CENTER = 2
display.RIGHT_TOP = 3
display.TOP_RIGHT = 3
display.CENTER_LEFT = 4
display.LEFT_CENTER = 4
display.CENTER_RIGHT = 5
display.RIGHT_CENTER = 5
display.BOTTOM_LEFT = 6
display.LEFT_BOTTOM = 6
display.BOTTOM_RIGHT = 7
display.RIGHT_BOTTOM = 7
display.BOTTOM_CENTER = 8
display.CENTER_BOTTOM = 8

display.ANCHOR_POINTS = new Array(
    cc.p(0.5, 0.5),  // CENTER
    cc.p(0, 1),      // TOP_LEFT
    cc.p(0.5, 1),    // TOP_CENTER
    cc.p(1, 1),      // TOP_RIGHT
    cc.p(0, 0.5),    // CENTER_LEFT
    cc.p(1, 0.5),    // CENTER_RIGHT
    cc.p(0, 0),      // BOTTOM_LEFT
    cc.p(1, 0),      // BOTTOM_RIGHT
    cc.p(0.5, 0)    // BOTTOM_CENTER
)

localizedStrings = new LocalizedStrings()

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames("res/card.plist");
        new cc.SpriteBatchNode("res/card.png");

        cc.spriteFrameCache.addSpriteFrames("res/bubble.plist");
        var winSize = cc.winSize;
        var screenSize = cc.view.getFrameSize();
        display.size = {width: winSize.width, height: winSize.height};
        display.sizeInPixels = {width: screenSize.width, height: screenSize.height};
        display.width = display.size.width;
        display.height = display.size.height;
        display.cx = display.width / 2;
        display.cy = display.height / 2;
        display.c_left = -display.width / 2;
        display.c_right = display.width / 2;
        display.c_top = display.height / 2;
        display.c_bottom = -display.height / 2;
        display.left = 0;
        display.right = display.width;
        display.top = display.height;
        display.bottom = 0;
        display.widthInPixels = display.sizeInPixels.width;
        display.heightInPixels = display.sizeInPixels.height;
        //app.userInfo.uid = window.texas.uid
        app.userInfo.uid = 1001;
        var Control = new TexasController();
        this.addChild(Control);

        this.playsheet = new SheetPlayerView();
        this.playsheet.init();
        this.addChild(this.playsheet);
        //runWebSocketTest();
        // cc.sys.openApp("http://www.baidu.com");
        // cc.sys.openURL("http://www.baidu.com");
    },
    onTick: function (t) {
        console.log("asdasdasd=" + t);
    }
});

