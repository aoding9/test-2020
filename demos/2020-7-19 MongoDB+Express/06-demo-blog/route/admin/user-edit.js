const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 标识当前访问的是用户管理页面
  req.app.locals.currentLink = 'user';
  // 获取地址栏中的id参数
  const { message, id } = req.query;
  // 是否传递传递id参数，对应修改或者添加用户
  if (id) {
    // 修改操作
    
    let user = await User.findOne({_id: id})
      .catch((err)=> {
        console.log(err);
      });
    // 渲染模板
    res.render('admin/user-edit', {
      message,
      user,
      link: '/admin/user-modify?id=' + id,
      button: '修改'
    });
  }else {
    // 添加操作
    
    // 渲染模板
    // 修改的时候传了user，添加没传，需要模板用&&判断一下，防止出错
    res.render('admin/user-edit', {
      message,
      link: '/admin/user-edit',
      button: '添加'
    });
  }
}