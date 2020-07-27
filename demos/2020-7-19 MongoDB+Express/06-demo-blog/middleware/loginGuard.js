module.exports = (req, res, next) => {
  // 判断用户访问的是否为登录页面
  // 判断用户的登录状态
  if (req.url != '/login' && !req.session.username) {
    // 如果不是/login登录页或没有登录，重定向到登录页面
    res.redirect('/admin/login');
  } else {
    // 如果用户已登录，next()放行
    next()
  }
}