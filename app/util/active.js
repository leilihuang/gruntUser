define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var active=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.bindEval();
            },
            bindEval:function(){
                this.lqTop();
                this.rightBar();
                this.topScroll();
            },
            /**公用右浮动生日趴*/
            lqTop:function(){
                var lq=$("#top").find(".lq");
                if(lq.length>0){
                    lq.attr("href","javascript:void(0)");
                    lq.on("click",function(){
                        if($("#lq").length>0){
                            var top=$("#lq").offset().top;
                            $(window).scrollTop(top);
                            return false;
                        }else{
                            window.open("http://www.zzt.tm#lq");
                        }
                    });
                }
            },
            rightBar:function(){
                if($(".container").length>0){
                    var top=$(".container").offset().top;
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
            topScroll:function(){
                $("#top").find(".top").on("click",function(){
                    $(window).scrollTop(0);
                });
            },
        });
        return active;
    }
)