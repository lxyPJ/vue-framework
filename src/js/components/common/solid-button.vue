<template>
    <div class="btn-wrap">
        <button class="btn">{{text}}</button>
        <div class="btn-loading" :style="dsStyle">
            <div class="spinner">
                <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            text:{
                type:String,
                required:true
            }
        },
        data:function(){
            return {
                dsStyle:{
                    display:'none'
                }
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //按钮hover
                $(".btn").on('touchstart',function(){
                    $(this).addClass('btn-hover');
                }).on('touchend',function(){
                    $(this).removeClass('btn-hover');
                });
            });
        }
    }
</script>