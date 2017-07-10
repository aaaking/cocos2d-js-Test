/**
 * Created by Administrator on 2016/6/21.
 */

var LocalizedStrings = cc.Class.extend({
    ctor:function(){
        this.strings = this.getLanguage();
    },
    getLanguage:function(){
        if (cc.sys.language == "zh-hans") {
            return CHS;
        }else if (cc.sys.language == "zh-hant" || cc.sys.language == "zh-hk" || cc.sys.language == "zh-tw" || cc.sys.language == "zh-hant-cn" ) {
            return CHT;
        }else {
            return CHS;
        }
    },
    getString:function(str){
        return this.strings[str];
    }
});


