<style scoped>
    .lazy-img{
        width: 100%; height:4.49275362rem;
    }
    .lazy-img img{
        width: 100%; height:100%;
    }
    image[lazy=loading]{
        width: 40px; height:100%;
        margin: auto;
    }
</style>

<template>
    <div id="lazycontr" class="sub-page">
        <div class="scroll-body">
            <mt-header title="图片懒加载">
                <router-link to="/" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
            </mt-header>
            <ul>
                <li class="lazy-img" v-for="src of list">
                    <img v-lazy.lazycontr="src" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { Lazyload, Header, Button } from "mint-ui";
    Vue.use(Lazyload);
    Vue.component(Header.name, Header);
    Vue.component(Button.name, Button);

    export default {
        data:function(){
            return {
                list:[
                    '../style/images/lazy-1.jpg','../style/images/lazy-2.jpg','../style/images/lazy-3.jpg',
                    '../style/images/lazy-4.jpg','../style/images/lazy-5.jpg','../style/images/lazy-6.jpg',
                    '../style/images/lazy-7.jpg','../style/images/lazy-8.jpg','../style/images/lazy-9.jpg',
                    '../style/images/lazy-10.jpg'
                ]
            }
        }
    }
</script>