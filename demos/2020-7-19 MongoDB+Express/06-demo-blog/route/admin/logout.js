module.exports = (req, res) => {
  // 删除session destroy()里面有个回调函数，删除后调用
  req.session.destroy(function () {
    // 删除cookie clearCookie()参数是cookie的name
    res.clearCookie('connect.sid');
    // 重定向到登录页面
    res.redirect('/admin/login');
  });
}