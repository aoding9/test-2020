

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 路由参数，可以用路由来传递参数
// 在路由后面加上/:key即可
// 和？形式不同的是，客户端要访问这个路由，需要传递全部所需参数，不传参数获取不到这个路由
// 当浏览器输入localhost:3000/index/123，req.params就可以获取到{id:123}了
// app.get('/index:id', (req, res) => {
//   res.send(req.params)
// })

// 如果想要获取多个参数，直接按顺序加在后面
app.get('/index/:id/:name/:age', (req, res) => {
  res.send(req.params)
})
app.listen(3000);