?<template>
    <div class="sub-page">
        <div class="scroll-body">
            <mt-header title="加载更多">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <mt-loadmore ref="loadmore" :top-method="loadTop">
                <div>
                    <p :style="style" v-for="item of items">{{item.name}}</p>
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
                style:{
                    textAlign:'center'
                }
            }
        },
        methods:{
            loadTop:function(id){
                var data = Mock.mock({
                    "array|5-10": [
                        {
                            "name|+1": [
                                "福州",
                                "泉州",
                                "厦门",
                                "北京",
                                "上海",
                                "杭州",
                                "深圳"
                            ]
                        }
                    ]
                });
                this.items = data.array
                this.$refs.loadmore.onTopLoaded(id);
            }
        },
        created:function(){
            var data = Mock.mock({
                "array|5-10": [
                    {
                        "name|+1": [
                            "福州",
                            "泉州",
                            "厦门",
                            "北京",
                            "上海",
                            "杭州",
                            "深圳"
                        ]
                    }
                ]
            });
            this.items = data.array;
        }
    }
</script>