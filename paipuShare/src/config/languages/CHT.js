//
    // Author: fengqiang
// Date: 2016-05-05 11:42:59
//
    var CHT = {
//公用
        Tips : "德州圈—首推德州撲克保險模式，千人俱樂部，約上朋友一起組局吧",
ChipsName_1 	: "記分牌",
    //TexasController
GameEnd_10 		: "牌局還剩餘10分鐘",
    GameEnd_5 		: "牌局還剩餘5分鐘",
    GameEnd_1 		: "牌局還剩餘1分鐘",
    ConnectError 	: "網路連接異常，加入桌子失敗。請退出遊戲後重試。",
    Exit 			: "退    出",
    StandError 		: "您正在遊戲中，無法站起。請先棄牌或等待遊戲結束。",
    Confirm_1 		: "確    定",
    ExitError 		: "您正在遊戲中，退出將會自動託管這一手牌。確定退出？",
    NetError 		: "網路連接異常，請檢查網路",
    SitDownError_1 	: "坐下失敗了, 這個位子有人坐",
    SitDownError_2 	: "坐下失敗了, 你都不在房間怎麼可能坐下",
    SitDownError_3 	: "您已經坐下了，祝您遊戲愉快",
    SitDownError 	: "坐下失敗了, 未知錯誤, code:",
    NoUserInfo 		: "無法獲取使用者資訊",
    Blind 			: "盲注",
    Code 			: "邀請碼",
    ANTE 			: "ANTE:",
    InsureMode_0 	: "普通模式",
    InsureMode_1 	: "保險模式:分池",
    InsureMode_2 	: "保險模式:快速",
    JoinError 		: "進入桌子失敗, code:%s",
    JoinErrorMsg 	: "進入桌子失敗，遊戲可能已經結束。請退出遊戲後重試。",
    JoinErrorMsg_1 	: "進入桌子失敗，遊戲版本過低，請更新APP後重試。",
    AddTimeError_1 	: "使用次數到達上限",
    AddTimeError_2 	: "使用失敗，鑽石不足",
    NoDiamond 		: "不足",
    Free 			: "免費",
    UnShow 			: "不亮牌",
    ShowCard 		: "結束後亮出 ",
    BuyChipsError 	: "購買記分牌失敗",
    BuyChipsTips 	: "在下一局開始時，將為您補充所購記分牌",//"下局開始時將為你補充記分牌",
    BuyChipsError_1 : "購買記分牌數量不正確",
    BuyChipsError_2 : "站起時無法購買記分牌",
    BuyChipsError_3 : "記分牌超過最大攜帶上限",
    BuyChipsError_4 : "遊戲中無法購買記分牌",
    BuyChipsError_5 : "金錢不足",
    BuyChipsFaile_1 : "當前記分牌過多，無法為你補充所購記分牌",
    Fold 			: "棄牌",
    RecordShort 	: "錄音時間太短",
    InsureError_1 	: "你沒有購買保險的資格",
    InsureError_2 	: "保險金額不正確",
    InsureError_3 	: "您的餘額不足，購買保險失敗",
    ForceStand 		: "您已連續3次超時啦，先站起來休息下吧。",
    OwnerCtlError 	: "您已經被房主拒絕5次，本局中不可繼續申請帶入",
    TableEndTips 	: "房主提前結束牌局，\n當前這手牌結束後，牌局將會結束",
    NoInsureReason_1 : "outs＞15或outs:0，不能購買保險",
    NoInsureReason_2 : "投保金額<1，不需要購買保險",
    PlayerLeaveMsg : "連續超時3次，系統託管中。",
    PlayerLeaveBtn : "我回來了",
    CheckInTips_1		: "報名成功！",
    CheckInTips_2		: "還差%d人開始比賽",

    //SideBoard
HighCard 		: "高牌",
    OnePair 		: "一對",
    TwoPair 		: "兩對",
    Three 			: "三條",
    Straight 		: "順子",
    Flush 			: "同花",
    FullHouse 		: "葫蘆",
    Four 			: "四條",
    StraightFlush 	: "同花順",
    RoyalStraightFlush : "皇家同花順",

    //GameRecord
RealTimeRecord 	: "即時戰績",
    Previously 		: "上局回顧",

    //RecordBoard
Player 				: "玩家",
    Bought 				: "買入",
    Profit 				: "盈利",
    InsureList 			: "保險記錄",
    //"" : "買入",
    InsuranceNoProfit 	: "保險盈利",
    Looker 				: "看客",
    Table				: "牌桌",

    //PreviouslyBoard
Collect 	: "收藏",
    Collected 	: "已收藏",
    Collecting 	: "收藏中",
    Sheet 		: "牌譜",

    //TableEndView
GameOver 		: "遊戲結束",
    PersonalRecord 	: "個人戰績",
    HandsCount 		: "本局總手數",
    MaxPot 			: "本局最大Pot",
    TotalBought 	: "本局總買入",
    NickName 		: "昵稱",
    //"" : "買入",
    //"" : "盈利",

    //BuyChipsView
//"" : "在下一局開始時，將為您補充所購記分牌",
    Balance 		: "帳戶餘額",
    Geting 			: "獲取中",
    ServiceCharge 	: "服務費",
    SureToBuy 		: "確定買入",

    //OnwerControlView
OwnerCtl 	: "房主管理",
    CtlPlayer 	: "控制玩家帶入",
    EndTable	: "結束牌局",
    PauseTable	: "暫停牌局",
    EndTableAlert_1 : "當前這手牌結束後，牌局將會結束\n確定提前結束牌局？",
    EndTableAlert_2 : "確定提前結束牌局？",

    //MenuView
StandUp : "站起圍觀",
    //"" : "房主管理",
    CardTips : "牌型提示",
    BuyChips : "補充記分牌",
    ExitGame : "退出牌局",
    BackToHall : "返回大廳",

    //PotsInsureButtons
Pay 			: "支付",
    GiveUp 			: "放棄",
    AllGuaranteed 	: "全部保本",
    SelectPot 		: "請選擇分池",
    ConfirmBuy 		: "確認購買",

    //PotsInsurePot
//"" : "支付",
    Odds 		: "賠率",
    Guaranteed 	: "保本",
    Insurance 	: "賠付",
    ClickToSelect : "點擊選擇",
    hasSelected	: "已選擇",

    //PreInsureView
Buy : "購買",
    BuyInsure : "購買保險",

    //PayPremiumView
//"" : "保本",
    AllPots : "全底池",
    ConfirmBuy_1 : "確認\n購買",

    //ManualBetView
//"" : "盲注",
    Pot 	: "底池",
    Check 	: "看牌",
    Call 	: "跟注",
    //"" : "棄牌",
    Raise : "加注",

    ConfirmRaise : "確認",

    //AutoBetView
AutoFold 	: "自動棄牌",
    AutoCheck 	: "自動看牌",
    AutoCall 	: "自動跟注",

    //NoMoneyAlerter
BalanceError 	: "獲取帳戶餘額失敗，是否重試?",
    NoCoins 		: "德州幣餘額不足",
    NoMoneyTips 	: "花費%s鑽石購買\n%s(送%s德州幣)",
    BuyCoinsError 	: "購買德州幣失敗",
    NoDiamond_1 	: "鑽石不足，請先充值",
    Confirm 		: "確定",
    Cancel 			: "取消",

    //AlerterView
// Yes : "是",
    // No 	: "否",

    //PotViewsManager
//"" : "底池",

    //SimpleInsureView
FreeBuy	: "自由購買",

    //RecordView
CancelSend_1 : "鬆開取消發送",
    CancelSend_2 : "上滑取消發送",

    //SeatManager
Waiting : "等待",

    //SelfInfoBoard
Vip_1 			: "普通會員",
    Vip_2 			: "白金會員",
    Vip_3 			: "黑金會員",
    Profile 		: "個人資訊",
    MyWinning 		: "總勝率",
    MyHandsCount 	: "總手數",
    MyEnterPot 		: "入池率",
    MyAgressive 	: "激進度",
    MyShowDown 		: "攤牌率",
    SoundEffect 	: "遊戲音效",
    Voice 			: "語音",

    //BuyChipsInfoView
WaitAgree 	: "等待房主同意帶入申請(%ds)",
    Disagree 	: "拒絕",
    Agree 		: "同意",
    OwnerHas 	: "房主已",
    BuyReq 		: "您的帶入請求",

    //BuyChipsNoticeView
ReqBuy 		: "%s申請帶入%d籌碼",
    DoAgree 	: "是否同意?",
    Agree_1 	: "同  意",
    Disagree_1 	: "  拒絕（%ds）",

    //CardTypeView
HighCard_1 		: "高  牌",
    OnePair_1 		: "一  對",
    TwoPair_1 		: "兩  對",
    Three_1			: "三  條",
    Straight_1 		: "順  子",
    Flush_1 		: "同  花",
    FullHouse_1 	: "葫  蘆",
    Four_1 			: "四  條",
    StraightFlush_1 : "同花順",
    //"" : "皇家同花順",

    //OtherPlayerInfoView
UseGoodsNoCoins : "德州幣不足，無法使用",
    UseGoodsNoDiamond : "鑽石幣不足，無法使用",
    UseGoodsError_1 : "使用失敗，參數錯誤",
    UseGoodsError_2 : "使用失敗，對方已經站起",
    UseGoodsError_3 : "請先找個座位坐下才能使用",
    UseGoodsError_4 : "使用失敗，錯誤id:4",

    //TexasSheetPlayer
NoSheet : "無法獲取牌譜資訊",

    //TablePauseView
TablePause : "牌局暫停中",
    WaitTime : "等待時間 %02d:%02d",

    //SNG
BlindTime 		: "漲盲時間",
    CurrBlind 		: "當前盲注",
    StartBlind 		: "起始盲注",
    MaxBuyChips 	: "帶入",
    BlindUpdate	    : "盲注漲至",
    Ranking  		: "名次",
    Reward 			: "獎勵",
    RankingInfo 	: "獲得第%s名",
    RewardInfo		: "您獲得獎金為%s",
    Minute			: "分鐘",
    MatchOver  		: "比賽結束",
    TotalTime 		: "牌局時間",
    TotalPlayer 	: "參賽人數",
    TotalChips  	: "總獎池",
    MatchRule 		: "賽事說明",
    RewardTitle  	: "獎勵設置",
    BlindRule  		: "盲注說明",
    Level  			: "等級",
    RankingStr		: "第%s名",
    MatchExit		: "退出比賽，將進入系統託管，直到您重新回到比賽或比賽結束，是否退出？",
    MatchAutoOver 	: "由於長時間未開始比賽，牌局將在5分鐘後解散。",
    EndMatchAlert_1 : "提前結束比賽，帶入的記分牌將會返還，是否結束？",
    MatchStartTips  : "比賽開始",
    MatchAutoOver_1 : "牌局將在2秒後結束",
    MatchStartChips : "初始記分牌",
    MatchCheckin 	: "參賽費用",
    RewardInfo_0	: "沒關係，继续加油！",
    AskSit			: "找個位置坐下",
    SitAndWait		: "等待房主開局",
    SitAndWait_1	: "德撲，朋友間的樂趣",
    SitAndWait_2	: "嚴禁賭博，違者封號",
    SitAndWait_3	: "綠色德州，體育競技",


    //SNGCheckInView
CheckInTitle	: "報名參賽",
    initialChips : "初始記分牌",
    ConfirmCheckIn : "確認參賽",
    CheckInFee : "參賽費",

    //SeatView
SitDown : "坐下",
    CheckIn : "參賽",

    //MTT
BlindLevel		: "盲注等級",
    RewardCount		: "獎勵圈",
    MTTMatchOver  	: "MTT比賽結束",
    Eliminate		: "牌局結束，未能達到獎勵名次 請再接再厲",
    GotoRest 		: "此手牌結束后，將進入中場休息",
    GotoRest1 		: "所有牌桌结束此局后",
    GotoRest2		: "將中場休息5分鐘",
    MatchInRest1 	: "現在是中場休息",
    MatchInRest2 	: "比賽%s分鐘后繼續",
    MatchInRest3 	: "比赛%s秒后繼續",
    FinalRest 		: "決賽前休息",
    MatchTableMerge : "當前牌桌比賽已經結束，請返回大廳",
    Viewrecord      : "查看戰績",
}

