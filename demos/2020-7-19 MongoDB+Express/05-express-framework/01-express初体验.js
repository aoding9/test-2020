// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 设置路由
// get()如果没有路由，会自动返回Cannot GET pathname
app.get('/',  (req, res) => {
  // send()
  // 1.内部检测响应内容的类型
  // 2.自动设置http状态码
  // 3.自动设置响应的内容类型和编码
  res.send('hello express');
})
app.get('/list', (req, res) => {
  // 相比end(),send()还可以发送json对象
  let html = {name:'张三',age:18};
  res.send(html);
})
// 监听端口
app.listen(3000);
console.log('服务器启动成功');
