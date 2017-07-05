var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        // this.addChild(this.sprite, 0);

        return true;
    }
});

var GameLayer = cc.Layer.extend({
    name: "gameLayer",
    firstX: null,
    firstY: null,
    cardArr: null,
    score: 0,
    scoreLabel: null,
    gameOverLayer: null,
    gameWinLayer: null,
    ctor: function () {
        this._super();
        // this.ignoreAnchorPointForPosition(true);
        this.initContent();
        // this.loadListener();
        return true;
    },
    initContent: function () {
        var size = cc.winSize;
        var unitSize = (size.height / 2 - 80) / 4;//2300.7179487179487  1280  unitSize: 140  unitSizeY: 110
        var lazyLayer = new cc.LayerColor(cc.color(180, 170, 160, 255), unitSize * 4 + 15, unitSize * 4 + 15);
        lazyLayer.ignoreAnchorPointForPosition(false);
        lazyLayer.x = size.width / 2;
        lazyLayer.y = size.height / 2;
        this.addChild(lazyLayer);
        //显示分数
        var label = new cc.LabelTTF("Score: ", "Arial", 32);
        label.fillStyle = cc.color.RED;
        label.setAnchorPoint(0, 0);
        label.x = 80;
        label.y = size.height - 80;
        this.addChild(label, 10);
        this.scoreLabel = new cc.LabelTTF("0", "Arial", 32);
        this.scoreLabel.setAnchorPoint(0, 0);
        this.scoreLabel.x = 100 + 120;
        this.scoreLabel.y = size.height - 80;
        this.addChild(this.scoreLabel, 10);
        //创建卡片数组
        this.cardArr = new Array(4);
        for (var i = 0; i < this.cardArr.length; i++) {
            this.cardArr[i] = new Array(4);
        }
        // 初始化卡片数组
        this.createCards();
        //随机生成2个数字
        this.autoCreateCardNumber();
        this.autoCreateCardNumber();
    },
    createCards: function () {
        var size = cc.winSize;
        var unitSize = (size.height / 2 - 80) / 4;//2300.7179487179487  1280  unitSize: 140  unitSizeY: 110
        var unitSizeY = unitSize - 30;
        var originalX = (size.width - (unitSize * 4 + 15)) / 2 + 15;
        var originalY = (size.height - (unitSize * 4 + 15)) / 2 + 15;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var card = CardSprite.createCardSprite(0, unitSize, unitSize, unitSize * i + originalX, unitSize * j + originalY);
                this.cardArr[i][j] = card;
                this.addChild(card);
            }
        }

    },
    autoCreateCardNumber: function () {//生成随机的卡片2/4
        // while (1) {
        //     var i = Math.floor(Math.random() * 4);
        //     var j = Math.floor(Math.random() * 4);
        //     if (this.cardArr[i][j].getNumber == 0) {
        //         this.cardArr[i][j].setNumber(Math.floor(Math.random() * 10) < 1 ? 4 : 2);
        //         break;
        //     }
        //     if (!this.shouldCreateCardNumber()) {
        //         break;
        //     }
        // }
    },
    shouldCreateCardNumber: function () {
        var should = false;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.cardArr[i][j].getNumber() == 0) {
                    should = true;
                    break;
                }
            }
        }
        return should;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

