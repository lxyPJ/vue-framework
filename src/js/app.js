require('babel-polyfill');
import Vue from "vue";
//mint-ui
import 'mint-ui/lib/style.css';
//路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
//组件
import {Button} from "mint-ui";
Vue.component(Button.name,Button);
const swipe = resolve => {
    require.ensure([],() => {
        resolve(require('./example/swipe.vue'));
    })
};
//定义路由
const routes = [
    {
        path:'/swipe',
        component:swipe
    }
];
const router = new VueRouter({
    routes
});

const app = new Vue({
    router,
    methods:{
        goSwipe(){
            window.location.hash = "swipe";
        }
    }
}).$mount("#view");
