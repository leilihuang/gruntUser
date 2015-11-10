require(
    ['jQuery','service/login/login'],
    function($,Login){
        $(function(){
            new Login();
        });
    }
)