var m_relativePath = "Library/Caches/default/com.hackemist.NIMWebImageCache.default/"
var url_append = "?imageView&thumbnail=225z225"

var box_image = "res/icon_avatar_frame.png"
var callback
var sprites = {}
var avatar_url
DEFAULT_AVATAR = "res/avatar_male.png"
var mask_avatar_name = "res/avatar_mask.png"
var mask_avatar_width = 94
var clipper
var setAvatarUrl = function( url ) {
    avatar_url = url+url_append;
    return avatar_url
}
var webImage = cc.Node.extend({
    ctor: function (url, width, placeholder) {
        this._super();
        url = url || "";
        // this.url = setAvatarUrl(url)
        this.url = url;
        this.placeholder = placeholder || DEFAULT_AVATAR;
        this.width = mask_avatar_width;
        if (width && width > 0) {
            this.width = width;
        }
        this.newSpriteWithUrlAndPlaceholder()
    },
    newSpriteWithUrlAndPlaceholder: function () {
        var url = this.url;
        if (!url) {
            if (this.sprite) {
                this.sprite.removeFromParent();
                this.sprite = null;
            }
            this.sprite = cc.Sprite.create(this.placeholder);
            if (this.gray) {
                this.setImgGray()
            }
            if (this.color) {
                this.setColor(this.color)
            }
            this.adjustSize();
            this.addChild(this.sprite);
            return
        }
        // clipper = new cc.ClippingNode();
        // clipper.tag = 101;
        // clipper.width = 200;
        // clipper.height = 200;
        //
        // // clipper.runAction(cc.rotateBy(1, 45).repeatForever());
        // this.addChild(clipper);
        //
        // // var stencil = new cc.DrawNode();
        // // var rectangle = [cc.p(0, 0),cc.p(clipper.width, 0),
        // // 	cc.p(clipper.width, clipper.height),
        // // 	cc.p(0, clipper.height)];
        // //
        // // var white = cc.color(255, 255, 255, 255);
        // // stencil.drawPoly(rectangle, white, 1, white);
        // var stencil = new cc.Sprite("res/timer_bg.png");
        // // stencil.setOpacity(10);
        // clipper.stencil = stencil;
        //
        // var content = new cc.Sprite("res/touxiang.png");
        // content.tag = 102;
        // // content.anchorX = 0.5;
        // // content.anchorY = 0.5;
        // // content.x = clipper.width / 2;
        // // content.y = clipper.height / 2;
        // clipper.addChild(content);
        cc.textureCache.addImage("http://192.168.0.194/touxiang.png", function (texture) {
            if (texture) {
                if (cc.sys.os == "Android"){
                var stencil = new cc.DrawNode();
                var triangle = [cc.p(-100, -100),cc.p(100, -100), cc.p(0, 100)];

                var green = cc.color(0, 255, 0, 255);
                // stencil.drawPoly(triangle, green, 3, green);
                stencil.drawCircle(cc.p(0, 0), 45, cc.degreesToRadians(90), 100, true, 2, cc.color(0, 255, 255, 255));
                stencil.tag = 100;

                var clipper = new cc.ClippingNode();
                clipper.tag = 101;
                clipper.stencil = stencil;
                // clipper.setPosition(display.cx,display.cy);
                this.addChild(clipper);

                this.sprite = cc.Sprite.create(texture);
                this.sprite.setScale(this.width / this.sprite.width);
                clipper.addChild(this.sprite);
                    if (this.gray) {
                        this.setImgGray()
                    }
                    if (this.color) {
                        this.setColor(this.color)
                    }

                    this.setContentSize(cc.size(this.width, this.width));

                    if (box_image) {
                        var posX = this.width * 0.5;
                        var box = cc.Sprite.create(box_image)
                        // box.setPosition(posX, posX)
                        this.addChild(box);
                        size = box.getContentSize();
                        var scale = 1;
                        if (this.width && this.width > 0) {
                            scale = this.width / (size.width - 8)
                        }

                        if (scale != 1) {
                            box.setScale(scale);
                        }
                    }
                }else {
                    this.spriteSetMask(texture);
                }
            }
        }, this);
        //this.spriteSetMask("res/touxiang.png");
        // cc.textureCache.addImage("http://192.168.0.194/touxiang.png", function (texture) {
        //     if (texture) {
        //         // Use texture
        //         this.sprite = cc.Sprite.create(texture);
        //         // clipper.addChild(this.sprite);
        //         // this.avatar.setTexture(texture);
        //         this.spriteSetMask(texture);
        //     } else {
        //         this.sprite = cc.Sprite.create(this.placeholder);
        //         this.addChild(this.sprite);
        //     }
        // }, this);
    },
    spriteSetMask:function(path){
        var maskSprite = cc.Sprite.create(mask_avatar_name);
        var avatarSprite = cc.Sprite.create(path);

            var texture = this.newMaskedTextureWithSprite(avatarSprite, maskSprite);
            this.sprite = cc.Sprite.create(texture);
            this.sprite.setFlippedY(true);
            this.addChild(this.sprite);




        if (this.gray) {
            this.setImgGray()
        }
        if (this.color) {
            this.setColor(this.color)
        }

        this.setContentSize(cc.size(this.width, this.width));

        if (box_image) {
            var posX = this.width * 0.5;
            var box = cc.Sprite.create(box_image)
            box.setPosition(posX, posX)
            this.sprite.addChild(box);
            size = box.getContentSize();
            var scale = 1;
            if (this.width && this.width > 0) {
                scale = this.width / (size.width - 8)
            }

            if (scale != 1) {
                box.setScale(scale);
            }
        }

    },
    newMaskedTextureWithSprite:function( avatarSprite, maskSprite ) {
        var maskSize = maskSprite.getContentSize();
        var spSize = avatarSprite.getContentSize();

        maskSprite.setScale(this.width / maskSize.width);
        avatarSprite.setScale(this.width / spSize.width);

        var width = this.width;

        var rt = new cc.RenderTexture(width, width);

        avatarSprite.setPosition(width / 2, width / 2);
        maskSprite.setPosition(width / 2, width / 2);
        avatarSprite.setBlendFunc({src: gl.DST_ALPHA, dst: gl.ZERO});
        maskSprite.setBlendFunc({src: gl.ONE, dst: gl.ZERO});
        rt.begin();
        maskSprite.visit();
        avatarSprite.visit();
        rt.end();

        return rt.getSprite().getTexture();
    },
     setImgGray:function() {
         this.gray = true;
         if (!this.sprite) return

         var g = new cc.GLProgram("res/gray.vsh", "res/gray.fsh");
         g.bindAttribLocation(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
         g.bindAttribLocation(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
         g.bindAttribLocation(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
         g.link();
         g.updateUniforms();
         this.sprite.setGLProgram(g);
     },
     adjustSize:function() {
         if (!this.width) return

         var size = this.sprite.getContentSize();
         var scale = this.width / size.width;

         this.sprite.setScale(scale);
     }

})











