const express = require('express');
const app = express();

// 导入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
app.use('/home', home);
app.use('/admin', admin);


app.listen(3000);
console.log('网站服务器启动成功');

