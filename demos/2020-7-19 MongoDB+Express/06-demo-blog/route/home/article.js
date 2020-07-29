const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');


module.exports = async (req, res, next) => {
  const id = req.query.id;
  // 查询文章
  const article = await Article.findOne({_id: id}).populate('author');
  const comments = await Comment.find({aid: id}).populate('uid');

  
  res.render('home/article.art', {
    article,
    comments
  })
}