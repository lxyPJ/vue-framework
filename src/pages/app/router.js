import Vue from "vue";
import store from "./store/index.js";
import VueRouter from "vue-router";
Vue.use(VueRouter);

if(window.location.hash == ''){
    window.location.hash = '/load-more-1';
}

//定义路由
const routes = [
    {
        path:'/load-more-1',
        component:resolve => {
            require.ensure([],() => {
                resolve(require("../../views/load-more-1/index.vue"));
            },"load-more-1");
        }
    },
    {
        path:'/load-more-2',
        component:resolve => {
            require.ensure([],() => {
                resolve(require("../../views/load-more-2/index.vue"));
            },"load-more-2");
        }
    },
    {
        path:'/load-more-3',
        component:resolve => {
            require.ensure([],() => {
                resolve(require("../../views/load-more-3/index.vue"));
            },"load-more-3");
        }
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

export default router;