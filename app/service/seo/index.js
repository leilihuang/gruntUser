define(
    ['jQuery','lib/ui/class','scrolls','service/seo/comm','service/seo/zzt_home','service/devel/portal_main','service/activeity/znq'],
    function($,Class,Scrolls,Comm,Home,Main,Znq){
        var index=Class.create({
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
                new Comm();
                new Home();
                new Main();
                new Znq();
            }
        });
        return index;
    }
)