define(
	['jQuery','lib/ui/class'],
	function($,Class){
		var menu=Class.create({
			setOptions:function(opt){
				var options={
					menuRcContextPath:$('#menu_rc_contextPath').val(),
					menuSpContextPath:$('#menu_sp_contextPath').val(),
					menuSpImgUrl:$('#menu_sp_imgUrl').val(),
					sTime:0,
					CONTEXT_PATH:$('#menu_sp_contextPath').val(),
					userSession:$('#right_user_session_exists').val()
				};
				$.extend(true,this,options,opt);
			}
		},{
			init:function(opt){
				this.setOptions(opt);
				this.initFunc();
				this.menuHover();
				this.sTab(".nav_cart",".nav_cart_sub");
			},
			initFunc:function(){
				_this = this;
				if(_this.userSession == 'true'){
					_this.mixShopCart();
				}else{
					_this.initdata();
				}
			},
			menuHover:function(){
				_this = this;
				$(".nav_sort").hover(
					function(){
						clearTimeout(_this.sTime);
						sTime=setTimeout(function(){
							$(".nav_sort_sub").show();
							$(".nav_sort i").addClass("down");
						},100);
					},
					function(){
						clearTimeout(_this.sTime);
						sTime=setTimeout(function(){
							$(".nav_sort_sub").hide();
							$(".nav_sort i").removeClass("down");
						},300);
					}
				);
			},
			sTab:function(p,s){
				var def;
				$(p).hover(
					function(){
						clearTimeout(def);
						def=setTimeout(function(){
							$(s).show();
						},100);
					},
					function(){
						clearTimeout(def);
						def=setTimeout(function(){
							$(s).hide();
						},300);
					}
				);
			},
			myCartBind:function(){
				var _this = this;
				$("#mycart").bind("hover", function(){
					_this.initdata();
				});
				$.ajax({url: _this.menuRcContextPath+"/headinfo.htm",cache:false,
					success: function(result) {
						$('#headInfoDiv').html(result);
					}
				});
			},
			initdata:function(){
				var _this = this;
				$.ajax({
					type : "POST",
					url : _this.menuRcContextPath+'/cart/getToolCart.htm?ran='+Math.random(),
					dataType:"json",
					data : "",
					success : function(result) {
						if(result.result){
							var list = result.info;
							var chkpro=0;
							var len = result.info.length;
							if(len>0){
								$("#tool_ul").html("");
								var sum  =0;
								for(var i=0;i<len;i++){
									var item = result.info[i];
									sum = sum+parseFloat(item.discountPrice*item.quantity);
									chkpro=chkpro+parseInt(item.quantity);
									var areaType=item.areaType;
									var iteminfo = '';
									if(areaType=='0'){
										iteminfo ='<li><a href="'+_this.menuRcContextPath+'/product/detail.htm?prCode='+item.prCode+'" target="_blank"><img width="60" height="60" src="'+_this.menuSpImgUrl+item.picUrl+'" width="48" height="48">'+item.product.name+'</a><i><strong>&yen;'+item.discountPrice+'</strong> x '+item.quantity+'</i></li>';
									}else{
										iteminfo ='<li><a href="'+_this.menuRcContextPath+'/product/exemption.htm?prCode='+item.prCode+'" target="_blank"><img width="60" height="60" src="'+_this.menuSpImgUrl+item.picUrl+'" width="48" height="48">'+item.product.name+'</a><i><strong>&yen;'+item.discountPrice+'</strong> x '+item.quantity+'</i></li>';
									}
									$("#tool_ul").append(iteminfo);
								}
								$("#empty_p").hide();
								$("#headercart_div").show();
								$("#size_span").html('(<i><em>'+chkpro+'</em></i>)');
								$("#sum_span").html(chkpro);
								sum=sum.toFixed(2);
								$("#totalamt_span").html(sum);
								$("#pronum").html(chkpro);
							}else{
								$("#size_span").html('');
								$("#empty_p").show();
								$("#headercart_div").hide();
								$("#num_span").hide();
							}
							_this.sTab(".nav_cart",".nav_cart_sub");
						}else{
							alert(result.errMsg);
						}
					}
				});
			},
			gettoolcart:function(){
				var _this = this;
				$(location).attr("href",_this.menuRcContextPath+"/cart/getShopCart.htm?ran="+Math.floor(Math.random()*10+1));
			},
			todetail:function(){
				var _this = this;
				var url = _this.CONTEXT_PATH+"/product/detail.htm?prCode="+prCode;
				window.location.href=url;
			},
			mixShopCart:function(){
				var _this = this;
				$.ajax({
					type : "POST",
					url : _this.menuRcContextPath+"/cart/mixShopCart.htm",
					success : function(result) {
						_this.initdata();
					}
				});
				_this.initdata();
			}
		});
		return menu;
	}
)
function sessionchk(){
	$.appAjax({
		type : "POST",
		calbackfc:'calbackfc()',
		dataType:'json',
		url : menuRcContextPath+"/sessionchk.htm",
		success : function(result) {
			calbackfc();
		}
	});
}