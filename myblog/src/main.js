import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'

/*全局配置axios*/
axios.defaults.baseURL = 'https://vue-blog-7e4bf-default-rtdb.firebaseio.com/';

// Vue.use(VueRouter);
Vue.use(ElementUi);
// Vue.use(VueResource);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
