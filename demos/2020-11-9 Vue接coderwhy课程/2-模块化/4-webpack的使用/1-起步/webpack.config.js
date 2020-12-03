const path = require('path')
// 配置入口和出口
module.exports = {
  // 入口：可以是字符串、数组、对象
  entry: './src/main.js',
  // 出口：通常是对象，至少包含两个属性path和filename，其中path通常是绝对路径
  output: {
    // 为了获取绝对路径，引入path模块，path.resolve方法可以获取当前项目绝对路径并与参数拼接，从而拿到完整的绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
    // 在package,json里面添加映射，build:webpack，然后npm run build执行脚本 ，直接在命令行输参数使用的是全局安装的webpack，当需要使用到不同版本的webpack时，用script定义的脚本，可以优先使用局部安装的版本
    // npm i webpack@3.6.0 -D
  },
  // https://www.webpackjs.com/loaders/#样式  loader相关介绍
  // *npm install --save-dev css-loader配置loader对css/less/sass/图片等进行处理
  // css-loader负责解析和import加载css文件，style-loader负责将模块的导出作为样式添加到DOM中，需要先解析再添加，执行顺序是从右往左
  module: {
    rules: [
      {
        test: /\.css$/,
        // 此处有个坑，因为视频是安装的旧版webpack，导致loader报错，需要也安装低版本loader才行
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
