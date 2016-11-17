<template>
    <a :href="href" class="shopping-pro-wrap">
        <div class="pro-img">
            <div class="default-img">
                <i class="iconfont default-img-icon">&#xe633;</i>
            </div>
        </div>
        <div class="pro-text flex-box flex-col-1 flex-justify">
            <p class="pro-name">{{order.orderId}}</p>
            <p class="pro-price">￥{{order.pay | priceFn}}</p>
        </div>
        <p class="state">{{order.orderStatus | statusFn}}</p>
    </a>
</template>

<script>
    import Vue from "vue";
    //模块
    import utils from "utils";

    //过滤器
    Vue.filter('priceFn',function(val){
        return utils.payHandler(val);
    });
    Vue.filter('statusFn',function(val){
        var statusText = {
            1:'待发货',
            2:'已发货',
            3:'配送中',
            4:'已送达',
            5:'待商家确认订单',
            6:'商家取消订单',
            7:'关闭'
        }
        return statusText[val]
    });

    export default{
        props:{
            order:{
                type:Object,
                required:true
            },
            orderId:{
                type:Number,
                required:true
            }
        },
        computed:{
            href:function(){
                return "#/my/order/" + this.orderId;
            }
        }
    }
</script>