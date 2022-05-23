import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import mzToast from './base/mz-toast/index'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false
Vue.use(mzToast)
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('./assets/img/default.png')
})
new Vue({
  router,
  store,
  render: h => h(App) //引入了App组件
}).$mount('#app')
