const fs = require('fs');

// fs.writeFile('路径/文件名','数据',callback)
const content = '<h3>正在使用fs.writeFile写入文件内容</h3>';
fs.writeFile('./222',content,err => {
  if(err != null) {
    console.log(err);
    return
  }
  console.log('写入成功');
})
