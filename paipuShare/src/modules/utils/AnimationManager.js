var AnimationManager = function(){
    this.ctor();
}

AnimationManager.STATE_IDLE = 1
AnimationManager.STATE_BUSY = 2

// --[[
//     options:
// name:动画的名字
// start_handler:开始动画的方法
// stop_handler:结束动画的方法
//
// ]]--

AnimationManager.prototype.ctor = function() {
    this.animation_queue_ = new Array();
    this.state = AnimationManager.STATE_IDLE;
};


AnimationManager.prototype.animationOver = function() {
    // console.info(this.animation_queue_);
    if(!this.animation_queue_){
        this.state == AnimationManager.STATE_IDLE;
        return;
    }
    var animation = this.animation_queue_[0];
    if (!animation) {
        this.state = AnimationManager.STATE_IDLE
        // HTTP_DEBUG("[animation over] animation is nil")
        return
    }

    this.animation_queue_.splice(0, 1);
    this.checkQueue();
};

AnimationManager.prototype.clearQueue = function() {
    // for (var k in this.animation_queue_) {
        this.animation_queue_ = [];
    // }
};

AnimationManager.prototype.endAnimations = function() {
    if (this.state == AnimationManager.STATE_IDLE) {
        return
    }
    var animation = this.animation_queue_[0];
    if (!animation) {
        this.state = AnimationManager.STATE_IDLE;
        // HTTP_DEBUG("[end animation] animation is nil")
        return;
    }

    if (animation.clearFunc) {
        animation.clearFunc();
    }

    this.clearQueue();
    this.state = AnimationManager.STATE_IDLE;

};




AnimationManager.prototype.addAnimation = function(animFunc, clearFunc ) {
    var animation = {animFunc: animFunc, clearFunc: clearFunc}
    this.animation_queue_[this.animation_queue_.length] = animation;
    // console.log("this.state==="+this.state)
    if (this.state == AnimationManager.STATE_BUSY) {
        return
    }
    this.checkQueue();
};

AnimationManager.prototype.checkQueue = function() {
    var animation = this.animation_queue_[0]
    if (!animation) {
        this.state = AnimationManager.STATE_IDLE;
        return;
    }
    this.state = AnimationManager.STATE_BUSY;

    animation.animFunc();
};

