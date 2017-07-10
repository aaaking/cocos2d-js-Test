var EnterInsureAnim = cc.Node.extend({
    ctor:function (callback) {
        this._super();
       	this.callback = callback;
        this.initUI();
    },
    initUI:function(){
    	this.bgLayer_1 = new cc.Layer();
    	this.addChild(this.bgLayer_1);
    	this.bgLayer_1.setColor(cc.color(0,0,0,150));
    	this.bgLayer_1.setPosition(-display.cx,-display.cy);

    	this.bgLayer = new cc.LayerColor(cc.color(0,0,0,255), display.width, 100);
    	this.bgLayer.setPosition(-display.cx,-50);
    	this.addChild(this.bgLayer);

    	this.line_top = cc.Sprite.create("res/insure_enter_line.png");
    	this.line_top.setPosition(-display.cx,45);
    	this.line_top.setAnchorPoint(cc.p(1,0.5));
    	this.addChild(this.line_top);

    	this.line_bottom = cc.Sprite.create("res/insure_enter_line.png");
    	this.line_bottom.setPosition(display.cx,-45);
    	this.line_bottom.setAnchorPoint(cc.p(0,0.5));
    	this.addChild(this.line_bottom);

    	this.text_1 = cc.Sprite.create("res/insure_enter_text_1.png");
    	this.text_1.setPosition(-display.cx,0);
    	this.text_1.setAnchorPoint(cc.p(1,0.5));
    	this.addChild(this.text_1);

    	this.text_2 = cc.Sprite.create("res/insure_enter_text_2.png");
    	this.text_2.setPosition(display.cx,0);
    	this.text_2.setAnchorPoint(cc.p(0,0.5));
    	this.addChild(this.text_2);

    	this.bg_1 = cc.Sprite.create("res/insure_enter_bg_1.png");
    	this.bg_1.setPosition(0,0);
    	this.bg_1.setOpacity(0);
    	this.addChild(this.bg_1);

    	this.bg_2_1 = cc.Sprite.create("res/insure_enter_bg_2.png");
    	this.bg_2_1.setPosition(0,0);
    	this.bg_2_1.setVisible(false);
    	this.addChild(this.bg_2_1);

    	this.bg_2_2 = cc.Sprite.create("res/insure_enter_bg_2.png");
    	this.bg_2_2.setPosition(-933,0);
    	this.bg_2_2.setVisible(false);
    	this.addChild(this.bg_2_2);

	},
	enterAnimation:function(delay){
		var top_move = cc.moveBy(0.1, cc.p(display.cx, 0)).easing(cc.easeIn(2));
		var line_top_move = cc.moveBy(0.1, cc.p(display.width, 0)).easing(cc.easeOut(3));
		this.text_1.runAction(top_move);
		this.line_top.runAction(line_top_move);

		var bottom_move = cc.moveBy(0.1, cc.p(-display.cx, 0)).easing(cc.easeIn(2));
		var line_bottom_move = cc.moveBy(0.1, cc.p(-display.width, 0)).easing(cc.easeOut(3));
		this.text_2.runAction(bottom_move);
		this.line_bottom.runAction(line_bottom_move);

		var opac = cc.fadeTo(0.1, 255).easing(cc.easeOut(3));
		this.bg_1.runAction(opac);

	},
	leaveAnimation:function( delay ){
		this.scheduleOnce(function(){
			var top_move = cc.moveBy(0.2, cc.p(-display.cx, 0)).easing(cc.easeIn(2));
			var line_top_move = cc.moveBy(0.2, cc.p(-display.width, 0)).easing(cc.easeOut(3));
			this.text_1.runAction(top_move);
			this.line_top.runAction(line_top_move)

			var bottom_move = cc.moveBy(0.2, cc.p(display.cx, 0)).easing(cc.easeOut(2));
			var line_bottom_move = cc.moveBy(0.2, cc.p(display.width, 0)).easing(cc.easeOut(3))
			this.text_2.runAction(bottom_move);
			this.line_bottom.runAction(line_bottom_move);

			var opac = cc.fadeTo(0.2, 0).easing(cc.easeOut(3));
			this.bg_1.runAction(opac);
		}, delay)

		this.scheduleOnce(function(){
			this.removeFromParent();

			if (this.callback){
				this.callback()
			}
		}, delay + 0.3)
	},
	rollBg:function(delay){
		var init_pos = cc.p(-933, 0);
		var move = cc.moveBy(3, cc.p(933, 0));
		var delay_action = cc.delayTime(delay);

		var resetPos_1 = cc.callFunc(function(){
			this.bg_2_1.setPosition(init_pos)
		})

		var resetPos_2 = cc.callFunc(function(){
			this.bg_2_2.setPosition(init_pos)
		})

		this.bg_2_1.runAction(cc.repeatForever(cc.sequence(delay_action, move, resetPos_1, move.clone())))
		this.bg_2_2.runAction(cc.repeatForever(cc.sequence(delay_action.clone(), move.clone(), move.clone(), resetPos_2)))
	},

 	show:function(){
		this.bg_2_1.setVisible(true);
		this.bg_2_2.setVisible(true);

		this.enterAnimation(0);
		this.leaveAnimation(1);

		this.rollBg(0);

		return this;
	}
});





