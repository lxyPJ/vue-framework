require('babel-polyfill');
import Vue from "vue";
//状态容器
import store from "./store";
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
const loadMore = resolve => {
    require.ensure([],() => {
        resolve(require('./example/load-more.vue'));
    })
};
//定义路由
const routes = [
    {
        path:'/swipe',
        component:swipe
    },
    {
        path:'/loadMore',
        component:loadMore
    }
];
const router = new VueRouter({
    routes
});

const app = new Vue({
    router,
    store
}).$mount("#view");

router.beforeEach((to,from,next) => {
    store.commit('pageLoading',{
        pageLoading:true
    });
    next();
});
router.afterEach(router => {
    store.commit('pageLoading',{
        pageLoading:false
    });
});
