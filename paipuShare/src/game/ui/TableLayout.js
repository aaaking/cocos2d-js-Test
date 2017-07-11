"use strict";


var TOP = 115;
var BOTTOM = 130;
var SEAT_PADDING = 300;
var SEAT_BOTTOM = 475;
var SEAT_HEIGHT_PAD = 230;

var POSITION_SPACE = (display.height - TOP - BOTTOM) / 4;

var seatsLayout = [
    cc.p(display.cx, BOTTOM),
    cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM),
    cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
    cc.p(display.cx - SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
    cc.p(display.cx - 210, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2 + 195),
    cc.p(display.cx + 210, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2 + 195),
    cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD * 2),
    cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM + SEAT_HEIGHT_PAD),
    cc.p(display.cx + SEAT_PADDING, SEAT_BOTTOM)]

var betLayout = [
    cc.p(100, 185),
    cc.p(80, 0),
    cc.p(80, 0),
    cc.p(80, 0),
    cc.p(70, -50),
    cc.p(-70, -50),
    cc.p(-80, 0),
    cc.p(-80, 0),
    cc.p(-80, 0)]


var handCardsLayout = [
    cc.p(23, -23),
    cc.p(23, -23),
    cc.p(23, -23),
    cc.p(23, -23),
    cc.p(23, -23),
    cc.p(-23, -23),
    cc.p(-23, -23),
    cc.p(-23, -23),
    cc.p(-23, -23)]

var bubbleLayout = [
    cc.p(50, 110),
    cc.p(100, 100),
    cc.p(100, 100),
    cc.p(100, 100),
    cc.p(100, 100),
    cc.p(0, 100),
    cc.p(0, 100),
    cc.p(0, 100),
    cc.p(0, 100)];

var btnLayout = [
    cc.p(seatsLayout[0].x + 75, seatsLayout[0].y + 65),
    cc.p(seatsLayout[1].x + 75, seatsLayout[1].y - 65),
    cc.p(seatsLayout[2].x + 75, seatsLayout[2].y - 65),
    cc.p(seatsLayout[3].x + 75, seatsLayout[3].y - 65),
    cc.p(seatsLayout[4].x - 75, seatsLayout[4].y - 65),
    cc.p(seatsLayout[5].x + 75, seatsLayout[5].y - 65),
    cc.p(seatsLayout[6].x - 75, seatsLayout[6].y - 65),
    cc.p(seatsLayout[7].x - 75, seatsLayout[7].y - 65),
    cc.p(seatsLayout[8].x - 75, seatsLayout[8].y - 65)];

var POOL_BET_POS = cc.p(display.cx, display.top - 400);
var POOL_CARDS_POS = cc.p(display.cx, 585);

var TableLayout = {
    init: function () {

    }
};
TableLayout.seatsLayout = seatsLayout,
    TableLayout.betLayout = betLayout,
    TableLayout.handCardsLayout = handCardsLayout,
    TableLayout.bubbleLayout = bubbleLayout,
    TableLayout.POOL_CARDS_POS = POOL_CARDS_POS,
    TableLayout.POOL_BET_POS = POOL_BET_POS,
    TableLayout.btnLayout = btnLayout

