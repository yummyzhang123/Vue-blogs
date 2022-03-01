import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import store from './store/index'
import Cookie from 'js-cookie'
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
//请求拦截
axios.interceptors.request.use(
      config => {
      if (store.state.token) {
        // 将token设置在headers ['Authorization'] 上面 ，Bearer token 格式
        config.headers['Authorization'] = `Bearer ${store.state.token}`
        }
      return config
      })

/*全局配置axios*/
Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
Vue.use(ElementUi);

//设置全局路由守卫 保存token到vuex
router.beforeEach((to, from, next) => {
  store.commit('setToken',Cookie.get('token'))
  if (store.state.token) {
    store.commit('changIsSignIn',1)
    next()
  }
  else{
    next({path:'/login'})
  }
 
})
new Vue({
  router,

  el: '#app',
  render: h => h(App)
});
