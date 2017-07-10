var dzglobal = function(){}

dzglobal.checkSeatid = function(seatid){
	if(seatid >= 0 && seatid <= 9){
		return seatid;
	}
	return null;
}

dzglobal.formatNumberStr = function(num){
	var num = parseInt(num) || 0;
	if (num < 100000) {
		return num.toString();
	}

	if (num < 100000000) {
		return (Math.floor(num / 100) / 10).toFixed(1)+ "K";
	}

	if (num < 100000000000) {
		return (Math.floor(num / 100000) / 10).toFixed(1) + "M";
	}

	return  (Math.floor(num/100000000)/10).toFixed(1)+"B";
}

dzglobal.performWithDelay = function(node,cb,delay){
	var dy = cc.delayTime(delay);
	var callback = cc.callFunc(cb);
	var action = cc.sequence(dy,callback);
	node.runAction(action);
}