?<template>
    <div class="sub-page">
        <div class="scroll-body">
            <mt-header title="轮播图">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <mt-swipe :auto="4000">
                <template v-for="url of urls">
                    <mt-swipe-item>
                        <img :src="url" alt="" width="100%" />
                    </mt-swipe-item>
                </template>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Swipe, SwipeItem, Header, Button } from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Header.name, Header);
    Vue.component(Button.name, Button);

    export default{
        data:function(){
            return {
                urls:['../style/images/1.jpg','../style/images/2.jpg','../style/images/3.jpg']
            }
        }
    }
</script>