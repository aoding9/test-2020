const fs = require('fs');
const { resolve } = require('path');


// 为了控制api执行的顺序，需要将异步任务写到函数里面
function p1 () {
  // 将对象返回给p1()，这样就可以用p1().then()获取resolve的参数
  return new Promise ((resolve, reject) => {
    fs.readFile('./1.txt', 'utf8', (err,doc) => {
      resolve(doc)
    })
  })
}

function p2 () {
  return new Promise ((resolve, reject) => {
    fs.readFile('./2.txt', 'utf8', (err,doc) => {
      resolve(doc)
    })
  })
}

function p3 () {
  return new Promise ((resolve, reject) => {
    fs.readFile('./3.txt', 'utf8', (err,doc) => {
      resolve(doc)
    })
  })
}


p1().then((r1) => {
  console.log(r1);
  // 通过链式编程，设置文件读取顺序
  // 为了后续的.then()能获取到对应的resolve，要return下一次所需的promise实例对象
  return p2();
}).then((r2) => {
  console.log(r2);
  return p3();
}).then((r3) => {
  console.log(r3);
})