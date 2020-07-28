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
admin.get('/user-edit', require('./admin/user-edit'));

// 实现新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 实现修改用户功能
admin.post('/user-modify', require('./admin/user-modify'));

// 实现删除用户功能
admin.get('/delete', require('./admin/delete'));

// 文章列表页路由
admin.get('/article', require('./admin/article'));

// 文章编辑页路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))


// 将路由对象作为模块成员进行导出
module.exports = admin;