define(
    ['jQuery','lib/ui/class','service/detail/detail'],
    function($,Class,Detail){
        var detail=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.bindEval();
                new Detail();
            },
            bindEval:function(){

            }

        });
        return detail;
    }
)