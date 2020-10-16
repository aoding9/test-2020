// *直接打开会报错，因为这是es6模块化语法，浏览器识别不出来，不兼容，需要进行转换
import $ from 'jquery'

$(function () {
  $('li:odd').css('backgroundColor', 'red')
  $('li:even').css('backgroundColor', 'green')
})

/* import $ from 'jquery'
import './css/1.css'
import './css/1.less'
import './css/1.scss'

$(function() {
  $('li:odd').css('backgroundColor', 'blue')
  $('li:even').css('backgroundColor', 'lightblue')
})

class Person {
  static info = 'aaa'
}

console.log(Person.info)

// -----------------------------------------------
import Vue from 'vue'
// 导入单文件组件
import App from './components/App.vue'

const vm = new Vue({
  el: '#app',
  render: h => h(App)
})
 */
