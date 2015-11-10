$(function(){
    $("#搜索按钮的ID").on("click",function(){
        var val=$("input框的ID").val();
        $.ajax({
            url:"",//后台提供搜索的接口
            type:"GET",
            data:{val:val},
            success:function(data){ //data是后台根据前台传过去的值得到的数据
                //然后将数据动态展现出来就完了
            }
        });
    })
})