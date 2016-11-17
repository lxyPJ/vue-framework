<template>
    <a class="shopping-car-wrap" v-on:click="goShopping">
        <div class="car-box">
            <i class="iconfont car">&#xe501;</i>
        </div>
        <i class="num-icon">{{num}}</i>
        <h6 class="shopping-price">￥{{totalPrice}}</h6>
    </a>
</template>

<script>
    export default{
        computed:{
            totalPrice:function(){
                return this.$store.getters.totalPrice
            },
            num:function(){
                return this.$store.state.shopping.num;
            }
        },
        methods:{
            goShopping:function(){
                window.location.hash = 'shopping';
            }
        }
    }
</script>