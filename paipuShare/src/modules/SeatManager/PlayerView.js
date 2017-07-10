

var PlayerView = cc.Node.extend({
    ctor:function (p) {
        this._super();
        // console.info(p);
        this.handCardsView = new HandCardsView();
        this.addChild(this.handCardsView,HAND_CARD_ZORDER);
        this.emoticon_state = PlayerView.EMOTICON_IDLE;
        this.seatid = p.seatid;
        this.uid = p.uid;
    }
});


var GOLD_POSY = -65
var NICK_NAME_POSY = -100
var SEAT_RADIUS = 47

var AVATAR_MOVE_DUR = 0.5

var AVATAR_FRAME_ZORDER = 10
var TIMER_ZORDER = 20
var HAND_CARD_ZORDER = 30
var BUBBLE_ZORDER = 40
var EMOTICON_BG_ZORDER = 50
var EMOTICON_ZORDER = 51

PlayerView.DEAL_CARDS_T = 0.3
PlayerView.FOLD_CARDS_T = 0.5

PlayerView.EMOTICON_PLAYING = 1
PlayerView.EMOTICON_IDLE = 2


 PlayerView.prototype.setDealCardsPos = function( pos ) {
     this.dealCardsPos = pos;
 };

 PlayerView.prototype.showNickNameView = function () {
     if (this.nicknameView) {
         this.nicknameView.setVisible(true);
     }
 };

 PlayerView.prototype.setNicknameView = function( name ) {
     name = name || "";
     if (!this.nicknameView) {
         this.nicknameView = new cc.LabelTTF(name, "Arial", 24);
         this.nicknameView.setColor(cc.color(161, 197, 214));
         this.nicknameView.setAnchorPoint(cc.p(0.5, 0.5));
         this.nicknameView.setPosition(cc.p(0, this.nicknamePos.y));
         this.addChild(this.nicknameView);
     }
     else {
         // console.info(this.nicknameView);
         this.nicknameView.setString(name);
     }
 };

PlayerView.prototype.hideNicknameView = function() {
     if (this.nicknameView){
         this.nicknameView.setVisible(false);
     }
 };

PlayerView.prototype.removeNicknameView = function(){
    if (!this.nicknameView) {
        return;
    }
    this.nicknameView.removeFromParent();
    this.nicknameView = null;
};

PlayerView.prototype.setAvatarWithUrl=function(url) {
     if (this.avatar) {
         this.avatar.setTextureWithUrl(url);
         return
     }
    // this.bgavatar = cc.Sprite.create("res/avatar_male.png");
    // this.addChild(this.bgavatar);
    this.avatar = new webImage(url);
    // this.avatar = cc.Sprite.create("res/avatar_male.png");
    this.addChild(this.avatar);
    // var self = this;
    // var url = "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==";
    // cc.loader.loadImg("http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=cocos2dx%20js%20he%20cross-origin%20image%20at%20http%3A%2F%2F192.168.0.194%2Fraise_1.png%20may%20n&step_word=&pn=1&spn=0&di=56573611192&pi=&rn=1&tn=baiduimagedetail&is=&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=461973542%2C1568879213&os=3918523300%2C1473074034&simid=0%2C0&adpicid=0&ln=1498&fr=&fmq=1464090501108_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fimg.52z.com%2Fupload%2F2508%2F1eed2019325ee6310d19c35c133928a7_265_235.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bcdz_z%26e3Bv54AzdH3Ff5upAzdH3Fdca0mc_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0", {isCrossOrigin : true }, function(err,img){
    //     var logo  = new cc.Sprite(img);
    //     self.addChild(logo);
    // });
    // cc.textureCache.addImage("http://192.168.0.194/raise_1.png", function(texture) {
    //     if(texture) {
    //         // Use texture
    //         alert("获取到了");
    //         this.avatar.setTexture(texture);
    //     }
    //     console.log("huoqushibai");
    // },this);


    // console.log("加载头像============");
 };
