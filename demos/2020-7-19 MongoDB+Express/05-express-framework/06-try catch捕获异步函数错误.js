const express = require('express');
const app = express();
const fs = require('fs');
const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);

// try catch可以捕获同步和异步方法的错误，但是不能捕获其他的错误，比如回调函数的，promise对象的
app.get('/index', async (req, res, next) => {
  try {
    // 尝试执行，如果没问题就继续执行，如果有问题就把错误传到catch里面
    await readFile('./1.txt');
  } catch (ex) {
    next(ex)
  }
})

// 错误处理中间件,接收所有中间件的err参数
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
})

app.listen(3000);
console.log('网站服务器启动成功');