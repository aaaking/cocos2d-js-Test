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
        this.loadListener();
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
        this.autoCreateCardNumber(2);
        this.loadListener();
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
    autoCreateCardNumber: function (timesP) {//生成随机的卡片2/4
        var times = 0;
        while (times < timesP) {
            var i = Math.floor(Math.random() * 4);
            var j = Math.floor(Math.random() * 4);
            if (this.cardArr[i][j].getNumber() == 0) {
                this.cardArr[i][j].setNumber(Math.floor(Math.random() * 10) < 1 ? 4 : 2);
                times++;
            }
        }
    },
    shouldCreateCardNumber: function () {// 判断是否需要自动生成新的卡片
        var should = false;
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                if (this.cardArr[i][j].getNumber() == 0) {
                    should = true;
                    break;
                }
            }
        }
        return should;
    },
    loadListener: function () {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    onTouchBegan: function (touch, event) {
        var self = this.target;
        var touchPoint = touch.getLocation();
        self.firstX = touchPoint.x;
        self.firstY = touchPoint.y;
        var locationInNode = self.convertToNodeSpace(touchPoint);
        var size = self.getContentSize();
        var rect = cc.rect(0, 0, size.width, size.height);
        if (!cc.rectContainsPoint(rect, locationInNode)) {
            return false;
        }
        //触摸处理
        // self.onTouchDispose();
        return true;
    },
    onTouchMoved: function (touch, event) {
        var self = this.target;
        var pos = touch.getLocation();
    },
    onTouchEnded: function (touch, event) {
        var self = this.target;
        var touchPoint = touch.getLocation();
        var offsetX = self.firstX - touchPoint.x;
        var offsetY = self.firstY - touchPoint.y;
        self.onTouchDispose(offsetX, offsetY);
    },
    onTouchDispose: function (offsetX, offsetY) {
        if (Math.abs(offsetX) > Math.abs(offsetY)) {
            if (offsetX > 5) {
                if (!this.canDoLeft()) {
                    return;
                }
                this.doLeft();
                this.checkGameOver();
                this.setScore(this.score);
            } else if (offsetX < -5) {
                if (!this.canDoRight()) {
                    return;
                }
                this.doRight();
                this.checkGameOver();
                this.setScore(this.score);
            }
        } else {
            if (offsetY > 5) {
                if (!this.canDoDown()) {
                    return;
                }
                this.doDown();
                this.checkGameOver();
                this.setScore(this.score);
            } else if (offsetY < -5) {
                if (!this.canDoUp()) {
                    return;
                }
                this.doUp();
                this.checkGameOver();
                this.setScore(this.score);
            }
        }
    },
    //向上----------------------------------------------------------------------------------------
    canDoUp: function () {
        var can = false;
        for (var x = 0; x < 4; ++x) {
            for (var y = 3; y >= 1; --y) {
                if (this.cardArr[x][y].getNumber() == 0 &&  this.cardArr[x][y-1].getNumber() > 0) {
                    can = true;
                    return can;
                }
                if (this.cardArr[x][y].getNumber() > 0 && this.cardArr[x][y].getNumber() == this.cardArr[x][y - 1].getNumber()) {
                    can = true;
                    return can;
                }
            }
        }
        return can;
    },
    doUp: function () {
        var isdo = false;
        for (var x = 0; x < 4; ++x) {
            for (var y = 3; y >= 0; --y) {
                for (var y1 = y - 1; y1 >= 0; --y1) {
                    if (this.cardArr[x][y1].getNumber() > 0) {
                        if (this.cardArr[x][y].getNumber() <= 0) {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            ++y;
                            isdo = true;
                        } else if (this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber()) {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber() * 2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    //向下----------------------------------------------------------------------------------------
    canDoDown: function () {
        var can = false;
        for (var x = 0; x < 4; ++x) {
            for (var y = 0; y < 3; ++y) {
                if (this.cardArr[x][y].getNumber() == 0 &&  this.cardArr[x][y+1].getNumber() > 0) {
                    can = true;
                    return can;
                }
                if (this.cardArr[x][y].getNumber() > 0 && this.cardArr[x][y].getNumber() == this.cardArr[x][y+1].getNumber()) {
                    can = true;
                    return can;
                }
            }
        }
        return can;
    },
    doDown: function () {
        var isdo = false;
        for (var x = 0; x < 4; ++x) {
            for (var y = 0; y < 4; ++y) {
                for (var y1 = y + 1; y1 < 4; ++y1) {
                    if (this.cardArr[x][y1].getNumber() > 0) {
                        if (this.cardArr[x][y].getNumber() <= 0) {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y1].getNumber());
                            this.cardArr[x][y1].setNumber(0);
                            --y;
                            isdo = true;
                        } else if (this.cardArr[x][y].getNumber() == this.cardArr[x][y1].getNumber()) {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber() * 2);
                            this.cardArr[x][y1].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    //向左----------------------------------------------------------------------------------------
    canDoLeft: function () {
        var can = false;
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 3; ++x) {
                if (this.cardArr[x][y].getNumber() == 0 &&  this.cardArr[x + 1][y].getNumber() > 0) {
                    can = true;
                    return can;
                }
                if (this.cardArr[x][y].getNumber() > 0 && this.cardArr[x][y].getNumber() == this.cardArr[x + 1][y].getNumber()) {
                    can = true;
                    return can;
                }
            }
        }
        return can;
    },
    doLeft: function () {
        var isdo = false;
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                for (var x1 = x + 1; x1 < 4; ++x1) {
                    if (this.cardArr[x1][y].getNumber() > 0) {
                        if (this.cardArr[x][y].getNumber() <= 0) {
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            --x;
                            isdo = true;
                        } else if (this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber()) {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber() * 2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    //向右----------------------------------------------------------------------------------------
    canDoRight: function () {
        var can = false;
        for (var y = 0; y < 4; ++y) {
            for (var x = 3; x >= 1; --x) {
                if (this.cardArr[x][y].getNumber() == 0 &&  this.cardArr[x - 1][y].getNumber() > 0) {
                    can = true;
                    return can;
                }
                if (this.cardArr[x][y].getNumber() > 0 && this.cardArr[x][y].getNumber() == this.cardArr[x - 1][y].getNumber()) {
                    can = true;
                    return can;
                }
            }
        }
        return can;
    },
    doRight: function () {
        var isdo = false;
        for (var y = 0; y < 4; ++y) {
            for (var x = 3; x >= 0; --x) {
                for (var x1 = x - 1; x1 >= 0; --x1) {
                    if (this.cardArr[x1][y].getNumber() > 0) {
                        if (this.cardArr[x][y].getNumber() <= 0) {
                            this.cardArr[x][y].setNumber(this.cardArr[x1][y].getNumber());
                            this.cardArr[x1][y].setNumber(0);
                            ++x;
                            isdo = true;
                        } else if (this.cardArr[x][y].getNumber() == this.cardArr[x1][y].getNumber()) {
                            this.cardArr[x][y].setNumber(this.cardArr[x][y].getNumber() * 2);
                            this.cardArr[x1][y].setNumber(0);
                            this.score += this.cardArr[x][y].getNumber();  //增加分数
                            isdo = true;
                        }
                        break;
                    }
                }
            }
        }
        return isdo;
    },
    setScore: function (s) {
        this.scoreLabel.setString(s);
    },
    checkGameOver: function () {
        var size = cc.winSize;
        var isGameOver = true;
        for (var y = 0; y < 4; ++y) {
            for (var x = 0; x < 4; ++x) {
                if (this.cardArr[x][y].getNumber() == 0 ||
                    (x > 0 && (this.cardArr[x][y].getNumber() == this.cardArr[x - 1][y].getNumber())) ||
                    (x < 3 && (this.cardArr[x][y].getNumber() == this.cardArr[x + 1][y].getNumber())) ||
                    (y > 0 && (this.cardArr[x][y].getNumber() == this.cardArr[x][y - 1].getNumber())) ||
                    (y < 3 && (this.cardArr[x][y].getNumber() == this.cardArr[x][y + 1].getNumber()))) {
                    isGameOver = false;
                }
            }
        }
        if (isGameOver) {
            this.gameOverLayer = cc.LayerColor(new cc.color(0, 0, 0, 100), null, null);
            var labelGameOver = new cc.LabelTTF("GameOver!!!", "Arial", 60);
            labelGameOver.setPosition(size.width / 2, size.height / 2);
            this.gameOverLayer.addChild(labelGameOver);
            this.getParent().addChild(this.gameOverLayer, 1);
            this.scheduleOnce(this.removeGameOverLayer, 2);
        } else {
            if (this.shouldCreateCardNumber()) {
                this.autoCreateCardNumber(1);//随机生成一个卡片
            }
        }
        if (this.isWin()) {
            this.gameWinLayer = cc.LayerColor(new cc.color(0, 0, 0, 100), null, null);
            var labelGameWin = new cc.LabelTTF("You win!!!", "Arial", 60);
            labelGameWin.setPosition(size.width, size.height);
            this.gameWinLayer.addChild(labelGameWin);
            this.getParent().addChild(this.gameWinLayer, 1);
            this.scheduleOnce(this.removeGameWinLayer, 4);
        }
    },
    isWin: function () {
        var Win = false;
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                if (this.cardArr[i][j].getNumber() >= 2048) {
                    Win = true;
                    break;
                }
            }
        }
        return Win;
    },
    removeGameOverLayer: function () {
        this.gameOverLayer.removeFromParent();
        cc.director.replaceScene(cc.TransitionFade(1, new HelloWorldScene()));
    },
    removeGameWinLayer: function () {
        this.gameWinLayer.removeFromParent();
        cc.director.replaceScene(cc.TransitionFade(1, new HelloWorldScene()));
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

