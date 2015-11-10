define(
    ['jQuery','lib/ui/class','util/scrollEval'],
    function($,Class,ScrollEval){
        var comm=Class.create({
            setOptions:function(opt){
                var options={

                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.bindEval();
                this.detailImg();
            },
            bindEval:function(){
                var _this=this;
                /**导航菜单*/
                this.TimeNav(".nav_sort_a",".nav_sort_sub_a",".navtaghd_a",".navtagbd_a" );
                this.TimeNav(".nav_sort_b",".nav_sort_sub_b",".navtaghd_b",".navtagbd_b" );
                /**顶部分类菜单*/
                this.NavTagHover(".navtaghd_a",".navtagbd_a");
                this.NavTagHover(".navtaghd_b",".navtagbd_b");
                /**导航购物车tab*/
                this.tabs(".nav_cart",".nav_cart_sub");
                /**滚动加载左右浮动，以及顶部导航栏*/
                this.scrollMenu();
                /**顶部活动广告*/
                this.activeGg();
                /**右侧导航栏效果*/
                this.TagHover(".tip-show-btn", ".tip-show", 35, 70);

                this.DivHeight(".sitebar-out", 0);
                this.DivHeight(".sitebar", 0);
                this.DivHeight(".sitebar-box", 0);
                this.DivHeight(".sitebar-con-bd", 35);

                this.DivMargin(".sitebar-tab01");
                this.CloseBtn(".sitebar-box-close", ".sitebar-box", ".sitebar");
                this.GotoTop(".sitebar-tab09");
                this.rightBind();
                /**设置菜单栏宽度*/
                $(window).resize(function() {
                    _this.MenuWidth();
                });
            },
            /**导航菜单*/
            TimeNav:function(onhover,hoverbox,taghd,tagbd ){
                var sTime;
                $(onhover).hover(
                    function(){
                        clearTimeout(sTime);
                        sTime=setTimeout(function(){
                            $(hoverbox).show();
                        },100);
                    },
                    function(){
                        clearTimeout(sTime);
                        sTime=setTimeout(function(){
                            $(hoverbox).hide();
                            $(taghd).removeClass("cur");
                            $(tagbd).addClass("hide");
                        },300);
                    }
                );
            },
            /**顶部分类菜单*/
            NavTagHover:function(taghdH,tagbdH){
                var k = $(taghdH).length;
                for(var i=0;i<k;i++){
                    $(taghdH).eq(i).attr("rel",i)
                }

                $(taghdH).hover(function(){
                    var rel = $(this).attr("rel");
                    $(this).addClass("cur");
                    $(this).siblings().removeClass("cur");
                    $(tagbdH).eq(rel).removeClass("hide");
                    $(tagbdH).eq(rel).siblings(tagbdH).addClass("hide");
                })
            },
            /**导航购物车tab*/
            tabs:function(p,s){
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
                        },300);
                    }
                );
            },
            /**滚动加载左右浮动，以及顶部导航栏*/
            scrollMenu:function(){
                var nav_top = $(".nav"), ah = 0;
                var nav_topH = $(".nav").height();
                var haederH = $(".header").height();

                function scrollMenu(){
                    var yy = $(this).scrollTop();
                    if ($(".banner-spread").css("display") == "block") {
                        ah = $(".banner-spread").height()
                    } else {
                        ah = 0
                    }
                    var minY = haederH + ah + 46;
                    if ($(".detail_tit").length <= 0) {
                        if (yy >= minY) {
                            $(".nav-box").slideDown();
                        } else {
                            $(".nav-box").slideUp();
                        }
                    }
                    if ($(".left-bar").length > 0) {
                        if ((yy >= minY)) {
                            $(".left-bar").show()
                        } else {
                            $(".left-bar").hide()
                        }
                    }
                    if ($(".right-bar").length > 0) {
                        if ((yy >= minY)) {
                            $(".right-bar").show()
                        } else {
                            $(".right-bar").hide()
                        }
                    }
                }

               var s=ScrollEval.getObj();
                s.scrollEval(function(){
                    scrollMenu();
                })
            },
            /**顶部活动广告*/
            activeGg:function(){
                var $banner=$(".banner-spread");
                if ($banner.length > 0 && $banner.css("display") == "block") {
                    $banner.slideDown();
                    $(".close-x").click(function() {
                        $banner.slideUp();
                    })
                }
            },
            /**右侧导航栏效果*/
            TagHover:function(taghdH, tagbdH, tagnumb01, tagnumb02) {
                $(taghdH).live("hover", function(event) {
                    if (event.type == "mouseenter") {
                        $(this).addClass("cur");
                        if ($(this).children(tagbdH).length > 0) {
                            $(this).children(tagbdH).stop(false, false);
                            $(this).children(tagbdH).css("display", "block");
                            $(this).children(tagbdH).animate({
                                right: tagnumb01 + "px",
                                opacity: "1"
                            }, 300)
                        }
                    } else {
                        $(this).removeClass("cur");
                        if ($(this).children(tagbdH).length > 0) {
                            $(this).children(tagbdH).stop(false, false);
                            $(this).children(tagbdH).animate({
                                right: tagnumb02 + "px",
                                opacity: "0"
                            }, 300, function() {
                                $(this).css("display", "none")
                            })
                        }
                    }
                })
            },
            DivHeight:function(DivClass, snumb) {
                if ($(DivClass).length > 0) {
                    $(DivClass).height($(window).height() - snumb);
                    $(window).resize(function() {
                        $(DivClass).height($(window).height() - snumb)
                    })
                }
            },
            /**我的账号*/
            DivMargin:function(DivMarginclass) {
                if ($(DivMarginclass).length > 0) {
                    $(DivMarginclass).eq(0).css({
                        "margin-top": $(window).height() * 0.18 + "px"
                    });
                    $(window).resize(function() {
                        $(DivMarginclass).eq(0).css({
                            "margin-top": $(window).height() * 0.18 + "px"
                        })
                    })
                }
            },
            //我的喆兔，购物车
            CloseBtn:function(closebtn, sitebarbox, sitebarall) {
                var _this=this;
                $(closebtn).live("click", function() {
                    var boxwidth = $(this).parents(sitebarbox).width();
                    $(sitebarall).stop(false, false);
                    $(sitebarall).animate({
                        right: -boxwidth + "px"
                    }, 300, function() {
                        $(sitebarbox).css({
                            "visibility": "hidden",
                            "z-index": "999997"
                        });
                         _this.MenuWidth();
                    })
                })
            },
            //返回顶部
            GotoTop:function(topbtn) {
                if ($(topbtn).length > 0) {
                    $(window).scroll(function() {
                        if ($(window).scrollTop() > 0) {
                            $(topbtn).show(500)
                        } else {
                            $(topbtn).hide(500)
                        }
                    });
                    $(topbtn).live("click", function() {
                        $("body,html").animate({
                            scrollTop: 0
                        }, 500)
                    })
                }
            },
            //右侧菜单绑定的事件
            rightBind:function(){
                var _this=this;
                // 未登录状态为 0 ； 已登录状态为 1
                //SiteBarsSH(1);
                function SpaceClick(sitebarallclass, sitebarall, sitebarbox, sitebarnumb) {
                    if ($(sitebarall).length > 0) {
                        $(document).live("click", function(e) {
                            var target = $(e.target);
                            if (target.hasClass(sitebarallclass) || target.parents().hasClass(sitebarallclass)) {
                                return
                            } else {
                                if ($(sitebarall).css("right") == "0px") {
                                    var sitebarwid = $(sitebarall).width();
                                    var siteconwid = $(sitebarall).width() - sitebarnumb;
                                    $(sitebarall).animate({
                                        right: -siteconwid + "px"
                                    }, 300, function() {
                                        $(sitebarbox).css({
                                            "visibility": "hidden",
                                            "z-index": "999997"
                                        });
                                         _this.MenuWidth();
                                    })
                                }
                            }
                        })
                    }
                }
                function SiteBar(sitebarbtn, sitebarcon, sitebarnumb, sitebarall) {
                    var sitebarallclass = $(sitebarall).attr("class");
                    var siteconwid = $(sitebarcon).width();
                    var siteallwid = siteconwid + sitebarnumb;
                    $(sitebarall).width(siteallwid + "px");
                    if ($(sitebarcon).css("visibility") == "hidden") {
                        $(sitebarcon).css({
                            "visibility": "visible",
                            "z-index": "999998"
                        });
                        $(sitebarall).stop(false, false);
                        $(sitebarall).animate({
                            right: "0"
                        }, 300)
                    } else {
                        $(sitebarall).stop(false, false);
                        $(sitebarall).animate({
                            right: -siteconwid + "px"
                        }, 300, function() {
                            $(sitebarcon).css({
                                "visibility": "hidden",
                                "z-index": "999997"
                            });
                             _this.MenuWidth();
                        })
                    }
                }
                function SiteBarShow(sitebarbtn, sitebarcon, sitebarnumb, sitebarall, sitebarbox) {
                    var siteconwid = $(sitebarcon).width();
                    var siteallwid = siteconwid + sitebarnumb;
                    $(sitebarall).width(siteallwid + "px");
                    if ($(sitebarcon).css("visibility") == "hidden") {
                        var siteconheig = $(sitebarbox).height();
                        $(sitebarbox).css({
                            "visibility": "hidden",
                            "z-index": "999997"
                        });
                        $(sitebarcon).css({
                            "visibility": "visible",
                            "z-index": "999998",
                            "top": siteconheig + "px"
                        });
                        $(sitebarcon).stop(false, false);
                        $(sitebarcon).animate({
                            top: "0"
                        }, 300)
                    } else {
                        $(sitebarall).stop(false, false);
                        $(sitebarall).animate({
                            right: -siteconwid + "px"
                        }, 300, function() {
                            $(sitebarcon).css({
                                "visibility": "hidden",
                                "z-index": "999997"
                            });
                             _this.MenuWidth();
                        })
                    }
                }
                function Sitebaranimate(sitebarbtn, sitebarcon, sitebarnumb, sitebarall, sitebarbox) {
                    $(sitebarbtn).live("click", function() {

                        var siteconwid = -($(sitebarall).width() - sitebarnumb);
                        if ($(sitebarall).css("right") == "0px") {
                            SiteBarShow(sitebarbtn, sitebarcon, sitebarnumb, sitebarall, sitebarbox)
                        }
                        if ($(sitebarall).css("right") == siteconwid + "px") {
                            SiteBar(sitebarbtn, sitebarcon, sitebarnumb, sitebarall)
                        }

                    })
                }

                function CloseDiv(Closebtnn, Closeboxx) {
                    $(Closebtnn).live("click", function() {
                        $(Closeboxx).css({
                            "display": "none"
                        })
                    })
                }
                function UnLogin(sitebarbtn, sitebarlogbox, sitebarlogclass, sitebarallclass, closebtn) {
                    if ($(sitebarlogbox).length > 0) {
                        $(sitebarbtn).live("click", function() {
                            var windowsH = $(window).height();
                            var sitebaralln = "." + sitebarallclass;
                            if ($(sitebaralln).attr("class").indexOf("site-min-height") > 0) {
                                var sitebarallnH = $(sitebaralln).height();
                                if (windowsH < sitebarallnH) {
                                    windowsH = sitebarallnH
                                }
                            }
                            var sitebarbtntop = $(this).offset().top - $(sitebaralln).offset().top - 1;
                            var bottomH = windowsH - sitebarbtntop;
                            var sitebarlogheight = $(sitebarlogbox).height();
                            var siteH = $(this).height();
                            if (bottomH > sitebarlogheight) {
                                $(sitebarlogbox).css({
                                    "display": "block",
                                    "top": sitebarbtntop + "px",
                                    "bottom": "auto"
                                });
                                $(sitebarlogbox).removeClass("curbottom")
                            } else {
                                $(sitebarlogbox).css({
                                    "display": "block",
                                    "top": "auto",
                                    "bottom": bottomH - siteH + "px"
                                });
                                $(sitebarlogbox).addClass("curbottom")
                            }
                            if ($(sitebarlogbox).css("display") == "block") {
                                $(document).live("mouseover", function(e) {
                                    var target = $(e.target);
                                    if (target.hasClass(sitebarallclass) || target.parents().hasClass(sitebarallclass) || target.hasClass(sitebarlogclass)) {
                                        return
                                    } else {
                                        $(sitebarlogbox).css({
                                            "display": "none"
                                        })
                                    }
                                })
                            }
                        });
                        $(closebtn).live("click", function() {
                            $(this).parents(sitebarlogbox).css({
                                "display": "none"
                            })
                        })
                    }
                }
                function SiteBarOne() {
                    SpaceClick("sitebar", ".sitebar", ".sitebar-box", 35);
                    Sitebaranimate(".sitebar-tab01", ".sitebar-con01", 35, ".sitebar", ".sitebar-box");
                    Sitebaranimate(".sitebar-tab02", ".sitebar-con02", 35, ".sitebar", ".sitebar-box")
                }
                function SiteBarOne_f() {
                    SpaceClick("sitebar", ".sitebar", ".sitebar-box", 35);
                    Sitebaranimate(".sitebar-tab02", ".sitebar-con02", 35, ".sitebar", ".sitebar-box");
                    CloseDiv(".sitebar-tab02", ".sitebar-login")
                }
                function SiteBarTwo() {
                    UnLogin(".sitebar-tab01", ".sitebar-login", "sitebar-login", "sitebar", ".sitebar-login-close")
                }
                function SiteBarsSH(judge) {
                    if (judge == 0) {
                        SiteBarTwo();
                        SiteBarOne_f()
                    }
                    if (judge == 1) {
                        SiteBarOne()
                    }
                };
            },
            /**设置菜单栏宽度*/
            MenuWidth:function(){
                if ($(window).width() <= 1000 ) {
                    var aa = $(".sitebar").width();
                    $(".sitebar").animate({
                        right: "-" + aa + "px"
                    }, 100);
                    $(".sitebar-fix").animate({
                        left: "-35px"
                    }, 100);
                    $(".sitebar-out").addClass("icon-hover");
                    $(".icon-hover").live("hover", function(event) {
                        if (event.type == "mouseenter") {
                            if (!$(".sitebar").is(":animated") && $(".sitebar").css("right") != "0px") {
                                var aa = $(".sitebar").width() - 35;
                                $(".sitebar").animate({
                                    right: "-" + aa + "px"
                                }, 100);
                                $(".sitebar-fix").animate({
                                    left: "0px"
                                }, 100)
                            }
                        } else {
                            //if ($(window).width() > 1000 && $(".sitebar").css("right") != "0px")
                            if(!$(".sitebar").is(":animated") && $(".sitebar").css("right") != "0px")
                            {
                                var aa = $(".sitebar").width();
                                $(".sitebar").animate({
                                    right: "-" + aa + "px"
                                }, 100);
                                $(".sitebar-fix").animate({
                                    left: "-35px"
                                }, 100)
                            }
                        }
                    })
                } else {
                    var aa = $(".sitebar").width() - 35;
                    $(".sitebar").animate({
                        right: "-" + aa + "px"
                    }, 500);
                    $(".sitebar-fix").animate({
                        left: "0px"
                    }, 500);
                    $(".sitebar-out").removeClass("icon-hover")
                }
            },
            /**添加商品详情页无优惠隐藏下拉图片*/
            detailImg:function(){
                var boxt=$(".fullcut-open");
                var box=$(".fullcut-box");
                if(boxt.length>0){
                    if(box.length==0){
                        boxt.find("ins").remove();
                    }
                }
            },
            /**通用浮点绑定事件
             * cs 绑定事件的样式
             * bt 有顶部浮动菜单栏的，就传样式名，没有就不传
             * */
            floatBind:function(cs,bt){
                $(cs).each(function(){
                    $(this).on("click",function(){
                        var id=$(this).attr("name");
                        var top=$("#"+id).offset().top;
                        if(bt){
                            var h=$(bt).height();
                            top=top-h;
                        }
                        $(window).scrollTop(top);
                    })
                });
            },
            /**移动切换tab*/
            tab:function(cs,jt,con){
                var length=$(cs).length;
                var w=parseInt(1000/length);
                $(con).eq(0).show();
                $(cs).each(function(){
                    $(this).hover(function(){
                        var index=$(this).index();
                        //var left=index*w+w/2;
                        var left=index*140+70;
                        $(jt).css("left",left);
                        $(con).hide();
                        var h=$(con).eq(index).height();
                        $(con).eq(index).show().siblings("ms-cur").hide();
                        $(con).eq(index).parent().height(h);
                    },function(){

                    });
                });
            }
        });
        return comm;
    }
)