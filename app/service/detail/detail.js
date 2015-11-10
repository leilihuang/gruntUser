define(
    ['jQuery','lib/ui/class','jqzoom','util/scrollEval','service/devel/portal_menu'],
    function($,Class,Jqzoom,Scroll,Menu){
        var detail=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.zoomFd();
                this.bindEval();
            },
            bindEval:function(){
                this.selectNorms();
                this.selectImg();
                this.quota();
                this.guotaXx();
                this.babyName();
                this.shopFloat();
                this.sTab(".fullcut-open",".fullcut-box");
                this.manJ();
                this.DetailHover(".adtab",".ul-con");
            },
            /**放大镜*/
            zoomFd:function(){
                $(".jqzoom").jqueryzoom({xzoom:380,yzoom:410});
            },
            /**规格选择*/
            selectNorms:function(){
                $(".sys_item_spec").find("li").each(function() {
                    $(this).on("click",function() {
                        if (!$(this).hasClass("noselected")) {
                            $(this).addClass("selected").siblings("li").removeClass("selected");
                            i.attr("data-attrval", $(this).attr("data-aid"))
                        }
                    })
                });
            },
            /**商品图片选择*/
            selectImg:function(){
                $(".showspic").each(function() {
                    var i = $(this);
                    var p = i.find("li");
                    var a = i.find("a");
                    p.mouseover(function() {
                        $(this).addClass("showsel").siblings("li").removeClass("showsel")
                    });
                    a.click(function() {
                        return false
                    })
                })
            },
            /**商品限购*/
            quota:function(){
                if ($("#numb").length > 0) {
                    numbb = Number($("#numb").text())
                } else {
                    numbb = 999
                }
            },
            /**限购规则提示信息*/
            guotaXx:function(){
                if ($(".purple-down").length > 0) {
                    var pTime;
                    $(".purple-down").hover(function() {
                        clearTimeout(pTime);
                        pTime = setTimeout(function() {
                            $(".purple-down-box").show()
                        }, 100)
                    }, function() {
                        clearTimeout(pTime);
                        pTime = setTimeout(function() {
                            $(".purple-down-box").hide()
                        }, 300)
                    })
                }
            },
            BuyUrl:function(){
                var pcounts = $("input[id^=qty_item_]").val();
                var patrn = /^[0-9]{1,4}$/;
                if (!patrn.exec(pcounts)) {
                    pcounts = 1
                } else {
                    if (pcounts <= 0) {
                        pcounts = 1
                    }
                    if (pcounts >= 1000) {
                        pcounts = 999
                    }
                }
            },
            /**定制宝宝专属特卖*/
            babyName:function(){
                $("input.binp").bind({
                    focus:function(){
                        $(this).addClass("pinkbor")},
                    blur:function(){
                        $(this).removeClass("pinkbor")}
                });
            },
            /**超过商品参数就浮动到顶部*/
            shopFloat:function(){
                Scroll.scrollEval(function(){
                    if($(window).scrollTop()>$(".detail_tit").offset().top){
                        $(".detail_tit").children("div").addClass("fixtop");
                        $(".cart-go").show();
                    }else{
                        $(".detail_tit").children("div").removeClass("fixtop");
                        $(".cart-go").hide();
                    }
                });
                $(".cart-go").on("click",function(){
                    var abc = $(".detail_pd").offset().top;
                    $("body,html").animate({
                        scrollTop:abc
                    },500);
                });
            },
            sTab:function(p,s){
                var def;
                $(p).hover(
                    function(){
                        clearTimeout(def);
                        def=setTimeout(function(){
                            $(s).show()
                        },100);
                    },
                    function(){
                        clearTimeout(def);
                        def=setTimeout(function(){
                            $(s).hide()
                        },0);
                    }
                );
            },
            /**满减*/
            manJ:function(){
                if( $(".fullcut-box").length>0){
                    var awid=$(".fullcut-box").width();
                    var bwid=$(".fullcut").width();

                    if(awid>bwid){
                        $(".fullcut").width(awid);
                        $(".fullcut-box").width(awid);
                    }else{
                        $(".fullcut-box").width(bwid);
                    }
                }
            },
            /**品牌优势切换*/
            DetailHover:function(taghdH,tagbdH){
                var k = $(taghdH).length;
                for(var i=0;i<k;i++){
                    $(taghdH).eq(i).attr("rel",i)
                }
                $(taghdH).hover(function(){
                    var rel = $(this).attr("rel");
                    $(this).addClass("cur");
                    $(this).siblings(taghdH).removeClass("cur");
                    $(tagbdH).eq(rel).removeClass("hide");
                    $(tagbdH).eq(rel).siblings(tagbdH).addClass("hide");
                })
            }
        });
        return detail;
    }
)
var setAmount = {
    min: 1,
    max: numbb,
    reg: function(x) {
        return new RegExp("^[1-9]\\d*$").test(x)
    },
    amount: function(obj, mode) {
        var x = $(obj).val();
        if (this.reg(x)) {
            if (mode) {
                x++
            } else {
                x--
            }
        } else {
            $(obj).val(1);
            $(obj).focus()
        }
        return x
    },
    reduce: function(obj) {
        var x = this.amount(obj, false);
        if (x >= this.min) {
            $(obj).val(x)
        } else {
            $(obj).val(1);
            $(obj).focus()
        }
        if (x < this.max) {
            $("#plus").removeClass("ico_change2").addClass("ico_change")
        }
    },
    add: function(obj) {
        var x = this.amount(obj, true);
        if (x <= this.max) {
            $(obj).val(x)
        } else {
            $(obj).val(this.max);
            $(obj).focus()
        }
        if (x >= this.max) {
            $("#plus").removeClass("ico_change").addClass("ico_change2")
        }
    },
    modify: function(obj) {
        var x = $(obj).val();
        if (x < this.min || x > this.max || !this.reg(x)) {
            $(obj).val(1);
            $(obj).focus()
        }
    }
};