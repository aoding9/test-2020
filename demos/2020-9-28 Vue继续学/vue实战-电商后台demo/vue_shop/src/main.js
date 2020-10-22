import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// *导入全局样式
import './assets/css/global.css'
// *导入字体图标
import './assets/fonts/iconfont.css'
// 导入树形table插件
import TreeTable from 'vue-table-with-tree-grid'
// 导入axios
import axios from 'axios'
// 将axios挂载到Vue的原型上，这样每个组件都可以通过$http使用到axios
Vue.prototype.$http = axios
// 设置axios的请求基准地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置请求拦截器，发送请求附带token信息
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})

// 关闭生产模式的提示信息
Vue.config.productionTip = false

// 注册全局组件
Vue.component('tree-table', TreeTable)

new Vue({
  // 挂载router实例
  router,
  // 渲染函数，并挂载到#app上
  render: h => h(App)
}).$mount('#app')
