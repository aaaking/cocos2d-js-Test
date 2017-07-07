var SnakeNode = cc.Sprite.extend({
    previousNode: null,//蛇身体的上一个节点，无的话表示是头部
    direction: 0,//1-上,2-下,3-左,4-右
    nextDirection: 0,//1-上,2-下,3-左,4-右
    ctor: function (previousNode, direction) {
        this._super();
        this.previousNode = previousNode;
        this.direction = direction;
        this.nextDirection = direction;
        this.init();
        return true;
    },

    init: function () {
        if (this.previousNode == null) {
            this.setTexture(res.head_up);
            switch (this.direction) {
                case 1:
                    this.setRotation(0);
                    break;
                case 2:
                    this.setRotation(180);
                    break;
                case 3:
                    this.setRotation(270);
                    break;
                case 4:
                    this.setRotation(90);
                    //this.setTexture(res.head_right);这样更改图片也行，图片太多会加载慢
                    break;
            }
        } else {
            this.setTexture(res.node);
            var previousX = this.previousNode.getPositionX();
            var previousY = this.previousNode.getPositionY();
            var previousWidth = this.previousNode.getContentSize().width;
            var previousHeight = this.previousNode.getContentSize().height;
            var width = this.width;
            var height = this.getContentSize().height;
            switch (this.previousNode.direction) {
                // 根据父关节的当前移动方向,决定此关节的位置
                case 1:// 上
                    this.setPosition(previousX, previousY - previousHeight / 2 - height / 2 - 1);
                    break;
                case 2:// 下
                    this.setPosition(previousX, previousY + previousHeight / 2 + height / 2 + 1);
                    break;
                case 3:// 左
                    this.setPosition(previousX + previousWidth / 2 + width / 2 + 1, previousY);
                    break;
                case 4:// 右
                    this.setPosition(previousX - previousWidth / 2 - width / 2 - 1, previousY);
                    break;
            }
        }
        return true;
    },
    move: function (layer) {
        var food = layer.food;
        var direct;
        if (this.previousNode == null) {
            direct = this.nextDirection;
        } else {
            this.nextDirection = direct = this.previousNode.direction;
        }
        switch (direct) {
            case 1:// 上
                this.setPosition(this.getPositionX(), this.getPositionY() + Constants.speed);
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(0, Constants.speed), 0))
                break;
            case 2:// 下
                this.setPosition(this.getPositionX(), this.getPositionY() - Constants.speed);
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(0, -Constants.speed), 0))
                break;
            case 3:// 左
                this.setPosition(this.getPositionX() - Constants.speed, this.getPositionY());
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(-Constants.speed, 0), 0))
                break;
            case 4:// 右
                this.setPosition(this.getPositionX() + Constants.speed, this.getPositionY());
                // this.runAction(cc.moveBy(Constants.frequency, cc.p(Constants.speed, 0), 0))
                break;
        }
        if (this.previousNode == null) {
            switch (this.nextDirection) {
                case 1:
                    this.setRotation(0);
                    break;
                case 2:
                    this.setRotation(180);
                    break;
                case 3:
                    this.setRotation(270);
                    break;
                case 4:
                    this.setRotation(90);
                    //this.setTexture(res.head_right);这样更改图片也行，图片太多会加载慢
                    break;
            }
            // 头部关节判断是否触碰到边界
            var size = cc.winSize;
            if ((this.getPositionX() > size.width - this.width / 2)
                || (this.getPositionX() < this.width / 2)
                || (this.getPositionY() > size.height - this.height / 2)
                || (this.getPositionY() < this.height / 2)) {
                // 判断触碰边界
                cc.log("触碰边界");
                return false;
            }
            for (var index in layer.nodes) {
                if (layer.nodes[index] != this && cc.rectIntersectsRect(this.getBoundingBox(), layer.nodes[index].getBoundingBox())) {
                    // 判断是否触碰到自己身体关节
                    cc.log("触碰到自己身体关节");
                    return false;
                }
            }
            // 判断是否吃到星星
            if (food != null) {
                if (cc.rectIntersectsRect(this.getBoundingBox(), food.getBoundingBox())) {
                    food.runAction(
                        cc.sequence(cc.spawn(
                            cc.scaleTo(0.2, 3),
                            cc.fadeOut(0.2)
                        ), cc.callFunc(function (food) {
                            food.removeFromParent();
                        }, food))
                    );
                    // 清除星星
                    layer.food = null;
                    // 添加身体
                    layer.canNewNode = 1;
                    // 改变分数
                    layer.score.setString("" + (Number(layer.score.getString()) + Math.round(Math.random() * 3 + 1)));
                    layer.score.runAction(cc.sequence(cc.scaleTo(0.1, 2), cc.scaleTo(0.1, 0.5), cc.scaleTo(0.1, 1)));
                }
            }
        }
        return true;
    }
});