import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isSignIn:0,
        token:'',
        useron:'123'
    },
    mutations:{
        changIsSignIn(state,n){
            state.isSignIn=n;
        },
        changUserOn(state,val){
            state.useron=val
        },//修改谁在线
        setToken(state,val){
            state.token=val
        }
    },
});