const path = require('path');
// path.join('路径','路径',...,'文件名') 根据系统判断，如何拼接路径，Linux是正斜杠/ Windows/\都行
let finalPath = path.join('dir1','dir2','dir3','filename');
console.log(finalPath);