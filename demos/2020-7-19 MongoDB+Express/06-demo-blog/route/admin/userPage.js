// 导入用户集合构造函数
const { User } = require('../../model/user');
module.exports = async (req, res) => {
  // res.render('admin/user', {
  //   // 不能直接用req存储username，因为http连接在传输完毕后就会关闭，需要用session和cookie来保存
  //   // msg: req.username

  //   // 把session对象中的username传递给模板，但是其他页面也有很多用到的，每次都传太麻烦了
  //   msg: req.session.username
  // })
  // 因为后面把user开放给locals了，所以不需要再传递了

  // 向数据库查询用户信息
  let users = await User.find({});
  res.send(users)
  // res.render('admin/user', {
  //   users
  // });
}