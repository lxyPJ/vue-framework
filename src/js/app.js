require('babel-polyfill');
import Vue from "vue";
//路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
//组件
import solidBtn from "./components/common/solid-button.vue";
Vue.component('solid-button',solidBtn);
import pageLoading from "./components/common/page-loading.vue";
Vue.component('page-loading',pageLoading);
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
    data:{
        loading:false
    }
}).$mount("#view");

router.beforeEach((to,from,next) => {

    next();
});
router.afterEach(router => {

});