PlayerView.prototype.showAvatar = function () {
    this.avatar.setOpacity(255);
};

PlayerView.prototype.setCoinView = function( coins ) {
    var text
    if (!coins) {
        text = "获取中";
    } else {
        text = formatNumberStr(coins)
    }

    if (!this.coinView) {
        this.coinView = cc.Sprite.create("res/coin_view_bg.png");
        this.avatar.addChild(this.coinView);
        this.coinView.setPosition(cc.p(0, 78));

        var coin = cc.Sprite("res/coin.png");
        this.coinView.addChild(coin);
        coin.setPosition(cc.p(10, 17));

        this.coinLabel = new cc.LabelTTF(text, "Arial", 20);
        this.coinLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.coinLabel.setPosition(cc.p(65, 17));
        this.coinView.addChild(this.coinLabel);

    } else {
        this.coinLabel.setString(text);
        this.coinView.setVisible(true);
    }
};

PlayerView.prototype.hideCoinView = function () {
    if(!this.coinView){
        return;
    }
    this.coinView.setVisible(false);
};

PlayerView.prototype.setGoldView = function (gold) {
    gold =gold || 0;
    var text;
    if (gold && typeof(gold) != "number")
    {
        text = tostring(gold);
        gold = 0;
    }else
    {
        text = dzglobal.formatNumberStr(gold);
    }
    this.uiGold = gold;
    if (!this.goldView) {
        this.goldView = cc.Sprite.create("res/gold.png");
        this.goldView.setPosition(this.goldPos);
        this.addChild(this.goldView);
        var size = this.goldView.getContentSize();
        this.goldLabel = new cc.LabelTTF(text, "Arial", 24);
        this.goldLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.goldLabel.setPosition(size.width / 2, size.height / 2);
        this.goldView.addChild(this.goldLabel);
    }else{
        this.goldLabel.setString(text);
    }
};



PlayerView.prototype.setBetView = function(sprite, bet, pos ) {
    this.uiBet = bet || 0;
    //console.log("bet==============="+bet+"pos====="+pos);
    if (sprite && this.betSprite && this.betSprite != sprite)
    {
        this.removeBetView();
    }
    if (bet && bet > 0 && sprite) {

        if (!this.betView) {
            this.betSprite = sprite;
            this.betView = cc.Sprite.create(sprite);
            this.betView.setPosition(pos);
            this.addChild(this.betView);
            var posX = this.betView.getContentSize().width * 0.5;

            this.betLabel = new cc.LabelTTF(text = dzglobal.formatNumberStr(bet), "Arial", size = 20)
            this.betLabel.setAnchorPoint(cc.p(0.5, 0.5));
            this.betLabel.setPosition(posX, -10);
            this.betView.addChild(this.betLabel);
        }
        else {
            this.betView.setVisible(true);
            this.betLabel.setString(dzglobal.formatNumberStr(bet));
        }
    }
    else {
        if (this.betView) {
            this.betView.setVisible(false);
        }
    }

};
PlayerView.prototype.removeBetView = function () {
    if (!this.betSprite) {
        return;
    }
    this.betSprite = null;
    this.betView.removeFromParent();
    this.betView = null;
};


PlayerView.prototype.updatePosition = function( position ) {
    this.position = position;
};

PlayerView.prototype.darkAvatar = function(){
    this.avatar.setColor(cc.color(100, 100, 100));
};

PlayerView.prototype.normalAvatar = function() {
    this.avatar.setColor(cc.color(255, 255, 255))
};

