display = {}

winSize = cc.winSize
screenSize = cc.view.getFrameSize()
display.size               = {width : winSize.width, height : winSize.height}
display.sizeInPixels = {width : screenSize.width, height : screenSize.height}
display.width              = display.size.width
display.height             = display.size.height
display.cx                 = display.width / 2
display.cy                 = display.height / 2
display.c_left             = -display.width / 2
display.c_right            = display.width / 2
display.c_top              = display.height / 2
display.c_bottom           = -display.height / 2
display.left               = 0
display.right              = display.width
display.top                = display.height
display.bottom             = 0
display.widthInPixels      = display.sizeInPixels.width
display.heightInPixels     = display.sizeInPixels.height
display.CENTER        = 0
display.LEFT_TOP      = 1
display.TOP_LEFT      = 1
display.CENTER_TOP    = 2
display.TOP_CENTER    = 2
display.RIGHT_TOP     = 3
display.TOP_RIGHT     = 3
display.CENTER_LEFT   = 4
display.LEFT_CENTER   = 4
display.CENTER_RIGHT  = 5
display.RIGHT_CENTER  = 5
display.BOTTOM_LEFT   = 6
display.LEFT_BOTTOM   = 6
display.BOTTOM_RIGHT  = 7
display.RIGHT_BOTTOM  = 7
display.BOTTOM_CENTER = 8
display.CENTER_BOTTOM = 8

display.ANCHOR_POINTS = new Array(
    cc.p(0.5, 0.5),  // CENTER
    cc.p(0, 1),      // TOP_LEFT
    cc.p(0.5, 1),    // TOP_CENTER
    cc.p(1, 1),      // TOP_RIGHT
    cc.p(0, 0.5),    // CENTER_LEFT
    cc.p(1, 0.5),    // CENTER_RIGHT
    cc.p(0, 0),      // BOTTOM_LEFT
    cc.p(1, 0),      // BOTTOM_RIGHT
    cc.p(0.5, 0)    // BOTTOM_CENTER
)

// display.newSprite = function(filename, x, y, params) {
//     var spriteClass = null;
//     var size = null;
//
//     if (params) {
//         spriteClass = params.class;
//         size = params.size;
//     }
//     if (!spriteClass) {
//         spriteClass = cc.Sprite;
//     }
//
//     var t = typeof(filename);
//     if (t == "userdata") {
//         t = tolua.type(filename)
//     }
//     var sprite
//
//     if (!filename) {
//         sprite = spriteClass.create();
//     }else if(t == "string"){
//     if (string.typeof(filename) == 35) {
//     var frame = display.newSpriteFrame(string.sub(filename, 2))
//     if frame then
//     if params and
//     params.capInsets
//     then
//     sprite = spriteClass
//     :
//     createWithSpriteFrame(frame, params.capInsets)
//     else
//     sprite = spriteClass
//     :
//     createWithSpriteFrame(frame)
//     end
//     end
//     else
//     if (display.TEXTURES_PIXEL_FORMAT[filename]) {
//         cc.Texture2D.setDefaultAlphaPixelFormat(display.TEXTURES_PIXEL_FORMAT[filename]);
//         sprite = spriteClass.create(filename);
//         cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE2D_PIXEL_FORMAT_RGBA8888);
//     }else {
//         if (params && params.capInsets) {
//             sprite = spriteClass.create(params.capInsets, filename);
//         else
//             {
//                 sprite = spriteClass.create(filename);
//             }
//         }
//     }
//     else if(t == "cc.SpriteFrame")
//     {
//         sprite = spriteClass.createWithSpriteFrame(filename);
//     }else if(t == "cc.Texture2D")
//     {
//         sprite = spriteClass.createWithTexture(filename);
//     }else{
//     console.log("display.newSprite() - invalid filename value type");
//     sprite = spriteClass.create();
// }
//
//     if (sprite) {
//         if (x && y) {
//             sprite.setPosition(cc.p(x, y));
//         }
//         if (size) {
//             sprite.setContentSize(size)
//         }
//     }else
//     {
//         console.log("display.newSprite() - create sprite failure, filename %s", tostring(filename))
//         sprite = spriteClass.create()
//     }
//
//     return sprite;
// }
console.info(display)
