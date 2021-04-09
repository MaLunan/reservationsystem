import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/index.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont/iconfont.css'
import axios from '@/utils/axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
