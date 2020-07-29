module.exports = (req, res, next) => {
  // 判断用户访问的是否为登录页面
  // 判断用户的登录状态
  if (req.url != '/login' && !req.session.username) {
    // 如果不是/login登录页或没有登录，重定向到登录页面
    res.redirect('/admin/login');
  } else {
    if (req.session.role == 'normal') {
      // 如果登录的是普通用户，重定向到首页
      return res.redirect('/home/')
    }
    // 如果用户已登录，且是管理员，则next()放行
    next()
  }
}