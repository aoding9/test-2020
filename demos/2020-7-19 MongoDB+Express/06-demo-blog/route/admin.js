// 引用express框架
const express = require('express');

// 创建博客后台页面路由
const admin = express.Router();

// 创建挂载二级路由

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 渲染用户列表页面
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 渲染新增用户页面
admin.get('/user-edit', require('./admin/user-editPage'));

// 实现新增用户功能
admin.post('/user-edit', require('./admin/user-edit'));

// 将路由对象作为模块成员进行导出
module.exports = admin;