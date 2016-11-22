import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import { Toast } from 'mint-ui';

export default new Vuex.Store({
    state:{
        pageLoading:false
    },
    mutations:{
        pageLoading(state,payload){
            state.pageLoading = payload.pageLoading;
        }
    },
    actions:{

    },
    modules:{

    }
})
