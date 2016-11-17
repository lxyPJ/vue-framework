<template>
    <ul class="class-nav-wrap">
        <li class="class-nav"></li>
        <li class="class-nav"></li>
        <li class="class-nav"></li>
        <li class="class-nav"></li>
    </ul>
</template>

<script>
    import zepto from "zepto";

    export default{
        mounted:function(){
            var self = this;
            self.$nextTick(function(){
                $(".class-nav").on('click',function(){
                    var idx = $(this).index();
                    var viewJson = {
                        0:'soft-bread',
                        1:'toast',
                        2:'mini-bread',
                        3:'drinks'
                    };
                    self.$parent.$parent.currentView = viewJson[idx];
                });
            });
        }
    }
</script>