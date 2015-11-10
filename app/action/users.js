require(
    ['jQuery','service/user/users'],
    function($,User){
        $(function(){
            new User();
        });
    }
)