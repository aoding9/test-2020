// 导入bcrypt
const bcrypt = require('bcrypt');
// 要用异步函数来处理加密
async function run () {
  // 生成随机字符串
  // genSalt方法接收一个数值参数
  // 数值越大，生成的随机字符串复杂度越高，反之复杂度越低，默认为10
  // 返回生成的随机字符串
  const salt = await bcrypt.genSalt();
  // bcrypt.hash()进行密码加密
  // 1：要加密的明文
  // 2：随机字符串
  const result = await bcrypt.hash('123456', salt)
  console.log(salt);
  console.log(result);
}
run();