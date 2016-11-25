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
        <mt-header title="加载更多">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="mt-scroll-body">
            <mt-loadmore ref="loadmore" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
                <div>
                    <p class="item" v-for="item of items">{{item.name}}</p>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import Mock from "mockjs";
    import Vue from "vue";
    import { Loadmore, Header, Button } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    Vue.component(Header.name, Header);
    Vue.component(Button.name, Button);

    export default{
        data:function(){
            return {
                items:[],
                groupHeight:205,
                recordNo:0,
                allLoaded:false
            }
        },
        methods:{
            loadTop:function(id){
                var self = this;
                setTimeout(function(){
                    var items = [];
                    Mock.Random.city(true);
                    for(let i=0; i<self.recordNo; i++){
                        var data = Mock.mock({
                            array: [
                                {
                                    "name":'@city'
                                }
                            ]
                        });
                        items = items.concat(data.array);
                    }
                    self.items = items;
                    self.recordNo = items.length;
                    self.$refs.loadmore.onTopLoaded(id);
                },1000);
            },
            loadBottom:function(id){
                var self = this;
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
                    }else{
                        self.allLoaded = true;//若数据已全部获取完毕
                    }
                    self.$refs.loadmore.onBottomLoaded(id);
                },1000);
            }
        },
        mounted:function(){
            var self = this;
            self.$nextTick(function(){
                var initNo = Math.ceil($(".mt-scroll-body").height() / self.groupHeight) * 5;
                function fn(){
                    if(self.recordNo >= initNo) return;
                    self.loading = true;
                    Mock.Random.city(true);
                    var data = Mock.mock({
                        "array|5": [
                            {
                                "name":'@city'
                            }
                        ]
                    });
                    self.items = self.items.concat(data.array);
                    self.recordNo += 5;
                    self.loading = false;
                    fn();
                }
                fn();
            });
        }
    }
</script>