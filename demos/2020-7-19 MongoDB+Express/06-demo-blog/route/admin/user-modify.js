const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  // 接收post和get请求参数
  const { username, email, password, role, state } = req.body;
  const id = req.query.id;
  //  查询用户
  let user = await User.findOne({_id: id});
  // 密码比对
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // 密码正确
    // res.send('password is right');
    // 将数据更新到数据库
    await User.updateOne({_id: id}, {
      username,
      email,
      role,
      state
    });
    // 重定向回列表页
    res.redirect('/admin/user');
  }else {
    // 密码错误
    let obj = {
      path: '/admin/user-edit',
      message: '密码错误，修改失败',
      id
    }
    next(JSON.stringify(obj))
  }
}