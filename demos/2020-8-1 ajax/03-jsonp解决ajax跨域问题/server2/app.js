const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  // !需要注意的是，函数调用需要用引号转为字符串，不然会在服务器直接执行了，要让客户端收到字符串再解析执行
  const result = 'fn({name:"zhangsan"})';
  res.send(result);
});

app.listen(3001);
console.log('网站服务器启动成功');
