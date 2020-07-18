// 首先引入模块
const fs = require('fs');
// 读取文件内容
// fs.readFile('路径/文件名',['文件编码'],callback) 编码参数可选 回调函数是硬盘读取后后调用
fs.readFile('./111','utf-8',(err,doc) => {
  // 如果读取成功，err为null
  // 如果读取出错，err参数就为对象，里面是错误信息
  // doc是文件内容
  if(err == null) {
    console.log(doc);
  }
})