// 模块引入
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

//初始化
const app = express();

// 实现静态资源访问功能
app.use(express.static(path.join(__dirname, 'public')));
// 拦截json格式post请求参数
app.use(bodyParser.json());

// 路由
// 01
app.get('/first', (req, res) => {
  res.send('我是/first');
});

// 02
app.get('/jsonResponseData', (req, res) => {
  res.send({
    name: 'zhangsan',
  });
});
// 03
app.get('/get', (req, res) => {
  res.send(req.query);
});
// 04
app.post('/post', (req, res) => {
  res.send(req.body);
});
// 05
app.post('/json', (req, res) => {
  res.send(req.body);
});
// 06
app.get('/readyState', (req, res) => {
  res.send('哈哈哈');
});

// 07
app.get('/error', (req, res) => {
  // 输出一个不存在的变量，服务器端出错，返回500状态码
  // console.log(abc)
  res.status(400).send('返回结果不是预期结果，根据状态码判断');
});
// 08
app.get('/cache', (req, res) => {
  fs.readFile('./public/08.txt', (err, result) => {
    res.send(result);
  });
});
// 监听3000端口
app.listen(3000);
console.log('网站服务器启动成功');
