import Vue from "vue";
import validator from "validator";
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//生成mock数据
import Mock from "mockjs";

export default{
    data(){
        return {
            items:[],
            groupHeight:205,
            recordNo:0,
            allLoaded:false
        }
    },
    methods:{
        loadTop(id){
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
        loadBottom(id){
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
    mounted(){
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