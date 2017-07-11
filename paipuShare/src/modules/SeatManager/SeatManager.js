var self
var player
var user = app.userInfo
var betLayout = TableLayout.betLayout
var bubbleLayout = TableLayout.bubbleLayout
var handCardsLayout = TableLayout.handCardsLayout
var POOL_CARDS_POS 

var WIN_ANIM_ZORDER = 3

var BUBBLE_BET_X = 52
var BUBBLE_BET_Y = 33

var BUBBLE_INSURE_X = 52
var BUBBLE_INSURE_Y = 33

var BUBBLE_ADD_TIME_X = 52
var BUBBLE_ADD_TIME_Y = 33
var  balanceStr = function(balance) {
	var color, text
	if (balance < 0) {
		text = balance.toString();
		color = cc.color(130, 188, 237);
	}else if (balance > 0) {
		text = "+" + balance;
		color = cc.color(211, 118, 12);
	}else {
		text = balance.toString();
		color = cc.color(211, 118, 12);
	}

	return text, color
}

var SeatManager = cc.Node.extend({
	ctor:function (seatid){
		this._super();
		self = this;
		POOL_CARDS_POS = cc.p(display.cx, 585);
		this.seatid = seatid;
		this.updatePosition(seatid);
		this.seat = new SeatView(seatid);
		this.addChild(this.seat);
		// this.emoticon_state = SeatManager.EMOTICON_IDLE;
	},
	betPos:function() {
		if (dzglobal.checkSeatid(app.userInfo.seatid) && this.seatid == app.userInfo.seatid-1) {
			return cc.p(100, 185)
		}

		if (app.GameTable.maxSeatsCnt == 9) {
			if (this.position == 4) {
				return cc.p(70, -50)
			}

			if (this.position == 5) {
				return cc.p(-70, -50)
			}
		}

		if (this.position == 0) {
			return cc.p(0, 120)
		} else if (this.position == app.GameTable.maxSeatsCnt * 0.5) {
			return cc.p(0, -120)
		} else if (this.align == SeatManager.ALIGN_LEFT) {
			return cc.p(80, 0)
		} else if (this.align == SeatManager.ALIGN_RIGHT) {
			return cc.p(-80, 0)
		}
	},
	seatAlignment : function() {
		if (this.position <= app.GameTable.maxSeatsCnt * 0.5 ) {
			this.align = SeatManager.ALIGN_LEFT
		} else {
			this.align = SeatManager.ALIGN_RIGHT
		}
	},
	updateSeat : function(view,p) {
		var posX = view.getPositionX();
		var posY = view.getPositionY();
		var parent = view.getParent();
		view.removeFromParent();
		if (!p) {
			if (global.checkSeatid(user.seatid)) {
				view = SeatView.new();
				view.changeToEmptySeat();
			} else {
				view = SeatView.new();
				view.changeToSitdown();
			}
		} else {
			if (user.uid == p.uid) {
				view = SelfPlayerView(p);
			} else {
				view = OtherPlayerView(p);
			}
		}
		view.setPosition(cc.p(posX, posY));
		parent.addChild(view);
		return view
	},
	removePlayer : function() {
		if (!this.player) {
			return;
		}
		this.playerInfo = null;
		this.player.removeFromParent();
		this.player = null;
	},
	removePlayer : function() {
		if (!this.player) {
			return;
		}
		this.playerInfo = null;
		this.player.removeFromParent();
		this.player = null;
	},

	changeToSeat : function() {
		var pos = cc.p(0, 0);
		if (this.player) {
			var x = this.player.avatar.getPositionX();
			var y = this.player.avatar.getPositionY();
			pos = cc.p(x, y);
			this.removePlayer();
		}

		if (dzglobal.checkSeatid(user.seatid)) {
			this.seat.changeToEmptySeat();
		} else {
			this.seat.changeToSitdown();
		}
		this.seat.view.setPosition(pos);
		this.seat.view.runAction(cc.moveTo(0.5, cc.p(0, 0)));

	},

	changeToPlayer : function(p) {
		if (this.player) {
			this.removePlayer();
		}
		//console.info(p);
		this.playerInfo = p;
		this.seat.setVisible(false);

		if (user.uid == p.uid) {
			this.player = new SelfPlayerView(p);
			this.addChild(this.player);
			if (this.showCardsListener) {
				this.player.onShowCardListener(this.showCardsListener);
			}
		} else {
			this.player = new OtherPlayerView(p);
			this.addChild(this.player);
		}
		this.player.updatePosition(this.position);

		if (p.premium && p.premium > 0) {
			this.player.setBetView(SeatManager.COIN_NAME, p.premium, this.betPos());
		} else if (p.bet && p.bet > 0) {
			var image = SeatManager.CHIP_NAME;
			this.player.setBetView(image, p.bet, this.betPos());
		}

		this.player.initHandCardsView(handCardsLayout[this.position]);
		this.setDealCardsPos(POOL_CARDS_POS);

		if (p.playing && p.fold) {
			this.player.darkAvatar();
			if (user.uid == p.uid) {
				var signal = this.align - 2;
				var x = signal * BUBBLE_BET_X;
				this.player.showBubble(SeatManager.BUBLLE_FOLD, x, BUBBLE_BET_Y, this.align);
			}
		} else {
			this.player.normalAvatar();
		}
		//if (app.gameMode == 1) {
		//	if (p.matchKickout) {
		//		this.player.showMatchOver(p.ranking);
		//	} else if (user.uid == p.uid && app.GameTable.isTableStart) {
		//		this.player.updateRanking(p.ranking)
		//	}
		//}
		self = this;
	},
	updatePosition : function(position,ani) {
		this.position = position;
		var align = this.align;
		this.seatAlignment()
		//if (position > 5) {
		//	this.align = SeatManager.ALIGN_RIGHT;
		//} else {
		//	this.align = SeatManager.ALIGN_LEFT;
		//}
		if (this.player) {
			this.player.updatePosition(position);
			this.setDealCardsPos(POOL_CARDS_POS);
			if (this.player.betView) {
				var pos = betLayout[position];
				this.player.betView.runAction(cc.moveTo(0.5, pos));
			}
			if (this.playerInfo.handCards && this.playerInfo.handCards.length > 2) {
				this.player.updateHandCardsPos(cc.p(0, 0));
			} else {
				this.player.updateHandCardsPos(handCardsLayout[position]);
			}
			if (this.player.bubble_name && align != this.align) {
				this.showBubbleBaseName(this.player.bubble_name);
			}
		}
	},

	setDealCardsPos : function(pos) {
		if (!this.player) {
			return;
		}
		pos = this.convertToNodeSpace(pos);
		this.player.setDealCardsPos(pos);
	},

	setGoldView : function() {
		if (!this.playerInfo || !this.player) {
			return;
		}
		this.player.setGoldView(this.playerInfo.gold);
	},

	showHandCards : function (callback) {
		if (!this.playerInfo || !this.playerInfo.handCards
			|| this.playerInfo.handCards.length <= 0 || this.playerInfo.uid == user.uid) {
			if (callback) {
				callback();
			}
			return;
		}
		if (this.player) {
			this.player.removeBubble();
			if (!this.player.handCardsView) {
				this.player.initHandCardsView(handCardsLayout[this.position]);
			}
			var cardViews = this.player.handCardsView.getCardViews();
			if (!cardViews || cardViews.length < 2) {
				this.player.initHandCardsView(handCardsLayout[this.position]);
				for (var i = 1; i < 2; i++) {
					this.player.dealCards(null, i, false);
				}
			}
			this.player.showHandCards(this.playerInfo.handCards, callback);
		}
	},

	dealCards : function(index, anim) {
		if (!this.playerInfo || !this.player) return

		if (index == 0) {
			this.player.initHandCardsView(handCardsLayout[this.position]);
			this.setDealCardsPos(POOL_CARDS_POS);

			if (user.uid == this.playerInfo.uid) {
				this.player.avatarMove(anim);
				this.player.hideNicknameView();
			}
		}
		//console.info(this.playerInfo.handCards);
		if (this.playerInfo.handCards) {
			this.player.dealCards(this.playerInfo.handCards[index], index, anim);
		} else {
			this.player.dealCards(null, index, anim);
		}
	},

	playerFold : function() {
		if (this.player && this.playerInfo) {
			this.playerInfo.fold = true;
			this.player.foldAnim();
			this.player.darkAvatar();
		}
	},

	betAnim : function(sprite, bet, callback) {
		if (!this.player) return

		var pos = this.betPos();
		var num = 1;
		var time = 0.3;

		this.chipsMoveAnim(sprite, cc.p(0, 0), pos, time, num, function () {
			var pos = this.betPos();
			this.player.setBetView(sprite, bet, pos);

			if (callback) {
				this.player.scheduleOnce(callback, 0.7);
			}
		}.bind(this))
	},


	hideGoldView : function() {
		if (!this.player || !this.player.goldView) {
			return
		}

		this.player.goldView.setVisible(false);
	},

	showGoldView : function() {
		if (!this.player || !this.player.goldView) {
			return;
		}
		this.player.goldView.setVisible(true);
	},
	playerBet : function( callback, start ) {
		if (!this.player) return

		this.playerInfo.bet = this.playerInfo.bet || 0;
		this.player.uiBet = this.player.uiBet || 0;
		if (this.playerInfo.bet > this.player.uiBet) {
			this.player.setGoldView(this.playerInfo.gold);

			var image = SeatManager.CHIP_NAME;
			if (start) {
				image = this.chipName();
			}
			//console.log("playerbet" + image);
			this.betAnim(image, this.playerInfo.bet, callback)
		} else if (callback) {
			this.player.scheduleOnce(callback, 1.0);
		}
	},
	hideCoinView : function() {
		if (!this.player || !this.player.coinView) {
			return
		}

		this.player.hideCoinView();
	},
	coinsMoveAnim : function( began, ended, bonus, callback ) {
		this.animation_coins = [];

		this.chipsMoveAnim(SeatManager.COIN_NAME, began, ended, 0.5, 5, function () {
			this.setGoldView();
			this.winLabelAnim(bonus);
			if (callback) {
				callback()
			}
		}.bind(this))
	},
	otherWinAnim : function () {

		if (!this.playerInfo || this.playerInfo.uid == user.uid) {
			return
		}

		var win = ccs.csLoader.createNode("res/other_win.json");
		this.addChild(win, WIN_ANIM_ZORDER);
		var action = ccs.load("res/other_win.json")
		win.runAction(action.action);
		action.action.gotoFrameAndPlay(0, false);
		action.action.setLastFrameCallFunc(function () {
			var particle = new cc.ParticleSystem("res/yingpai.plist");
			this.addChild(particle, WIN_ANIM_ZORDER);
			this.scheduleOnce(function () {
				win.removeFromParent();
				particle.removeFromParent();
			}, 1.5)
		}.bind(this))
	},

	winLabelAnim : function( bonus, callback ) {
		var duration = 0.4;

		var text, color = balanceStr(bonus);

		this.win_label = new cc.LabelTTF(text, "Arial", 30);
		this.win_label.setColor(color);
		this.win_label.setAnchorPoint(cc.p(0.5, 0.5));
		this.win_label.setPosition(0, 60);
		this.win_label.setScale(0.5);
		this.addChild(this.win_label);

		var scale = cc.scaleTo(0.4, 1.0);
		var move = (cc.moveBy(duration, cc.p(0, 50))).easing(cc.easeOut(2));
		var opac = cc.fadeIn(duration);
		var spawn = cc.spawn(move, opac, scale);
		var delay = cc.delayTime(1.0);
		var fadeout = cc.fadeOut(0.5);
		var callF = cc.callFunc(function () {
			this.win_label.removeFromParent();
			this.win_label = null
			if (callback) {
				callback()
			}
		}.bind(this))

		this.win_label.runAction(cc.sequence(spawn, delay, fadeout, callF));
	},
	btnPos : function() {
		var x, y
		if (dzglobal.checkSeatid(app.userInfo.seatid) && this.seatid == app.userInfo.seatid) {
			y = 65;
		} else {
			y = -65;
		}

		if (app.GameTable.maxSeatsCnt == 9 && this.position == 5) {
			x = -75;
		} else if (app.GameTable.maxSeatsCnt == 9 && this.position == 6) {
			x = 75;
		} else if (this.align == SeatManager.ALIGN_LEFT) {
			x = 75;
		} else if (this.align == SeatManager.ALIGN_RIGHT) {
			x = -75;
		}

		return [x, y]
	},
	chipsMoveAnim : function(sprite, began, ended, time, num, callback ) {

		this.animation_chips = this.animation_chips || [];

		for (var i = 0; i < num; i++) {
			(function (idx) {
				var chip = cc.Sprite.create("res/chip.png");
				chip.setPosition(began);
				this.addChild(chip);
				var delay = num * 0.04;
				var duration = time - delay;
				var delay = cc.delayTime(delay);
				var move = (cc.moveTo(duration, ended)).easing(cc.easeOut(2.5));
				var callF = cc.callFunc(function () {
					chip.removeFromParent();


					if (idx == 0 && callback) {
						callback();
					}
				}.bind(this))
				var seq = cc.sequence(delay, move, callF)

				chip.runAction(seq)
			}).bind(this)(i);
		}
	},

	collectBetAnim : function(pos, callback ) {
		var num = 5;
		var time = 0.5;
		if (!this.player || !this.player.uiBet || this.player.uiBet == 0) {
			if (callback) {
				this.scheduleOnce(callback, time)
			}
			return
		}

		if (this.player) {
			this.player.setBetView(null, 0, this.betPos())
		}

		var image = SeatManager.CHIP_NAME;

		this.chipsMoveAnim(image,this.betPos(), pos, time, num, callback)
	},

	removeCardType : function() {
		if (!this.typeLabel) return
		this.typeLabel.removeFromParent();
		this.typeLabel = null;
	},

	showCardType : function( handCards, poolCards ) {
		if (!this.typeLabel) {
			this.typeLabel = new CardTypeView()
			this.typeLabel.updateType(handCards, poolCards);
			this.typeLabel.setBg("res/card_type_bg.png");
			this.addChild(this.typeLabel);
			this.typeLabel.setPosition(0, 65);
			this.typeLabel.setScale(0.7);
		} else {
			this.typeLabel.updateType(handCards, poolCards);
		}
	},

	showBubbleBaseName : function( name ) {
		if (!name || !this.player) {
			return
		}

		var maxBetBubble = Math.max(SeatManager.BUBLLE_CHECK,
			SeatManager.BUBLLE_CALL,
			SeatManager.BUBLLE_RAISE,
			SeatManager.BUBLLE_ALLIN,
			SeatManager.BUBLLE_FOLD
		)
		var maxInsureBubble = Math.max(SeatManager.BUBLLE_GIVE_UP,
			SeatManager.BUBLLE_BUY_IN)

		var signal = this.align - 2;

		if (name <= maxBetBubble) {
			var x = signal * BUBBLE_BET_X;
			this.player.showBubble(name, x, BUBBLE_BET_Y, this.align);
			if (name == SeatManager.BUBLLE_ALLIN) {
				this.player.showAllInAnim()
			}
		} else if (name <= maxInsureBubble) {
			var x = signal * BUBBLE_INSURE_X;
			this.player.showBubble(name, x, BUBBLE_INSURE_Y, this.align);
		} else if (name == SeatManager.BUBBLE_ADD_TIME) {
			var x = signal * BUBBLE_ADD_TIME_X;
			this.player.showBubble(name, x, BUBBLE_ADD_TIME_Y, this.align);
		}
	},

	showBubble : function(max_bet, totalbet) {
		if (!this.player) {
			return
		}

		var signal = this.align - 2;
		var x = signal * BUBBLE_BET_X;

		if (this.playerInfo.fold) {
			this.player.showBubble(SeatManager.BUBLLE_FOLD, x, BUBBLE_BET_Y, this.align);
		} else if (this.playerInfo.bet == totalbet) {
			this.player.showBubble(SeatManager.BUBLLE_CHECK, x, BUBBLE_BET_Y, this.align);
		} else if (this.playerInfo.gold == totalbet - this.playerInfo.bet) {
			this.player.showBubble(SeatManager.BUBLLE_ALLIN, x, BUBBLE_BET_Y, this.align);
			this.player.showAllInAnim();
		} else if (totalbet > max_bet) {
			this.player.showBubble(SeatManager.BUBLLE_RAISE, x, BUBBLE_BET_Y, this.align);
		} else if (totalbet == max_bet) {
			this.player.showBubble(SeatManager.BUBLLE_CALL, x, BUBBLE_BET_Y, this.align);
		}
	},

	showInsureBubble : function(premium) {
		if (!this.player) {
			return
		}

		var signal = this.align - 2;
		var x = signal * BUBBLE_INSURE_X;

		if (premium && premium > 0) {
			this.player.showBubble(SeatManager.BUBLLE_BUY_IN, x, BUBBLE_INSURE_Y, this.align);
		}else{
			this.player.showBubble(SeatManager.BUBLLE_GIVE_UP, x, BUBBLE_INSURE_Y, this.align);
		}
	},
	clearUI : function() {
		this.removeCardType();

		if (!this.player) {
			return
		}

		this.player.removeAllInAnim();
		this.player.removeBubble();
		this.player.initHandCardsView(handCardsLayout[this.position]);
		this.showGoldView();
		this.hideCoinView();
		this.player.showCards = null;
	},
	playerPayPremium : function( premium, callback ){
		if (!this.player) return 

		if (premium > 0){
			this.betAnim(SeatManager.COIN_NAME, premium, callback)
		}else if (callback){
			callback()
		}
	},
	premiumMoveAnim : function(pos, callback){
		if (this.player && this.player.uiBet && this.player.uiBet > 0){
			this.player.setBetView(SeatManager.COIN_NAME, 0, this.betPos());

			this.chipsMoveAnim(SeatManager.COIN_NAME, this.betPos(), pos, 0.5, 5, callback);
			cc.audioEngine.playEffect("res/audio/insure_gold_02.mp3");
		}else{
			if (callback){
				callback()
			}
		}
	}
});

SeatManager.EMOTICON_IDLE = 2
SeatManager.ALIGN_LEFT = 3
SeatManager.ALIGN_RIGHT = 1

SeatManager.BUBLLE_CHECK = 1
SeatManager.BUBLLE_CALL = 2
SeatManager.BUBLLE_RAISE = 3
SeatManager.BUBLLE_ALLIN = 4
SeatManager.BUBLLE_FOLD = 5
SeatManager.BUBLLE_GIVE_UP = 6
SeatManager.BUBLLE_BUY_IN = 7
SeatManager.BUBBLE_ADD_TIME = 8

SeatManager.CHIP_NAME = "res/chip.png"
SeatManager.SB_CHIP_NAME = "res/chip_sb.png"
SeatManager.BB_CHIP_NAME = "res/chip_bb.png"
SeatManager.COIN_NAME = "res/coin.png"


