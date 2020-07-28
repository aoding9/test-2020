const { User } = require('../../model/user');
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
  // 判断是删除用户还是文章
  if(req.query.type=='article'){
    // 删除文章
    await Article.findOneAndDelete({_id: req.query.id});
    // 重定向
    res.redirect('/admin/article');
  }else if(req.query.type=='user'){
    // 获取要删除的用户id
    // res.send(req.query.id)
    // 删除用户
    await User.findOneAndDelete({_id: req.query.id});
    // 重定向
    res.redirect('/admin/user');
  }else{
    res.send('啥也没删除奥，是不是哪里写错了');
  }
}