const { resolve } = require("path");

// Promise是一个构造函数，目的是解决异步编程中的回调地狱问题
// 他需要传递一个匿名函数，该函数有两个参数，第一个参数通过回调函数，将异步任务执行成功的结果传递出去，第二个参数类似地将执行失败的错误信息传递出去
// 每一个异步任务都使用promise包装成一个promise对象，对象里面放的就是异步任务
// Promise((resolve, reject) => {
  // 异步任务写在里面
// })


const fs = require('fs');

let promise = new Promise((resolve, reject) => {
  fs.readFile('./1.txt', 'utf8', (err, doc) => {
    // 将任务执行和错误处理进行了分离
    if (err != null) {
      reject(err);
    }else {
      resolve(doc);
    }
  });
});

// 之后通过promise.then()方法，拿到resolve()传递出来的参数，通过promise.catch()获取reject()的传递出的参数，这里的.then() .catch()允许链式编程
promise.then((doc) => {
  console.log(doc);
}).catch((err) => {
  console.log(err);
})