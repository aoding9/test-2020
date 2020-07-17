// 引入server系统模块
const http = require('http');
// 引入处理post参数的模块
const querystring = require('querystring');
// 创建服务器对象
const app = http.createServer();
app.on('request', (req, res) => {
   // post参数是通过事件的方式接收的，因为数据可能比较大，要分很多个包，不能一次传输完成
   // data 当参数传递时触发
   // end  当参数传递完成时触发

   let postParams = '';
   // data事件的回调函数接收一个params参数，里面就是post提交的参数
   req.on('data', params => {
      postParams += params;
   });

   req.on('end', () => {
      // console.log(postParams);
      // 这个仍然是个字符串，需要导入querystring模块，里面有专门处理请求参数query字符串的方法
      // querystring.parse()方法可以把字符串转成对象
      console.log(querystring.parse(postParams));
   });


   // 必须要给出响应，不然客户端会因为等待响应超时而出错
   res.end('ok');
});
app.listen(3000);
console.log('02-post 服务器启动成功，port:3000') 