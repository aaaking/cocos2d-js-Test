var record;
var _record_board;
var seatsLayout = TableLayout.seatsLayout;
var btnLayout = TableLayout.btnLayout;

var CHEST_POS = cc.p(display.cx, display.top - 100);

var offset = 0;
var sblinds = 1;
var offset_time = 0;

var MAX_SEAT_NUM = 9;
var BET_VIEW_POS = cc.p(display.cx, 220);
var POOL_BET_POS = TableLayout.POOL_BET_POS;
var POOL_CARDS_POS = TableLayout.POOL_CARDS_POS;
var PLAY_AVATAR_POS = 1;
var SELF_AVATAR_POS = cc.p(100, 100);

var BET_VIEW_ZORDER = 1;
var SEAT_ZORDER = 2;
var USEGOODS_ZORDER = 5;
var WINDOWS_ZORDER = 99;
var INSURE_ANI_ZORDER = 100;
var RECORD_ZORDER = 101;


var game_start = false;
var game_end = false;
var table_end = false;
var owner_id = 0;
var btn_seatid = 0;
var sb_seatid = 0;
var bb_seatid = 0;
var create_time = 0;
var table_duration = 0;
var ante_mode = 0;
var insure_mode = 0;
var show_card_enable = false;

var LOAD_TIMEOUT = 5;
var poolCards = [];
var pool_bet ;
var _rtPoolBet = 0;

var _players_cnt = 0;

var _insure_state;

var _flip_cards_cnt = 0;
var _last_playersInfo = {};
var _last_poolCards = {};

var controInstance;


