const express = require('express');
const app = express();
// 第三个参数next表示有中间件参数传递，对参数处理后，调用next()即可传递给下一个中间件
app.use('/request', (req, res, next) => {
  req.name = '张三'
  // 如果不调用next() 请求会卡在这里，浏览器一直等待响应
  next();
})

app.get('/request', (req, res) => {
  res.send(req.name);
})
app.listen(3000);
console.log('网站服务器启动成功');
