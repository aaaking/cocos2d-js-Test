var res = {
    s_ShootBackground: "res/shoot_background.png",
    s_ShootBackgroundList: "res/shoot_background.plist",
    s_shoot: "res/shoot.png",
    s_ShootList: "res/shoot.plist",
    s_font: "font/font.fnt"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var EnemyCfg = {
    enemyA: function () {
        return {
            life: 1,
            score: 1
        }
    },
    enemyB: function () {
        return {
            life: 3,
            score: 3
        }
    }
};

var PlanCfg = {
    newPlane: function () {
        return {
            life: 10
        }
    }
}
