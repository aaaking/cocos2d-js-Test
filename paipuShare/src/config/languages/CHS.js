//
    // Author: fengqiang
// Date: 2016-05-05 11:42:59
//
    var CHS = {
//公用
        Tips : "德州圈—首推德州扑克保险模式，千人俱乐部，约上朋友一起组局吧",
ChipsName_1 	: "记分牌",
    //TexasController
GameEnd_10 		: "牌局还剩余10分钟",
    GameEnd_5 		: "牌局还剩余5分钟",
    GameEnd_1 		: "牌局还剩余1分钟",
    ConnectError 	: "网络连接异常，加入桌子失败。请退出游戏后重试。",
    Exit 			: "退    出",
    StandError 		: "您正在游戏中，无法站起。请先弃牌或等待游戏结束。",
    Confirm_1 		: "确    定",
    ExitError 		: "您正在游戏中，退出将会自动托管这一手牌。确定退出？",
    NetError 		: "网络连接异常，请检查网络",
    SitDownError_1 	: "坐下失败了, 这个位子有人坐",
    SitDownError_2 	: "坐下失败了, 你都不在房间怎么可能坐下",
    SitDownError_3 	: "您已经坐下了，祝您游戏愉快",
    SitDownError 	: "坐下失败了, 未知错误, code:",
    NoUserInfo 		: "无法获取用户信息",
    Blind 			: "盲注",
    Code 			: "邀请码",
    ANTE 			: "ANTE:",
    InsureMode_0 	: "普通模式",
    InsureMode_1 	: "保险模式:分池",
    InsureMode_2 	: "保险模式:快速",
    JoinError 		: "进入桌子失败, code:%s",
    JoinErrorMsg 	: "进入桌子失败，游戏可能已经结束。请退出游戏后重试。",
    JoinErrorMsg_1 	: "进入桌子失败，游戏版本过低，请更新APP后重试。",
    AddTimeError_1 	: "使用次数到达上限",
    AddTimeError_2 	: "使用失败，钻石不足",
    NoDiamond 		: "不足",
    Free 			: "免费",
    UnShow 			: "不亮牌",
    ShowCard 		: "结束后亮出 ",
    BuyChipsError 	: "购买记分牌失败",
    BuyChipsTips 	: "在下一局开始时，将为您补充所购记分牌",//"下局开始时将为你补充记分牌",
    BuyChipsError_1 : "购买记分牌数量不正确",
    BuyChipsError_2 : "站起时无法购买记分牌",
    BuyChipsError_3 : "记分牌超过最大携带上限",
    BuyChipsError_4 : "游戏中无法购买记分牌",
    BuyChipsError_5 : "金钱不足",
    BuyChipsFaile_1 : "当前记分牌过多，无法为你补充所购记分牌",
    Fold 			: "弃牌",
    RecordShort 	: "录音时间太短",
    InsureError_1 	: "你没有购买保险的资格",
    InsureError_2 	: "保险金额不正确",
    InsureError_3 	: "您的余额不足，购买保险失败",
    ForceStand 		: "您已连续3次超时啦，先站起来休息下吧。",
    OwnerCtlError 	: "您已经被房主拒绝5次，本局中不可继续申请带入",
    TableEndTips	: "房主提前结束牌局，\n当前这手牌结束后，牌局将会结束",
    NoInsureReason_1 : "outs＞15或outs:0，不能购买保险",
    NoInsureReason_2 : "投保金额<1，不需要购买保险",
    PlayerLeaveMsg : "连续超时3次，系统托管中。",
    PlayerLeaveBtn : "我回来了",
    CheckInTips_1		: "报名成功!",
    CheckInTips_2	: "还差%d人开始比赛",
    AskSit			: "找个位置坐下",
    SitAndWait		: "等待房主开局",
    SitAndWait_1	: "德扑，朋友间的乐趣",
    SitAndWait_2	: "严禁赌博，违者封号",
    SitAndWait_3	: "绿色德州，体育竞技",
    CurrLevel	: "当前级别",

    //SideBoard
HighCard 		: "高牌",
    OnePair 		: "一对",
    TwoPair 		: "两对",
    Three 			: "三条",
    Straight 		: "顺子",
    Flush 			: "同花",
    FullHouse 		: "葫芦",
    Four 			: "四条",
    StraightFlush 	: "同花顺",
    RoyalStraightFlush : "皇家同花顺",

    //GameRecord
RealTimeRecord 	: "实时战绩",
    Previously 		: "上局回顾",

    //RecordBoard
Player 				: "玩家",
    Bought 				: "买入",
    Profit 				: "盈利",
    InsureList 			: "保险记录",
    //"" : "买入",
    InsuranceNoProfit 	: "保险盈利",
    Looker 				: "看客",
    Table				: "牌桌",

    //PreviouslyBoard
Collect 	: "收藏",
    Collected 	: "已收藏",
    Collecting 	: "收藏中",
    Sheet 		: "牌谱",

    //TableEndView
GameOver 		: "游戏结束",
    PersonalRecord 	: "个人战绩",
    HandsCount 		: "本局总手数",
    MaxPot 			: "本局最大Pot",
    TotalBought 	: "本局总买入",
    NickName 		: "昵称",
    //"" : "买入",
    //"" : "盈利",

    //BuyChipsView
//"" : "在下一局开始时，将为您补充所购记分牌",
    Balance 		: "账户余额",
    Geting 			: "获取中",
    ServiceCharge 	: "服务费",
    SureToBuy 		: "确定买入",

    //MttRebuyView
RebuyChips		: "重购记分牌（%d次）",
    AddonChips		: "增购记分牌（%d次）",
    RebuyFee		: "费用",

    //OnwerControlView
OwnerCtl 	: "房主管理",
    CtlPlayer 	: "控制玩家带入",
    EndTable	: "结束牌局",
    PauseTable	: "暂停牌局",
    EndTableAlert_1 : "当前这手牌结束后，牌局将会结束\n确定提前结束牌局？",
    EndTableAlert_2 : "确定提前结束牌局？",

    //MenuView
StandUp : "站起围观",
    //"" : "房主管理",
    CardTips : "牌型提示",
    BuyChips : "补充记分牌",
    ExitGame : "退出牌局",
    BackToHall : "返回大厅",
    Rebuy	: "重购",
    Addon	: "增购",

    //PotsInsureButtons
Pay 			: "支付",
    GiveUp 			: "放弃",
    AllGuaranteed 	: "全部保本",
    SelectPot 		: "请选择分池",
    ConfirmBuy 		: "确认购买",

    //PotsInsurePot
//"" : "支付",
    Odds 		: "赔率",
    Guaranteed 	: "保本",
    Insurance 	: "赔付",
    ClickToSelect : "点击选择",
    hasSelected	: "已选择",

    //PreInsureView
Buy : "购买",
    BuyInsure : "购买保险",

    //PayPremiumView
//"" : "保本",
    AllPots : "全底池",
    ConfirmBuy_1 : "确认\n购买",

    //ManualBetView
//"" : "盲注",
    Pot 	: "底池",
    Check 	: "看牌",
    Call 	: "跟注",
    //"" : "弃牌",
    Raise : "加注",

    ConfirmRaise : "确认",

    //AutoBetView
AutoFold 	: "自动弃牌",
    AutoCheck 	: "自动看牌",
    AutoCall 	: "自动跟注",

    //NoMoneyAlerter
BalanceError 	: "获取账户余额失败，是否重试?",
    NoCoins 		: "德州币余额不足",
    NoMoneyTips 	: "花费%s钻石购买\n%s(送%s德州币)",
    BuyCoinsError 	: "购买德州币失败",
    NoDiamond_1 	: "钻石不足，请先充值",
    Confirm 		: "确定",
    Cancel 			: "取消",

    //SimpleInsureView
FreeBuy	: "自由购买",

    //AlerterView
// Yes : "是",
    // No 	: "否",

    //PotViewsManager
//"" : "底池",

    //RecordView
CancelSend_1 : "松开取消发送",
    CancelSend_2 : "上滑取消发送",

    //SeatManager
Waiting : "等待",

    //SelfInfoBoard
Vip_1 			: "普通会员",
    Vip_2 			: "白金会员",
    Vip_3 			: "黑金会员",
    Profile 		: "个人信息",
    MyWinning 		: "总胜率",
    MyHandsCount 	: "总手数",
    MyEnterPot 		: "入池率",
    MyAgressive 	: "激进度",
    MyShowDown 		: "摊牌率",
    SoundEffect 	: "游戏音效",
    Voice 			: "语音",

    //BuyChipsInfoView
WaitAgree 	: "等待房主同意带入申请(%ds)",
    Disagree 	: "拒绝",
    Agree 		: "同意",
    OwnerHas 	: "房主已",
    BuyReq 		: "您的带入请求",

    //BuyChipsNoticeView
ReqBuy 		: "%s申请带入%d筹码",
    DoAgree 	: "是否同意?",
    Agree_1 	: "同  意",
    Disagree_1 	: "  拒绝（%ds）",

    //CardTypeView
HighCard_1 		: "高  牌",
    OnePair_1 		: "一  对",
    TwoPair_1 		: "两  对",
    Three_1			: "三  条",
    Straight_1 		: "顺  子",
    Flush_1 		: "同  花",
    FullHouse_1 	: "葫  芦",
    Four_1 			: "四  条",
    StraightFlush_1 : "同花顺",
    //"" : "皇家同花顺",

    //OtherPlayerInfoView
UseGoodsNoCoins : "德州币不足，无法使用",
    UseGoodsNoDiamond : "钻石币不足，无法使用",
    UseGoodsError_1 : "使用失败，参数错误",
    UseGoodsError_2 : "使用失败，对方已经站起",
    UseGoodsError_3 : "请先找个座位坐下才能使用",
    UseGoodsError_4 : "使用失败，错误id:4",

    //TexasSheetPlayer
NoSheet : "无法获取牌谱信息",

    //TablePauseView
TablePause : "牌局暂停中",
    WaitTime : "等待时间 %02d:%02d",

    //SNG
BlindTime 		: "涨盲时间",
    CurrBlind 		: "当前盲注",
    StartBlind 		: "起始盲注",
    MaxBuyChips 	: "带入",
    BlindUpdate	    : "盲注涨至",
    Ranking  		: "名次",
    Reward 			: "奖励",
    RankingInfo 	: "获得第%s名",
    RewardInfo		: "您获得奖金为%s",
    Minute			: "分钟",
    MatchOver  		: "比赛结束",
    TotalTime 		: "牌局时间",
    TotalPlayer 	: "参赛人数",
    TotalChips  	: "总奖池",
    MatchRule 		: "赛事说明",
    RewardTitle  	: "奖励设置",
    BlindRule  		: "盲注说明",
    Level  			: "等级",
    RankingStr		: "第{ranking}名",
    MatchExit		: "退出比赛，将进入系统托管，直到您重新回到比赛或比赛结束，是否退出？",
    MatchAutoOver 	: "由于长时间未开始比赛，牌局将在5分钟后解散。",
    EndMatchAlert_1 : "提前结束比赛，带入的记分牌将会返还，是否结束？",
    MatchStartTips  : "比赛开始",
    MatchAutoOver_1 : "牌局将在2秒后结束",

    //SNGCheckInView
CheckInTitle	: "报名参赛",
    initialChips : "初始记分牌",
    ConfirmCheckIn : "确认参赛",
    CheckInFee : "参赛费",

    //SeatView
SitDown : "坐下",
    CheckIn : "参赛",

    MatchStartChips : "初始记分牌",
    MatchCheckin 	: "参赛费用",
    RewardInfo_0	: "没关系，继续加油！",

    //MTT
BlindLevel		: "盲注等级",
    RewardCount		: "奖励圈",
    MTTMatchOver  	: "MTT比赛结束",
    Eliminate		: "牌局结束，未能达到奖励名次 请再接再厉",
    GotoRest 		: "此手牌结束后，将进入中场休息",
    GotoRest1 		: "所有牌桌结束此局后",
    GotoRest2		: "将中场休息5分钟",
    MatchInRest1 	: "现在是中场休息",
    MatchInRest2 	: "比赛%s分钟后继续",
    MatchInRest3 	: "比赛%s秒后继续",
    FinalRest 		: "决赛前休息",
    MatchTableMerge : "当前牌桌比赛已经结束，请返回大厅",
    Viewrecord      : "查看战绩",
}

