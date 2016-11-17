<template>
    <div class="radio-list-wrap">
        <template v-for="item of radioList">
            <rao :item="item" v-on:radio-click="radioClick"></rao>
        </template>
    </div>
</template>

<script>
    import Vue from "vue";
    import "extend";

    let rao = Vue.extend({
        template:'<div class="radio-box" v-on:click="handleClick"><i class="iconfont radio" :class="className"></i>'+
                 '<p class="radio-text">{{item.text}}</p></div>',
        data:function(){
            return {
                isChecked:false
            }
        },
        props:{
            item:{
                type:Object,
                required:true
            }
        },
        computed:{
            className:function(){
                var className = this.isChecked ? 'icon-radiobox' : 'icon-round';
                return {
                    'icon-roundcheckfill':this.isChecked,
                    'icon-round':!this.isChecked
                }
            }
        },
        methods:{
            handleClick:function(){
                this.isChecked = !this.isChecked;
                this.$emit('radio-click',this.item,this.isChecked);
            }
        }
    });

    export default{
        props:{
            radioList:{
                type:Array,
                required:true
                /*
                radioList: [
                    {
                        id: 0,
                        value: '0',
                        text: ''
                    }
                ]
                */
            }
        },
        data:function(){
            return {
                value:[]
            }
        },
        components:{
            'rao':rao
        },
        methods:{
            radioClick:function(item,b){
                if(b){
                    this.value.push(item.value);
                }else{
                    this.value.remove(item.id);
                }
                this.$emit('rao-change',this.value);
            }
        }
    }
</script>
