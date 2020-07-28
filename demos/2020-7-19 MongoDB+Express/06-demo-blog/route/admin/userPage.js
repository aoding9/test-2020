// 导入用户集合构造函数
const { User } = require('../../model/user');
module.exports = async (req, res) => {
  
  // 标识当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';
  
  // 实现分页功能
  // 接收客户端传递来的当前页数
  let page = req.query.page || 1;
  // // 每一页显示的数据条数
  let pagesize = 4;
  // // 查询用户数据的总数
  let count = await User.countDocuments({});
  // 总页数
  let total = Math.ceil(count / pagesize);
  // res.send('总页数是'+total);
  
  // 页面对应的数据查询开始位置
  let start = ( page - 1) * pagesize;
  // 向数据库查询用户信息
  let users = await User.find({}).limit(pagesize).skip(start);
  // res.send(users) //看下有没有查询成功
  res.render('admin/user', {
    users,
    page,
    total
  });

// res.render('admin/user', {
//   // 不能直接用req存储username，因为http连接在传输完毕后就会关闭，需要用session和cookie来保存
//   // msg: req.username

//   // 把session对象中的username传递给模板，但是其他页面也有很多用到的，每次都传太麻烦了
//   msg: req.session.username
// })
// 因为login.js里面把user开放给locals了，所以不需要再传递了
}