PlayerView.prototype.startTimer = function(time, total_time, speed) {
    if (!this.timer) {
        this.timer = new TimerView();
        this.avatar.addChild(this.timer,TIMER_ZORDER);
    }
    this.timer.setTimerSpeed(speed || 1.0);
    var size = this.avatar.getContentSize();
    var posX = this.avatar.getPositionX();
    var posY = this.avatar.getPositionY();
    this.timer.timerAdjustTo(size, cc.p(0, 0));
    this.timer.startTimer(time, total_time);
};
PlayerView.prototype.startInsureTimer = function( time, total_time, speed ) {
    speed = speed || 1.0;
    if (!this.insureTimer) {
        this.insureTimerBg = new cc.Sprite("res/insure_other_timer_bg.png");
        this.addChild(this.insureTimerBg);
        this.insureTimerBg.setPosition(0, 90);

        this.insureTimer = new cc.ProgressTimer(new cc.Sprite("res/insure_other_timer.png"));
        this.insureTimer.type = cc.ProgressTimer.TYPE_BAR;
        this.insureTimer.setMidpoint(cc.p(1, 0.5));
        this.insureTimer.setBarChangeRate(cc.p(1, 0));

        this.addChild(this.insureTimer);
        this.insureTimer.setPosition(0, 90);
    }

    this.insureTimerBg.setVisible(true);
    this.insureTimer.setVisible(true);

    this.insureTimer.runAction(cc.progressFromTo(time / speed, time / total_time * 100, 1))

    this.insureTimer.resume();
}

PlayerView.prototype.hideInsureTimer = function() {
    if (this.insureTimer) {
        this.insureTimer.setVisible(false)
    }

    if (this.insureTimerBg) {
        this.insureTimerBg.setVisible(false)
    }

};
PlayerView.prototype.hideTimer = function() {
    if (!this.timer) {
        return;
    }
    this.timer.hideTimer();
};

PlayerView.prototype.showBubble = function( bubble, x, y, align ) {
    if (this.bubble) {
        this.bubble.removeFromParent();
    }

    this.bubble_name = bubble;

    var avatar_x = this.avatar.getPositionX();
    var avatar_y = this.avatar.getPositionY();

    var bub_img = "#bubble_" + (bubble * 10 + align) + ".png";
    this.bubble = cc.Sprite.create(bub_img);

    this.bubble.setPosition(avatar_x + x, avatar_y + y);
    this.addChild(this.bubble, BUBBLE_ZORDER)
}


PlayerView.prototype.removeBubble = function() {
    if (this.bubble) {
        this.bubble.removeFromParent();
        this.bubble = null;
        this.bubble_name = null;
    }
}

