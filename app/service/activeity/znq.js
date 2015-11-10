//周年庆页面的js
define(
    ['jQuery','lib/ui/class','util/util'],
    function($,Class,Util){
        var znq=Class.create({
            setOptions:function(opt){
                var options={
                    fail:$("#yhq-fail"),
                    succes:$("#yhq-Box"),
                    bg:$("#easyDialogBox"),
                    zzc:$("#overlay"),
                    gzxq:$("#gzxq")
                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                //Util.floatMenu($(".hdgz"));
                this.bindEval();

            },
            bindEval:function(){
                this.topBind();
            },
            topBind:function(){
                function TagClick(taghd,tagbd){
                    var k = $(taghd).length;
                    for(var i=0;i<k;i++){
                        $(taghd).eq(i).attr("rel",i)
                    }
                    $(taghd).click(function(){
                        var rel = $(this).attr("rel");
                        $(this).addClass("current");
                        $(this).siblings().removeClass("current");
                        $(tagbd).eq(rel).removeClass("hide");
                        $(tagbd).eq(rel).siblings(tagbd).addClass("hide");
                    })}
                TagClick(".tabbd",".major-suit-txt");
                $(".hdgz").click(function(){
                    easyDialog.open({
                        container : 'imgBox',
                        fixed : false
                    });
                });
                $(".closeBtn").click(function(){
                    easyDialog.close()
                })
            }

        });
        return znq;
    }
)