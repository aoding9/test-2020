// 引入html模块
const http = require('http');
// 引入模板引擎
const template = require('art-template');
// 引入path模块
const path = require('path');
// 引入静态资源访问模块
const serveStatic = require('serve-static');
// 引入时间格式化模块
const dateFormat = require('dateformat');
// 引入自定义的router模块
const router = require('./route/router');
// 配置静态资源访问服务
const serve = serveStatic(path.join(__dirname, 'public'));
// 连接数据库
require('./module/connect');

// 模板默认路径
template.defaults.root = path.join(__dirname, 'views');
// 模板后缀
template.defaults.extname = '.art';
// 导入模板变量 处理日期格式
template.defaults.imports.dateFormat = dateFormat;

// 创建网站服务器
const app = http.createServer();
// 注册请求事件
app.on('request', (req, res) => {
  // 启用路由 第三个参数必填，可以填空的函数
  router(req, res, () => {}) 
  // 启用静态资源访问 ，第三个参数和路由一样要填
  serve(req, res, () => {})  
})
// 监听端口
app.listen(3000);
console.log('服务器启动成功');