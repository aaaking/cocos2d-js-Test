var res = {
    head_right: "res/head_right.png",
    node: "res/node.png",
    control_pole_bg: "res/control_pole_bg.png",
    control_arrow: "res/control_arrow.png",
    food: "res/food.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

var Constants = {
    frequency: 0.2,// 刷新频率
    speed: 31,// 每帧移动距离,身体节点大小+1像素间隔
    errDistance: 10,// 偏差举例
}
