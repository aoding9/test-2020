// 1.引入http模块
// 2.创建web服务器对象
// 3.为服务器对象添加请求事件
// 4.实现路由功能
  // 1).获取客户端的请求方式
  // 2).获取客户端的请求地址
const http = require('http');
const url = require('url');
const app = http.createServer();
app.on('request', (req, res) => {
  // 获取请求方式
  const method = req.method.toLowerCase();  // method是大写的 为了方便，用toLowerCase()转成小写
  // 获取请求地址
  const pathname = url.parse(req.url).pathname;

  // 因为写的中文，要改下报头
  res.writeHead(200, {
    'content-type': 'text/html;charset=utf8'
  });

  if(method == 'get') {
    if(pathname == '/' || pathname == '/index') {
      res.end('欢迎来到首页')
    }else if (pathname == '/list') {
      res.end('欢迎来到列表页')
    }else {
      res.end('您访问的页面不存在')
    }
  }else if (method == 'post') {
    if(pathname == '/login') {
      res.end('欢迎来到登录页')
    }else {
      res.end('您访问的页面不存在')
    }
  }
});

app.listen(3000);
console.log('01-route 服务器启动成功，port:3000') 
