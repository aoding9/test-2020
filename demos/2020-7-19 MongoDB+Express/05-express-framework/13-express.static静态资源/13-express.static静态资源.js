const express = require('express');
const app = express();

const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
// 开启服务器后，浏览器就可以直接访问静态资源了
// http://localhost:3000/13.html  http://localhost:3000/css/13.css

// 还可以给静态资源指定虚拟路径
// 给use()第一个参数传一个想要的router即可
app.use('/static', express.static(path.join(__dirname, 'public')));
// 现在，访问13.html就变成了http://localhost:3000/statiic/13.html  http://localhost:3000/css/13.css


app.listen(3000);
console.log('网站服务器启动成功');
