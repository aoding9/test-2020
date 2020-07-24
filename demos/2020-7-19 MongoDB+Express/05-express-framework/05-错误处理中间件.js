const express = require('express');
const app = express();
const fs = require('fs');

app.get('/index', (req, res, next) => {
  // 在处理时如果发生错误就生成错误对象，把他抛出,这样就不会因为小错误而卡住整个程序
  // throw new Error('程序发生未知错误')
  // 上面这样，由于use是同步任务，只有同步任务的抛出错误能被use获取，而异步任务需要手动触发错误处理中间件
  // 可以通过回调函数的方式
  fs.readFile('./1.txt','utf-8',(err, doc) => {
    if (err != null) {
      next(err)
    } else {
      res.send(doc);
    }
  });
})

// 错误处理中间件,接收所有中间件的err参数
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
})

app.listen(3000);
console.log('网站服务器启动成功');