const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 处理静态资源
app.use(express.static('public'))
// 处理请求参数，支持json格式和query字符串格式
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 设置允许跨域访问该服务
app.all('*', function (req, res, next) {
  // 允许跨域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  // 跨域允许携带cookie mytoken  允许这些请求头字段
  res.header('Access-Control-Allow-Headers', ['X-Requested-With', 'Content-Type', 'mytoken'])
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Allow-Headers', 'mytoken');
  next()
})
app.get('/async1', (req, res) => {
  res.send('hello1')
})
app.get('/async2', (req, res) => {
  if (req.query.info == 'hello') {
    res.send('world')
  } else {
    res.send('error')
  }
})

app.get('/adata', (req, res) => {
  res.send('Hello axios!')
})
app.get('/axios', (req, res) => {
  // query字符串传参 用req.query
  res.send('axios get 传递参数' + req.query.id)
})
app.get('/axios/:id', (req, res) => {
  // restful传参 用req.params
  res.send('axios get (Restful) 传递参数' + req.params.id)
})
app.delete('/axios', (req, res) => {
  res.send('axios get 传递参数' + req.query.id)
})
app.post('/axios', (req, res) => {
  res.send('axios post 传递参数' + req.body.uname + '---' + req.body.pwd)
})
app.put('/axios/:id', (req, res) => {
  res.send('axios put 传递参数' + req.params.id + '---' + req.body.uname + '---' + req.body.pwd)
})

app.get('/axios-json', (req, res) => {
  // res.json()响应json数据
  res.json({
    uname: 'lisi',
    age: 12,
  })
})

app.get('/fdata', (req, res) => {
  res.send('Hello Fetch!')
})
app.get('/books', (req, res) => {
  res.send('传统的URL传递参数!' + req.query.id)
})
app.get('/books/:id', (req, res) => {
  res.send('Restful形式的URL传递参数!' + req.params.id)
})
app.delete('/books/:id', (req, res) => {
  res.send('DELETE请求传递参数!' + req.params.id)
})
app.post('/books', (req, res) => {
  // post数据通过bodyparser的body获取到
  res.send('POST请求传递参数!' + req.body.uname + '---' + req.body.pwd)
})
app.put('/books/:id', (req, res) => {
  res.send('PUT请求传递参数!' + req.params.id + '---' + req.body.uname + '---' + req.body.pwd)
})

app.get('/json', (req, res) => {
  res.json({
    uname: 'lisi',
    age: 13,
    gender: 'male',
  })
})

app.get('/a1', (req, res) => {
  setTimeout(function () {
    res.send('Hello TOM!')
  }, 1000)
})
app.get('/a2', (req, res) => {
  setTimeout(function () {
    res.send('Hello JERRY!')
  }, 2000)
})
app.get('/a3', (req, res) => {
  setTimeout(function () {
    res.send('Hello SPIKE!')
  }, 3000)
})

// 路由
app.get('/data', (req, res) => {
  res.send('Hello World!')
})
app.get('/data1', (req, res) => {
  setTimeout(function () {
    res.send('Hello TOM!')
  }, 1000)
})
app.get('/data2', (req, res) => {
  res.send('Hello JERRY!')
})

// 启动监听
app.listen(3000, () => {
  console.log('running...')
})
