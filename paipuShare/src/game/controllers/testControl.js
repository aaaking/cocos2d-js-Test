
var TestControl = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.playsheet = new PlaySheet();
        this.addChild(this.playsheet);
        this.playsheet.init()
        return true;
    }
});