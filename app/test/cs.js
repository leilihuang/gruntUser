$(function(){
    $("#������ť��ID").on("click",function(){
        var val=$("input���ID").val();
        $.ajax({
            url:"",//��̨�ṩ�����Ľӿ�
            type:"GET",
            data:{val:val},
            success:function(data){ //data�Ǻ�̨����ǰ̨����ȥ��ֵ�õ�������
                //Ȼ�����ݶ�̬չ�ֳ���������
            }
        });
    })
})