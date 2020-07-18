// 回调地狱
// 通过回调函数进行异步处理，虽然简单，但是代码高度嵌套，不利于维护，别人阅读起来也不是很方便，一旦嵌套多了，就像噩梦一样，看得人脑瓜疼

// 假如需要依次读取1 2 3 文件
const fs = require('fs');

fs.readFile('./1.txt', 'utf8' ,(err, doc1) => {
  console.log(doc1);
  fs.readFile('./2.txt', 'utf8' ,(err, doc2) => {
    console.log(doc2);
    fs.readFile('./3.txt', 'utf8' ,(err, doc3) => {
      console.log(doc3);
    });
  });
});