var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
    nodes: [],
    tail: null,// snake tail
    food: null,// star
    canNewNode: 0,// 0-无,1-有
    score: null,// 分数Label
    ctor: function () {
        this._super();
        this.init();
        return true;
    },

    init: function () {
        //背景
        var bg = new cc.LayerGradient(cc.color(85, 142, 139, 100), cc.color(6, 31, 33, 100), cc.p(0, 0));
        this.addChild(bg);
        //头
        var head = new SnakeNode(null, 4);
        head.setPosition(300, 300);
        this.addChild(head);
        this.nodes.push(head);
        head.setTag(1);
        this.tail = head;
        // 循环添加5个节点
        for (var i = 0; i < 5; i++) {
            var node = new SnakeNode(this.tail, this.tail.direction);
            this.addChild(node);
            this.nodes.push(node);
            this.tail = node;
        }
        // 分数
        this.score = new cc.LabelTTF("0", "", 45);
        this.score.setPosition(this.score.width / 2 + 20, cc.winSize.height - this.score.height - 10);
        this.addChild(this.score);
        // this.schedule(this.snakeMove, Constants.frequency);
        // this.schedule(this.updateStar);
    }
});