// vue cli默认隐藏了webpack的配置文件，如果要修改相关配置，可以通过vue.config.js
module.exports = {
  // 可以通过chainWebpack或者configureWebpack来配置，作用相同，区别是用法不一样，一个是链式编程，一个是操作对象
  // 箭头函数接收config参数
  // when判断环境为开发模式还是生产模式，获取默认打包入口'app'，并将其值clear，然后add新的值'xxxxxx'
  chainWebpack: config => {
    // 生产模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      // 用externals配置cdn资源引入，打包时先判断window对象下是否已经存在，如果存在则不参与打包
      config.set('externals', {
        // !卧槽！！！这个地方我tm找了一天，，，，xxxxx！
        // Vue: 'Vue',import Vue from 'vue'
        // 这个地方属性是小写，值是大写   import Vue from 'vue'
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
        // 'element-ui': 'ELEMENT'
      })
      // 这个html插件指的就是html-webpack-plugin插件，可以动态生成html文件，貌似是模板语法
      // 具体看这里https://www.webpackjs.com/plugins/html-webpack-plugin/
      // 这里设置了一个参数isProd，根据他判断如何生成生产模式和开发模式的html
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  }
}
