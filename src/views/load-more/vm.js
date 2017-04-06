import services from "./services.js";

export default{
    mixins:[services],
    created(){
        this.getCityList();
    },
    props:{},
    data(){
        return {
            items:[]
        }
    },
    computed:{
        base(){
            return this.$store.state;
        }
    },
    mounted(){
        console.log("组件挂载完成");
    }
}