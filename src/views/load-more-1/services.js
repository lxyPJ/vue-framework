//生成mock数据
import Mock from "mockjs";

export default {
    methods:{
        getCityList(){
            setTimeout(function(){
                var items = [];
                Mock.Random.city(true);
                for(let i=0; i<20; i++){
                    var data = Mock.mock({
                        array: [
                            {
                                "name":'@city'
                            }
                        ]
                    });
                    items = items.concat(data.array);
                }
                this.items = items;
            }.bind(this),500);
        }
    }
};