// 引用express框架
const express = require('express');
// 创建博客前台页面路由
const home = express.Router();
// 设定一级路由
home.get('/', (req, res) => {
  res.send('欢迎来到home')
});
// 将路由对象作为模块成员进行导出
module.exports = home;