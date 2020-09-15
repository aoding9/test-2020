const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3001);
console.log('网站服务器启动成功');
