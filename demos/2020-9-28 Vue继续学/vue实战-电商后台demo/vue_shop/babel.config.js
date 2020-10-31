// 由于移除console插件是全局生效，为了避免开发阶段也生效，进行如下处理
// 先定义一个空数组，然后根据开发模式判断是否添加插件项
// 在下面全局plugins数组中，用展开运算符展开数组
const productionPlugins = []
if (process.env.NODE_ENV === 'production') {
  // 需要安装依赖插件babel-plugin-transform-remove-console
  productionPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],

    ...productionPlugins
  ]
}
