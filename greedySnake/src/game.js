var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
    nodes: [],
    head: null,
    tail: null,// snake tail
    food: null,// food
    canNewNode: 0,// 0-无,1-有
    score: null,// 分数Label
    controlLayer: null,
    ctor: function () {
        this._super();
        this.init();
        this.initPauseItem();
        this.initControl();
        return true;
    },

    init: function () {
        //背景
        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg);
        //头
        this.head = new SnakeNode(null, 4);
        this.head.setPosition(200, 300);
        this.addChild(this.head);
        this.nodes.push(this.head);
        this.head.setTag(1);
        this.tail = this.head;
        // 循环添加5个节点
        for (var i = 0; i < 2; i++) {
            var node = new SnakeNode(this.tail, this.tail.direction);
            this.addChild(node);
            this.nodes.push(node);
            this.tail = node;
        }
        // 分数
        this.score = new cc.LabelTTF("0", "", 45);
        this.score.setPosition(this.score.width / 2 + 40, cc.winSize.height - this.score.height / 2 - 10);
        this.addChild(this.score);
        this.schedule(this.snakeMove, Constants.frequency);
        this.schedule(this.updateStar);
    },

    initPauseItem: function () {
        var pause = new cc.MenuItemFont("Pause", function () {
            if (cc.director.isPaused()) {
                pause.setString("Pause");
                cc.director.resume();
            } else {
                pause.setString("Continue");
                cc.director.pause();
            }
        }, this);
        pause.setFontSize(30);
        pause.setColor(cc.color(255, 255, 255));
        var menu = new cc.Menu(pause);
        menu.setPosition(pause.width / 2 + 40, this.score.getPositionY() - pause.height / 2 - this.score.height / 2 - 5);
        this.addChild(menu);
    },

    initControl: function () {
        this.controlLayer = new ControlLayer();
        this.addChild(this.controlLayer);
    },
    snakeMove: function () {
        for (var index in this.nodes) {
            // 循环执行移动方法,并返回移动结果,false即视为游戏结束
            if (!this.nodes[index].move(this)) {
                // 执行移动方法,移动失败,游戏结束
                this.unschedule(this.snakeMove);
                this.unschedule(this.updateStar);
                var gameOverScene = new GameOverScene(Number(this.score.getString()), false);
                cc.director.runScene(new cc.TransitionFade(1, gameOverScene));
            }
        }
        for (var index in this.nodes) {
            // 本轮所有关节移动结束,所有节点的当前方向赋值为下一次的方向
            this.nodes[index].direction = this.nodes[index].nextDirection;
        }
        if (this.canNewNode == 1) {
            // 如果新增关节为1,增加关节
            var node = new SnakeNode(this.tail, this.tail.direction);
            this.addChild(node);
            this.nodes.push(node);
            this.tail = node;
            this.canNewNode = 0;
        }
    },
    updateStar: function () {
        if (this.food == null) {
            this.food = new cc.Sprite(res.food);
            var randomX = Math.random() * (cc.winSize.width - this.food.width) + this.food.width;
            var randomY = Math.random() * (cc.winSize.height - this.food.width) + this.food.height;
            this.food.setPosition(randomX, randomY);
            this.addChild(this.food);
            // 产生的星星只要在屏幕外,或与蛇的身体部分重叠,则本次任务不产生
            if ((randomX > cc.winSize.width - this.food.width / 2)
                || (randomX < this.food.width / 2)
                || (randomY > cc.winSize.height - this.food.height / 2)
                || (randomY < this.food.height / 2)) {
                cc.log("update food:out of screen");
                this.removeChild(this.food);
                this.food = null;
                return;
            }
            for (var index in this.nodes) {
                if (cc.rectIntersectsRect(this.nodes[index].getBoundingBox(), this.food.getBoundingBox())) {
                    cc.log("update food:intersect with self");
                    this.removeChild(this.food);
                    this.food = null;
                    return;
                }
            }
        }
    },
    changeDirection: function (direction) {
        var sum = this.head.nextDirection + direction;//3表示上下更改方向，7表示左右更改方向，这两种情况不考虑或者认为gameOver
        if (sum == 3 || sum == 7) {
            return;
        }
        this.head.nextDirection = direction;
    }
});