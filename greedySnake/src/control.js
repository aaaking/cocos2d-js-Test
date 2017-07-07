var controlWidth = 270;
var ControlLayer = cc.Layer.extend({
    up: null,
    right: null,
    down: null,
    left: null,
    ctor: function () {
        this._super();
        this.init();
        this.loadListener();
        return true;
    },
    init: function () {
        //背景
        var bg = new cc.Sprite(res.control_pole_bg);
        bg.setScale(controlWidth / bg.width);
        this.addChild(bg);
        this.setContentSize(controlWidth, controlWidth);
        this.setPosition(controlWidth / 2 + 10, controlWidth / 2 + 15);
        //上箭头
        this.up = new cc.Sprite(res.control_arrow);
        this.up.setPosition(0, controlWidth / 2 - this.up.height / 2);
        this.up.setTag(1);
        this.addChild(this.up);
        //右箭头
        this.right = new cc.Sprite(res.control_arrow);
        this.right.setRotation(90);//旋转后宽高不变
        this.right.setPosition(controlWidth / 2 - this.right.height / 2, 0);
        this.right.setTag(4);
        this.addChild(this.right);
        //下箭头
        this.down = new cc.Sprite(res.control_arrow);
        this.down.setRotation(180);//旋转后宽高不变
        this.down.setPosition(0, -controlWidth / 2 + this.down.height / 2);
        this.down.setTag(2);
        this.addChild(this.down);
        //左箭头
        this.left = new cc.Sprite(res.control_arrow);
        this.left.setRotation(270);//旋转后宽高不变
        this.left.setPosition(-controlWidth / 2 + this.right.height / 2, 0);
        this.left.setTag(3);
        this.addChild(this.left);
    },
    loadListener: function () {
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    onTouchBegan: function (touch, event) {
        var target = this.target;
        var position = touch.getLocation();
        var locationUp = target.up.convertToNodeSpace(position);
        var locationRight = target.right.convertToNodeSpace(position);
        var locationDown = target.down.convertToNodeSpace(position);
        var locationLeft = target.left.convertToNodeSpace(position);
        var rectUpDown = cc.rect(0, 0, target.up.width, target.up.height);
        var rectLeftRight = cc.rect(0, 0, target.up.height, target.up.width);
        if (cc.rectContainsPoint(rectUpDown, locationUp)) {
            target.scaleItem(target.up);
        } else if (cc.rectContainsPoint(rectUpDown, locationDown)) {
            target.scaleItem(target.down);
        } else if (cc.rectContainsPoint(rectLeftRight, locationLeft)) {
            target.scaleItem(target.left);
        } else if (cc.rectContainsPoint(rectLeftRight, locationRight)) {
            target.scaleItem(target.right);
        }
        return true;
    },
    onTouchEnded: function (touch, event) {
        var target = this.target;
        var position = touch.getLocation();
        var locationUp = target.up.convertToNodeSpace(position);
        var locationRight = target.right.convertToNodeSpace(position);
        var locationDown = target.down.convertToNodeSpace(position);
        var locationLeft = target.left.convertToNodeSpace(position);
        var rectUpDown = cc.rect(0, 0, target.up.width, target.up.height);
        var rectLeftRight = cc.rect(0, 0, target.up.height, target.up.width);
        if (cc.rectContainsPoint(rectUpDown, locationUp)) {
            target.getParent().changeDirection(target.up.getTag());
        } else if (cc.rectContainsPoint(rectUpDown, locationDown)) {
            target.getParent().changeDirection(target.down.getTag());
        } else if (cc.rectContainsPoint(rectLeftRight, locationLeft)) {
            target.getParent().changeDirection(target.left.getTag());
        } else if (cc.rectContainsPoint(rectLeftRight, locationRight)) {
            target.getParent().changeDirection(target.right.getTag());
        }
    },
    scaleItem: function (item) {
        if (item.isAnimating) {
            return;
        }
        item.isAnimating = true;
        var scaleBig = cc.ScaleBy.create(0.2, 1.2);
        var scaleSmall = cc.ScaleBy.create(0.2, 1 / 1.2);
        var seq = cc.Sequence.create(scaleBig, scaleSmall, cc.CallFunc.create(function () {
            item.isAnimating = false;
        }));
        item.runAction(seq);
    }
});