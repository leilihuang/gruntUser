/**放大镜工具
 *img传的是原始图片的div   ID $对象
 * boxImg 传的是存放大图的div $对象
 * */
define(
    ['jQuery','lib/ui/class'],
    function($,Class){
        var glass=Class.create({
            setOptions:function(opt){
                var options={
                    img:null,
                    boxImg:null
                }
                $.extend(true,this,options,opt);
            }
        },{
            init:function(opt){
                this.setOptions(opt);
                this.bindEval();
                this.setWidth();
            },
            bindEval:function(){

            },
            setWidth:function(){
                var _this=this;
                if(this.img.length>0){
                    var boxi=this.img.find("img");
                    boxi.css("cursor","pointer");
                    var _w=0;
                    var _h=0;

                    var _top=this.img.offset().top;
                    var _left=this.img.offset().left;

                    if(this.img.offsetParent()){
                        _left+=this.img.offsetParent().offset().left;
                        _top+=this.img.offsetParent().offset().top;
                    }

                    var _move_x=0;
                    var _move_y=0;

                    var _val_w=this.boxImg.width()/2;
                    var _val_h=this.boxImg.height()/2;

                    boxi.mouseover(function(){
                        var html="<img src='"+boxi.attr("src")+"' style='position:absolute;' id='moveImg' />";
                        _this.boxImg.html(html);
                        _this.boxImg.show();
                        var time=setInterval(function(){
                            _w=$("#moveImg").width()/boxi.width();
                            _h=$("#moveImg").height()/boxi.height();
                            if(_w>0){
                                clearInterval(time);
                            }
                        },100);
                    });

                    boxi.mouseout(function () {
                        _this.boxImg.hide();
                    });

                    boxi.mousemove(function(e){
                        _move_x =0-Math.round((document.documentElement.scrollLeft+e.clientX-_left) * _w - _val_w);
                        _move_y =0-Math.round((document.documentElement.scrollTop+e.clientY-_top) * _h - _val_h);
                        $("#moveImg").css({"left":_move_x + "px ","top":_move_y + "px"});
                    });
                }
            }
        });
        return glass;
    }
)