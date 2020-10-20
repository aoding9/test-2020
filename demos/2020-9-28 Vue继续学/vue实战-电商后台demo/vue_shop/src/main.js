import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// *导入全局样式
import './assets/css/global.css'
// *导入字体图标
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 将axios挂载到Vue的原型上，这样每个组件都可以通过$http使用到axios
Vue.prototype.$http = axios
// 设置axios的请求基准地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 关闭生产模式的提示信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
