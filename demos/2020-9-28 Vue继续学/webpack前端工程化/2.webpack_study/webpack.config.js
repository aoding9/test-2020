const path = require('path')

// 安装并引入html-webpack-plugin插件 (npm i vue-loader vue-template-compiler -D)
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 实例化html-webpack-plugin对象，该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包
const htmlPlugin = new HtmlWebpackPlugin({
  // 源文件
  template: './src/index.html',
  // 输出文件的名称
  filename: 'index.html',
})

// *导入vue-loader，并且将实例对象放到plugins插件数组中
// !注意，这次的引入路径不同了，是vue-loader/lib/plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // *编译模式
  // 开发模式
  mode: 'development',
  // 生产模式
  // mode: 'production',
  // *配置入口文件
  entry: path.join(__dirname, './src/index.js'),
  // *配置出口文件
  output: {
    // 输出文件的目录
    path: path.join(__dirname, './dist'),
    // 输出文件的名称
    filename: 'bundle.js',
  },
  // *把html-webpack-plugin等插件实例对象导出
  plugins: [htmlPlugin, new VueLoaderPlugin()],
  // *配置对象
  module: {
    // *配置规则，test后面是正则表达式，use后面是加载器数组，加载器有顺序，从右往左加载，依赖项要在前面
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      // url-loader后面的limit参数表示图片字节限制，如果图片小于这个值，图片会被转成base64格式，否则不会转
      { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=17000' },
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.vue$/, use: ['vue-loader'] },
    ],
  },
}

/* const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlguin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 编译模式
  mode: 'development', // development  production
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'), // 输出文件的存放路径
    filename: 'bundle.js' // 输出文件的名称
  },
  plugins: [htmlPlguin, new VueLoaderPlugin()],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/, use: 'url-loader?limit=16941' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}
 */
