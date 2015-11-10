define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var scroll=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
            },
            scrollEval:function(callback){
                $(window).scroll(function () {
                    var topScroll=$(this).scrollTop();
                    if (navigator.userAgent.indexOf("MSIE 6.0") > 0 || navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                        setTimeout(function(){
                            var scrollTop=$(window).scrollTop();
                            if(topScroll==scrollTop){
                                callback();
                            }
                        },1000);
                    }else{
                        callback();
                    }

                })
            }
        });
        var s;
        return {
            getObj:function(){
                if(s){
                    return false;
                }else{
                    s=new scroll();
                }
                return s;
            },
            scrollEval:function(callback){
                s.scrollEval(callback);
            }
        }
    }
)