require(
    ['jQuery','service/cart/cart'],
    function($,Cart){
        $(function(){
            new Cart();
        });
    }
)