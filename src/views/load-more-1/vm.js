import services from "./services.js";//组件私有的与服务端进行数据交互的模块

export default{
    mixins:[services],
    created(){
        this.getCityList();//从服务端获取数据
    },
    data(){
        return {
            loading:false,
            items:[]
        }
    },
    computed:{
        base(){
            return this.$store.state;//从前端数据层获取数据
        }
    },
    watch:{
        
    },
    methods:{
        //一些相应事件或者处理数据的函数
    },
    mounted(){
        
    }
}