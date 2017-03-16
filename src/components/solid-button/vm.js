export default{
    props:{
        text:{
            type:String,
            required:true
        }
    },
    data:function(){
        return {
            dsStyle:{
                display:'none'
            }
        }
    },
    mounted:function(){
        this.$nextTick(function(){
            //按钮hover
            $(".btn").on('touchstart',function(){
                $(this).addClass('btn-hover');
            }).on('touchend',function(){
                $(this).removeClass('btn-hover');
            });
        });
    }
}