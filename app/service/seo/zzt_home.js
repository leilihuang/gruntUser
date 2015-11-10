define(
    ['jQuery', 'lib/ui/class'],
    function ($, Class) {
        var zztHome = Class.create({
            setOptions: function (opt) {
                var options = {}
                $.extend(true, this, options, opt);
            }
        }, {
            init: function (opt) {
                this.setOptions(opt);
                this.bindEval();
            },
            bindEval:function(){
                //this.timeBind();
                this.showPre();
                this.logoBind();
                this.TagClick();
                this.logoHover();
            },
            /**倒计时*/
            timeBind: function () {
                function showHotTime(TimeName) {
                    var TimeLeft = TimeName;
                    var NubTime = TimeLeft.length;
                    var leftTime = new Array();
                    var leftsecond = new Array();
                    var date = new Array();
                    var day1 = new Array();
                    var hour = new Array();
                    var minute = new Array();
                    var second = new Array();
                    var now = new Date();
                    for (i = 0; i < NubTime; i++) {
                        date[i] = new Date($(TimeLeft[i]).attr("data-time"));
                        leftTime[i] = date[i].getTime() - now.getTime();
                        leftsecond[i] = parseInt(leftTime[i] / 1000);
                        if (leftsecond[i] > 0) {
                            day1[i] = Math.floor(leftsecond[i] / (60 * 60 * 24));
                            hour[i] = Math.floor((leftsecond[i] - day1[i] * 24 * 60 * 60) / 3600);
                            minute[i] = Math.floor((leftsecond[i] - day1[i] * 24 * 60 * 60 - hour[i] * 3600) / 60);
                            second[i] = Math.floor(leftsecond[i] - day1[i] * 24 * 60 * 60 - hour[i] * 3600 - minute[i] * 60);
                            if (day1[i] > 0) {
                                $(TimeLeft[i]).html("<b><em>距离结束：</em>" + "<i>" + day1[i] + "</i>" + "天" + "<i>" + hour[i] + "</i>" + "时" + "<i>" + minute[i] + "</i>" + "分" + "<i>" + second[i] + "</i>" + "秒</b>")
                            } else {
                                if (hour[i] > 0) {
                                    $(TimeLeft[i]).html("<b><em>距离结束：</em>" + "<i>" + hour[i] + "</i>" + "时" + "<i>" + minute[i] + "</i>" + "分" + "<i>" + second[i] + "</i>" + "秒</b>")
                                } else {
                                    if (minute[i] > 0) {
                                        $(TimeLeft[i]).html("<b><em>距离结束：</em>" + "<i>" + minute[i] + "</i>" + "分" + "<i>" + second[i] + "</i>" + "秒</b>")
                                    } else {
                                        if (second[i] > 0) {
                                            $(TimeLeft[i]).html("<b><em>距离结束：</em>" + "<i>" + second[i] + "</i>" + "秒</b>")
                                        } else {
                                            $(TimeLeft[i]).html("<b>活动已结束</b>")
                                        }
                                    }
                                }
                            }
                        } else {
                            $(TimeLeft[i]).html("<b>活动已结束</b>")
                        }
                    }
                }

                setInterval(function(){
                    showHotTime($('.time-left'))
                }, 1000);
            },
            /**焦点图*/
            showPre: function () {
                function ShowPre(o) {
                    var that = this;
                    this.box = $("." + o["box"]);
                    //this.box = $("#"+o.box);
                    this.btnP = $("." + o.Pre);
                    this.btnN = $("." + o.Next);
                    this.v = o.v || 1;
                    this.c = 0;
                    var li_node = "li";
                    this.loop = o.loop || false;

                    //循环生成dom
                    if (this.loop) {
                        this.li = this.box.find(li_node);
                        this.box.append(this.li.eq(0).clone(true));
                    }
                    ;
                    this.li = this.box.find(li_node);
                    this.l = this.li.length;

                    //滑动条件不成立
                    if (this.l <= this.v) {
                        this.btnP.hide();
                        this.btnN.hide();
                    }
                    ;
                    this.deInit = true;
                    this.w = this.li.outerWidth(true);
                    this.box.width(this.w * this.l);
                    this.maxL = this.l - this.v;

                    //要多图滚动 重新计算变量
                    this.s = o.s || 1;
                    if (this.s > 1) {
                        this.w = this.v * this.w;
                        this.maxL = Math.floor(this.l / this.v);
                        this.box.width(this.w * (this.maxL + 1));
                        //计算需要添加数量
                        var addNum = (this.maxL + 1) * this.v - this.l;
                        var addHtml = "";
                        for (var adN = 0; adN < addNum; adN++) {
                            addHtml += '<li class="addBox"><div class="photo"></div><div class="text"></div></li>';
                        }
                        ;
                        this.box.append(addHtml);
                    }
                    ;

                    //生成状态图标
                    this.numIco = null;
                    if (o.numIco) {
                        this.numIco = $("." + o.numIco);
                        var numHtml = "";
                        numL = this.loop ? (this.l - 1) : this.l;
                        for (var i = 0; i < numL; i++) {
                            numHtml += '<a href="javascript:void(0);">' + i + '</a>';
                        }
                        ;
                        this.numIco.html(numHtml);
                        this.numIcoLi = this.numIco.find("a");
                        this.numIcoLi.bind("click", function () {
                            if (that.c == $(this).html())return false;
                            that.c = $(this).html();
                            that.move();
                        });
                    }
                    ;
                    this.bigBox = null;
                    this.loadNumBox = null;
                    if (o.loadNumBox) {
                        this.loadNumBox = $("#" + o.loadNumBox);
                    }
                    ;

                    //当前序号设置
                    this.allNumBox = null;
                    if (o.loadNumBox) {
                        this.allNumBox = $("#" + o.allNumBox);
                        if (o.bBox) {
                            var cAll = this.l < 10 ? ("0" + this.l) : this.l;
                        } else {
                            var cAll = this.maxL < 10 ? ("0" + (this.maxL + 1)) : (this.maxL + 1);
                        }
                        ;
                        this.allNumBox.html(cAll);
                    }
                    ;

                    //大图按钮点击操作
                    if (o.bBox) {
                        this.bigBox = $("#" + o.bBox);
                        this.li.each(function (n) {
                            $(this).attr("num", n);
                            var cn = (n + 1 < 10) ? ("0" + (n + 1)) : n + 1;
                            $(this).find(".text").html(cn);
                        });
                        this.loadNum = 0;
                        this.li.bind("click", function () {
                            if (that.loadNum == $(this).attr("num"))return false;
                            var test = null;
                            if (that.loadNum > $(this).attr("num")) {
                                test = "pre";
                            }
                            ;
                            that.loadNum = $(this).attr("num");

                            that.loadImg(test);
                        });
                        that.loadImg();
                        if (o.bNext) {
                            that.bNext = $("#" + o.bNext);
                            that.bNext.bind("click", function () {
                                that.loadNum < that.l - 1 ? that.loadNum++ : that.loadNum = 0;
                                that.loadImg();
                            });
                        }
                        ;
                        if (o.bPre) {
                            that.bPre = $("#" + o.bPre);
                            that.bPre.bind("click", function () {
                                that.loadNum > 0 ? that.loadNum-- : that.loadNum = that.l - 1;
                                that.loadImg("pre");
                            });
                        }
                        ;
                    }
                    ;

                    //滑动点击操作(循环or不循环)
                    if (this.loop) {
                        this.btnP.bind("click", function () {
                            if (that.c <= 0) {
                                that.c = that.l - 1;
                                that.box.css({left: -that.c * that.w});
                            }
                            ;
                            that.c--;
                            that.move(1);
                        });
                        this.btnN.bind("click", function () {
                            if (that.c >= (that.l - 1)) {
                                that.box.css({left: 0});
                                that.c = 0;
                            }
                            ;
                            that.c++;
                            that.move(1);
                        });
                    } else {
                        this.btnP.bind("click", function () {
                            that.c > 0 ? that.c-- : that.c = that.maxL;
                            that.move(1);
                        });
                        this.btnN.bind("click", function () {
                            that.c < that.maxL ? that.c++ : that.c = 0;
                            that.move(1);
                        });
                    }
                    ;
                    that.timer = null;
                    if (o.auto) {
                        that.box.bind("mouseover", function () {
                            clearInterval(that.timer);
                        });
                        that.box.bind("mouseleave", function () {
                            that.autoPlay();
                        });
                        that.autoPlay();

                    }
                    ;
                    this.move();
                }

                ShowPre.prototype = {
                    move: function (test) { //滑动方法
                        var that = this;
                        var pos = this.c * this.w;
                        //document.title = (test&&that.timer);
                        if (test && that.timer) {
                            clearInterval(that.timer);
                        }
                        ;
                        //当前序号图标
                        if (that.numIco) {
                            that.numIcoLi.removeClass("on");
                            var numC = that.c;
                            if (that.loop && (that.c == (this.l - 1))) {
                                numC = 0;
                            }
                            ;
                            that.numIcoLi.eq(numC).addClass("on");
                        }
                        ;

                        this.box.stop();
                        this.box.animate({left: -pos}, function () {
                            if (test && that.auto) {
                                that.autoPlay();
                            }
                            ;
                            if (that.loop && that.c == that.maxL) {
                                that.c = 0;
                                that.box.css({left: 0})
                            }
                            ;
                        });
                        if (that.bigBox)return false;
                        //设置大图加载序号
                        if (that.loadNumBox) {
                            var loadC = parseInt(that.c) + 1;
                            loadC = loadC < 10 ? "0" + loadC : loadC;
                            that.loadNumBox.html(loadC);
                        }
                        ;

                    },

                    autoPlay: function () { //自动播放方法
                        var that = this;

                        that.timer = setInterval(function () {
                            that.c < that.maxL ? that.c++ : that.c = 0;
                            that.move();
                        }, 5000);
                    }
                }

                if ($(".heros img").length > 1) {
                    var ShowPre1 = new ShowPre({
                        box: "heros",
                        Pre: "prev",
                        Next: "next",
                        numIco: "mask-left",
                        loop: 1,
                        auto: 1
                    });
                }
                $("#h_banner").hover(
                    function(){
                        $("#index_b_hero .next").css({ "display":"block"})
                        $("#index_b_hero .prev").css({ "display":"block"})
                    },
                    function(){
                        $("#index_b_hero .next").css({ "display":"none"})
                        $("#index_b_hero .prev").css({ "display":"none"})
                    }
                );
            },
            /**logo墙翻页*/
            logoBind: function () {
                function DY_scroll(wraper, prev, next, img, speed, or) {
                    var wraper = $(wraper);
                    var prev = $(prev);
                    var next = $(next);
                    var w = $(img).height();
                    var ul = $(img).find("ul").height();
                    var img = $(img).find("ul>li");
                    var num = 0, pageNum = parseInt(ul / w), total = pageNum * w, j = 0;
                    var s = speed;
                    next.click(function () {
                        if (num < total) {
                            num += w;
                            j++;
                            img.animate({
                                "margin-top": -num
                            });
                            if (j == pageNum) {
                                $(this).removeClass("hoverDown");
                            }
                        }
                    });
                    next.hover(function () {
                        if (j != pageNum) {
                            $(this).addClass("hoverDown");
                        }
                    }, function () {
                        $(this).removeClass("hoverDown");
                    });
                    prev.click(function () {
                        if (num != 0) {
                            var d = 0;
                            num = num - w;
                            j--;
                            img.animate({
                                "margin-top": -num
                            });
                            if (j == 0) {
                                $(this).removeClass("hoverUp");
                            }
                        }
                    });
                    prev.hover(function () {
                        if (j != 0) {
                            $(this).addClass("hoverUp");
                        }
                    }, function () {
                        $(this).removeClass("hoverUp");
                    });
                    if (or == true) {
                        ad = setInterval(function () {
                            img.animate({
                                "margin-top": -w
                            }, function () {
                                img.find("li").eq(0).appendTo(img);
                                img.css({
                                    "margin-top": 0
                                })
                            })
                        }, s * 1000);
                        wraper.hover(function () {
                            clearInterval(ad)
                        }, function () {
                            ad = setInterval(function () {
                                next.click()
                            }, s * 1000)
                        })
                    }
                }

                DY_scroll(".brand-box1", ".more-arrow-up1", ".more-arrow-down1", ".brand-div1", 3, false);
                DY_scroll(".brand-box2", ".more-arrow-up2", ".more-arrow-down2", ".brand-div2", 3, false);
            },
            /**logo墙翻页前后天*/
            TagClick: function () {
                var $taghd=$(".tabbd");
                var $tagbd=$(".tab-content");
                var k = $taghd.length;
                for (var i = 0; i < k; i++) {
                    $taghd.eq(i).attr("rel", i)
                }
                $taghd.click(function () {
                    var rel = $(this).attr("rel");
                    $(this).addClass("cur");
                    $(this).siblings().removeClass("cur");
                    $tagbd.eq(rel).removeClass("hide");
                    $tagbd.eq(rel).siblings(".tab-content").addClass("hide")
                })
            },
            /**logo墙翻的hover效果*/
            logoHover:function(){
                $(".l-logo").hover(
                    function(){
                        var c = $(".brand-logo").offset().top;
                        var d = $(".brand-logo").offset().left;
                        var a = $(this).offset().top-c-9;
                        var b = $(this).offset().left-d-319;
                        $(".logo-show").css({"top":a+"px","left":b+"px"});
                        $(".logo-show").hide();
                        $(this).find(".logo-show").show();
                    },function(){
                        $(".logo-show").hide();
                        $(".l-logo").css({"position":"","z-index":""});
                    }
                );
            }
        });
        return zztHome;
    }
)