var TexasController = cc.Layer.extend({
	ctor: function (param) {
		this._super();
		app.GameTable = this;
		this.info = app.userInfo;
		pool_bet = [];
		poolCards = [];

		this.seatsInfo = new Array();
		this.playersInfo = new Array();

		this.animation_manager = new AnimationManager();
		this.typeLabels = new Array();
		this.requestingCards = new Array();
		this.requestedCards = new Array();
		POOL_BET_POS = cc.p(display.cx, display.top - 400);
		controInstance = this;
		var TOP = display.height-115;
		var BOTTOM = 130;
		var SEAT_PADDING = 300;
		var SEAT_BOTTOM = 475;
		var SEAT_HEIGHT_PAD = 230;
		seatsLayout = [
			[
			cc.p(0,0)
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx, TOP),
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, display.cy),
					cc.p(display.cx + SEAT_PADDING, display.cy),
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, display.cy),
					cc.p(display.cx, TOP),
					cc.p(display.cx + SEAT_PADDING, display.cy),
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD*1.5),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD*1.5),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM),
			],

			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM+SEAT_HEIGHT_PAD*1.5),
					cc.p(display.cx, TOP),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM+SEAT_HEIGHT_PAD*1.5),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM),
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM),
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
					cc.p(display.cx, TOP),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM),
			],
			[
				cc.p(display.cx, BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
					cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
					cc.p(display.cx - 210, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2 + 195),
					cc.p(display.cx + 210, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2 + 195),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
					cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM),
			],
		];
		cc.loader.loadTxt("res/a.txt", function (err, data) {
			if (err) {
				// return console.log("load failed");
			}
			else {
				var reader = new FileReader();
			}

		});
		this.maxSeatsCnt = 9;
		this.seatsLayout = seatsLayout[this.maxSeatsCnt-1]
		// var reader = new FileReader();
        //
		// reader.onload = function(e) {
		// 	var text = reader.result;
		// }
        //
		// reader.readAsText("res/TexasSheet-1462438272-3528213803606-100007-208");


		this.initUI(param);

	},

	currentPos: function (seatid) {
		return (seatid + this.maxSeatsCnt - offset ) % this.maxSeatsCnt ;
	},

	getServerTime: function () {
		return new Date().getTime() - offset_time;
	},

	getRealDuration: function (duration, end_time) {
		var server_duration = end_time - this.getServerTime();

		if (server_duration > duration) {
			return duration;
		}
		else {
			return server_duration;
		}
	},

	onEnter: function () {
		this._super();
		// console.log("EventManager.init");
        //
        //
		EventManager.addEventListener("user.SheetInfo", this.onSheetInfo.bind(this));
		EventManager.addEventListener("user.GameStartNtf", this.onGameStart.bind(this));
		EventManager.addEventListener("user.AddCardNtf", this.onAddCardNtf.bind(this));
		EventManager.addEventListener("user.PlayerOptNtf", this.onPlayerOptNtf.bind(this));
		EventManager.addEventListener("user.BetNtf", this.onBetNtf.bind(this));
		EventManager.addEventListener("user.PoolBetNtf", this.onPoolBetNtf.bind(this));
		EventManager.addEventListener("user.PoolCardsNtf", this.onPoolCardsNtf.bind(this));
		EventManager.addEventListener("user.ShowCardsNtf", this.onShowCardsNtf.bind(this));
		EventManager.addEventListener("user.GameEndNtf", this.onGameEndNtf.bind(this));
		EventManager.addEventListener("user.FoldNtf", this.onFoldNtf.bind(this));
		EventManager.addEventListener("user.StandupNtf", this.onStandupNtf.bind(this));
		EventManager.addEventListener("user.EnterInsureNtf", this.onEnterInsureNtf.bind(this));
		EventManager.addEventListener("user.AskInsureNtf", this.onAskInsureNtf.bind(this));
		EventManager.addEventListener("user.InsureNtf", this.onInsureNtf.bind(this));
		EventManager.addEventListener("user.PayInsuranceNtf", this.onPayInsuranceNtf.bind(this));
		EventManager.addEventListener("user.InitiativeShowCardsNtf", this.onInitiativeShowCardsNtf.bind(this));
		EventManager.addEventListener("user.updateTable", this.updateTable.bind(this));




	},
	onTick:function(t){
	},
	checkGamePlaying: function () {
		if (!this.seatsInfo) {
			return false;
		}

		for (var v in this.seatsInfo) {
			if (v.playing) {
				return true;
			}
		}

		return false;
	},

	initUI: function (param) {

		this.bg = cc.Sprite.create("res/bg_"+app.gameMode+".jpg");
		this.addChild(this.bg);
		this.bg.setAnchorPoint(cc.p(0.5, 0.5));
		this.bg.setPosition(cc.p(display.cx, display.cy));
		this.initSeatViews();

	},

	removeSeatViews: function () {
		if (!this.seatViews) {
			return;
		}
		for (var i in this.seatViews) {
			this.seatViews[i].removeFromParent();
		}
		this.seatViews = null;
	},

	initSeatViews: function () {
		if (this.seatViews) {
			return;
		}

		var TOP = display.height-115;
		var BOTTOM = 130;
		var SEAT_PADDING = 300;
		var SEAT_BOTTOM = 475;
		var SEAT_HEIGHT_PAD = 230;
		POOL_CARDS_POS = cc.p(display.cx, 585);
		var POSITION_SPACE = (display.height - TOP - BOTTOM) / 4;

		this.seatViews = new Array();
		for (var i = 0; i < this.maxSeatsCnt; i++) {
			var pos = this.currentPos(i);
			this.seatViews[i] = new SeatManager(i);
			this.addChild(this.seatViews[i], SEAT_ZORDER);
			this.seatViews[i].setPosition(this.seatsLayout[pos]);
		}
	},
	getFriendInfoNative : function(requests, uid) {
		var setInfo = function (info) {
			var info = JSON.parse(info);
			if (!info || !info.nickname || !info.avatar || info.nickname == "") {
				requests.push(uid);
				return;
			}

			var p = this.playersInfo[uid];
			if (!p) {
				p = {};
				this.playersInfo[uid] = p;
			}

			if (p) {
				p.avatar = info.avatar;
				p.nickname = info.nickname;
				this.refreshViews([p]);
			}
		}

		var xhr = cc.loader.getXMLHttpRequest();
		xhr.open("GET", "http://120.27.162.46:8005/game/mttstatus?gid=100657", true);

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 ) {
				xhr.status === 200 ? setInfo(xhr.responseText) : requests.push(uid);
			}
		}.bind(this);
		//xhr.send();

	},
	checkPlayer: function (players) {
		var uids = new Array();

		for (var k in players) {
			var v = players[k];
			if (v.uid) {
				var p = this.playersInfo[v.uid];
				if (!p || !p.avatar || !p.nickname) {
					this.getFriendInfoNative(uids, v.uid)
				} else {
					v.nickname = p.nickname;
					v.avatar = p.avatar;
				}
			}
		}


		if (uids.length > 0) {
			// this.requestUserInfo(uids);
		}
	},
	refreshViews: function (freshPlayers) {
		for (var k in freshPlayers) {
			var v = freshPlayers[k];
			if (dzglobal.checkSeatid(v.seatid)) {
				this.seatViews[v.seatid-1].player.setNicknameView(v.nickname);
				this.seatViews[v.seatid-1].player.setAvatarWithUrl(v.avatar);
			}


			if (v.uid && v.uid == this.info.uid) {
				if (this.bgView) {
					this.bgView.updateCoins(v.coins);
				}
			}
		}
	},
	initTableInfoUI: function () {
		var newLabel = function (text) {
			var label = new cc.LabelTTF(text, "Arial", 24, cc.size(450, 300), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
			label.setColor(cc.color(17, 44, 87));
			return label;
		}

		this.tableInfoUI = new cc.Node();
		this.addChild(this.tableInfoUI);
		this.tableInfoUI.setPosition(cc.p(display.cx, display.cy - 200));

//盲注
		var posY = 0;
		var text = localizedStrings.getString("Blind") + sblinds + "/" + sblinds * 2;
		if (!this.blindLabel) {
			this.blindLabel = newLabel(text);
			this.blindLabel.setAnchorPoint(cc.p(0.5, 0.5));
			this.blindLabel.setPosition(cc.p(0, posY));
			this.tableInfoUI.addChild(this.blindLabel);
		}
		else {
			this.blindLabel.setString(text);
		}

//邀请码
// 		this.info.tableid = "123456";
// 		if (this.info.tableid.length == 6) {
// 			posY = posY - 25;
// 			var text = "邀请码：" + this.info.tableid;
// 			if (!this.tableidLabel) {
// 				this.tableidLabel = newLabel(text)
// 				this.tableidLabel.setAnchorPoint(cc.p(0.5, 0.5));
// 				this.tableidLabel.setPosition(cc.p(0, posY));
// 				this.tableInfoUI.addChild(this.tableidLabel);
// 			}
// 			else {
// 				this.tableidLabel.setString(text);
// 			}
// 		}

//ante

		ante_mode = ante_mode || 0;
		posY = posY - 25;
		var text = "ANTE:" + (ante_mode * sblinds);

		if (!this.anteLabel) {
			this.anteLabel = newLabel(text);
			this.anteLabel.setAnchorPoint(cc.p(0.5, 0.5));
			this.anteLabel.setPosition(cc.p(0, posY));
			this.tableInfoUI.addChild(this.anteLabel);
		} else {
			this.anteLabel.setString(text);
		}


//保险模式
		posY = posY - 25

		if (insure_mode == 0) {
			text = localizedStrings.getString("InsureMode_0");
		} else if (insure_mode == 1) {
			text = localizedStrings.getString("InsureMode_1");
		} else if (insure_mode == 2) {
			text = localizedStrings.getString("InsureMode_0");
		}

		if (!this.insureLabel) {
			this.insureLabel = newLabel(text);
			this.insureLabel.setAnchorPoint(cc.p(0.5, 0.5));
			this.insureLabel.setPosition(cc.p(0, posY));
			this.tableInfoUI.addChild(this.insureLabel);
		} else {
			this.insureLabel.setString(text);
		}
	},
	initTableInfoUISng:function() {

		var newLabel = function (text) {
			var label = new cc.LabelTTF(text, "Arial", 24, cc.size(450, 300), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
			label.setColor(cc.color(17, 44, 87));
			return label;
		}

		if (this.tableInfoUI) {
			this.tableInfoUI.removeFromParent();
			this.tableInfoUI = null;
			this.blindLabel = null;
			this.blindTimeLabel = null;
		}

		this.tableInfoUI = new cc.Node();
		this.addChild(this.tableInfoUI);
		this.tableInfoUI.setPosition(display.cx, display.cy - 200);

//带入
		var posY = 0;


//当前盲注
		var text = localizedStrings.getString("CurrBlind") + ": " + this.sblinds + "/" + this.sblinds * 2;
		this.blindLabel = newLabel(text)
		this.blindLabel.setPosition(0, posY);
		this.blindLabel.setAnchorPoint(cc.p(0, 0))
		this.tableInfoUI.addChild(this.blindLabel);


//邀请码
		if (this.info.tableid.length == 6) {
			posY = posY - 28;
			var text = localizedStrings.getString("Code") + ": " + this.info.tableid;
			var label = newLabel(text)
			label.setPosition(0, posY);
			label.setAnchorPoint(cc.p(0, 0));
			this.tableInfoUI.addChild(label)
		}
	},
	initPlayViews: function () {
		if (!this.poolBetView) {
			this.poolBetView = new PotViewsManager();

			this.poolBetView.setPosition(POOL_BET_POS);
			this.addChild(this.poolBetView, BET_VIEW_ZORDER);
		}

		if (!this.poolCardsView) {
			this.poolCardsView = new PoolCardsView();
			this.poolCardsView.setPosition(display.cx, 585);
			this.addChild(this.poolCardsView, BET_VIEW_ZORDER);
		}

		// if not this.betView then
		// this.betView = BetView.new(self, sblinds):setPosition(BET_VIEW_POS):addTo(self, BET_VIEW_ZORDER)
		// end

		if (app.gameMode == 0) {
			this.initTableInfoUI();
		} else if (app.gameMode == 1){
			this.initTableInfoUISng()
		}
	},
	removePlayViews: function() {
		if (this.poolBetView) {
			this.poolBetView.removeFromParent();
			this.poolBetView = null;
		}

		if (this.poolCardsView) {
			this.poolCardsView.removeFromParent();
			this.poolCardsView = null;
		}
	},
	updateTable: function () {
		this.removeSeatViews();
		this.initSeatViews();

		this.removePlayViews();
		this.initPlayViews();

		this.stopAllActions();

		this.clearGameUI();

		this.animation_manager.endAnimations();

		for (var k in this.seatsInfo) {
			var v = this.seatsInfo[k];
			this.changeSeatToPlayer(v.uid, v.seatid);
		}

		this.movePosition();

		this.changeAllSeatToSeat();

		this.setHandCards();

		if (poolCards && poolCards.length > 0) {
			this.updatePoolCards(poolCards);
		} else {
			this.updatePoolCards([]);
		}

		this.updateCardType();

		this.updatePoolBet();

		this.setBtnPos();

		this.checkPlayer(this.playersInfo)
	},
	updatePlayersInfo: function (playersInfo) {
		this.info.seatid = 0;


		for (var k in this.playersInfo) {
			this.playersInfo[k] = null;
		}

		for (var k in this.seatsInfo) {
			this.seatsInfo[k] = null;
		}

		this.playersInfo[this.info.uid] = app.userInfo;

		for (var i in playersInfo) {
			var v = playersInfo[i];
			if (v.uid) {
				this.addPlayerInfo(v.uid, v);

				if (dzglobal.checkSeatid(v.seatid)) {
					this.addSeatInfo(v.uid, v.seatid);
				} else if (v.seatid != 0) {
					alert("invalid seatid");
				}
			}

		}
		this.clearGame();

		if (dzglobal.checkSeatid(this.info.seatid)) {
			offset = this.info.seatid - 1;
		}
	},
	gotoNextStep:function(delay){
		delay = delay || 0;
		this.scheduleOnce(function(){
			EventManager.dispatchEvent("nextStep",null);
		},delay)

	},
	onSheetInfo: function (event) {

		var msg = event.netmsg || {};
		this.bg.setTexture("res/bg_"+app.gameMode+".jpg");
		var playerinfo = msg.playerinfo || {};
		var noAni = event.noAni;
		if (!msg.maxplayer || msg.maxplayer == 0) {
			this.maxSeatsCnt = 9;
		}else {
			this.maxSeatsCnt = msg.maxplayer;
			if (this.maxSeatsCnt % 2 == 0) {
				CHEST_POS = cc.p(display.cx, display.cy + 70)
			}else{
				CHEST_POS = cc.p(display.cx, display.cy - 100)
			}
		}

		this.tableIndex = msg.tableIndex || 0;
		this.seatsLayout = seatsLayout[this.maxSeatsCnt - 1];
		this.updatePlayersInfo(playerinfo);

		if (noAni) {
			return
		}

		this.updateTable();
		// EventManager.dispatchEvent("nextStep",null);
	},
	initGame: function () {
		this.stopAllActions();

		this.animation_manager.endAnimations();

		this.clearGameUI();
		this.clearGame();
	},
	setBtnPos: function () {
		if (!dzglobal.checkSeatid(btn_seatid)) {
			if (this.btn) {
				this.btn.stopAllActions();
				this.btn.runAction(cc.easeSineIn(cc.moveTo(0.3, cc.p(0, -50))));
			}
			return;
		}

		if (!this.btn) {
			this.btn = new cc.Sprite("res/button.png");
			this.btn.setPosition(0, -50);
			this.addChild(this.btn);
		}

		var arr = this.seatViews[btn_seatid].btnPos();
		var seatPos = this.seatsLayout[this.currentPos(btn_seatid)];
		var posX = seatPos.x + arr[0];
		var posY = seatPos.y + arr[1];

		this.btn.stopAllActions();
		this.btn.runAction(cc.moveTo(0.3, cc.p(posX,posY)));

	},
	onGameStart: function (event) {
		this.initGame();

		var msg = event.netmsg || {};
		var players_play = msg.playerinfo || {};

		if (msg.sblinds && msg.sblinds > 0) {
			this.sblinds = msg.sblinds;
			if (this.blindLabel) {
				var text = localizedStrings.getString("CurrBlind") + ": " + this.sblinds + "/" + this.sblinds * 2;
				this.blindLabel.setString(text)
			}
		}

		for (var k in players_play) {
			var v = players_play[k];
			if (v.seatid) {
				_players_cnt = _players_cnt + 1;

				var player = this.seatsInfo[v.seatid-1];
				if (player) {
					player.playing = true;
					player.bet = v.bet || 0;
					player.gold = v.gold || 0;
				}
			}
		}


		btn_seatid = msg.btn_seatid || 0;
		this.updateSmallBlindSeatid();
		this.updateBigBlindSeatid();


		var noAni = event.noAni;

		if (noAni) {
			return
		}

		var call = function(){
			//if (app.gameMode == 1) {
			//	var view = this.seatViews[this.info.seatid]
			//	if (view && view.player) {
			//		view.player.updateRanking(this.info.ranking)
			//	}
			//}
			this.setBtnPos();
			this.updatePoolBet();

			for (var k in this.seatsInfo) {
				var view = this.seatViews[k];
				if (view) {
					view.playerBet();
				}
			}
			this.animation_manager.animationOver();

			this.gotoNextStep();
		}
		this.animation_manager.addAnimation(call.bind(this));

		var p = this.playersInfo[this.info.uid];
		if (p && p.playing) {
			return
		}

		this.animation_manager.addAnimation(function () {
			this.dealCards();
		}.bind(this))

	},
	smallBlindSeatid: function () {
		return sb_seatid;
	},
	updateSmallBlindSeatid: function () {

		if (dzglobal.checkSeatid(btn_seatid)) {
			sb_seatid = btn_seatid;
			do {
				sb_seatid = sb_seatid % this.maxSeatsCnt + 1;
				var p = this.seatsInfo[sb_seatid-1];
				if (p && p.playing) {
					return;
				}
			} while (sb_seatid == btn_seatid)
		}
		sb_seatid = 0;
	},
	bigBlindSeatid: function () {
		return bb_seatid;
	},
	updateBigBlindSeatid: function () {
		if (dzglobal.checkSeatid(sb_seatid)) {
			bb_seatid = sb_seatid;
			do {
				bb_seatid = bb_seatid % this.maxSeatsCnt + 1;
				var p = this.seatsInfo[bb_seatid-1];

				if (p && p.playing) {
					return;
				}
			} while (bb_seatid == sb_seatid)
		}
		bb_seatid = 0;
	},
	onAddCardNtf: function (event) {
		var seatid = event.netmsg.seatid || 0;
		if (this.seatsInfo[seatid-1]) {
			this.seatsInfo[seatid-1].handCards = event.netmsg.cards || {};
		}

		var noAni = event.noAni;
		if (noAni) {
			return;
		}
		var addCardsFunc = function () {
			this.dealCards();
		}

		this.animation_manager.addAnimation(addCardsFunc.bind(this));

	},
	setHandCards: function () {
		this.initCardType();
		for (var k in this.seatsInfo) {
			(function(idx){
				var v = this.seatsInfo[idx];
				if (v.playing && (!v.fold || v.handCards)) {
					var view = this.seatViews[v.seatid-1];
					view.dealCards(0, false);

					if (v.fold && v.uid == this.info.uid) {
						view.player.darkCard();
					}
				}
			}).bind(this)(k);
		}
		for (var q in this.seatsInfo) {
			(function(qdx){
				var v = this.seatsInfo[qdx];
				if (v.playing && (!v.fold || v.handCards)) {
					var view = this.seatViews[v.seatid-1];
					view.dealCards(1, false);

					if (v.fold && v.uid == this.info.uid) {
						view.player.darkCard();
					}
				}
			}).bind(this)(q);
		}
		// for (var i = 0; i < 2; i++) {
		// 	for (var k in this.seatsInfo) {
		// 		var v = this.seatsInfo[k];
		// 		if (v.playing && (!v.fold || v.handCards)) {
        //
		// 			var view = this.seatViews[v.seatid-1];
		// 			view.dealCards(i, false);
        //
		// 			if (v.fold && v.uid == this.info.uid) {
		// 				view.player.darkCard();
		// 			}
		// 		}
		// 	}
		// }
		this.updateCardType();
	},
	getDealcardSound: function (index) {
		var list = [
			"dealcard_a",
			"",
			"dealcard_b",
			"",
			"dealcard_b",
			"",
			"dealcard_a",
			"dealcard_b",
			"",
			"dealcard_a",
			"",
			"dealcard_a",
			"",
			"dealcard_b",
			"",
			"dealcard_b",
			"",
			"dealcard_a",
			"dealcard_b",
			"",
			"dealcard_a",
			"",
			"dealcard_a",
			"",
			"dealcard_b",
			"",
			"dealcard_b",
			"",
			"dealcard_a",
			"dealcard_b",
			"",
			"dealcard_a",
			"",
			"dealcard_a",
			"",
			"dealcard_b",
			"",
			"dealcard_b",
			"",
			"dealcard_a",
			"dealcard_b",
			"",
			"dealcard_a",
		]

		var name = list[index]
		if (name && name.length > 0) {
			return cc.callFunc(function () {
				cc.audioEngine.playEffect("res/audio/" + name + ".mp3");

			})
		}
	},
	dealCards: function () {
		var seq = new Array();
		this.initCardType();
		var index = 0;
		// for (var i = 0; i < 2; i++) {
		// 	for (var k in this.seatsInfo) {
		// 		var v = this.seatsInfo[k];
		// 		if (v.playing && (!v.fold || v.handCards)) {
		// 			var view = this.seatViews[v.seatid-1];
        //
		// 			var sound = this.getDealcardSound(index);
		// 			if (sound) {
		// 				// seq.push(sound);
		// 			}
		// 			// var fun = cc.callFunc(function()
		// 			// {
		// 				if (view) {
		// 				view.dealCards(i, true);
		// 			}
		// 			// })
		// 			//
		// 			// seq.push(fun);
		// 			// seq.push(cc.delayTime(0.09));
		// 			index = index + 1;
		// 		}
		// 	}
		// }
		// this.animation_manager.animationOver();
		// // seq.push(cc.callFunc(this.animation_manager.animationOver.bind(this)));
		// // seq.push(cc.callFunc(this.updateCardType.bind(this)));
		// // this.runAction(cc.sequence(seq));
		// this.updateCardType();

		///////
		for (var k in this.seatsInfo) {
			(function(idx){
				var v = this.seatsInfo[idx];
				if (v.playing && (!v.fold || v.handCards)) {
					var view = this.seatViews[v.seatid - 1];
					var sound = this.getDealcardSound(index);
					if (sound) {
						seq.push(sound);
					}
					var fun = cc.callFunc(function () {
						if (view) {
							view.dealCards(0, true);
						}
					}.bind(this))

					seq.push(fun);
					seq.push(cc.delayTime(0.09));
					index = index + 1;
				}
			}).bind(this)(k);
		}
		for (var q in this.seatsInfo) {
			(function(qdx){
				var v = this.seatsInfo[qdx];
				if (v.playing && (!v.fold || v.handCards)) {
					var view = this.seatViews[v.seatid - 1];
					var sound = this.getDealcardSound(index);
					if (sound) {
						seq.push(sound);
					}
					var fun = cc.callFunc(function () {
						if (view) {
							view.dealCards(1, true);
						}
					}.bind(this))

					seq.push(fun);
					seq.push(cc.delayTime(0.09));
					index = index + 1;
				}
			}).bind(this)(q);
		}
		seq.push(cc.callFunc(this.endAnimation.bind(this)));
		seq.push(cc.callFunc(this.updateCardType.bind(this)));

		this.runAction(cc.sequence(seq));
		this.gotoNextStep(index*0.1);
		// this.animation_manager.animationOver();

	},
	endAnimation:function(){
		this.animation_manager.animationOver();
	},
	getMaxBet: function () {
		var max_bet = 0;
		for (var k in this.seatsInfo) {
			var v = this.seatsInfo[k];
			v.bet = v.bet || 0;
			if (v.bet > max_bet) {
				max_bet = v.bet;
			}
		}

		return max_bet;
	},
	askPlayerOpt: function (seatid, timeout, end_time, call_bet, min_raise, speed) {
		if (!seatid || !timeout || !end_time  || !min_raise) {
			this.animation_manager.animationOver();
			return;
		}

		var seatInfo = this.seatsInfo[seatid-1];
		if (!seatInfo) {
			this.animation_manager.animationOver();
			return;
		}

		this.hideAllTimers();
		var duration = this.getRealDuration(timeout, end_time);
		this.setTimer(seatid, timeout, timeout, speed);

		this.animation_manager.animationOver();
	},
	onPlayerOptNtf: function (event) {
		var seatid = event.netmsg.seatid || 0;
		var timeout = event.netmsg.timeout || 0;
		var end_time = event.netmsg.end_time || 0;
		var call_bet = event.netmsg.call_bet || 0;
		var min_raise = event.netmsg.min_raise || 0;
		var noAni = event.noAni;
		var speed = event.speed;

		if (noAni) {
			return
		}

		 var animation_func = function () {
			if (seatid == this.info.seatid) {
				cc.audioEngine.playEffect("res/audio/pturn.mp3");
			}
			this.askPlayerOpt(seatid, timeout, end_time, call_bet, min_raise, speed);
			 this.gotoNextStep();
		 }

		 this.animation_manager.addAnimation(animation_func.bind(this))
	},
	onBetNtf: function (event) {
		var seatid = event.netmsg.seatid || 0;
		var totalbet = event.netmsg.totalbet || 0;
		var gold = event.netmsg.gold || 0;
		var noAni = event.noAni;

		var maxBet = this.getMaxBet();
		var playerInfo = this.seatsInfo[seatid-1];
		if (playerInfo) {

			var bet = playerInfo.bet || 0;

			if (playerInfo.fold) {
				playerInfo.bubble = SeatManager.BUBLLE_FOLD;
			} else if (playerInfo.bet == totalbet) {
				playerInfo.bubble = SeatManager.BUBLLE_CHECK;
			} else if (playerInfo.gold == totalbet - playerInfo.bet) {
				playerInfo.bubble = SeatManager.BUBLLE_ALLIN;
			} else if (totalbet > maxBet) {
				playerInfo.bubble = SeatManager.BUBLLE_RAISE;
			} else if (totalbet == maxBet) {
				playerInfo.bubble = SeatManager.BUBLLE_CALL;
			}

			this.seatsInfo[seatid-1].bet = totalbet;
			this.seatsInfo[seatid-1].gold = gold;

			if (noAni) {
				return
			}

			var animation_func = function () {
				this.hideAllTimers();
				var view = this.seatViews[seatid-1];
				if (view) {
					view.playerBet(this.playerBetOver.bind(this))
				}
				if (this.seatViews[seatid-1]) {
					this.seatViews[seatid-1].showBubbleBaseName(this.seatsInfo[seatid-1].bubble);
				}

				if (totalbet > bet) {
					this.updatePoolBet();
					cc.audioEngine.playEffect("res/audio/chips_to_table.mp3");
				}
				else {
					cc.audioEngine.playEffect("res/audio/cheackSound.mp3");
				}
				this.gotoNextStep(0.3);
			}


			this.animation_manager.addAnimation(animation_func.bind(this));
		}

	},
	playerBetOver: function () {
		this.animation_manager.animationOver();
	},
	onFoldNtf: function (event) {
		var seatid = event.netmsg.seatid || 0;
		if (event.noAni) {
			return
		}

		var view = this.seatViews[seatid-1];
		var fold = function() {
			if (view) {
				view.playerFold();
				view.showBubble();
			}

			if ((seatid - 1) == this.info.seatid) {
				this.updateCardType();
				cc.audioEngine.playEffect("res/audio/foldCardSound.mp3");
			}
			this.animation_manager.animationOver();
			this.gotoNextStep(0.5);
		}
		this.animation_manager.addAnimation(fold.bind(this))
	},
	onShowCardsNtf: function (event) {
		var handcards = event.netmsg.handcards || {};
		var noAni = event.noAni;

		for (var k in handcards) {
			var v = handcards[k];
			this.addHandCards(v.seatid, v.handcard);
		}

		if (noAni) {
			return
		}

		this.animation_manager.addAnimation(this.showAllHandCards.bind(this));

	},
	showAllHandCards: function () {
		this.show_handCards_over_ = 0;

		for (var k in this.seatViews) {
			var v = this.seatViews[k];
			v.showHandCards(this.showHandCardsOver.bind(this));
		}
		cc.audioEngine.playEffect("res/audio/allocateCardSound.mp3");
		this.gotoNextStep()
	},
	updateOthersType: function () {
		var pool_cards = this.poolCardsView.getCards();

		for (var k in this.seatsInfo) {
			var v = this.seatsInfo[k];
			if (v && v.uid != this.info.uid && v.handCards && v.handCards.length == 2) {
				var handcard = v.handCards;

				this.seatViews[k].showCardType(handcard, pool_cards);
			}
		}
	},
	showHandCardsOver: function () {
		this.show_handCards_over_ = this.show_handCards_over_ + 1;

		if (this.show_handCards_over_ == this.maxSeatsCnt) {

			this.animation_manager.animationOver();
		}
	},
	onGameEndNtf: function (event) {
		show_card_enable = true;

		var winners = event.netmsg.winners || [];
		var players = event.netmsg.players || [];

		for (var k in players) {
			var v = players[k];
			var p = this.seatsInfo[v.seatid-1];
			if (p) {
				p.bonus = v.bonus || 0;
				p.gold = v.gold || 0;
				p.profit = v.profit || 0;
			}
		}

		var distribute_bonus_func = function () {
			this.updateOthersType();
			this.hideAllTimers();
			this.distributeBonus(winners);
		}
		this.animation_manager.addAnimation(distribute_bonus_func.bind(this), this.stopDistributeBonus.bind(this));

		var win_func = function () {
			this.winAnim(players);
		}

		this.animation_manager.addAnimation(win_func.bind(this),this.stopWinAnim.bind(this));

	},
	convertNumToRank: function (num) {
		var rank = Math.floor((num - 1) / 4) + 1;
		if (rank == 11) {
			return "J";
		} else if (rank == 12) {
			return "Q"
		} else if (rank == 13) {
			return "K"
		} else if (rank == 14) {
			return "A"
		} else {
			return tostring(rank)
		}
	},
	checkShowCards: function () {
		var view = this.seatViews[this.info.seatid-1];
		if (view && view.player) {
			var showCards = view.player.showCards;
			if (!showCards || showCards.length <= 0) {
// app:showMidTips("不亮牌")
			} else {
				var text = localizedStrings.getString("ShowCard");
				for (var k in showCards) {
					var v = showCards[k];
					text = text + this.convertNumToRank(v) + " ";
				}
// app:showMidTips(text)
			}
		}

	},
	onInitiativeShowCardsNtf: function (event) {
		if (!show_card_enable) {
			return
		}

		var cards = new Array();
		for (var k in event.netmsg.cards) {
			var v = event.netmsg.cards[k];
			var cardInfo = {};
			cardInfo.card_order = v.card_order;
			cardInfo.card_num = v.card_num;
			cards.push(cardInfo);
		}

		var seatid = event.netmsg.seatid;

		var p = this.seatsInfo[seatid-1];

		if (!p) {
			return
		}


		this.animation_manager.addAnimation(function () {
			if (seatid == this.info.seatid) {
				this.seatViews[seatid-1].reShowCards(cards, this.initiativeShowCardsOver.bind(this));
			} else {
				for (var k in cards) {
					var v = cards[k];
					p.handCards = p.handCards || [];
					p.handCards[v.card_order] = v.card_num;
				}
				this.seatViews[seatid-1].showHandCards(this.initiativeShowCardsOver.bind(this));
			}

		})
	},
	initiativeShowCardsOver: function () {
		this.animation_manager.animationOver();
	},

	sitPlayersCnt: function () {
		var i = 0;
		for (var k in this.seatsInfo) {
			i = i + 1;
		}

		return i
	},

	clearGameUI: function () {
		show_card_enable = false;
		this.requestingCards = {};
		this.requestedCards = {};

		if (this.poolCardsView) {
			this.poolCardsView.removeAllCards();
		}

		for (var k in this.seatViews) {
			var v = this.seatViews[k];
			v.clearUI();
		}

		if (this.betView) {
			this.poolBetView.removeAllPot();
		}

		// this.removeNextHand();
		this.hideAllTimers();
		this.removeCardType();

		for (var k in this.seatViews) {
			var v = this.seatViews[k];
			if (v.player) {
				v.player.normalAvatar();
			}
		}
		if (this.treasureChest) {
			this.treasureChest.removeFromParent();
			this.treasureChest = null;
		}
	},

	clearGame: function () {
		poolCards = [];

		_players_cnt = 0;
		_insure_state = null;
		pool_bet = [];

		this.autoCall = false;
		this.autoFold = false;

		if (!this.seatsInfo) {
			return
		}

		for (var k in this.playersInfo) {
			var v = this.playersInfo[k];
			v.handCards = null;
			v.fold = null;
			v.bonus = 0;
			v.bet = 0;
			v.allBet = 0;
			v.playing = false;
			v.chips = 0;
			v.profit = null;
			v.insurance = null;
			v.premium = null;
			v.totalPremium = null;
		}
	},

	clearTableUI: function () {
		btn_seatid = 0;
		this.setBtnPos();

		if (dzglobal.checkSeatid(this.info.seatid)) {
			this.seatViews[this.info.seatid-1].player.avatarBack();
			this.seatViews[this.info.seatid-1].player.showNickNameView();
		}

		this.removeNextHand();
	},
	removeNextHand:function() {
		if (!self.nextHand) {
			return
		}

		this.nextHand.removeFromParent();
		self.nextHand = null;
	},
	onStandupNtf: function (event) {
		var msg = event.netmsg || {};
		var seatid = msg.seatid || 0;
		var uid = msg.uid || 0;

		this.seatsInfo[seatid-1].fold = true;

		this.hideTimer();

		var selfSeatId = this.info.seatid;
		if (selfSeatId == seatid) {
			if (this.info.exiting) {
				this.scheduleOnce(function () {
					this.exitGame()
				}, 0.01);
				return;
			}
			cc.audioEngine.playEffect("res/audio/chairStandSound.mp3");

			this.removeNextHand();
		}
		this.removeSeatInfo(seatid-1);
		this.changeAllSeatToSeat();
	},

	poolbetHasChanged: function (poolbet) {
		if (!poolbet) return

		var changed = false;
		pool_bet = pool_bet || [];
		for (var k in poolbet) {
			var v = poolbet[k];
			if (pool_bet[v.num-1]) {
				if (pool_bet[v.num-1].bet != v.bet) {
					pool_bet[v.num-1].bet = v.bet;
					changed = true;
				}
			} else {
					pool_bet[v.num-1] = {};
					pool_bet[v.num-1].bet = v.bet;
					pool_bet[v.num-1].seatids = v.seatids;
					changed = true;
			}

		}
		return changed
	},

	removeAllBubble: function () {
		for (var i = 0; i < this.maxSeatsCnt; i++) {
			var view = this.seatViews[i];
			var p = this.seatsInfo[i];

			if (view && view.player) {
				if ((p && !p.fold) || p.uid == this.info.uid) {
					view.player.removeBubble()
				}
			}

		}
	},

	onPoolBetNtf: function (event) {


		var playSound = this.poolbetHasChanged(event.netmsg.poolbet);

		this.updateAllBet();

		if (event.noAni) {
			return
		}

		var collectBet_func = function () {
			this.hideAllTimers();
			this.collectAllBet();
			this.removeAllBubble();

			if (playSound) {
				cc.audioEngine.playEffect("res/audio/chips_to_pot.mp3");
			}
		this.gotoNextStep(0.5);
		}


		this.animation_manager.addAnimation(collectBet_func.bind(this));
	},


	onPoolCardsNtf: function (event) {
		var msg = event.netmsg || {};
		var noAni = event.noAni;
		var cards = new Array();

		if (msg.cards.length > 0) {
			for (var k in msg.cards) {
				var v = msg.cards[k];
				poolCards.push(v);
				cards.push(v);
			}

			if (noAni) {
				return
			}


			var add_pool_cards_func = function () {
				this.poolCardsView.addPoolCards(cards,this.addPoolCardsOver.bind(this));
				cc.audioEngine.playEffect("res/audio/allocateCardSound.mp3");
				this.gotoNextStep(cards.length*0.17);
			}

			this.animation_manager.addAnimation(add_pool_cards_func.bind(this));
		}
	},

	addPlayerInfo: function (uid, playerInfo) {
		var p = this.playersInfo[uid];
		if (!p) {
			p = {
				uid: uid,
				seatid: 0,
				gold: 0,
				bet: 0,
				handCards: {}
			}
			this.playersInfo[uid] = p;
		}

		for (var k in playerInfo) {
			var v = playerInfo[k];
			p[k] = v;
		}

		if (!p.playing || p.playing == 0) {
			p.playing = false;
			p.fold = false;
		} else if (p.playing == 1) {
			p.playing = true;
			p.fold = false;
		} else if (p.playing == 2) {
			p.playing = true;
			p.fold = true;
		}
	},

	changeAllSeatToSeat: function () {
		for (var i = 0; i < this.maxSeatsCnt; i++) {
			if (!this.seatsInfo[i]) {
				this.changeSeatToSeat(i)
			}
		}
	},

	addSeatInfo: function (uid, seatid) {
		if (!dzglobal.checkSeatid(seatid)) {
			return
		}

		this.playersInfo[uid].seatid = seatid;
		this.seatsInfo[seatid-1] = this.playersInfo[uid];
	},

	removeSeatInfo: function (seatid) {
		if (!this.seatsInfo[seatid]) {
			return
		}
		this.seatsInfo[seatid].seatid = 0;
		this.seatsInfo[seatid] = null;
	},

	changeSeatToSeat: function (seatid) {
		this.removeSeatInfo(seatid);
		var view = this.seatViews[seatid];
		view.changeToSeat();
	},

	changeSeatToPlayer: function (uid, seatid) {
		if (!dzglobal.checkSeatid(seatid)) {
			return
		}

		var playerInfo = this.playersInfo[uid];
		var view = this.seatViews[seatid-1];
		view.changeToPlayer(playerInfo);
	},

	setTimer: function (seatid, time, total_time, speed) {

		if (dzglobal.checkSeatid(seatid)) {
			if (_insure_state) {
				this.seatViews[seatid-1].player.startInsureTimer(time, total_time, speed);
			} else {
				this.seatViews[seatid-1].player.startTimer(time, total_time, speed);
			}
		}
	},

	hideTimer: function (seatid) {
		if (dzglobal.checkSeatid(seatid) && this.seatViews[seatid].player) {
			 this.seatViews[seatid].player.hideInsureTimer();
			this.seatViews[seatid].player.hideTimer();
		}
	},

	hideAllTimers: function () {
		for (var k in this.seatsInfo) {
			var v = this.seatsInfo[k];
			if (v.playing) {
				this.hideTimer(k);
			}
		}
	},

	addHandCards: function (seatid, handcards) {
		var p = this.seatsInfo[seatid-1];
		if (p) {
			p.handCards = handcards;
		}
	},

	collectAllBet: function (callback) {
		this.collect_bet_over_ = 0;

		for (var i = 0; i < this.maxSeatsCnt; i++) {
			var view = this.seatViews[i]

			if (view) {
				var pos = view.convertToNodeSpace(POOL_BET_POS);
				view.collectBetAnim(pos,this.collectBetOver.bind(this));
			}
		}
	},

	collectBetOver: function () {
		this.collect_bet_over_ = this.collect_bet_over_ + 1;

		if (this.collect_bet_over_ == this.maxSeatsCnt) {
			this.updatePoolBet();
			this.collect_bet_over_ = 0;
			this.scheduleOnce(function () {
				this.animation_manager.animationOver()
			}, 0.5)

		}
	},

	distributeBonus: function (winners) {
		this.distribute_bonus_over_ = 0;
		this.winners_cnt_ = 0;

		for (var k in winners) {
			var v = winners[k];
			for (var i in v) {
				var winner = v[i];
				var seatid = winner.seatid;
				var view = this.seatViews[seatid-1];

				if (view) {
					var poolbet = this.poolBetView.potViews[k];
					var x = poolbet.getPositionX();
					var y = poolbet.getPositionY();

					var poolbetPos = this.poolBetView.convertToWorldSpace(cc.p(x, y));
					var pos = view.convertToNodeSpace(poolbetPos);
					var duration = 0.5;

					view.chipsMoveAnim(SeatManager.CHIP_NAME, pos, cc.p(0, 0), duration, 5, this.distributeBonusOver.bind(this));

					this.winners_cnt_ = this.winners_cnt_ + 1;
				}

			}
		}
		this.poolBetView.removeAllPot();
	},

	distributeBonusOver: function () {
		if (!this.winners_cnt_ || this.winners_cnt_ <= 0) return


		this.distribute_bonus_over_ = this.distribute_bonus_over_ + 1;
		if (this.distribute_bonus_over_ >= this.winners_cnt_) {
			this.distribute_bonus_over_ = null;
			this.winners_cnt_ = null;

			for (var k in this.seatsInfo) {
				this.seatViews[k].setGoldView();
			}
			this.animation_manager.animationOver();
		}
	},

	stopDistributeBonus: function () {
		this.winners_cnt_ = null;
	},

	winAnim: function (players) {
		this.win_over_ = 0;
		this.win_cnt_ = 0;

		for (var k in players) {
			this.win_cnt_ = this.win_cnt_ + 1;
		}

		for (var k in players) {
			var v = players[k];
			var seatid = v.seatid;
			var gold = v.gold;
			var bonus = v.bonus;
			var profit = v.profit || 0;
			var isWin = v.win;

			var view = this.seatViews[seatid-1];
			if (view && profit != 0) {
				view.winLabelAnim(profit,this.winAnimOver.bind(this));
			} else {
				this.winAnimOver();
			}

			if (seatid == this.info.seatid && isWin && isWin > 0) {


				var win = ccs.csLoader.createNode("res/win_node.json");
				win.setPosition(cc.p(display.cx, display.height * 0.3));
				this.addChild(win, 100);
				var action = ccs.load("res/win_node.json");
				win.runAction(action.action);
				action.action.gotoFrameAndPlay(0, 75, false)
				action.action.setLastFrameCallFunc(function () {
					win.removeFromParent();
				}.bind(this))
				cc.audioEngine.playEffect("res/audio/specialSound.mp3");
			} else if (isWin && isWin > 0 && view) {
				view.otherWinAnim();
			}
		}
	},

	winAnimOver: function () {
		if (!this.win_cnt_ || this.win_cnt_ <= 0)return


		this.win_over_ = this.win_over_ + 1;
		if (this.win_over_ >= this.win_cnt_) {
			this.win_over_ = null;
			this.win_cnt_ = null;
			this.clearGame();


			this.animation_manager.animationOver();

		}
	},

	stopWinAnim: function () {
		this.win_cnt_ = null;
		this.stopAllActions();
	},

	movePosition: function () {
		for (var i = 0; i < this.maxSeatsCnt; i++) {
			var pos = this.currentPos(i);
			this.seatViews[i].setPosition(this.seatsLayout[pos]);
			this.seatViews[i].updatePosition(pos);
		}
		this.setBtnPos();
	},


	updatePoolBet: function () {
		if (!pool_bet) return

		_rtPoolBet = 0;
		for (var k in pool_bet) {
			var v = pool_bet[k];
			_rtPoolBet = _rtPoolBet + v.bet;
		}

		for (var k in this.seatsInfo) {
			var v = this.seatsInfo[k];
			v.bet = v.bet || 0;
			_rtPoolBet = _rtPoolBet + v.bet;
		}

		this.poolBetView.updatePots(pool_bet, _rtPoolBet);
	},

	updatePoolCards: function (cards, callback) {
		poolCards = cards;
		this.poolCardsView.updatePoolCards(cards, callback);
	},



	addPoolCardsOver:function() {
		this.updateCardType();
		this.animation_manager.animationOver();
	},

	stopAddPoolCards:function() {
		this.poolCardsView.updatePoolCards(poolCards);
	},

	highLight:function( cards, cnt ) {
		this.seatViews[this.info.seatid-1].player.handCardsView.changeLightWithCards(cards, cnt);
		this.poolCardsView.changeLightWithCards(cards, cnt);
	},

	removeCardType:function() {
		if (this.cardType) {
			this.cardType.removeFromParent();
			this.cardType = null;
		}
	},

	initCardType:function() {
		if (!this.cardType) {
			this.cardType = new CardTypeView();

			var height = this.cardType.getHeight();

			this.cardType.setPosition(display.cx, height/2+2);
			this.addChild(this.cardType);
		}
	},

	updateCardType:function() {
		if (!this.info.playing || !dzglobal.checkSeatid(this.info.seatid)) {
			this.removeCardType();
			return;
		}

		if (!this.cardType) {
			return
		}

		if (this.info.fold) {
			this.cardType.setCardType(localizedStrings.getString("Fold"));
			return
		}

		var pool_cards = this.poolCardsView.getCards();
		var cards, cnt
		var info = this.cardType.updateType(this.seatsInfo[this.info.seatid-1].handCards, pool_cards);
		cards = info[0];
		cnt = info[1];
		this.highLight(cards, cnt);
	},

	updateAllBet:function() {
		for (var k in this.seatsInfo) {
			var v = this.seatsInfo[k];
			var allBet = v.allBet || 0;
			v.bet = v.bet || 0;
			allBet = allBet + v.bet;
			v.allBet = allBet;
			v.bet = 0;
		}

	},

	onEnterInsureNtf:function( event ) {
		var noAni = event.noAni;
		if (noAni) return;


		var enter_insure_func = function () {
			this.enterInsureAnim = new EnterInsureAnim(this.enterInsureAnimOver.bind(this));
			this.addChild(this.enterInsureAnim, INSURE_ANI_ZORDER);
			this.enterInsureAnim.setPosition(cc.p(display.cx, display.cy));
			this.enterInsureAnim.show();

		}

		_insure_state = true;

		this.animation_manager.addAnimation(enter_insure_func.bind(this), this.stopEnterInsureAnim.bind(this));
	},

	stopEnterInsureAnim:function() {
		this.enterInsureAnim.removeFromParent();
		this.enterInsureAnim = null;
		this.gotoNextStep(0.5)
	},

	enterInsureAnimOver:function() {
		this.enterInsureAnim = null;
		this.animation_manager.animationOver();

		this.showTreasureChest();
	},

	showTreasureChest:function() {

		if (_insure_state && !this.treasureChest) {
			this.treasureChest = ccs.csLoader.createNode("res/bxx.json");
			this.treasureChest.setPosition(CHEST_POS);
			this.addChild(this.treasureChest);
			var action = ccs.load("res/bxx.json");
			this.treasureChest.runAction(action.action);
			action.action.gotoFrameAndPlay(0, 24, false);
			this.gotoNextStep(0.5);
		}
	},

	onAskInsureNtf:function( event ) {
		var msg = event.netmsg || {};
		var timeout = msg.timeout || 0;
		var end_time = msg.end_time || 0;
		var mode = msg.mode || 0;
		var noAni = event.noAni;
		var speed = event.speed;

		_insure_state = true;

		if (noAni) return

		var ask_insure_func = function () {
			this.showTreasureChest();
			this.hideAllTimers();
			var insureds = msg.players_insured || {};
			for (var k in insureds) {
				var v = insureds[k];
				this.setTimer(v.seatid, timeout, timeout, speed);
			}

			this.animation_manager.animationOver();
			this.gotoNextStep();
		}

		this.animation_manager.addAnimation(ask_insure_func.bind(this));
	},

	onInsureNtf:function( event ) {
		var seatid = event.netmsg.seatid;
		var premium = event.netmsg.premium || 0;
		var noAni = event.noAni;

		var p = this.seatsInfo[seatid-1];
		if (p) {
			p.premium = premium;

			p.totalPremium = p.totalPremium || 0;
			p.totalPremium = p.totalPremium + premium;
		}

		if (noAni) return


		var insure_func = function () {
			this.hideTimer(seatid);
			var view = this.seatViews[seatid-1];
			view.playerPayPremium(premium, this.insureOver.bind(this));
			view.showInsureBubble(premium);

			if (premium > 0) {
				cc.audioEngine.playEffect("res/audio/insure_gold_01.mp3");
			}

		}
		this.animation_manager.addAnimation(insure_func.bind(this));
	},

	insureOver:function() {
		this.animation_manager.animationOver();
		this.gotoNextStep();
	},

	insureAnimPos:function() {
		var cnt = this.poolCardsView.cardsCnt();
		var x = POOL_CARDS_POS.x + (cnt - 3) * 89;
		return cc.p(x, POOL_CARDS_POS.y + 80);
	},

	playInsureAnim:function( anim_name, callback ) {
		var sp = ccs.csLoader.createNode(anim_name);
		sp.setPosition(this.insureAnimPos());
		this.addChild(sp, BET_VIEW_ZORDER);

		var remove = cc.callFunc(function () {
			sp.stopAllActions();
			sp.removeFromParent();

			if (callback) {
				callback();
			}
		}.bind(this))

		var action = ccs.load(anim_name);
		sp.runAction(action.action);

		action.action.gotoFrameAndPlay(0, 40, false);

		this.scheduleOnce(function () {
			sp.stopAllActions();
			sp.removeFromParent();

			if (callback) {
				callback();
			}
		}.bind(this), 2)
	},

	payInsuranceAnim:function( insurances ) {
		this.pay_insurance_over_ = 0;
		this.pay_insurance_cnt_ = insurances.length;

		this.removeAllBubble();

		for (var k in insurances) {
			var v = insurances[k];
			var no_loss = v.no_loss;
			var seatid = v.seatid;
			var view = this.seatViews[v.seatid-1];
			var cnt = this.poolCardsView.cardsCnt();


			if (no_loss && no_loss > 0) {
				var pos = view.convertToNodeSpace(CHEST_POS);
				view.premiumMoveAnim(pos, this.payInsuranceOver.bind(this))
				if (seatid == this.info.seatid) {
					this.poolCardsView.playInsureAnim(cnt, "ouye.json");
					cc.audioEngine.playEffect("res/audio/insure_success.mp3");

				} else {

					if (v.insurance > 0) {
						var pos = view.convertToNodeSpace(CHEST_POS);
						view.premiumMoveAnim(cc.p(0, 0), this.payInsuranceOver.bind(this));
						view.coinsMoveAnim(pos, cc.p(0, 0), v.insurance);
					} else {
						this.payInsuranceOver();
					}
					if (seatid == this.info.seatid) {
						this.poolCardsView.playInsureAnim(cnt, "baopai.json")
						cc.audioEngine.playEffect("res/audio/insure_lose.mp3");
					}
				}



			}
			else if(k == insurances.length -1 ){
				this.animation_manager.animationOver();
				this.gotoNextStep();
			}
		}
	},

	payInsuranceOver:function() {
		this.pay_insurance_over_ = this.pay_insurance_over_ + 1;

		if (this.pay_insurance_over_ >= this.pay_insurance_cnt_) {
			this.pay_insurance_cnt_ = 0;
			this.pay_insurance_over_ = 0;
			this.animation_manager.animationOver();
			this.gotoNextStep();
		}
	},

	onPayInsuranceNtf:function( event ) {
		var msg = event.netmsg || {};
		var insurances = msg.insurance || {};
		var noAni = event.noAni;

		if (insurances.length <= 0) {
			return
		}

		for (var k in insurances) {
			var v = insurances[k];
			var p = this.seatsInfo[v.seatid-1];
			if (p) {
				p.premium = 0;

				if (v.insurance && v.insurance > 0) {
					p.insurance = p.insurance || 0;
					p.insurance = p.insurance + v.insurance;
					p.gold = p.gold + v.insurance;
				}
			}
		}

		if (noAni) {
			return
		}
		var pay_insurance_func = function () {
			this.payInsuranceAnim(insurances);
		}
		this.animation_manager.addAnimation(pay_insurance_func.bind(this));
	}
});
