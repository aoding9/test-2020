// 导入mongoose-sex-page数据分页模块
const pagination = require('mongoose-sex-page');
// 将文章集合构造函数导入
const { Article } = require('../../model/article')

module.exports = async (req, res) => {
  // 接收客户端传递来的页码
  const page = req.query.page;
  // 标识当前访问的是文章管理页面
  req.app.locals.currentLink = 'article';
  // 查询所有文章数据
  // const articles = await Article.find();
  // res.send(articles);
  // 查询作者信息 多集合联合查询
  // const articles = await Article.find().populate('author');
  // 文章分页
  // pagination(目标集合的构造函数).page(当前页码).size(每页条数).display(客户端显示的页码数量).exec(向数据库发送分页请求，不用写参数)
  const articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
  // res.send(articles); //看下查询是否成功
  
  // 渲染文章列表页面模板
  res.render('admin/article.art', {
    articles,
    link: '/admin'
  });
}