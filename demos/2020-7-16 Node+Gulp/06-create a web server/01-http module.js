// 引入server系统模块
const http = require('http');
// 引入处理url的模块
const url = require('url');

// http.createServer()方法返回一个服务器对象，用app保存
// app对象就是网站服务器对象
const app = http.createServer();
// 当客户端发来请求，服务端接收到请求时，会触发一个request事件
// 事件处理函数有两个参数req,res(即请求对象和响应对象request,response)
app.on('request', (req, res) => {
// 给客户端发送响应
   // res.end('<h2>默认是字符串滴</h2>');

// http协议

// 请求方式request method： GET=>请求数据 POST=>发送数据
   // req.method获取请求的方法
   // console.log(req.method);
   // 根据请求方式进行判断
   // if(req.method =='POST'){
   //    res.end('is post')
   // } else if(req.method =='GET'){
   //    res.end('is get');
   // } else {
   //    res.end('not post or get');
   // }

// 获取请求地址req.url
   // 获取请求的路径 以及后面的参数
   // 可以用于实现路由的功能
   // console.log(req.url);
   // if (req.url == '/index' || req.url == '/') {
   //    res.end('welcome to homepage')
   // } else if (req.url == '/list') {
   //    res.end('welcome to listpage')
   // } else {
   //    res.end('not found')
   // }

// 获取请求报文信息req.headers
   // console.log(req.headers);
   // req.headers是一个对象，可以用key获取对应的value
   // console.log(req.headers.accept);
   // 如果有多个要获取，可以用数组
   // console.log(req.headers['accept','host']);


// 响应报文
   // res.writeHead()设置报头
   // HTTP状态码 显示响应过程的状态
   // 成功=>200 请求的资源未找到=>404 服务器端错误=>500 客户端请求有语法错误=>400
   // res.writeHead(500);
   // 内容类型
   // text/plain=>纯文本 text/html=>html文件 text/css=>css文件 application/javascript=>js image/jpeg=>jpg application/json=>json文件
   // res.writeHead(200, {
   //    // 'content-type': 'text/plain'
   //    // 中文可能会显示乱码，需要设置编码
   //    'content-type': 'text/html;charset=utf8',
   // });

// 请求参数
   // 获取GET参数
   // 方式1：通过req.rul获取
   // 浏览器访问http://localhost:3000/index?name=zhangsan&age=20
   // console.log(req.url);
   // 可以截取，但没必要，有内置模块
   // url.parse(req.url)默认返回一个对象，包含很多属性
   // console.log(url.parse(req.url)); 
   // 其中query属性保存了get参数，但是这些参数是字符串类型的
   // console.log(url.parse(req.url).query); 
   // 如果传入第二个参数为true，query属性将是一个对象，里面以键值对存储参数
   // console.log(url.parse(req.url,true)); 
   // 保存这个参数对象，进行后续处理
   // let params = url.parse(req.url,true).query;
   // console.log(params.name,params.age);

   // 结合之前的路径判断
   // 用解构赋值保存query的同时，也保存pathname
   let {query, pathname} = url.parse(req.url, true);

   if (pathname == '/index' || pathname == '/') {
      res.end('welcome to homepage')
   } else if (pathname == '/list') {
      res.end('welcome to listpage')
   } else {
      res.end('not found')
   }




// 必须要给出响应，不然客户端会因为等待响应超时而出错
   res.end('<h2>我响应你了</h2>');
});

// 创建之后还需要监听端口才能从外部访问
app.listen(3000);
console.log('01-http module服务器启动成功，port:3000')