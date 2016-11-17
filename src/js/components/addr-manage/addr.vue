<template>
    <div class="addr-wrap">
        <div class="addr-border-wrap">
            <div class="addr-info-box">
                <p class="addr-text">{{addr.contactPerson}} {{addr.contactPhone}}</p>
                <p class="addr-text">{{addr.address}}</p>
            </div>
            <div class="addr-btn-box">
                <a class="addr-btn" v-on:click="goEdit">编辑</a>
                <a class="addr-btn" v-on:click="del">删除</a>
            </div>
        </div>
    </div>
</template>

<script>
    import zepto from "zepto";
    //模块
    import AjaxRequest from "ajaxRequest";

    export default{
        props:{
            addr:{
                type:Object,
                required:true
            },
            index:{
                type:Number,
                required:true
            }
        },
        methods:{
            del:function(){
                var self = this;
                self.$root.loading = true;
                AjaxRequest({
                    type:"POST",
                    url:"rest/address/del",
                    data:{
                        addressIds:self.addr.addressId
                    },
                    callback:function(response){
                        if(response.retCode ==1){
                            self.$store.dispatch('reqAddr');
                        }else{
                            self.$store.commit('alert',{
                                str:response.msg,
                                show:true
                            });
                        }
                    },
                    complete:function(){
                        self.$root.loading = false;
                    }
                });
            },
            goEdit:function(){
                window.location.hash = 'addr/edit/' + this.index;
            }
        }
    }
</script>