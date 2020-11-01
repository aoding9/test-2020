// *babel介绍 https://blog.csdn.net/zz_jesse/article/details/102665872

// 由于移除console插件是全局生效，为了避免开发阶段也生效，进行如下处理
// 先定义一个空数组，然后根据开发模式判断是否添加插件项
// 在下面全局plugins数组中，用展开运算符展开数组
const productionPlugins = []
if (process.env.NODE_ENV === 'production') {
  // 移除console.log，需要安装依赖插件babel-plugin-transform-remove-console
  productionPlugins.push('transform-remove-console')
}

module.exports = {
  // 可以同时使用多个Plugin和Preset，此时，它们的执行顺序非常重要。
  //   1.先执行完所有Plugin，再执行Preset。
  //   2.多个Plugin，按照声明次序顺序执行。
  //   3.多个Preset，按照声明次序逆序执行。
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    // 插件执行
    // babel-plugin-component element-ui按需引入
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 生成模式的插件数组
    ...productionPlugins,
    // @babel/plugin-syntax-dynamic-import路由懒加载插件
    '@babel/plugin-syntax-dynamic-import'
  ]
}
