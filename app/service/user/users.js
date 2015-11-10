define(
    ['jQuery', 'lib/ui/class'],
    function ($, Class) {
        var users = Class.create({
            setOptions: function (opt) {
                var options = {}
                $.extend(true, this, options, opt);
            }
        }, {
            init: function (opt) {
                this.setOptions(opt);
            },
            bindEval: function () {
                this.zqBind();
                this.qdBind();
                this.curBind();
                this.bindAry();
            },
            /**我的喆喆兔*/
            zqBind: function () {
                var con = $("#easyDialogBox"),
                    bj = $("#overlay"),
                    zq = $("#zq"),
                    close = $(".close-btn2");
                zq.on("click", function () {
                    con.show();
                    bj.show();
                });
                close.on("click", function () {
                    con.hide();
                    bj.hide();
                });
            },
            qdBind: function () {
                var qd = $("#w-dj");
                var bi = $("#addBi");

                qd.on("click", function () {
                    bi.show();
                    $("#w-cur").show();
                    bi.animate({
                        top: "-50px",
                        display: "block"
                    }, 1000, function () {
                        bi.css({
                            top: "0",
                            display: "none"
                        });
                        qd.hide();
                    });
                });
            },
            curBind: function () {
                $("#w-cur").on("click", function () {
                    $("#qd-img").show();
                    var d = $("#cc");
                    d.show();
                    d.calendar({
                        weeks: ["日", "一", "二", "三", "四", "五", "六"],
                        months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                        current: new Date("yyyy-MM-dd"),
                        onSelect: function (date) {
                            $(this).addClass("adds");
                            var o = d.calendar("options");
                            console.log(date.getFullYear() + "," + (date.getMonth() + 1) + "," + date.getDate());
                        }
                    });
                    $('#cc').calendar('moveTo', new Date(2015, 7, 15));
                    $('#cc').calendar('moveTo', new Date(2015, 7, 14));

                });
            },
            //没有分类
            bindAry:function(){
                $(".a-th-box").hover(function () {
                    $(this).addClass("th-box-sel");
                    $(this).children("div.th-box").fadeIn(100)
                }, function () {
                    $(this).removeClass("th-box-sel");
                    $(this).children("div.th-box").fadeOut(100)
                });
                $(".edit-rec").click(function () {
                    $(".edit-box").toggle();
                    $(".edit-txfs-box").hide()
                });
                $(".edit-txfs").click(function () {
                    $(".edit-txfs-box").show();
                    $(".edit-box").hide();
                    var Radval = $('input:radio[name="pay-mode"]:checked').val();
                    if (Radval == 0) {
                        $(".receivables-a").show();
                        $(".receivables-b").hide()
                    }
                    if (Radval == 1) {
                        $(".receivables-a").hide();
                        $(".receivables-b").show()
                    }
                    return false
                });
                $("input[type=radio][name=pay-mode][value='0']").click(function () {
                    $(".receivables-a").show();
                    $(".receivables-b").hide()
                });
                $("input[type=radio][name=pay-mode][value='1']").click(function () {
                    $(".receivables-b").show();
                    $(".receivables-a").hide()
                });
                $("#wsdh-reason").change(function () {
                    var checkIndex = $(this).get(0).selectedIndex;
                    if (checkIndex == 2) {
                        $("#remark").css({"display": "block"})
                    } else {
                        $("#remark").css({"display": "none"})
                    }
                });
                $(".open-wsdh").click(function () {
                    $(".wsdh-form-pre").slideToggle();
                    if ($(".wsdh-form").length > 0) {
                        $(".wsdh-form").hide()
                    }
                });
                $(".close-wsdh-form-pre").click(function () {
                    $(".wsdh-form-pre").slideUp()
                });
                $(".open-wsdh-form").click(function () {
                    $(".wsdh-form-pre").hide();
                    $(".wsdh-form").slideDown();
                    return false
                });
            }
        });
        return users;
    }
)