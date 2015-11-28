define(
    ['jQuery','lib/ui/class'],
    function ($,Class) {
        var table=Class.create({
            setOptions: function (opt) {
                var options={
                    add:$('#add'),
                    search:$('#search'),
                    table:$('.table')
                }
                $.extend(true,this,options,opt);
            }
        },{
            init: function (opt) {
                this.setOptions(opt);
                this.bindEval(this);
            },
            bindEval:function(_this){
                this.add.on('click', function () {
                    var txt=$(this).prev().val();
                    if(txt!=''){
                        _this.addLoad(txt);
                    }
                    $(this).prev().val('');
                });
                this.search.on('click', function () {
                    var txt=$(this).prev().val();
                    _this.searchLoad(txt,_this);
                });
                $('.delete').each(function () {
                    $(this).on('click', function () {
                        _this.del(this,_this);
                    });
                });
                $('.edit').each(function () {
                    $(this).on('click', function () {
                        _this.editLoad($(this));
                    });
                })

            },
            addLoad: function (txt) {
                var html='<div class="box">' +
                    '<input class="txt" value="'+txt+'" readOnly=true>' +
                    '<div class="delete">删除</div>' +
                    '<div class="edit" name="edit">编辑</div>' +
                    '</div>';
                var _this=this;
                $(html).find('.delete').on('click', function () {
                    _this.del(this,_this);
                }).end().find('.edit').on('click', function () {
                    _this.editLoad($(this));
                }).end().appendTo($('.table'));
            },
            del: function ($this,_this) {
                var parent=$($this).parent();
                _this.deleLoad(parent);
            },
            editLoad: function ($this) {
                if($this.attr('name')=='edit'){
                    $this.prevAll('input').attr('readOnly',false);
                    $this.attr('name','save');
                    $this.text('保存');
                }else{
                    $this.prevAll('input').attr('readOnly',true);
                    $this.attr('name','edit');
                    $this.text('编辑');

                }
            },
            searchLoad: function (txt,_this) {
                _this.table.find('.txt').each(function () {
                    var val=$(this).text();
                    if(val.indexOf(txt)>-1){
                        $(this).parent().show();
                    }else{
                        $(this).parent().hide();
                    }
                })
            },
            deleLoad: function (parent) {
                parent.remove();
            }
        })
        return table;
    }
)