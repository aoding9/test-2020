// 引用用户集合构造函数
const { User } = require('../../model/user');
// 引用bcrypt模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  // 接收post请求参数
  const {email, password} = req.body;
  // 后端验证
  // 客户端表单数据错误返回400
  // 为了防止恶意猜测账户及密码，不提示具体是哪个错误了
  // if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
  // 把发送错误信息改成渲染error.art模板
  if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
  // 根据邮箱地址查询用户信息
  //  如果查询到用户，user变量是对象类型，其中存储用户信息
  //  如果没有查询到用户，user变量是空
  let user = await User.findOne({email});
  if (user) {
    // 将客户端传递的密码和数据库的密码比对
    // 将密码加密后与数据库的密文比对，返回true则成功，false失败
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      // 登录成功
      // 将用户名存储在请求对象的session对象中
      req.session.username = user.username;
      // 用于登录拦截角色判断
      req.session.role = user.role;
      // 由于很多地方用到username，所以将user信息存到app.locals.userInfo开放给模板
      // req下面有一个app属性，这个app就是app.js里面的app
      req.app.locals.userInfo = user;
      // res.send('登录成功')
      if(user.role == 'admin') {
        // 重定向到后台的user页
        res.redirect('/admin/user');
      } else {
        // 重定向到前台的user页
        res.redirect('/home/');
      }
    } else {
      // 密码错误 登录失败
      res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
    }
  } else {
    // 没有查询到用户
    res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
  }
}