// *直接打开会报错，因为这是es6模块化语法，浏览器识别不出来，不兼容，需要进行转换
import $ from 'jquery'
// *webpack默认只处理js文件（es6语法也不处理），css、图片等其他文件需要用加载器协助处理
import './css/1.css'
import './css/1.less'
import './css/1.scss'
// *导入vue单文件组件，还要使用对应的加载器 npm i vue-loader vue-template-compiler -D
import './components/App-my.vue'

$(function() {
  $('li:odd').css('backgroundColor', 'red')
  $('li:even').css('backgroundColor', 'pink')
})
// *如何打包js高级语法
// *1.安装babel转换器相关包 npm i babel-loader @babel/core @babel/runtime -D
// *2.安装babel语法插件包 npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
// *3.在根目录创建babel配置文件babel.config.js并初始化基本配置
// *4.在webpack.config.js的rules数组中排除掉node_modules文件夹
class Person {
  // *es6 class static声明的静态属性或者方法不需要实例化也可以直接使用，适合不需要操作实例属性的时候
  static info = 'aaaaaa'
}

console.log(Person.info)

// *-------------------------------------------*
import Vue from 'vue'
// 导入单文件组件
import App from './components/App-my.vue'

// 实例化组件
const vm = new Vue({
  el: '#app',
  // 渲染App到id为app的区域
  render: h => h(App),
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
