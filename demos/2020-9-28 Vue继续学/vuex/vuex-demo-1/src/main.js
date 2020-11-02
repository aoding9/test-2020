import Vue from 'vue'
import App from './App.vue'
// *导入并挂载到VUe实例上
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
