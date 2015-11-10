define(
    ['jQuery'],
    function($){
        var util={
            /**通用活动弹出层*/
            alertHd:function(){
                var box=$("#xrl");
                var zBox=$("#overlay");
                if(box.length>0){
                    var img=box.find("img");
                    zBox.show();
                    box.show();
                    $("#close").on("click",function(){
                        zBox.hide();
                        box.hide();
                    });
                    $("<img/>").attr("src",img.attr("src")).load(function(){
                        box.css({
                            width:this.width,
                            height:this.height,
                            "margin-left":-(this.width/2),
                            "margin-top":-(this.height/2)
                        })
                    });
                }
            },
            /**通用悬浮菜单*/
            floatMenu:function($con){
                if($(".left-bar").length>0 ||$(".right-bar").length>0 ){
                    var top=$con.offset().top;
                    var r=$("#top"),_this=this;
                    r.css("top",top);
                    $(window).scroll(function(){
                        if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                            setTimeout(function(){
                                _this.jsScroll(top,r);
                            },1000);
                        }else{
                            _this.jsScroll(top,r);
                        }
                    });
                }
            },
            jsScroll:function(top,r){
                var wTop=$(window).scrollTop();
                if(wTop>top){
                    r.css({
                        position:"fixed",
                        top:0
                    });
                }else{
                    r.css({
                        position:"fixed",
                        top:top-wTop
                    });
                }
            },
            /**通用回到顶部按钮*/
            topBind:function(){
                $(window).scrollTop(0);
            },
            /**通用回到某一行*/
            backBind:function($top){
                var top=$top.offset().top;
                $(window).scrollTop(top);
            }
        }
        return util;
    }
)