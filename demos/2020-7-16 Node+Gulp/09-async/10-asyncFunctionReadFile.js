const fs = require('fs');
const promisify = require('util').promisify;
// 将现有的异步api包装，让readFile方法返回promise对象，以支持异步函数语法
const readFile = promisify(fs.readFile);

const run = async () => {
  let r1 = await readFile('./1.txt', 'utf8');
  let r2 = await readFile('./2.txt', 'utf8');
  let r3 = await readFile('./3.txt', 'utf8');
  console.log(r1,r2,r3);
}

run ();