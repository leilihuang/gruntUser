/**
 * Created by leilihuang on 15/7/3.
 */
(function(){
    var obj = document.getElementById('requirejs'),
        baseJsUrl =obj&& obj.getAttribute('data-url')?obj.getAttribute('data-url') : '/',
        slot = baseJsUrl.match(/[a-zA-Z]\d/),
        isDebug = 0;
    //获取js路径


    if(slot && slot.length>0){
        slot =  slot[0];
        baseJsUrl = baseJsUrl.match(/http:\/\/[\w\.]*\//)[0];
    }

    function getBaseJsUrl(url){
        return baseJsUrl+url;
        //return "http://s.zzt.tm/portal-static/js/"+url;
    }

    var config = {
        paths: {
            jQuery: [
                getBaseJsUrl('jquery-1.8.3.min')
            ],
            jqzoom: [
                getBaseJsUrl('jQuery.jqzoom')
            ],
            layout: [
                getBaseJsUrl('jquery.lazyload')
            ],
            scrolls: [
                getBaseJsUrl('portal_scroll')
            ]
        },
        shim: {
            jQuery: {
                deps: [],
                exports: '$'
            },
            layout: {
                deps: ['jQuery'],
                exports: 'Layout'
            },
            jqzoom: {
                deps: ['jQuery'],
                exports: 'jqzoom'
            },
            scrolls: {
                deps: ['jQuery'],
                exports: 'scrolls'
            }
        }
    };

    require.config(config);
})();