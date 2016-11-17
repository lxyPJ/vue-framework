<template>
    <div id="iSlider-wrapper" class="iSlider-wrapper">
        <div class="banner-round-wrap">
            <i class="banner-round"></i>
            <i class="banner-round-hollow"></i>
            <i class="banner-round-hollow"></i>
        </div>
    </div>
</template>

<script>
    import zepto from "zepto";
    import Islider from 'islider.js';

    export default{
        mounted:function(){
            this.$nextTick(function(){
                var list = [
                    {content:'../images/1.jpg'},
                    {content:'../images/2.jpg'},
                    {content:'../images/3.jpg'}
                ];

                //初始化一个iSlider
                var islider = new Islider(document.getElementById('iSlider-wrapper'),list,{
                    isAutoplay:1,
                    duration:6000,
                    isLooping:1,
                    isOverspread:1
                });
                islider.on('slideChange', slideCb);
                function slideCb(Number, HTMLElement) {
                    $(".banner-round-wrap i").removeClass('banner-round').addClass('banner-round-hollow');
                    $(".banner-round-wrap i").eq(Number).removeClass('banner-round-hollow').addClass('banner-round');
                }
            });
        }
    }
</script>