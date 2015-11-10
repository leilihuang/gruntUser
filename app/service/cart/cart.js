define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var cart=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.bindEval();
                this.lengthBox();
                this.addFlay();
                this.TagClick(".tabbd", ".bank_list");
                this.ShowHide(".tab_con_sh", "tab_con_show", ".tab_con_btn");
                this.TagBank(".ico_bank", "#payfs");
            },
            bindEval:function(){
                var _this=this;
                var addShow=$("#show_address"),
                    addHide=$("#hide_address"),
                    showHm=$(".show_hm");
                $("#add_address").on("click",function(){
                    addShow.hide();
                    addHide.show();
                });
                $("#close").on("click",function(){
                    addShow.show();
                    addHide.hide();
                });

                var yhj=$(".show_yhj"),
                    use=$("#use");
                $("#d1").on("click",function(){
                    if($(this).hasClass("d1")){
                        $(this).removeClass("d1").addClass("d2");
                        yhj.show();
                    }else{
                        $(this).removeClass("d2").addClass("d1");
                        showHm.hide();
                        yhj.hide();
                    }
                });
                $("#d2").on("click",function(){
                    if($(this).hasClass("d1")){
                        $(this).removeClass("d1").addClass("d2");
                        use.show();
                    }else{
                        $(this).removeClass("d2").addClass("d1");
                        use.hide();
                    }
                });
                $(".yhj_close").on("click",function(){
                    _this.hasCss(yhj);
                    showHm.hide();
                    addShow.hide();
                    addHide.show();
                });

                $(".coupon_btn").live("click", function () {
                    $(this).children("i").toggleClass("cur");
                    $(".shurucoupon").slideToggle()
                });
                $(".yhq-sel01-show").click(function () {
                    $(".yhq-sel02").hide();
                    $(".yhq-sel01").show()
                });
                $(".yhq-sel02-show").click(function () {
                    $(".yhq-sel01").hide();
                    $(".yhq-sel02").show()
                });
            },
            hasCss:function(yhj){
                var d1=$("#d1");
                if(d1.hasClass("d1")){
                    d1.removeClass("d1").addClass("d2");
                    yhj.show();
                }else{
                    d1.removeClass("d2").addClass("d1");
                }
            },
            lengthBox:function(){
                var qcj=$(".qcj"),
                    zcj=$(".zcj"),
                    show_Up=$(".show_Up"),
                    show_Down=$(".show_Down"),
                    _this=this;

                if(qcj.find(".j_box").length>6){
                    _this.jsHide(qcj,1);
                }else{
                    $("#qcj_btn").hide();
                }
                if(zcj.find(".j_box").length>6){
                    _this.jsHide(zcj,1);
                }else{
                    $("#zcj_btn").hide();
                }
                $("#qcj_btn").on("click",function(){
                    _this.showHide($(this),"show_Down","show_Up",qcj);
                });
                $("#zcj_btn").on("click",function(){
                    _this.showHide($(this),"show_Down","show_Up",zcj);
                });
            },
            showHide:function($this,Donw,Up,qcj){
                var _this=this;
                if($this.find("i").hasClass(Donw)){
                    $this.find("span").text("收起");
                    $this.find("i").removeClass(Donw).addClass(Up);
                    _this.jsHide(qcj,2);
                }else{
                    $this.find("span").text("全部");
                    $this.find("i").removeClass(Up).addClass(Donw);
                    _this.jsHide(qcj,1);
                }
            },
            jsHide:function(qcj,status){
                qcj.find(".j_box").eq(5).nextAll(".j_box").each(function(){
                    if(status==1){
                        $(this).hide();
                    }else{
                        $(this).show();
                    }
                });
            },
            /**购物车，购物特效*/
            addFlay:function(){
                $("#add-gw").on("click",function(event){
                    var $this=$(this);
                    var offset=$("#zzt-end").offset();

                    var src=$("#dq-img").find("img").attr("src");
                    var flyer=$("<img src='"+src+"' class='u-flyer'>");
                    /*				flyer.appendTo("body");
                     flyer.css({
                     left: $(this).offset().left, //开始位置（必填）#fly元素会被设置成position: fixed
                     top:$(this).offset().top //开始位置（必填）
                     }).show().animate({
                     left: offset.left+10, //结束位置（必填）
                     top: offset.top+10, //结束位置（必填）
                     width: 0, //结束时宽度
                     height: 0 //结束时高度
                     },{
                     easing:"easeOutQuad",
                     duration:1000,
                     complete:function(){
                     flyer.remove();
                     $("#msg").show().fadeOut(1000); //提示信息
                     }
                     });*/
                    flyer.fly({
                        start: {
                            left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed
                            top:event.pageY //开始位置（必填）
                        },
                        end: {
                            left: offset.left+10, //结束位置（必填）
                            top: offset.top+10, //结束位置（必填）
                            width: 0, //结束时宽度
                            height: 0 //结束时高度
                        },
                        onEnd: function(){ //结束回调
                            $("#msg").show().fadeOut(1000); //提示信息
                            /*	addcar.css("cursor","default").removeClass('orange').unbind('click');*/
                            this.destory(); //移除dom
                        }
                    });
                });
            },
            TagClick:function(taghd, tagbd) {
                var k = $(taghd).length;
                for (var i = 0; i < k; i++) {
                    $(taghd).eq(i).attr("rel", i)
                }
                $(taghd).click(function () {
                    var rel = $(this).attr("rel");
                    $(this).addClass("cur");
                    $(this).siblings().removeClass("cur");
                    $(tagbd).eq(rel).removeClass("hide");
                    $(tagbd).eq(rel).siblings().addClass("hide")
                })
            },
            ShowHide:function(parentDiv, hideClass, hideBtn) {
                $(hideBtn).click(function () {
                    $(parentDiv).toggleClass(hideClass)
                })
            },
            TagBank:function(bankName, bankId) {
                $(bankName).live("click", function () {
                    var bankclass = $(this).attr("class");
                    $(bankId).attr("class", bankclass)
                })
            }
        });
        return cart;
    }
)