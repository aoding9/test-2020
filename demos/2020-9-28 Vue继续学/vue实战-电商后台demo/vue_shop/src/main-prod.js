import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 按需导入element-ui
// 由于elementui比较占体积，所以也使用cdn加载，做法是直接在骨架头部引入
// import './plugins/element.js'
// *导入全局样式
import './assets/css/global.css'
// *导入字体图标
import './assets/fonts/iconfont.css'

// 导入树形table插件
import TreeTable from 'vue-table-with-tree-grid'

// 由于样式表直接参与打包会导致体积很变大，为了优化，使用cdn，直接用link在public/index.html骨架文件中引入cdn的样式表
// // 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// // 导入富文本编辑器对应样式文件
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// // 导入ajax加载进度条插件nprogress插件
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// 导入axios
import axios from 'axios'
// 将axios挂载到Vue的原型上，这样每个组件都可以通过$http使用到axios
Vue.prototype.$http = axios
// 设置axios的请求基准地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 配置请求拦截器，发送请求附带token信息
axios.interceptors.request.use(config => {
  // *在request拦截器中展示进度条 用NProgress.start()
  NProgress.start()
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})

// *在响应拦截器中，隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

// 关闭生产模式的提示信息
Vue.config.productionTip = false

// 注册全局组件,必须在所有import后面，不然报错
Vue.component('tree-table', TreeTable)
// 将富文本编辑器注册为全局组件
Vue.use(VueQuillEditor)

// 日期格式化过滤器
// 这个是简化版的，用正则的更好点
Vue.filter('dateFormat', function(originVal) {
  const date = new Date(originVal)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date
    .getDate()
    .toString()
    .padStart(2, '0')
  const hh = date
    .getHours()
    .toString()
    .padStart(2, '0')
  const mm = date
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const ss = date
    .getSeconds()
    .toString()
    .padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  // 挂载router实例
  router,
  // 渲染函数，并挂载到#app上
  render: h => h(App)
}).$mount('#app')
