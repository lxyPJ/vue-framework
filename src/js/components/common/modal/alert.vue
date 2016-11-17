<template>
    <div class="modal-alert-wrap" v-if="show">
        <div class="modal-alert">
            <p class="modal-alert-body" :style="textAlign">{{str}}</p>
            <div class="modal-alert-footer" v-on:click="close">确定</div>
        </div>
    </div>
</template>

<script>
    import zepto from "zepto";

    export default{
        data:function(){
            return {
                textAlign:{
                    textAlign:'left'
                }
            }
        },
        computed:{
            str:function(){
                return this.$store.state.modal.alert.str;
            },
            show:function(){
                return this.$store.state.modal.alert.show;
            }
        },
        methods:{
            close:function(){
                this.$store.commit('closeAlert',{
                    str:'',
                    show:false
                });
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                if($(".modal-alert-body").height() > 62){
                    this.textAlign = {
                        textAlign:'left'
                    };
                }
            });
        }
    }
</script>
