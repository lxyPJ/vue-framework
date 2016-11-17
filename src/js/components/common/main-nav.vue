<template>
    <nav class="main-nav-wrap flex-box flex-around">
        <a href="#/home" class="main-nav-btn">首页</a>
        <a href="#/class" class="main-nav-btn">烘培</a>
        <a href="#/my" class="main-nav-btn">我的</a>
    </nav>
</template>

<script>
    import zepto from "zepto";

    export default{
        props:{
            index:{
                type:Number,
                required:true
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                $(".main-nav-wrap").find('a').eq(this.index).removeClass('main-nav-btn').addClass('main-nav-btn-active');
            });
        }
    }
</script>