// function PlayerView:showAudioPlayView( duration, silence)
// if not this.audioPlayView then
// this.audioPlayView = AudioPlayView.new(duration)
// :pos(0, 0)
// :addTo(self)
// end
//
// this.audioPlayView:updateDuration(duration, silence)
// this.audioPlayView:setVisible(true)
//
// return this.audioPlayView
// end
//
// function PlayerView:hideAudioPlayView()
// if not this.audioPlayView then
// return
// end
//
// this.audioPlayView:setVisible(false)
// end
//
// function PlayerView:emoticonEnded()
// if self:checkEmoticonQueue() then
// return
// end
//
// this.emoticon_state = PlayerView.EMOTICON_IDLE
//
// if this.emoticonPop then
// this.emoticonPop:removeSelf()
// this.emoticonPop = nil
// end
//
// -- this.avatar:setVisible(true)
// -- if this.allInAnim then
// -- 	this.allInAnim:setVisible(true)
// -- end
// end
//
// function PlayerView:emoticonBegan(n)
// this.emoticon_state = PlayerView.EMOTICON_PLAYING
//
// -- if this.showing_hand_cards then
// -- 	this.emoticon:setvarZOrder(10)
// -- 	this.emoticon:setScale(0.7)
// -- else
// -- 	if this.allInAnim then
// -- 		this.allInAnim:setVisible(false)
// -- 	end
// -- 	this.avatar:setVisible(false)
// -- 	this.emoticon:setvarZOrder(0)
// -- 	this.emoticon:setScale(1)
// -- end
//
// if this.emoticonPop then
// this.emoticon:show(n)
// return
// end
//
// if this.position <= 5 then
// this.emoticonPop  = cc.CSLoader:createNode("ani_pop_l.csb")
// :addTo(self, EMOTICON_BG_ZORDER)
// :pos(10, 10)
//
// this.emoticon:pos(this.emoticonPop:getPositionX() + 55, this.emoticonPop:getPositionY() + 58)
//
// var timeline = cc.CSLoader:createTimeline("ani_pop_l.csb")
// this.emoticonPop:runAction(timeline)
// timeline:gotoFrameAndPlay(0, false)
// timeline:setLastFrameCallFunc(function ()
// this.emoticon:show(n)
// end)
// else
// this.emoticonPop  = cc.CSLoader:createNode("ani_pop_r.csb")
// :addTo(self, EMOTICON_BG_ZORDER)
// :pos(-10, 10)
//
// this.emoticon:pos(this.emoticonPop:getPositionX() - 55, this.emoticonPop:getPositionY() + 58)
//
// var timeline = cc.CSLoader:createTimeline("ani_pop_r.csb")
// this.emoticonPop:runAction(timeline)
// timeline:gotoFrameAndPlay(0, false)
// timeline:setLastFrameCallFunc(function ()
// this.emoticon:show(n)
// end)
// end
// end
//
// function PlayerView:checkEmoticonQueue()
// this.emoticon_queue = this.emoticon_queue or {}
// if #this.emoticon_queue > 0 then
// var emoticon = table.remove(this.emoticon_queue, 1)
// self:emoticonBegan(emoticon)
// return true
// end
// return false
// end
//
// function PlayerView:showEmoticon( n )
// if not this.emoticon then
// this.emoticon = Emoticon.new(handler(self, this.emoticonEnded))
// -- :scale(0.6)
// -- :scale(1.0)
// :addTo(self, EMOTICON_ZORDER)
// end
//
// -- var posX = this.avatar:getPositionX()
// -- var posY = this.avatar:getPositionY()
//
// -- this.emoticon:pos(posX, posY)
//
// if this.emoticon_state == PlayerView.EMOTICON_PLAYING then
// this.emoticon_queue = this.emoticon_queue or {}
// table.insert(this.emoticon_queue, n)
// else
// self:emoticonBegan(n)
// end
// end
//
PlayerView.prototype.showAllInAnim = function() {
    if (this.allInAnim) {
        return
    }

    var posX = this.avatar.getContentSize().width / 2;
    var posY = this.avatar.getContentSize().height / 2;

    this.allInAnim = ccs.csLoader.createNode("res/allin.json");
    this.avatar.addChild(this.allInAnim, -1);
    var action = ccs.load("res/allin.json");
    this.allInAnim.runAction(action.action)
    action.action.gotoFrameAndPlay(0, true)
}

PlayerView.prototype.removeAllInAnim = function() {
    if (!this.allInAnim) {
        return
    }

    this.allInAnim.removeFromParent();
    this.allInAnim = null;
}

PlayerView.prototype.showMatchOver = function(ranking) {
    this.avatar.setColor(cc.color(90, 90, 90));
    var img = new cc.Sprite("res/match_player_giveup.png");
    this.avatar.addChild(img)
    String.prototype.format=function(args){
        if(arguments.length>0){
            var result=this;
            if(arguments.length==1&&typeof(args)=="object"){
                for(var key in args){
                    var reg=new RegExp("({"+key+"})","g");
                    result=result.replace(reg, args[key]);
                }
            }
            else{
                for(var i=0;i<arguments.length;i++){
                    if(arguments[i]==undefined){
                        return "";
                    }
                    else{
                        var reg=new RegExp ("({["+i+"]})","g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
            return result;
        }
        else{
            return this;
        }
    }
    var text = localizedStrings.getString("RankingStr");
    var label = new cc.LabelTTF(text.format({ranking:ranking}), "Arial", 24);

    this.avatar.addChild(label, 99);
    label.setPosition(0, 0)
    label.setAnchorPoint(cc.p(0, 0));

    if (this.rankingImg) {
        this.rankingImg.removeFromParent();
        this.rankingImg = null;
    }

    this.hideGoldView()
}