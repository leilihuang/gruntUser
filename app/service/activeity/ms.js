define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var ms=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.autoWidth();
                this.bindEval();
            },
            autoWidth:function(){
              var cur=$(".tab").find(".cur"),
                 sj=$("#sj"),
                  i=cur.index()+1;
                var w=cur.width();
                w=w*i-w/2-20;
                sj.css({
                    left:w
                });
            },
            bindEval:function(){
                var sj=$("#sj"),_this=this;
                $(".tab1").each(function(){
                    $(this).on("click",function(){
                        if($(this).hasClass("cur")){
                            return false;
                        }else{
                            $(this).siblings(".cur").removeClass("cur");
                            $(this).addClass("cur");
                            var w=$(this).width();
                            var id=$(this).attr("name");
                            var i=$(this).index()+1;

                            w=w*i-w/2-20;
                            _this.tabList(id);
                            sj.css({
                                left:w
                            });
                        }
                    })
                })
            },
            tabList:function(id){
                var n=$("#"+id);
                $("#pro_box").find("ul").each(function(){
                    if($(this).attr("id")==id){
                        n.show();
                    }else{
                        $(this).hide();
                    }
                });
            },
        });
        return ms;
    }
)