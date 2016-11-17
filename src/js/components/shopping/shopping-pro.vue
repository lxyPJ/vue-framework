<template>
    <div class="shopping-pro-wrap">
        <radio ref="radio" :radio-list="radioList" v-on:rao-change="radioChange"></radio>
        <div class="pro-img">
            <img :src="src" width="100%" />
        </div>
        <div class="pro-text flex-box flex-col-1 flex-justify">
            <p class="pro-name">{{pro.gTitle}}</p>
            <p class="pro-price">{{pro.subTotal | priceFn}}</p>
        </div>
        <quantity ref="quantity" :num="goodsNum" v-on:reduce="reduce" v-on:plus="plus"></quantity>
    </div>
</template>

<script>
    import Vue from "vue";
    import zepto from "zepto";
    //模块
    import utils from "utils";
    import AjaxRequest from "ajaxRequest";
    //组件
    import radio from "../common/radio.vue";
    import quantity from "../common/quantity.vue";

    import {imgUrl} from "../../constant";

    //过滤器
    Vue.filter('priceFn',function(val){
        return utils.payHandler(val);
    });

    export default{
        components:{
            'radio':radio,
            'quantity':quantity
        },
        props:{
            pro:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            }
        },
        data:function(){
            return {
                radioList:[
                    {
                        id:0,
                        value:'0',
                        text:''
                    }
                ]
            }
        },
        computed:{
            src:function(){
                return imgUrl + this.pro.picUrl;
            },
            //是否选中
            checked:function(){
                return this.$store.state.shopping.checkedList[this.pro.shoppingCartId].checked;
            },
            goodsNum:function(){
                return this.$store.state.shopping.checkedList[this.pro.shoppingCartId].item.goodsNum;
            }
        },
        watch:{
            checked:function(val,oldVal){
                if(val){
                    this.$refs.radio.value = [0];
                    this.$refs.radio.$children[0].isChecked = true;
                }else if(!val){
                    this.$refs.radio.value = [];
                    this.$refs.radio.$children[0].isChecked = false;
                }
            },
            goodsNum:function(val){
                this.$refs.quantity.goodsNum = val;
            }
        },
        methods:{
            radioChange:function(val){
                var checked;
                if(val.length == 1){
                    checked = true;
                }else{
                    checked = false;
                }
                this.$emit('check',checked,this.pro);
            },
            reduce:function(n){
                var self = this;
                if(n > 0) {
                    self.$root.loading = true;
                    AjaxRequest({
                        type:"POST",
                        url:"curest/cscr/edit",
                        data:{
                            shoppingCartId:self.pro.shoppingCartId,
                            userId:self.$store.state.user.userId,
                            goodsId:self.pro.goodsId,
                            goodsNum:n,
                        },
                        callback:function(response){
                            if(response.retCode == 1){
                                self.$store.dispatch('reqShoppingProList');
                            }else{
                                self.$store.commit('alert',{
                                    str:response.msg,
                                    show:true
                                });
                                self.$refs.quantity.goodsNum += 1;
                            }
                        },
                        complete:function(){
                            self.$root.loading = false;
                        }
                    });
                }else{
                    self.$refs.quantity.goodsNum += 1;
                    /*AjaxRequest({
                        type:"POST",
                        url:"curest/cscr/del",
                        data:{
                            shoppingCartIds:self.pro.shoppingCartId
                        },
                        callback:function(response){
                            if(response.retCode == 1){
                                self.$store.dispatch('reqShoppingProList');
                            }else{
                                self.$store.commit('alert',{
                                    str:response.msg,
                                    show:true
                                });
                            }
                        },
                        complete:function(){
                            self.$root.loading = false;
                        }
                    });*/
                }
            },
            plus:function(n){
                var self = this;
                self.$root.loading = true;
                AjaxRequest({
                    type:"POST",
                    url:"curest/cscr/edit",
                    data:{
                        shoppingCartId:self.pro.shoppingCartId,
                        userId:self.$store.state.user.userId,
                        goodsId:self.pro.goodsId,
                        goodsNum:n,
                    },
                    callback:function(response){
                        if(response.retCode == 1){
                            self.$store.dispatch('reqShoppingProList');
                        }else{
                            self.$store.commit('alert',{
                                str:response.msg,
                                show:true
                            });
                            self.$refs.quantity.goodsNum -= 1;
                        }
                    },
                    complete:function(){
                        self.$root.loading = false;
                    }
                });
            }
        }
    }
</script>