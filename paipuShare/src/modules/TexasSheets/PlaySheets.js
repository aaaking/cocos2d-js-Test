var PlaySheet = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.turns = [];
        this.netmsgs = [];
        this.first = true;
        return true;
    },

});
var msginfo = [];

msginfo[0] = {
    msg: {
        maxplayer: 9,
        table_index: 2,
        sblinds: 5,
        ante: 0,
        code: 123456,
        game_mode: 0,
        insure_mode: 0,
    },
    name: "user.RecordInfo", time: 1462450563
};

msginfo[1] = {
    msg: {
        sblinds: 1,
        playerinfo: [
            {
                avatar: "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==",
                gold: 3412,
                nickname: "小虫",
                seatid: 1,
                uid: 101655
            },
            {
                avatar: "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==",
                gold: 2491,
                nickname: "Don",
                seatid: 3,
                uid: 101399
            },
            {
                avatar: "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==",
                gold: 5918,
                nickname: "芥末小生",
                seatid: 5,
                uid: 101622
            },
            {
                avatar: "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==",
                gold: 6208,
                nickname: "固执的鱼",
                seatid: 6,
                uid: 100007
            },
            {
                avatar: "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==",
                gold: 2484,
                nickname: "大白",
                seatid: 8,
                uid: 101207
            },
            {
                avatar: "http://nim.nos.netease.com/MTAzMDUwMA==/bmltYV8yNjM5Nzg2OF8xNDYyMjkxMDk3MDUxX2FhMWIxMGJlLWM5MTMtNDFjYi1iMmIxLTVmMDk1NjIwNmQyYw==",
                gold: 1854,
                nickname: "大魔包",
                seatid: 9,
                uid: 101652
            }
        ]
    },
    name: "user.SheetInfo",
    time: 1462450563
};

msginfo[2] = {
    msg: {
        "btn_seatid": 8,
        "hands_cnt": 208,
        playerinfo: [
            {
                gold: 3412,
                seatid: 1,
                uid: 101655,
                bet: 0,
                playing: 1
            },
            {
                gold: 2491,
                seatid: 3,
                uid: 101399,
                bet: 0,
                playing: 1
            },
            {
                gold: 5918,
                seatid: 5,
                uid: 101622,
                bet: 0,
                playing: 1
            },
            {
                gold: 6208,
                seatid: 6,
                uid: 100007,
                bet: 0,
                playing: 1
            },
            {
                gold: 2484,
                seatid: 8,
                uid: 101207,
                bet: 0,
                playing: 1
            },
            {
                gold: 1854,
                seatid: 9,
                uid: 101652,
                bet: 0,
                playing: 1
            }
        ]
    },
    name: "user.GameStartNtf",
    time: 1462450563
};

msginfo[3] = {
    msg: {
        cards: [43, 5],
        seatid: 6
    },
    name: "user.AddCardNtf",
    time: 1462450563
};

