// 安装body-parser模块 npm i -S body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 拦截所有请求
// extended: false 方法内使用querystring模块处理请求参数的格式
// extended: true 方法内使用第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/add', (req, res) => {
  // 接收post请求参数
  res.send(req.body)
})


app.listen(3000);
console.log('网站服务器启动成功');
