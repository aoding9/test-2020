const express = require('express');
const app = express();
app.get('/index', (req, res) => {
  // 浏览器输入 http://localhost:3000/index?name=张三
  // express框架自动解析了query对象
  res.send(req.query);
})

app.listen(3000);
console.log('网站服务器启动成功');
