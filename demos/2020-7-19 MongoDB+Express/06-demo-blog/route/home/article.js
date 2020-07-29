const { Article } = require('../../model/article');


module.exports = async (req, res, next) => {
  const id = req.query.id;
  // 查询文章
  const article = await Article.findOne({_id: id}).populate('author');

  
  res.render('home/article.art', {
    article
  })
}