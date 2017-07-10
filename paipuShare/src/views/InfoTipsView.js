var InfoTipsView = cc.Node.extend({

	ctor:function(text,btnText){
		this._super();
		this.initUI(text,btnText);
	},

	newNormalLable:function(text){
		var label = new cc.LabelTTF(text, "Arial", 36);
		return label;
	},

	newPressedLable:function(text){
		var label = new cc.LabelTTF(text, "Arial", 36);
		lable.color = cc.color(168,168,168);
		return label 
	},

	initUI:function(text,btnText){
		var touchLayer = new cc.Layer();
		this.addChild(touchLayer);
		touchLayer.setTouchEnabled(true);
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchCancelled
        }, touchLayer);

        var bg = cc.Sprite.create("res/alerter_bg.png");
       
       	this.textLabel = new cc.LabelTTF(text,"Arial", 32, cc.size(450, 300), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
       	this.textLabel.setAnchorPoint(cc.p(0.5,0.5));
       	this.textLabel.setPosition(cc.p(ALERTER_WIDTH*0.5,LABEL_POS_Y));
        bg.addChild(this.textLabel);

	}
})