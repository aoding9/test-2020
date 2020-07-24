const express = require('express');
const app = express();
// 首先用express.Router()初始化路由对象
const home = express.Router();
// 然后中间件匹配对应的路由请求
app.use('/home', home);
// 接着对该路由下的请求创建二级路由
home.get('/index', (req, res) => {
  res.send('欢迎来到博客首页')
})
app.listen(3000);
console.log('网站服务器启动成功');