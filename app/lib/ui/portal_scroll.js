/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
*/
(function( $ ){		 
 $.fn.scrollPagination = function(options) {
  	
		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = obj; 
	 	}
		opts.scrollTarget = target;
	 
		return this.each(function() {
		  $.fn.scrollPagination.init($(this), opts);
		});

  };
  $.fn.stopScrollPagination = function(){
	  return this.each(function() {
	 	$(this).attr('scrollPagination', 'disabled');
	  });
	  
  };
  $.fn.scrollPagination.loadContent = function(obj, opts){
	 var target = opts.scrollTarget;
	 if($(window).data("runTarget")){
		 obj = $(window).data("runTarget");
	 }
	 var mayLoadContent;
	 if( opts.contentPage.indexOf("today")>=0 ){
		 mayLoadContent = $(target).scrollTop()+opts.heightOffset+($('#bottom_side').offset().top-$('#hotPageContent').offset().top) >= $(document).height() - $(target).height();
	 }else{
		 mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(document).height() - $(target).height();
	 }	 
	 if (mayLoadContent){
		 $(obj).data("load",true);
		 if (opts.beforeLoad != null){
			opts.beforeLoad(); 
		 }
		 $(obj).children().attr('rel', 'loaded');
		 $.ajax({
			  type: 'POST',
			  url: opts.contentPage,
			  data: opts.contentData(),
			  success: function(data){
				if(data.indexOf("loginFlag_noauth")>-1){
					window.location.href =  opts.contentRoot+"/login.html?targetUrl="+opts.contentPage;
				}else{
					$(obj).append(data); 
					var objectsRendered = $(obj).children('[rel!=loaded]');
					if ($(objectsRendered[objectsRendered.length - 1]).hasClass('lastElem') || objectsRendered.length == 0) {
						//$(obj).stopScrollPagination();
						$(obj).data("end",true);
					}else{
						$(obj).data("end",false);
					}
					if (opts.afterLoad != null){
						opts.afterLoad(objectsRendered);	
					}
				}
				 $(obj).data("load",false);
			  },
			  dataType: 'html'
		 });
	 } 
  };
  $.fn.scrollPagination.init = function(obj, opts){
	 var target = opts.scrollTarget;
	 if(opts.targetAppend){
		obj = opts.targetAppend;
	 }
	 $(obj).attr('scrollPagination', 'enabled');
	 $(obj).data("end",false);
	 $(target).scroll(function(event){
		 if($(window).data("runTarget")){
			 obj = $(window).data("runTarget");
		 }
		if (!$(obj).data("end")&&!$(obj).data("load")){
	 		$.fn.scrollPagination.loadContent(obj, $.fn.scrollPagination.getOpts(obj));		
		}
		else {
			event.stopPropagation();	
		}
	 });
	 $.fn.loadData(obj);
 };
 //modify contentPage
 $.fn.setOpts = function(obj,opts){
	 if(opts.targetAppend){
		obj = opts.targetAppend;
		$(window).data("runTarget",opts.targetAppend);
	 }
	 $(obj).data("opts",opts);
 };
 $.fn.loadData = function(obj){
	 var opts = $.fn.scrollPagination.getOpts(obj);
	 if (opts.beforeLoad != null){
		opts.beforeLoad(); 
	 }
 	if(opts.targetAppend){
		obj = opts.targetAppend;
	}
	 $(obj).children().attr('rel', 'loaded');
	 if(opts.contentData().pageNo > 1){
		 $.ajax({
			  type: 'POST',
			  url: opts.contentPage,
			  data: opts.contentData(),
			  success: function(data){
				$(obj).append(data);
				var objectsRendered = $(obj).children('[rel!=loaded]');
				if ($(objectsRendered[objectsRendered.length - 1]).hasClass('lastElem') || objectsRendered.length == 0) {
					$(obj).data("end",true);
				}else{
					$(obj).data("end",false);
				}
				if (opts.afterLoad != null){
					opts.afterLoad(objectsRendered);	
				}
			  },
			  dataType: 'html'
		 });
	 }

 };
 //get current contentPage
 $.fn.scrollPagination.getOpts = function(obj){
	var opts = $(obj).data("opts");
	if(typeof opts != "undefined"){
		opts = $.extend($.fn.scrollPagination.defaults, opts);
	}else{
		opts = $.fn.scrollPagination.defaults;
	}
	return opts;
 };
 $.fn.scrollPagination.defaults = {
      	 'contentPage' : null,
     	 'contentData' : {},
		 'beforeLoad': null,
		 'afterLoad': null	,
		 'scrollTarget': null,
		 'heightOffset': 0		  
 };	
})( jQuery );