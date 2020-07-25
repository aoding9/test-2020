const express = require('express');
const path = require('path');
const app = express();

// 1.设定 使用什么模板引擎 渲染什么后缀的模板文件
//  a.模板后缀
//  b.使用的模板引擎
app.engine('art', require('express-art-template'))

// 2.设定 模板存放位置在哪
app.set('views', path.join(__dirname, 'views'))
// 3.设定 默认模板文件后缀名
app.set('view engine', 'art');
// 这里的views和view engine是自带的配置项，后面则是要修改的配置值


// 4.路由里面渲染模板
// res.render(模板名,数据对象) 他内部做了如下步骤
// a.拼接模板路径
// b.拼接模板后缀
// c.判断哪个模板和哪个数据拼接
// d.将结果响应给客户端
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
