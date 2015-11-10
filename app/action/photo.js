require(
    ['jQuery'],
    function ($) {
        var files=require('fs');
        files.readdir('../../img/photo/**/*.jpg', function (err, file) {
            if(err){

            }else{
                console.log(file);
            }
        })
    }
)