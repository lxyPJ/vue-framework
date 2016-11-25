<style>
    .sub-page{
        overflow: hidden !important;
    }
    .item{
        width: 100%; line-height:40px;
        font-size:16px; color:#333; text-align:center;
        background-color: #efeff4;
        border-bottom:1px solid #e8e8e8;
    }
</style>

<template>
    <div class="sub-page">
        <mt-header title="无限滚动">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="mt-scroll-body">
            <ul class="infinite-box"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li class="item" v-for="item of items">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Mock from "mockjs";
    import Vue from "vue";
    import { InfiniteScroll, Header, Button } from 'mint-ui';
    Vue.use(InfiniteScroll);
    Vue.component(Header.name, Header);
    Vue.component(Button.name, Button);

    import zepto from "zepto";

    export default{
        data:function(){
            return {
                items:[],
                recordNo:0,
                loading:false,
                groupHeight:205
            }
        },
        methods:{
            loadMore:function(){
                var self = this;
                var initNo = Math.ceil($(".mt-scroll-body").height() / self.groupHeight) * 5;
                self.loading = true;
                setTimeout(function(){
                    Mock.Random.city(true);
                    var data = Mock.mock({
                        "array|5": [
                            {
                                "name":'@city'
                            }
                        ]
                    });
                    if(self.recordNo < 35){
                        self.items = self.items.concat(data.array);
                        self.recordNo += 5;
                        if(self.recordNo < initNo){
                            self.loadMore();
                        }
                    }
                    self.loading = false;
                },1000);
            }
        }
    }
</script>