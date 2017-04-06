import Vue from "vue";
import store from "./store/index.js";
import router from "./router.js";

//pages公用组件
import solidBtn from "solidBtn";
Vue.component('solid-button',solidBtn);
import pageLoading from "pageLoading";
Vue.component('page-loading',pageLoading);
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//根实例
const app = new Vue({
    router,
    store
}).$mount("#view");
