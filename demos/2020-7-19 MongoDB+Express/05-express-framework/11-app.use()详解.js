// 安装body-parser模块 npm i -S body-parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// app.use(fn())
// function fn () {
//   return function (req, res, next) {
//     console.log(req.method);
//     next()
//   }
// }
// fn()里面return一个匿名请求处理函数，调用fn()实际上就相当于调用了这个请求处理函数
// 好处：在调用fn()同时，可以传入参数，在fn()内部根据参数，改变请求处理的行为
// app.use(fn({a: 1}))
app.use(fn({a: 2}))
function fn (obj) {
  return function (req, res, next) {
    if (obj.a == 1) {
      console.log(req.url)
    }else {
      console.log(req.method);
    }
    next()
  }
}


app.post('/', (req, res) => {
  // 接收post请求参数
  res.send('ok')
})


app.listen(3000);
console.log('网站服务器启动成功');
