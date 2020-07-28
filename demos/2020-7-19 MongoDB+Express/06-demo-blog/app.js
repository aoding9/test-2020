// 引用express框架
const express = require('express');
// 引用path模块
const path = require('path');
// 引用body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入dateformat第三方日期格式化模块
const dateFormat = require('dateformat');
// 导入art-template模板引擎
const template = require('art-template');


// 创建网站服务器
const app = express();
// 连接数据库
require('./model/connect');
// 拦截post请求参数,配置body-parser
app.use(bodyParser.urlencoded({extended: false}))
// 拦截session 配置session对象
app.use(session({
  secret: 'secret key', // 让session加密存储到客户端
  resave: false, // 重新保存，强制没修改会话也重新保存
    saveUninitialized: false,  // 强制“未初始化”的会话保存到存储默认true，没登录也保存cookie。
    cookie: {
        maxAge: 24 *  60 * 60 * 1000, // 过期时间1天
    },
}));

// 创建user集合以及初始用户，测试一下，之后删掉
// require('./model/user');

// 模板配置相关
// 配置默认模板路径和后缀
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
// 配置当渲染art后缀的模板时，使用的模板引擎
app.engine('art', require('express-art-template'));
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 引用模块化路由对象
const home = require('./route/home');
const admin = require('./route/admin');

// 登录拦截功能，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));
// 为路由匹配请求路径，创建一级路由
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err ,req, res ,next) => {
  // if(err){
    console.log(err);
    // 将json字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    // 遍历对象，把他转换为querystring字符串，放到数组里面，然后用&进行拼接
    let params = [];
    for (let attr in result) {
      if (attr != 'path') {
        params.push(attr + '=' + result[attr]);
      }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
  // }
})

// 监听端口
app.listen(80);
console.log('网站服务器启动成功');