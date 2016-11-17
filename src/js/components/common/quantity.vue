<template>
    <div class="quantity-wrap">
        <i class="iconfont quantity-rduce" v-on:click="reduce">&#xe610;</i>
        <p class="quantity-num">{{goodsNum}}</p>
        <i class="iconfont quantity-plus" v-on:click="plus">&#xe611;</i>
    </div>
</template>

<script>
    export default{
        props:{
            num:{
                type:Number,
                required:true
            }
        },
        data:function(){
            return {
                goodsNum:this.num
            }
        },
        methods:{
            reduce:function(){
                if(this.goodsNum <= 0) return;
                this.goodsNum -= 1;
                this.$emit('reduce',this.goodsNum);
            },
            plus:function(){
                this.goodsNum += 1;
                this.$emit('plus',this.goodsNum);
            }
        }
    }
</script>