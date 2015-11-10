define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var list=Class.create({
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
                $("#J_go_top").on("click",function () {
                    var abc = $("a", this).attr("href");
                    var scroll_offset = $(abc).offset();
                    $("body,html").animate({scrollTop: 0}, 500)
                })
            }
        });
        return list;
    }
)