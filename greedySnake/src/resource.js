var res = {
    head_left: "res/heand_0.png",
    head_down: "res/heand_1.png",
    head_right: "res/heand_2.png",
    head_up: "res/heand_3.png",
    node: "res/node.png",
    food: "res/jindou.png"
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