var controlWidth = 270;
var ControlLayer = cc.Layer.extend({
    up: null,
    right: null,
    down: null,
    left: null,
    ctor: function () {
        this._super();
        this.init();
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
        this.addChild(this.up);
        //右箭头
        this.right = new cc.Sprite(res.control_arrow);
        this.right.setRotation(90);//旋转后宽高不变
        this.right.setPosition(controlWidth / 2 - this.right.height / 2, 0);
        this.addChild(this.right);
        //下箭头
        this.down = new cc.Sprite(res.control_arrow);
        this.down.setRotation(180);//旋转后宽高不变
        this.down.setPosition(0, -controlWidth / 2 + this.down.height / 2);
        this.addChild(this.down);
        //左箭头
        this.left = new cc.Sprite(res.control_arrow);
        this.left.setRotation(270);//旋转后宽高不变
        this.left.setPosition(-controlWidth / 2 + this.right.height / 2, 0);
        this.addChild(this.left);
    }
});