define(
    ['jQuery','lib/ui/class'],
    function($,Class){
      var right=Class.create({
        setOptions:function(opt){
          var options={
            rightRcContextPath:$('#right_rc_contextPath').val(),
            userSessionExists:$('#right_user_session_exists').val()
          };
          $.extend(true,this,options,opt);
        }
      },{
        init:function(opt){
          this.setOptions(opt);
          this.clickBind();
          this.initFunc();
        },
        clickBind:function(){
          var _this = this;
          $("#right_shop_cart").click(function(){
            _this.initdatapro();
          });
          $("#right_change_picCode").click(function(){
            _this.rush();
          });
          $("#right_submit").click(function(){
            _this.doSubOnRight();
          });
        },
        initFunc:function(){
          var _this = this;
          if(_this.userSessionExists == 'true'){
            $.ajax({
              type : "POST",
              url : _this.rightRcContextPath+"/queryOrder/queryOrderCount.htm",
              data : {
                loginid : $('#loginidright').val()
              },
              success : function(data) {
                if(null != data){
                  var json = eval('(' + data + ')');
                  var userspic = json.userSessons.pic;
                  $('#headpic').attr("class",userspic);
                  $('#accountid').html(json.loginIdright);
                  $('#state3').html(json.counts);
                  if(json.state0 != ""){
                    $('#state0').html(json.state0);
                  }
                  if(json.state1 != ""){
                    $('#state1').html(json.state1);
                  }
                  if(json.state2 != ""){
                    $('#state2').html(json.state2);
                  }
                }
              }
            });
            SiteBarsSH(1);
          }else{
            SiteBarsSH(0);
          }
          $.formValidator.initConfig({formID:"login_forms",debug:true,submitOnce:false,errorFocus:false,
            onError:function(msg){
            },
            onSuccess:function(){
              _this.doSubOnRight();
            }
          });

          //账号校验（EMail验证）
          $("#loginidright").formValidator({
            onShow:"",
            onFocus:"",onCorrect:""
          }).inputValidator({
            min:1, max:40,onError:"账号为手机或邮箱"
          }).regexValidator({
            regExp:"("+regexEnum.email+")|("+ regexEnum.mobile + ")" ,
            onError:"账号为手机或邮箱"
          });

          //密码验证
          $("#loginPwdright").formValidator({
            onShow: "",
            onFocus: "",
            onCorrect: ""
          }).regexValidator({
            regExp:"^.*$",
            onError:"密码错误"})
              .inputValidator({
                min:6,
                max : 20,
                onError: "请输入6-20位密码"
              });

          //验证码验证
          $("#validateCodeRight").formValidator({
            onShow:"",
            onFocus:"验证码不能为空",onCorrect:""
          }).inputValidator({
            min:1, max:4,empty:{leftEmpty:false,rightEmpty:false,emptyError:""},onError:"验证码不正确"
          });
        },
        delmsg:function(){
          $("#errormsgs").html("");
        },
        doSubOnRight:function(){
          var _this = this;
          var loginidright = $("#loginidright").val();
          var loginPwdright = $("#loginPwdright").val();
          var validateCodeRight = $("#validateCodeRight").val();
          var motion= $("#motion").attr("checked");
          $.post(_this.rightRcContextPath+'/auth/login.htm',{
            ajaxFlag:'true',
            loginid:loginidright,
            loginPwd:loginPwdright,
            validateCode:validateCodeRight,
            motion:motion
          }, function(data) {
            if (data.result!='OK') {
              $("#errss").html(data.errormsg);
              $("p#errps").show();
              if(data.needcodeFlag=='true'){
                $("#codeImge").click();
                $("#validatecoderightDiv").show();
                _this.valValidateCode();
              }
              _this.rush();
              $("#loginPwdright").val("");
              $("#validateCodeRight").val("");
            }else{
              location.reload();
              $("#errss").html("");
              $("p#errps").hide();
              window.location.reload();
            }
          }, 'json');
        },
        setempty:function(logpwd){
          if(logpwd=='pwd'){
            $("#loginPwdrightTip").text("");
          }
          $("#errss").text("");
          $("#errormsgs").val("");
          $("#errss").removeClass("onError");
        },
        checkValidateCode:function(value){
          var _this = this;
          if(value.length <4){
            return false;
          }
          if(value.length >4) {
            value=value.substr(0,4);
          }
          //     var validateCodeRight =$("#validateCodeRight").val(value);
          $.post(_this.rightRcContextPath+'/checkValidCode.htm',
              {
                code : value
              }, function(result) {
                if (result) {
                  $("#lvalidaterightTip").text("");
                  $("#vererrorright").removeClass("verify-error");
                  $("#lvalidaterightTip").removeClass("onError");
                  $("#vererrorright").addClass("verify-success");
                } else {
                  $("#vererrorright").removeClass("verify-success");
                  $("#vererrorright").addClass("verify-error");
                  $("#lvalidaterightTip").addClass("onError");
                  $("#lvalidaterightTip").text("验证码不正确");
                }
              }, 'json');
          if(event.keyCode == 13){
            _this.doSubOnRight();
          }
        },
        enter:function(){
          var _this = this;
          if(event.keyCode == 13){
            _this.doSubOnRight();
          }
        },
        checkLoginIdValidCode:function(){
          var loginidright =$("#loginidright").val();
          var _this = this;
          loginidright = $.trim(loginidright);
          if(loginid==''){
            return;
          }
          $.post(_this.rightRcContextPath+'/checkLoginIdValidCode.htm',{
            loginid : loginidright
          }, function(result) {
            if (result.result=='NO') {
              $("#validatecoderightDiv").show();
              _this.valValidateCode();
            }else{
              $("#validatecoderightDiv").hide();
              $("#validateCodeRight").unFormValidator(true); //解除校验
            }
          }, 'json');
        },
        valValidateCode:function(){
          //验证码验证
          $("#validateCodeRight").formValidator({
            onShow:"",
            onFocus:"验证码不能为空",onCorrect:""
          }).inputValidator({
            min:1, max:4,empty:{leftEmpty:false,rightEmpty:false,emptyError:""},onError:"验证码不正确"
          });
        },
        rush:function(){
          var _this = this;
          $("#xyimg").attr('src',_this.rightRcContextPath+"/validatecode/validatecode.htm?d="+Math.random());
        },
        initdatapro:function(){
          var _this = this;
          $.ajax({
            type : "POST",
            url : _this.rightRcContextPath+'/cart/getShopCart.htm?tool=tool&ran='+Math.random(),
            data : "",
            success : function(result) {
              $("#proDic").html(result);
            }
          });
        }
      });
      return right;
    }
)