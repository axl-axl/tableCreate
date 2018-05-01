import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        arrayId:1
    },
    mutations:{
        addArrayId(state){
            state.arrayId++
        }
    }
})

export default store;