const express = require('express');
const path = require('path');
const app = express();
// 接收post请求参数
const formidable = require('formidable');
// 引入session模块，并配置
const session = require('express-session');
app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: false
}))
// 静态资源访问
app.use(express.static(path.join(__dirname, 'public')));

// 可以用中间件拦截所有跨域请求，设置他的响应头，写在所有路由最上方
app.use((req, res, next) => {
  // 允许哪些客户端跨域访问
	// 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 必须是具体的域名信息
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // 允许哪些方式访问
  res.header('Access-Control-Allow-Methods', 'get,post');
  // 允许客户端发送跨域请求时携带cookie信息
	res.header('Access-Control-Allow-Credentials', true);
  next();
})

app.get('/test', (req, res) => {
  // !需要注意的是，函数调用需要用引号转为字符串，不然会在服务器直接执行了，要让客户端收到字符串再解析执行
  const result = 'fn({name:"张三"})';
  res.send(result);
});

// *将函数名称通过参数传递过来，然后再发送回去
/*app.get('/better', (req, res) => {
  // 用一个常量接收一下函数名称
  const fnName = req.query.callback;
  // 将函数名拼接到调用代码里面，返回给客户端
  // 将data拼接成字符串
  const data = JSON.stringify({name:"张三"});
  const result = fnName + '(' + data + ')';
  // 将响应延迟一秒，如果函数名称相同，先发送的请求会被后发送的请求覆盖掉 
  setTimeout(() => {
    res.send(result);
  },1000)
});
*/

// express框架里面有jsonp方法，内部做的就是上面这些步骤(不包含setTimeout)
app.get('/better', (req, res) => {
  res.jsonp({name: 'lisi',age: 20});
})

// CORS跨域资源共享
// 只需要在服务器端设置两个响应头就可以
app.get('/cross', (req, res) => {
  // 允许哪些客户端跨域访问
  res.header('Access-Control-Allow-Origin', '*');
  // 允许哪些方式访问
  res.header('Access-Control-Allow-Methods', 'get,post');
  res.send('ok')
})

// 登录的路由
app.post('/login',(req ,res) => {
  // 表单解析对象
  var form = formidable.IncomingForm();
  // 解析表单
  form.parse(req, (err, fields, file)=> {
    const {username, password} = fields;
    // 判断用户和密码
    if (username == 'admin' && password == '123') {
      req.session.isLogin = true;
      res.send({message: '登录成功'})
    }else {
      res.send({message: '登录失败'})
    }
  })
})

// 检测是否登录 查看cookie的isLogin值
app.get('/checkLogin',(req, res) => {
  if(req.session.isLogin){
    res.send({message: '已经登录'})
  }else {
    res.send({message: '没有登录'})
  }
})

app.listen(3001);
console.log('网站服务器启动成功');
