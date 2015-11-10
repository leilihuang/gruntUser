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
                this.shopTip();
            },
            /**购物须知*/
            shopTip:function(){
                if ($(".purple-boxTax").length > 0) {
                    var pTime;
                    $(".purple-boxTax").hover(function() {
                        clearTimeout(pTime);
                        pTime = setTimeout(function() {
                            $(".purple-down-boxTax").show()
                        }, 100)
                    }, function() {
                        clearTimeout(pTime);
                        pTime = setTimeout(function() {
                            $(".purple-down-boxTax").hide()
                        }, 300)
                    })
                };
            }
        });
        return detail;
    }
)