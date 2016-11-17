require('babel-polyfill');
import Vue from "vue";
//路由
import VueRouter from "vue-router";
Vue.use(VueRouter);
//mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

//swipe
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

const app = new Vue({

}).$mount("#view");
