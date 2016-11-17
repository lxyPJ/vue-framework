<style>
    .modal-confirm{
        width: 270px;
    }
    .pay-success-icon{
        width: 54px; height:54px; line-height:50px;
        font-size:32px; color:#00b8a9; text-align:center;
        border:2px solid #00b8a9; border-radius:50%;
        margin:20px auto 12px;
    }
    .modal-confirm-body{
        color:#F08A5D !important;
        padding-top:0 !important;
    }
    .modal-confirm-btn{
        color:#666 !important;
    }
</style>

<template>
    <div class="modal-confirm-wrap">
        <div class="modal-confirm">
            <i class="iconfont pay-success-icon">&#xe648;</i>
            <p class="modal-confirm-body">订单已支付成功，我们马上发货哦！</p>
            <div class="modal-confirm-footer">
                <a class="modal-confirm-btn" v-on:click="checkOrder">查看订单</a>
                <a href="#/class" class="modal-confirm-btn" v-on:click="continue_go">继续逛逛</a>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        methods:{
            checkOrder:function(){
                window.location.hash = "my";
            },
            continue_go:function(){
                this.$parent.pay_success = false;
            }
        }
    }
</script>

