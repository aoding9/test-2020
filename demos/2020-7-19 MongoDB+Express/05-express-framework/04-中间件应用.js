const express = require('express');
const app = express();

// 2.网站维护公告
// 在所有路由最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中
app.use((req, res, next) => {
  // 判断是否正在维护
  // let isDown = true;
  let isDown = false;
  if (isDown) {
    res.send('当前网站正在维护')
  } else {
    next()
  }
})




// 1.路由保护
// 如客户端要访问用户中心，先用中间件判断登录状态，如果未登录，则拦截请求，禁止其进入用户中心，让其跳转到登录页
app.use('/admin', (req, res, next) => {
  // 判断用户登录状态
  // let isLogin = true;
  let isLogin = false;
  // 如果用户登录了，就让请求继续向下
  if (isLogin) {
    next()
  }
  // 如果没登录，则直接响应请登录
  res.send('您还未登录，即将跳转登录页面')
})
app.get('/admin', (req, res, next) => {
  res.send('您已经登录，即将跳转用户中心')
})



// 3.定义404页面
// 由于中间件是从上至下执行，当前面的都没有匹配的，那剩下的就是404咯
app.use((req, res, next) => {
  // 设定状态码
  // res.status(404); 可以和send一起写
  res.status(404).send('又是你，404 not found')
})

app.listen(3000);
console.log('网站服务器启动成功');
