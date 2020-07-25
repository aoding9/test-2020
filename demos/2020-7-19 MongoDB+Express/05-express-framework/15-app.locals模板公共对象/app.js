const express = require('express');
const path = require('path');
const app = express();
// 模板配置
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art');
// 公共数据
// aap.locals是所有模板都可获取的公共对象，往里面存公共数据
app.locals.users = [
  {
    name: '张三',
    age: 20
  },{
    name: '李四',
    age: 30
  }
]

app.get('/index', (req, res) => {
  res.render('index', {
    msg: '欢迎来到首页'
  })
})
app.get('/list', (req, res) => {
  res.render('index', {
    msg: '欢迎来到列表页'
  })
})


app.listen(3000);
console.log('网站服务器启动成功');
