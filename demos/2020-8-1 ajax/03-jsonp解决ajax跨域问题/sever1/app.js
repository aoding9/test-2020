const express = require('express');
const path = require('path');
const app = express();
// 引入request模块，它可以向其他服务器请求数据
const request = require('request');
// 静态资源访问
app.use(express.static(path.join(__dirname, 'public')));
// 向二号服务器请求数据，服务器不受同源政策限制
app.get('/server', (req, res) => {
  request('http://localhost:3001/cross', (err, response, body) => {
    // body是响应的主体,把他响应给客户端
    // console.log(err,response,body);
    res.send(body)
  })
})


app.listen(3000);
console.log('网站服务器启动成功');
