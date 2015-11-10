define([
    'jQuery',
    'lib/ui/lazyload',
],function($,Lazyload){

    $(function(){
        //保证只执行一次
        if(lifang._baseService){
            return ;
        }
        //延迟加载
        new Lazyload({
            placeholder:lifang.getResourceUrl('pc/wukong/img/source/img_detail_default.png')
        });


        lifang._baseService = true;
    });

});