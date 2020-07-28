// 将文章集合构造函数导入
const { Article } = require('../../model/article')

module.exports = async (req, res) => {
  // 标识当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';
  // 获取get参数
  const { message, id } = req.query;
  // 判断是id是否传递过来
  if(id) {
    // 有id参数，说明是修改文章
    // 查询文章
    let article = await Article.findOne({_id: id}).catch((err) => console.log(err));
    // 渲染修改页
    res.render('admin/article-edit.art', {
      message,
      article,
      link: '/admin/article-modify?id=' + id,
      button: '修改'
    })
  }else {
    // 无id参数，说明是添加文章
    // 渲染文章列表页面模板
    res.render('admin/article-edit.art', {
      message,
      link: '/admin/article-add',
      now: new Date(),
      button: '添加'
    });

  }

}