msginfo[4] = {
    msg: {
        call_bet: 10,
        end_time: 1462450570,
        min_raise: 20,
        seatid: 3,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450563
};

msginfo[5] = {
    msg: {
        seatid: 3,
    },
    name: "user.FoldNtf",
    time: 1462450563
};

msginfo[6] = {
    msg: {
        call_bet: 10,
        end_time: 1462450572,
        min_raise: 20,
        seatid: 5,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450563
};

msginfo[7] = {
    msg: {
        seatid: 5,
    },
    name: "user.FoldNtf",
    time: 1462450563
};
msginfo[8] = {
    msg: {
        call_bet: 10,
        end_time: 1462450574,
        min_raise: 20,
        seatid: 6,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450565
};
msginfo[9] = {
    msg: {
        seatid: 6,
    },
    name: "user.FoldNtf",
    time: 1462450565
};
msginfo[10] = {
    msg: {
        call_bet: 10,
        end_time: 1462450584,
        min_raise: 20,
        seatid: 8,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450567
};
msginfo[11] = {
    msg: {
        gold: 2444,
        seatid: 8,
        totalbet: 40
    },
    name: "user.BetNtf",
    time: 1462450567
};
msginfo[12] = {
    msg: {
        call_bet: 35,
        end_time: 1462450586,
        min_raise: 65,
        seatid: 9,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450568
};
msginfo[13] = {
    msg: {
        gold: 1819,
        seatid: 9,
        totalbet: 40
    },
    name: "user.BetNtf",
    time: 1462450618
};
msginfo[14] = {
    msg: {
        call_bet: 30,
        end_time: 1462450588,
        min_raise: 60,
        seatid: 1,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450618
};
msginfo[15] = {
    msg: {
        seatid: 1
    },
    name: "user.FoldNtf",
    time: 1462450618
};
msginfo[16] = {
    msg: {
        poolbet: [
            {
                num: 1,
                bet: 90,
                seatids: [8, 9]
            },
            {
                num: 1,
                bet: 270,
                seatids: [8, 9]
            },
            {
                num: 1,
                bet: 1300,
                seatids: [9]
            }
        ]
    },
    name: "user.PoolBetNtf",
    time: 1462450618
};
msginfo[17] = {
    msg: {
        cards: [10, 53, 40]
    },
    name: "user.PoolCardsNtf",
    time: 1462450618
};
msginfo[18] = {
    msg: {
        end_time: 1462450594,
        min_raise: 10,
        seatid: 9,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450618
};
msginfo[19] = {
    msg: {
        gold: 1819,
        seatid: 9
    },
    name: "user.BetNtf",
    time: 1462450618
};
msginfo[20] = {
    msg: {
        end_time: 1462450598,
        min_raise: 10,
        seatid: 8,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450618
};
msginfo[21] = {
    msg: {
        totalbet: 90,
        gold: 2354,
        seatid: 8
    },
    name: "user.BetNtf",
    time: 1462450618
};
msginfo[22] = {
    msg: {
        call_bet: 90,
        end_time: 1462450598,
        min_raise: 180,
        seatid: 9,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450618
};
msginfo[23] = {
    msg: {
        totalbet: 90,
        gold: 1729,
        seatid: 9
    },
    name: "user.BetNtf",
    time: 1462450618
};
msginfo[24] = {
    msg: {
        poolbet: [
            {
                num: 1,
                bet: 90,
                seatids: [8, 9]
            },
            {
                num: 1,
                bet: 270,
                seatids: [8, 9]
            },
            {
                num: 1,
                bet: 1300,
                seatids: [9]
            }
        ]
    },
    name: "user.PoolBetNtf",
    time: 1462450618
};
msginfo[25] = {
    msg: {
        cards: [45]
    },
    name: "user.PoolCardsNtf",
    time: 1462450618
};
msginfo[26] = {
    msg: {
        end_time: 1462450600,
        min_raise: 10,
        seatid: 9,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450619
};
msginfo[27] = {
    msg: {
        gold: 1729,
        seatid: 9
    },
    name: "user.BetNtf",
    time: 1462450619
};
msginfo[28] = {
    msg: {
        end_time: 1462450605,
        min_raise: 10,
        seatid: 8,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450619
};
msginfo[29] = {
    msg: {
        gold: 2084,
        seatid: 8,
        totalbet: 270
    },
    name: "user.BetNtf",
    time: 1462450619
};
msginfo[30] = {
    msg: {
        call_bet: 270,
        end_time: 1462450606,
        min_raise: 540,
        seatid: 9,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450619
};
msginfo[31] = {
    msg: {
        gold: 969,
        seatid: 9,
        totalbet: 760
    },
    name: "user.BetNtf",
    time: 1462450619
};
msginfo[32] = {
    msg: {
        call_bet: 490,
        end_time: 1462450612,
        min_raise: 980,
        seatid: 8,
        timeout: 15
    },
    name: "user.PlayerOptNtf",
    time: 1462450619
};
msginfo[33] = {
    msg: {
        seatid: 8
    },
    name: "user.FoldNtf",
    time: 1462450619
};
msginfo[34] = {
    msg: {
        poolbet: [
            {
                num: 1,
                bet: 90,
                seatids: [8, 9]
            },
            {
                num: 1,
                bet: 270,
                seatids: [8, 9]
            },
            {
                num: 1,
                bet: 1300,
                seatids: [9]
            }
        ]
    },
    name: "user.PoolBetNtf",
    time: 1462450619
};
msginfo[35] = {
    msg: {
        winners: [
            [
                {seatid: 9, bonus: 1300}
            ]
        ],
        players: [
            {
                seatid: 1,
                gold: 3412,
                win: 0,
                bonus: 0,
                profit: -10
            },
            {
                seatid: 3,
                gold: 2491,
                win: 0,
                bonus: 0,
                profit: 0
            },
            {
                seatid: 5,
                gold: 5918,
                win: 0,
                bonus: 0,
                profit: 0
            },
            {
                seatid: 6,
                gold: 6208,
                win: 0,
                bonus: 0,
                profit: 0
            },
            {
                seatid: 8,
                gold: 2084,
                win: 0,
                bonus: 0,
                profit: -400
            },
            {
                seatid: 9,
                gold: 2269,
                win: 1,
                bonus: 1300,
                profit: 410
            }
        ]
    },
    name: "user.GameEndNtf",
    time: 1462450619
};
PlaySheet.prototype.initSheetInfo = function () {
    var msg = this.netmsgs[0]
    if (msg.name != "user.RecordInfo") return
    var startMsg = this.netmsgs[1];
    var table_index = msg.msg.table_index || 0;
    if (msg.msg.table_index) table_index = msg.msg.table_index;
    var sheetNetMsg = {playerinfo: [], maxplayer: msg.msg.maxplayer || 9, tableIndex: table_index};
    var sheetInfoMsg = {name: "user.SheetInfo", time: startMsg.time, msg: sheetNetMsg};
    for (var k in startMsg.msg.playerinfo) {
        var p = startMsg.msg.playerinfo[k];
        var info = {};
        info.uid = p.uid;
        info.seatid = p.seatid;
        info.gold = p.gold;
        info.bet = p.bet;
        info.ranking = p.ranking;
        sheetNetMsg.playerinfo[k] = info;
        info.gold = info.gold || 0;
        info.bet = info.bet || 0;
        info.gold = info.gold + info.bet;
    }
    this.netmsgs[0] = sheetInfoMsg;
    this.sheetInfo = msg.msg;
    this.sheetInfo.ante_mode = 0;
    app.gameMode = msg.msg.game_mode;
    this.sheetInfo.game_mode = msg.msg.game_mode;
    this.sheetInfo.titl_mode = msg.msg.insure_mode;
};
PlaySheet.prototype.init = function(){
    this.stop();
    //this.netmsgs = window.texas.data;
    this.netmsgs = msginfo;
    if (!this.netmsgs) {
        return
    }
    this.initSheetInfo();
     //for (var k in msginfo) {
     //    this.netmsgs.push(msginfo[k]);
     //}
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", "http://120.27.162.46:8005/game/mttstatus?uid=10008&os=1&gid=100657", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 ) {
            xhr.status === 200 ? cb(null, xhr.responseText) : cb({status:xhr.status, errorMessage:errInfo}, null);
        }
    };
    //xhr.send();
    this.pauseTargets = null;
    this.updateHandler = null;
    app.GameTable.sblinds = this.sheetInfo.sblinds || 1;
    app.GameTable.ante_mode = this.sheetInfo.ante_mode || 0;
    app.GameTable.anteChips = this.sheetInfo.ante || 0;
    app.GameTable.insureMode = this.sheetInfo.titl_mode || 0;
    var msg = this.netmsgs[0];
    if (!msg) return
    this.startTime = msg.time;
    this.speed = 1;
    this.playerCount = this.netmsgs[0].msg.playerinfo.length;
    var offsetTime = 0;
    if (this.first) {
        for (var k in this.netmsgs) {
            var info = this.netmsgs[k]
            info.time += offsetTime;
            switch (info.name) {
                case "user.GameStartNtf":
                    // offsetTime += 0.09 * this.playerCount;
                    break;
                case "user.AddCardNtf":
                    offsetTime += 0.18 * this.playerCount;
                    break;
                case "user.PoolBetNtf":
                    offsetTime += 0.5;
                    break;
                case "user.PoolCardsNtf":
                    offsetTime += 0.5;
                    break;
                case "user.BetNtf":
                    offsetTime += 0.3;
                    break;
                case "user.FoldNtf":
                    offsetTime += 0.5;
                    break;
                case "user.PlayerOptNtf":
                    if (offsetTime >= 0 && (this.netmsgs[parseInt(k) + parseInt(1)].time - info.time) > 15) {
                        offsetTime = offsetTime - this.netmsgs[parseInt(k) + parseInt(1)].time + info.time + 15
                    };
                    break;
            }

        }
    }
    this.first = false;
    this.getTurnEnded();
    EventManager.addEventListener("nextStep", this.gotoNextStep.bind(this));
    var len = this.netmsgs.length-1;
    this.totalTime = Math.ceil(this.netmsgs[len].time - this.startTime + 5.5);
    //console.info(this.totalTime);
    var msg = this.netmsgs[0];
    this.nextMsgId = 1;
    EventManager.dispatchEvent(msg.name,{name : msg.name,netmsg:msg.msg,speed:this.speed});
    // this.play();
}
//
// PlaySheet.msgFilter = {
//     msgprotocol["user.SheetInfo"],
//     msgprotocol["user.GameStartNtf"],
//     msgprotocol["user.AddCardNtf"],
//     msgprotocol["user.BetNtf"],
//     msgprotocol["user.PoolBetNtf"],
//     msgprotocol["user.PoolCardsNtf"],
//     msgprotocol["user.ShowCardsNtf"],
//     msgprotocol["user.GameEndNtf"],
//     msgprotocol["user.FoldNtf"],
//     msgprotocol["user.StandupNtf"],
//     msgprotocol["user.EnterInsureNtf"],
//     msgprotocol["user.InsureNtf"],
//     msgprotocol["user.PayInsuranceNtf"],
//     msgprotocol["user.InitiativeShowCardsNtf"],
//     msgprotocol["user.PlayerOptNtf"],
//     msgprotocol["user.AskInsureNtf"],
// }
//
// PlaySheet.STATE_IDLE = 1
// PlaySheet.STATE_BUSY = 2
//
// var instance
//
// PlaySheet.ctor=function() {
//
//     parser.register_buffer(proto, "user");
//
//     this.state = PlaySheet.STATE_IDLE;
//     this.timer = 0;
//     this.totalTime = 0;
//     this.speed = 1;
//
//     instance = this;
// }
//
// PlaySheet.getInstance=function () {
//     if (!instance) {
//         PlaySheet.new()
//     }
//     return instance;
// }
//
//
// PlaySheet.closeFile=function () {
//     if (!self.file){
//         return;
//     }
//     this.file.close();
//     this.file = null;
// }
//
//  PlaySheet.filterMsg=function( cmd ){
//      for(var i=1;i<PlaySheet.msgFilter.length;i++) {
//          if (cmd == PlaySheet.msgFilter[i]) {
//              return true;
//          }
//      }
//  }
//
//
//
// var function msg_decode( id, data )
// var name = msgprotocol[id]
// if not name then
// printError("msg_decode fail, unknow msg id=%d", id or 0)
// return
// end
//
// var ok,msg = pcall(protobuf.decode, name, data)
// -- msg = protobuf.decode(name, data)
// if not ok or not msg then
// printError("msg_decode protobuf decode fail. msgname=%s, data length=%s", name, tostring(#data))
// return
// end
//
// return name, msg
// end
//
// function PlaySheet:packageDecode()
// if #self.netData <= 6 then return end
//
// var time = struct.unpack(">I4", self.netData)
// self.netData = string.sub(self.netData, 5)
//
// var len = struct.unpack(">I2", self.netData)
//
// printInfo("packageDecode pkg len=%d", len)
//
// if #self.netData < len+2 then printInfo("packageDecode pkg len=%d", #self.netData) return end
//
// self.netData = string.sub(self.netData, 3)
// var cmd = struct.unpack(">I2", self.netData)
// var pkg = string.sub(self.netData, 3, len)
// self.netData = string.sub(self.netData, len+1)
// return time, cmd,pkg
// end
//
// function PlaySheet:convertData(  )
// self.netmsgs = {}
//
// while true do
//     var time, cmd, pkg = self:packageDecode()
//
// if not time or not cmd or not pkg then return end
//
// if self:filterMsg(cmd) then
// var name, msg = msg_decode(cmd, pkg)
// if not name or not msg then return end
// var netmsg = {
//     time = time,
//     name = name,
//     msg = msg,
// }
//
// table.insert(self.netmsgs, netmsg)
// end
//
// if not self.netData or #self.netData <=0 then
// return true
// end
//
// end
// -- return true
// end
//
// function PlaySheet:parseData()
// var errorCode
//
// for i=1,1 do
//     var jsonPosData = self.file:read(4)
// if not jsonPosData then errorCode = 1 break end
//
// var jsonPos = struct.unpack("<I4", jsonPosData)
// if jsonPos <= 0 then errorCode = 2 break end
//
// self.netData = self.file:read(jsonPos - 4)
// if not self.netData then errorCode = 3 break end
//
// if not self:convertData() then errorCode = 4 break end
//
// if not self:parseJson(jsonPos) then errorCode = 5 break end
//
// self:getTurnEnded()
// self:closeFile()
// end
//
// if errorCode then
// printError("parse data error:%d", errorCode)
// else
// return true
// end
// end
//
// function PlaySheet:openFile( path )
// if not path then return end
//
// var exist = cc.FileUtils:getInstance():isFileExist(path)
// if not exist then return end
//
//
// self:closeFile()
//
// self.file = io.open(path, "rb")
//
// if not self.file then
// return
// end
//
// return self:parseData()
// end
//
// function PlaySheet:parseJson(pos)
//
// self.file:seek("set", pos)
// var jsonStr = self.file:read("*a")
//
// var ok, header = pcall(json.decode, jsonStr)
//
// if not ok or not header then return end
//
// app.userInfo.uid = header.uid
// app.userInfo.tableid = header.code
//
// return header
// end
//
// function PlaySheet:init()
// self:stop()
// if not self.netmsgs then
// return
// end
//
// self.pauseTargets = nil
// self.updateHandler = nil
//
// var msg = self.netmsgs[1]
// if not msg then return end
//
// self.startTime = msg.time
// self.speed = 1
//
// self.totalTime = self.netmsgs[#self.netmsgs].time - self.startTime + 5.5
//
// var msg = self.netmsgs[1]
// self:dispatchEvent({name = msg.name,netmsg=msg.msg,speed=self.speed})
//
// self.nextMsgId = 2
// -- self:checkNextMsgTime()
//
// end
//
PlaySheet.prototype.play = function() {
    this.timer = 0;
    this.gotoNextStep();
    // this.unschedule(this.update);
    this.schedule(this.update, 0.1);
}

PlaySheet.prototype.update = function() {
    this.timer = this.timer + 0.1;
    // console.log("update============"+this.timer);
    // this.checkNextMsgTime();
    if (this.updateCB) {
        this.updateCB(this.timer)
    }
}

PlaySheet.prototype.pause = function() {
    var actionManager = cc.director.getActionManager();
    this.pauseTargets = actionManager.pauseAllRunningActions();
    this.unschedule(this.update)
}

PlaySheet.prototype.restart =function() {
    if (this.pauseTargets) {
        var actionManager = cc.director.getActionManager();

        for (var k in this.pauseTargets) {
            var v = this.pauseTargets[k];
            actionManager.resumeTarget(v);
        }

        this.pauseTargets = null;
    }
    // this.unschedule(this.update);
    // this.update();
    this.gotoNextStep();
    this.schedule(this.update, 0.1);
}

PlaySheet.prototype.stop = function() {
    this.unschedule(this.update);
// if self.file then
// self.file:close()
// self.file = nil
// end
}

PlaySheet.prototype.setSpeed = function (speed) {
    this.speed = speed;
}

PlaySheet.prototype.getTotalTime = function() {
    return this.totalTime
}

PlaySheet.prototype.getRelativeTime = function (i) {
    var msg = this.netmsgs[i];
    // console.log(msg);
    if (!msg) {
        return
    }
    return msg.time - this.startTime;
}

PlaySheet.prototype.getTurnEnded = function() {
    this.turns = [];
    for (var k in this.netmsgs) {
        var v = this.netmsgs[k];
        if (v.name == "user.PoolBetNtf" && this.netmsgs[parseInt(k) + parseInt(1)] && this.netmsgs[parseInt(k) + parseInt(1)].name == "user.PoolCardsNtf" && this.netmsgs[parseInt(k) + parseInt(2)] && this.netmsgs[parseInt(k) + parseInt(2)].name == "user.PlayerOptNtf") {
            this.turns.push(parseInt(k) + parseInt(2));
        }
    }
};

PlaySheet.prototype.gotoNextStep = function () {
    if (this.pauseTargets) return;
    if (!this.nextMsgId || !this.netmsgs[this.nextMsgId]) {
        return;
    }
    var time = this.getRelativeTime(this.nextMsgId);

    var msg = this.netmsgs[this.nextMsgId];
    var delay = 0;
    if ((msg.name == "user.BetNtf" || msg.name == "user.FoldNtf" || msg.name == "user.InsureNtf" || msg.name == "user.PayInsuranceNtf" || msg.name == "user.GameEndNtf" || msg.name == "user.AskInsureNtf" || msg.name == "user.PoolCardsNtf") && (time - this.timer - 0.1) > 0) {
        delay = time - this.timer - 0.1;
    }
    this.nextMsgId = parseInt(this.nextMsgId) + parseInt(1);
    this.scheduleOnce(function () {
        EventManager.dispatchEvent(msg.name, {name: msg.name, netmsg: msg.msg, speed: this.speed});
    }, delay)
}

PlaySheet.prototype.stopAndGoToMsg = function (id) {
    var msg = this.netmsgs[id];
    //console.info(msg);
    if (!msg)return
    this.unschedule(this.update);

    for (var i = 0; i < id; i++) {
        var msg = this.netmsgs[i];
        EventManager.dispatchEvent(msg.name, {name: msg.name, netmsg: msg.msg, noAni: true});
//     dispatchEvent({name = pre_msg.name, netmsg = pre_msg.msg, noAni = true
    }
    EventManager.dispatchEvent("user.updateTable");
// self:dispatchEvent({name="user.updateTable"})
    this.timer = this.getRelativeTime(id);
    this.nextMsgId = id;
    var msg = this.netmsgs[this.nextMsgId];
    this.scheduleOnce(function () {
        EventManager.dispatchEvent(msg.name, {name: msg.name, netmsg: msg.msg, speed: this.speed});
    }, 0.1)
}

PlaySheet.prototype.stopAndGoToTime = function (time) {
    if (time <= 0) {
        this.stopAndGoToMsg(0)
    } else if (time > this.getRelativeTime(this.netmsgs.length - 1)) {
        this.stopAndGoToMsg(this.netmsgs.length - 1);
    } else {
        var i
        for (var k in this.netmsgs) {
            if (this.getRelativeTime(k) >= time) {
                i = k;
                break;
            }
        }
        var pre_time = this.getRelativeTime(i - 1);
        var after_time = this.getRelativeTime(i);
        if ((after_time - time) < (time - pre_time)) {
            this.stopAndGoToMsg(i);
        } else {
            this.stopAndGoToMsg(i - 1);
        }
    }
}

PlaySheet.prototype.checkNextMsgTime = function() {
    // console.info(this.netmsgs[this.nextMsgId]);
    if (!this.nextMsgId || !this.netmsgs[this.nextMsgId]) {
        return;
    }
    var msg = this.netmsgs[this.nextMsgId];

    var deltaT = this.getRelativeTime(this.nextMsgId) - this.timer
    if (deltaT <= 0) {
        // console.info(msg);
        EventManager.dispatchEvent(msg.name, {name: msg.name, netmsg: msg.msg, speed: self.speed})
        this.nextMsgId = parseInt(this.nextMsgId) + parseInt(1);
        // console.log("this.nextMsgID"+this.nextMsgId);
        this.checkNextMsgTime();
    }
}

PlaySheet.prototype.onUpdateCallBack = function(callback){
    this.updateCB = callback;
}

// return PlaySheet