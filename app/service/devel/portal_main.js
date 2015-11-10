define(
    ['jQuery','lib/ui/class','util/util'],
    function($,Class,Util){
      var main=Class.create({
        setOptions:function(opt){
          var options={
            contextPath:$('#contextPath').val()
          };
          $.extend(true,this,options,opt);
        }
      },{
        init:function(opt){
          this.setOptions(opt);
          this.initFunc();
        },
        initFunc:function(){
          var _this = this;
          var overlay_showFlag=_this.getCookie("overlay_showFlag");
          if(overlay_showFlag==undefined){
            Util.alertHd();
            if($("#coverType").val() == 0){
            	_this.addCookie("overlay_showFlag","overlay_showFlag",24);
            }else if($("#coverType").val() == 1){
            	_this.addCookie("overlay_showFlag","overlay_showFlag",-1);
            }
          }
          $("#close").on("click",function(){
            $("#overlay").hide();
            $("#xrl").hide();
          });
          //正在热卖
          $("#todayPageContent").scrollPagination({
            'contentPage' : _this.contextPath+'/page/today.htm',
            'contentData' : function() {
              if(!$(this).data("pageNo")){
                $(this).data("pageNo", 1);
              }
              var pageNo = $(this).data("pageNo");
              $(this).data("pageNo", pageNo + 1);
              return {
                'pageNo': pageNo,
                'pageSize': 10
              };
            },
            'scrollTarget' : $(window),
            'heightOffset' : 400,
            'beforeLoad': function() {
            },
            'afterLoad' : function(elementsLoaded) {
              if ($(elementsLoaded[elementsLoaded.length - 1]).hasClass('lastElem') || elementsLoaded.length == 0) {
                $(this).data("pageNo", 2);
                $('#hotPageContent').setOpts($('#hotPageContent'),{"contentPage":_this.contextPath+"/page/hot.htm","targetAppend":"#hotPageContent"});
              }
              $(elementsLoaded).fadeInWithDelay();
            }
          });

          $.fn.fadeInWithDelay = function() {
            var delay = 0;
            return this.each(function() {
              $(this).delay(delay).animate({opacity:1}, 200);
              delay += 100;
            });
          };
        },
        addCookie:function(objName,objValue,objHours){
          var str = objName + "=" + escape(objValue);
          if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours*3600*1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
          }
          document.cookie = str;
        },
        getCookie:function(objName){
          var arrStr = document.cookie.split("; ");
          for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == objName)
              return unescape(temp[1]);
          }
        }
      });
      return main;
    }
)


