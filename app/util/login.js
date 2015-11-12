define(
    ['jQuery','lib/ui/class'],
    function ($,Class) {
        var login=Class.create({
            setOptions: function (opt) {
                var options={
                    zh:$("#name"),
                    password:$("#password"),
                    up:$("#login")
                }
                $.extend(true,this,options,opt);
            }
        },{
            init: function (opts) {
                this.setOptions(opts);
                this.bindEval(this);
            },
            bindEval: function (_this) {
                this.up.on("click",function(){
                    var name=_this.zh.val(),
                        password=_this.password.val();
                    _this.loginUp(_this,name,password, function (states,date) {
                        if(states==0){
                            window.location.href=date.data.url;
                        }else{
                            alert(date.message);
                        }
                    });
                })
            },
            /**
             * 0 表示成功
             * 1 表示失败
             * */
            loginUp: function (_this,_name,_password,callback) {
                $.ajax({
                    url:"../app/test/json/test.json",
                    type:'POST',
                    dataType:"json",
                    data:{name:_name,password:_password},
                    success: function (date) {
                        if(date.data.name==_name && date.data.password== _password){
                            callback(0,date);
                        }else{
                            callback(1,date);
                        }
                    }
                })
            }
        });
        return login;
    }
)