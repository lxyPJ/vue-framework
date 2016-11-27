require("babel-polyfill");
import Vue from "vue";
//状态容器
import store from "./store";
//路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
//mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI);
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
const infinite = resolve => {
    require.ensure([],() => {
        resolve(require('./example/infinite.vue'));
    })
};
const lazyLoad = resolve => {
    require.ensure([],() => {
        resolve(require('./example/lazy-load.vue'));
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
    },
    {
        path:'/infinite',
        component:infinite
    },
    {
        path:'/lazyload',
        component:lazyLoad
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

/*{
    presets:['es2015','stage-2'],
    plugins: [
        'transform-runtime',
        ["component",[{
                "libraryName": "mint-ui",
                "style": true
            }]
        ]
    ]
}*/
