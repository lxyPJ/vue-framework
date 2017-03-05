import Vue from "vue";
import store from "./store/index.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

if(window.location.hash == ''){
    window.location.hash = '/loadMore';
}
//异步组件
const loadMore = resolve => {
    require.ensure([],() => {
        resolve(require("loadMore"));
    });
};
//定义路由
const routes = [
    {
        path:'/loadMore',
        component:loadMore
    }
];
const router = new VueRouter({
    routes
});
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

exports = module.exports = router;