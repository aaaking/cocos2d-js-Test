var res = {
    logo: 'res/logo.png',
    login_board: 'res/login_board.png',
    login_done: 'res/login_done.png',
    setting: 'res/setting.png',
    back: 'res/back.png',
    play: 'res/play.png',
    icon_rank: 'res/icon_rank.png',
    about: 'res/about.png',
    panda_plist: 'res/panda.plist',
    panda_png: 'res/panda.png',
    on: 'res/on.png',
    off: 'res/off.png',
    far_bg: 'res/far-bg.png',
    near_bg: 'res/near-bg.png',
    gold_plist: 'res/gold.plist',
    gold_png: 'res/gold.png',
    shoes_png: 'res/shoes.png',
    shoes_plist: 'res/shoes.plist',
    magnet_png: 'res/magnet.png',
    magnet_plist: 'res/magnet.plist',
    magnet_effect: 'res/magnetEffect.png',
    platform_plist: 'res/platform.plist',
    platform_png: 'res/platform.png',
    redshoes_png: 'res/redshoes.png',
    redshoes_plist: 'res/redshoes.plist',
    ///////////////////

    rank: {
        board: 'res/rank-board.png'
    },

    //////////////////
    //menu
    menu: {
        //storeBtn: 'res/store-btn.png',
        //storeBtnS: 'res/store-btn-s.png',
        startBtn: 'res/start-btn-normal.png',
        startBtnS: 'res/start-btn-selected.png',
        wait: 'res/wait.png',
        enable: 'res/enable.png',
        disable: 'res/disable.png'
    },

    //enemy
    enemy: {
        png: 'res/enemy.png',
        plist: 'res/enemy.plist'
    },

    //bird
    bird : {
        png: 'res/bird.png',
        plist: 'res/bird.plist'
    },

    //spring
    spring: {
        png: 'res/spring.png',
        plist: 'res/spring.plist'
    },

    //particle
    particle: {
        circle: 'res/circle_particle.plist',
        stars: 'res/stars_particle.plist'
    },

    //fire
    fire: {
        plist: 'res/fire.plist'
    },

    //game over res
    over: {
        board: 'res/ui/score-board.png',
        store: 'res/ui/store.png',
        reload: 'res/ui/reload.png',
        menu: 'res/ui/menu.png'
    },

    // Sound Effect
    sound:{
        bg_mp3: 'res/sound/bg.mp3',
        jump_mp3: 'res/sound/jump.mp3',
        gold_mp3: 'res/sound/eat_gold.mp3',
        game_over: 'res/sound/game_over.mp3',
        button: 'res/sound/button.mp3',
        menu: 'res/sound/menu.mp3',
        enemyDied: 'res/sound/enemyDied.mp3',
        magnet: 'res/sound/magnet.mp3',
        lose_prop: 'res/sound/lose_prop.mp3',
        spring: 'res/sound/spring.mp3',
        speedup: 'res/sound/speedup.mp3',
        alert: 'res/sound/alert.mp3',
        shopping: 'res/sound/shopping.mp3'
    },

    ui: {
        goldbar: 'res/ui/gold-bar.png',
        energybar: 'res/ui/energy-bar.png',
        progress: 'res/ui/progress.png',
        soundOn: 'res/ui/soundOnBtn.png',
        soundOff: 'res/ui/soundOffBtn.png',
        distance: 'res/ui/distance.png',
        highBtn: 'res/ui/high-btn.png',
        lowBtn: 'res/ui/low-btn.png',
        storeBoard: 'res/ui/store-board.png',
        buy30: 'res/ui/buy-30.png',
        buy50: 'res/ui/buy-50.png',
        magnetProp: 'res/ui/magnet-prop.png',
        shoesProp: 'res/ui/shoes-prop.png',
        redshoesProp: 'res/ui/redshoes-prop.png'
    },

    physics: {
        groundHeight: -1000
    }
};

var SpriteTag = {
    player : 0,
    gold : 1,
    inventory: 2,
    platform: 3,
    ground: 4,
    magnet: 5,
    spring: 6,
    shoes: 7,
    redshoes: 8,
    bird: 9
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//game global variable
var gameStarted = false;
var firstInit = true;

//load game audio sys
var canMusicPlaying = 0;
var canAudioPlaying = 0;
var diffDeg = 0;
var isMusicPlaying = 0;

var localStorage = cc.sys ? cc.sys.localStorage : window.localStorage;
if(!localStorage.getItem("canAudioPlaying") || !localStorage.getItem("canMusicPlaying")) {
    localStorage.setItem("canMusicPlaying", 1);
    localStorage.setItem("canAudioPlaying", 1);
    localStorage.setItem("diffDeg", 0);
}
canMusicPlaying = parseInt(localStorage.getItem("canMusicPlaying"));
canAudioPlaying = parseInt(localStorage.getItem("canAudioPlaying"));
diffDeg = parseInt(cc.sys.localStorage.getItem("diffDeg"));

//initialize prop to local
if(!localStorage.getItem("magnet") || !localStorage.getItem("shoes") || !localStorage.getItem("redshoes")) {
    localStorage.setItem("magnet", 0);
    localStorage.setItem("shoes", 0);
    localStorage.setItem("redshoes", 0);
}

//preload objects defined
var pre_bird, pre_frog, pre_magnet, pre_redshoes, pre_shoes, pre_spring;
var new_space = [];