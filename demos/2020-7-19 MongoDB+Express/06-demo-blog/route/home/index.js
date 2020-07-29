const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
  const page = req.query.page;
  const articles = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec()
    .catch(err => console.log(err));
  // res.send(articles);
  
  // return;
  res.render('home/default.art', {
    articles,
  })
    
}