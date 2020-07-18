const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const app = http.createServer();
app.on('request', (req,res) => {
  // 获取请求路径
  let pathname = url.parse(req.url).pathname;
  // 让用户不输路径也可以打开default.html
  pathname = pathname == '/'? '/default.html': pathname;

  // 将请求路径转换为服务器硬盘的真实路径
  // __dirname + 'public' + pathname;  //不要这么拼接，因为不同系统的路径分隔符可能不一样
  let realPath = path.join(__dirname, 'public', pathname);
  // 用第三方插件mime.getType获取资源的类型，包括css js img等
  let type = mime.getType(realPath)

  // 读取文件
  fs.readFile(realPath, (error, result)=>{
    // 错误判断
    if(error != null) {
      res.writeHead(400, {
        // 中文错误信息显示乱码，需指定编码
        'content-type': 'text/html;charset=utf8'
      })
      res.end('文件读取失败');
      return;
    }

    // 指定响应正确的报文信息，低版本浏览器没有这个可能会出错
    res.writeHead(200, {
      // 这个type是上面mime自动获取的
      'content-type': type
    })

    res.end(result);
  })
});

app.listen(3000);
console.log('服务器启动成功');
