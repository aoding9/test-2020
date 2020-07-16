const fs = require('fs');
const path = require('path');

// 相对路径是相对于命令行的当前目录，是会变的，所以要改成绝对路径
// __dirname表示当前文件绝对路径
console.log(__dirname);
fs.readFile(path.join(__dirname, '111'),'utf8',(err, doc) => {
  console.log(doc);
});