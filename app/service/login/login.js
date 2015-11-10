define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var login=Class.create({
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
                this.hoveBind();
                this.vaildBind();
                this.hideCon();
            },
            hoveBind:function(){
                $("input.reginp").bind({
                    focus: function () {
                        $(this).parent("div").removeClass("n-opacity")
                    }, blur: function () {
                        $(this).parent("div").addClass("n-opacity")
                    }
                })
            },
            /**密码，邮箱验证*/
            vaildBind:function(){
                function PasswordLevel(IdPassword, pwdLevel) {
                    $(IdPassword).focus(function () {
                        $(pwdLevel).attr("class", "color-gray");
                        $(IdPassword).keyup()
                    });
                    $(IdPassword).keyup(function () {
                        var __th = $(this);
                        if (!__th.val()) {
                            Primary();
                            return
                        }
                        if (__th.val().length < 6) {
                            Weak();
                            return
                        }
                        var _r = checkPassword(__th);
                        if (_r < 1) {
                            Primary()
                        }
                        if (_r > 0 && _r < 2) {
                            Weak()
                        } else {
                            if (_r >= 2 && _r < 4) {
                                Medium()
                            } else {
                                if (_r >= 4) {
                                    Tough()
                                }
                            }
                        }
                    });
                    function Primary() {
                        $(pwdLevel).attr("class", "color-gray")
                    }

                    function Weak() {
                        $(pwdLevel).attr("class", "color-red")
                    }

                    function Medium() {
                        $(pwdLevel).attr("class", "color-org")
                    }

                    function Tough() {
                        $(pwdLevel).attr("class", "color-green")
                    }

                    function checkPassword(pwdinput) {
                        var maths, smalls, bigs, corps, cat, num;
                        var str = $(pwdinput).val();
                        var len = str.length;
                        var cat = /.{16}/g;
                        if (len == 0) {
                            return 1
                        }
                        if (len > 20) {
                            $(pwdinput).val(str.match(cat)[0])
                        }
                        cat = /.*[\u4e00-\u9fa5]+.*$/;
                        if (cat.test(str)) {
                            return -1
                        }
                        cat = /\d/;
                        var maths = cat.test(str);
                        cat = /[a-z]/;
                        var smalls = cat.test(str);
                        cat = /[A-Z]/;
                        var bigs = cat.test(str);
                        var corps = corpses(pwdinput);
                        var num = maths + smalls + bigs + corps;
                        if (len < 6) {
                            return 1
                        }
                        if (len >= 6 && len <= 8) {
                            if (num == 1) {
                                return 1
                            }
                            if (num == 2 || num == 3) {
                                return 2
                            }
                            if (num == 4) {
                                return 3
                            }
                        }
                        if (len > 8 && len <= 11) {
                            if (num == 1) {
                                return 2
                            }
                            if (num == 2) {
                                return 3
                            }
                            if (num == 3) {
                                return 4
                            }
                            if (num == 4) {
                                return 5
                            }
                        }
                        if (len > 11) {
                            if (num == 1) {
                                return 3
                            }
                            if (num == 2) {
                                return 4
                            }
                            if (num > 2) {
                                return 5
                            }
                        }
                    }

                    function corpses(pwdinput) {
                        var cat = /./g;
                        var str = $(pwdinput).val();
                        var sz = str.match(cat);
                        for (var i = 0; i < sz.length; i++) {
                            cat = /\d/;
                            maths_01 = cat.test(sz[i]);
                            cat = /[a-z]/;
                            smalls_01 = cat.test(sz[i]);
                            cat = /[A-Z]/;
                            bigs_01 = cat.test(sz[i]);
                            if (!maths_01 && !smalls_01 && !bigs_01) {
                                return true
                            }
                        }
                        return false
                    }
                }
                if ($("#password-ph").length > 0) {
                    $("#password-ph").bind("keyup change", function (event) {
                        if ($("#password-ph").val().length > 5) {
                            $(this).siblings(".colorbar").css({"display": "block"})
                        } else {
                            $(".colorbar").css({"display": "none"})
                        }
                    });
                    PasswordLevel("#password-ph", "#colorbar")
                }
                if ($("#password-mail").length > 0) {
                    $("#password-mail").bind("keyup change", function (event) {
                        if ($("#password-mail").val().length > 5) {
                            $(this).siblings(".colorbar").css({"display": "block"})
                        } else {
                            $(".colorbar").css({"display": "none"})
                        }
                    });
                    PasswordLevel("#password-mail", "#colorbarMail")
                }
                if ($("#cfmail").length > 0) {
                    $("#cfmail").hover(function () {
                        $(".mail-icon").addClass("animate")
                    }, function () {
                        $(".mail-icon").removeClass("animate")
                    })
                }
            },
            /**隐藏和显示某些内容*/
            hideCon:function(){
                var isIE = !!window.ActiveXObject;
                var jsscr = "http://s.zzt.tm/zt/pc/js/jquery.html5-placeholder-shim.js";
                if ($(".tag-l").length > 0) {
                    $(".tag-l").click(function () {
                        if (isIE) {
                            $.getScript(jsscr, function () {
                                jQuery.placeholder.shim()
                            })
                        }
                        $(".phone-reg").css({"display": "block"});
                        $(".mail-reg").css({"display": "none"});
                        $(this).addClass("cur");
                        if ($(this).siblings().hasClass("cur")) {
                            $(this).siblings().removeClass("cur")
                        }
                    });
                    $(".tag-r").click(function () {
                        if (isIE) {
                            $.getScript(jsscr, function () {
                                jQuery.placeholder.shim()
                            })
                        }
                        $(".phone-reg").css({"display": "none"});
                        $(".mail-reg").css({"display": "block"});
                        $(this).addClass("cur");
                        if ($(this).siblings().hasClass("cur")) {
                            $(this).siblings().removeClass("cur")
                        }
                    })
                }
                if ($(".tag-a").length > 0) {
                    $(".tag-a").click(function () {
                        if (isIE) {
                            $.getScript(jsscr, function () {
                                jQuery.placeholder.shim()
                            })
                        }
                        $(".phone-reg").slideDown();
                        $(".mail-reg").slideUp();
                        $(this).children("i").addClass("cur");
                        if ($(".tag-b").children("i").hasClass("cur")) {
                            $(".tag-b").children("i").removeClass("cur")
                        }
                    });
                    $(".tag-b").click(function () {
                        if (isIE) {
                            $.getScript(jsscr, function () {
                                jQuery.placeholder.shim()
                            })
                        }
                        $(".phone-reg").slideUp();
                        $(".mail-reg").slideDown();
                        $(this).children("i").addClass("cur");
                        if ($(".tag-a").children("i").hasClass("cur")) {
                            $(".tag-a").children("i").removeClass("cur")
                        }
                    })
                }
            }
        });
        return login;
    }
)