const express = require('express');
const app = express();
// app.use(路由地址,回调函数) 如果不写第一个参数，默认匹配所有中间件的传递参数
app.use((req, res, next) => {
  console.log('请求走了app.use中间件');
  next();
})
// 如果写第一个参数，则匹配这个路由的请求
app.use('/list', (req, res, next) => {
  console.log('请求走了use /list中间件');
  next();
})
app.get('/list', (req, res, next) => {
  console.log('请求走了get /list中间件');
  res.send('/list');
})
app.get('/request', (req, res, next) => {
  console.log('请求走了get /request中间件');
  res.send('/request');
})

app.use((req, res, next) => {
  res.send('上面都不结束响应，我就显示出来了，err:404 not found')
})
app.listen(3000);
console.log('网站服务器启动成功');
