<template>
    <div class="class-pro-wrap" v-on:click="open">
        <img :src="pro.url" width="100%" />
        <div class="shopping-wrap" v-on:click.stop>
            <h6 class="shopping-price">￥{{pro.price | priceFn}}</h6>
            <quantity ref="quantity" :num="goodsNum" v-on:reduce="reduce" v-on:plus="plus"></quantity>
        </div>
        <transition name="slide-fade">
            <div class="class-pro-mask flex-box flex-middle" v-if="showMask">
                <ul class="material-list">
                    <li class="material">原料1</li>
                    <li class="material">原料2</li>
                    <li class="material">原料3</li>
                    <li class="material">原料4</li>
                    <li class="material">原料5</li>
                    </ul>
                <a :href="href" class="btn class-pro-btn" v-on:click.stop>查看详情 >></a>
                </div>
            </transition>
        </div>
</template>

<script>
    import Vue from "vue";
    import zepto from "zepto";
    //模块
    import utils from "utils";
    import AjaxRequest from "ajaxRequest";
    //组件
    import quantity from "../common/quantity.vue";

    //过滤器
    Vue.filter('priceFn',function(val){
        return utils.payHandler(val);
    });

    export default{
        components:{
            'quantity':quantity
        },
        props:{
            pro:{
                type:Object,
                required:true
            }
        },
        data:function(){
            return {
                showMask:false,
                goodsNum:0,
                shoppingCartId:null
            }
        },
        computed:{
            href:function(){
                return '#/class/product/' + this.pro.id + '?root=class';
            }
        },
        methods:{
            open:function(){
                this.showMask = !this.showMask;
            },
            reduce:function(n){
                var self = this;
                if(n > 0){
                    AjaxRequest({
                        type:"POST",
                        url:"curest/cscr/edit",
                        data:{
                            shoppingCartId:self.shoppingCartId,
                            userId:self.$store.state.userId,
                            goodsId:self.pro.id,
                            goodsNum:n,
                        },
                        callback:function(response){
                            if(response.retCode == 1){
                                self.$store.dispatch('reqShoppingProList');
                                self.goodsNum -= 1;
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
                    AjaxRequest({
                        type:"POST",
                        url:"curest/cscr/del",
                        data:{
                            shoppingCartIds:self.shoppingCartId
                        },
                        callback:function(response){
                            if(response.retCode == 1){
                                self.$store.dispatch('reqShoppingProList');
                                self.goodsNum = 0;
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
                }
            },
            plus:function(n){
                var preNum = this.goodsNum;
                var self = this;
                self.$root.loading = true;
                if(preNum == 0){
                    AjaxRequest({
                        type:"POST",
                        url:"curest/cscr/add",
                        data:{
                            userId:self.$store.state.user.userId,
                            goodsId:self.pro.id,
                            goodsNum:n,
                            lastTime:new Date().getTime()
                        },
                        callback:function(response){
                            if(response.retCode == 1){
                                self.$store.dispatch('reqShoppingProList');
                                self.goodsNum += 1;
                                self.shoppingCartId = response.retObj;
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
                }else{
                    AjaxRequest({
                        type:"POST",
                        url:"curest/cscr/edit",
                        data:{
                            shoppingCartId:self.shoppingCartId,
                            userId:self.$store.state.user.userId,
                            goodsId:self.pro.id,
                            goodsNum:n,
                        },
                        callback:function(response){
                            if(response.retCode == 1){
                                self.$store.dispatch('reqShoppingProList');
                                self.goodsNum += 1;
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
    }
</script>