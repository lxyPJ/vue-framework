<template>
    <div class="modal-confirm-wrap">
        <div class="modal-confirm">
            <p class="modal-confirm-body">{{confirmCont}}</p>
            <div class="modal-confirm-footer">
                <div class="modal-confirm-btn" v-on:click="cancel">取消</div>
                <div class="modal-confirm-btn" v-on:click="confirm">确定</div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        data:function(){
            return {
                confirmCont:'印象麦品'
            }
        },
        methods:{
            cancel:function(){

            },
            confirm:function(){

            }
        }
    }
</script>

