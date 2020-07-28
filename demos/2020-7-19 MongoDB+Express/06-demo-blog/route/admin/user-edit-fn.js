
// 导入User集合构造函数
// 导入validateUser数据验证
const { User, validateUser } = require('../../model/user')
// 导入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

  try {
    await validateUser(req.body)
  } catch(ex) {
    // 验证没通过
    // ex.message
    // 重定向回用户添加页面
    // return res.redirect(`/admin/user-edit?message=${ex.message}`)
    // next()参数只能有一个字符串类型的参数，要传多个内容，则需要把内容转换成json对象的字符串形式
    // JSON.stringify() 将对象数据类型转换为字符串数据类型
    return next(JSON.stringify({path: '/admin/user-edit', message: ex.message}))
  }

  // 根据邮箱地址查询用户是否存在
  let user = await User.findOne({email: req.body.email});
  // 如果查询到用户已经存在，邮件地址已被别人占用
  if (user) {
    // 重定向回用户添加页面
    // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
    return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}))
  }
  // 上面验证通过，可以创建用户
  // 对密码加密
  const salt = await bcrypt.genSalt(10);
  // 坑：这里必须加await 等加密完了再赋值，不然只赋值半截 报错
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  // 将用户信息添加到数据库
  await User.create(req.body)
    .catch(err => console.log(err.message));
  // 重定向到用户列表页
  res.redirect('/admin/user')
}