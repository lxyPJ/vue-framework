<template>
    <div class="page">
        <div class="scroll-body">
            <img :src="img" width="100%">
            <class-nav></class-nav>
            <div class="pro-list-wrap">
                <template v-for="pro of proList">
                    <class-pro :pro="pro"></class-pro>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import zepto from "zepto";
    //模块
    import AjaxRequest from "ajaxRequest";
    //组件
    import classNav from "./class-nav.vue";
    import classPro from "./class-pro.vue";

    import {imgUrl} from "constant";

    export default{
        components:{
            'class-nav':classNav,
            'class-pro':classPro
        },
        data:function(){
            return {
                img:'../images/soft-bread-banner.jpg',
                proList:[]
            }
        },
        computed:{
            goodsTypeId:function(){
                return this.$store.state.goodsType.types[3]['goodsTypeId'];
            }
        },
        created:function(){
            var self = this;
            self.$root.$refs.loading = true;
            AjaxRequest({
                type:"POST",
                url:"curest/cgr/query",
                data:{
                    goodsTypeId:self.goodsTypeId
                },
                callback:function(response){
                    if(response.retCode != 1) return;
                    var goodsList = response.data;
                    var len = goodsList.length;
                    for(let i=0; i<len; i++){
                        let pro = {
                            id:goodsList[i]['goodsId'],
                            url:imgUrl + goodsList[i]['gContent'],
                            price:goodsList[i]['gPrice']
                        }
                        self.proList.push(pro);
                    }
                },
                complete:function(){
                    self.$root.$refs.loading = false;
                }
            });
        }
    }
</script>